import type { MetadataRoute } from 'next'
import { serviceHref, serviceOrder } from '@/data/services'
import { audienceHref, audienceOrder } from '@/data/audiences'
import { SITE_URL as BASE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', ...serviceOrder.map(serviceHref), ...audienceOrder.map(audienceHref), '/sobre', '/contato']
  return paths.map((path) => ({
    url: `${BASE}${path === '/' ? '' : path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/servicos') || path.startsWith('/para') ? 0.8 : 0.5,
  }))
}
