import type { Metadata } from 'next'
import Link from 'next/link'
import { PostArtboard } from '@/components/social/PostArtboard'
import { DownloadAll, DownloadPost } from '@/components/social/DownloadPosts'
import { POST_SIZE, socialPosts } from '@/data/social'

// All Instagram posts at a glance, with download buttons. Internal: not linked from the site
// and not indexed.
export const metadata: Metadata = { title: 'Posts — Beatriz Torres', robots: { index: false, follow: false } }

const SCALE = 0.36

export default function SocialIndexPage() {
  return (
    <div className="min-h-screen bg-sand-deep px-6 py-12 md:px-12">
      <p className="eyebrow">Interno</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-display-sm text-ink">Posts para o Instagram</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            {POST_SIZE.width}×{POST_SIZE.height} px (4:5). Baixe cada post em PNG ou todos de uma vez. Clique em um post para vê-lo no
            tamanho real.
          </p>
        </div>
        <DownloadAll slugs={socialPosts.map((p) => p.slug)} />
      </div>
      <ul className="mt-10 flex flex-wrap gap-8">
        {socialPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/social/${post.slug}`}
              className="block rounded-[12px] shadow-[0_20px_40px_-24px_rgb(var(--color-ink)/0.6)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="overflow-hidden rounded-[12px]" style={{ width: POST_SIZE.width * SCALE, height: POST_SIZE.height * SCALE }}>
                {/* Full-size artboard, scaled down for the preview; the download captures it at 1080×1350. */}
                <div style={{ transform: `scale(${SCALE})`, transformOrigin: 'top left' }}>
                  <PostArtboard post={post} id={`post-${post.slug}`} />
                </div>
              </div>
            </Link>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-[14px] font-semibold text-ink">{post.slug}.png</p>
              <DownloadPost slug={post.slug} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
