# beatriztorres.com.br

## Design tokens

Brand colors and fonts live in one file: [`src/design/tokens.ts`](src/design/tokens.ts). Open `/marca` on the site to see them all (the page is not indexed).

**Change a color:** edit its `hex` in `tokens.ts`. Tailwind writes every color as a CSS variable on `:root` (`--color-clay: 160 69 36`), and every class (`bg-clay`, `text-ink/70`, `border-line`…) reads that variable, so the whole site follows. Re-check the contrast notes at the top of the file when you do.

**Use the brand outside the site** (social media images, Canva, Figma, e-mail):

```ts
import { hex, colors, fonts } from '@/design/tokens'

hex.clay           // '#A04524'
colors.clay.role   // 'Ação principal e destaques (terracota)'
fonts.display.family // 'Fraunces'
```

`next/og` / Satori can't read CSS variables, so images generated in code should use `hex`.

**Re-theme a part of the page** without touching the tokens, by overriding the variables:

```css
[data-theme='campanha'] {
  --color-clay: 30 90 140; /* R G B, no commas */
}
```

**Add a color:** add it to `colors` in `tokens.ts` and map it in `tailwind.config.ts` (`newName: color('newName')`). Never write a hex value in a component.
