# Landing Page 9000 — Documento de Implementação

> **Status:** plano consolidado em modo exploração. **Nada foi implementado.**
> **Projeto:** `nove-mil/` (Angular 22.2.6 + Tailwind CSS 4.3.5)
> **Referências visuais:** `nove-mil/public/referencias/` (3 mockups)
> **Data:** 13/11/2026

---

## 1. Sumário executivo

Landing page pessoal de **Victor Kovalski ("9000" / "Nove")**: SPA de página única, três seções
(`#inicio`, `#quem-e-o-9`, `#historia-do-9`), navegação por âncoras, sem backend.

O scaffold Angular está limpo e com Tailwind já configurado. Falta **tudo** da landing page.
As referências visuais agora existem e **têm prioridade sobre o README** onde houver divergência,
porque o README foi escrito antes delas.

Decisões estruturais que sustentam o plano:

| Tema | Decisão |
|---|---|
| Estilo | Tailwind v4 **CSS-first** (`@theme` para tokens + utilities no template) |
| Pré-processador | **Sem SCSS** — Tailwind v4 não é compatível com Sass |
| Router | **Removido** — âncoras nativas + `scroll-margin-top` |
| Fontes | Self-hosted (2 `.woff2`), preload só da display |
| Granulado | SVG `feTurbulence` em data-URI, `fixed`, `opacity: .08` (técnica da referência) |
| Link ativo | `IntersectionObserver` + signal, com helper puro testável |
| Conteúdo | Copy final transcrita das referências (seção 8) |
| Assets | `public/images/`, `public/fonts/`; mockups **fora** de `public/` |

---

## 2. Estado atual verificado

```
nove-mil/                        Angular 22.2.6 - zoneless (sem polyfills) - Vitest + jsdom
+-- angular.json                assets <- public/   styles: src/styles.css   budget 4kB/8kB por componente
|                               budgets globais: 500kB warning / 1MB error
+-- .postcssrc.json             @tailwindcss/postcss (tailwindcss 4.3.5 instalado)
+-- src/
    +-- index.html              lang="en", title "NoveMil"
    +-- styles.css              so 3 linhas: @import 'tailwindcss'
    +-- app/
        +-- app.ts              App + RouterOutlet (router com routes: [])
        +-- app.html            20,5 kB de boilerplate do Angular CLI
        +-- app.config.ts       provideRouter(routes)
        +-- app.routes.ts       routes: []
        +-- app.spec.ts         testa "Hello, nove-mil" (vai quebrar na Fase 2)
public/
    +-- favicon.ico
    +-- referencias/            3 mockups PNG (~4,5 MB) - ver secao 3
```

Confirmado por inspeção:

- `@angular/core` **22.2.6**, `tailwindcss` **4.3.5** instalados.
- Build usa `@angular/build:application`; **sem `polyfills`** → aplicação zoneless por padrão.
- Testes usam `@angular/build:unit-test` com Vitest e jsdom.
- O CSS global é processado pelo PostCSS configurado; o Tailwind é a única folha de estilo.
- `.gitignore` ignora `*.key`; `README.md` e `.gitignore` estão modificados e não commitados.

---

## 3. Referências visuais analisadas

### 3.1 Inventário

| Arquivo | Dimensões | O que define |
|---|---|---|
| `heroSectionReferencia.png` | 1774 x 887 | Navbar completa, Hero, separador tracejado |
| `quemÉo9Referencia.png` | 442 x 425 | Banner do About + título + 2 parágrafos |
| `Historiado9Referencia.png` | 1774 x 887 | Título da History, 2 parágrafos, foto emoldurada |

São **renders de tela**, não as fotos originais. A foto do hero, do banner e da history aparecem
**dentro** dos mockups (ver 3.10 e seção 17).

### 3.2 Anatomia do layout (mockup 1774 px de largura)

