// Next.js replaces a parent's openGraph object when a page sets its own (pageMetadata does),
// which drops the root share image. Re-declaring it here puts it back on this route.
import { OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og'
export { alt, default } from '../opengraph-image'

export const runtime = 'edge'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
