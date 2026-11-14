# Tasks

## 1. Fundação visual

- [ ] 1.1 Baixar os subsets latin de `Permanent Marker` e `Special Elite` (`.woff2`) para
      `public/fonts/` e declarar `@font-face` com `font-display: swap`; verificar no DevTools que
      ambos retornam 200 e que não há requisição a `fonts.googleapis.com` / `fonts.gstatic.com`
- [ ] 1.2 Substituir `src/styles.css` por `@import 'tailwindcss'` + bloco `@theme` com os tokens de
      cor e das famílias tipográficas; verificar no navegador que `body` computa fundo `#141311`,
      texto `#f3ead8` e a família monoespaçada
- [ ] 1.3 Adicionar `@layer base` com `scroll-behavior`, `overflow-x: clip`, `::selection`,
      `:focus-visible`, cores e tipografia, além do bloco `prefers-reduced-motion`; verificar que o
      Tab desenha anel amarelo e que com a preferência ativa as transições ficam em 0.01 ms
- [ ] 1.4 Implementar o granulado em `body::before` (SVG `feTurbulence` data-URI, tile 220×220,
      `fixed`, `pointer-events: none`, `opacity: .08`) e elevar `header`/`main` com
      `position: relative; z-index: 1`; verificar visualmente a textura estática e que clicar e
      selecionar texto sobre ela funciona
- [ ] 1.5 Adicionar o utilitário `.photo-frame` (borda 5 px `#eee4cf`, `outline` 1 px com offset,
      fundo `#0d0c0b`, sem raio) e declarar `--nav-h` com `scroll-margin-top` nas âncoras;
      verificar por inspeção que a moldura renderiza e que o `sticky` continua funcionando
- [ ] 1.6 Atualizar `src/index.html`: `lang="pt-BR"`, título `9000 — Victor Kovalski`, meta
      description, `theme-color #141311`, `color-scheme: dark` e `preload` da fonte display;
      verificar no DevTools que o documento declara os metadados e que o preload aparece no `<head>`

## 2. Componentes compartilhados

- [ ] 2.1 Criar `shared/brush-underline/brush-underline.ts`, componente standalone com input
      `variant: 'red' | 'yellow'`, SVG inline `aria-hidden="true"`, `preserveAspectRatio="none"` e
      altura em px; verificar com um teste de render que as duas variantes são geradas e que o SVG
      não é anunciado por leitores de tela
- [ ] 2.2 Criar `shared/active-section.ts` com a função pura `pickActiveSection()` e o wrapper que
      registra `IntersectionObserver` com `rootMargin: '-40% 0px -55% 0px'`; verificar com teste
      unitário que a função escolhe a seção correta para retângulos simulados, ignora destinos
      ausentes e retorna o último válido quando nada intersecciona

## 3. Navbar

- [ ] 3.1 Criar `components/navbar/` com `header` + `nav` rotulado, glifo `9` como link para
      `#inicio` com nome acessível e os links `Início`, `Quem é o 9`, `História do 9`; verificar por
      teste que existem os três `href` corretos e um nome acessível no logo
- [ ] 3.2 Aplicar `sticky` no topo, fundo opaco igual ao da página e divisória inferior de 4 px
      `#d92e29` em largura total; verificar rolando a página até o fim do hero (navbar visível) e
      pela borda computada do cabeçalho
- [ ] 3.3 Ligar o scroll-spy ao signal `activeId` com `ChangeDetectionStrategy.OnPush` e renderizar
      a pincelada amarela + `aria-current="location"` apenas no link ativo; verificar em teste que
      exatamente um link tem `aria-current` e manualmente que o destaque acompanha a rolagem
- [ ] 3.4 Ajustar a responsividade: uma linha a partir de 768 px e duas linhas abaixo disso (logo na
      primeira, três links na segunda, tipografia ~14 px), atualizando `--nav-h` no breakpoint;
      verificar em 375 px e 768 px que os três links ficam visíveis e não há rolagem horizontal
- [ ] 3.5 Garantir acessibilidade da navbar (ordem de Tab, foco visível, área acionável ≥ 24×24 px,
      contraste creme/escuro); verificar com Tab em 375 px e 1440 px e conferir que nenhum link fica
      inalcançável
- [ ] 3.6 Escrever `navbar.spec.ts` cobrindo hrefs, presença de exatamente um `aria-current` e nome
      acessível do logo; verificar com `npm test` que a suíte do componente passa

## 4. Hero

- [ ] 4.1 Criar `components/hero/` com seção `#inicio` rotulada, `h1` `9000`, subtítulo `Victor
      Kovalski`, parágrafo com a copy oficial, CTA `Quem é o 9` → `#quem-e-o-9` e separador
      tracejado; verificar que é o único `h1` da página e que o texto do parágrafo confere com o
      spec
- [ ] 4.2 Montar o grid 47/53 no desktop com o bloco textual primeiro no DOM e `order` apenas visual
      no mobile; verificar em 1440 px (duas colunas, foto à esquerda) e em 375 px (ordem foto,
      `9000`, nome, parágrafo, botão)
- [ ] 4.3 Emoldurar `imagens/imagemParaHeroSection9.png` em 4:3 com fundo interno escuro e adicionar
      a camada do `9` pintado (creme, opacidade ~0.12, `aria-hidden`, `pointer-events: none`) atrás
      da pessoa; verificar que o rosto não é coberto, que a imagem não distorce e que há `alt`
      descritivo, `width`/`height` e `fetchpriority="high"`
- [ ] 4.4 Estilizar título, sublinhado vermelho mais curto que o texto, subtítulo mono, parágrafo com
      `max-w-[46ch]`/`leading-[1.7]` e CTA amarelo reto com hover escurecido e foco escuro;
      verificar no desktop e no mobile que a escala responde com `clamp()` sem quebrar linha
- [ ] 4.5 Escrever `hero.spec.ts` cobrindo `h1` `9000`, texto da copy, destino do CTA e `alt` não
      vazio da imagem; verificar com `npm test` que a suíte passa

## 5. Integração e verificação final

- [ ] 5.1 Remover o router (`provideRouter`, `RouterOutlet`, `app.routes.ts`) e reduzir `app.ts` /
      `app.config.ts` ao shell da página; montar `app.html` com skip link, `<app-navbar>`, `<main
      id="conteudo">` e `<app-hero>`; verificar por busca que não sobrou referência a
      `RouterOutlet`/`app.routes` e que `npm run build` compila
- [ ] 5.2 Reescrever `app.spec.ts` para renderizar o shell com navbar e hero, checando um único `h1`
      `9000` e a ausência do boilerplate do CLI; verificar com `npm test` que toda a suíte passa
- [ ] 5.3 Rodar `npm run build` em produção e conferir budgets (500 kB inicial, 4/8 kB por
      componente) sem warning de estilo de componente; verificar a saída do build
- [ ] 5.4 Fazer QA manual em 375, 768, 1024 e 1440 px com `prefers-reduced-motion` ligado e
      desligado; verificar ausência de rolagem horizontal, as três âncoras, o CTA e o link ativo em
      cada largura

## Workflow follow-up

- Arquivar a change depois da revisão do projeto.
- Registrar como pendências das próximas changes: seções `#quem-e-o-9` e `#historia-do-9`, footer e
  possível versão de maior resolução da foto do hero.
