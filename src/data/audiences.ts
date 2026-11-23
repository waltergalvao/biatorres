// Content for the audience landing pages (/para/[slug]). These are the Google Ads landing
// pages: one audience, one promise, the packages that fit it and one action (WhatsApp).
// Prices come from the owner's strategy document; see src/data/services.ts.

import type { Faq, ServiceSlug } from './services'

export type AudienceSlug = 'investidores' | 'primeiro-apartamento' | 'studios'

export type Package = {
  service: ServiceSlug
  /** Overrides the service name, e.g. "Projeto do studio". */
  title?: string
  badge?: string
  why: string
  price: { pre?: string; value: string; unit?: string; note?: string }
  bullets: string[]
  message: string
}

export type Audience = {
  slug: AudienceSlug
  /** Card on the home page and in the menu. */
  card: { kicker: string; title: string; text: string; menu: string }
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
  price: { pre?: string; value: string; unit?: string; note: string }
  trust: string[]
  cta: { label: string; message: string }
  contrast: { title: string; lede: string; without: string[]; with: string[] }
  packages: { title: string; lede: string; items: Package[] }
  faq: Faq[]
  final: { title: string; text: string }
}

// TODO(owner): confirm the payment terms and state them here.
const paymentFaq: Faq = {
  q: 'Como é o pagamento?',
  a: 'As condições de pagamento vêm por escrito na proposta, junto com o valor fechado, antes de qualquer trabalho começar.',
}

