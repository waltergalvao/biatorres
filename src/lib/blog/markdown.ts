// Plain-Markdown version of each article, for AI assistants and agents
// (/blog/<slug>.md, Accept: text/markdown, /llms-full.txt). The blog
// workstream fills in the implementation; the signature is the contract.

/**
 * The article as clean Markdown: YAML front matter, the body without MDX
 * import/export lines (components turned into plain Markdown), and an
 * attribution footer with the canonical URL. Undefined for an unknown slug.
 */
export async function getArticleMarkdown(slug: string): Promise<string | undefined> {
  void slug
  return undefined
}
