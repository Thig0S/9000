# Design

## Context

O projeto é um scaffold Angular 22.2.6 gerado pelo CLI, zoneless (sem `polyfills`), com Tailwind CSS
4.3.5 processado por PostCSS e testes em Vitest + jsdom. `angular.json` serve assets de `public/`,
usa `src/styles.css` como única folha global e impõe budget de 4 kB (warning) / 8 kB (error) por
estilo de componente. `src/app` ainda contém o router vazio e 20 kB de boilerplate.

`docs/implementação.md` já consolidou as decisões de arquitetura e a copy oficial (§8), com prioridade
sobre o `README.md` onde houver divergência. As três referências visuais estão em `public/referencias/`
e a fotografia real do hero está em `public/imgs/imagemParaHeroSection9.png` — recorte 324×432 (3:4)
com fundo transparente e sem o `9` pintado, diferente do que o mockup mostrava. A motivação da change
está em `proposal.md`; os requisitos, nos três specs de `specs/landing-page/`.

## Goals / Non-Goals

**Goals:**

- Entregar a fatia vertical navbar + hero já sobre a fundação visual real, de modo que proporções,
  tipografia e textura possam ser avaliadas no navegador.
- Deixar o shell do app pronto para receber About, History e Footer sem retrabalho de estrutura.
- Manter CSS de componente abaixo do budget e zero dependências novas em runtime.

**Non-Goals:**

- Seções About, History e Footer, incluindo seus textos e fotos.
- Otimização/convert de imagens (não há `sharp`, ImageMagick, ffmpeg ou Python no ambiente) e
  remoção dos mockups de `public/referencias/`.
- Menu hambúrguer, biblioteca de UI, ícones vetoriais de terceiros e qualquer rota.
- Deploy, backend ou autenticação.

## Decisions

### 1. Tailwind CSS-first, sem SCSS

Tokens da paleta e das famílias em `@theme` de `src/styles.css`; regras globais em `@layer base`;
utilities no template dos componentes; CSS de componente apenas para o que utilities não expressam
bem (granulado já é global, moldura é utilitário `.photo-frame`).

- **Por que:** Tailwind v4 não é compatível com Sass, e o projeto já está configurado para PostCSS
  CSS-first. O README pedia SCSS, mas `docs/implementação.md` §4 resolveu o conflito em favor do
  scaffold.
- **Alternativas:** adotar SCSS (exigiria remover Tailwind, mudar `angular.json` e orçamentos);
  CSS puro sem Tailwind (mais CSS de componente, risco de estourar 4 kB).

### 2. Tokens semânticos, não cores literais

`--color-base`, `--color-base-alt`, `--color-ink`, `--color-ink-dim`, `--color-accent`,
`--color-brick`, `--color-frame`, `--color-line`, `--font-display`, `--font-body`. Os componentes
referenciam `text-ink`, `bg-accent`, `border-brick` etc.

- **Por que:** um único ponto de troca se a paleta mudar, e leitura semântica no template.
- **Alternativas:** hex direto no template (espalha a paleta por todos os arquivos).

### 3. Granulado em camada fixa, SVG data-URI

`body::before` com `position: fixed`, `inset: 0`, `pointer-events: none`, `opacity: .08`, tile
`feTurbulence` 220×220, sem animação; `header`/`main` em `position: relative; z-index: 1`.

- **Por que:** técnica da referência, zero requisição extra, não interfere em clique/seleção.
- **Alternativas:** PNG de ruído repetido (mais um asset); camada por seção (custo de pintura e
  costura visível entre seções).

### 4. Fontes self-hosted

Baixar `Permanent Marker` e `Special Elite` (subset latin, `.woff2`) para `public/fonts/`,
`@font-face` em `styles.css` com `font-display: swap`, `preload` apenas da display em `index.html`.

- **Por que:** independência de terceiros, sem requisição ao Google Fonts, LCP estável.
- **Alternativas:** `<link>` para Google Fonts (uma conexão externa a mais e dependência de
  disponibilidade); fonte local do sistema (não reproduz a referência).

### 5. Remoção do router

Apagar `provideRouter` de `app.config.ts`, `RouterOutlet` de `app.ts`/`app.html` e o arquivo
`app.routes.ts`. O shell passa a ser `skip link → <app-navbar> → <main id="conteudo">`.

- **Por que:** página única; âncoras nativas são menores, funcionam sem JS e não exigem configuração
  de rota.
- **Alternativas:** manter router com uma rota vazia (peso morto no bundle e `router-outlet` sem
  conteúdo).

### 6. Navegação por âncoras nativas + `scroll-margin-top`

`<a href="#id">`, `html { scroll-behavior: smooth }`, `--nav-h` no `:root` e
`scroll-margin-top: calc(var(--nav-h) + 1rem)` nas seções. `overflow-x: clip` no `html`/`body`.

- **Por que:** compensa a navbar fixa sem JS e não quebra em navegação por teclado.
- **Alternativas:** scroll via `scrollIntoView` em handler (JS desnecessário); `overflow-x: hidden`
  (mata o `sticky`).

### 7. Scroll-spy com helper puro

`src/app/shared/active-section.ts` exporta `pickActiveSection()` — recebe retângulos simulados e
devolve o id ativo — e um pequeno wrapper que cria `IntersectionObserver` com
`rootMargin: '-40% 0px -55% 0px'`, além de fallback para o fim da página. O componente guarda
`activeId` em signal e usa `ChangeDetectionStrategy.OnPush`.

