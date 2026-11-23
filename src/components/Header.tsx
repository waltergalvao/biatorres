'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import {
  PRIMARY_CTA,
  audienceLinks,
  pageLinks,
  serviceLinks,
  unsplash,
  type NavLink,
} from '@/lib/site'
import { Logo } from './Logo'
import { WhatsAppIcon } from './WhatsAppIcon'

type MenuId = 'servicos' | 'para' | null

export function Header() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<MenuId>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on navigation.
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Escape closes dropdowns and the mobile menu; click outside closes dropdowns.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (openMenu) {
        const trigger = document.getElementById(`trigger-${openMenu}`)
        setOpenMenu(null)
        trigger?.focus()
      }
      if (mobileOpen) {
        setMobileOpen(false)
        document.getElementById('mobile-menu-button')?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [openMenu, mobileOpen])

  const hoverOpen = useCallback((id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(id)
  }, [])
  const hoverClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  // Ad landing pages (/para/*): logo and one action. No site navigation for paid traffic to
  // wander off through; the page itself links to the service details.
  if (pathname.startsWith('/para/')) {
    return (
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? 'border-line bg-linen/95 backdrop-blur-md' : 'border-transparent bg-linen'
        }`}
        data-placement="header"
      >
        <div className="container-site flex h-[72px] items-center justify-between gap-4">
          <Logo />
          <a
            href={PRIMARY_CTA.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !min-h-[44px] !px-4 !py-2.5 sm:!px-5"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span className="hidden sm:inline">{PRIMARY_CTA.label}</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </header>
    )
  }

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'border-line bg-linen/95 backdrop-blur-md'
          : 'border-transparent bg-linen'
      }`}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Logo />

        {/* Desktop navigation */}
        <nav ref={navRef} aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <Dropdown
              id="servicos"
              label="Serviços"
              open={openMenu === 'servicos'}
              active={pathname.startsWith('/servicos')}
              onToggle={() => setOpenMenu(openMenu === 'servicos' ? null : 'servicos')}
              onHoverOpen={() => hoverOpen('servicos')}
              onHoverClose={hoverClose}
              onBlurOutside={() => setOpenMenu(null)}
            >
              <ServicesPanel />
            </Dropdown>
            <Dropdown
              id="para"
              label="Para quem"
              open={openMenu === 'para'}
              active={pathname.startsWith('/para')}
              onToggle={() => setOpenMenu(openMenu === 'para' ? null : 'para')}
              onHoverOpen={() => hoverOpen('para')}
              onHoverClose={hoverClose}
              onBlurOutside={() => setOpenMenu(null)}
            >
              <AudiencePanel />
            </Dropdown>
            {pageLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`inline-flex min-h-[44px] items-center rounded-full px-4 text-[15px] font-medium transition-colors duration-200 hover:bg-sand ${
                    isActive(link.href) ? 'text-clay' : 'text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PRIMARY_CTA.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !min-h-[44px] !px-5 !py-2.5 sm:inline-flex"
          >
            {PRIMARY_CTA.label}
          </a>
          <button
            id="mobile-menu-button"
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/20 px-4 text-[15px] font-semibold text-ink transition-colors hover:bg-sand lg:hidden"
          >
            {mobileOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            <span>{mobileOpen ? 'Fechar' : 'Menu'}</span>
          </button>
        </div>
      </div>

    </header>
    {/* Outside the header: its backdrop-filter would trap a fixed child. */}
    <MobileMenu open={mobileOpen} isActive={isActive} />
    </>
  )
}

function Dropdown({
  id,
  label,
  open,
  active,
  onToggle,
  onHoverOpen,
  onHoverClose,
  onBlurOutside,
  children,
}: {
  id: string
  label: string
  open: boolean
  active: boolean
  onToggle: () => void
  onHoverOpen: () => void
  onHoverClose: () => void
  onBlurOutside: () => void
  children: React.ReactNode
}) {
  return (
    <li
      className="relative"
      onMouseEnter={onHoverOpen}
      onMouseLeave={onHoverClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onBlurOutside()
      }}
    >
      <button
        id={`trigger-${id}`}
        type="button"
        aria-expanded={open}
        aria-controls={`menu-${id}`}
        onClick={onToggle}
        className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-4 text-[15px] font-medium transition-colors duration-200 hover:bg-sand ${
          open ? 'bg-sand' : ''
        } ${active ? 'text-clay' : 'text-ink'}`}
      >
        {label}
        <ChevronDown
          size={16}
          aria-hidden
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        id={`menu-${id}`}
        hidden={!open}
        className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
      >
        <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_24px_60px_-24px_rgba(43,32,26,0.35)]">
          {children}
        </div>
      </div>
    </li>
  )
}

