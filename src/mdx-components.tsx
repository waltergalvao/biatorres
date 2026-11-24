import type { MDXComponents } from 'mdx/types'
import { blogMdxComponents } from '@/components/blog/mdx'

// Required by @next/mdx in the app router. The styles live in src/components/blog/mdx.tsx,
// where Tailwind scans for classes.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, ...blogMdxComponents }
}
