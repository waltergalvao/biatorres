import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllArticles } from '@/lib/blog/articles'
import { categoryPath, getCategories, getCategory } from '@/lib/blog/categories'
import { blogPageMetadata } from '@/lib/blog/metadata'
import { categoryOgImage } from '@/lib/blog/og'
import { listingGraph } from '@/lib/blog/schema'
import { BLOG_PATH } from '@/lib/blog/site'
import { JsonLd } from '@/components/JsonLd'
import { BlogListing } from '@/components/blog/BlogListing'

type Props = { params: { categoria: string } }

// Only categories with at least one article have a page; anything else is a 404.
export const dynamicParams = false

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ categoria: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory(params.categoria)
  if (!category) return {}
  return blogPageMetadata({
    title: `${category.label}: artigos do blog`,
    description: category.description,
    path: categoryPath(category.slug),
    images: categoryOgImage(category, (await getAllArticles()).find((a) => a.category === category.slug)),
  })
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategory(params.categoria)
  if (!category) notFound()

  const [all, categories] = await Promise.all([getAllArticles(), getCategories()])
  const articles = all.filter((a) => a.category === category.slug)
  if (articles.length === 0) notFound()
  const path = categoryPath(category.slug)

  return (
    <>
      <JsonLd
        data={listingGraph(articles, {
          name: category.label,
          description: category.description,
          path,
          crumbs: [
            { name: 'Blog', path: BLOG_PATH },
            { name: category.label, path },
          ],
        })}
      />
      <BlogListing
        eyebrow="Blog"
        title={category.label}
        lede={category.description}
        breadcrumb={[{ name: 'Início', path: '/' }, { name: 'Blog', path: BLOG_PATH }, { name: category.label }]}
        articles={articles}
        categories={categories}
        activeCategory={category.slug}
      />
    </>
  )
}