```
+--------------------------------------------------------------+
|  [9]                      Início  Quem é o 9  História do 9   |  ~90px de altura
|   amarelo                  ----                  ----         |  ativo = pincel amarelo
+==============================================================+  4px #d92e29
|                                                              |
|   +--------------------+     9000                             |
|   |                    |     ~~~~~~~~ (pincel vermelho)       |
|   |   foto 4:3         |     Victor Kovalski                   |
|   |   moldura creme    |     paragrafo mono 4 linhas            |
|   |                    |     [ Quem é o 9 -> ]                 |
|   +--------------------+                                      |
|   ~47%                          ~53%                          |
|                                                              |
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +  tracejado #5b5548

+--------------------------------------------------------------+
|  banner full-bleed (~1.9:1) com "9.000" no canto sup. direito |
+--------------------------------------------------------------+
|                 QUEM É O 9?                                   |
|                 ~~~~~~~~~~ (pincel vermelho)                  |
|         dois parágrafos centralizados, mono, ~62ch            |
+--------------------------------------------------------------+

+--------------------------------------------------------------+
|  HISTÓRIA DO NOVE                  +--------------------+    |
|  ~~~~~~~~~~~~~~~~ (pincel vermelho) |   foto ~1:1        |    |
|  paragrafo 1 (com negrito)         |   moldura creme    |    |
|  paragrafo 2 (com negrito)         +--------------------+    |
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
```

### 3.3 Navbar (medido no mockup)

| Item | Observado |
|---|---|
| Altura | ~112 px no render (≈ 90 px em CSS a 1440) |
| Logo `9` | ~82 px de altura, amarelo `#f5bb08`, inclinado, à esquerda |
| Links | creme `#f3ead8`, monoespaçado, ~30 px no render (≈ 24 px CSS) |
| Espaçamento | gaps generosos (~50 px entre links) |
| Ativo | **pincelada amarela** sob o link, ~6 px, irregular, levemente inclinada |
| Divisória | linha vermelha contínua, 4 px, 100% da largura |
| Posição | fixa/sticky, fundo igual ao da página (sem transparência) |

Detalhe: o logo não tem caixa, não tem fundo; é só o glifo amarelo inclinado, com leve
encorpamento (`text-shadow` em duas camadas aproxima o efeito "pintado" do mockup).

### 3.4 Hero

| Item | Observado |
|---|---|
| Grid | ~47% foto / ~53% texto |
| Foto | **4:3 paisagem**, moldura creme, ocupa quase toda a altura da seção |
| `9` de fundo | **já existe dentro da foto** (cinza, pintado na parede) |
| Título `9000` | brush creme, ~115 px CSS, leve inclinação |
| Sublinhado | pincel vermelho, ~10 px, **mais curto que o título**, ponta seca |
| `Victor Kovalski` | monoespaçado creme, ~40 px, sem caixa alta |
| Parágrafo | 4 linhas, mono, ~20 px, `line-height` ~1.7, largura ~580 px |
| Botão | amarelo, reto, ~223 x 50 px, texto escuro + `->` |
| Separador | tracejado creme/cinza, ~2 px, dash ~6 px |

> O README (§5.1) manda **adicionar** um `9` gigante atrás da foto. Na referência ele **já está
> na fotografia**. Como só temos o mockup, o `9` vem embutido no recorte — a etapa de CSS para o
> `9` de fundo fica **dispensada**, a menos que apareçam as fotos originais sem ele.

### 3.5 About

| Item | Observado |
|---|---|
| Banner | full-bleed, sem margem, sem borda, proporção ≈ **1.9:1** |
| Altura | no mockup ocupa ~55% do bloco; o README pede ~50vh |
| `9.000` | faz parte da imagem, no canto superior direito |
| Título | `QUEM É O 9?` centralizado, brush creme, ~65 px |
| Sublinhado | pincel vermelho, ~8 px, centralizado, mais largo que o texto |
| Texto | 2 parágrafos centralizados, mono, `line-height` ~1.7 |
| Largura | ~62 caracteres por linha (não usar os 900 px cheios) |
| Fundo | mesmo `#141311` texturizado, sem cards |

### 3.6 History

| Item | Observado |
|---|---|
| Grid | ~55% texto / ~45% foto, alinhamento vertical centralizado |
| Título | `HISTÓRIA DO NOVE`, caixa alta, ~73 px, à esquerda |
| Sublinhado | pincel vermelho, ~10 px, **mais largo que o título** (extrapola à direita) |
| Texto | 2 parágrafos à esquerda, ~20 px, `line-height` ~1.8, com `9000` e `Nove` em negrito |
| Foto | praticamente **quadrada (1:1)**, moldura creme de ~6 px |
| Separador | tracejado antes do fim da seção |

### 3.7 Tipografia

