import { getAllArticles } from '@/lib/blog/articles'
import { getCategories } from '@/lib/blog/categories'
import { blogPageMetadata } from '@/lib/blog/metadata'
import { BLOG_HEADLINE, blogOgImage } from '@/lib/blog/og'
import { listingGraph } from '@/lib/blog/schema'
import { BLOG_DESCRIPTION, BLOG_PATH, BLOG_TITLE } from '@/lib/blog/site'
import { JsonLd } from '@/components/JsonLd'
import { BlogListing } from '@/components/blog/BlogListing'

export async function generateMetadata() {
  const [latest] = await getAllArticles()
  return blogPageMetadata({
    title: 'Blog sobre apartamentos pequenos',
    description: BLOG_DESCRIPTION,
    path: BLOG_PATH,
    images: blogOgImage(latest),
  })
}

export default async function BlogPage() {
  const [articles, categories] = await Promise.all([getAllArticles(), getCategories()])

  return (
    <>
      <JsonLd
        data={listingGraph(articles, {
          name: BLOG_TITLE,
          description: BLOG_DESCRIPTION,
          path: BLOG_PATH,
          crumbs: [{ name: 'Blog', path: BLOG_PATH }],
        })}
      />
      <BlogListing
        eyebrow="Blog"
        title={`${BLOG_HEADLINE.title} ${BLOG_HEADLINE.accent}`}
        lede="Layout, móveis, marcenaria e o que decidir antes de comprar ou reformar. Escrito pela Beatriz Torres, arquiteta de interiores de apartamentos pequenos."
        breadcrumb={[{ name: 'Início', path: '/' }, { name: 'Blog' }]}
        articles={articles}
        categories={categories}
      />
    </>
  )
}
