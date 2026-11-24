import { renderMark } from '@/lib/og'

// Square PNG logo for structured data (Organization.logo): Google wants a crawlable raster
// image of at least 112x112, and /marca (where the SVG lives) is blocked in robots.txt.
export const runtime = 'edge'

export function GET() {
  return renderMark(512)
}
