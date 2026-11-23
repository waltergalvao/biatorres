import type { AudienceSlug } from './audiences'
import type { ServiceSlug } from './services'

export type Testimonial = {
  quote: string
  name: string
  detail: string
  service: ServiceSlug
  /** Audience landing pages (/para/*) where this quote is shown. */
  audiences?: AudienceSlug[]
}

// TODO(owner): PLACEHOLDER testimonials. Replace with real client quotes (and permission to
// publish name + neighbourhood) before going live, and before running ads to these pages.
// The section stays hidden while these are placeholders: invented quotes on ad landing pages
// are misleading advertising (CDC art. 37, Google Ads policy) and break the CAU code of ethics.
// Set this to true once the quotes below are real.
export const SHOW_TESTIMONIALS = false

export const testimonials: Testimonial[] = [
  {
    quote:
      'Comprei o studio na planta e não sabia por onde começar. A consultoria resolveu o layout e a lista de compras sem eu sair de casa.',
    name: 'Cliente de consultoria',
    detail: 'Studio de 32 m²',
    service: 'consultoria',
    audiences: ['primeiro-apartamento', 'studios'],
  },
  {
    quote: 'A lista de compras com os links me poupou semanas de pesquisa. Comprei quase tudo numa tarde.',
    name: 'Cliente de consultoria',
    detail: 'Sala de estar',
    service: 'consultoria',
    audiences: ['primeiro-apartamento'],
  },
  {
    quote:
      'As imagens 3D tiraram minha insegurança. O marceneiro trabalhou direto pelo caderno técnico, sem ligar para tirar dúvida.',
    name: 'Cliente de projeto por ambiente',
    detail: 'Cozinha de 10 m²',
    service: 'projeto-por-ambiente',
  },
  {
    quote: 'Vi o banheiro pronto antes de quebrar o piso. A obra seguiu o projeto e não teve improviso.',
    name: 'Cliente de projeto por ambiente',
    detail: 'Banheiro de 5 m²',
    service: 'projeto-por-ambiente',
  },
  {
    quote:
      'Fiz a consultoria do quarto primeiro. Gostei tanto que contratei o projeto do apartamento inteiro.',
    name: 'Cliente de apartamento completo',
    detail: 'Apartamento de 54 m²',
    service: 'apartamento-completo',
  },
  {
    quote: 'Recebi as chaves já com o projeto pronto. A obra começou na semana seguinte.',
    name: 'Cliente de apartamento completo',
    detail: 'Apartamento de 48 m², comprado na planta',
    service: 'apartamento-completo',
    audiences: ['primeiro-apartamento', 'investidores'],
  },
  {
    quote:
      'Comprei dois studios para alugar por temporada. O projeto deixou os dois com a mesma identidade, e o empreiteiro seguiu o caderno técnico sem eu precisar viajar.',
    name: 'Cliente investidor',
    detail: 'Dois studios de 28 m²',
    service: 'apartamento-completo',
    audiences: ['investidores', 'studios'],
  },
  {
    quote: 'A marcenaria resolveu o que eu achava impossível: cama, home office e armário no mesmo studio, sem parecer apertado.',
    name: 'Cliente de projeto',
    detail: 'Studio de 24 m²',
    service: 'projeto-por-ambiente',
    audiences: ['studios'],
  },
  {
    quote: 'Escolhi acabamentos pensando na manutenção, não só na foto. Um ano depois, o apartamento continua como novo.',
    name: 'Cliente investidor',
    detail: 'Apartamento de 42 m² para aluguel',
    service: 'apartamento-completo',
    audiences: ['investidores'],
  },
]
