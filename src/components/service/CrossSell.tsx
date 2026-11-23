import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services, serviceHref, type Service } from '@/data/services'
import { unsplash } from '@/lib/site'

/** Two neighbouring services, for visitors who landed on the wrong page. */
export function CrossSell({ service }: { service: Service }) {
  const others = service.crossSell.map((slug) => services[slug])

  return (
    <section aria-labelledby="outros-title" className="section-y">
      <div className="container-site">
        <p className="eyebrow">Outros serviços</p>
        <h2 id="outros-title" className="mt-4 font-display text-display-sm text-ink">
          Não é bem isso que você precisa?
        </h2>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={serviceHref(s.slug)}
                className="group grid h-full overflow-hidden rounded-[28px] border border-line bg-paper transition-transform duration-500 ease-elegant hover:-translate-y-0.5 sm:grid-cols-[180px_1fr]"
              >
                <div className="photo-zoom relative aspect-[16/9] sm:aspect-auto">
                  <Image src={unsplash(s.hero.image)} alt="" fill sizes="(max-width: 640px) 100vw, 180px" className="object-cover" />
                </div>
                <div className="flex flex-col p-6 md:p-7">
                  <h3 className="font-display text-[24px] leading-tight text-ink group-hover:text-clay">{s.name}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">{s.summary}</p>
                  <p className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[14px] font-semibold text-ink tabular">
                      {s.price.pre} {s.price.value} {s.price.unit}
                    </span>
                    <span className="link-draw text-[15px]">
                      Ver detalhes <ArrowRight size={15} aria-hidden />
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
