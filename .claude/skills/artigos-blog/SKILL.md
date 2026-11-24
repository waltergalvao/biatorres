---
name: artigos-blog
description: Use sempre que for escrever, revisar ou adaptar um artigo para o blog da Beatriz Torres Arquitetura (beatriztorres.com.br/blog). Define o público (quem mora ou investe em apartamento pequeno, não arquitetos), a voz da Beatriz, a estrutura do artigo com as regras de SEO e de citação por IAs, o formato MDX do repositório e as regras para o texto não parecer escrito por IA.
---

# Artigos do blog da Beatriz Torres Arquitetura

## Quem somos

A Beatriz Torres é arquiteta de interiores e só projeta apartamentos pequenos: studios, primeiro imóvel e apartamentos de até 60 m². Atende online, para clientes de qualquer cidade, com três serviços (os detalhes estão em `src/data/services.ts`):

- **Consultoria de interiores** (`/servicos/consultoria`): um ambiente resolvido online, sem obra. Briefing por vídeo, análise do ambiente, layout, moodboard de cores e materiais e lista de compras com links, tudo num PDF.
- **Projeto por ambiente** (`/servicos/projeto-por-ambiente`): um cômodo que vai ser reformado, com imagens 3D, detalhamento de marcenaria e bancadas e o caderno técnico para a obra.
- **Apartamento completo** (`/servicos/apartamento-completo`): o apartamento inteiro com um conceito só, 3D de todos os ambientes, projeto técnico, memorial descritivo e caderno para a obra.

O artigo existe para três coisas, nesta ordem:

1. Ajudar de verdade quem está lendo, com informação que dá para usar hoje.
2. Mostrar que a Beatriz entende de apartamento pequeno mais do que ninguém, porque é só isso que ela faz.
3. Fazer o leitor confiar o suficiente para chamar a Beatriz quando precisar.

Se o artigo não cumpre o item 1, os outros dois não acontecem.

## Para quem escrevemos

Nosso leitor é quem vai morar, mobiliar ou alugar um apartamento pequeno. Nunca outro arquiteto. Os três perfis estão em `src/data/audiences.ts`:

- **Primeiro apartamento** (`/para/primeiro-apartamento`): acabou de pegar as chaves, ou ainda está na planta, e tem medo de gastar errado. Orçamento contado, muita referência do Pinterest e pouca ideia de por onde começar.
- **Studios** (`/para/studios`): dorme, trabalha, cozinha e recebe no mesmo ambiente de 25 ou 30 m². Cada decisão aparece.
- **Investidores** (`/para/investidores`): comprou para alugar, por temporada ou contrato longo. Quer um imóvel que se destaque no anúncio e aguente a troca de inquilinos, muitas vezes em outra cidade.

O que isso significa na escrita:

- O leitor não conhece termo técnico de arquitetura e não tem obrigação de conhecer.
- Ele quer saber o que fazer e em que ordem. Está prestes a gastar dinheiro e não quer errar.
- Ele lê pelo celular, muitas vezes no meio da loja ou do apartamento vazio. Parágrafo comprido vira um paredão na tela.
- Ele desconfia de texto de revista de decoração ("tendências", "inspire-se") e de promessa fácil.

## Como falamos

### A voz da Beatriz

O artigo é escrito em primeira pessoa, pela Beatriz ("eu"), como no resto do site. Ela fala com o leitor de "você". O tom é o de uma arquiteta explicando com calma numa conversa de WhatsApp, só que com mais organização: direto, prático, sem pose.

- Frases curtas na maior parte do texto. Uma ideia por frase.
- Parágrafos de no máximo 3 ou 4 linhas no celular (mais ou menos 40 a 60 palavras).
- Palavras do dia a dia. "Medir", e não "realizar o levantamento". "Começar", e não "iniciar".
- Se precisar de um termo técnico, explique na mesma frase ou na seguinte.
- Nomes de serviços sempre como no site: "consultoria de interiores", "projeto por ambiente", "apartamento completo".

### Tradução do vocabulário de arquitetura

| Termo técnico | Como explicar |
|---|---|
| Layout / planta de layout | O desenho que mostra onde fica cada móvel |
| Moodboard | Um painel que junta as cores, os tecidos e os materiais numa folha só |
| Caderno técnico | O manual da obra, com os desenhos e as medidas que o marceneiro e o pedreiro seguem |
| Elevação | O desenho de uma parede vista de frente, com as medidas |
| Memorial descritivo | A lista escrita de cada material e acabamento do projeto |
| Circulação | O espaço livre por onde você passa entre os móveis |
| Pé-direito | A altura do piso ao teto |
| Marcenaria sob medida | Armários e móveis feitos para as medidas exatas do seu espaço |
| Pontos elétricos | Onde ficam tomadas, interruptores e luzes |

