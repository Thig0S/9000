# Spec Delta

## Purpose

Define a identidade visual compartilhada da landing page do 9000 — fundo escuro granulado, paleta
underground, tipografia expressiva, molduras de fotografia e comportamento de foco e movimento — para
que todas as seções pareçam parte da mesma publicação impressa.

## ADDED Requirements

### Requirement: Fundo escuro com granulado estático

A página SHALL exibir o fundo `#141311` coberto por uma textura de granulado monocromático sutil, de
baixa opacidade, aplicada atrás de todo o conteúdo, sem animação e sem capturar interação do usuário.

#### Scenario: Granulado presente na página

- **WHEN** a página é carregada
- **THEN** o fundo visível é escuro e apresenta a textura de granulado atrás do conteúdo

#### Scenario: Granulado não intercepta interação

- **WHEN** o usuário clica ou seleciona texto sobre a área granulado
- **THEN** o clique e a seleção atingem o conteúdo normalmente, como se a textura não existisse

#### Scenario: Granulado estático

- **WHEN** a página é exibida com `prefers-reduced-motion: reduce` ou sem essa preferência
- **THEN** a textura permanece idêntica e imóvel nos dois casos

### Requirement: Paleta da identidade

A página SHALL usar exclusivamente a paleta `#141311` (fundo), `#1b1917` (fundo alternativo),
`#f3ead8` (texto), `#c8beae` (texto secundário), `#f5bb08` (destaque), `#d92e29` (linhas e
pinceladas), `#eee4cf` (molduras) e `#514a40` (traços), e MUST NOT introduzir gradientes coloridos,
azul, roxo, glassmorphism ou sombras luminosas.

#### Scenario: Contraste de texto

- **WHEN** qualquer texto de conteúdo é renderizado sobre o fundo escuro
- **THEN** a razão de contraste é de no mínimo 4,5:1 (AA) e o texto de corpo atinge pelo menos 7:1

#### Scenario: Texto sobre o botão de destaque

- **WHEN** o texto do CTA é renderizado sobre o fundo amarelo `#f5bb08`
- **THEN** a razão de contraste entre o texto escuro e o amarelo é de no mínimo 4,5:1

#### Scenario: Ausência de efeitos proibidos

- **WHEN** a página é inspecionada visualmente
- **THEN** não há gradiente colorido, transparência de vidro nem brilho neon em nenhum elemento

### Requirement: Tipografia em duas famílias

Os elementos expressivos (logo `9`, título `9000` e títulos de seção) SHALL usar uma fonte display de
pincel, e navegação, subtítulos, parágrafos e botões SHALL usar uma fonte monoespaçada com aparência
de máquina de escrever. As duas famílias SHALL ser servidas pelo próprio site, com fallback legível
quando não carregarem.

#### Scenario: Títulos em fonte display

- **WHEN** o logo, o título `9000` ou um título de seção é renderizado
- **THEN** ele aparece na fonte display de pincel, não na fonte monoespaçada

#### Scenario: Corpo e navegação em monoespaçada

- **WHEN** links da navbar, subtítulo, parágrafos ou botão são renderizados
- **THEN** eles aparecem na fonte monoespaçada de máquina de escrever

#### Scenario: Fallback sem as fontes

- **WHEN** os arquivos de fonte não são carregados
- **THEN** os títulos caem em uma cursiva de sistema e os textos em uma monoespaçada de sistema, sem
  perda de legibilidade

#### Scenario: Fontes sem dependência de terceiros

- **WHEN** a página é carregada com a rede externa bloqueada
- **THEN** as duas famílias continuam sendo aplicadas, pois são servidas pelo próprio site

### Requirement: Molduras de fotografia

Toda fotografia exibida em moldura SHALL ter borda creme de aproximadamente 5 px, cantos retos, uma
linha externa fina deslocada da borda e fundo interno escuro, preservando a proporção da imagem.

#### Scenario: Moldura aplicada à fotografia

- **WHEN** uma fotografia emoldurada é exibida
- **THEN** ela apresenta a borda creme, a linha externa deslocada e cantos sem arredondamento

#### Scenario: Imagem com transparência

- **WHEN** uma fotografia com fundo transparente é exibida na moldura
- **THEN** a transparência mostra o fundo interno escuro da moldura, não a cor da página

### Requirement: Foco visível e seleção de texto

Todo elemento interativo SHALL exibir um anel de foco visível quando recebe foco por teclado, e a
seleção de texto SHALL usar o amarelo de destaque sobre texto escuro.

#### Scenario: Foco por teclado

- **WHEN** o usuário percorre a página com Tab
- **THEN** cada link e botão exibe um contorno visível, com contraste suficiente contra o fundo

#### Scenario: Seleção de texto

- **WHEN** o usuário seleciona um trecho de texto
- **THEN** o realce usa o amarelo de destaque com texto escuro, permanecendo legível

### Requirement: Respeito ao movimento reduzido

Quando o sistema declara preferência por movimento reduzido, a navegação entre âncoras SHALL ser
instantânea e as transições e animações SHALL ser suprimidas.

#### Scenario: Salto de âncora com movimento reduzido

- **WHEN** `prefers-reduced-motion: reduce` está ativo e o usuário aciona um link de âncora
- **THEN** a página salta diretamente para o destino, sem rolagem animada

#### Scenario: Rolagem suave sem a preferência

- **WHEN** `prefers-reduced-motion` não está ativo e o usuário aciona um link de âncora
- **THEN** a página rola suavemente até o destino

### Requirement: Metadados e idioma do documento

O documento SHALL declarar idioma `pt-BR`, título `9000 — Victor Kovalski`, descrição para
mecanismos de busca, cor de tema `#141311` e esquema de cores escuro.

#### Scenario: Documento carregado

- **WHEN** a página é carregada no navegador
- **THEN** o elemento raiz declara `lang="pt-BR"`, o título é `9000 — Victor Kovalski` e existe meta
  description preenchida

#### Scenario: Aparência do navegador em tema escuro

- **WHEN** o navegador aplica a cor de tema declarada
- **THEN** a barra de interface usa `#141311`

### Requirement: Ausência de rolagem horizontal

A página SHALL se adaptar a larguras entre 320 px e 1440 px sem produzir rolagem horizontal.

#### Scenario: Largura mínima suportada

- **WHEN** a página é exibida em uma viewport de 320 px de largura
- **THEN** nenhum conteúdo ultrapassa a borda direita e não existe rolagem horizontal

#### Scenario: Largura desktop

- **WHEN** a página é exibida em uma viewport de 1440 px de largura
- **THEN** o layout ocupa a largura disponível sem barras de rolagem horizontais
