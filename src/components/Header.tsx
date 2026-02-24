"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/projetos", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-elegant ${
          scrolled
            ? "bg-brand-bg/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(212,197,190,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="section-padding flex items-center justify-between h-20 md:h-24">
          <Link href="/" className="relative z-10">
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-semibold tracking-wide text-brand-text leading-none">
                Beatriz Torres
              </span>
              <span className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-brand-text-muted mt-0.5">
                Arquitetura
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-sans text-lg tracking-[0.08em] uppercase transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-brand-text"
                    : "text-brand-text-muted hover:text-brand-text"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-brand-accent"
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-10 md:hidden w-8 h-8 flex flex-col items-end justify-center gap-1.5"
            aria-label="Menu"
          >
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: 45, y: 4.5, width: "100%" }
                  : { rotate: 0, y: 0, width: "100%" }
              }
              className="block h-px bg-brand-text origin-center"
              transition={{ duration: 0.3 }}
              style={{ width: "100%" }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px bg-brand-text"
              transition={{ duration: 0.2 }}
              style={{ width: "60%" }}
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: -4.5, width: "100%" }
                  : { rotate: 0, y: 0, width: "100%" }
              }
              className="block h-px bg-brand-text origin-center"
              transition={{ duration: 0.3 }}
              style={{ width: "80%" }}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-brand-bg flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className={`font-serif text-4xl transition-colors duration-300 ${
                      pathname === link.href
                        ? "text-brand-text"
                        : "text-brand-text-muted hover:text-brand-text"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
