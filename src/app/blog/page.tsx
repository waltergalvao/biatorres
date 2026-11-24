import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/blog/articles'
import { getCategories } from '@/lib/blog/categories'
import { blogPageMetadata } from '@/lib/blog/metadata'
import { blogSchema, breadcrumbSchema, collectionSchema, graph } from '@/lib/blog/schema'
import { BLOG_DESCRIPTION, BLOG_PATH, BLOG_TITLE, titleWithBrand } from '@/lib/blog/site'
import { JsonLd } from '@/components/JsonLd'
import { BlogListing } from '@/components/blog/BlogListing'

export async function generateMetadata(): Promise<Metadata> {
  const [latest] = await getAllArticles()
  return blogPageMetadata({
    title: titleWithBrand('Blog sobre apartamentos pequenos'),
    description: BLOG_DESCRIPTION,
    path: BLOG_PATH,
    cover: latest,
  })
}

export default async function BlogPage() {
  const [articles, categories] = await Promise.all([getAllArticles(), getCategories()])

  const structuredData = graph(
    blogSchema(),
    collectionSchema(articles, { name: BLOG_TITLE, description: BLOG_DESCRIPTION, path: BLOG_PATH }),
    breadcrumbSchema([
      { name: 'Início', path: '/' },
      { name: 'Blog', path: BLOG_PATH },
    ]),
  )

  return (
    <>
      <JsonLd data={structuredData} />
      <BlogListing
        eyebrow="Blog"
        title="Respostas para quem vai morar bem em poucos metros"
        lede="Layout, móveis, marcenaria e o que decidir antes de comprar ou reformar. Escrito pela Beatriz Torres, arquiteta de interiores de apartamentos pequenos."
        breadcrumb={[{ name: 'Início', path: '/' }, { name: 'Blog' }]}
        articles={articles}
        categories={categories}
      />
    </>
  )
}