### Autoridade sem arrogância

A autoridade vem de mostrar que a Beatriz conhece o problema por dentro, não de falar difícil:

- Detalhe que só quem projeta apartamento pequeno sabe: o sofá que não passa na porta, a tomada que vira extensão para sempre, a porta do armário que bate na cama.
- Explicar o porquê, não só o quê.
- Posicionamento claro, com base no que ela vê nos projetos: "em apartamento pequeno, eu sempre começo por...".

## Regras de conteúdo (obrigatório)

- **Nada de preço no artigo.** Os valores dos serviços mudam, e um artigo antigo com preço velho vira problema. Não escreva valores, faixas de preço, preço por m², número de parcelas ou prazos de entrega. Também não invente "quanto custa" um móvel ou uma obra. Quando o assunto encostar em preço, linke a página do serviço (ex.: "os valores estão na página da [consultoria de interiores](/servicos/consultoria)") e siga em frente.
- **Linke as páginas de serviço.** Todo artigo tem pelo menos um link interno para uma página de `/servicos/...` no ponto em que o serviço resolve o problema do texto, e, quando fizer sentido, para a página do público (`/para/...`). Use links relativos (`/servicos/consultoria`). Não repita a descrição do serviço inteira; uma frase e o link bastam.
- **Nada inventado.** Sem estatística, pesquisa, número de clientes, depoimento, citação ou caso real com nome. Para exemplificar, descreva uma situação típica ("quem compra o sofá antes de medir a sala..."). Fato sobre os serviços só se estiver em `src/data/services.ts` ou `src/data/support.ts`.
- **Sem promessa.** Nada de "seu apartamento vai parecer o dobro do tamanho" ou "sem erro garantido".
- **Sem autoelogio comparativo** ("a melhor arquiteta", "a única que...").

## Estrutura do artigo

Tamanho de referência: entre 900 e 1.500 palavras.

1. **Título.** Responde ao que o leitor digitaria no Google. Ex.: "Como planejar a decoração de um apartamento pequeno". Maiúscula só na primeira palavra e em nomes próprios. Até uns 65 caracteres. Evite "Tudo o que você precisa saber", "Guia definitivo", "Dicas incríveis".
2. **Abertura com uma cena.** Comece dentro de uma situação concreta que o leitor reconhece: o sofá que não passou na porta, as chaves na mão e o apartamento vazio. Em 2 ou 3 parágrafos ele precisa saber que o artigo é para ele. Não use "Imagine o seguinte cenário".
3. **O problema explicado.** Por que isso acontece em apartamento pequeno.
4. **O que fazer, em ordem.** Passo a passo prático: o que medir, o que decidir primeiro, o que comprar depois, erros que custam caro. Esta é a parte mais valiosa. Seja específico.
5. **Quando vale contratar uma arquiteta.** Honesto: o que dá para fazer sozinho e quando um serviço ajuda. Aqui entram os links para as páginas de serviço.
6. **Fechamento.** Uma ideia final e um convite sóbrio ("se quiser, me mande a metragem e o que você quer resolver"). Sem resumo repetindo tudo, sem subtítulo "Conclusão".
7. **Perguntas frequentes (obrigatório).** Sempre no final, com o subtítulo exato `## Perguntas frequentes`. Veja as regras abaixo.

Subtítulos (`##`) em forma de pergunta que o leitor faria: "Por onde começar a decorar um apartamento pequeno?", "Que tamanho de sofá cabe numa sala de 10 m²?".

## SEO e citação por IAs

O foco é aparecer no Google e ser citado pelas IAs (ChatGPT, Perplexity, Claude, respostas de IA do Google). As duas coisas pedem o mesmo: respostas claras, específicas e fáceis de recortar.

- **Resposta rápida no topo.** Logo depois do bloco de `export`, o componente `<RespostaRapida>` responde à pergunta do título em 2 a 4 frases, sem enrolação. É o trecho que buscadores e IAs mais recortam.
- **Primeiro parágrafo de cada seção responde direto.** Logo abaixo de cada subtítulo em forma de pergunta, a primeira ou a segunda frase já dá a resposta. O desenvolvimento vem depois.
- **Trechos que se sustentam sozinhos.** Uma IA pode recortar um parágrafo e mostrar fora do artigo. Evite começar parágrafos importantes com "isso", "essa prática", "como vimos acima". Diga do que está falando.
- **Detalhe concreto.** O que medir, em que ordem, o nome da peça, o erro típico. Mas sem número inventado.