export const audiences: Record<AudienceSlug, Audience> = {
  investidores: {
    slug: 'investidores',
    card: {
      kicker: 'Investidores',
      title: 'Imóvel de renda pronto para alugar',
      text: 'Studios e apartamentos até 60 m² com layout que aproveita cada metro e acabamentos que aguentam a troca de inquilinos.',
      menu: 'Imóveis de renda até 60 m², para temporada ou contrato longo.',
    },
    seo: {
      title: 'Projeto de interiores para investidores: imóveis até 60 m² | Beatriz Torres',
      description:
        'Projeto de interiores para quem compra para alugar: layout, marcenaria e acabamentos pensados para temporada ou contrato longo. Apartamento completo até 60 m² por R$ 15.000.',
    },
    hero: {
      eyebrow: 'Para investidores · imóveis até 60 m²',
      title: 'Seu imóvel de investimento pronto para',
      accent: 'alugar bem',
      lede: 'Projeto de interiores para studios e apartamentos de até 60 m² comprados para renda: layout que aproveita cada metro, acabamentos que aguentam a rotatividade e um visual que se destaca no anúncio.',
      image: '1595526114035-0d45ed16cfbf',
      imageAlt: 'Quarto claro de studio com cama de casal, mesa de cabeceira e janela',
    },
    price: {
      pre: 'projeto completo',
      value: 'R$ 15.000',
      unit: 'até 60 m²',
      note: 'Só mobiliar e decorar? Consultoria a partir de R$ 450 por ambiente',
    },
    trust: [
      'Projeto pensado para aluguel, não só para morar',
      'Valor do projeto fechado antes de começar',
      'Online, para imóveis em qualquer cidade',
    ],
    cta: {
      label: 'Falar sobre meu imóvel',
      message: 'Olá, Beatriz! Vim pela página para investidores. Meu imóvel tem __ m², fica em __ e é para aluguel de: ',
    },
    contrast: {
      title: 'Imóvel de renda pede decisões de projeto',
      lede: 'Cada escolha aparece no anúncio, na manutenção e no tempo de obra.',
      without: [
        'Móveis comprados por impulso, que não cabem ou não combinam',
        'Acabamentos frágeis, trocados a cada inquilino',
        'Fotos de anúncio iguais às de todos os imóveis do prédio',
        'Obra sem detalhamento, com improviso e retrabalho',
      ],
      with: [
        'Layout que transforma metragem pequena em ambiente funcional',
        'Materiais escolhidos para durar e ser fáceis de limpar',
        'Um conceito visual que diferencia o anúncio',
        'Caderno técnico para o empreiteiro executar sem você no local',
      ],
    },
    packages: {
      title: 'Escolha pelo que o imóvel precisa',
      lede: 'Do imóvel inteiro à decoração de um ambiente pronto. Todos com valor fechado.',
      items: [
        {
          service: 'apartamento-completo',
          badge: 'Mais indicado',
          why: 'Para preparar o imóvel inteiro, do layout aos acabamentos, com um conceito só.',
          price: { value: 'R$ 15.000', unit: 'até 60 m²', note: 'Referência de R$ 250/m²' },
          bullets: ['3D de todos os ambientes (até 10 vistas)', 'Marcenaria, iluminação e pontos elétricos', 'Memorial e caderno técnico para a obra'],
          message: 'Olá, Beatriz! Vim pela página para investidores. Quero o projeto do apartamento completo. Metragem e cidade: ',
        },
        {
          service: 'projeto-por-ambiente',
          why: 'Para reformar só a cozinha ou o banheiro, onde a manutenção mais pesa.',
          price: { value: 'R$ 250', unit: 'por m²', note: 'Banheiro até 6 m² por R$ 1.500' },
          bullets: ['Imagens 3D realistas', 'Marcenaria e bancadas detalhadas', 'Caderno técnico para a obra'],
          message: 'Olá, Beatriz! Vim pela página para investidores. Quero o projeto de um ambiente. Ambiente e metragem: ',
        },
        {
          service: 'consultoria',
          why: 'Para mobiliar e decorar um imóvel que já está pronto, sem obra.',
          price: { pre: 'a partir de', value: 'R$ 450', unit: 'por ambiente' },
          bullets: ['Layout e lista de móveis com links', 'Moodboard de cores e materiais', 'Entrega em PDF'],
          message: 'Olá, Beatriz! Vim pela página para investidores. Quero uma consultoria para mobiliar o imóvel. Ambientes: ',
        },
      ],
    },
    faq: [
      {
        q: 'O projeto muda se o aluguel for por temporada?',
        a: 'Muda. No briefing definimos o perfil de quem vai ocupar o imóvel, e isso orienta o layout, os acabamentos e quanto de móvel fica no imóvel.',
      },
      {
        q: 'Comprei na planta. Quando devo começar?',
        a: 'Antes da entrega das chaves. Com a planta da construtora dá para definir layout, pontos elétricos e marcenaria, e começar a obra assim que receber o imóvel.',
      },
      {
        q: 'O imóvel fica em outra cidade.',
        a: 'Sem problema. O projeto é todo online e o caderno técnico é feito para o empreiteiro local executar sem depender de visita.',
      },
      {
        q: 'Tenho mais de uma unidade no mesmo prédio.',
        a: 'Mande as plantas. Unidades iguais podem seguir o mesmo conceito, e isso é considerado na proposta.',
      },
      {
        q: 'O projeto inclui compras, obra e montagem?',
        a: 'Não. Você recebe a lista de produtos e o caderno técnico; compras, obra e montagem ficam com você ou com a sua equipe.',
      },
      paymentFaq,
    ],
    final: {
      title: 'Mande a planta do seu imóvel de investimento',
      text: 'Diga a metragem, a cidade e se vai alugar por temporada ou contrato longo. A resposta vem com o pacote indicado e o valor fechado.',
    },
  },

  'primeiro-apartamento': {
    slug: 'primeiro-apartamento',
    card: {
      kicker: 'Primeiro apartamento',
      title: 'Chaves na mão, casa vazia',
      text: 'Decida o que comprar primeiro e onde cada móvel entra, antes de gastar com o que não cabe.',
      menu: 'Pegou as chaves? Planeje antes de comprar o primeiro móvel.',
    },
    seo: {
      title: 'Projeto de interiores para o primeiro apartamento | Beatriz Torres Arquitetura',
      description:
        'Pegou as chaves do primeiro apartamento? Consultoria online a partir de R$ 450 por ambiente para decidir layout, móveis e cores, ou o projeto completo até 60 m² por R$ 15.000.',
    },
    hero: {
      eyebrow: 'Primeiro apartamento',
      title: 'Seu primeiro apartamento planejado',
      accent: 'antes de gastar',
      lede: 'Chaves na mão e casa vazia? Eu ajudo você a decidir o que comprar primeiro, onde cada móvel entra e como deixar tudo com a sua cara, dentro do orçamento.',
      image: '1502672260266-1c1ef2d93688',
      imageAlt: 'Sala de apartamento com sofá cinza, plantas, estante e luz natural',
    },
    price: {
      pre: 'a partir de',
      value: 'R$ 450',
      unit: 'por ambiente',
      note: 'O apartamento inteiro, até 60 m², por R$ 15.000',
    },
    trust: [
      'Comece por um ambiente e siga no seu ritmo',
      'Lista de compras com links, dentro do orçamento',
      '100% online, de qualquer cidade',
    ],
    cta: {
      label: 'Quero planejar meu apê',
      message: 'Olá, Beatriz! Vim pela página de primeiro apartamento. Meu apê tem __ m² e quero começar por: ',
    },
    contrast: {
      title: 'Os erros mais comuns do primeiro apê',
      lede: 'Quase todos acontecem antes da primeira compra, e quase todos se evitam no papel.',
      without: [
        'Sofá grande demais para a sala',
        'Comprar tudo de uma vez e estourar o orçamento',
        'Cores e móveis que não conversam entre si',
        'Tomadas e luminárias no lugar errado depois da obra',
      ],
      with: [
        'Medidas conferidas antes de cada compra',
        'Compras planejadas para caber no orçamento',
        'Um conceito que liga todos os ambientes',
        'Elétrica e marcenaria decididas antes da obra',
      ],
    },
    packages: {
      title: 'Comece pequeno ou planeje tudo de uma vez',
      lede: 'A maioria começa pela consultoria de um ambiente. Quem vai reformar costuma ir direto para o projeto.',
      items: [
        {
          service: 'consultoria',
          badge: 'Para começar',
          why: 'Para mobiliar e decorar um ambiente de cada vez, sem obra.',
          price: { pre: 'a partir de', value: 'R$ 450', unit: 'por ambiente', note: 'Quarto R$ 450 · Sala R$ 500' },
          bullets: ['Briefing por vídeo', 'Layout e moodboard', 'Lista de compras com links'],
          message: 'Olá, Beatriz! Vim pela página de primeiro apartamento. Quero uma consultoria. O ambiente é: ',
        },
        {
          service: 'apartamento-completo',
          badge: 'Vai reformar',
          why: 'Comprou na planta ou vai reformar? Projete o apartamento inteiro antes da obra.',
          price: { value: 'R$ 15.000', unit: 'até 60 m²', note: 'Todos os ambientes inclusos' },
          bullets: ['3D de todos os ambientes', 'Pontos elétricos e marcenaria', 'Caderno técnico para a obra'],
          message: 'Olá, Beatriz! Vim pela página de primeiro apartamento. Quero o projeto do apartamento completo. Metragem: ',
        },
        {
          service: 'projeto-por-ambiente',
          why: 'Para a cozinha ou o banheiro que vão passar por reforma.',
          price: { value: 'R$ 250', unit: 'por m²', note: 'Cozinha até 12 m² por R$ 3.000' },
          bullets: ['Imagens 3D realistas', 'Marcenaria e bancadas', 'Caderno técnico'],
          message: 'Olá, Beatriz! Vim pela página de primeiro apartamento. Quero o projeto de um ambiente. Ambiente e metragem: ',
        },
      ],
    },
    faq: [
      {
        q: 'Por qual ambiente começo?',
        a: 'Pelo que você mais usa ou pelo que vai exigir obra. Para quem só vai mobiliar, geralmente sala ou quarto. Para quem vai reformar, cozinha e banheiro.',
      },
      {
        q: 'Tenho pouco orçamento. Vale a pena?',
        a: 'A consultoria existe para isso: custa a partir de R$ 450 e evita a compra errada. A lista de produtos parte do orçamento que você informa no briefing.',
      },
      {
        q: 'Posso comprar aos poucos?',
        a: 'Pode. Com o projeto definido, você compra no seu ritmo sem perder a unidade do conjunto.',
      },
      {
        q: 'Ainda não recebi as chaves.',
        a: 'É um ótimo momento. Com a planta da construtora dá para planejar layout, tomadas e marcenaria antes da obra.',
      },
      {
        q: 'Funciona mesmo online?',
        a: 'Sim. Você manda a planta, fotos e medidas, o briefing é por chamada de vídeo e as entregas chegam em PDF.',
      },
      paymentFaq,
    ],
    final: {
      title: 'Conte como é o seu primeiro apê',
      text: 'Mande a metragem e por qual ambiente quer começar. A resposta vem com o serviço indicado e o valor fechado.',
    },
  },

  studios: {
    slug: 'studios',
    card: {
      kicker: 'Studios',
      title: 'Tudo cabe, nada aperta',
      text: 'Dormir, trabalhar, cozinhar e receber no mesmo ambiente, com marcenaria sob medida e móveis na escala certa.',
      menu: 'Dormir, trabalhar e receber no mesmo ambiente.',
    },
    seo: {
      title: 'Projeto de interiores para studio: morar bem em poucos m² | Beatriz Torres',
      description:
        'Projeto de interiores para studios: dormir, trabalhar, cozinhar e receber no mesmo ambiente. Projeto com 3D e marcenaria a R$ 250/m² ou consultoria online a partir de R$ 450.',
    },
    hero: {
      eyebrow: 'Projeto para studios',
      title: 'Um studio onde',
      accent: 'tudo cabe',
      titleAfter: ' e nada aperta',
      lede: 'Dormir, trabalhar, cozinhar e receber no mesmo ambiente pede projeto. Marcenaria sob medida, móveis na escala certa e uma circulação que funciona em 25 ou 30 m².',
      image: '1522708323590-d24dbb6b0267',
      imageAlt: 'Sala e jantar integrados em apartamento compacto com piso de madeira e poltrona vermelha',
    },
    // TODO(owner): the strategy document has no studio-specific price. This uses the
    // projeto por ambiente rate (R$ 250/m²) for the whole studio; confirm or adjust.
    price: {
      pre: 'projeto a',
      value: 'R$ 250',
      unit: 'por m²',
      note: 'Studio de 25 m²: R$ 6.250 · Consultoria a partir de R$ 450',
    },
    trust: ['Marcenaria pensada para cada centímetro', '3D antes de comprar ou quebrar', 'Para quem mora ou para quem aluga'],
    cta: {
      label: 'Quero projetar meu studio',
      message: 'Olá, Beatriz! Vim pela página de studios. Meu studio tem __ m², fica em __ e é para: ',
    },
    contrast: {
      title: 'Em um studio, cada decisão aparece',
      lede: 'Não há outro cômodo para esconder o que não funcionou.',
      without: [
        'A cama domina o ambiente e não sobra lugar para receber',
        'Sem espaço para guardar, tudo fica à vista',
        'Mesa de trabalho improvisada na bancada',
        'Móveis de catálogo que desperdiçam a altura do pé-direito',
      ],
      with: [
        'Zonas claras para dormir, trabalhar e receber',
        'Armários e nichos sob medida, do piso ao teto',
        'Móveis multifuncionais na escala do espaço',
        'Iluminação que muda o clima do ambiente ao longo do dia',
      ],
    },
    packages: {
      title: 'Dois caminhos para o seu studio',
      lede: 'Com obra e marcenaria, ou só com móveis e decoração.',
      items: [
        {
          service: 'projeto-por-ambiente',
          title: 'Projeto do studio',
          badge: 'Mais indicado',
          why: 'O studio inteiro como um ambiente só, com 3D, marcenaria e caderno técnico.',
          price: { value: 'R$ 250', unit: 'por m²', note: 'Studio de 25 m²: R$ 6.250' },
          bullets: ['Layout e marcenaria sob medida', 'Imagens 3D realistas', 'Caderno técnico para a obra'],
          message: 'Olá, Beatriz! Vim pela página de studios. Quero o projeto do meu studio. Metragem: ',
        },
        {
          service: 'consultoria',
          why: 'Para reorganizar e decorar o studio sem obra.',
          price: { pre: 'a partir de', value: 'R$ 450', unit: 'por ambiente', note: 'Valor conforme a planta do studio' },
          bullets: ['Layout orientativo', 'Moodboard de cores e materiais', 'Lista de compras com links'],
          message: 'Olá, Beatriz! Vim pela página de studios. Quero uma consultoria para o meu studio. Metragem: ',
        },
      ],
    },
    faq: [
      {
        q: 'Meu studio tem menos de 20 m². Dá para fazer?',
        a: 'Dá, e é onde o projeto mais faz diferença. O valor segue R$ 250/m², com mínimo de R$ 1.500 por contratação.',
      },
      {
        q: 'Dá para ter cama de casal e sala?',
        a: 'Depende da planta. O estudo de layout mostra as opções possíveis para o seu espaço: marcenaria, cama retrátil ou uma divisória leve.',
      },
      {
        q: 'O studio é para alugar. Muda alguma coisa?',
        a: 'Muda. Para aluguel, o projeto prioriza acabamentos resistentes, fáceis de limpar, e um visual que fotografa bem para o anúncio.',
      },
      {
        q: 'O que não está incluso?',
        a: 'Execução, gerenciamento de obra, compras e visitas. O caderno técnico é feito para o marceneiro e o empreiteiro executarem sem depender de visita.',
      },
      {
        q: 'Funciona mesmo online?',
        a: 'Sim. Você manda a planta, fotos e medidas, o briefing é por chamada de vídeo e as entregas chegam em PDF.',
      },
      paymentFaq,
    ],
    final: {
      title: 'Mande a planta do seu studio',
      text: 'Diga a metragem e se é para morar ou alugar. A resposta vem com o serviço indicado e o valor fechado.',
    },
  },
}

export const audienceOrder: AudienceSlug[] = ['investidores', 'primeiro-apartamento', 'studios']

export const audienceHref = (slug: AudienceSlug) => `/para/${slug}`
