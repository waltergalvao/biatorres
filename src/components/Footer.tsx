import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-brand-bg-dark">
      <div className="section-padding py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold tracking-wide text-brand-text leading-none">
                Beatriz Torres
              </span>
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-text-muted mt-1">
                Arquitetura
              </span>
            </div>
            <p className="mt-6 text-sm text-brand-text-muted leading-relaxed max-w-xs">
              Arquitetura residencial e ambientes planejados com sofisticação e personalidade.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-label mb-5">Navegação</h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Início' },
                { href: '/projetos', label: 'Projetos' },
                { href: '/sobre', label: 'Sobre' },
                { href: '/contato', label: 'Contato' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-brand-text-muted hover:text-brand-text transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-label mb-5">Contato</h4>
            <div className="flex flex-col gap-3 text-sm text-brand-text-muted">
              <a
                href="mailto:contato@beatriztorres.arq.br"
                className="hover:text-brand-text transition-colors duration-300"
              >
                contato@beatriztorres.arq.br
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-text transition-colors duration-300"
              >
                +55 (11) 99999-9999
              </a>
              <p>São Paulo, SP — Brasil</p>
            </div>

            <div className="flex gap-6 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text-muted hover:text-brand-text transition-colors duration-300 text-sm"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text-muted hover:text-brand-text transition-colors duration-300 text-sm"
                aria-label="Pinterest"
              >
                Pinterest
              </a>
            </div>
          </div>
        </div>

        <div className="divider mt-16 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-brand-text-muted tracking-wide">
          <span>© {new Date().getFullYear()} Beatriz Torres Arquitetura</span>
          <span>Todos os direitos reservados</span>
        </div>
      </div>
    </footer>
  )
}
