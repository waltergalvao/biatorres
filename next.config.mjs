/** @type {import('next').NextConfig} */
const nextConfig = {
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