### Perguntas frequentes

- Entre 4 e 6 perguntas.
- Cada pergunta em um subtítulo `###`, escrita como o leitor digitaria no Google ou perguntaria a uma IA.
- Resposta de 2 a 4 frases que começa respondendo (sim, não, depende de quê) e faz sentido lida sozinha.
- Não repita perguntas que já são subtítulos do artigo. A FAQ cobre dúvidas vizinhas: planta, móveis que já tem, studio, imóvel para alugar, como funciona online.
- Sem preço também aqui.

## O texto não pode parecer escrito por IA

### Proibido

**Pontuação e formatação**

- Travessão (—) e meia-risca (–) como pausa. Não usar em nenhuma hipótese. Troque por vírgula, ponto, dois-pontos ou parênteses.
- Emoji em qualquer lugar.
- Negrito em excesso: no máximo uma ou duas frases por seção.
- Listas em tudo. Lista só quando o conteúdo é uma lista de verdade (passos, o que medir).
- Toda lista no formato "**Palavra:** explicação". Varie.
- Título com maiúscula em todas as palavras.

**Estruturas manjadas**

- Pergunta retórica respondida na sequência ("O resultado? Um sofá que não cabe.").
- Contraste fabricado: "Não é X. É Y." / "Planejar não é luxo, é necessidade."
- "Não apenas X, mas também Y."
- Trios por ritmo ("leve, funcional e aconchegante").
- Frase de efeito no fim de cada parágrafo.

**Palavras e expressões de IA e de revista de decoração**

Não use: "vale ressaltar", "é importante destacar", "é fundamental", "nesse sentido", "diante disso", "em suma", "no cenário atual", "jornada", "mergulhar", "desvendar", "transformar seu lar", "o lar dos seus sonhos", "aconchegante" como muleta, "inspire-se", "tendência" como argumento, "um verdadeiro oásis", "neste artigo, vamos explorar", "espero que tenha ajudado".

**Conteúdo genérico**

- Frase que caberia em qualquer artigo de decoração. Se dá para tirar e nada se perde, tire.
- Afirmação vaga ("muitas pessoas erram na decoração"). Troque por algo concreto ("quem compra o sofá antes de medir a porta...").

### O que fazer no lugar

- Escrever como a Beatriz explicaria a um cliente, com detalhe específico: a peça, a medida que importa, o erro típico.
- Deixar algumas frases começarem com "E", "Mas", "Só que".
- Variar o ritmo e o tamanho dos parágrafos.

## Formato técnico no repositório

Cada artigo é uma página MDX em:

```
src/app/blog/(posts)/<slug>/page.mdx
```

- `<slug>`: minúsculas, sem acento, palavras separadas por hífen, com a palavra-chave principal. Ex.: `como-planejar-decoracao-apartamento-pequeno`. O nome da pasta é a URL: `/blog/<slug>`.
- `category`: uma das categorias de `src/lib/blog/categories.ts` (`apartamento-pequeno`, `studios`, `imovel-para-alugar`, `reforma-e-obra`, `como-funciona`). Categoria nova se cria lá, com descrição de 140 a 160 caracteres. Uma categoria só ganha página quando tem pelo menos um artigo.
- `description`: 140 a 160 caracteres, pensada para quem vê o resultado no Google. Não é o primeiro parágrafo colado. O build avisa se ficar fora da faixa.
- `date`: `AAAA-MM-DD`, a data de publicação. Não muda depois de publicado.
- `updated` (opcional): `AAAA-MM-DD`. Preencha só quando o conteúdo for revisado de verdade (seção nova, informação corrigida). Aparece como "Atualizado em" na página e vai para o sitemap, o RSS e os dados estruturados. Não atualize a data sem mudar o conteúdo.
- `image`: capa em `public/images/blog/<slug>.jpg`, com uns 1600 px de largura, referenciada como `/images/blog/<slug>.jpg`. Guarde a imagem no repositório (não use URL externa). Use JPEG ou PNG: a imagem de compartilhamento (WhatsApp, LinkedIn, X) é gerada sozinha a partir do título, da categoria e da capa, em `/og/blog/<slug>`, e não lê WebP. O título fica num cartão no centro, então o que aparece da foto são as laterais. Não precisa criar nenhum arquivo para isso. Não reaproveite uma foto que já aparece em outra página do site.
- `imageAlt`: descrição real do que aparece na foto ("Sala clara com sofá azul de pés de madeira..."), não a repetição do título.
- `title` + `date` identificam o artigo internamente: dois artigos não podem ter os dois iguais.

