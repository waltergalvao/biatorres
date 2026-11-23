'use client'

import { useEffect, useState } from 'react'
import { waLink } from '@/lib/site'
import { WhatsAppIcon } from './WhatsAppIcon'

/** Mobile-only WhatsApp button; appears once the visitor scrolls past the hero actions. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-4 right-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-[#1F7A4D] pl-4 pr-5 text-[15px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(43,32,26,0.6)] transition-all duration-300 ease-elegant active:scale-95 lg:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <WhatsAppIcon className="h-6 w-6" />
      WhatsApp
    </a>
  )
}
