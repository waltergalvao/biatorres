import { NextResponse, type NextRequest } from 'next/server'

/**
 * Content negotiation for AI agents: a request for a blog article with `Accept: text/markdown`
 * gets the Markdown version (the same as /blog/<slug>.md) instead of the HTML. Browsers keep
 * getting HTML. The HTML response points at the Markdown version with a Link header.
 *
 * Also marks the internal Markdown route (/md/...) as noindex when it is requested directly;
 * the public addresses are /blog/<slug>.md and /blog/<slug>.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/md/')) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex')
    return response
  }

  const slug = pathname.slice('/blog/'.length)
  if (!/^[a-z0-9-]+$/.test(slug) || slug === 'categoria') return NextResponse.next()

  if (prefersMarkdown(request.headers.get('accept') ?? '')) {
    const url = request.nextUrl.clone()
    url.pathname = `/md/blog/${slug}`
    const response = NextResponse.rewrite(url)
    response.headers.set('Vary', 'Accept')
    return response
  }

  const response = NextResponse.next()
  response.headers.set('Vary', 'Accept')
  response.headers.set('Link', `</blog/${slug}.md>; rel="alternate"; type="text/markdown"`)
  return response
}

/** True when text/markdown has the same or higher priority than text/html. */
function prefersMarkdown(accept: string) {
  const quality = (type: string) => {
    for (const part of accept.split(',')) {
      const [mediaType, ...params] = part.trim().split(';')
      if (mediaType.trim().toLowerCase() !== type) continue
      const q = params.find((p) => p.trim().startsWith('q='))
      return q ? Number(q.trim().slice(2)) || 0 : 1
    }
    return -1
  }
  const markdown = quality('text/markdown')
  return markdown > 0 && markdown >= quality('text/html')
}

export const config = {
  // Article pages only (/blog/<slug>): not the index, categories, .md files or rss.xml.
  matcher: ['/blog/:slug([a-z0-9-]+)', '/md/:path*'],
}
