// Structured data (schema.org JSON-LD) shared across the site.
//
// Every page refers to the same entities by @id, so search engines and AI
// assistants can join them into one graph: the business, the website and
// Beatriz herself. Keep these IDs stable; changing one breaks that link.

import { SITE_URL } from '@/lib/site'

export const SCHEMA_IDS = {
  /** The architecture practice (ProfessionalService / Organization). */
  business: `${SITE_URL}/#business`,
  /** The website itself (WebSite). */
  website: `${SITE_URL}/#website`,
  /** Beatriz Torres (Person). Her profile page is /sobre. */
  person: `${SITE_URL}/sobre#beatriz`,
} as const

/** Absolute URL for a site path ('/blog' -> 'https://beatriztorres.com.br/blog'). */
export const absoluteUrl = (path = '/') => `${SITE_URL}${path === '/' ? '' : path}`
