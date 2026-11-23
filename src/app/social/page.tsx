import type { Metadata } from 'next'
import Link from 'next/link'
import { PostArtboard } from '@/components/social/PostArtboard'
import { POST_SIZE, socialPosts } from '@/data/social'

// All Instagram posts at a glance. Internal: not linked from the site and not indexed.
export const metadata: Metadata = { title: 'Posts — Beatriz Torres', robots: { index: false, follow: false } }

const SCALE = 0.36

export default function SocialIndexPage() {
  return (
    <div className="min-h-screen bg-sand-deep px-6 py-12 md:px-12">
      <p className="eyebrow">Interno</p>
      <h1 className="mt-3 font-display text-display-sm text-ink">Posts para o Instagram</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
        {POST_SIZE.width}×{POST_SIZE.height} px (4:5). Clique em um post para vê-lo no tamanho real. Para gerar os PNGs, rode{' '}
        <code>npm run social:export</code> com o site no ar. Os arquivos vão para <code>social-export/</code>.
      </p>
      <ul className="mt-10 flex flex-wrap gap-8">
        {socialPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/social/${post.slug}`} className="block rounded-[12px] shadow-[0_20px_40px_-24px_rgb(var(--color-ink)/0.6)] transition-transform duration-300 hover:-translate-y-1">
              <div className="overflow-hidden rounded-[12px]" style={{ width: POST_SIZE.width * SCALE, height: POST_SIZE.height * SCALE }}>
                <div style={{ transform: `scale(${SCALE})`, transformOrigin: 'top left' }}>
                  <PostArtboard post={post} />
                </div>
              </div>
            </Link>
            <p className="mt-3 text-[14px] font-semibold text-ink">{post.slug}.png</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
