import Image from 'next/image'
import { unsplash, waLink } from '@/lib/site'
import { WhatsAppIcon } from '../WhatsAppIcon'

// Why a project made for small spaces: what she does that a generalist or a furniture store doesn't.
// Concrete and checkable on purpose; no comparison that puts other professionals down.
// TODO(owner): confirm the examples are the ones you use (the 2,20 m sofa as the common standard)
// and that the last point (knowing the plantas de lançamento) is true for your practice.
const points = [
  {
    title: 'Móvel escolhido pela medida, não pelo catálogo',
    text: 'O sofá padrão tem 2,20 m e foi feito para sala grande. Eu escolho o que deixa a passagem livre e a mesa que só abre quando chega visita.',
  },
  {
    title: 'Um ambiente, várias funções',
    text: 'Dormir, trabalhar e receber no mesmo espaço pede marcenaria que guarda, esconde e se transforma.',
  },
  {
    title: 'Luz que divide sem parede',
    text: 'Em vez de levantar divisória, a iluminação separa a sala do quarto e muda o clima à noite.',
  },
  {
    title: 'Eu conheço as plantas de lançamento',
    text: 'Os problemas se repetem: parede curta para o sofá, tomada no lugar errado, cozinha sem bancada. Eu já chego sabendo onde olhar.',
  },
]

/**
 * Full-bleed editorial image before the deliverables: the reason to plan a small home, then what
 * a project made for small spaces does differently, with one quiet action.
 */
export function Interlude() {
  return (
    <section aria-labelledby="interlude-title" className="relative isolate overflow-hidden bg-ink">
      <Image
        src={unsplash('1615874959474-d609969a20ed')}
        alt="Quarto com cama de linho, almofadas laranja, quadros e plantas junto à janela"
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-80"
      />
      <div className="absolute inset-0 -z-10 bg-ink/65 lg:bg-transparent lg:bg-gradient-to-r lg:from-ink/80 lg:via-ink/35 lg:to-transparent" />
      <div className="container-site grid gap-10 py-16 md:py-24 lg:min-h-[680px] lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="text-linen lg:col-span-5">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ochre">Por que projetar</p>
          <h2 id="interlude-title" className="mt-4 font-display text-display">
            Casa pequena não perdoa <em className="italic text-clay-soft">improviso</em>
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-linen/90">
            O móvel que não passa na porta, a tomada atrás do armário, o tapete que some na sala. Um
            projeto decide isso no papel, antes de você gastar.
          </p>
          <a
            href={waLink('Olá, Beatriz! Vim pelo site e quero decidir meu apartamento no papel antes de gastar. O que eu quero resolver é:')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-light mt-8 hidden lg:inline-flex"
            data-placement="interlude"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Quero decidir antes de gastar
          </a>
        </div>

        <div className="rounded-[28px] border border-linen/15 bg-ink/55 p-6 text-linen backdrop-blur-md md:p-9 lg:col-span-7">
          <p className="font-display text-[24px] leading-tight md:text-[28px]">Por que um projeto pensado para espaço pequeno</p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7">
            {points.map((p) => (
              <li key={p.title} className="border-t border-linen/20 pt-4">
                <p className="text-[16px] font-semibold leading-snug">{p.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-mist">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Phones: the action comes after the points, so it closes the argument. */}
        <a
          href={waLink('Olá, Beatriz! Vim pelo site e quero decidir meu apartamento no papel antes de gastar. O que eu quero resolver é:')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-light w-full sm:w-auto sm:justify-self-start lg:hidden"
          data-placement="interlude"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Quero decidir antes de gastar
        </a>
      </div>
    </section>
  )
}
