# Design

## Context

A aplicação é uma landing page Angular 22 com componentes standalone e `ChangeDetectionStrategy.OnPush`.
As seções existentes seguem o mesmo padrão: um componente em `src/app/components/<nome>/` com
`templateUrl` e `styleUrl`, estilos utilitários do Tailwind 4 e poucas regras locais para detalhes
visuais. Os tokens de cor e as fontes já estão definidos em `src/styles.css`; o componente compartilhado
`app-brush-underline` desenha os sublinhados de pincel e o observador em `src/app/shared/active-section.ts`
já controla o link ativo da navbar. A navbar já aponta para `#historia-do-9` e `styles.css` já inclui
esse id no `scroll-margin-top`. A fotografia `public/imgs/imagemParaHistoriaDo9.png` existe com
321×340 px. Ver `proposal.md` para a motivação.

## Goals / Non-Goals

**Goals:**

- Entregar a terceira seção da landing page como um componente isolado, sem estado próprio.
- Reproduzir a composição da referência visual: texto à esquerda, fotografia emoldurada à direita.
- Reaproveitar integralmente a identidade visual, os tokens e a navegação já existentes.
- Manter a seção acessível e responsiva entre 320 px e 1440 px.

**Non-Goals:**

- Criar footer, novas seções ou qualquer navegação adicional.
- Introduzir novos tokens, fontes, dependências ou padrões de estado.
- Implementar CMS, animações de entrada ou edição de conteúdo em tempo de execução.
- Alterar o conteúdo ou o layout das seções hero e Quem é o 9.

## Decisions

### Componente dedicado e sem estado

Criar `History` como componente standalone, apenas de apresentação, seguindo o padrão de `About` e
`Hero`: `templateUrl`, `styleUrl`, `OnPush` e import de `BrushUnderline`. O componente é registrado em
`App` e renderizado após `<app-about />` dentro do `<main>`.

- **Por quê**: mantém a organização por seção já adotada e permite testar a seção isoladamente.
- **Alternativa descartada**: renderizar a seção diretamente em `app.html`; reduziria a coesão e
  quebraria o padrão dos componentes existentes.

### Textos fixos no template

Os dois parágrafos e o título ficam no template, com `<strong>` apenas em `9000` e `Nove`, como na
referência. Não há modelo de dados, `input` ou serviço de conteúdo.

- **Por quê**: o conteúdo é editorial e fixo, assim como nas demais seções; a edição continua simples.
- **Alternativa descartada**: objeto de configuração em TypeScript; adicionaria indireção sem ganho.

### Grid de duas colunas com coluna única por padrão

Usar CSS Grid: uma coluna na base e `lg:grid-cols-[55%_45%]` a partir de 1024 px, com `items-center`
e `gap` generoso. O bloco textual vem primeiro no DOM; no mobile a ordem natural já é título, texto e
fotografia, sem necessidade de `order`.

- **Por quê**: atende à proporção 55/45 e preserva a ordem de leitura no mobile.
- **Alternativa descartada**: Flexbox com larguras percentuais; o Grid expressa a proporção e o
  empilhamento com menos regras.

### Reaproveitamento do sublinhado e da moldura

O título usa `font-display`, `text-ink`, `uppercase`, `clamp` de aproximadamente 2.5rem a 4.7rem e
`app-brush-underline variant="red"`, com largura local de cerca de 70% do bloco e altura de 6 a 10 px.
A fotografia usa a classe global `.photo-frame` (borda creme de 5 px, linha externa deslocada, cantos
retos, fundo escuro) e uma regra local para limitar a largura e preservar a proporção 321/340.

- **Por quê**: garante consistência com hero e about e evita duplicar SVGs ou bordas.
- **Alternativa descartada**: recriar o SVG do sublinhado e a moldura no componente; divergiria da
  identidade compartilhada.

### Integração pela âncora existente

A seção recebe `id="historia-do-9"` e `aria-labelledby` apontando para o `h2`. Nenhuma mudança é
necessária na navbar: `links` já inclui o destino e `observeActiveSections` já o observa quando o
elemento existe. A compensação da navbar vem do `scroll-margin-top` global já configurado.

- **Por quê**: evita tocar em código de navegação que já satisfaz o contrato.
- **Alternativa descartada**: adicionar lógica específica de scroll no componente; duplicaria o
  comportamento global.

### Imagem sem recorte e com largura limitada

Renderizar a foto com `width="321"`, `height="340"`, `loading="lazy"`, `decoding="async"` e
`object-fit: contain`/altura automática dentro de um contêiner de no máximo ~26rem. Não usar
`object-fit: cover`, para não cortar as pessoas.

- **Por quê**: a fonte é pequena (321×340); limitar a largura evita ampliação excessiva e mantém os
  rostos visíveis.
- **Trade-off**: no desktop a foto fica menor que a da referência, mas preserva nitidez e proporção.

### Teste de componente no padrão existente

Adicionar `history.spec.ts` com `TestBed`, verificando `section#historia-do-9`, `aria-labelledby`,
título, textos exatos, `src`, `alt`, `loading`, `decoding`, `width` e `height` da imagem.

- **Por quê**: os testes de `About` e `Hero` usam exatamente esse formato e cobrem o conteúdo
  editorial, que é o principal risco de regressão.

## Risks / Trade-offs

- **Fotografia de baixa resolução** → limitar a largura máxima da moldura e não aplicar zoom ou
  `cover`, evitando ampliação e cortes.
- **Título longo em telas estreitas** → usar `clamp()` e permitir quebra em duas linhas, sem
  `white-space: nowrap`; validar em 320 e 375 px.
- **Texto exato com aspas tipográficas** → copiar a narrativa da referência e verificar o conteúdo no
  teste de componente, evitando divergência de caracteres.
- **Separador duplicado com o fim da seção anterior** → usar apenas uma borda tracejada no fim desta
  seção, com espaçamento vertical equivalente ao do hero.
- **Link ativo dependente do observador existente** → validar manualmente a rolagem até a seção; não
  alterar `active-section.ts`, pois ele já trata seções presentes no DOM.

## Migration Plan

1. Adicionar o componente `History` e seu template/estilos.
2. Importar `History` em `App` e inserir `<app-history />` após `<app-about />`.
3. Executar os testes e o build; validar a seção em 375, 768 e 1440 px.
4. Rollback: remover a tag do template, o import de `App` e o diretório do componente; nenhum dado ou
   contrato externo é migrado.
