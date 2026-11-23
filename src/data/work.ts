// Beatriz's own work, shown on /sobre under "Trabalhos". Only real work goes here: delivered
// projects, or 3D renders and moodboards labelled as such. While the list is empty, the
// section is hidden and /sobre shows sample deliverables instead.
//
// Images can be Unsplash IDs (like the rest of the site) or files in /public, e.g.
// image: '/trabalhos/studio-pinheiros-3d.jpg'. Use the `kind` label to say what each one is.

export type WorkItem = {
  title: string
  /** What the image shows, e.g. "Projeto entregue", "Imagem 3D", "Moodboard". */
  kind: string
  /** Short facts, e.g. "Studio · 28 m² · São Paulo". */
  facts: string
  text: string
  image: string
  imageAlt: string
}

// TODO(owner): add real projects here. Example:
// {
//   title: 'Studio para temporada',
//   kind: 'Imagem 3D',
//   facts: 'Studio · 28 m² · São Paulo',
//   text: 'Marcenaria sob medida para cama, armário e home office no mesmo ambiente.',
//   image: '/trabalhos/studio-28m2-3d.jpg',
//   imageAlt: 'Imagem 3D de studio com cama, armário de marcenaria e mesa de trabalho',
// },
export const work: WorkItem[] = []
