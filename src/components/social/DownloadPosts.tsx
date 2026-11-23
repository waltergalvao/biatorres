'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { POST_SIZE } from '@/data/social'

/**
 * Saves posts as PNG in the browser, from the artboards on the page (no export script needed).
 * Each artboard must be on the page at full size with the id `post-<slug>`; a scaled preview can
 * wrap it, since only the artboard node itself is captured.
 */
async function savePng(slug: string) {
  const node = document.getElementById(`post-${slug}`)
  if (!node) throw new Error(`Post ${slug} not found`)
  const { toPng } = await import('html-to-image')
  await document.fonts.ready
  // includeQueryParams: every photo is /_next/image?url=…, so without it html-to-image's cache
  // treats them all as one file and every post gets the first post's photo.
  const options = { width: POST_SIZE.width, height: POST_SIZE.height, pixelRatio: 1, cacheBust: true, includeQueryParams: true }
  // The first pass loads fonts and photos into the clone; the second one has them all.
  await toPng(node, options)
  const dataUrl = await toPng(node, options)
  const link = document.createElement('a')
  link.download = `${slug}.png`
  link.href = dataUrl
  link.click()
}

export function DownloadPost({ slug, className = '' }: { slug: string; className?: string }) {
  const [busy, setBusy] = useState(false)
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true)
        try {
          await savePng(slug)
        } finally {
          setBusy(false)
        }
      }}
      className={`btn-outline !min-h-[40px] !px-4 !py-2 !text-[14px] disabled:opacity-60 ${className}`}
    >
      <Download size={16} aria-hidden />
      {busy ? 'Gerando…' : 'Baixar PNG'}
    </button>
  )
}

export function DownloadAll({ slugs }: { slugs: string[] }) {
  const [busy, setBusy] = useState(false)
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true)
        try {
          for (const slug of slugs) await savePng(slug)
        } finally {
          setBusy(false)
        }
      }}
      className="btn-primary disabled:opacity-60"
    >
      <Download size={18} aria-hidden />
      {busy ? 'Gerando…' : `Baixar todos (${slugs.length})`}
    </button>
  )
}
