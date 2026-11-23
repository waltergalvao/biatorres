// Content for the service pages (/servicos/[slug]). Each page doubles as a Google Ads landing
// page, so every field here is written for one service and one intent.
// Prices come from the owner's strategy document. Keep them in sync with src/lib/site.ts.

import { consultoriaPrices, projetoPrices, type RoomPrice } from '@/lib/site'
import type { DeliverableId } from '@/components/sections/Deliverables'

export type ServiceSlug = 'consultoria' | 'projeto-por-ambiente' | 'apartamento-completo'

export type Step = { title: string; text: string }
export type Faq = { q: string; a: string }
export type IncludeItem = { title: string; text?: string; delivers?: string }
export type IncludeGroup = { title?: string; items: IncludeItem[] }

export type Pricing =
  | {
      kind: 'rooms'
      title: string
      intro: string
      /** One honest line that puts the price in perspective. */
      framing: string
      rows: RoomPrice[]
      /** How a table row reads in its WhatsApp message: "quero {rowItem} quarto". */
      rowItem: string
      showArea: boolean
      foot: string
      calculator?: { perM2: number; minimum: number }
    }
  | {
      kind: 'package'
      title: string
      intro: string
      framing: string
      pre?: string
      price: string
      unit: string
      /** Small print under the price, e.g. the total of an installment price. */
      total?: string
      covers: string[]
      foot: string
    }

export type Service = {
  slug: ServiceSlug
  name: string
  /** Completes "Vim pela página ..." in prefilled WhatsApp messages. */
  source: string
  /** One line used on cards (home, cross-sell). */
  summary: string
  /** Three short highlights for cards. */
  highlights: string[]
  seo: { title: string; description: string }
  hero: {
    eyebrow: string
    title: string
    accent: string
    titleAfter?: string
    lede: string
    image: string
    imageAlt: string
  }
  /** Second hero button (an anchor on the page). */
  heroSecondary: { href: string; label: string }
  /** Which sample deliverables this service includes (all when omitted). */
  deliverables?: DeliverableId[]
  /** Price anchor shown in the hero and the mobile sticky bar. */
  /** `total` is the small print under an installment price (home card). */
  price: { pre?: string; value: string; unit?: string; note: string; total?: string }
  trust: string[]
  cta: { label: string; message: string }
  fit: {
    yes: string[]
    no: { text: string; href: string; label: string }[]
  }
  includes: { title: string; intro: string; groups: IncludeGroup[] }
  pricing: Pricing
  notIncluded: string[]
  process: Step[]
  faq: Faq[]
  crossSell: ServiceSlug[]
  final: { title: string; text: string }
  /** Photo next to the price table (desktop only). */
  sideImage: { id: string; alt: string }
}

// TODO(owner): confirm the payment terms for consultoria and projeto por ambiente, and whether
// the 10x for the apartment is com ou sem juros (and by which method).
const paymentFaq: Faq = {
  q: 'Como é o pagamento?',
  a: 'Pagamento do apartamento completo: em até 10x de R$ 1.500. Para os outros serviços, eu envio as condições de pagamento por escrito na proposta, junto com o valor fechado, antes de qualquer trabalho começar.',
}

const onlineFaq: Faq = {
  q: 'Funciona mesmo online?',
  a: 'Sim. Você manda a planta, fotos e medidas, o briefing é por chamada de vídeo e as entregas chegam em PDF. A cidade onde você mora não faz diferença.',
}

