import Link from 'next/link'
import { Monogram } from './Monogram'

/** Logo: the BT monogram + the name set in Fraunces. */
export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const text = tone === 'dark' ? 'text-ink' : 'text-linen'
  const sub = tone === 'dark' ? 'text-ink-soft' : 'text-mist'
  const mark = tone === 'dark' ? 'text-clay' : 'text-clay-soft'
  return (
    <Link
      href="/"
      className="group inline-flex min-h-[44px] items-center gap-3"
      aria-label="Beatriz Torres Arquitetura — página inicial"
    >
      <Monogram
        weight={1.6}
        className={`h-10 w-auto shrink-0 ${mark} transition-transform duration-500 ease-elegant group-hover:-translate-y-0.5`}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[21px] font-medium tracking-[-0.01em] ${text}`}>
          Beatriz Torres
        </span>
        <span className={`mt-1 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.24em] ${sub}`}>
          Arquitetura &amp; interiores
        </span>
      </span>
    </Link>
  )
}
