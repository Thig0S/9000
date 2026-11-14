# Design

## Context

Ver `proposal.md` para a motivação e `specs/landing-page/about/spec.md` para os requisitos. O estado
relevante para o desenho:

- Shell atual: `app.html` = skip link → `<app-navbar>` → `<main id="conteudo">` → `<app-hero>`. O
  `<main>` não tem largura máxima; o hero é quem centraliza o conteúdo com `mx-auto max-w-[1600px]
  px-5`.
- `src/styles.css` já define os tokens (`base`, `ink`, `accent`, `brick`, `line`, `frame`), o
  granulado fixo, o foco visível, `overflow-x: clip` e `:where(#inicio, #quem-e-o-9,
  #historia-do-9) { scroll-margin-top: calc(var(--nav-h) + 1rem) }`. Não é preciso mexer no CSS
  global.
- O navbar já monta `links` com `quem-e-o-9` e `observeActiveSections()` resolve os ids existentes
  via `getElementById`, ignorando alvos ausentes. Criar a seção é o suficiente para o scroll-spy e o
  destaque do link passarem a funcionar; nenhum código da navbar precisa mudar.
- O `BrushUnderline` (`variant: 'red' | 'yellow'`) é um SVG com `preserveAspectRatio="none"` e
  `viewBox="0 0 240 12"`; o hero o dimensiona pelo host (`width: min(72%, 27rem)`). O mesmo padrão
  serve para o sublinhado centralizado do About.
- Assets: `public/imgs/imagemParaQuemÉo9.png` = **720×658** (1.09:1, 872 kB), com o `9.000`
  impresso no topo absoluto e a fileira de rostos grandes na base. `public/referencias/
  quemÉo9Referencia.png` é só o mockup (442×425) da seção inteira, não um banner em alta resolução.
- A change `add-navbar-hero` ainda não foi arquivada e `openspec/specs/` está vazio. Antes do apply,
  arquivá-la e alinhar os rótulos da navbar ao spec (`Quem é o 9`, `História do 9`).

## Goals / Non-Goals

**Goals:**

- Entregar `#quem-e-o-9` como uma fatia vertical completa: banner, título, biografia, integração com
  as âncoras e testes, sem tocar no CSS global nem abrir novas dependências.
- Resolver o enquadramento do banner de forma explícita e reproduzível, apesar da proporção do
  recorte disponível.
- Manter a página com um único `h1` e a seção como destino real do CTA do hero e do link da navbar.

**Non-Goals:**

- History, Footer, versão panorâmica do banner, conversão de imagens, ajustes de navbar além da
  verificação do scroll-spy e qualquer refatoração de `visual-identity`.

## Decisions

### 1. Componente standalone `About`, seção sem padding e miolo centralizado

`components/about/` com `About` standalone, `ChangeDetectionStrategy.OnPush`, `styleUrl` único,
seletor `app-about`. A `<section id="quem-e-o-9" aria-labelledby="about-title">` não recebe
`max-width` nem padding horizontal; o banner fica full-bleed direto nela e o bloco textual usa um
`div` interno (`mx-auto max-w-[62ch] px-5 py-20 text-center`).

- **Por que:** o banner precisa encostar nas bordas enquanto o texto não; separar os dois containers
  evita `breakout` por margem negativa e mantém o componente independente do `max-w` do hero.
- **Alternativas:** colocar a seção dentro do container do hero (o banner deixaria de ser full-bleed);
  aplicar `w-screen` no banner (gera overflow quando há barra de rolagem e depende de `100vw`).

### 2. Banner com altura por `clamp()` e âncora no rodapé da imagem

`<figure>` com `<img>` `w-full`, `h-[clamp(240px,40vw,520px)]`, `object-cover`,
`object-position: 50% 100%` (rodapé), `loading="lazy"`, `decoding="async"`, `width="720"`
`height="658"` e `alt` descritivo.

- **Por que:** `cover` + âncora inferior preserva a fileira da frente (o foco narrativo da seção) em
  qualquer largura e evita altura desproporcional no mobile. Os valores dão ~240 px em 375, ~307 px
  em 768, ~410 px em 1024 e 520 px em 1440 — uma faixa panorâmica consistente.
- **Custo aceito:** em desktop a imagem é ampliada ~2× (720 → 1440) e o `9.000` do topo sai do
  quadro. Ver decisão 3 e riscos.
- **Alternativas:** `aspect-[19/10]` puro (a 1440 px geraria 758 px de altura e ainda assim cortaria);
  `object-position: top` (mantém o `9.000`, perde os rostos da frente); `contain` (cria faixas
  vazias e quebra o full-bleed).

### 3. Não recriar o `9.000` por cima do banner

O número perdido no recorte **não** será refeito com texto/CSS nem duplicado por cima da imagem.

- **Por que:** o `9.000` da referência é um número 3D com brilho, incompatível com a fonte display do
  site; uma recriação chamaria mais atenção do que a ausência e criaria um segundo número caso uma
  imagem panorâmica correta chegue depois. O spec permite explicitamente a ausência (`MAY`).