export const services: Record<ServiceSlug, Service> = {
  consultoria: {
    slug: 'consultoria',
    name: 'Consultoria de interiores',
    source: 'da consultoria online',
    summary: 'Um ambiente resolvido online: layout, cores, materiais e a lista do que comprar.',
    highlights: ['Briefing por vídeo', 'Moodboard e planta dos móveis', 'Lista de compras com links'],
    seo: {
      title: 'Consultoria de interiores online a partir de R$ 450 | Beatriz Torres Arquitetura',
      description:
        'Consultoria de interiores 100% online, por ambiente: briefing por vídeo, layout, moodboard e lista de móveis com links de compra. Quarto R$ 450, sala R$ 500, cozinha R$ 600.',
    },
    hero: {
      eyebrow: 'Consultoria de interiores · online',
      title: 'Saiba o que comprar e onde colocar, com uma consultoria',
      accent: 'online',
      lede: 'Você manda planta, fotos e medidas. Numa reunião por vídeo eu entendo como você vive e você recebe um PDF com a posição de cada móvel, cores, materiais e os móveis com links de compra.',
      image: '1615874959474-d609969a20ed',
      imageAlt: 'Quarto com cama de linho, almofadas laranja, quadros e plantas junto à janela',
    },
    heroSecondary: { href: '#valores', label: 'Ver os valores por ambiente' },
    deliverables: ['moodboard', 'layout'],
    price: {
      pre: 'a partir de',
      value: 'R$ 450',
      unit: 'por ambiente',
      note: 'Quarto R$ 450 · Sala + cozinha R$ 750',
    },
    trust: ['100% online, de qualquer cidade', 'Valor fechado antes de começar', 'Aproveita os móveis que você já tem'],
    cta: {
      label: 'Quero minha consultoria',
      message: 'Olá, Beatriz! Vim pela página da consultoria online e quero resolver um ambiente. O ambiente é: ',
    },
    fit: {
      yes: [
        'Quer melhorar um ambiente sem reforma grande',
        'Não sabe onde colocar os móveis nem o que comprar',
        'Quer decidir cores, tecidos e acabamentos antes de gastar',
        'Quer aproveitar parte do que já tem em casa',
      ],
      no: [
        {
          text: 'Vai fazer marcenaria, bancadas ou mexer na elétrica e precisa de detalhamento para a obra.',
          label: 'Veja o projeto por ambiente',
          href: '/servicos/projeto-por-ambiente',
        },
        {
          text: 'Quer projetar o apartamento inteiro de uma vez.',
          label: 'Veja o apartamento completo',
          href: '/servicos/apartamento-completo',
        },
      ],
    },
    includes: {
      title: 'Seis etapas, um ambiente resolvido',
      intro: 'Cada etapa termina com uma entrega. Tudo fica reunido no PDF final.',
      groups: [
        {
          items: [
            {
              title: 'Reunião de briefing online',
              text: 'Necessidades, estilo, rotina, orçamento e o que você quer manter, tirar ou comprar.',
              delivers: 'Direcionamento da consultoria',
            },
            {
              title: 'Análise do ambiente',
              text: 'Pela planta (quando houver), fotos e medidas: proporções, portas e janelas, circulação, móveis existentes e luz natural.',
              delivers: 'Diagnóstico do ambiente',
            },
            {
              title: 'Orientação de layout',
              text: 'Onde ficam sofá, mesa, cama e poltronas, como reaproveitar o que você tem e como circular melhor.',
              delivers: 'Planta com a posição de cada móvel, quando aplicável',
            },
            {
              title: 'Conceito, cores e materiais',
              text: 'Paleta de cores, revestimentos, tecidos e a combinação de madeira, pedra e metal.',
              delivers: 'Moodboard com referências',
            },
            {
              title: 'Móveis e decoração',
              text: 'Sofás, cadeiras, mesas, tapetes, cortinas, luminárias, quadros e objetos dentro do seu orçamento.',
              delivers: 'Produtos com lojas e links de compra',
            },
            {
              title: 'Apresentação final',
              text: 'Tudo organizado para consultar na hora de comprar e montar.',
              delivers: 'PDF final',
            },
          ],
        },
      ],
    },
    pricing: {
      kind: 'rooms',
      title: 'Valor fechado por ambiente',
      intro: 'O preço cobre as seis etapas e o PDF final. Sem custo extra depois.',
      framing:
        'Um sofá que não passa na porta ou um tapete do tamanho errado custam mais que a consultoria. Aqui você decide no papel, antes de gastar.',
      rows: consultoriaPrices,
      rowItem: 'a consultoria de',
      showArea: false,
      foot: 'Mais de um ambiente? Os valores se somam. Mande a planta e eu confirmo o total.',
    },
    notIncluded: [
      'Imagens 3D e detalhamento técnico para obra (estão no projeto por ambiente)',
      'Compras, montagem e visitas presenciais',
      'Projetos de marcenaria, elétrica ou hidráulica',
    ],
    process: [
      { title: 'Mande uma mensagem', text: 'Diga qual ambiente quer resolver e a sua cidade. Eu respondo com o valor e as datas.' },
      { title: 'Envie planta, fotos e medidas', text: 'Foto de celular e medidas com trena bastam. Eu explico o que medir.' },
      { title: 'Briefing por vídeo', text: 'Uma conversa sobre sua rotina, seu estilo, seu orçamento e o que fica ou sai.' },
      { title: 'Receba o PDF', text: 'Layout, moodboard e lista de compras com links, prontos para usar.' },
    ],
    faq: [
      onlineFaq,
      {
        q: 'Não tenho a planta. Dá para fazer?',
        a: 'Dá. Medidas feitas com trena e fotos do celular são suficientes. Antes do briefing você recebe um guia do que medir e fotografar.',
      },
      {
        q: 'Posso usar os móveis que já tenho?',
        a: 'Pode. A análise começa pelo que você já tem: o que fica, o que muda de lugar e o que vale substituir.',
      },
      {
        q: 'Os produtos indicados cabem no meu orçamento?',
        a: 'A seleção parte do orçamento que você informa no briefing. Os links seguem a disponibilidade das lojas no momento da entrega.',
      },
      {
        q: 'Depois posso contratar um projeto completo?',
        a: 'Pode. Muita gente começa pela consultoria de um ambiente e depois segue para o projeto por ambiente ou do apartamento inteiro.',
      },
      paymentFaq,
    ],
    crossSell: ['projeto-por-ambiente', 'apartamento-completo'],
    final: {
      title: 'Conte qual ambiente quer resolver',
      text: 'Mande o cômodo e a cidade pelo WhatsApp. Eu respondo com o valor fechado e os próximos passos.',
    },
    sideImage: { id: '1616627561839-074385245ff6', alt: 'Quarto com roupa de cama terracota, cabeceira de madeira e mesa de cabeceira' },
  },

  'projeto-por-ambiente': {
    slug: 'projeto-por-ambiente',
    name: 'Projeto por ambiente',
    source: 'do projeto por ambiente',
    summary: 'Um cômodo projetado com imagens 3D e caderno técnico para marceneiro e obra.',
    highlights: ['Imagens 3D realistas', 'Marcenaria e bancadas detalhadas', 'Caderno técnico para a obra'],
    seo: {
      title: 'Projeto de interiores por ambiente com 3D, R$ 250/m² | Beatriz Torres Arquitetura',
      description:
        'Projeto de cozinha, banheiro, quarto ou sala com imagens 3D, detalhamento de marcenaria e caderno técnico para a obra. R$ 250/m², banheiro até 6 m² por R$ 1.500.',
    },
    hero: {
      eyebrow: 'Projeto completo por ambiente',
      title: 'Projeto de interiores por ambiente, com',
      accent: 'imagens 3D',
      titleAfter: ' e tudo pronto para a obra',
      lede: 'Para reformar um cômodo sem improviso. Você aprova o ambiente em 3D e recebe o caderno técnico: o manual da obra, com os desenhos e as medidas que o marceneiro segue.',
      image: '1600585152220-90363fe7e115',
      imageAlt: 'Cozinha com marcenaria clara, bancada de pedra e luz natural',
    },
    heroSecondary: { href: '#valores', label: 'Calcule o valor do seu ambiente' },
    price: {
      value: 'R$ 250',
      unit: 'por m²',
      note: 'Banheiro até 6 m² R$ 1.500 · Cozinha até 12 m² R$ 3.000',
    },
    trust: ['Imagens 3D antes de gastar com obra', 'Caderno técnico para marceneiro e pedreiro', 'Uma rodada de ajustes por etapa'],
    cta: {
      label: 'Orçar meu ambiente',
      message: 'Olá, Beatriz! Vim pela página do projeto por ambiente. Vou reformar e quero o projeto com 3D. O cômodo e a metragem são: ',
    },
    fit: {
      yes: [
        'Vai reformar cozinha, banheiro, quarto ou sala',
        'Vai fazer marcenaria sob medida, bancadas ou nichos',
        'Quer ver o resultado em 3D antes de aprovar',
        'Quer que marceneiro e obra sigam um projeto, não uma conversa',
      ],
      no: [
        {
          text: 'Só quer reorganizar os móveis e escolher a decoração.',
          label: 'Veja a consultoria',
          href: '/servicos/consultoria',
        },
        {
          text: 'Vai projetar o apartamento inteiro, até 60 m².',
          label: 'Veja o apartamento completo',
          href: '/servicos/apartamento-completo',
        },
      ],
    },
    includes: {
      title: 'Do conceito ao caderno técnico',
      intro: 'Tudo o que o ambiente precisa para sair do papel, em quatro blocos.',
      groups: [
        {
          title: 'Conceito',
          items: [
            { title: 'Briefing e levantamento de necessidades' },
            { title: 'Moodboard e conceito do ambiente' },
            { title: 'Planta de layout e mobiliário' },
          ],
        },
        {
          title: 'Visualização',
          items: [
            { title: 'Imagens 3D realistas', text: 'Você vê o ambiente pronto antes de quebrar uma parede.' },
          ],
        },
        {
          title: 'Projeto técnico',
          items: [
            { title: 'Planta de iluminação' },
            { title: 'Planta de revestimentos, quando aplicável' },
            { title: 'Elevações das paredes relevantes' },
            { title: 'Detalhamento de marcenaria' },
            { title: 'Detalhamento de bancadas e nichos, quando aplicável' },
          ],
        },
        {
          title: 'Especificação',
          items: [
            { title: 'Especificação de materiais e acabamentos' },
            { title: 'Indicação de mobiliário, louças, metais e luminárias' },
            { title: 'Caderno técnico para execução' },
            { title: 'Uma rodada consolidada de alterações por etapa' },
          ],
        },
      ],
    },
    pricing: {
      kind: 'rooms',
      title: 'R$ 250 por m², com valor fechado',
      intro: 'Valores de referência para os tamanhos mais comuns. Para outra metragem, use a calculadora.',
      framing:
        'Marcenaria refeita é o erro mais caro de uma reforma. O projeto custa uma fração da obra e evita refazer.',
      rows: projetoPrices,
      rowItem: 'o projeto de',
      showArea: true,
      foot: 'Valor mínimo por contratação: R$ 1.500. O preço final depende da complexidade e do escopo, e eu passo o valor fechado antes de começar.',
      calculator: { perM2: 250, minimum: 1500 },
    },
    notIncluded: [
      'Gerenciamento e acompanhamento presencial da obra',
      'Compra de materiais e móveis',
      'Projetos complementares de engenharia',
    ],
    process: [
      { title: 'Mande ambiente e metragem', text: 'Pelo WhatsApp. Eu respondo com o valor fechado e o prazo.' },
      { title: 'Briefing e medidas', text: 'Reunião por vídeo, planta e fotos do ambiente como está hoje.' },
      { title: 'Conceito, layout e 3D', text: 'Você aprova o ambiente nas imagens ou junta os ajustes numa rodada.' },
      { title: 'Projeto técnico', text: 'Plantas, desenhos de cada parede com medidas, marcenaria e o caderno técnico para a obra, em PDF.' },
    ],
    faq: [
      {
        q: 'A loja de planejados faz o projeto de graça. Por que pagar?',
        a: 'O projeto da loja é feito para vender os móveis daquela loja, no catálogo e no preço dela. O meu é seu: você leva o mesmo desenho para três marceneiros ou lojas e compara preço com preço. E ele vai além dos armários: layout, iluminação, revestimentos e os móveis que você compra prontos.',
      },
      {
        q: 'Como o valor é calculado?',
        a: 'R$ 250 por metro quadrado do ambiente, com mínimo de R$ 1.500 por contratação. Ambientes mais complexos podem ter ajuste, e eu passo o valor fechado antes de começar.',
      },
      {
        q: 'Meu ambiente é maior que o da tabela. Quanto fica?',
        a: 'Multiplique a área por R$ 250 para ter a referência. Mande a planta pelo WhatsApp e eu confirmo o valor final.',
      },
      {
        q: 'Quantas alterações posso pedir?',
        a: 'Uma rodada consolidada por etapa. Você junta os comentários e eu ajusto tudo de uma vez, o que mantém o projeto no prazo.',
      },
      {
        q: 'Você acompanha a obra?',
        a: 'Não. O projeto não inclui gerenciamento nem visitas. O caderno técnico é feito para que marceneiro e empreiteiro executem sem depender de visita.',
      },
      onlineFaq,
      paymentFaq,
    ],
    crossSell: ['consultoria', 'apartamento-completo'],
    final: {
      title: 'Mande a planta e receba o valor do seu ambiente',
      text: 'Diga qual cômodo vai reformar e a metragem. Eu respondo com o valor fechado e o prazo.',
    },
    sideImage: { id: '1600585152220-90363fe7e115', alt: 'Cozinha com marcenaria clara, bancada de pedra e luz natural' },
  },

  'apartamento-completo': {
    slug: 'apartamento-completo',
    name: 'Apartamento completo',
    source: 'do apartamento completo',
    summary: 'O apartamento inteiro com um conceito só, 3D de todos os ambientes e projeto técnico.',
    highlights: ['Até 60 m², todos os ambientes', 'Até 10 imagens 3D', 'Memorial e caderno técnico'],
    seo: {
      title: 'Projeto de interiores de apartamento até 60 m² em 10x de R$ 1.500 | Beatriz Torres',
      description:
        'Projeto completo de apartamento até 60 m²: sala, cozinha, lavanderia, 2 quartos e 2 banheiros, com até 10 imagens 3D, projeto técnico, memorial descritivo e caderno para a obra.',
    },
    hero: {
      eyebrow: 'Projeto completo de apartamento',
      title: 'O apartamento inteiro projetado de uma vez,',
      accent: 'até 60 m²',
      lede: 'Sala, cozinha, lavanderia, dois quartos e dois banheiros com um conceito só. Você vê tudo em 3D e recebe o caderno técnico: o manual que a obra segue.',
      image: '1522708323590-d24dbb6b0267',
      imageAlt: 'Sala e jantar integrados em apartamento compacto com piso de madeira e poltrona vermelha',
    },
    heroSecondary: { href: '#valores', label: 'Ver o que o pacote cobre' },
    price: {
      pre: '10x de',
      value: 'R$ 1.500',
      unit: 'até 60 m²',
      note: 'Total de R$ 15.000, com todos os ambientes inclusos',
      total: 'Total de R$ 15.000',
    },
    trust: ['Até 10 imagens 3D', 'Plantas técnicas e memorial descritivo', 'Pensado para compactos e primeiro apê'],
    cta: {
      label: 'Orçar meu apartamento',
      message: 'Olá, Beatriz! Vim pela página do apartamento completo e quero o projeto. Posso mandar a planta por aqui?',
    },
    fit: {
      yes: [
        'Comprou na planta ou acabou de pegar as chaves',
        'Vai reformar o apartamento todo antes de mudar ou alugar',
        'Quer um visual coerente em todos os ambientes',
        'Quer saber quanto custa o projeto antes de começar a obra',
      ],
      no: [
        {
          text: 'Quer mudar só um ou dois ambientes, sem reforma.',
          label: 'Veja a consultoria',
          href: '/servicos/consultoria',
        },
        {
          text: 'Vai reformar um cômodo e precisa de 3D e detalhamento.',
          label: 'Veja o projeto por ambiente',
          href: '/servicos/projeto-por-ambiente',
        },
      ],
    },
    includes: {
      title: 'Tudo o que o apartamento precisa, num projeto só',
      intro: 'Três blocos de entrega, do primeiro estudo de layout ao caderno para a obra.',
      groups: [
        {
          title: 'Planejamento e conceito',
          items: [
            { title: 'Briefing geral e por ambiente' },
            { title: 'Estudo de layout do apartamento inteiro' },
            { title: 'Conceito e identidade visual integrados' },
            { title: 'Moodboard e paleta de materiais' },
          ],
        },
        {
          title: 'Projeto técnico',
          items: [
            { title: 'Planta de layout e mobiliário' },
            { title: 'Planta de iluminação' },
            { title: 'Planta de revestimentos' },
            { title: 'Planta de forro, quando aplicável' },
            { title: 'Pontos elétricos e hidráulicos das intervenções previstas' },
            { title: 'Elevações necessárias' },
            { title: 'Detalhamento de marcenaria' },
            { title: 'Detalhamento de bancadas e nichos' },
          ],
        },
        {
          title: 'Apresentação e especificações',
          items: [
            { title: 'Imagens 3D de todos os ambientes, até 10 vistas' },
            { title: 'Especificação de revestimentos e acabamentos' },
            { title: 'Especificação de louças e metais' },
            { title: 'Especificação de iluminação' },
            { title: 'Referências de mobiliário e decoração' },
            { title: 'Memorial descritivo' },
            { title: 'Caderno técnico organizado para execução' },
          ],
        },
      ],
    },
    pricing: {
      kind: 'package',
      title: 'Um valor para o apartamento inteiro',
      intro: 'O pacote cobre a configuração mais comum de apartamentos até 60 m².',
      framing:
        'Pelo mesmo R$ 250/m², o preço fica fechado para o apartamento todo, com lavanderia e circulação incluídas, e um conceito só do começo ao fim.',
      pre: '10x de',
      price: 'R$ 1.500',
      unit: 'até 60 m²',
      total: 'Total de R$ 15.000',
      covers: [
        'Sala de estar e jantar integradas',
        'Cozinha',
        'Lavanderia',
        'Suíte de casal',
        'Banheiro da suíte',
        'Quarto secundário',
        'Banheiro social',
        'Circulação',
      ],
      foot: 'Configurações diferentes, ambientes extras e intervenções mais complexas são orçados à parte.',
    },
    notIncluded: [
      'Execução, gerenciamento e acompanhamento de obra',
      'Compras e visitas técnicas',
      'Projetos estruturais e complementares especializados',
    ],
    process: [
      { title: 'Conversa e planta', text: 'Mande a planta da construtora ou as medidas. Eu confirmo o valor e o prazo.' },
      { title: 'Briefing', text: 'Uma conversa geral e outra por ambiente, sobre rotina, estilo e orçamento.' },
      { title: 'Layout e conceito', text: 'O estudo do apartamento inteiro e a paleta de materiais para aprovar.' },
      { title: '3D de todos os ambientes', text: 'Até 10 vistas realistas. Você junta os ajustes numa rodada.' },
      { title: 'Projeto técnico', text: 'Plantas, detalhamentos, memorial e o caderno técnico para a obra.' },
    ],
    faq: [
      {
        q: 'A loja de planejados faz o projeto de graça. Por que pagar?',
        a: 'O projeto da loja é feito para vender os móveis daquela loja, no catálogo e no preço dela. O meu é seu: você leva o mesmo desenho para três marceneiros ou lojas e compara preço com preço. E ele vai além dos armários: layout, iluminação, revestimentos e os móveis que você compra prontos.',
      },
      {
        q: 'Meu apartamento tem mais de 60 m². Dá para fazer?',
        a: 'Dá. A referência é R$ 250/m², e apartamentos maiores ou com ambientes extras são orçados à parte. Mande a planta e eu respondo com o valor fechado.',
      },
      {
        q: 'Meu apartamento é um studio ou tem só um quarto.',
        a: 'Para um studio, o projeto por ambiente costuma sair mais em conta: são R$ 250/m², então um studio de 30 m² fica em R$ 7.500. Os detalhes estão na página do projeto por ambiente, em Outros serviços, logo acima. Com um quarto só, mande a planta e eu digo qual dos dois compensa mais.',
      },
      {
        q: 'Comprei na planta. Já posso começar?',
        a: 'Pode, e é o melhor momento: com a planta da construtora dá para decidir layout, pontos elétricos e marcenaria antes da entrega das chaves.',
      },
      {
        q: 'Posso fazer por etapas?',
        a: 'Pode começar por um ambiente com o projeto por ambiente. Por m² o valor é o mesmo. A diferença é que o preço fica fechado para o apartamento todo, com lavanderia e circulação incluídas, e todos os ambientes seguem um conceito só.',
      },
      onlineFaq,
      paymentFaq,
    ],
    crossSell: ['projeto-por-ambiente', 'consultoria'],
    final: {
      title: 'Mande a planta do seu apartamento',
      text: 'Diga a metragem e a cidade. Eu respondo com o valor fechado, o prazo e o que está incluso.',
    },
    sideImage: { id: '1600210492486-724fe5c67fb0', alt: 'Sala de estar clara com sofá de couro, mesa de centro de madeira e quadros na parede' },
  },

}

export const serviceOrder: ServiceSlug[] = ['consultoria', 'projeto-por-ambiente', 'apartamento-completo']

export const serviceHref = (slug: ServiceSlug) => `/servicos/${slug}`
