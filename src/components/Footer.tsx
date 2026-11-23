import Link from 'next/link'
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

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ochre">{title}</h2>
      <ul className="mt-4 space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-[36px] items-center text-[15px] text-mist transition-colors duration-200 hover:text-linen"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
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
            >
              {PRIMARY_CTA.label}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <Column title="Serviços" links={serviceLinks} />
            <Column title="Para quem" links={audienceLinks} />
            <div className="col-span-2 sm:col-span-1">
              <Column title="Estúdio" links={[{ href: '/', label: 'Início' }, ...pageLinks]} />
              <ul className="mt-6 space-y-1 text-[15px] text-mist">
                <li>
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[36px] items-center transition-colors hover:text-linen"
                  >
                    WhatsApp {WHATSAPP_DISPLAY}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex min-h-[36px] items-center break-all transition-colors hover:text-linen"
                  >
                    {EMAIL}
                  </a>
                </li>
                <li className="pt-1">São Paulo, SP</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-linen/15 pt-8 text-[13px] text-mist md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Beatriz Torres Arquitetura</span>
          <span>Fotografias ilustrativas: Unsplash</span>
        </div>
      </div>
    </footer>
  )
}
