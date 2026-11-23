import Image from 'next/image'
import { unsplash } from '@/lib/site'

// TODO(owner): replace these stock photos with real samples of each deliverable (a real
// moodboard, floor plan, 3D render and caderno page) as soon as they exist.

const pieces = [
  {
    title: 'Moodboard de cores e materiais',
    text: 'Cores, tecidos, madeiras e pedras do ambiente numa página só, para decidir antes de comprar.',
    in: 'Nos três serviços',
    img: '1567016432779-094069958ea5',
    alt: 'Detalhe de sofá terracota com almofada rosada sobre fundo verde',
  },
  {
    title: 'Planta de layout',
    text: 'Onde fica cada móvel, com medidas e circulação. Na consultoria, um layout orientativo.',
    in: 'Nos três serviços',
    img: '1503387762-592deb58ef4e?rect=2150,1100,1700,2276',
    alt: 'Mão desenhando uma planta de arquitetura sobre a mesa',
  },
  {
    title: 'Imagens 3D realistas',
    text: 'Você vê o ambiente pronto antes de quebrar uma parede. No apartamento, até 10 vistas.',
    in: 'Projeto por ambiente e apartamento',
    img: '1631889993959-41b4e9c6e3c5',
    alt: 'Imagem realista de banheiro com painel ripado de madeira, banheira e bancada suspensa',
  },
  {
    title: 'Caderno técnico',
    text: 'Plantas, elevações, marcenaria e especificações organizadas para o marceneiro e a obra.',
    in: 'Projeto por ambiente e apartamento',
    img: '1503387837-b154d5074bd2',
    alt: 'Mão anotando sobre folha de projeto impressa, com escalímetro',
  },
]

/** Sample deliverables: what a client actually receives. Stands in for a portfolio. */
export function Deliverables({ className = '' }: { className?: string }) {
  return (
    <section aria-labelledby="entrega-title" className={`section-y ${className}`}>
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="eyebrow">Como fica o seu projeto</p>
          <h2 id="entrega-title" className="mt-4 font-display text-display text-ink">
            Material que você usa para comprar, reformar e montar
          </h2>
        </div>

        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {pieces.map((p, i) => (
            <li key={p.title} className="group">
              <div className="photo-zoom relative aspect-[3/4] overflow-hidden rounded-[22px] bg-sand">
                <Image
                  src={unsplash(p.img)}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-linen/90 px-3 py-1 font-display text-[15px] italic text-clay backdrop-blur-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[22px] leading-tight text-ink">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{p.text}</p>
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-olive">
                {p.in}
              </p>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
