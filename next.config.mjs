import createMDX from '@next/mdx'
import { rehypePlugins, remarkPlugins } from './src/lib/blog/mdx/plugins.mjs'

// Blog posts are MDX pages (src/app/blog/(posts)/<slug>/page.mdx).
const withMDX = createMDX({
  options: { remarkPlugins, rehypePlugins },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
  // Link headers (RFC 8288) let an AI agent find the sitemap and llms.txt from any page's
  // response without reading the HTML. Blog articles are left out: their Link header (Markdown
  // version) is set by the blog, and a rule here would replace it. Plus cheap security headers.
  async headers() {
    const siteLinks = {
      key: 'Link',
      value: '</sitemap.xml>; rel="sitemap", </llms.txt>; rel="describedby"; type="text/plain"',
    }
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ]
    return [
      { source: '/:path*', headers: security },
      { source: '/', headers: [siteLinks] },
      // Pages only: no files with an extension, no images or Next.js assets, no blog articles.
      { source: '/:path((?!_next/|images/|md/|blog/[^/]+$)(?!.*\\.[a-z0-9]+$)(?!.*(?:opengraph-image|apple-icon)).+)', headers: [siteLinks] },
    ]
  },
  // Projetos was merged into Sobre while the portfolio is small.
  async redirects() {
    return [{ source: '/projetos', destination: '/sobre', permanent: false }]
  },
  async rewrites() {
    return [
      // Markdown version of each blog article (for AI assistants and agents): /blog/<slug>.md
      { source: '/blog/:slug([a-z0-9-]+)\\.md', destination: '/md/blog/:slug' },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default withMDX(nextConfig)
