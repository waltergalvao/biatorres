'use client'

import { useHeroCtaGone } from '@/lib/useHeroCtaGone'
import { waLink } from '@/lib/site'
import { WhatsAppIcon } from '../WhatsAppIcon'

/**
 * Mobile bar with the price and the WhatsApp action, shown once the hero buttons scroll away.
 * Replaces the generic floating WhatsApp button on service pages.
 */
export function StickyCta({
  pre,
  value,
  unit,
  label,
  message,
}: {
  pre?: string
  value: string
  unit?: string
  label: string
  message: string
}) {
  const visible = useHeroCtaGone(700)

  return (
    <div
      aria-hidden={!visible}
      data-placement="sticky-mobile"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md transition-transform duration-300 ease-elegant lg:hidden ${
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="container-site flex items-center justify-between gap-3 py-3">
        <p className="min-w-0 leading-tight">
          {pre && <span className="block text-[12px] text-ink-soft">{pre}</span>}
          <span className="whitespace-nowrap font-display text-[22px] text-ink tabular">{value}</span>
          {unit && <span className="ml-1 inline-block text-[13px] text-ink-soft">{unit}</span>}
        </p>
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="btn-primary !min-h-[46px] shrink-0 !px-4 !text-[14px]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {label}
        </a>
      </div>
    </div>
  )
}
