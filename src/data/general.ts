// Content shared by the home page and /servicos (not tied to a single service).

import type { Faq, Step } from './services'

export const generalProcess: Step[] = [
  {
    title: 'Conversa pelo WhatsApp',
    text: 'Você conta o que quer mudar. Eu indico o serviço que faz sentido e mando o valor fechado.',
  },
  {
    title: 'Planta, fotos e medidas',
    text: 'Serve a planta da construtora e fotos feitas no celular. Com isso eu analiso o espaço.',
  },
  {
    title: 'Briefing por vídeo',
    text: 'Uma conversa sobre sua rotina, seu estilo, seu orçamento e o que fica ou sai.',
  },
  {
    title: 'Entrega em PDF',
    text: 'Da consultoria ao caderno técnico, tudo organizado para comprar, reformar e montar.',
  },
]

export const generalFaq: Faq[] = [
  {
    q: 'Qual serviço é para mim?',
    a: 'Se quer melhorar um ambiente sem obra, comece pela consultoria. Se vai reformar um cômodo, com marcenaria ou bancadas, o projeto por ambiente. Se vai preparar o apartamento todo, o apartamento completo. Na dúvida, mande uma mensagem e eu indico.',
  },
  {
    q: 'Funciona mesmo online?',
    a: 'Sim. Você manda a planta, fotos e medidas, o briefing é por chamada de vídeo e as entregas chegam em PDF. Por isso a cidade onde você mora não faz diferença.',
  },
  {
    q: 'Quanto custa?',
    a: 'Consultoria online: de R$ 450 (quarto) a R$ 750 (sala + cozinha), por ambiente. Projeto por ambiente: R$ 250 por m², com mínimo de R$ 1.500. Apartamento completo até 60 m²: R$ 15.000. Antes de começar, eu mando a proposta por escrito com o valor fechado.',
  },
  {
    q: 'Atende fora de São Paulo?',
    a: 'Sim. Todos os serviços são feitos online, para qualquer cidade do Brasil.',
  },
  {
    q: 'O que não está incluso?',
    a: 'Nenhum serviço inclui execução, gerenciamento ou acompanhamento de obra, compras e visitas técnicas. Projetos estruturais e complementares de engenharia são contratados à parte.',
  },
  {
    // TODO(owner): confirm the payment terms and state them here.
    q: 'Como é o pagamento?',
    a: 'Eu mando as condições de pagamento por escrito na proposta, junto com o valor fechado, antes de qualquer trabalho começar.',
  },
]
