import { renderBlogOg } from '@/lib/blog/og-card'

// Share image of /blog (src/lib/blog/og.ts).
export const runtime = 'edge'

export function GET(request: Request) {
  return renderBlogOg(request, { kind: 'blog' })
}
