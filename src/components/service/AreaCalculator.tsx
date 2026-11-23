'use client'

import { useId, useState } from 'react'
import { waLink } from '@/lib/site'

const brl = (n: number) => `R$ ${n.toLocaleString('pt-BR')}`

/** m² → reference price, with the per-contract minimum applied. */
export function AreaCalculator({ perM2, minimum }: { perM2: number; minimum: number }) {
  const id = useId()
  const [area, setArea] = useState('10')
  const m2 = Math.max(0, Number(area.replace(',', '.')) || 0)
  const raw = Math.round(m2 * perM2)
  const total = m2 > 0 ? Math.max(raw, minimum) : 0
  const hitMinimum = m2 > 0 && raw < minimum

  return (
    <div className="rounded-[24px] bg-ink p-7 text-linen md:p-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ochre">Calculadora</p>
      <label htmlFor={id} className="mt-3 block font-display text-[24px] leading-tight">
        Qual é a área do seu ambiente?
      </label>
      <div className="mt-5 flex items-center gap-3">
        <div className="relative w-36">
          <input
            id={id}
            type="number"
            inputMode="decimal"
            min={1}
            max={200}
            step={0.5}
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="h-14 w-full rounded-2xl border border-linen/25 bg-linen/10 pl-4 pr-12 font-display text-[26px] text-linen tabular outline-none transition-colors focus:border-ochre"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-mist">m²</span>
        </div>
        <span aria-hidden className="text-mist">×</span>
        <span className="text-[15px] text-mist tabular">{brl(perM2)}/m²</span>
      </div>

      <p className="mt-6 border-t border-linen/15 pt-5" aria-live="polite">
        <span className="block text-[14px] text-mist">Valor de referência</span>
        <span className="font-display text-[44px] leading-none tracking-[-0.02em] tabular">{brl(total)}</span>
        {hitMinimum && (
          <span className="mt-2 block text-[14px] text-mist">Aplicado o valor mínimo de {brl(minimum)}.</span>
        )}
      </p>

      <a
        href={waLink(
          `Olá, Beatriz! Vim pela página do projeto por ambiente. Meu ambiente tem ${m2 || '?'} m² (referência ${brl(total)}). O ambiente é: `,
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-light mt-7 w-full"
        data-placement="calculadora"
      >
        Confirmar o valor pelo WhatsApp
      </a>
      <p className="mt-3 text-[13px] leading-snug text-mist">
        Referência. O valor final depende da complexidade e do escopo.
      </p>
    </div>
  )
}
