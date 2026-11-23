'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ImageIcon, X } from 'lucide-react'
import type { WorkImage, WorkItem } from '@/data/work'
import { services, serviceHref } from '@/data/services'
import { unsplash, waLink } from '@/lib/site'
import { WhatsAppIcon } from '../WhatsAppIcon'

const src = (s: string) => (s.startsWith('/') ? s : unsplash(s))

/** One image: the photo when there is one, otherwise a labelled placeholder box. */
function Frame({
  image,
  className,
  sizes,
  showKind = true,
}: {
  image: WorkImage
  className: string
  sizes: string
  showKind?: boolean
}) {
  return (
    <div className={`relative overflow-hidden bg-sand-deep ${className}`}>
      {image.src ? (
        <Image src={src(image.src)} alt={image.alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={`Espaço reservado: ${image.alt}`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-ink/20 p-2 text-center text-ink-soft"
        >
          <ImageIcon size={24} aria-hidden strokeWidth={1.5} />
          {showKind && <span className="text-[12px] font-semibold leading-tight">{image.alt}</span>}
        </div>
      )}
      {showKind && (
        <span className="absolute left-3 top-3 rounded-full bg-linen/90 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm">
          {image.kind}
        </span>
      )}
    </div>
  )
}

/** Project details in a native <dialog>: gallery with thumbnails, the story and a CTA. */
function ProjectDialog({ item, onClose }: { item: WorkItem | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (item) {
      setShown(0)
      if (!d.open) d.showModal()
      document.body.style.overflow = 'hidden'
    } else if (d.open) {
      d.close()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [item])

  const service = item ? services[item.service] : null
  const current = item?.images[shown]

  return (
    <dialog
      ref={ref}
      aria-labelledby="projeto-titulo"
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop lands on the <dialog> element itself.
        if (e.target === e.currentTarget) onClose()
      }}
      className="m-auto max-h-[calc(92*var(--svh))] w-[min(1080px,calc(100*var(--vw)-24px))] overflow-hidden rounded-[28px] bg-linen p-0 text-ink shadow-[0_40px_120px_-30px_rgb(var(--color-ink)/0.6)] backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      {item && service && current && (
        <div className="grid max-h-[calc(92*var(--svh))] overflow-y-auto lg:grid-cols-[1.35fr_1fr]">
          <div className="bg-sand p-3 sm:p-4">
            <Frame image={current} className="aspect-[4/3] rounded-[20px]" sizes="(max-width: 1024px) 100vw, 600px" />
            {item.images.length > 1 && (
              <ul className="mt-3 grid grid-cols-4 gap-2 sm:gap-3" aria-label="Imagens do projeto">
                {item.images.map((img, k) => (
                  <li key={k}>
                    <button
                      type="button"
                      onClick={() => setShown(k)}
                      aria-label={`Ver imagem ${k + 1}: ${img.alt}`}
                      aria-current={k === shown}
                      className={`block w-full overflow-hidden rounded-[12px] ring-2 ring-offset-2 ring-offset-sand transition ${
                        k === shown ? 'ring-clay' : 'ring-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Frame image={img} className="aspect-[4/3]" sizes="140px" showKind={false} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative flex flex-col p-7 md:p-9">
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-sand"
            >
              <X size={18} aria-hidden />
            </button>

            <p className="pr-12 text-[13px] font-semibold uppercase tracking-[0.12em] text-olive">{item.facts}</p>
            <h3 id="projeto-titulo" className="mt-3 pr-12 font-display text-display-sm text-ink">
              {item.title}
            </h3>

            <dl className="mt-7 space-y-5 border-t border-ink/15 pt-6">
              <div>
                <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-soft">O desafio</dt>
                <dd className="mt-1.5 text-[16px] leading-relaxed text-ink">{item.problem}</dd>
              </div>
              <div>
                <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-soft">O projeto</dt>
                <dd className="mt-1.5 text-[16px] leading-relaxed text-ink">{item.solution}</dd>
              </div>
            </dl>

            {item.quote && (
              <figure className="mt-7 rounded-[20px] bg-paper p-6">
                <blockquote className="font-display text-[18px] leading-snug text-ink">“{item.quote.text}”</blockquote>
                <figcaption className="mt-3 text-[14px] text-ink-soft">{item.quote.name}</figcaption>
              </figure>
            )}

            <div className="mt-auto flex flex-col gap-4 pt-8" data-placement="projeto">
              <a
                href={waLink(`Olá, Beatriz! Vi o projeto ${item.title} no site e quero algo parecido. Meu imóvel: `)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Quero um projeto assim
              </a>
              <Link href={serviceHref(item.service)} className="link-draw self-center text-[15px]">
                Serviço: {service.name} <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}

/**
 * Real projects as a slim row of cards. Each card opens a dialog with the gallery and the
 * story, so the section stays short for visitors who only want a glance.
 */
export function Work({ items }: { items: WorkItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  if (items.length === 0) return null

  return (
    <section aria-labelledby="trabalhos-title" className="bg-sand py-16 md:py-20">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Trabalhos</p>
            <h2 id="trabalhos-title" className="mt-3 font-display text-display-sm text-ink">
              Alguns projetos
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">
            Toque em um projeto para ver as imagens e o que foi resolvido.
          </p>
        </div>

        <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {items.map((w, n) => (
            <li key={`${w.title}-${n}`} className="w-[78%] shrink-0 snap-start md:w-auto">
              <button
                type="button"
                onClick={() => setOpen(n)}
                aria-haspopup="dialog"
                className="group block w-full text-left"
              >
                <Frame
                  image={w.images[0]}
                  className="aspect-[4/3] rounded-[22px] transition-transform duration-500 ease-elegant group-hover:-translate-y-0.5"
                  sizes="(max-width: 768px) 78vw, 33vw"
                />
                <span className="mt-4 flex items-start justify-between gap-3">
                  <span>
                    <span className="block font-display text-[21px] leading-tight text-ink group-hover:text-clay">
                      {w.title}
                    </span>
                    <span className="mt-1 block text-[13px] font-semibold uppercase tracking-[0.1em] text-olive">
                      {w.facts}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors group-hover:border-clay group-hover:bg-clay group-hover:text-paper"
                  >
                    <ArrowUpRight size={16} />
                  </span>
                </span>
                <span className="mt-2 block text-[15px] leading-snug text-ink-soft">{w.problem}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ProjectDialog item={open === null ? null : items[open]} onClose={() => setOpen(null)} />
    </section>
  )
}
