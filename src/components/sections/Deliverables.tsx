import Image from 'next/image'
import { unsplash } from '@/lib/site'

// TODO(owner): replace these stock photos with real samples of each deliverable (a real
// moodboard, floor plan, 3D render and caderno page) as soon as they exist.

export type DeliverableId = 'moodboard' | 'layout' | '3d' | 'caderno'

const pieces: { id: DeliverableId; title: string; text: string; in: string; img: string; alt: string }[] = [
  {
    id: 'moodboard',
    title: 'Moodboard de cores e materiais',
    text: 'Cores, tecidos, madeiras e pedras do ambiente numa página só, para decidir antes de comprar.',
    in: 'Nos três serviços',
    img: '1567016432779-094069958ea5',
    alt: 'Detalhe de sofá terracota com almofada rosada sobre fundo verde',
  },
  {
    id: 'layout',
    title: 'Planta de layout',
    text: 'Onde fica cada móvel, com medidas e circulação. Na consultoria, uma planta simplificada.',
    in: 'Nos três serviços',
    img: '1503387762-592deb58ef4e?rect=2150,1100,1700,2276',
    alt: 'Mão desenhando uma planta de arquitetura sobre a mesa',
  },
  {
    id: '3d',
    title: 'Imagens 3D realistas',
    text: 'Você vê o ambiente pronto antes de quebrar uma parede. No apartamento, até 10 vistas.',
    in: 'Projeto por ambiente e apartamento',
    img: '1631889993959-41b4e9c6e3c5',
    alt: 'Imagem realista de banheiro com painel ripado de madeira, banheira e bancada suspensa',
  },
  {
    id: 'caderno',
    title: 'Caderno técnico',
    text: 'O manual da obra: plantas, desenhos de cada parede com medidas, marcenaria e especificações para o marceneiro e o pedreiro.',
    in: 'Projeto por ambiente e apartamento',
    img: '1503387837-b154d5074bd2',
    alt: 'Mão anotando sobre folha de projeto impressa, com escalímetro',
  },
]

/**
 * Sample deliverables: what a client actually receives. Stands in for a portfolio.
 * `only` limits the pieces to what one service delivers; without it, all four show.
 */
export function Deliverables({ className = '', only }: { className?: string; only?: DeliverableId[] }) {
  const shown = only ? pieces.filter((p) => only.includes(p.id)) : pieces
  const few = shown.length <= 2

  return (
    <section aria-labelledby="entrega-title" className={`section-y ${className}`}>
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="eyebrow">Como fica o seu projeto</p>
          <h2 id="entrega-title" className="mt-4 font-display text-display text-ink">
            Material que você usa para comprar, reformar e montar
          </h2>
        </div>

        <ul
          className={`mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-14 sm:gap-x-6 sm:gap-y-12 ${few ? 'lg:max-w-4xl' : 'lg:grid-cols-4'}`}
        >
          {shown.map((p, i) => (
            <li key={p.id} className="group">
              <div className="photo-zoom relative aspect-square overflow-hidden rounded-[18px] bg-sand sm:aspect-[3/4] sm:rounded-[22px]">
                <Image
                  src={unsplash(p.img)}
                  alt={p.alt}
                  fill
                  sizes={few ? '(max-width: 1024px) 50vw, 450px' : '(max-width: 1024px) 50vw, 25vw'}
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-linen/90 px-2.5 py-0.5 font-display text-[14px] italic text-clay backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[15px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[19px] leading-tight text-ink sm:mt-5 sm:text-[22px]">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-soft sm:text-[15px]">{p.text}</p>
              <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-olive sm:text-[13px] sm:tracking-[0.12em]">
                {p.in}
              </p>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
