// Tells IndexNow (Bing, Yandex, Seznam, Naver...) about new or updated pages. Bing's index is
// what ChatGPT search and Copilot read, so a new page shows up there much sooner than waiting
// for the crawler to come back on its own.
//
// It reads the published sitemap (not the local one), so run it after a production deploy:
//
//   npm run indexnow                 # pages with lastmod in the last 3 days
//   npm run indexnow -- --days=10    # another window
//   npm run indexnow -- --all        # every page in the sitemap
//   npm run indexnow -- --dry-run    # only print what would be sent
//
// IndexNow asks for changed pages only. That's why the default is a window of days: pages
// without a lastmod (service pages, landing pages) only go with --all, e.g. after changing
// prices. The key below is public by design: IndexNow checks that public/<KEY>.txt exists on
// the site before accepting a submission.

const KEY = 'eef4f03111b1a8f9df1666c2a7ca61b6'
const SITE_URL = 'https://beatriztorres.com.br'
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const all = args.includes('--all')
const days = Number(args.find((arg) => arg.startsWith('--days='))?.slice(7) ?? 3)

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} answered HTTP ${res.status}`)
  return res.text()
}

/** URLs and lastmods of a sitemap, following a sitemap index if there is one. */
async function readSitemap(url) {
  const xml = await fetchText(url)
  if (xml.includes('<sitemapindex')) {
    const children = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
    return (await Promise.all(children.map(readSitemap))).flat()
  }
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
    loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1].trim(),
    lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1].trim(),
  }))
}

const entries = (await readSitemap(`${SITE_URL}/sitemap.xml`)).filter((e) => e.loc)
if (entries.length === 0) throw new Error('No URLs found in the sitemap.')

const host = new URL(SITE_URL).host
const offHost = entries.filter((e) => new URL(e.loc).host !== host)
if (offHost.length > 0) {
  // IndexNow rejects the whole batch if one URL is on another host.
  throw new Error(`The sitemap has URLs outside ${host}:\n${offHost.map((e) => e.loc).join('\n')}`)
}

const since = Date.now() - days * 24 * 60 * 60 * 1000
const urls = entries.filter((e) => all || (e.lastmod && Date.parse(e.lastmod) >= since)).map((e) => e.loc)

console.log(all ? `${urls.length} pages in the ${host} sitemap.` : `${urls.length} of ${entries.length} pages with lastmod in the last ${days} days.`)
for (const url of urls) console.log(`  ${url}`)

if (urls.length === 0) {
  console.log('Nothing to send.')
  process.exit(0)
}
if (dryRun) {
  console.log('\nDry run: nothing was sent.')
  process.exit(0)
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList: urls }),
})

if (res.ok) {
  console.log(`Sent ${urls.length} URLs (HTTP ${res.status}).`)
} else {
  console.error(`Submission failed: HTTP ${res.status}`)
  const body = await res.text()
  if (body) console.error(body)
  // Almost always the key file isn't live yet.
  if (res.status === 403) console.error(`Check that ${SITE_URL}/${KEY}.txt answers with the key.`)
  process.exit(1)
}
