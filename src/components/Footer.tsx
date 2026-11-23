'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { audiences, type AudienceSlug } from '@/data/audiences'
import {
  EMAIL,
  PRIMARY_CTA,
  WHATSAPP_DISPLAY,
  audienceLinks,
  pageLinks,
  serviceLinks,
  waLink,
} from '@/lib/site'
import { Logo } from './Logo'

// Client component only to read the path: the ad landing pages (/para/*) get a footer with
// contact links and nothing else, like the header there, so paid traffic has no exits.

const linkClass = 'inline-flex min-h-[44px] items-center text-[15px] text-mist transition-colors duration-200 hover:text-linen'

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ochre">{title}</h2>
      <ul className="mt-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Contacts({ message }: { message?: string }) {
  return (
    <>
      <li>
        <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={linkClass} data-placement="rodape">
          WhatsApp {WHATSAPP_DISPLAY}
        </a>
      </li>
      <li>
        <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`} data-placement="rodape">
          {EMAIL}
        </a>
      </li>
    </>
  )
}

function Credits() {
  return (
    <div className="mt-16 flex flex-col gap-3 border-t border-linen/15 pt-8 text-[13px] text-mist md:flex-row md:items-center md:justify-between">
      <span suppressHydrationWarning>© {new Date().getFullYear()} Beatriz Torres Arquitetura</span>
      <span>Fotografias ilustrativas: Unsplash</span>
    </div>
  )
}

function LandingFooter({ message }: { message?: string }) {
  return (
    <footer className="bg-ink text-linen">
      <div className="container-site pb-28 pt-14 md:pb-10 md:pt-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-[21px] font-medium tracking-[-0.01em]">Beatriz Torres Arquitetura</p>
          <ul className="flex flex-col md:flex-row md:gap-8">
            <Contacts message={message} />
          </ul>
        </div>
        <Credits />
      </div>
    </footer>
  )
}

export function Footer() {
  const pathname = usePathname()

  if (pathname.startsWith('/para/')) {
    const slug = pathname.split('/')[2] as AudienceSlug
    return <LandingFooter message={audiences[slug]?.cta.message} />
  }

  return (
    <footer className="bg-ink text-linen">
      <div className="container-site pb-28 pt-16 md:pb-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-mist">
              Projeto de interiores para apartamentos pequenos, primeiro imóvel e studios para
              alugar. Atendimento online.
            </p>
            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light mt-8"
              data-placement="rodape"
            >
              {PRIMARY_CTA.label}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <Column title="Serviços" links={serviceLinks} />
            <Column title="Para quem" links={audienceLinks} />
            <div className="col-span-2 sm:col-span-1">
              <Column title="Beatriz Torres" links={[{ href: '/', label: 'Início' }, ...pageLinks]} />
              <ul className="mt-4">
                <Contacts />
                <li className="pt-2 text-[15px] text-mist">São Paulo, SP</li>
              </ul>
            </div>
          </div>
        </div>

        <Credits />
      </div>
    </footer>
  )
}
