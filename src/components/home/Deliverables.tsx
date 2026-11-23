import Image from 'next/image'
import { Check, Minus } from 'lucide-react'
import { unsplash } from '@/lib/site'

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

type Cell = boolean | string
const rows: { item: string; c: Cell; p: Cell; a: Cell }[] = [
  { item: 'Briefing', c: 'online', p: true, a: 'geral e por ambiente' },
  { item: 'Moodboard e conceito', c: true, p: true, a: true },
  { item: 'Layout', c: 'orientativo', p: true, a: 'apartamento inteiro' },
  { item: 'Móveis e decoração', c: 'com links de compra', p: 'indicação', a: 'referências' },
  { item: 'Imagens 3D realistas', c: false, p: true, a: 'até 10 vistas' },
  { item: 'Planta de iluminação', c: false, p: true, a: true },
  { item: 'Planta de revestimentos', c: false, p: 'quando aplicável', a: true },
  { item: 'Marcenaria, bancadas e nichos', c: false, p: true, a: true },
  { item: 'Pontos elétricos e hidráulicos', c: false, p: false, a: true },
  { item: 'Memorial descritivo', c: false, p: false, a: true },
  { item: 'Caderno técnico para a obra', c: false, p: true, a: true },
]

function CellView({ value }: { value: Cell }) {
  if (value === false)
    return (
      <>
        <Minus size={18} aria-hidden className="mx-auto text-ink/30" />
        <span className="sr-only">Não incluso</span>
      </>
    )
  return (
    <span className="flex flex-col items-center gap-1">
      <Check size={18} aria-hidden className="text-clay" />
      <span className="sr-only">Incluso</span>
      {typeof value === 'string' && (
        <span className="hidden text-[12px] leading-tight text-ink-soft sm:block">{value}</span>
      )}
    </span>
  )
}

export function Deliverables() {
  return (
    <section aria-labelledby="entrega-title" className="section-y">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="eyebrow">O que você recebe</p>
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

        <div className="mt-20 rounded-[28px] border border-line bg-paper p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <h3 className="font-display text-display-sm text-ink">Compare o que cada serviço inclui</h3>
            <p className="text-[14px] text-ink-soft">Execução, gestão de obra e compras não estão inclusas.</p>
          </div>
          <table className="mt-8 w-full table-fixed border-collapse text-left">
            <caption className="sr-only">Comparação dos entregáveis por serviço</caption>
            <thead>
              <tr className="border-b border-ink/25 align-bottom">
                <th scope="col" className="w-[40%] pb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-soft sm:w-[40%]">
                  Entrega
                </th>
                {[
                  ['Consultoria', 'Consult.', 'R$ 450+'],
                  ['Por ambiente', 'Ambiente', 'R$ 250/m²'],
                  ['Apartamento', 'Apto.', 'R$ 15.000'],
                ].map(([name, short, price]) => (
                  <th key={name} scope="col" className="pb-4 text-center">
                    <span className="block font-display text-[14px] font-normal leading-tight text-ink sm:text-[19px]">
                      <span className="sm:hidden" aria-hidden>{short}</span>
                      <span className="sr-only sm:not-sr-only">{name}</span>
                    </span>
                    <span className="mt-1 hidden text-[13px] font-semibold text-clay tabular sm:block">
                      {price}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.item} className="border-b border-ink/10">
                  <th scope="row" className="py-3.5 pr-3 text-[14px] font-medium leading-snug text-ink sm:text-[15px]">
                    {r.item}
                  </th>
                  <td className="px-1 py-3.5 text-center align-middle">
                    <CellView value={r.c} />
                  </td>
                  <td className="px-1 py-3.5 text-center align-middle">
                    <CellView value={r.p} />
                  </td>
                  <td className="px-1 py-3.5 text-center align-middle">
                    <CellView value={r.a} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
