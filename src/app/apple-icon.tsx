import { renderMark } from '@/lib/og'

// Home screen icon for iOS (180x180 PNG): the BT monogram on linen, like src/app/icon.svg.
export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return renderMark(180)
}
