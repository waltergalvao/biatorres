import { Check, Minus } from 'lucide-react'

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

/** Side-by-side comparison of what each of the three design services includes. */
export function CompareTable() {
  return (
        <div className="rounded-[28px] border border-line bg-paper p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <h2 id="compare-title" className="font-display text-display-sm text-ink">Compare o que cada serviço inclui</h2>
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
  )
}
