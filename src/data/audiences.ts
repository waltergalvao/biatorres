// Content for the audience landing pages (/para/[slug]). These are the Google Ads landing
// pages: one audience, one promise, the packages that fit it and one action (WhatsApp).
// Prices come from the owner's strategy document; see src/data/services.ts.

import type { Faq, ServiceSlug } from './services'
import { changesFaq } from './support'

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
  /** Where the visitor came from, for prefilled messages: "Vim pela {source}". */
  source: string
  /** Card on the home page and in the menu. */
  /** `who` is the visitor describing themselves (first person, gender-neutral), the first thing
   *  read on the home card. `kicker` is the short label used in the menu. */
  card: {
    who: string
    kicker: string
    title: string
    text: string
    menu: string
    /** Photo for the home card, in public/images/para (Pexels). The landing hero keeps its own. */
    image: string
    imageAlt: string
    /** CSS object-position for the portrait crop of a landscape photo. */
    imagePosition?: string
  }
  /** title: about 40 characters, the layout adds " | Beatriz Torres". description: 140 to 160. */
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

// TODO(owner): confirm the payment terms for consultoria and projeto por ambiente, and whether
// the 10x for the apartment is com ou sem juros (and by which method).
const paymentFaq: Faq = {
  q: 'Como é o pagamento?',
  a: 'Pagamento do apartamento completo: em até 10x de R$ 1.500. Para os outros serviços, eu envio as condições de pagamento por escrito na proposta, junto com o valor fechado, antes de qualquer trabalho começar.',
}

