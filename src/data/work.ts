// Beatriz's own projects, shown on /sobre under "Trabalhos". Only real work goes here.
//
// Images: put the files in /public/trabalhos/<project>/ and reference them as
// src: '/trabalhos/studio-pinheiros/01.jpg'. An image without `src` renders as a labelled
// placeholder box, so the layout can be reviewed before the photos arrive.
// `kind` says honestly what each image is: a photo of the finished space, a 3D render, etc.

import type { ServiceSlug } from './services'

export type WorkImage = {
  src?: string
  alt: string
  kind: 'Projeto entregue' | 'Imagem 3D' | 'Moodboard' | 'Planta'
}

export type WorkItem = {
  title: string
  /** e.g. "Studio · 28 m² · Pinheiros, São Paulo" */
  facts: string
  service: ServiceSlug
  problem: string
  solution: string
  quote?: { text: string; name: string }
  /** First image is the large one. Two to four images work best. */
  images: WorkImage[]
  /** True while the text and photos are still placeholders. */
  placeholder?: boolean
}

// TODO(owner): replace the three placeholders with Beatriz's real projects: title, facts,
// service, problem, solution, an optional client quote and 3 to 4 photos each.
export const work: WorkItem[] = [
  {
    title: '[Nome do projeto 1]',
    facts: '[Tipo] · [00] m² · [Bairro, cidade]',
    service: 'apartamento-completo',
    problem: '[O que o cliente precisava resolver, em uma frase.]',
    solution: '[O que o projeto fez: layout, marcenaria, materiais. Uma ou duas frases.]',
    quote: { text: '[Frase do cliente sobre o resultado, se houver.]', name: '[Nome do cliente]' },
    images: [
      { alt: 'Foto principal do projeto 1', kind: 'Projeto entregue' },
      { alt: 'Segunda foto do projeto 1', kind: 'Projeto entregue' },
      { alt: 'Terceira foto do projeto 1', kind: 'Imagem 3D' },
    ],
    placeholder: true,
  },
  {
    title: '[Nome do projeto 2]',
    facts: '[Tipo] · [00] m² · [Bairro, cidade]',
    service: 'projeto-por-ambiente',
    problem: '[O que o cliente precisava resolver, em uma frase.]',
    solution: '[O que o projeto fez: layout, marcenaria, materiais. Uma ou duas frases.]',
    images: [
      { alt: 'Foto principal do projeto 2', kind: 'Projeto entregue' },
      { alt: 'Segunda foto do projeto 2', kind: 'Imagem 3D' },
      { alt: 'Terceira foto do projeto 2', kind: 'Planta' },
    ],
    placeholder: true,
  },
  {
    title: '[Nome do projeto 3]',
    facts: '[Tipo] · [00] m² · [Bairro, cidade]',
    service: 'consultoria',
    problem: '[O que o cliente precisava resolver, em uma frase.]',
    solution: '[O que o projeto fez: layout, marcenaria, materiais. Uma ou duas frases.]',
    images: [
      { alt: 'Foto principal do projeto 3', kind: 'Projeto entregue' },
      { alt: 'Segunda foto do projeto 3', kind: 'Moodboard' },
      { alt: 'Terceira foto do projeto 3', kind: 'Projeto entregue' },
    ],
    placeholder: true,
  },
]
