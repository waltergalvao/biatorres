// Content of the /sobre page that other outputs also read (llms.txt, llms-full.txt, JSON-LD),
// so the page and the machine-readable versions never disagree.

/** The lede under the title of /sobre, in Beatriz's voice. */
export const aboutLede =
  'Arquiteta de interiores dedicada a studios, primeiro imóvel e apartamentos de até 60 m². Eu conduzo cada projeto do briefing à entrega, online, para clientes de qualquer cidade.'

/** The same, in the third person: for the Person entity, llms.txt and other machine-readable text. */
export const aboutSummary =
  'Beatriz Torres é arquiteta de interiores dedicada a studios, primeiro imóvel e apartamentos de até 60 m². Ela conduz cada projeto do briefing à entrega, online, para clientes de qualquer cidade do Brasil.'

// TODO(owner): personalise this text with Beatriz's own story.
export const aboutStory = [
  'Em um apartamento grande, um erro de medida passa despercebido. Em 40 m², um sofá fora de escala ocupa a sala inteira, e uma tomada no lugar errado vira uma extensão para sempre.',
  'Por isso escolhi trabalhar com studios, primeiro imóvel e apartamentos compactos: quem compra para morar, quem compra para alugar e quem quer fazer mais com menos metros.',
  'Atendo online porque funciona: com a planta, fotos, medidas e uma boa conversa por vídeo, eu entrego o projeto pronto para você comprar, reformar e montar, esteja onde estiver.',
]

export const principles = [
  {
    title: 'Escuta',
    text: 'Antes de desenhar, entendo a sua rotina, o seu orçamento e o que fica ou sai. O projeto parte de como você vive, não de uma tendência.',
  },
  {
    title: 'Medida',
    text: 'Em poucos metros, cada centímetro conta. Confiro as medidas de cada móvel e cada circulação antes de você comprar ou quebrar.',
  },
  {
    title: 'Clareza',
    text: 'Você sabe o que vai receber e quanto vai pagar antes de começar. As entregas vêm organizadas para comprar, reformar e montar.',
  },
]
