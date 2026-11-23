'use client'

import { useEffect, useState } from 'react'

/**
 * True once the hero's primary button has scrolled up out of view. The sticky bars use it so
 * there is always exactly one WhatsApp button on screen: the hero's, then the bar's.
 * Falls back to a scroll distance on pages without a hero button.
 */
/** `resetKey` (e.g. the pathname) re-finds the hero after a client-side navigation. */
export function useHeroCtaGone(fallbackScrollY = 600, resetKey?: string) {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    setGone(false)
    const el = document.querySelector('[data-placement="hero"] .btn-primary')
    if (!el || !('IntersectionObserver' in window)) {
      const onScroll = () => setGone(window.scrollY > fallbackScrollY)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }
    const io = new IntersectionObserver(([entry]) =>
      setGone(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    )
    io.observe(el)
    return () => io.disconnect()
  }, [fallbackScrollY, resetKey])

  return gone
}
