import { renderMark } from '@/lib/og'

// Square PNG logo for structured data (Organization.logo): Google wants a crawlable raster
// image of at least 112x112, and /marca (where the SVG lives) only exists in development.
export const runtime = 'edge'

export function GET() {
  return renderMark(512)
}
