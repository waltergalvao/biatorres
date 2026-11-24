import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'

// How Markdown renders inside a blog post: the site's type scale and tokens, set per element
// (the site has no typography plugin). Each block sets its own top margin; the article wrapper
// removes it from the first child.

/**
 * The summary at the top of a post that answers the title's question directly. It is the part
 * search engines and AI assistants quote most; in the Markdown version it becomes
 * "> **Resposta rápida:** ...".
 *
 *   <RespostaRapida>
 *   Duas a quatro frases que respondem à pergunta do título.
 *   </RespostaRapida>
 */
export function RespostaRapida({ children }: { children: React.ReactNode }) {
  return (
    <aside
      aria-label="Resposta rápida"
      className="mt-8 rounded-[24px] border border-line bg-paper p-6 md:p-7 [&_p]:mt-2 [&_p]:text-[17px] [&_p]:leading-[1.7] [&_p]:text-ink md:[&_p]:text-[18px]"
    >
      <div className="eyebrow">Resposta rápida</div>
      {children}
    </aside>
  )
}

function A({ href = '', children, ...props }: React.ComponentPropsWithoutRef<'a'>) {
  const className =
    'font-medium text-clay underline decoration-clay/40 underline-offset-[5px] transition-colors hover:decoration-clay'
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  )
}

export const blogMdxComponents: MDXComponents = {
  RespostaRapida,
  a: A,
  p: (props) => <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]" {...props} />,
  h2: (props) => <h2 className="mt-14 scroll-mt-28 font-display text-display-sm text-ink" {...props} />,
  h3: (props) => <h3 className="mt-10 scroll-mt-28 font-display text-heading text-ink" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  ul: (props) => (
    <ul
      className="mt-6 space-y-3 text-[17px] leading-[1.7] text-ink-soft md:text-[18px] [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.75em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-clay"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-6 list-decimal space-y-3 pl-6 text-[17px] leading-[1.7] text-ink-soft marker:font-semibold marker:text-clay md:text-[18px] [&>li]:pl-1.5"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-8 border-l-2 border-clay pl-5 italic [&>p+p]:mt-3 [&>p:first-child]:mt-0 [&>p]:font-display [&>p]:text-[20px] [&>p]:leading-snug [&>p]:text-ink md:[&>p]:text-[22px]"
      {...props}
    />
  ),
  hr: () => <hr className="mt-12 border-0 border-t border-line" />,
  table: (props) => (
    <div className="mt-8 overflow-x-auto rounded-[20px] border border-line bg-paper">
      <table className="w-full min-w-[28rem] border-collapse text-left text-[15px] md:text-[16px]" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-line bg-sand px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink"
      {...props}
    />
  ),
  td: (props) => <td className="tabular border-b border-line px-4 py-3 text-ink-soft [tr:last-child>&]:border-b-0" {...props} />,
}
