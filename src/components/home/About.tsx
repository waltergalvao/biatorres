import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { unsplash } from '@/lib/site'

const principles = [
  {
    title: 'Pensado para o tamanho real',
    text: 'Em 40 m², um sofá errado ocupa a sala inteira. Cada decisão começa pelas medidas do seu apartamento.',
  },
  {
    title: 'Tudo online, sem perder o cuidado',
    text: 'Planta, fotos e uma chamada de vídeo bastam. Você recebe tudo em PDF, de qualquer cidade.',
  },
  {
    title: 'Você sabe o que vai receber',
    text: 'Cada serviço tem entregas e valores publicados. Antes de começar, a proposta vem por escrito.',
  },
]

/** Who is behind the studio and how she works: trust before the offer. */
export function About() {
  return (
    <section aria-labelledby="sobre-title" className="section-y bg-paper">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sand">
            <Image
              src={unsplash('1573496359142-b8d87734a5a2')}
              alt="Retrato de Beatriz Torres, arquiteta"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="eyebrow">Quem faz</p>
          <h2 id="sobre-title" className="mt-4 font-display text-display text-ink">
            Sou a Beatriz. Eu cuido de cada projeto, do briefing à entrega.
          </h2>
          <p className="lede mt-6 max-w-2xl">
            Arquiteta formada pela FAU-USP, com especialização em design de interiores e mais de dez anos
            em projetos residenciais. Hoje me dedico a apartamentos compactos: studios para alugar,
            primeiro imóvel e quem quer fazer mais com menos metros.
          </p>

          <ul className="mt-10 grid gap-6 border-t border-line pt-8 md:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title}>
                <h3 className="font-display text-[21px] leading-tight text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{p.text}</p>
              </li>
            ))}
          </ul>

          <Link href="/sobre" className="link-draw mt-10 self-start text-[16px]">
            Conheça a minha história <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