| Uso | Fonte observada | Fonte escolhida |
|---|---|---|
| Logo, 9000, títulos | brush/marker com textura seca | **Permanent Marker** |
| Navbar, parágrafos, botões, subtítulo | monoespaçada tipo máquina de escrever, desgastada | **Special Elite** |
| Fallback | — | `cursive` / `"Courier New", monospace` |

Observações relevantes:

- A textura "erodida" dos títulos do mockup é mais forte que o desenho nativo do Permanent Marker.
  Opção de polimento: aplicar máscara de ruído no texto display (`background-clip: text` + ruído),
  sempre atrás de `@supports`. **Não é obrigatório** e não deve comprometer legibilidade.
- **Special Elite só tem peso 400.** Negrito nele é sintético. Para `9000`/`Nove` na History:
  ou aceitar o faux bold, ou trocar a fonte por **Courier Prime** (tem 700). Recomendação:
  manter Special Elite e usar negrito só nesses dois termos (o faux bold fica convincente no tamanho do corpo).
- `Sedgwick Ave Display` é o plano B para a display, caso o Permanent Marker pareça "marker demais".

### 3.8 Cor

Paleta do README confirmada pelos mockups (nada a mudar):

| Token | Hex | Uso |
|---|---|---|
| `base` | `#141311` | fundo principal |
| `base-alt` | `#1b1917` | fundo alternativo |
| `ink` | `#f3ead8` | títulos e textos |
| `ink-dim` | `#c8beae` | textos secundários |
| `accent` | `#f5bb08` | logo, botão, link ativo |
| `brick` | `#d92e29` | linhas, sublinhados |
| `frame` | `#eee4cf` | molduras |
| `line` | `#514a40` | tracejados |

Contraste (AA/AAA): creme sobre `#141311` ≈ 13:1; areia ≈ 9:1; amarelo ≈ 9,5:1; texto escuro sobre
amarelo ≈ 9,4:1. Vermelho **apenas decorativo**, nunca texto corrido.

### 3.9 Texturas, molduras e pinceladas

- **Granulado:** ruído monocromático, muito sutil, estático, sobre toda a página, atrás do conteúdo.
  `position: fixed` + `pointer-events: none` + `opacity: .08`. Sem animação.
- **Moldura das fotos:** creme, ~4–6 px, **sem raio**, com uma **linha externa fina deslocada**
  (efeito passe-partout) — visível no hero e na history. Implementar como:
  `border: 4px solid frame` + `outline: 1px solid frame; outline-offset: 5px`.
- **Pinceladas:** duas espessuras — sublinhado de seção (vermelho, 8–10 px, irregular, ponta seca)
  e sublinhado de link ativo (amarelo, ~6 px, levemente inclinado).
- **Separadores:** tracejado de 2 px em `line`, nunca linha sólida fora da navbar.

### 3.10 O que as referências corrigem no README

| # | README diz | Referência mostra | Ação |
|---|---|---|---|
| 1 | Texto provisório, origem do apelido desconhecida | Copy final com a origem ("nove mil" em brincadeira de grupo) | Usar a copy da seção 8 |
| 2 | Hero 52% / 48% | ≈ 47% / 53% | Seguir a referência |
| 3 | Foto do hero retrato, "não cortar o rosto" | 4:3 paisagem | Usar `aspect-[4/3]` |
| 4 | Adicionar `9` gigante em CSS | `9` já faz parte da foto | Dispensar a camada CSS |
| 5 | Moldura 5 px simples | Moldura + linha externa deslocada | Adicionar o detalhe |
| 6 | History foto vertical equilibrada | Foto ~1:1 | Usar `aspect-square` |
| 7 | Banner 50vh | Banner ≈ 1.9:1 | `aspect-ratio` com `max-h-[50vh]` |
| 8 | About com textos "sugeridos" | Copy real (desenvolvedor, Sistemas de Informação) | Usar a copy real |

---

## 4. Avaliação do README — conflitos com o scaffold

O README é sólido em escopo, paleta e critérios de aceite. Os problemas são de aderência ao projeto:

