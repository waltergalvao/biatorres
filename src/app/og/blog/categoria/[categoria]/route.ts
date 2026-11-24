import { renderBlogOg } from '@/lib/blog/og-card'

// Share image of each category page, /blog/categoria/<slug> (src/lib/blog/og.ts).
export const runtime = 'edge'

export function GET(request: Request, { params }: { params: { categoria: string } }) {
  return renderBlogOg(request, { kind: 'category', slug: params.categoria })
}
