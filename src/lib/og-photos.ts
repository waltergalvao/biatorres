// Beatriz's photos for the /sobre and /contato share images, bundled with those two edge
// functions only. Vercel caps an edge function at 1 MB gzipped and next/og alone takes about
// 800 KB, so these live outside src/lib/og.tsx (every card imports that) and are copies sized for
// the card: the photo slots are 582 px tall, the copies 728 px (from public/images, resized with
// Lanczos, JPEG quality 78). Redo them the same way if the originals change.

import { fetchPhoto } from './og'

/** Beatriz's portrait (public/images/beatriz-retrato.jpg). */
export const portraitPhoto = () => fetchPhoto(new URL('./og-photos/beatriz-retrato.jpg', import.meta.url))

/** Beatriz at a site visit (public/images/beatriz-obra.jpg). */
export const sitePhoto = () => fetchPhoto(new URL('./og-photos/beatriz-obra.jpg', import.meta.url))