| # | Problema | Evidência | Correção |
|---|---|---|---|
| 1 | **SCSS vs Tailwind** | README §1/§9 pedem SCSS; Tailwind 4.3.5 instalado e a doc oficial diz que v4 **não** é feito para preprocessadores | Tailwind CSS-first; abandonar SCSS |
| 2 | **`src/assets` não existe** | `angular.json` serve assets de `public/` | `public/images/`, URLs `/images/...` |
| 3 | **Fotos originais ausentes** | só existem mockups em `public/referencias` | Solicitar originais; fallback = recorte dos mockups |
| 4 | **Router sem rotas** | `routes: []` + `provideRouter` + `RouterOutlet` no bundle | Remover router |
| 5 | **"20px mono" + "sem overflow"** | 3 links a 20 px + logo não cabem em 375 px | Navbar mobile em duas linhas |
| 6 | **"50vh" + "9.000 visível"** | `cover` em 50vh corta a composição | `aspect-ratio` no mobile |
| 7 | **Negrito sem negrito** | Special Elite só tem 400 | Ênfase por tamanho/cor, ou Courier Prime |
| 8 | **Budget de componente** | 4 kB warn / 8 kB error por componente | Utilities no template; CSS de componente mínimo |
| 9 | **`lang="en"`, title "NoveMil"** | `index.html` | `pt-BR` + title/meta/theme-color |
| 10 | **Mockups dentro de `public/`** | `public/**` é copiado para `dist/` | Mover para `docs/referencias/` (4,5 MB fora do bundle) |
| 11 | **`app.spec.ts` desatualizado** | espera "Hello, nove-mil" | Reescrever na Fase 8 |

---

## 5. Decisões fechadas

| Decisão | Escolha | Justificativa |
|---|---|---|
| Estilo | Tailwind CSS-first (`@theme` + utilities) | Evita o conflito Tailwind/Sass e mantém CSS de componente abaixo do budget |
| SCSS | Não usar | Tailwind v4 não suporta Sass |
| Router | Remover `provideRouter`, `RouterOutlet` e `app.routes.ts` | Página única; âncoras nativas são mais robustas e menores |
| Navegação | `<a href="#id">` + `scroll-margin-top` + `scroll-behavior: smooth` | Sem JS, teclado ok, compensa a navbar |
| Link ativo | `IntersectionObserver` com banda a ~40% da viewport + fallback de fim de página | Sem scroll listener; funciona em zoneless |
| Fontes | Self-hosted em `public/fonts/` | Performance e independência de terceiros |
| Granulado | SVG `feTurbulence` em data-URI, `fixed`, `opacity .08` | Técnica da referência, zero request, sem animação |
| Sublinhado | Componente `app-brush-underline` com SVG inline | Reuso, nitidez, escala com o título |
| Mobile nav | Duas linhas, sem hamburger | Zero JS, 3 links sempre visíveis, sem overflow |
| Ícones | Nenhum; seta como `->` | README: Bootstrap Icons "apenas se necessário" |
| Conteúdo | Inline nos templates, com marcador de copy | Simples de trocar, sem abstração desnecessária |
| Imagens | WebP, `width`/`height`, `lazy` fora da dobra | Evita CLS e melhora LCP |

---

## 6. Arquitetura alvo

```
nove-mil/
+-- angular.json                 # remover router se aplicavel; assets ja apontam p/ public
+-- docs/
|   +-- referencias/             # mover os 3 mockups para ca (nao servidos)
+-- public/
|   +-- images/
|   |   +-- victor-hero.webp
|   |   +-- victor-9000-banner.webp
|   |   +-- victor-history.webp
|   +-- fonts/
|   |   +-- permanent-marker-latin-400.woff2
|   |   +-- special-elite-latin-400.woff2
|   +-- favicon.ico
+-- src/
    +-- index.html               # pt-BR, title, meta, preload
    +-- styles.css               # @theme + base + grain + frame + utilitarios
    +-- app/
        +-- app.ts               # importa os 5 componentes
        +-- app.html             # skip link + navbar + main + footer
        +-- app.css              # praticamente vazio
        +-- app.config.ts        # sem provideRouter
        +-- app.spec.ts          # reescrito
        +-- components/
        |   +-- navbar/{navbar.ts,navbar.html,navbar.css}
        |   +-- hero/{hero.ts,hero.html,hero.css}
        |   +-- about/{about.ts,about.html,about.css}
        |   +-- history/{history.ts,history.html,history.css}
        |   +-- footer/{footer.ts,footer.html,footer.css}
        +-- shared/
            +-- brush-underline/brush-underline.ts
            +-- active-section.ts        # helper puro + observer
```

