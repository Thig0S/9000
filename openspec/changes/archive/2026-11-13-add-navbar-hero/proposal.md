# Proposal

## Why

O scaffold Angular atual ainda é o boilerplate do CLI: não existe navbar, hero, identidade visual nem
conteúdo do 9000. Sem a fundação visual (paleta, tipografia, granulado) e sem as duas primeiras áreas
da página, nada da landing page descrita em `README.md` e `docs/implementação.md` é verificável. Esta
change entrega a primeira fatia vertical — navbar e hero sobre a identidade visual do projeto — para
que a composição, as proporções e a estética possam ser validadas antes de About e History.

## What Changes

- Fundação visual em `src/styles.css`: tokens `@theme` da paleta (`base`, `base-alt`, `ink`,
  `ink-dim`, `accent`, `brick`, `frame`, `line`) e das famílias tipográficas, camada `base` com
  cores, tipografia, seleção, foco visível, rolagem suave, `overflow-x: clip` e
  `prefers-reduced-motion`, granulado estático em SVG data-URI, utilitário `.photo-frame`,
  `--nav-h` e `scroll-margin-top` das âncoras.
- Fontes self-hosted (`Permanent Marker` para display, `Special Elite` para corpo) com `@font-face`,
  `font-display: swap` e `preload` apenas da display.
- `src/index.html`: `lang="pt-BR"`, título `9000 — Victor Kovalski`, meta description e
  `theme-color`.
- Remoção do router não utilizado: `provideRouter`, `RouterOutlet` e `app.routes.ts`; limpeza do
  boilerplate de `app.html` e redução de `app.ts` ao shell da página.
- Novo componente standalone `Navbar`: glifo `9` amarelo à esquerda, links `Início`,
  `Quem é o 9` e `História do 9`, `sticky` com divisória vermelha de 4 px, estado ativo com
  pincelada amarela e `aria-current="location"`, layout em duas linhas no mobile.
- Novo componente standalone `Hero` (`#inicio`): grid 47/53, moldura creme 4:3 com o recorte
  `imagens/imagemParaHeroSection9.png`, `9` pintado em baixa opacidade atrás da pessoa, `h1` `9000`
  com sublinhado vermelho irregular, subtítulo `Victor Kovalski`, parágrafo e CTA amarelo para
  `#quem-e-o-9`, separador tracejado ao fim da seção.
- Novo componente compartilhado `BrushUnderline` (SVG inline, `aria-hidden`) usado pelos
  sublinhados de título e pelo link ativo.
- Scroll-spy via `IntersectionObserver` com helper puro testável, tolerante a âncoras ainda
  inexistentes.
- Testes Vitest/jsdom para navbar, hero, helper de seção ativa e shell do app.

Fora de escopo: seções About, History e Footer; os links `#quem-e-o-9` e `#historia-do-9` passam a
existir na navbar, mas suas seções de destino só chegam em changes futuras.

## Capabilities

### New Capabilities

- `landing-page/visual-identity`: fundação visual da página — paleta e tokens, tipografia
  self-hosted, fundo escuro granulado e estático, molduras de fotografia, foco visível,
  preferência por movimento reduzido e metadados do documento.
- `landing-page/navigation`: navbar da landing page — logo `9`, links de âncora, seção ativa,
  comportamento sticky, divisória e adaptação responsiva sem overflow.
- `landing-page/hero`: seção de abertura — composição 47/53, fotografia emoldurada com o `9`
  pintado, hierarquia de títulos, texto de apresentação, CTA para a seção `quem-e-o-9` e
  separador de fim de seção.

### Modified Capabilities

Nenhuma — o projeto ainda não possui specs publicadas (`openspec/specs/` está vazio).

## Impact

- `src/styles.css`: tokens, camada base, granulado, moldura e utilitários globais.
- `src/index.html`: idioma, título, meta description e `theme-color`.
- `src/app/app.ts`, `app.html`, `app.css`, `app.config.ts`, `app.spec.ts`: shell da página e
  remoção do router; `app.routes.ts` deixa de existir.
- Novos arquivos em `src/app/components/{navbar,hero}/` e `src/app/shared/brush-underline/`,
  além de `src/app/shared/active-section.ts`.
- Novos assets em `public/fonts/`; a fotografia do hero continua em
  `public/imgs/imagemParaHeroSection9.png` (sem renomear nem converter).
- Sem dependências novas em runtime, sem backend e sem mudança de orçamento de build além do
  esperado para o CSS/HTML dos novos componentes.
