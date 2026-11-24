import { OG_CONTENT_TYPE, OG_SIZE, portraitPhoto, renderOgCard, sitePhoto } from '@/lib/og'

// Share image of /sobre: the page's headline between two photos of Beatriz.
export const alt = 'Beatriz Torres, arquiteta de interiores de apartamentos pequenos'
export const runtime = 'edge'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  const [portrait, site] = await Promise.all([portraitPhoto(), sitePhoto()])
  return renderOgCard({
    label: 'Arquiteta de interiores',
    title: 'Sou a Beatriz. Projeto apartamentos',
    accent: 'pequenos',
    photo: [
      { data: portrait, position: '50% 20%' },
      { data: site, position: '80% 30%' },
    ],
  })
}