Convenções: componentes **standalone**, arquivos sem sufixo `.component`, classe `Navbar`,
seletor `app-navbar`, `styleUrl` única, `ChangeDetectionStrategy.OnPush`.

---

## 7. Passo a passo

### Fase 0 — Pré-requisitos
1. Confirmar as fotos originais (ou autorizar o recorte dos mockups — ver seção 17).
2. Confirmar a copy oficial da seção 8.
3. Mover `public/referencias/` para `docs/referencias/`.

**Pronto quando:** existe decisão registrada sobre a origem das imagens e a pasta de mockups
não está mais em `public/`.

### Fase 1 — Fundação visual
4. `src/index.html`: `lang="pt-BR"`, `<title>9000 — Victor Kovalski</title>`,
   meta description, `theme-color #141311`, `color-scheme: dark`, preload da fonte display.
5. Baixar os `.woff2` (subset latin) e declarar `@font-face` com `font-display: swap`.
6. `src/styles.css`: `@import "tailwindcss"` + bloco `@theme` (seção 9).
7. `@layer base`: cores, tipografia, `::selection`, `:focus-visible`, `img`, `scroll-behavior`,
   `overflow-x: clip` (não `hidden`, para não matar o sticky), `prefers-reduced-motion`.
8. Utilitários globais: `.grain`, `.photo-frame`, `--nav-h`, `scroll-margin-top` nas 3 seções.

**Pronto quando:** `npm start` mostra fundo escuro granulado, fontes corretas e nenhum scroll horizontal.

### Fase 2 — Shell e navegação
9. `app.ts` importa `Navbar`, `Hero`, `About`, `History`, `Footer`; remove `RouterOutlet`.
10. `app.config.ts` remove `provideRouter`; apagar `app.routes.ts`.
11. `app.html`: skip link → `<app-navbar>` → `<main id="conteudo">` → `<app-footer>`.
12. Registrar `#inicio`, `#quem-e-o-9`, `#historia-do-9`.

**Pronto quando:** os links pulam para a seção com o título visível abaixo da navbar, e com
"reduzir movimento" o salto é instantâneo.

### Fase 3 — Navbar
13. `<header class="sticky top-0 z-50">` com `border-bottom: 4px solid var(--color-brick)`.
14. Logo `9`: `font-display`, `text-accent`, `clamp(3rem, 6vw, 4.2rem)`, leve rotação,
    `text-shadow` em duas camadas, `aria-label="9000 — voltar ao início"`.
15. Links: `font-body`, 20–24 px, creme, hover amarelo, `aria-current="location"` no ativo.
16. Link ativo: `app-brush-underline` variante amarela.
17. Scroll-spy: `IntersectionObserver` com `rootMargin: '-40% 0px -55% 0px'`, signal `activeId`,
    helper puro `pickActiveSection()` para teste, fallback de fim de página.
18. Mobile (< 768 px): logo na 1ª linha, 3 links na 2ª (13–14 px, `gap-3`), `--nav-h` ajustado.

**Pronto quando:** 375 px sem overflow, Tab percorre os 3 links, sublinhado acompanha a rolagem.

### Fase 4 — Hero
19. `shared/brush-underline`: input `variant: 'red' | 'yellow'`, SVG inline `aria-hidden`,
    altura fixa em px (`clamp(6px, .8vw, 10px)`), dois traços com opacidades diferentes.
20. Grid `lg:grid-cols-[47fr_53fr]`; **DOM texto-primeiro**, `order` só no visual mobile
    (foto primeiro), para o `h1` continuar sendo o primeiro heading.
21. Foto: `.photo-frame`, `aspect-[4/3]`, `object-cover`, `object-position` ajustado,
    `fetchpriority="high"`, `width`/`height` explícitos.
22. `h1` `9000`: `clamp(4rem, 8vw, 7.2rem)`, creme, + sublinhado vermelho mais curto que o texto.
23. `Victor Kovalski`: `clamp(1.9rem, 3.2vw, 2.6rem)`, mono.
24. Parágrafo: 20 px, `leading-[1.7]`, `max-w-[46ch]`.
25. CTA amarelo, sem raio, hover escurecendo, `focus-visible` escuro (anel amarelo em botão amarelo
    é invisível).
26. Separador `border-t-2 border-dashed border-line/70` ao fim da seção.

