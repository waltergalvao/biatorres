import createMDX from '@next/mdx'
import { rehypePlugins, remarkPlugins } from './src/lib/blog/mdx/plugins.mjs'

// Blog posts are MDX pages (src/app/blog/(posts)/<slug>/page.mdx).
const withMDX = createMDX({
  options: { remarkPlugins, rehypePlugins },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
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
