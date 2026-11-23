import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'

// Editorial mosaic: one large frame and four smaller ones.
const picks = [1, 4, 5, 3, 9]
const layout = [
  'col-span-2 aspect-[4/5] md:row-span-2 md:aspect-auto',
  'aspect-square md:aspect-auto',
  'aspect-square md:aspect-auto',
  'aspect-square md:aspect-auto',
  'aspect-square md:aspect-auto',
]

export function Gallery() {
  const items = picks
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is (typeof projects)[number] => Boolean(p))

  return (
    <section aria-labelledby="projetos-title" className="section-y bg-sand">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Projetos</p>
            <h2 id="projetos-title" className="mt-4 font-display text-display text-ink">
              Projetos de salas, quartos e cozinhas
            </h2>
          </div>
          <Link href="/projetos" className="link-draw shrink-0 text-[16px]">
            Ver todos os projetos <ArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-[repeat(2,minmax(220px,300px))] md:gap-4">
          {items.map((p, i) => (
            <li key={p.id} className={`relative ${layout[i]}`}>
              <Link
                href="/projetos"
                className="group photo-zoom absolute inset-0 overflow-hidden rounded-[20px]"
              >
                <Image
                  src={p.image}
                  alt={`${p.title} — ${p.categoryLabel.toLowerCase()} em ${p.location}`}
                  fill
                  sizes={i === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                  className="object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-4 pt-16 text-linen">
                  <span className="block font-display text-[17px] leading-tight md:text-[19px]">{p.title}</span>
                  <span className="mt-0.5 block text-[12px] text-linen/85">{p.categoryLabel}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
