'use client'

import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

/**
 * Lead tracking for Google Ads / GA4.
 *
 * Every click on a WhatsApp link (or a mailto link) pushes a `generate_lead` event to the
 * dataLayer, with the page path, the service (from the nearest `data-service`) and where on
 * the page it was clicked (from the nearest `data-placement`). In Google Tag Manager, map
 * that event to the Google Ads conversion. Set NEXT_PUBLIC_GTM_ID to load the container.
 */
export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a')
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      const method = href.startsWith('https://wa.me/') ? 'whatsapp' : href.startsWith('mailto:') ? 'email' : null
      if (!method) return
      window.dataLayer = window.dataLayer ?? []
      window.dataLayer.push({
        event: 'generate_lead',
        method,
        service: link.closest<HTMLElement>('[data-service]')?.dataset.service ?? 'geral',
        placement: link.closest<HTMLElement>('[data-placement]')?.dataset.placement ?? 'desconhecido',
        page_path: window.location.pathname,
      })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  if (!GTM_ID) return null

  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  )
}
