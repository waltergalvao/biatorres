// Markdown for /llms.txt and /llms-full.txt (https://llmstxt.org): what the site says, in a
// form AI assistants and agents can read without parsing the HTML.
//
// Everything is built from the same data files as the pages (services, audiences, FAQ,
// prices, about), so these files can't drift from the site. Only facts the site already
// states go here.

import { aboutStory, aboutSummary, principles } from '@/data/about'
import { audienceHref, audienceOrder, audiences, type Audience } from '@/data/audiences'
import { generalFaq, generalProcess } from '@/data/general'
import { serviceHref, serviceOrder, services, type Faq, type Service } from '@/data/services'
import { changesBySlug, support } from '@/data/support'
import { articleMarkdownPath, articlePath, getAllArticles } from '@/lib/blog/articles'
import { getArticleMarkdown } from '@/lib/blog/markdown'
import { BUSINESS_DESCRIPTION, BUSINESS_NAME, absoluteUrl } from '@/lib/schema'
import { EMAIL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/site'

export const LLMS_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  // Readable by anyone, but not a page to show in search results.
  'X-Robots-Tag': 'noindex',
}

const link = (label: string, path: string) => `[${label}](${absoluteUrl(path)})`
const list = (items: string[]) => items.map((i) => `- ${i}`).join('\n')
const steps = (items: { title: string; text: string }[]) => items.map((s, n) => `${n + 1}. **${s.title}.** ${s.text}`).join('\n')
const faq = (items: Faq[], level = '###') => items.map((f) => `${level} ${f.q}\n\n${f.a}`).join('\n\n')
/** 'Total de R$ 15.000' -> 'total de R$ 15.000' (first letter only, so 'R$' stays). */
const lcFirst = (t: string) => t.charAt(0).toLowerCase() + t.slice(1)
const priceLine = (p: { pre?: string; value: string; unit?: string }) => [p.pre, p.value, p.unit].filter(Boolean).join(' ')

function header() {
  return `# ${BUSINESS_NAME}

> ${BUSINESS_DESCRIPTION}

${aboutSummary} Perfil: ${absoluteUrl('/sobre')}.

- Atendimento 100% online: o cliente manda planta, fotos e medidas, o briefing é por chamada de vídeo e as entregas chegam em PDF. Atende qualquer cidade do Brasil; a base é São Paulo, SP.
- Foco em apartamentos de até 60 m², studios, primeiro imóvel e imóveis para alugar.
- Preços públicos (abaixo). O valor fechado e as condições vêm por escrito antes de qualquer trabalho começar.
- Nenhum serviço inclui execução, gerenciamento ou acompanhamento de obra, compras ou visitas técnicas.
- Depois da entrega: dúvidas da obra respondidas por ${support.questionsDays} dias e pequenos ajustes sem custo por ${support.smallChangesDays} dias.
- Contato: WhatsApp ${WHATSAPP_DISPLAY} (https://wa.me/${WHATSAPP_NUMBER}) ou e-mail ${EMAIL}.`
}

function pricingSummary(s: Service) {
  const p = s.pricing
  if (p.kind === 'rooms') {
    const rows = p.rows.map((r) => `${r.room}${p.showArea && r.area ? ` (${r.area})` : ''}: ${r.price}`).join('; ')
    return `${priceLine(s.price)}. ${rows}.${p.calculator ? ` Valor mínimo por contratação: R$ ${p.calculator.minimum.toLocaleString('pt-BR')}.` : ''}`
  }
  return `${priceLine(s.price)}${p.total ? ` (${lcFirst(p.total)})` : ''}. Cobre: ${p.covers.join(', ')}.`
}

function serviceSummary(s: Service) {
  return `### ${link(s.name, serviceHref(s.slug))}

${s.summary}

- Preço: ${pricingSummary(s)}
- Destaques: ${s.highlights.join('; ')}.
- Não inclui: ${s.notIncluded.join('; ')}.`
}

function audienceSummary(a: Audience) {
  const packages = a.packages.items.map((p) => `${p.title ?? services[p.service].name} (${priceLine(p.price)})`).join(', ')
  return `- ${link(a.card.kicker, audienceHref(a.slug))}: ${a.card.title}. ${a.card.text} Serviços indicados: ${packages}.`
}

async function articleList() {
  const articles = await getAllArticles()
  if (!articles.length) return ''
  return `## Blog

Artigos sobre projeto de interiores para apartamentos pequenos. Cada link abaixo é a versão em Markdown; a página do artigo está entre parênteses. Lista completa em ${absoluteUrl('/blog')}.

${articles
  .map((a) => `- [${a.title}](${absoluteUrl(articleMarkdownPath(a.slug))}): ${a.description} (página: ${absoluteUrl(articlePath(a.slug))})`)
  .join('\n')}`
}

