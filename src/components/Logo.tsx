import Link from 'next/link'

/** Wordmark: an arch (a doorway seen in elevation) + the name set in Fraunces. */
export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const text = tone === 'dark' ? 'text-ink' : 'text-linen'
  const sub = tone === 'dark' ? 'text-ink-soft' : 'text-mist'
  return (
    <Link
      href="/"
      className="group inline-flex min-h-[44px] items-center gap-2.5"
      aria-label="Beatriz Torres Arquitetura — página inicial"
    >
      <svg
        width="22"
        height="28"
        viewBox="0 0 22 28"
        aria-hidden
        className="shrink-0 text-clay transition-transform duration-500 ease-elegant group-hover:-translate-y-0.5"
      >
        <path d="M1 27V11a10 10 0 0 1 20 0v16H1Z" fill="currentColor" />
        <path d="M7 27V14a4 4 0 0 1 8 0v13" fill="none" strokeWidth="1.6" className="stroke-linen" />
      </svg>
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
