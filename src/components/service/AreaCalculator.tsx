'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { waLink } from '@/lib/site'

const brl = (n: number) => `R$ ${n.toLocaleString('pt-BR')}`
const area = (n: number) => `${n.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} m²`

const rooms = ['Quarto', 'Sala', 'Cozinha', 'Banheiro', 'Outro'] as const
type Room = (typeof rooms)[number]

/** Above this size the visitor is probably projecting more than one room. */
const MULTI_ROOM_M2 = 35

/** m² → reference price, with the per-contract minimum applied. */
export function AreaCalculator({ perM2, minimum }: { perM2: number; minimum: number }) {
  const id = useId()
  const [value, setValue] = useState('10')
  const [room, setRoom] = useState<Room | null>(null)

  const m2 = Math.max(0, Number(value.replace(',', '.')) || 0)
  const valid = m2 > 0
  const raw = Math.round(m2 * perM2)
  const total = Math.max(raw, minimum)
  const hitMinimum = raw < minimum

  const what = room && room !== 'Outro' ? room.toLowerCase() : 'um ambiente'
  const message = `Olá, Beatriz! Vim pela página do projeto por ambiente e fiz a conta no site: ${what} de ${area(m2)}, referência ${brl(total)}${hitMinimum ? ' (valor mínimo)' : ''}. Pode me confirmar o valor?`

  return (
    <div className="rounded-[24px] bg-ink p-7 text-linen md:p-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ochre">Calculadora</p>

      <p id={`${id}-room`} className="mt-3 font-display text-[24px] leading-tight">
        Qual ambiente?
      </p>
      <div role="group" aria-labelledby={`${id}-room`} className="mt-4 flex flex-wrap gap-2">
        {rooms.map((r) => {
          const on = room === r
          return (
            <button
              key={r}
              type="button"
              aria-pressed={on}
              onClick={() => setRoom(on ? null : r)}
              className={`min-h-[44px] rounded-full border px-4 text-[15px] font-semibold transition-colors duration-200 ${
                on ? 'border-ochre bg-ochre text-ink' : 'border-linen/25 text-linen hover:border-linen/60'
              }`}
            >
              {r}
            </button>
          )
        })}
      </div>

      <label htmlFor={id} className="mt-6 block font-display text-[24px] leading-tight">
        Qual é a área?
      </label>
      <div className="mt-4 flex items-center gap-3">
        <div className="relative w-36">
          <input
            id={id}
            type="number"
            inputMode="decimal"
            min={1}
            max={200}
            step={0.5}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-14 w-full rounded-2xl border border-linen/25 bg-linen/10 pl-4 pr-12 font-display text-[26px] text-linen tabular outline-none transition-colors focus:border-ochre"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-mist">m²</span>
        </div>
        <span aria-hidden className="text-mist">×</span>
        <span className="text-[15px] text-mist tabular">{brl(perM2)}/m²</span>
      </div>

      <div className="mt-6 border-t border-linen/15 pt-5" aria-live="polite">
        {valid ? (
          <p>
            <span className="block text-[14px] text-mist">Valor de referência para {area(m2)}</span>
            <span className="font-display text-[44px] leading-none tracking-[-0.02em] tabular">{brl(total)}</span>
            {hitMinimum && (
              <span className="mt-2 block text-[14px] text-mist">Aplicado o valor mínimo de {brl(minimum)}.</span>
            )}
          </p>
        ) : (
          <p className="text-[15px] text-mist">Digite a área em m² para ver o valor.</p>
        )}
      </div>

      {valid && m2 >= MULTI_ROOM_M2 && (
        <div className="mt-5 rounded-2xl bg-linen/10 p-4 text-[14px] leading-snug text-mist">
          <p>Vai projetar mais de um cômodo? O apartamento completo cobre até 60 m² em 10x de R$ 1.500.</p>
          <Link
            href="/servicos/apartamento-completo"
            className="link-draw -mb-2.5 mt-0.5 bg-origin-content py-2.5 text-[14px] text-linen"
            data-placement="calculadora-apartamento"
          >
            Ver o apartamento completo <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      )}

      {valid && (
        <>
          <a
            href={waLink(message)}
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
        </>
      )}
    </div>
  )
}