export const audiences: Record<AudienceSlug, Audience> = {
  investidores: {
    slug: 'investidores',
    source: 'página para investidores',
    card: {
      who: 'Invisto em imóveis',
      kicker: 'Investidores',
      title: 'Imóvel de renda pronto para alugar',
      text: 'Gaste menos para deixar o imóvel pronto, com acabamentos de qualidade que aguentam a troca de inquilinos.',
      menu: 'Imóveis de renda até 60 m², para temporada ou contrato longo.',
      image: '/images/para/investidores.jpg',
      imageAlt: 'Investidor de terno segurando a miniatura de uma casa ao lado de uma calculadora',
    },
    seo: {
      title: 'Projeto de interiores para investidores',
      description:
        'Projeto de interiores para imóvel de renda até 60 m², para temporada ou contrato longo: layout, marcenaria e acabamentos que aguentam a troca de inquilinos.',
    },
    hero: {
      // Short enough for one line at 390px ("Para investidores · ..." wraps to two and pushes
      // the WhatsApp button below the fold in in-app browsers).
      eyebrow: 'Investidores · studios e aptos até 60 m²',
      title: 'Imóvel de renda que',
      accent: 'se destaca no anúncio',
      titleAfter: ' e aguenta a troca de inquilinos',
      lede: 'Projeto online para Airbnb ou contrato longo: layout que acomoda bem, materiais fáceis de limpar e manual da obra.',
      image: '1595526114035-0d45ed16cfbf',
      imageAlt: 'Quarto claro de studio com cama de casal, mesa de cabeceira e janela',
    },
    price: {
      pre: 'a partir de',
      value: 'R$ 450',
      unit: 'por ambiente',
      note: 'Studio de 30 m² com projeto e 3D: R$ 7.500 · Apartamento até 60 m²: 10x de R$ 1.500',
    },
    trust: ['Para temporada ou contrato longo', 'Compras e obra definidas antes das chaves', 'Executável à distância'],
    cta: {
      label: 'Falar sobre meu imóvel',
      message:
        'Olá, Beatriz! Vim pela página para investidores. Tenho um imóvel para alugar e quero o projeto. É para temporada ou contrato longo:',
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
          badge: 'Na planta ou vai reformar',
          why: 'Para preparar o imóvel inteiro, do layout aos acabamentos, com um conceito só.',
          price: { pre: '10x de', value: 'R$ 1.500', unit: 'até 60 m²', note: 'Total de R$ 15.000 · valor fixo, com lavanderia e circulação' },
          bullets: ['3D de todos os ambientes (até 10 vistas)', 'Marcenaria, iluminação e pontos elétricos', 'Memorial e caderno técnico para a obra'],
          message:
            'Olá, Beatriz! Vim pela página para investidores. Quero o projeto do apartamento completo (10x de R$ 1.500, até 60 m²). Meu imóvel tem (m²):',
        },
        {
          service: 'projeto-por-ambiente',
          badge: 'Studio ou um ambiente',
          why: 'Para projetar um studio inteiro, ou só a cozinha e o banheiro, onde a manutenção mais pesa.',
          price: { value: 'R$ 250', unit: 'por m²', note: 'Studio de 30 m²: R$ 7.500 · Banheiro até 6 m²: R$ 1.500' },
          bullets: ['Imagens 3D realistas', 'Marcenaria e bancadas detalhadas', 'Caderno técnico para a obra'],
          message: 'Olá, Beatriz! Vim pela página para investidores. Quero o projeto por ambiente (R$ 250/m²) para:',
        },
        {
          service: 'consultoria',
          badge: 'Pronto, só mobiliar',
          why: 'Para mobiliar e decorar um imóvel que já está pronto, sem obra.',
          price: { pre: 'a partir de', value: 'R$ 450', unit: 'por ambiente' },
          bullets: ['Layout e lista de móveis com links', 'Moodboard de cores e materiais', 'Entrega em PDF'],
          message:
            'Olá, Beatriz! Vim pela página para investidores. Quero a consultoria para mobiliar o imóvel (a partir de R$ 450 por ambiente). Os ambientes são:',
        },
      ],
    },
    faq: [
      {
        q: 'O projeto muda se o aluguel for por temporada?',
        a: 'Muda. No briefing eu defino com você o perfil de quem vai ocupar o imóvel, e isso orienta o layout, os acabamentos e quanto de móvel fica no imóvel.',
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
      changesFaq,
      paymentFaq,
    ],
    final: {
      title: 'Mande a planta do seu imóvel de investimento',
      text: 'Diga a metragem, a cidade e se vai alugar por temporada ou contrato longo. Eu respondo com o pacote indicado e o valor fechado.',
    },
  },

  'primeiro-apartamento': {
    slug: 'primeiro-apartamento',
    source: 'página do primeiro apartamento',
    card: {
      who: 'Comprei meu primeiro apê',
      kicker: 'Primeiro apartamento',
      title: 'Chaves na mão, casa vazia',
      text: 'Decida o que comprar primeiro e onde cada móvel entra, antes de gastar com o que não cabe.',
      menu: 'Pegou as chaves? Planeje antes de comprar o primeiro móvel.',
      image: '/images/para/primeiro-apartamento.jpg',
      imageAlt: 'Casal sorrindo e mostrando as chaves do primeiro apartamento',
    },
    seo: {
      title: 'Interiores para o primeiro apartamento',
      description:
        'Pegou as chaves do primeiro apê? Consultoria online desde R$ 450 por ambiente para decidir layout, móveis e cores, ou o apartamento inteiro em 10x de R$ 1.500.',
    },
    hero: {
      eyebrow: 'Primeiro apartamento',
      title: 'Seu primeiro apartamento planejado',
      accent: 'antes de gastar',
      lede: 'Eu ajudo você a decidir o que comprar primeiro e onde cada móvel entra.',
      image: '1502672260266-1c1ef2d93688',
      imageAlt: 'Sala de apartamento com sofá cinza, plantas, estante e luz natural',
    },
    price: {
      pre: 'a partir de',
      value: 'R$ 450',
      unit: 'por ambiente',
      note: 'O apartamento inteiro, até 60 m², em 10x de R$ 1.500',
    },
    trust: [
      'Ainda na planta? Dá para começar antes das chaves',
      'Comece por um ambiente, com lista de compras no seu orçamento',
      '100% online, de qualquer cidade',
    ],
    cta: {
      label: 'Quero planejar meu apê',
      message:
        'Olá, Beatriz! Vim pela página do primeiro apartamento. Peguei (ou vou pegar) as chaves e quero começar por:',
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
          message:
            'Olá, Beatriz! Vim pela página do primeiro apartamento. Quero a consultoria de um ambiente (a partir de R$ 450). O ambiente é:',
        },
        {
          service: 'apartamento-completo',
          badge: 'Vai reformar',
          why: 'Comprou na planta ou vai reformar? Projete o apartamento inteiro antes da obra.',
          price: { pre: '10x de', value: 'R$ 1.500', unit: 'até 60 m²', note: 'Total de R$ 15.000 · todos os ambientes inclusos' },
          bullets: ['3D de todos os ambientes', 'Pontos elétricos e marcenaria', 'Caderno técnico para a obra'],
          message:
            'Olá, Beatriz! Vim pela página do primeiro apartamento. Quero o projeto do apartamento completo (10x de R$ 1.500, até 60 m²). Meu apê tem (m²):',
        },
        {
          service: 'projeto-por-ambiente',
          why: 'Para a cozinha ou o banheiro que vão passar por reforma.',
          price: { value: 'R$ 250', unit: 'por m²', note: 'Cozinha até 12 m² por R$ 3.000' },
          bullets: ['Imagens 3D realistas', 'Marcenaria e bancadas', 'Caderno técnico'],
          message: 'Olá, Beatriz! Vim pela página do primeiro apartamento. Quero o projeto por ambiente (R$ 250/m²). O ambiente é:',
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
      changesFaq,
      paymentFaq,
    ],
    final: {
      title: 'Conte como é o seu primeiro apê',
      text: 'Mande a metragem e por qual ambiente quer começar. Eu respondo com o serviço indicado e o valor fechado.',
    },
  },

  studios: {
    slug: 'studios',
    source: 'página de studios',
    card: {
      who: 'Tenho um studio',
      kicker: 'Studios',
      title: 'Tudo cabe, nada aperta',
      text: 'Dormir, trabalhar, cozinhar e receber no mesmo ambiente, com marcenaria sob medida e móveis na escala certa.',
      menu: 'Dormir, trabalhar e receber no mesmo ambiente.',
      image: '/images/para/studio-cozinha.jpg',
      imageAlt: 'Studio com cama, divisória de ripas de madeira e cozinha no mesmo ambiente',
      imagePosition: '40% 50%',
    },
    seo: {
      title: 'Projeto de interiores para studio',
      description:
        'Projeto de interiores para studio: dormir, trabalhar e receber no mesmo ambiente. Projeto com 3D e marcenaria a R$ 250/m² ou consultoria online desde R$ 450.',
    },
    hero: {
      eyebrow: 'Projeto para studios',
      title: 'Um studio onde',
      accent: 'tudo cabe',
      titleAfter: ' e nada aperta',
      lede: 'Dormir, trabalhar e receber em 25 ou 30 m², com marcenaria sob medida.',
      image: '1522708323590-d24dbb6b0267',
      imageAlt: 'Sala e jantar integrados em apartamento compacto com piso de madeira e poltrona vermelha',
    },
    // TODO(owner): the strategy document has no studio-specific price. This uses the
    // projeto por ambiente rate (R$ 250/m²) for the whole studio; confirm or adjust.
    price: {
      pre: 'projeto a',
      value: 'R$ 250',
      unit: 'por m²',
      note: 'Studio de 30 m²: R$ 7.500 · Consultoria a partir de R$ 450',
    },
    trust: ['Marcenaria pensada para cada centímetro', '3D antes de comprar ou quebrar', 'Para quem mora ou para quem aluga'],
    cta: {
      label: 'Quero projetar meu studio',
      message: 'Olá, Beatriz! Vim pela página de studios. Quero projetar meu studio, que é para:',
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
          price: { value: 'R$ 250', unit: 'por m²', note: 'Studio de 30 m²: R$ 7.500' },
          bullets: ['Layout e marcenaria sob medida', 'Imagens 3D realistas', 'Caderno técnico para a obra'],
          message: 'Olá, Beatriz! Vim pela página de studios. Quero o projeto do studio (R$ 250/m²). Meu studio tem (m²):',
        },
        {
          service: 'consultoria',
          why: 'Para reorganizar e decorar o studio sem obra.',
          price: { pre: 'a partir de', value: 'R$ 450', unit: 'por ambiente', note: 'Valor conforme a planta do studio' },
          bullets: ['Layout orientativo', 'Moodboard de cores e materiais', 'Lista de compras com links'],
          message:
            'Olá, Beatriz! Vim pela página de studios. Quero a consultoria para o meu studio (a partir de R$ 450). Meu studio tem (m²):',
        },
      ],
    },
    faq: [
      {
        q: 'A loja de planejados faz o projeto de graça. Por que pagar?',
        a: 'O projeto da loja é feito para vender os móveis daquela loja, no catálogo e no preço dela. O meu é seu: você leva o mesmo desenho para três marceneiros ou lojas e compara preço com preço. E ele vai além dos armários: layout, iluminação, revestimentos e os móveis que você compra prontos.',
      },
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
      changesFaq,
      paymentFaq,
    ],
    final: {
      title: 'Mande a planta do seu studio',
      text: 'Diga a metragem e se é para morar ou alugar. Eu respondo com o serviço indicado e o valor fechado.',
    },
  },
}

export const audienceOrder: AudienceSlug[] = ['investidores', 'primeiro-apartamento', 'studios']

export const audienceHref = (slug: AudienceSlug) => `/para/${slug}`