**Pronto quando:** proporção 47/53, foto sem corte no rosto, CTA leva a `#quem-e-o-9`.

### Fase 5 — About
27. Seção **sem padding horizontal**: `figure` full-bleed, `w-full`, `aspect-[19/10]`,
    `max-h-[50vh]`, `min-h-[300px]`, `object-cover`.
28. Mobile: manter `aspect-[19/10]` e remover `50vh` para não cortar a composição.
29. Bloco de texto: `max-w-[900px] mx-auto px-5 py-20 text-center`; título `QUEM É O 9?`
    em `clamp(2rem, 4.5vw, 4rem)` + sublinhado vermelho centralizado.
30. Parágrafos: 20–24 px, `leading-[1.7]`, `space-y-6`, `text-pretty`, `max-w-[62ch]` dentro do container.
31. Texto com `<strong>` onde a referência destaca.

**Pronto quando:** banner colado nas bordas, texto centralizado, nenhum card.

### Fase 6 — History e Footer
32. `#historia-do-9`: grid `lg:grid-cols-[55fr_45fr]`, `items-center`, `gap` 3–4 rem.
33. Título `HISTÓRIA DO NOVE` + sublinhado vermelho mais largo que o texto.
34. Parágrafos 20–23 px / 1.8, à esquerda, com `9000` e `Nove` em `<strong>`.
35. Foto `aspect-square`, moldura 6 px, `loading="lazy"`, `max-w-[520px]` centralizada no mobile.
36. Footer discreto: divisor, `py-8`, centralizado, `9000 — Victor Kovalski`.

**Pronto quando:** mobile na ordem título → texto → foto; desktop em duas colunas equilibradas.

### Fase 7 — Conteúdo definitivo
37. Substituir a copy quando houver versão final. Nada mais deve mudar no código.

### Fase 8 — Acessibilidade, performance e testes
38. Auditoria a11y: um único `h1`, `alt` descritivo nas 3 fotos, `aria-label` no `<nav>`,
    `aria-current`, skip link, foco visível, contraste.
39. Imagens: converter para WebP (não há `sharp`/ImageMagick/Python no ambiente — ver seção 16),
    `width`/`height`, `lazy` fora da dobra, `fetchpriority="high"` só no hero.
40. Testes (Vitest + jsdom): `App` renderiza as 3 seções e o `h1` "9000"; `Navbar` com 3 links e
    `href` corretos; `pickActiveSection()` com retângulos falsos; toda `<img>` tem `alt`.
41. `npm run build` (produção, olhar budgets) e `npm test`.
42. Lighthouse: LCP < 2,5 s, CLS < 0,1, acessibilidade 100.

### Fase 9 — QA final
43. Percorrer o checklist da seção 15 em 375 / 768 / 1024 / 1440, com `prefers-reduced-motion`
    ligado e desligado.

---

## 8. Copy oficial (transcrita das referências)

> Substitui integralmente os textos provisórios do README. É a fonte única de verdade do conteúdo.
> As referências confirmam que Victor é desenvolvedor e estudante de Sistemas de Informação, então
> não há mais risco de "inventar fatos".

**Navbar:** `Início` · `Quem é o 9` · `História do 9`

**Hero**
- Título: `9000`
- Subtítulo: `Victor Kovalski`
- Parágrafo:
  > Conhecido como 9000, Victor Kovalski transforma ideias em projetos, mistura tecnologia,
  > criatividade e propósito, e constrói sua própria trajetória dentro da área de desenvolvimento
  > de software.
- CTA: `Quem é o 9 ->`

**About**
- Título: `QUEM É O 9?`
- Parágrafo 1:
  > 9000, ou simplesmente 9, é o nome pelo qual Victor Kovalski é conhecido. Desenvolvedor,
  > estudante de Sistemas de Informação e apaixonado por tecnologia, ele busca unir criatividade,
  > disciplina e aprendizado constante para tirar ideias do papel e transformá-las em soluções reais.
- Parágrafo 2:
  > O 9 representa mais do que um apelido: é uma identidade construída ao longo de projetos,
  > desafios e experiências que marcam sua trajetória, dentro e fora da programação.

