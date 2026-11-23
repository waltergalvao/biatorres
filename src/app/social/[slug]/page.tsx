import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PostArtboard } from '@/components/social/PostArtboard'
import { DownloadPost } from '@/components/social/DownloadPosts'
import { findPost, socialPosts } from '@/data/social'

// One Instagram post at its real size, with a download button. `npm run social:export` also
// screenshots #post-<slug>. Internal: not linked from the site and not indexed.
export const metadata: Metadata = { title: 'Post — Beatriz Torres', robots: { index: false, follow: false } }

export function generateStaticParams() {
  return socialPosts.map((p) => ({ slug: p.slug }))
}

export default function SocialPostPage({ params }: { params: { slug: string } }) {
  const post = findPost(params.slug)
  if (!post) notFound()
  return (
    <div data-no-zoom className="min-h-screen bg-sand-deep p-10">
      <div className="mx-auto mb-6 flex max-w-[1080px] items-center justify-between gap-4">
        <Link href="/social" className="link-draw text-[15px]">
          ← Todos os posts
        </Link>
        <DownloadPost slug={post.slug} />
      </div>
      <div className="flex justify-center">
        <PostArtboard post={post} id={`post-${post.slug}`} />
      </div>
    </div>
  )
}
