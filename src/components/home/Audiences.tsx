import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { unsplash } from '@/lib/site'

const audiences = [
  {
    href: '/para/investidores',
    kicker: 'Investidores e studios',
    title: 'Studio pronto para alugar',
    text: 'Layout que aproveita cada metro, acabamentos que aguentam troca de hóspedes e um visual que fotografa bem no anúncio.',
    img: '1595526114035-0d45ed16cfbf',
    alt: 'Quarto claro de studio com cama de casal, mesa de cabeceira e janela',
    cta: 'Ver soluções para investidores',
  },
  {
    href: '/para/primeiro-apartamento',
    kicker: 'Primeiro apartamento',
    title: 'Chaves na mão, casa vazia',
    text: 'Decida o que comprar primeiro e onde cada móvel entra, antes de gastar com o que não cabe.',
    img: '1502672260266-1c1ef2d93688',
    alt: 'Sala de apartamento com sofá cinza, plantas, estante e luz natural',
    cta: 'Ver o caminho para o primeiro apê',
  },
  {
    href: '/para/apartamentos-compactos',
    kicker: 'Apartamentos até 50 m²',
    title: 'Sala, cozinha e quarto sem aperto',
    text: 'Marcenaria sob medida, circulação livre e um conceito só para o apartamento inteiro.',
    img: '1522708323590-d24dbb6b0267',
    alt: 'Sala e jantar integrados em apartamento compacto com piso de madeira e poltrona vermelha',
    cta: 'Ver projetos para compactos',
  },
]

export function Audiences() {
  return (
    <section aria-labelledby="para-title" className="section-y bg-paper">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Para quem</p>
            <h2 id="para-title" className="mt-4 font-display text-display text-ink">
              Feito para apartamentos de até 60 m²
            </h2>
          </div>
          <p className="lede lg:col-span-5">
            O projeto do apartamento completo foi desenhado para esse tamanho. Escolha o seu caso e
            veja por onde começar.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {audiences.map((a) => (
            <li key={a.href}>
              <Link
                href={a.href}
                className="group flex h-full flex-col transition-transform duration-500 ease-elegant hover:-translate-y-0.5"
              >
                <div className="photo-zoom relative aspect-[4/5] overflow-hidden rounded-[24px]">
                  <Image
                    src={unsplash(a.img)}
                    alt={a.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-linen/90 px-3 py-1.5 text-[13px] font-semibold text-ink backdrop-blur-sm">
                    {a.kicker}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[26px] leading-tight text-ink group-hover:text-clay">
                  {a.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">{a.text}</p>
                <span className="link-draw mt-5 self-start text-[15px]">
                  {a.cta} <ArrowUpRight size={16} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
