import Image from 'next/image'
import Link from 'next/link'
import { unsplash, waLink } from '@/lib/site'
import { WhatsAppIcon } from '../WhatsAppIcon'

export function FinalCta({
  eyebrow = 'Atendimento pelo WhatsApp',
  title,
  text,
  ctaLabel,
  message,
  secondary = { href: '/contato', label: 'Prefiro e-mail' },
  image = '1616046229478-9901c5536a45',
  imageAlt = 'Sala com aparador de madeira, espelho redondo, banqueta e vasos de plantas',
}: {
  eyebrow?: string
  title: string
  text: string
  ctaLabel: string
  message?: string
  secondary?: { href: string; label: string }
  image?: string
  imageAlt?: string
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-linen py-6 md:py-10" data-placement="cta-final">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-[32px] bg-clay">
          <div className="grid lg:grid-cols-2">
            <div className="cta-align flex flex-col justify-center p-8 text-paper sm:p-12 lg:p-16">
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-paper/90">{eyebrow}</p>
              <h2 id="cta-title" className="mt-4 font-display text-display">
                {title}
              </h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-paper/90">{text}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="btn-light">
                  <WhatsAppIcon className="h-5 w-5 text-[#1F7A4D]" />
                  {ctaLabel}
                </a>
                <Link href={secondary.href} className="btn-ghost-light">
                  {secondary.label}
                </Link>
              </div>
            </div>
            <div className="relative min-h-[320px] lg:min-h-[560px]">
              <Image
                src={unsplash(image)}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
