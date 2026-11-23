// What happens after the project is delivered: support during the build and changes.
// Every page (service cards, heroes, the "E se eu quiser mudar algo?" block and the FAQs) reads
// these values, so the policy only needs changing here.
//
// TODO(owner): PROPOSED policy, not yet confirmed by Beatriz. Confirm or change each value:
//   - questionsDays: how long questions from the marceneiro / pedreiro are answered for free
//   - smallChangesDays: how long small adjustments are free (a finish, a measurement, a product
//     that went out of stock)
//   - biggerChangesPrice: how bigger changes (redoing a layout, adding a room) are charged
//   - measureCheck: whether the apartment package includes checking the real measurements after
//     the keys and adjusting the project to them
export const support = {
  questionsDays: 90,
  smallChangesDays: 30,
  biggerChangesPrice: 'R$ 250/m² da área alterada',
  measureCheck: true,
}

/** Short label for cards and hero bullets. */
export const supportLabel = `Suporte à obra por ${support.questionsDays} dias`

const approvalLine =
  'Você aprova cada etapa antes da próxima: primeiro a planta, depois as imagens 3D, depois o técnico. Quando o projeto final chega, não tem surpresa.'

const projectPoints = [
  'Uma rodada de ajustes em cada etapa, antes da entrega.',
  `Dúvidas do marceneiro e do pedreiro respondidas por WhatsApp por ${support.questionsDays} dias depois da entrega.`,
  `Pequenos ajustes sem custo por ${support.smallChangesDays} dias: trocar um acabamento, mudar uma medida, substituir um produto que saiu de linha.`,
  `Mudanças maiores, como refazer o layout, são orçadas antes de começar: ${support.biggerChangesPrice}.`,
]

export type Changes = { lead: string; points: string[] }

export const changesBySlug = {
  consultoria: {
    lead: 'Depois de receber o PDF, você ainda pode pedir ajustes. A ideia é que a lista de compras funcione de verdade na sua casa.',
    points: [
      `Uma rodada de ajustes no layout e na lista de compras, em até ${support.smallChangesDays} dias depois da entrega.`,
      'Um produto esgotou? Eu indico outro no mesmo estilo e na mesma faixa de preço.',
      'Quer mudar o ambiente todo depois? Vira uma nova consultoria, com o valor da tabela.',
    ],
  },
  'projeto-por-ambiente': { lead: approvalLine, points: projectPoints },
  'apartamento-completo': {
    lead: approvalLine,
    points: [
      ...(support.measureCheck
        ? ['Comprou na planta? Quando as chaves chegam, eu confiro as medidas reais e ajusto o projeto a elas, sem custo.']
        : []),
      ...projectPoints,
    ],
  },
} satisfies Record<string, Changes>

const changesQ = 'Posso pedir ajustes depois de receber o projeto?'

/** FAQ for the projects (projeto por ambiente, apartamento completo) and the general pages. */
export const changesFaq = {
  q: changesQ,
  a: `Pode. Pequenos ajustes, como trocar um acabamento ou mudar uma medida, não têm custo por ${support.smallChangesDays} dias depois da entrega, e as dúvidas da obra eu respondo por ${support.questionsDays} dias. Mudanças maiores, como refazer o layout, eu orço antes de começar.${
    support.measureCheck ? ' No apartamento completo, se você comprou na planta, eu confiro as medidas reais depois das chaves e ajusto o projeto.' : ''
  }`,
}

export const consultoriaChangesFaq = {
  q: changesQ,
  a: `Pode. Você tem uma rodada de ajustes no layout e na lista de compras em até ${support.smallChangesDays} dias depois da entrega. Se um produto esgotar, eu indico outro parecido.`,
}