const pages = () =>
  list([
    `${link('Início', '/')}: os três serviços com preço, para quem é, como funciona e perguntas frequentes.`,
    `${link('Sobre a Beatriz', '/sobre')}: quem é, por que apartamentos pequenos e como trabalha.`,
    `${link('Contato', '/contato')}: WhatsApp e e-mail.`,
  ])

/** /llms.txt: the map of the site, short enough to read in one go. */
export async function llmsTxt() {
  return [
    header(),
    `## Serviços\n\n${serviceOrder.map((slug) => serviceSummary(services[slug])).join('\n\n')}`,
    `## Para quem\n\n${audienceOrder.map((slug) => audienceSummary(audiences[slug])).join('\n')}`,
    `## Como funciona\n\n${steps(generalProcess)}`,
    `## Perguntas frequentes\n\n${faq(generalFaq)}`,
    await articleList(),
    `## Páginas\n\n${pages()}`,
    `## Optional\n\n${list([
      `${link('Texto completo do site', '/llms-full.txt')}: todos os serviços, páginas e artigos do blog em Markdown, num arquivo só.`,
      `${link('Sitemap', '/sitemap.xml')}`,
    ])}`,
  ]
    .filter(Boolean)
    .join('\n\n')
    .concat('\n')
}

function serviceFull(s: Service) {
  const includes = s.includes.groups
    .map((g) => {
      const items = list(g.items.map((i) => `${i.title}${i.text ? `: ${i.text}` : ''}${i.delivers ? ` Entrega: ${i.delivers}.` : ''}`))
      return g.title ? `**${g.title}**\n\n${items}` : items
    })
    .join('\n\n')
  const p = s.pricing
  const pricing =
    p.kind === 'rooms'
      ? `${p.intro}\n\n${list(p.rows.map((r) => `${r.room}${p.showArea && r.area ? ` (${r.area})` : ''}: ${r.price}`))}\n\n${p.foot}`
      : `${p.intro}\n\n${p.pre ? `${p.pre} ` : ''}${p.price}, ${p.unit}${p.total ? ` (${lcFirst(p.total)})` : ''}. Cobre:\n\n${list(p.covers)}\n\n${p.foot}`
  const changes = changesBySlug[s.slug]

  return `## ${s.name}

Página: ${absoluteUrl(serviceHref(s.slug))}

${s.hero.lede}

### Para quem é

${list(s.fit.yes)}

Não é para você se:

${list(s.fit.no.map((n) => `${n.text} ${link(n.label, n.href)}.`))}

### O que está incluso: ${s.includes.title}

${s.includes.intro}

${includes}

### Valores: ${p.title}

${pricing}

### Não está incluso

${list(s.notIncluded)}

### Como funciona

${steps(s.process)}

### Ajustes depois da entrega

${changes.lead}

${list(changes.points)}

### Perguntas frequentes

${faq(s.faq, '####')}`
}

function audienceFull(a: Audience) {
  const packages = a.packages.items
    .map(
      (p) =>
        `### ${p.title ?? services[p.service].name}: ${priceLine(p.price)}\n\n${p.why}${p.price.note ? ` ${p.price.note}.` : ''} Detalhes em ${absoluteUrl(serviceHref(p.service))}.\n\n${list(p.bullets)}`,
    )
    .join('\n\n')

  return `## ${a.card.kicker}: ${a.card.title}

Página: ${absoluteUrl(audienceHref(a.slug))}

${a.hero.lede} ${a.card.text}

### ${a.contrast.title}

${a.contrast.lede}

Sem projeto:

${list(a.contrast.without)}

Com projeto:

${list(a.contrast.with)}

### ${a.packages.title}

${a.packages.lede}

${packages}

### Perguntas frequentes

${faq(a.faq, '####')}`
}

function aboutFull() {
  return `## Sobre a Beatriz Torres

Página: ${absoluteUrl('/sobre')}

${aboutSummary}

### Por que apartamentos pequenos (nas palavras dela)

${aboutStory.join('\n\n')}

### Como ela trabalha

${list(principles.map((p) => `**${p.title}.** ${p.text}`))}`
}

/** /llms-full.txt: the whole site (and every blog article) as Markdown, in one file. */
export async function llmsFullTxt() {
  const articles = await getAllArticles()
  const markdown = (await Promise.all(articles.map((a) => getArticleMarkdown(a.slug)))).filter(Boolean)

  return [
    header(),
    `## Como funciona\n\n${steps(generalProcess)}`,
    ...serviceOrder.map((slug) => serviceFull(services[slug])),
    ...audienceOrder.map((slug) => audienceFull(audiences[slug])),
    aboutFull(),
    `## Perguntas frequentes gerais\n\n${faq(generalFaq)}`,
    `## Contato\n\nWhatsApp ${WHATSAPP_DISPLAY} (https://wa.me/${WHATSAPP_NUMBER}) · e-mail ${EMAIL} · ${absoluteUrl('/contato')}`,
    ...(markdown.length ? [`# Artigos do blog\n\n${markdown.join('\n\n---\n\n')}`] : []),
  ]
    .join('\n\n')
    .concat('\n')
}
