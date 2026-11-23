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
 *
 * Campaigns: the first page view with utm_* / gclid / fbclid stores them for the session. They
 * go into the event, and a short code such as "(ref: studios-ig)" is added to the end of the
 * WhatsApp message, so each chat can be tagged by campaign in WhatsApp Business.
 */
const CAMPAIGN_KEY = 'bt_campaign'

type Campaign = { source?: string; medium?: string; campaign?: string; ref: string }

function readCampaign(): Campaign | null {
  try {
    const params = new URLSearchParams(window.location.search)
    const source = params.get('utm_source') ?? (params.get('gclid') ? 'google' : params.get('fbclid') ? 'meta' : null)
    if (source) {
      const campaign = params.get('utm_campaign') ?? undefined
      const ref = (campaign ?? source).toLowerCase().replace(/[^a-z0-9_-]+/g, '-').slice(0, 40)
      const value: Campaign = { source, medium: params.get('utm_medium') ?? undefined, campaign, ref }
      sessionStorage.setItem(CAMPAIGN_KEY, JSON.stringify(value))
      return value
    }
    const stored = sessionStorage.getItem(CAMPAIGN_KEY)
    return stored ? (JSON.parse(stored) as Campaign) : null
  } catch {
    return null
  }
}

function withRef(link: HTMLAnchorElement, ref: string) {
  try {
    const url = new URL(link.href)
    const text = url.searchParams.get('text') ?? ''
    if (text.includes('(ref:')) return
    url.searchParams.set('text', `${text}\n\n(ref: ${ref})`)
    link.href = url.toString()
  } catch {
    // Leave the link as it is.
  }
}

export function Analytics() {
  useEffect(() => {
    readCampaign()
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a')
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      const method = href.startsWith('https://wa.me/') ? 'whatsapp' : href.startsWith('mailto:') ? 'email' : null
      if (!method) return
      const campaign = readCampaign()
      if (campaign && method === 'whatsapp') withRef(link, campaign.ref)
      window.dataLayer = window.dataLayer ?? []
      window.dataLayer.push({
        event: 'generate_lead',
        method,
        service: link.closest<HTMLElement>('[data-service]')?.dataset.service ?? 'geral',
        placement: link.closest<HTMLElement>('[data-placement]')?.dataset.placement ?? 'desconhecido',
        page_path: window.location.pathname,
        utm_source: campaign?.source,
        utm_medium: campaign?.medium,
        utm_campaign: campaign?.campaign,
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
