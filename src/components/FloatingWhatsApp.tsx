'use client'

import { useHeroCtaGone } from '@/lib/useHeroCtaGone'
import { usePathname } from 'next/navigation'
import { isArtboardRoute, waLink } from '@/lib/site'
import { WhatsAppIcon } from './WhatsAppIcon'

/**
 * Mobile-only WhatsApp button; appears once the visitor scrolls past the hero actions.
 * Service and audience pages have their own sticky bar with the price, so it stays hidden there.
 */
export function FloatingWhatsApp() {
  const pathname = usePathname()
  const visible = useHeroCtaGone(520, pathname)

  if (pathname.startsWith('/servicos/') || pathname.startsWith('/para/') || isArtboardRoute(pathname)) return null

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      data-placement="flutuante-mobile"
      className={`fixed bottom-4 right-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-whatsapp pl-4 pr-5 text-[15px] font-semibold text-white shadow-[0_12px_30px_-10px_rgb(var(--color-ink)/0.6)] transition-all duration-300 ease-elegant active:scale-95 lg:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <WhatsAppIcon className="h-6 w-6" />
      WhatsApp
    </a>
  )
}
