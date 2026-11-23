import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostArtboard } from '@/components/social/PostArtboard'
import { findPost, socialPosts } from '@/data/social'

// One Instagram post at its real size, for export (`npm run social:export` screenshots
// #artboard). Internal: not linked from the site and not indexed.
export const metadata: Metadata = { title: 'Post — Beatriz Torres', robots: { index: false, follow: false } }

export function generateStaticParams() {
  return socialPosts.map((p) => ({ slug: p.slug }))
}

export default function SocialPostPage({ params }: { params: { slug: string } }) {
  const post = findPost(params.slug)
  if (!post) notFound()
  return (
    <div className="flex min-h-screen items-start justify-center bg-sand-deep p-10">
      <PostArtboard post={post} id="artboard" />
    </div>
  )
}