Modelo do arquivo:

```mdx
import { ArticleLayout } from '@/components/blog/ArticleLayout'
import { articleMetadata } from '@/lib/blog/metadata'

export const article = {
  title: 'Título do artigo',
  description: 'Resumo de 140 a 160 caracteres para o Google.',
  date: 'AAAA-MM-DD',
  category: 'apartamento-pequeno',
  image: '/images/blog/<slug>.jpg',
  imageAlt: 'O que aparece na foto.',
}

export const generateMetadata = () => articleMetadata(article)

export default (props) => <ArticleLayout article={article} {...props} />

<RespostaRapida>
Duas a quatro frases que respondem direto à pergunta do título.
</RespostaRapida>

Texto do artigo, em Markdown, com subtítulos em ##.

## Perguntas frequentes

### Pergunta como o leitor digitaria?

Resposta de 2 a 4 frases.
```

O que o site faz sozinho a partir do MDX (não precisa escrever nada a mais):

- Página com trilha de navegação, "Publicado em / Atualizado em", tempo de leitura, capa, sumário "Neste artigo" (a partir dos `##`), quadro "Quem escreve" com link para /sobre, "Leia também" e os botões de WhatsApp.
- Dados estruturados (JSON-LD): `BlogPosting`, `BreadcrumbList` e `FAQPage`. A FAQPage é montada a partir da seção `## Perguntas frequentes`, com cada `###` virando uma pergunta. Por isso o subtítulo precisa ser exatamente "Perguntas frequentes".
- Versão em Markdown em `/blog/<slug>.md` (o `<RespostaRapida>` vira `> **Resposta rápida:** ...`), entrada no `/llms.txt`, no `/llms-full.txt`, no feed `/blog/rss.xml` e no sitemap.

Não coloque chamada de contato com link no fim do texto: a página já tem o quadro do WhatsApp e a chamada final.

## Passo a passo para escrever

1. **Entender o tema.** Qual problema do leitor o artigo resolve? Qual frase ele digitaria no Google? Essa frase é a palavra-chave e aparece no título, no slug, na description e no começo do texto, de forma natural.
2. **Montar a cena de abertura.**
3. **Escrever o rascunho** seguindo a estrutura acima, com a Resposta rápida no topo e a FAQ no fim.
4. **Colocar os links internos** para as páginas de serviço e de público que fazem sentido.
5. **Revisar contra esta skill.** Buscar "—", "–" e "R$" no texto e eliminar todos. Procurar as expressões proibidas. Ler em voz alta: se soa como a Beatriz falando, está bom; se soa como revista de decoração, reescreva.
6. **Rodar `npm run build`**: ele falha se faltar campo obrigatório ou a categoria não existir, e avisa se a description estiver fora da faixa.

## Checklist final

- [ ] Alguém sem formação em arquitetura entende tudo na primeira leitura?
- [ ] O leitor sai sabendo o que fazer, e em que ordem?
- [ ] Tem pelo menos três detalhes concretos que só quem projeta apartamento pequeno saberia?
- [ ] Nenhum preço, faixa de preço, parcela ou prazo no texto (nem na FAQ)?
- [ ] Pelo menos um link para uma página de `/servicos/...`?
- [ ] Nenhuma estatística, cliente, depoimento ou citação inventada?
- [ ] Nenhum travessão (—) ou meia-risca (–), nenhum emoji, nenhuma expressão da lista proibida?
- [ ] Título com maiúscula só na primeira palavra, até uns 65 caracteres, com a palavra-chave?
- [ ] Description com 140 a 160 caracteres?
- [ ] `<RespostaRapida>` no topo, respondendo à pergunta do título em 2 a 4 frases?
- [ ] Subtítulos em forma de pergunta, com a resposta na primeira ou segunda frase?
- [ ] `## Perguntas frequentes` com 4 a 6 perguntas em `###`, cada resposta fazendo sentido sozinha?
- [ ] Capa própria em `public/images/blog/` com `imageAlt` descrevendo a foto?
