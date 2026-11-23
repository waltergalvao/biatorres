import Image from 'next/image'
import { Check } from 'lucide-react'
import { unsplash } from '@/lib/site'
import { POST_SIZE, SOCIAL_HANDLE, type SocialPost } from '@/data/social'
import { WhatsAppIcon } from '../WhatsAppIcon'
import { Monogram } from '../Monogram'

/** Keeps "R$ 450" and "10x de" from breaking across lines. */
const nbsp = (text: string) => text.replace(/(R\$|\d+x de|de) /g, '$1 ')

/**
 * One Instagram post at its real size (1080×1350). Same language as the site: linen ground, the
 * service photo, the title in Fraunces with an italic terracotta word, the dark price card from
 * the home hero, a check list and one action. Every color comes from the design tokens.
 */
export function PostArtboard({ post, id }: { post: SocialPost; id?: string }) {
  return (
    <div
      id={id}
      className="relative overflow-hidden bg-linen font-sans text-ink"
      style={{ width: POST_SIZE.width, height: POST_SIZE.height }}
    >
      {/* Brand bar */}
      <div className="absolute inset-x-16 top-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Monogram weight={2.6} className="h-[64px] w-auto text-clay" />
          <div className="leading-none">
            <p className="font-display text-[30px] font-medium tracking-[-0.01em]">Beatriz Torres</p>
            <p className="mt-1.5 text-[13px] font-semibold uppercase tracking-[0.24em] text-ink-soft">Arquitetura &amp; interiores</p>
          </div>
        </div>
        <p className="text-[15px] font-semibold uppercase tracking-[0.18em] text-clay">Projeto de interiores</p>
      </div>

      {/* Photo */}
      <div className="absolute left-16 right-16 top-[148px] h-[620px] overflow-hidden rounded-[36px] bg-sand">
        <Image src={unsplash(post.image)} alt={post.imageAlt} fill priority sizes="952px" quality={85} className="object-cover" />
        <span className="absolute left-7 top-7 rounded-full bg-linen/90 px-5 py-2.5 text-[17px] font-semibold text-ink backdrop-blur-sm">
          {post.tag}
        </span>
      </div>

      {/* Price card, overlapping the photo like the home hero */}
      <div className="absolute right-[104px] top-[620px] w-[400px] rounded-[28px] bg-ink px-9 pb-7 pt-8 text-linen shadow-[0_30px_60px_-30px_rgb(var(--color-ink)/0.7)]">
        {post.price.pre && (
          // "A PARTIR DE" in caps like the site's eyebrows; "10x de" keeps its lowercase x.
          <p className={`font-semibold text-ochre ${/\d/.test(post.price.pre) ? 'text-[19px] tracking-[0.04em]' : 'text-[15px] uppercase tracking-[0.18em]'}`}>
            {post.price.pre}
          </p>
        )}
        <p className="mt-2 whitespace-nowrap font-display text-[88px] leading-none tracking-[-0.03em] tabular">{nbsp(post.price.value)}</p>
        <p className="mt-2 text-[20px] text-mist">{post.price.unit}</p>
        {post.price.highlight ? (
          <p className="mt-5 flex items-baseline justify-between gap-4 border-t border-linen/15 pt-4">
            <span className="whitespace-nowrap text-[20px] text-mist">{post.price.highlight.label}</span>
            <span className="whitespace-nowrap font-display text-[56px] leading-none tracking-[-0.02em] text-ochre">{post.price.highlight.value}</span>
          </p>
        ) : (
          post.price.note && <p className="mt-5 border-t border-linen/15 pt-4 text-[17px] leading-snug text-mist">{nbsp(post.price.note)}</p>
        )}
      </div>

      {/* Title */}
      <p className="absolute left-16 top-[832px] w-[560px] font-display text-[92px] leading-[0.98] tracking-[-0.025em]">
        {post.title[0]}
        <br />
        <em className="italic text-clay">{post.title[1]}</em>
      </p>

      {/* What is included */}
      <ul className="absolute inset-x-16 top-[1062px] grid grid-cols-2 gap-x-10 gap-y-5">
        {post.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[22px] leading-snug">
            <Check size={26} strokeWidth={2.2} aria-hidden className="mt-0.5 shrink-0 text-clay" />
            {f}
          </li>
        ))}
      </ul>

      {/* Action */}
      <div className="absolute inset-x-16 bottom-14 flex items-center justify-between border-t border-line pt-7">
        <p className="flex items-center gap-3 text-[22px] font-semibold">
          <WhatsAppIcon className="h-8 w-8 text-whatsapp" />
          {post.cta}
        </p>
        <p className="text-[20px] font-semibold text-clay">{SOCIAL_HANDLE}</p>
      </div>
    </div>
  )
}