**History**
- Título: `HISTÓRIA DO NOVE`
- Parágrafo 1 (negrito em **9000** e **Nove**):
  > O nome **9000** (ou simplesmente **Nove**) surgiu de forma natural, entre amigos, e rapidamente
  > se tornou parte da sua identidade. Tudo começou com uma brincadeira em um grupo, quando, em meio
  > a várias ideias de apelido, alguém soltou "nove mil". A piada pegou, e o que era apenas um
  > comentário descontraído logo virou o seu vulgo.
- Parágrafo 2 (negrito em **9000**):
  > Desde então, o **9000** acompanha Victor Kovalski em projetos, estudos e na sua jornada na área
  > de tecnologia, representando mais do que um apelido: é uma marca da sua história, das amizades
  > que construiu e de tudo que vem desenvolvendo ao longo do caminho.

**Footer:** `9000 — Victor Kovalski`

---

## 9. Tokens e CSS base

```css
@import "tailwindcss";

@theme {
  --color-base:     #141311;
  --color-base-alt: #1b1917;
  --color-ink:      #f3ead8;
  --color-ink-dim:  #c8beae;
  --color-accent:   #f5bb08;
  --color-brick:    #d92e29;
  --color-frame:    #eee4cf;
  --color-line:     #514a40;

  --font-display: "Permanent Marker", cursive;
  --font-body:    "Special Elite", "Courier New", monospace;
}

@layer base {
  html { scroll-behavior: smooth; }
  html, body { overflow-x: clip; }

  body {
    background-color: var(--color-base);
    color: var(--color-ink);
    font-family: var(--font-body);
  }

  :focus-visible { outline: 3px solid var(--color-accent); outline-offset: 2px; }
  ::selection { background: var(--color-accent); color: var(--color-base); }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: .01ms !important;
      transition-duration: .01ms !important;
    }
  }
}
```

Granulado (uma única camada, atrás do conteúdo, sem animação):

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: .08;
  background-image: url("data:image/svg+xml,...feTurbulence..."); /* tile 220x220 */
}
header, main, footer { position: relative; z-index: 1; }
```

Moldura das fotos:

```css
.photo-frame {
  border: 5px solid var(--color-frame);
  outline: 1px solid var(--color-frame);
  outline-offset: 5px;
  background: #0d0c0b;
  border-radius: 0;
  overflow: hidden;
}
```

Âncoras:

```css
:where(#inicio, #quem-e-o-9, #historia-do-9) {
  scroll-margin-top: calc(var(--nav-h, 96px) + 1rem);
}
```

---

## 10. Especificação por componente

| Componente | Responsabilidade | Pontos críticos |
|---|---|---|
| `Navbar` | Âncoras, estado ativo, responsividade | sticky + borda 4 px; observer; `aria-current`; 375 px sem overflow |
| `Hero` | Apresentação | grid 47/53; `h1` único; foto 4:3; CTA amarelo; separador tracejado |
| `About` | Banner + bio | full-bleed sem padding; título centralizado; 62ch |
| `History` | Origem do apelido | grid 55/45; foto 1:1; negrito em 9000/Nove |
| `Footer` | Fechamento | divisor; texto centralizado |
| `BrushUnderline` | Pincelada reutilizável | `preserveAspectRatio="none"` + altura em px; `aria-hidden` |
| `active-section` | Scroll-spy | helper puro testável + observer com fallback |

Nada além disso. Sem biblioteca de UI, sem ícones, sem carrossel, sem seção extra.

---

## 11. Acessibilidade

- HTML semântico: `header`, `nav`, `main`, `section` com `aria-labelledby`, `footer`.
- Um único `h1` (`9000`); demais títulos em `h2`.
- `alt` descritivo nas 3 fotos (descrever a cena, não "imagem de Victor").
- Skip link visível no foco.
- Foco visível em todos os interativos; no botão amarelo, anel escuro.
- `aria-current="location"` no link ativo (não depender só de cor).
- `prefers-reduced-motion` respeitado em scroll e transições.
- Contraste conforme 3.8; vermelho só decorativo.

---

## 12. Performance

- Fontes self-hosted, 2 arquivos, `preload` apenas da display, `font-display: swap`.
- Fotografias em WebP, `width`/`height` explícitos, `lazy` fora da dobra,
  `fetchpriority="high"` no hero.
- Granulado em SVG data-URI (sem request adicional) e sem animação.
- Sem `@apply` em CSS de componente: utilities no template mantêm o budget de 4/8 kB.
- Mockups (4,5 MB) fora de `public/` para não irem ao `dist/`.
- Sem dependências novas em runtime.

Metas: LCP < 2,5 s, CLS < 0,1, bundle inicial abaixo de 500 kB.

---

## 13. Testes (Vitest + jsdom)

| Alvo | Caso |
|---|---|
| `App` | renderiza as 3 seções e o `h1` com "9000" |
| `App` | footer contém "9000 — Victor Kovalski" |
| `Navbar` | 3 links com `href` `#inicio`, `#quem-e-o-9`, `#historia-do-9` |
| `Navbar` | `aria-current` presente em exatamente um link |
| `active-section` | `pickActiveSection()` escolhe a seção correta para retângulos simulados |
| `Hero` | CTA aponta para `#quem-e-o-9` |
| Geral | toda `<img>` tem `alt` não vazio |

