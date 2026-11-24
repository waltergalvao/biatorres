import Link from 'next/link'

/** An item without `path` is the current page (plain text). */
export type Crumb = { name: string; path?: string }

/** Visible trail. Mirrors the BreadcrumbList JSON-LD. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-ink-soft">
        {items.map((item, n) => (
          <li key={item.name} className="flex items-center gap-2">
            {n > 0 && (
              <span aria-hidden className="text-ink/30">
                /
              </span>
            )}
            {item.path ? (
              <Link href={item.path} className="transition-colors hover:text-clay">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
