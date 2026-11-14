# Tasks

## Pré-requisitos de fluxo

- Arquivar a change `add-navbar-hero` (completa e válida) e publicar `landing-page/*` em
  `openspec/specs/` antes de começar o apply.
- Reconciliar os rótulos da navbar com o spec arquivado: hoje o código exibe `Quem é 9` e
  `História 9`, e o spec pede `Quem é o 9` e `História do 9`.

## 1. Componente About — estrutura e copy

- [ ] 1.1 Criar `src/app/components/about/` com `about.ts`, `about.html` e `about.css`; componente
      standalone, `ChangeDetectionStrategy.OnPush`, seletor `app-about`, importando apenas
      `BrushUnderline`; verificar que `npm test` compila o componente sem erro
- [ ] 1.2 Renderizar `<section id="quem-e-o-9" aria-labelledby="about-title">` com `h2#about-title`
      `QUEM É O 9?` e `app-brush-underline variant="red"` logo abaixo; verificar no DOM que o
      `aria-labelledby` aponta para o `h2` e que o `h2` é o único título da seção
- [ ] 1.3 Inserir os dois parágrafos da copy oficial (spec, cenário "Conteúdo dos parágrafos") em
      `about.html` dentro de um container `max-w-[62ch]` com `space-y-6` e `text-pretty`; verificar
      que o texto dos dois parágrafos corresponde exatamente à spec
- [ ] 1.4 Escrever `about.spec.ts` cobrindo `#quem-e-o-9`, o `aria-labelledby`, o `h2`, a copy dos
      dois parágrafos e a ausência de um segundo `h1`; verificar com `npm test` que a suíte do
      componente passa

## 2. Banner e estilos da seção

- [ ] 2.1 Implementar o banner como `<figure>` + `<img src="/imgs/imagemParaQuemÉo9.png">` com
      `w-full`, `h-[clamp(240px,40vw,520px)]`, `object-cover`, `object-position: 50% 100%`,
      `loading="lazy"`, `decoding="async"`, `width="720"`, `height="658"` e `alt` descritivo;
      verificar no DOM esses atributos e, em 1440 px, que o banner vai de borda a borda sem margem,
      borda ou raio
- [ ] 2.2 Estilizar o título e o sublinhado: `font-display`, `uppercase`, `text-center`,
      `text-[clamp(2rem,4.5vw,4rem)]`, com o host do `app-brush-underline` em
      `width: min(100%, 20rem)` e altura de 6 a 10 px; verificar em 1440 px e 375 px que o sublinhado
      fica centralizado e mais largo que o texto
- [ ] 2.3 Ajustar o bloco textual com `py-20`, `px-5`, 20–24 px no desktop e 16–18 px no mobile,
      `leading-[1.7]`, sem card ou fundo próprio; verificar no DevTools em 1440 px que a linha fica
      em ~62ch e em 375 px que o padding lateral é de ~20 px
- [ ] 2.4 Ampliar `about.spec.ts` com as asserções do banner (`src`, `alt` não vazio, `loading`,
      `width`, `height`); verificar com `npm test` que a suíte passa

## 3. Integração no shell

- [ ] 3.1 Adicionar `About` aos `imports` de `app.ts` e `<app-about />` após `<app-hero />` dentro do
      `<main id="conteudo">`; verificar por busca que a seção está dentro do `main` e que o documento
      mantém um único `h1`
- [ ] 3.2 Atualizar `app.spec.ts` para esperar `app-about` e a seção `#quem-e-o-9` além da navbar e
      do hero; verificar com `npm test` que a suíte do shell passa
- [ ] 3.3 Verificar em navegador que o CTA do hero e o link `Quem é o 9` rolam até a seção, com o
      título abaixo da navbar, e que o link fica ativo após entrar na área de leitura; se o observer
      não registrar a seção, mover o registro para `afterNextRender` na navbar e repetir a verificação

## 4. Verificação final

- [ ] 4.1 Rodar `npm run build` em produção e conferir que não há erro de budget nem warning de
      estilo do componente `about`
- [ ] 4.2 Fazer QA manual em 375, 768, 1024 e 1440 px com `prefers-reduced-motion` ligado e
      desligado: banner full-bleed com a fileira da frente visível, sem overflow horizontal, link
      ativo correto, CTA funcionando e contraste legível; registrar o resultado da verificação

## Workflow follow-up

- Arquivar a change depois da revisão do projeto.
- Registrar como pendências das próximas changes: seção `#historia-do-9`, footer, versão panorâmica
  do banner do About e conversão das imagens para um formato otimizado.