function PanelLink({ link }: { link: NavLink }) {
  return (
    <Link
      href={link.href}
      className="group flex items-start justify-between gap-6 rounded-xl px-4 py-3.5 transition-colors duration-200 hover:bg-linen"
    >
      <span>
        <span className="block font-display text-[19px] leading-tight text-ink group-hover:text-clay">
          {link.label}
        </span>
        {link.description && (
          <span className="mt-1 block text-[14px] leading-snug text-ink-soft">
            {link.description}
          </span>
        )}
      </span>
      {link.meta && (
        <span className="mt-0.5 whitespace-nowrap rounded-full bg-sand px-2.5 py-1 text-[12px] font-semibold text-ink tabular">
          {link.meta}
        </span>
      )}
    </Link>
  )
}

function ServicesPanel() {
  return (
    <div className="grid w-[760px] grid-cols-[1fr_240px]">
      <div className="p-3">
        <ul>
          {serviceLinks.map((link) => (
            <li key={link.href}>
              <PanelLink link={link} />
            </li>
          ))}
        </ul>
      </div>
      <div className="relative bg-sand">
        <Image
          src={unsplash('1616627561839-074385245ff6')}
          alt="Quarto com roupa de cama terracota e cabeceira de madeira"
          fill
          sizes="240px"
          className="object-cover"
        />
        <div className="absolute inset-x-3 bottom-3 rounded-xl bg-ink/85 p-4 text-linen backdrop-blur-sm">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ochre">Comece por aqui</p>
          <p className="mt-1 font-display text-[18px] leading-tight">
            Consultoria de um quarto por R$ 450
          </p>
        </div>
      </div>
    </div>
  )
}

function AudiencePanel() {
  return (
    <div className="w-[440px] p-3">
      <ul>
        {audienceLinks.map((link) => (
          <li key={link.href}>
            <PanelLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function MobileMenu({ open, isActive }: { open: boolean; isActive: (href: string) => boolean }) {
  const [section, setSection] = useState<'servicos' | 'para' | null>(null)

  return (
    <div
      id="mobile-menu"
      className={`fixed inset-x-0 bottom-0 top-[73px] z-40 flex-col bg-linen lg:hidden ${
        open ? 'flex' : 'hidden'
      }`}
    >
      <nav aria-label="Menu" className="flex-1 overflow-y-auto">
        <div className="container-site py-4">
          <MobileGroup
            id="m-servicos"
            label="Serviços"
            open={section === 'servicos'}
            onToggle={() => setSection(section === 'servicos' ? null : 'servicos')}
          >
            {serviceLinks.map((link) => (
              <MobileSubLink key={link.href} link={link} />
            ))}
          </MobileGroup>
          <MobileGroup
            id="m-para"
            label="Para quem"
            open={section === 'para'}
            onToggle={() => setSection(section === 'para' ? null : 'para')}
          >
            {audienceLinks.map((link) => (
              <MobileSubLink key={link.href} link={link} />
            ))}
          </MobileGroup>
          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`flex min-h-[60px] items-center border-b border-line font-display text-[26px] ${
                isActive(link.href) ? 'text-clay' : 'text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className="border-t border-line bg-paper">
        <div className="container-site py-4">
          <a
            href={PRIMARY_CTA.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full"
          >
            {PRIMARY_CTA.label} pelo WhatsApp
          </a>
          <p className="mt-2 text-center text-[13px] text-ink-soft">
            Consultoria online a partir de R$ 450 por ambiente
          </p>
        </div>
      </div>
    </div>
  )
}

function MobileGroup({
  id,
  label,
  open,
  onToggle,
  children,
}: {
  id: string
  label: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex min-h-[60px] w-full items-center justify-between font-display text-[26px] text-ink"
      >
        {label}
        <ChevronDown
          size={22}
          aria-hidden
          className={`text-clay transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <ul id={id} hidden={!open} className="pb-3">
        {children}
      </ul>
    </div>
  )
}

function MobileSubLink({ link }: { link: NavLink }) {
  return (
    <li>
      <Link
        href={link.href}
        className="flex min-h-[52px] items-center justify-between gap-4 rounded-xl px-3 py-2.5 hover:bg-sand"
      >
        <span>
          <span className="block text-[16px] font-semibold text-ink">{link.label}</span>
          {link.description && (
            <span className="mt-0.5 block text-[14px] leading-snug text-ink-soft">
              {link.description}
            </span>
          )}
        </span>
        {link.meta && (
          <span className="whitespace-nowrap text-[13px] font-semibold text-clay tabular">
            {link.meta}
          </span>
        )}
      </Link>
    </li>
  )
}
