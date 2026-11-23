// Content for the service pages (/servicos/[slug]). Each page doubles as a Google Ads landing
// page, so every field here is written for one service and one intent.
// Prices come from the owner's strategy document. Keep them in sync with src/lib/site.ts.

import { consultoriaPrices, projetoPrices, type RoomPrice } from '@/lib/site'

export type ServiceSlug = 'consultoria' | 'projeto-por-ambiente' | 'apartamento-completo' | 'vistoria'

export type Step = { title: string; text: string }
export type Faq = { q: string; a: string }
export type IncludeItem = { title: string; text?: string; delivers?: string }
export type IncludeGroup = { title?: string; items: IncludeItem[] }

export type Pricing =
  | {
      kind: 'rooms'
      title: string
      intro: string
      rows: RoomPrice[]
      showArea: boolean
      foot: string
      calculator?: { perM2: number; minimum: number }
    }
  | {
      kind: 'package'
      title: string
      intro: string
      price: string
      unit: string
      covers: string[]
      foot: string
    }
  | {
      kind: 'quote'
      title: string
      intro: string
      factors: string[]
      foot: string
    }

export type Service = {
  slug: ServiceSlug
  name: string
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
  /** Price anchor shown in the hero and the mobile sticky bar. */
  price: { pre?: string; value: string; unit?: string; note: string }
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

// TODO(owner): confirm the payment terms (entrada + parcelas? Pix? cartão?) and state them here.
const paymentFaq: Faq = {
  q: 'Como é o pagamento?',
  a: 'As condições de pagamento vêm por escrito na proposta, junto com o valor fechado, antes de qualquer trabalho começar.',
}

const onlineFaq: Faq = {
  q: 'Funciona mesmo online?',
  a: 'Sim. Você manda a planta, fotos e medidas, o briefing é por chamada de vídeo e as entregas chegam em PDF. A cidade onde você mora não faz diferença.',
}

export const services: Record<ServiceSlug, Service> = {
  consultoria: {
    slug: 'consultoria',
    name: 'Consultoria de interiores',
    summary: 'Um ambiente resolvido online: layout, cores, materiais e a lista do que comprar.',
    highlights: ['Briefing por vídeo', 'Moodboard e layout orientativo', 'Lista de compras com links'],
    seo: {
      title: 'Consultoria de interiores online a partir de R$ 450 | Beatriz Torres Arquitetura',
      description:
        'Consultoria de interiores 100% online, por ambiente: briefing por vídeo, layout, moodboard e lista de móveis com links de compra. Quarto R$ 450, sala R$ 500, cozinha R$ 600.',
    },
    hero: {
      eyebrow: 'Consultoria de interiores · online',
      title: 'Saiba o que comprar e onde colocar, com uma consultoria',
      accent: 'online',
      lede: 'Você manda planta, fotos e medidas. Numa reunião por vídeo eu entendo como você vive e você recebe um PDF com layout, cores, materiais e os móveis com links de compra.',
      image: '1615874959474-d609969a20ed',
      imageAlt: 'Quarto com cama de linho, almofadas laranja, quadros e plantas junto à janela',
    },
    price: {
      pre: 'a partir de',
      value: 'R$ 450',
      unit: 'por ambiente',
      note: 'Quarto R$ 450 · Sala + cozinha R$ 750',
    },
    trust: ['100% online, de qualquer cidade', 'Valor fechado antes de começar', 'Aproveita os móveis que você já tem'],
    cta: {
      label: 'Quero minha consultoria',
      message: 'Olá, Beatriz! Vim pela página da consultoria de interiores. O ambiente é: ',
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
              delivers: 'Layout orientativo, quando aplicável',
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
      intro: 'O preço cobre as seis etapas e o PDF final. Sem taxa de visita, sem surpresa.',
      rows: consultoriaPrices,
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
      text: 'Mande o cômodo e a cidade pelo WhatsApp. A resposta vem com o valor fechado e os próximos passos.',
    },
    sideImage: { id: '1616627561839-074385245ff6', alt: 'Quarto com roupa de cama terracota, cabeceira de madeira e mesa de cabeceira' },
  },

  'projeto-por-ambiente': {
    slug: 'projeto-por-ambiente',
    name: 'Projeto por ambiente',
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
      lede: 'Para reformar um cômodo sem improviso: você aprova o ambiente em imagens realistas, e o marceneiro e a obra recebem plantas, elevações e especificações.',
      image: '1600585152220-90363fe7e115',
      imageAlt: 'Cozinha com marcenaria clara, bancada de pedra e luz natural',
    },
    price: {
      value: 'R$ 250',
      unit: 'por m²',
      note: 'Banheiro até 6 m² R$ 1.500 · Cozinha até 12 m² R$ 3.000',
    },
    trust: ['Imagens 3D antes de gastar com obra', 'Caderno técnico para marceneiro e pedreiro', 'Uma rodada de ajustes por etapa'],
    cta: {
      label: 'Orçar meu ambiente',
      message: 'Olá, Beatriz! Vim pela página do projeto por ambiente. O ambiente e a metragem são: ',
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
      rows: projetoPrices,
      showArea: true,
      foot: 'Valor mínimo por contratação: R$ 1.500. O preço final depende da complexidade e do escopo, e você recebe o valor fechado antes de começar.',
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
      { title: 'Projeto técnico', text: 'Plantas, elevações, marcenaria e o caderno técnico para a obra, em PDF.' },
    ],
    faq: [
      {
        q: 'Como o valor é calculado?',
        a: 'R$ 250 por metro quadrado do ambiente, com mínimo de R$ 1.500 por contratação. Ambientes mais complexos podem ter ajuste, e você recebe o valor fechado antes de começar.',
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
      text: 'Diga qual cômodo vai reformar e a metragem. A resposta vem com o valor fechado e o prazo.',
    },
    sideImage: { id: '1600585152220-90363fe7e115', alt: 'Cozinha com marcenaria clara, bancada de pedra e luz natural' },
  },

  'apartamento-completo': {
    slug: 'apartamento-completo',
    name: 'Apartamento completo',
    summary: 'O apartamento inteiro com um conceito só, 3D de todos os ambientes e projeto técnico.',
    highlights: ['Até 60 m², todos os ambientes', 'Até 10 imagens 3D', 'Memorial e caderno técnico'],
    seo: {
      title: 'Projeto de interiores de apartamento até 60 m² por R$ 15.000 | Beatriz Torres',
      description:
        'Projeto completo de apartamento até 60 m²: sala, cozinha, lavanderia, 2 quartos e 2 banheiros, com até 10 imagens 3D, projeto técnico, memorial descritivo e caderno para a obra.',
    },
    hero: {
      eyebrow: 'Projeto completo de apartamento',
      title: 'O apartamento inteiro projetado de uma vez,',
      accent: 'até 60 m²',
      lede: 'Sala, cozinha, lavanderia, dois quartos e dois banheiros com um conceito só. Você recebe 3D de todos os ambientes e o caderno técnico para executar a obra do começo ao fim.',
      image: '1522708323590-d24dbb6b0267',
      imageAlt: 'Sala e jantar integrados em apartamento compacto com piso de madeira e poltrona vermelha',
    },
    price: {
      value: 'R$ 15.000',
      unit: 'até 60 m²',
      note: 'Referência de R$ 250/m², todos os ambientes inclusos',
    },
    trust: ['Até 10 imagens 3D', 'Plantas técnicas e memorial descritivo', 'Pensado para compactos e primeiro apê'],
    cta: {
      label: 'Orçar meu apartamento',
      message: 'Olá, Beatriz! Vim pela página do apartamento completo. A metragem e a cidade são: ',
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
      price: 'R$ 15.000',
      unit: 'até 60 m²',
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
        q: 'Meu apartamento tem mais de 60 m². Dá para fazer?',
        a: 'Dá. A referência é R$ 250/m², e apartamentos maiores ou com ambientes extras são orçados à parte. Mande a planta e você recebe o valor fechado.',
      },
      {
        q: 'Meu apartamento é um studio ou tem só um quarto.',
        a: 'O pacote foi desenhado para a configuração da lista, mas studios e plantas com menos ambientes também são atendidos. Mande a planta e eu respondo com o valor.',
      },
      {
        q: 'Comprei na planta. Já posso começar?',
        a: 'Pode, e é o melhor momento: com a planta da construtora dá para decidir layout, pontos elétricos e marcenaria antes da entrega das chaves.',
      },
      {
        q: 'Posso fazer por etapas?',
        a: 'Pode começar por um ambiente com o projeto por ambiente. O pacote do apartamento sai mais em conta por m² e garante um conceito só para tudo.',
      },
      onlineFaq,
      paymentFaq,
    ],
    crossSell: ['projeto-por-ambiente', 'consultoria'],
    final: {
      title: 'Mande a planta do seu apartamento',
      text: 'Diga a metragem e a cidade. A resposta vem com o valor fechado, o prazo e o que está incluso.',
    },
    sideImage: { id: '1600210492486-724fe5c67fb0', alt: 'Sala de estar clara com sofá de couro, mesa de centro de madeira e quadros na parede' },
  },

  vistoria: {
    slug: 'vistoria',
    name: 'Vistoria de imóvel',
    summary: 'Laudo com fotos antes de receber as chaves, ou na entrada e na saída do inquilino.',
    highlights: ['Registro fotográfico completo', 'Elétrica, hidráulica e acabamentos', 'Lista de pendências'],
    seo: {
      title: 'Vistoria de imóvel novo e para aluguel | Beatriz Torres Arquitetura',
      description:
        'Vistoria técnica feita por arquiteta antes de receber as chaves do imóvel novo ou na entrada e saída do inquilino. Laudo com fotos, instalações, acabamentos e lista de pendências.',
    },
    hero: {
      eyebrow: 'Vistoria de imóvel',
      title: 'Vistoria antes de receber as chaves',
      accent: 'ou de alugar',
      lede: 'Recebeu um apartamento novo ou vai alugar o seu? A vistoria registra pendências e defeitos antes da mudança e documenta o estado do imóvel na entrada e na saída do inquilino.',
      image: '1630699144867-37acec97df5a',
      imageAlt: 'Apartamento novo vazio, com piso de madeira e porta de vidro para a varanda',
    },
    // TODO(owner): there is no vistoria price in the strategy document. Add one here if you
    // want it shown; until then the page asks for a quote.
    price: {
      value: 'Sob consulta',
      note: 'Valor fechado antes da visita, conforme metragem e endereço',
    },
    // TODO(owner): confirm "laudo em até 48 horas" (kept from the previous site).
    trust: ['Feita por arquiteta', 'Laudo com registro fotográfico', 'Relatório em até 48 horas'],
    cta: {
      label: 'Pedir orçamento da vistoria',
      message: 'Olá, Beatriz! Vim pela página da vistoria. Quero orçar uma vistoria. Bairro e metragem: ',
    },
    fit: {
      yes: [
        'Vai receber as chaves de um imóvel novo da construtora',
        'Vai alugar seu imóvel e quer documentar o estado na entrada',
        'O inquilino vai sair e você precisa comparar com a entrada',
        'Comprou um imóvel usado e quer saber o que precisa de reparo',
      ],
      no: [
        {
          text: 'Quer decorar ou reorganizar o imóvel, não inspecionar.',
          label: 'Veja a consultoria',
          href: '/servicos/consultoria',
        },
      ],
    },
    includes: {
      title: 'O que a vistoria verifica',
      intro: 'Uma visita ao imóvel e um laudo técnico com tudo o que foi encontrado.',
      groups: [
        {
          items: [
            { title: 'Registro fotográfico completo', text: 'Cada ambiente fotografado e identificado no laudo.' },
            { title: 'Instalações elétricas e hidráulicas', text: 'Tomadas, interruptores, torneiras, ralos e registros.' },
            { title: 'Vícios aparentes e ocultos', text: 'Trincas, infiltrações, desníveis e falhas de execução.' },
            { title: 'Acabamentos e revestimentos', text: 'Pisos, pintura, rejuntes, esquadrias e louças.' },
            { title: 'Laudo técnico', text: 'Relatório com fotos e a lista de pendências para cobrar ou comparar.' },
          ],
        },
      ],
    },
    pricing: {
      kind: 'quote',
      title: 'Orçamento pelo tamanho do imóvel',
      intro: 'O valor da vistoria é fechado antes da visita e depende de três coisas:',
      factors: ['Metragem do imóvel', 'Endereço', 'Tipo: entrega de chaves, entrada ou saída de inquilino'],
      foot: 'Mande o bairro e a metragem pelo WhatsApp e receba o valor.',
    },
    notIncluded: [
      'Reparos e acompanhamento de obra',
      'Laudos estruturais ou de engenharia',
      'Projeto ou consultoria de interiores (contratados à parte)',
    ],
    process: [
      { title: 'Mande bairro e metragem', text: 'Pelo WhatsApp. Você recebe o valor e as datas disponíveis.' },
      { title: 'Agende a visita', text: 'De preferência antes de assinar o termo de recebimento ou o contrato.' },
      { title: 'Vistoria no imóvel', text: 'Inspeção de cada ambiente, com fotos e testes das instalações.' },
      { title: 'Receba o laudo', text: 'Relatório com fotos e a lista de pendências.' },
    ],
    faq: [
      {
        q: 'Quando devo fazer a vistoria de entrega de chaves?',
        a: 'Antes de assinar o termo de recebimento. Assim as pendências ficam registradas e podem ser cobradas da construtora.',
      },
      {
        q: 'O laudo serve para o contrato de aluguel?',
        a: 'Serve. O laudo de entrada documenta o estado do imóvel com fotos e pode ser anexado ao contrato. Na saída, ele é a base de comparação.',
      },
      {
        // TODO(owner): confirm the area served in person.
        q: 'Atende em quais cidades?',
        a: 'A vistoria é o único serviço presencial. Atendo São Paulo e região. Mande o endereço e eu confirmo.',
      },
      paymentFaq,
    ],
    crossSell: ['consultoria', 'apartamento-completo'],
    final: {
      title: 'Agende a vistoria antes de assinar',
      text: 'Mande o bairro, a metragem e o tipo de vistoria. A resposta vem com o valor e as datas.',
    },
    sideImage: { id: '1503387837-b154d5074bd2', alt: 'Mão anotando sobre folha de projeto impressa, com escalímetro' },
  },
}

export const serviceOrder: ServiceSlug[] = ['consultoria', 'projeto-por-ambiente', 'apartamento-completo', 'vistoria']

export const serviceHref = (slug: ServiceSlug) => `/servicos/${slug}`
