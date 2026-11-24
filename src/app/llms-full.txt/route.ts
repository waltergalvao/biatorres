import { LLMS_HEADERS, llmsFullTxt } from '@/lib/llms'

// /llms-full.txt: every page and blog article as Markdown, in one file. Built from the data files.
export const dynamic = 'force-static'

export async function GET() {
  return new Response(await llmsFullTxt(), { headers: LLMS_HEADERS })
}
