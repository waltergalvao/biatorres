// Page metadata in one shape: title, description, canonical, Open Graph and Twitter.
//
// Next.js merges metadata shallowly: a page that sets `openGraph` replaces the layout's whole
// `openGraph` object (site name, locale...). Building every page's metadata here keeps those
// fields on every page. That replacement also drops the parent's share image, so every route
// that uses this has its own: an opengraph-image file in its folder (which Next.js adds on its
// own, as og:image and twitter:image) or, for the blog, images set by src/lib/blog/metadata.ts.
// All of them are drawn by src/lib/og.tsx.

import type { Metadata } from 'next'
import { BUSINESS_NAME } from '@/lib/schema'

/** Suffix the root layout adds to every page title (`title.template`). */
export const TITLE_SUFFIX = ' | Beatriz Torres'

type PageMeta = {
  /** Title without the suffix; it is added by the root layout's template. */
  title: string
  /** 140 to 160 characters. */
  description: string
  /** Site path, e.g. '/servicos/consultoria'. Becomes the canonical URL. */
  path: string
  /** Use the title as is, without the suffix. */
  absoluteTitle?: boolean
  /** Shorter or different title for social cards. Defaults to the full title. */
  socialTitle?: string
  type?: 'website' | 'profile'
}

export function pageMetadata({ title, description, path, absoluteTitle, socialTitle, type = 'website' }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title}${TITLE_SUFFIX}`
  const shareTitle = socialTitle ?? fullTitle
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: BUSINESS_NAME,
      locale: 'pt_BR',
      type,
    },
    twitter: { card: 'summary_large_image', title: shareTitle, description },
  }
}
