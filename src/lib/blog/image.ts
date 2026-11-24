// Pixel size of a cover image in /public, read from the file header at build time, so OG tags
// and JSON-LD can state width and height without anyone typing them into the post.

import { readFile } from 'node:fs/promises'
import path from 'node:path'

export type ImageSize = { width: number; height: number }

function jpegSize(b: Buffer): ImageSize | undefined {
  let i = 2
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) {
      i++
      continue
    }
    const marker = b[i + 1]
    // SOF0..SOF15, except DHT (C4), JPG (C8) and DAC (CC).
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) }
    }
    i += 2 + b.readUInt16BE(i + 2)
  }
  return undefined
}

function pngSize(b: Buffer): ImageSize | undefined {
  if (b.toString('ascii', 1, 4) !== 'PNG') return undefined
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
}

export async function getImageSize(publicPath: string): Promise<ImageSize | undefined> {
  try {
    const b = await readFile(path.join(process.cwd(), 'public', publicPath))
    return /\.png$/i.test(publicPath) ? pngSize(b) : /\.jpe?g$/i.test(publicPath) ? jpegSize(b) : undefined
  } catch {
    return undefined
  }
}
