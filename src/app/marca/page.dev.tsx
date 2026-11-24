import type { Metadata } from 'next'
import { colors, cssVar, fonts, kebab, rgbChannels, type ColorName } from '@/design/tokens'
import { Monogram } from '@/components/Monogram'
import { Logo } from '@/components/Logo'

// Internal reference for the design system: colors, type and buttons, all read from
// src/design/tokens.ts. Not linked from the site and not indexed.
export const metadata: Metadata = {
  title: 'Marca',
  robots: { index: false, follow: false },
}

const typeScale = [
  { cls: 'text-display-xl', label: 'display-xl', sample: 'Projeto de interiores' },
  { cls: 'text-display', label: 'display', sample: 'Casa pequena não perdoa improviso' },
  { cls: 'text-display-sm', label: 'display-sm', sample: 'Qual é o seu caso?' },
  { cls: 'text-heading', label: 'heading', sample: 'Consultoria de interiores' },
]

/** Light text on these swatches; dark text on the rest. */
const darkSwatches: ColorName[] = ['ink', 'inkSoft', 'clay', 'clayDeep', 'olive', 'whatsapp']

export default function BrandPage() {
  return (
    <div className="container-site py-16 md:py-24">
      <p className="eyebrow">Sistema de design</p>
      <h1 className="mt-4 font-display text-display text-ink">Marca</h1>
      <p className="lede mt-5 max-w-2xl">
        Logo, cores, tipografia e botões do site. Os valores ficam em <code className="text-[0.9em]">src/design/tokens.ts</code>:
        mude ali e o site inteiro acompanha. Use os hex abaixo em posts, stories e apresentações.
      </p>

      <section aria-labelledby="logo" className="mt-16">
        <h2 id="logo" className="font-display text-display-sm text-ink">Logo</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="flex h-64 items-center justify-center rounded-[20px] border border-line bg-paper">
            <Monogram className="h-40 w-auto text-clay" title="Monograma BT" />
          </div>
          <div className="flex h-64 items-center justify-center rounded-[20px] bg-ink">
            <Monogram className="h-40 w-auto text-clay-soft" title="Monograma BT sobre fundo escuro" />
          </div>
          <div className="flex h-64 flex-col items-center justify-center gap-8 rounded-[20px] border border-line bg-linen">
            <Logo />
            <div className="rounded-[18px] bg-ink px-6 py-3">
              <Logo tone="light" />
            </div>
          </div>
        </div>
        <p className="mt-5 text-[14px] text-ink-soft">
          Monograma em terracota (<code>text-clay</code>); sobre fundo escuro, <code>text-clay-soft</code>. Em tamanho pequeno use{' '}
          <code>{'<Monogram weight={1.6} />'}</code> para a linha não sumir.{' '}
          <a href="/marca/monograma.svg" download className="link-draw text-clay">Baixar SVG (terracota)</a>
          {' · '}
          <a href="/marca/monograma.svg?cor=ink" download className="link-draw text-clay">Baixar SVG (espresso)</a>
        </p>
      </section>

      <section aria-labelledby="cores" className="mt-20">
        <h2 id="cores" className="font-display text-display-sm text-ink">Cores</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(colors) as ColorName[]).map((name) => {
            const c = colors[name]
            const dark = darkSwatches.includes(name)
            return (
              <li key={name} className="overflow-hidden rounded-[20px] border border-line bg-paper">
                <div
                  className={`flex h-28 items-end p-4 font-display text-[22px] ${dark ? 'text-linen' : 'text-ink'}`}
                  style={{ backgroundColor: `rgb(var(${cssVar(name)}))` }}
                >
                  {kebab(name)}
                </div>
                <dl className="grid gap-1 p-4 text-[13px] text-ink-soft">
                  <dt className="sr-only">Uso</dt>
                  <dd className="text-[14px] text-ink">{c.role}</dd>
                  <dt className="sr-only">Hex</dt>
                  <dd className="font-semibold text-ink tabular">{c.hex}</dd>
                  <dt className="sr-only">RGB</dt>
                  <dd className="tabular">rgb({rgbChannels(c.hex).replaceAll(' ', ', ')})</dd>
                  <dt className="sr-only">Variável e classe</dt>
                  <dd>
                    <code>{cssVar(name)}</code> · <code>bg-{kebab(name)}</code>
                  </dd>
                </dl>
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-labelledby="tipografia" className="mt-20">
        <h2 id="tipografia" className="font-display text-display-sm text-ink">Tipografia</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {Object.entries(fonts).map(([key, f]) => (
            <div key={key} className="rounded-[20px] border border-line bg-paper p-6">
              <p className={`${key === 'display' ? 'font-display' : 'font-sans'} text-[40px] leading-none text-ink`}>Aa</p>
              <p className="mt-4 font-semibold text-ink">{f.family}</p>
              <p className="mt-1 text-[14px] text-ink-soft">{f.use}</p>
              <p className="mt-2 text-[13px] text-ink-soft">
                <code>var({f.variable})</code> · <code>font-{key}</code>
              </p>
            </div>
          ))}
        </div>
        <ul className="mt-10 grid gap-6 border-t border-line pt-8">
          {typeScale.map((t) => (
            <li key={t.cls} className="grid gap-2 md:grid-cols-[160px_1fr] md:items-baseline">
              <code className="text-[13px] text-ink-soft">{t.label}</code>
              <p className={`font-display ${t.cls} text-ink`}>
                {t.sample.split(' ').slice(0, -1).join(' ')} <em className="italic text-clay">{t.sample.split(' ').slice(-1)}</em>
              </p>
            </li>
          ))}
          <li className="grid gap-2 md:grid-cols-[160px_1fr] md:items-baseline">
            <code className="text-[13px] text-ink-soft">eyebrow</code>
            <p className="eyebrow">Para quem</p>
          </li>
          <li className="grid gap-2 md:grid-cols-[160px_1fr] md:items-baseline">
            <code className="text-[13px] text-ink-soft">lede</code>
            <p className="lede max-w-2xl">Ajudo quem tem um apartamento compacto a usar bem cada metro.</p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="botoes" className="mt-20">
        <h2 id="botoes" className="font-display text-display-sm text-ink">Botões</h2>
        <div className="mt-8 flex flex-wrap gap-4">
          <span className="btn-primary">btn-primary</span>
          <span className="btn-outline">btn-outline</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 rounded-[20px] bg-ink p-6">
          <span className="btn-light">btn-light</span>
          <span className="btn-ghost-light">btn-ghost-light</span>
        </div>
      </section>
    </div>
  )
}
