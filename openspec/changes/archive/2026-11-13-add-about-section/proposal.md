# Proposal

## Why

Depois de navbar e hero, a seção `#quem-e-o-9` ainda não existe: o CTA `Quem é o 9 ->` e o link
correspondente da navbar apontam para uma âncora morta, e a página termina no separador tracejado do
hero. A seção About é a próxima fatia vertical prevista no `README.md` e no `docs/implementação.md`
§7, e é a primeira peça que exercita o banner full-bleed — a composição com maior risco de
enquadramento, porque o recorte disponível (`720×658`) não tem a proporção panorâmica da referência.

## What Changes

- Novo componente standalone `About` com `section#quem-e-o-9` rotulada pelo próprio título,
  posicionada imediatamente após o hero e antes do fim do `<main>`.
- Banner fotográfico full-bleed usando `public/imgs/imagemParaQuemÉo9.png`, sem margens laterais,
  bordas ou raio, com `object-fit: cover`, enquadramento que prioriza os rostos em primeiro plano,
  texto alternativo descritivo, dimensões reservadas e carregamento preguiçoso.
- Título `QUEM É O 9?` em fonte display creme, centralizado, com sublinhado vermelho irregular
  centralizado mais largo que o texto, reaproveitando o `BrushUnderline` já existente.
- Dois parágrafos centralizados com a copy oficial transcrita no `docs/implementação.md` §8,
  largura de linha controlada (~62ch), entrelinha ~1.7 e espaçamento generoso — sem cards.
- Montagem no shell da página: `<app-about />` depois de `<app-hero />`, preservando um único `h1`.
- Novo `about.spec.ts` e ajuste do `app.spec.ts` para o shell com três componentes.

Fora de escopo: History e Footer, conversão/otimização das imagens, substituição do asset do banner
por uma versão panorâmica, menu hambúrguer, novas rotas, alterações de tokens ou de CSS global.

## Capabilities

### New Capabilities

- `landing-page/about`: seção Quem é o 9 — banner panorâmico full-bleed, título com sublinhado de
  pincel, biografia centralizada, adaptação responsiva e integração com as âncoras existentes.

### Modified Capabilities

Nenhuma. `landing-page/navigation` e `landing-page/hero` já declaram os destinos `#quem-e-o-9`; com a
seção presente, o comportamento deles passa a ser observável, mas nenhum requisito deles muda.

## Impact

- Novos arquivos em `src/app/components/about/` (`about.ts`, `about.html`, `about.css`,
  `about.spec.ts`).
- `src/app/app.ts` e `src/app/app.html`: importar e renderizar a seção dentro de `<main>`.
- `src/app/app.spec.ts`: o shell passa a conter `app-navbar`, `app-hero` e `app-about`.
- Nenhuma dependência nova em runtime. Nenhum token global novo: `:where(#inicio, #quem-e-o-9,
  #historia-do-9) { scroll-margin-top }` e o utilitário de foco já existem em `src/styles.css`.
- Asset: `public/imgs/imagemParaQuemÉo9.png` (720×658, 872 kB). Em desktop full-bleed ele é ampliado
  ~2× e o `9.000` impresso no topo do arquivo fica fora do recorte; a decisão de enquadramento e a
  pendência da versão panorâmica ficam registradas no `design.md`.
- Pré-requisito de fluxo: a change `add-navbar-hero` está completa, mas não arquivada, e
  `openspec/specs/` está vazio. Antes do apply, arquivá-la e reconciliar os rótulos da navbar, que
  hoje exibem `Quem é 9` / `História 9` enquanto o spec publicado pela change pede `Quem é o 9` /
  `História do 9`.