> `IntersectionObserver` não existe no jsdom: por isso a lógica vai para um helper puro.

---

## 14. Riscos

```
[origem das fotos]      --> bloqueia fidelidade; recorte dos mockups e fallback lossy
[50vh no banner]        --> corte no mobile; usar aspect-ratio
[8kB/componente]        --> estourar budget; utilities no template
[@apply no componente]  --> exige @reference "../styles.css"; melhor evitar
[SVG pincel]            --> preserveAspectRatio="none" achata a espessura; altura em px
[sticky + overflow]     --> overflow-x:hidden mata o sticky; usar clip
[Special Elite 400]     --> negrito sintetico; aceitar ou trocar por Courier Prime
[feTurbulence]          --> custo de pintura; camada unica, tile 220px, opacidade baixa
```

---

## 15. Critérios de aceite

- [ ] Componentes standalone
- [ ] Identidade visual fiel aos mockups (proporções, molduras, pinceladas)
- [ ] Fundo com granulado discreto e estático
- [ ] Navbar sticky com `9` amarelo e 3 links
- [ ] Link ativo com pincelada amarela e `aria-current`
- [ ] Hero com foto emoldurada 4:3 e título `9000` com sublinhado vermelho
- [ ] CTA navega para `#quem-e-o-9`
- [ ] Banner do About full-bleed com `9.000` visível
- [ ] About centralizado, ~62ch por linha
- [ ] History em duas colunas (texto esquerda, foto direita) no desktop
- [ ] Foto da History ~1:1 com moldura creme
- [ ] Mobile: tudo em uma coluna, ordem correta, sem overflow
- [ ] Âncoras funcionam com compensação da navbar
- [ ] `prefers-reduced-motion` respeitado
- [ ] Sem backend
- [ ] `npm run build` e `npm test` verdes
- [ ] Copy oficial aplicada e fácil de substituir

---

## 16. Comandos

```bash
cd nove-mil
npm start            # dev server
npm run build        # producao (observar budgets)
npm test             # Vitest
```

Conversão de imagens (não há ferramenta no ambiente atual):

```bash
# opcao A: pedir as fotos ja otimizadas
# opcao B: adicionar devDependency e rodar script proprio
npm i -D sharp
node scripts/optimize-images.mjs   # 1600px, webp q80
```

Ambiente verificado: `sharp`, ImageMagick, ffmpeg e Python **ausentes**; `openspec` presente.

---

## 17. Pendências

1. **Fotos originais** (hero, banner, history). Sem elas, o caminho é recortar dos mockups:
   - hero: região interna da moldura, ~4:3, lado esquerdo do mockup;
   - banner: faixa superior do `quemÉo9Referencia.png`;
   - history: retângulo emoldurado à direita do `Historiado9Referencia.png`.
   Recorte herda compressão e resolução do render — aceitável para protótipo, ruim para produção.
2. Confirmar se o `9` pintado do hero continua embutido na foto final.
3. Confirmar a copy da seção 8 como definitiva.
4. Definir se o footer entra (as referências não mostram footer).
5. Mover `public/referencias/` para `docs/referencias/`.

---

## 18. Observações finais

- Fidelidade às referências tem prioridade sobre o README quando os dois divergirem.
- Não adicionar seções, efeitos ou dependências não previstos.
- O projeto ainda não tem `openspec/`; para transformar este plano em change é preciso
  `openspec init` (ou um `--store`), o que não é feito em modo exploração/plano.
