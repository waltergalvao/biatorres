import { LLMS_HEADERS, llmsTxt } from '@/lib/llms'

// /llms.txt: a Markdown map of the site for AI assistants and agents. Built from the data files.
export const dynamic = 'force-static'

export async function GET() {
  return new Response(await llmsTxt(), { headers: LLMS_HEADERS })
}