- **Por que:** jsdom não implementa `IntersectionObserver`; isolar a decisão em função pura permite
  testar a lógica sem mock. O observer é observado apenas em elementos existentes.
- **Alternativas:** listener de `scroll` + `getBoundingClientRect` (custo por frame); testar com
  mock completo do observer (frágil).
- **Comportamento com âncoras ausentes:** `#quem-e-o-9` e `#historia-do-9` ainda não existem, então
  o observer só observa `#inicio`; o helper ignora destinos nulos e o link ativo permanece o último
  válido, sem erro.

### 8. Hero: moldura 4:3 com recorte 3:4 e `9` pintado em camada própria

A moldura mantém a proporção 4:3 da referência, com fundo interno escuro (`#0d0c0b`) e o recorte
transparente ancorado embaixo/à esquerda, usando `object-contain` e altura relativa. O `9` é uma
camada decorativa separada (texto na fonte display, creme, `opacity` entre 0.10 e 0.14,
`pointer-events: none`, `aria-hidden`), posicionada no lado direito da moldura, atrás da pessoa.

- **Por que:** é a composição do mockup, agora que o recorte não traz o `9` embutido; o número é
  ajustável sem tocar na foto.
- **Alternativas:** moldura 3:4 retrato (foge da referência); usar o recorte do mockup como imagem
  (menor resolução, herda compressão e o `9` "queimado"); `9` como SVG com máscara (mais trabalho,
  mesmo efeito visual).

### 9. Ordem de leitura: texto primeiro no DOM

O bloco textual vem antes da figura no DOM; no mobile a foto sobe via `order` (grid) apenas
visualmente, para que o `h1` continue sendo o primeiro heading na leitura e no fluxo de foco.

- **Por que:** a referência visual pede foto primeiro no mobile, mas a semântica exige o título antes.
- **Alternativas:** foto primeiro no DOM e `order` no desktop (o `h1` deixa de ser o primeiro heading
  na ordem de leitura).

### 10. Navbar mobile em duas linhas

Sem hambúrguer: no breakpoint `< 768px`, logo na primeira linha e os três links na segunda, com
tipografia reduzida (`~14px`) e `--nav-h` maior.

- **Por que:** três links curtos cabem sem JS, sem estado de menu e sem overflow em 320–375 px.
- **Alternativas:** hambúrguer (JS, foco preso, mais superfície de bug); ocultar links (contraria o
  requisito de manter as três opções visíveis).

### 11. Assets e nomenclatura

A fotografia permanece em `public/imgs/imagemParaHeroSection9.png`, referenciada como
`imagens/imagemParaHeroSection9.png` — o pipeline de assets copia `public/` para a raiz do build.
Não haverá conversão para WebP nesta change.

- **Por que:** evitar renomear/mover assets sem ferramenta de otimização; o arquivo tem 147 kB.
- **Alternativas:** mover para `public/images/` e converter (exige devDependency `sharp`, fora de
  escopo).

### 12. Estrutura de arquivos

```
src/app/
+-- app.ts / app.html / app.css / app.config.ts / app.spec.ts   # shell sem router
+-- components/
|   +-- navbar/{navbar.ts,navbar.html,navbar.css}
|   +-- hero/{hero.ts,hero.html,hero.css}
+-- shared/
    +-- brush-underline/brush-underline.ts
    +-- active-section.ts
```

Componentes standalone, `ChangeDetectionStrategy.OnPush`, classe sem sufixo (`Navbar`, `Hero`),
seletor `app-*`, `styleUrl` única.

## Risks / Trade-offs

- **Resolução da foto do hero (324×432)** → a moldura 4:3 no desktop amplia o recorte e pode
  amaciar a imagem; mitigação: limitar a largura máxima da moldura e aceitar o resultado como
  protótipo, pedindo uma versão maior da foto em paralelo.
- **Fontes dependem de download** → o apply precisa de rede para obter os `.woff2`; mitigação:
  fallback `cursive`/monospace declarado e, se o download falhar, registrar o bloqueio em vez de
  silenciar.
- **Budget de 4 kB/8 kB por componente** → mitigação: utilities no template e CSS de componente
  quase vazio; conferir `ng build` no fim.
- **`feTurbulence` custa pintura** → mitigação: camada única, tile pequeno, opacidade baixa.
- **Special Elite só tem peso 400** → não há negrito no recorte desta change; quando a History
  chegar, a ênfase deve usar tamanho/cor ou troca de fonte.
- **Âncoras para seções inexistentes** → clique em `Quem é o 9`/`História do 9` não navega para
  conteúdo; mitigação: documentar como pendência das próximas changes; o CTA do hero herda o mesmo
  comportamento.
- **Diferença entre mockup e foto real** → o mockup tinha o `9` embutido e proporção diferente;
  mitigação: decisão 8 reproduz a composição com camada separada e fica fácil de ajustar.

## Migration Plan

Não há dados nem persistência; a mudança é puramente de front-end. Ordem de aplicação:
shell e remoção do router → fundação visual e fontes → navbar → hero → testes e build. Rollback é
o revert dos arquivos alterados/criados (o repositório está limpo, com exceção de `openspec/` e
`.opencode/` que são artefatos de ferramenta).

## Open Questions

- Existe uma versão de maior resolução da foto do hero? Se sim, substituir o arquivo sem mudar o
  código; caso contrário, a moldura fica limitada em largura.
- O footer entra na página mesmo sem aparecer nas referências? Decisão adiada para a change de
  About/History.
