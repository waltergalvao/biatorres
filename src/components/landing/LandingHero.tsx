import Image from 'next/image'
import { ArrowDown, Check } from 'lucide-react'
import { unsplash, waLink } from '@/lib/site'
import { WhatsAppIcon } from '../WhatsAppIcon'

const i = (n: number) => ({ '--i': n }) as React.CSSProperties

export type LandingHeroProps = {
  hero: {
    eyebrow: string
    title: string
    accent: string
    titleAfter?: string
    lede: string
    image: string
    imageAlt: string
  }
  price: { pre?: string; value: string; unit?: string; note: string }
  cta: { label: string; message: string }
  trust: string[]
  secondary: { href: string; label: string }
}

/**
 * Landing-page hero: the H1 carries the ad's promise, the price is visible without scrolling,
 * and the main action is a WhatsApp message already written for this page.
 */
export function LandingHero({ hero, price, cta, trust, secondary }: LandingHeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden" data-placement="hero">
      {/* Mobile spacing is tighter than md+ so the WhatsApp button ends above ~620px on a
          390x844 phone, inside the visible area of iOS Safari and in-app browsers. */}
      <div className="container-site grid items-center gap-10 pb-16 pt-5 md:pt-12 lg:min-h-[calc(100svh-72px)] lg:grid-cols-12 lg:gap-12 lg:py-12">
        <div className="lg:col-span-6">
          <p className="eyebrow enter" style={i(0)}>
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="enter mt-4 font-display md:mt-5 text-display text-ink md:text-[clamp(2.4rem,4.4vw,4.2rem)]"
            style={i(1)}
          >
            {hero.title} <em className="italic text-clay">{hero.accent}</em>
            {hero.titleAfter}
          </h1>
          <p className="enter lede mt-4 max-w-[34rem] text-pretty md:mt-6" style={i(2)}>
            {hero.lede}
          </p>

          <div
            className="enter mt-6 flex flex-wrap items-end gap-x-5 gap-y-2 border-y border-line py-4 md:mt-8 md:py-5"
            style={i(3)}
          >
            <p className="flex flex-wrap items-baseline gap-x-2">
              {price.pre && <span className="text-[15px] text-ink-soft">{price.pre}</span>}
              <span className="font-display text-[40px] leading-none tracking-[-0.02em] text-ink tabular md:text-[48px]">
                {price.value}
              </span>
              {price.unit && <span className="text-[15px] text-ink-soft">{price.unit}</span>}
            </p>
            <p className="pb-1 text-[14px] leading-snug text-ink-soft">{price.note}</p>
          </div>

          <div className="enter mt-6 flex flex-col gap-3 sm:flex-row md:mt-8" style={i(4)}>
            <a href={waLink(cta.message)} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon className="h-5 w-5" />
              {cta.label}
            </a>
            <a href={secondary.href} className="btn-outline">
              {secondary.label} <ArrowDown size={16} aria-hidden />
            </a>
          </div>

          <ul className="enter mt-8 grid gap-2 text-[15px] text-ink" style={i(5)}>
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <Check size={17} aria-hidden className="shrink-0 text-olive" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative bleed-right lg:col-span-6 lg:h-full">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] sm:aspect-[4/3] lg:aspect-auto lg:h-[min(78svh,760px)] lg:rounded-r-none">
            <Image
              src={unsplash(hero.image)}
              alt={hero.imageAlt}
              fill
              priority
              quality={70}
              // Phones: the frame is the container width (390 - 2x16px ≈ 92vw), below the CTA.
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 100vw, 55vw"
              className="animate-reveal object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
