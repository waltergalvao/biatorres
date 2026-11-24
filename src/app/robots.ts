import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/schema'

// Everyone may crawl the public site, including AI search and training crawlers: being read
// and cited by ChatGPT, Claude, Perplexity, Gemini and Copilot is the point (owner decision).
// The internal routes are blocked for all of them. A crawler that matches a named group ignores
// the `*` group, so the named group repeats the same rules.
const DISALLOW = ['/social', '/marca', '/md/']

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: DISALLOW },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
