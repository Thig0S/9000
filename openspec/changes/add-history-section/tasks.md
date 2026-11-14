# Tasks

## 1. Estrutura e conteúdo da seção

- [x] 1.1 Criar `src/app/components/history/history.ts` como componente standalone `History`, com
      `ChangeDetectionStrategy.OnPush`, `templateUrl` e `styleUrl`, importando `BrushUnderline`;
      verificar que o componente compila isoladamente com `npx ng build` ao final do grupo.
- [x] 1.2 Criar `history.html` com `<section id="historia-do-9" aria-labelledby="history-title">`,
      `h2#history-title` com `HISTÓRIA DO NOVE`, `app-brush-underline variant="red"`, dois parágrafos
      com os textos exatos da referência e `<strong>` apenas em `9000` e `Nove`; verificar que o
      texto renderizado corresponde exatamente ao conteúdo da spec.
- [x] 1.3 Incluir no template a fotografia `/imgs/imagemParaHistoriaDo9.png` em `<figure>` emoldurada,
      com `alt` descritivo, `width="321"`, `height="340"`, `loading="lazy"` e `decoding="async"`;
      verificar os atributos no DOM renderizado.
- [x] 1.4 Encerrar a seção com um separador tracejado `role="separator"` em `#514a40`; verificar que
      existe um único separador ao fim da seção e que ele permanece dentro da largura da viewport.
- [x] 1.5 Criar `history.spec.ts` no padrão de `about.spec.ts`, verificando `section#historia-do-9`,
      `aria-labelledby`, título, os dois parágrafos exatos, `src`, `alt`, `loading`, `decoding`,
      `width` e `height` da imagem; executar `npm test` e verificar que o teste de `History` passa.

## 2. Estilos e responsividade

- [x] 2.1 Implementar em `history.css` o empilhamento em coluna única por padrão e, a partir de
      1024 px, o grid `55% / 45%` com alinhamento vertical ao centro e espaçamento entre as colunas;
      verificar o layout em 1440 px.
- [x] 2.2 Aplicar ao título a fonte display, caixa alta, cor creme, `clamp()` entre aproximadamente
      2.5rem e 4.7rem, alinhamento à esquerda e sublinhado vermelho com 70% da largura do bloco;
      verificar visualmente que o sublinhado acompanha a borda esquerda do título.
- [x] 2.3 Aplicar à fotografia a classe global `.photo-frame`, largura máxima de cerca de 26rem,
      proporção 321/340 preservada e sem recorte das pessoas; verificar que a imagem não fica
      distorcida em nenhuma largura.
- [x] 2.4 Ajustar a tipografia do corpo para 20 a 23 px no desktop e 16 a 18 px no mobile, com
      entrelinha próxima de 1.6 e padding lateral de aproximadamente 20 px no mobile; verificar em
      375, 768 e 1440 px que não há rolagem horizontal.

## 3. Integração com a aplicação

- [x] 3.1 Importar `History` em `src/app/app.ts` e inserir `<app-history />` após `<app-about />`
      dentro de `<main>` em `src/app/app.html`; verificar que a página renderiza as três seções na
      ordem correta.
- [x] 3.2 Atualizar `src/app/app.spec.ts` para exigir `app-history` e a ordem
      `app-hero + app-about + app-history`; executar `npm test` e verificar que o teste de `App`
      passa e que continua existindo apenas um `h1` `9000`.
- [x] 3.3 Validar manualmente que o link `História do 9` da navbar rola até `#historia-do-9`, que o
      título não fica encoberto pela navbar, que o link recebe a pincelada amarela com
      `aria-current="location"` e que a rolagem é instantânea com `prefers-reduced-motion: reduce`.

## 4. Verificação final

- [x] 4.1 Executar `npm test` e `npm run build`; verificar que ambos terminam sem erros.
- [x] 4.2 Revisar a seção contra `public/referencias/Historiado9Referencia.png` em 375, 768 e 1440 px,
      conferindo composição, textos, moldura, contraste e ausência de overflow horizontal.

## Workflow follow-up

- Arquivar a mudança após a revisão e a aprovação do resultado.
- Sincronizar o delta `landing-page/history` com `openspec/specs/landing-page/history/spec.md` no
  arquivamento.
