import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { unsplash, waLink } from '@/lib/site'

const items = [
  'Laudo técnico com registro fotográfico completo',
  'Avaliação de instalações elétricas e hidráulicas',
  'Identificação de vícios aparentes e ocultos',
  'Verificação de acabamentos e revestimentos',
  'Relatório entregue em até 48 horas',
]

export function Vistoria() {
  return (
    <section aria-labelledby="vistoria-title" className="section-y bg-paper">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="photo-zoom relative aspect-[4/3] overflow-hidden rounded-[28px] lg:col-span-6 lg:aspect-[5/6]">
          <Image
            src={unsplash('1630699144867-37acec97df5a')}
            alt="Apartamento novo vazio, com piso de madeira e porta de vidro para a varanda"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-6">
          <p className="eyebrow !text-olive">Também faço</p>
          <h2 id="vistoria-title" className="mt-4 font-display text-display text-ink">
            Vistoria de imóvel antes das chaves ou do aluguel
          </h2>
          <p className="lede mt-5">
            Recebeu um apartamento novo ou vai alugar o seu? A vistoria registra pendências e
            defeitos antes da mudança e documenta o estado do imóvel na entrada e na saída do
            inquilino.
          </p>
          <ul className="mt-8 space-y-3">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-[16px] leading-snug text-ink">
                <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-olive" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={waLink('Olá, Beatriz! Quero agendar uma vistoria de imóvel. O endereço (bairro) é: ')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Solicitar vistoria
            </a>
            <Link href="/servicos/vistoria" className="link-draw self-start text-[15px] sm:self-auto">
              Ver como funciona a vistoria <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
