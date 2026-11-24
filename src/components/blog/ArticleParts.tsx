import Image from 'next/image'
import Link from 'next/link'
import type { Section } from '@/lib/blog/content'
import { AUTHOR } from '@/lib/blog/site'
import { waLink } from '@/lib/site'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'

/** "Neste artigo": the h2 sections, in the desktop sidebar. */
export function TableOfContents({ sections }: { sections: Section[] }) {
  if (sections.length < 3) return null
  return (
    <nav aria-labelledby="toc-title">
      <p id="toc-title" className="eyebrow">
        Neste artigo
      </p>
      <ol className="mt-4 border-l border-line">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="-ml-px block border-l border-transparent py-1 pl-4 text-[14px] leading-snug text-ink-soft transition-colors hover:border-clay hover:text-clay"
            >
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * WhatsApp card: in the sidebar on desktop, after the text on phones. `compact` (sidebar) drops
 * the body text so the sticky column fits short laptop screens.
 */
export function ArticleCta({ message, placement, compact = false }: { message: string; placement: string; compact?: boolean }) {
  return (
    <div className="rounded-[24px] bg-ink p-6 text-linen md:p-7" data-placement={placement}>
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ochre">Projeto de interiores</p>
      <p className="mt-3 font-display text-[22px] leading-tight">Quer ajuda com o seu apartamento?</p>
      {!compact && (
        <p className="mt-3 text-[15px] leading-relaxed text-mist">
          Mande a metragem e o que quer resolver. Eu indico o serviço certo e respondo com o valor fechado.
        </p>
      )}
      <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={`btn-light w-full ${compact ? 'mt-5' : 'mt-6'}`}>
        <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
        Falar com a Beatriz
      </a>
    </div>
  )
}

/** "Quem escreve" box at the end of a post, linking to the author's profile (/sobre). */
export function AuthorBox() {
  return (
    <section
      aria-labelledby="quem-escreve"
      className="flex flex-col gap-5 rounded-[28px] border border-line bg-paper p-6 sm:flex-row sm:items-start md:p-8"
    >
      <Image
        src={AUTHOR.avatar}
        alt={`Foto de ${AUTHOR.name}`}
        width={80}
        height={80}
        className="h-20 w-20 shrink-0 rounded-full object-cover"
      />
      <div>
        <h2 id="quem-escreve" className="eyebrow">
          Quem escreve
        </h2>
        <p className="mt-2 font-display text-[26px] leading-tight text-ink">
          <Link href={AUTHOR.path} rel="author" className="transition-colors hover:text-clay">
            {AUTHOR.name}
          </Link>
        </p>
        <p className="mt-1 text-[15px] text-ink-soft">{AUTHOR.role}</p>
        <p className="mt-4 max-w-[40rem] text-[16px] leading-relaxed text-ink-soft">{AUTHOR.bio}</p>
        <Link href={AUTHOR.path} className="link-draw mt-4 text-[15px] !text-clay">
          Conheça o trabalho da Beatriz
        </Link>
      </div>
    </section>
  )
}
