/**
 * The "BT" monogram: the B's frame and bowls crossed by the T's bar and stem. Traced from the
 * owner's logo file (97% overlap with it) as strokes, so it stays sharp at any size and takes
 * its color from the text color (`text-clay`, `text-clay-soft`…). Proportion: 0.6 : 1.
 */
export const MONOGRAM = {
  viewBox: '1 1.5 334 553',
  strokeWidth: 13.5,
  paths: [
    'M191 481.5H8V8.5H165C233.5 12.5 274 58 279 112V133.5C277 187 249 215 216.5 238.5C259.5 251.5 310.5 293 307.5 357.5C311 429.5 258.5 481.5 191 481.5',
    'M2 169H334.5',
    'M184 169V554',
  ],
} as const

/**
 * `weight` sets a fixed line thickness in px whatever the size. Small marks need it: at 40 px
 * tall the original proportion would be under 1 px and look blurry.
 */
export function Monogram({ className, title, weight }: { className?: string; title?: string; weight?: number }) {
  return (
    <svg
      viewBox={MONOGRAM.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={weight ?? MONOGRAM.strokeWidth}
      strokeLinejoin="miter"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={className}
    >
      {MONOGRAM.paths.map((d) => (
        <path key={d} d={d} vectorEffect={weight ? 'non-scaling-stroke' : undefined} />
      ))}
    </svg>
  )
}