- **Alternativas:** sobrepor `9.000` em Permanent Marker (destoa da referência e inventa um elemento
  visual); recortar o canto superior da própria imagem e colá-lo como camada (emenda visível e
  duplicação parcial da cena).

### 4. Título e sublinhado com o componente existente

`h2#about-title` em `font-display`, `text-[clamp(2rem,4.5vw,4rem)]`, `text-ink`, `text-center`,
`uppercase`; `app-brush-underline` logo abaixo, dentro do mesmo bloco centralizado, com host
`width: min(100%, 20rem); height: clamp(6px, .7vw, 10px)`, centralizado por `flex items-center
flex-col`.

- **Por que:** reutiliza o desenho de pincel já validado no hero/navbar, mantém o sublinhado "mais
  largo que o texto" e não cria um terceiro componente de ornamento.
- **Alternativas:** borda CSS (retângulo reto, contrario à referência); novo SVG específico
  (duplicação sem ganho).

### 5. Copy oficial estática no template

Os dois parágrafos do `docs/implementação.md` §8 ficam no `about.html` dentro de um `div` com
`max-w-[62ch]`, `space-y-6`, `text-pretty`, `text-lg`/`text-xl` (20–24 px) e `leading-[1.7]`.

- **Por que:** é copy institucional sem lógica; interpolar de TS adicionaria um passo sem benefício.
  O CSS global continua sendo a única fonte de tipografia.
- **Alternativas:** extrair para `about.ts`/JSON (overhead de manutenção para dois parágrafos).

### 6. Integração pelo shell, sem alterar navbar

Adicionar `About` aos `imports` de `app.ts` e `<app-about />` após `<app-hero />` dentro de
`<main>`. O scroll-spy encontra o novo id no `ngOnInit` da navbar (o DOM dos filhos já existe) e
passa a destacar `Quem é o 9`; o CTA do hero passa a navegar para a seção com o `scroll-margin-top`
já declarado.

- **Por que:** menor superfície de mudança; a infraestrutura de âncoras e de link ativo foi
  construída para isso na change anterior.
- **Mitigação:** confirmar em navegador que, após rolar até a seção, o link fica ativo. Se o observer
  não pegar o id (diferença de timing), mover o registro para `afterNextRender` na navbar — ajuste
  pontual, sem mudança de contrato.

### 7. Testes de DOM, não de layout

`about.spec.ts` verifica `#quem-e-o-9`, `aria-labelledby`, `h2`, texto exato dos dois parágrafos,
`src`/`alt`/`loading`/`width`/`height` da imagem e a ausência de um segundo `h1`. `app.spec.ts` passa a
esperar `app-about` além de `app-navbar`/`app-hero`. Comportamentos visuais (enquadramento, largura de
linha, link ativo, overflow) ficam para a verificação manual e o build.

- **Por que:** jsdom não calcula layout; testes de estilo/corte seriam falsos positivos. O que dá para
  travar de forma confiável é a estrutura e a copy.

## Risks / Trade-offs

- **Ampliação de ~2× em desktop** → imagem pode parecer suave; mitigar pedindo o banner panorâmico
  original e trocando apenas o arquivo, sem tocar no código.
- **`9.000` fora do quadro** → decisão 3; mitigar com a versão panorâmica futura; o número continua
  presente no hero e no título da seção.
- **872 kB de PNG abaixo da dobra** → `loading="lazy"` + dimensões reservadas; conversão para WebP
  fica como pendência (o ambiente não tem ferramenta de imagem).
- **Corte vertical agressivo no mobile** → `clamp` mínimo de 240 px e âncora inferior; validar em
  375 px que os rostos da frente não são decepados.
- **Scroll-spy pode não registrar o id se o timing do `ngOnInit` mudar** → verificar em navegador;
  fallback `afterNextRender` descrito na decisão 6.
- **Budget de 4 kB/8 kB por estilo de componente** → CSS do About quase vazio; utilities no template.
- **Copy oficial afirma fatos biográficos** → a fonte é `docs/implementação.md` §8, transcrição das
  referências, que tem prioridade sobre o README; qualquer revisão de texto é troca de conteúdo, não
  de código.
- **`<main>` sem padding pode gerar overflow em telas estreitas se algum elemento tiver largura
  fixa** → usar apenas `w-full`/`clamp` no banner; `overflow-x: clip` já está no global.

## Migration Plan

Sem dados, rotas ou persistência: a mudança é uma seção estática inserida no shell. Aplicar na ordem
componente → shell → testes → build. Rollback é remover `src/app/components/about/`, reverter
`app.ts`/`app.html` e o `app.spec.ts`; nenhuma migração de asset é necessária.

## Open Questions

- Existe uma versão panorâmica (~1.9:1) do banner? Se existir, ela substitui o arquivo atual e o
  `9.000` volta ao quadro sem alterar o código; até lá, vale a decisão 2.
- O footer entra na página mesmo sem aparecer nas referências? Fica para a change de History/Footer.
