# Proposal

## Why

A landing page já entrega o hero e a seção Quem é o 9, e a navbar já expõe o link `História do 9`
apontando para `#historia-do-9`. Porém o destino ainda não existe, deixando incompleta a terceira
seção prevista no projeto e quebrando a promessa de navegação da navbar.

## What Changes

- Adicionar uma seção `#historia-do-9` na landing page, renderizada logo após a seção `#quem-e-o-9`.
- Criar um componente Angular standalone `History` em `src/app/components/history/`, registrado em
  `App` e incluído no `<main>`.
- Compor no desktop duas colunas: à esquerda, título `HISTÓRIA DO 9` com sublinhado vermelho de
  pincel e dois parágrafos; à direita, a fotografia `/imgs/imagemParaHistoriaDo9.png` em moldura
  creme. No mobile, empilhar título, texto e fotografia em coluna única.
- Usar os textos exatos da referência visual aprovada, sem inventar fatos sobre a origem do apelido
  além do que está no material fornecido.
- Integrar a seção à navegação por âncoras já existente: link ativo `História do 9`, compensação da
  navbar fixa e rolagem suave com respeito a `prefers-reduced-motion`.
- Encerrar a seção com um separador tracejado discreto, coerente com o restante da página.
- Cobrir a nova seção com testes de componente.

## Capabilities

### New Capabilities

- `landing-page/history`: seção História do 9 da landing page — estrutura semântica, composição em
  duas colunas, título com sublinhado de pincel, narrativa da origem do apelido, fotografia emoldurada,
  adaptação responsiva e integração com a navegação por âncoras.

### Modified Capabilities

Nenhuma. A navegação já especifica o link e o destino `#historia-do-9`; a nova seção passa a cumprir
esse contrato sem alterar requisitos existentes.

## Impact

- **Código**: novo componente `src/app/components/history/` (`history.ts`, `history.html`,
  `history.css`, `history.spec.ts`); alterações em `src/app/app.ts` e `src/app/app.html`.
- **Ativos**: reutiliza `public/imgs/imagemParaHistoriaDo9.png` (321×340), já presente no repositório.
- **Estilos**: reaproveita os tokens de cor e a fonte display definidos em `src/styles.css` e o
  componente compartilhado `app-brush-underline`; não introduz dependências novas.
- **Navegação**: ativa o destino já referenciado pela navbar e pelos testes de seção ativa.
- **Fora de escopo**: footer, novas seções além da História do 9, backend e alterações no conteúdo
  das seções existentes.
