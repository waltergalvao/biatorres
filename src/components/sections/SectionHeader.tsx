/** Eyebrow + title (+ optional lede on the right) used at the top of most sections. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  lede,
  tone = 'dark',
}: {
  id: string
  eyebrow: string
  title: React.ReactNode
  lede?: React.ReactNode
  tone?: 'dark' | 'light'
}) {
  const light = tone === 'light'
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p className={`eyebrow ${light ? '!text-ochre' : ''}`}>{eyebrow}</p>
        <h2 id={id} className={`mt-4 font-display text-display ${light ? 'text-linen' : 'text-ink'}`}>
          {title}
        </h2>
      </div>
      {lede && <p className={`lede lg:col-span-5 ${light ? '!text-mist' : ''}`}>{lede}</p>}
    </div>
  )
}
