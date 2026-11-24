import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og'
import { portraitPhoto, sitePhoto } from '@/lib/og-photos'

// Share image of /contato: an invitation to talk, between two photos of Beatriz.
export const alt = 'Fale com a Beatriz Torres pelo WhatsApp ou por e-mail'
export const runtime = 'edge'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  const [portrait, site] = await Promise.all([portraitPhoto(), sitePhoto()])
  return renderOgCard({
    label: 'Projeto de interiores · WhatsApp ou e-mail',
    title: 'Vamos projetar o seu',
    accent: 'apartamento',
    photo: [
      { data: site, position: '80% 30%' },
      { data: portrait, position: '50% 20%' },
    ],
  })
}
