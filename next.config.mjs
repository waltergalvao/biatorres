/** @type {import('next').NextConfig} */
const nextConfig = {
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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
