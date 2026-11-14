# landing-page/hero Specification

## Purpose

Define a seção de abertura da landing page do 9000: composição em duas colunas com fotografia
emoldurada e o `9` pintado ao fundo, apresentação do apelido e de Victor Kovalski, texto de contexto
e chamada para a seção seguinte.

## Requirements

### Requirement: Estrutura da seção de abertura

A página SHALL apresentar uma seção identificada por `#inicio`, rotulada por seu título, contendo
exatamente um `h1` com o texto `9000` — o único `h1` do documento — seguido do subtítulo
`Victor Kovalski`.

#### Scenario: Seção e título principal

- **WHEN** a página é renderizada
- **THEN** existe uma seção `#inicio` cujo primeiro título é o `h1` `9000`, e nenhum outro `h1`
  existe na página

#### Scenario: Subtítulo

- **WHEN** o conteúdo do hero é lido em sequência
- **THEN** `Victor Kovalski` aparece imediatamente após o título `9000`, como texto monoespaçado

### Requirement: Composição em duas colunas e adaptação mobile

No desktop a seção SHALL organizar fotografia à esquerda e conteúdo textual à direita, com proporção
aproximada de 47% para a fotografia e 53% para o texto. Em telas menores que 1024 px SHALL usar uma
única coluna, na ordem fotografia, título `9000`, `Victor Kovalski`, parágrafo e botão.

#### Scenario: Desktop em duas colunas

- **WHEN** a seção é exibida com 1024 px ou mais de largura
- **THEN** a fotografia ocupa a coluna esquerda e o bloco textual a coluna direita, em proporção
  próxima de 47/53

#### Scenario: Mobile em coluna única

- **WHEN** a seção é exibida com 375 px de largura
- **THEN** os elementos aparecem empilhados na ordem fotografia, `9000`, `Victor Kovalski`,
  parágrafo e botão

#### Scenario: Ordem de leitura preservada

- **WHEN** um leitor de tela percorre a seção em qualquer largura
- **THEN** o `h1` `9000` é anunciado antes do restante do conteúdo textual

### Requirement: Fotografia emoldurada com o 9 pintado

A seção SHALL exibir a fotografia `imagens/imagemParaHeroSection9.png` dentro de uma moldura creme de
proporção 4:3, com fundo interno escuro e um número `9` grande, creme e de baixa opacidade atrás da
pessoa, sem cobrir o rosto. A imagem SHALL ser preservada (sem distorção) e ocupar a maior parte da
altura da seção.

#### Scenario: Enquadramento da fotografia

- **WHEN** a fotografia do hero é exibida no desktop
- **THEN** ela aparece dentro de uma moldura creme 4:3, sem esticamento e com o rosto visível

#### Scenario: Nove pintado ao fundo

- **WHEN** a fotografia é exibida
- **THEN** há um `9` grande, creme e de baixa opacidade atrás da pessoa, visível nas áreas livres da
  moldura e sem encobrir o rosto

#### Scenario: Texto alternativo

- **WHEN** a imagem é lida por um leitor de tela
- **THEN** o texto alternativo descreve a cena de Victor Kovalski de moletom e celular, e não repete
  apenas "imagem de Victor"

#### Scenario: Carregamento prioritário sem deslocamento

- **WHEN** a página carrega
- **THEN** a fotografia tem carregamento prioritário e espaço reservado, sem salto de layout

### Requirement: Título 9000 com sublinhado vermelho

O título `9000` SHALL ser exibido na fonte display de pincel, em creme, com tamanho entre
aproximadamente 96 px e 120 px no desktop, acompanhado de um sublinhado vermelho `#d92e29`
irregular, com espessura visual de 8 a 10 px e extensão menor que a largura do título.

#### Scenario: Aparência do título

- **WHEN** o título `9000` é exibido no desktop
- **THEN** ele usa a fonte display, tem destaque visual dominante na seção e o sublinhado vermelho
  irregular fica logo abaixo, mais curto que o texto

#### Scenario: Escala em telas pequenas

- **WHEN** o título é exibido em 375 px de largura
- **THEN** ele reduz proporcionalmente, permanece em uma linha e não provoca rolagem horizontal

### Requirement: Texto de apresentação

A seção SHALL exibir o parágrafo:

> Conhecido como 9000, Victor Kovalski transforma ideias em projetos, mistura tecnologia,
> criatividade e propósito, e constrói sua própria trajetória dentro da área de desenvolvimento de
> software.

O parágrafo SHALL usar a fonte monoespaçada, cor creme, tamanho de 20 px no desktop, entrelinha de
aproximadamente 1.7 e largura de linha de no máximo 46 caracteres.

#### Scenario: Conteúdo do parágrafo

- **WHEN** o parágrafo de apresentação é renderizado
- **THEN** seu texto é exatamente o texto definido nesta especificação, com `9000` e `Victor
  Kovalski` presentes

#### Scenario: Legibilidade do parágrafo

- **WHEN** o parágrafo é exibido no desktop
- **THEN** cada linha tem no máximo 46 caracteres e o espaçamento entre linhas fica próximo de 1.7

### Requirement: CTA para a seção Quem é o 9

A seção SHALL exibir um botão amarelo `#f5bb08` com texto escuro `Quem é o 9` acompanhado de uma seta,
cantos retos e preenchimento generoso, que navega para `#quem-e-o-9` na mesma página. O botão SHALL
escurecer levemente no hover e exibir foco visível com anel escuro.

#### Scenario: Acionar o CTA

- **WHEN** o usuário aciona o botão `Quem é o 9`
- **THEN** a página navega para a seção `#quem-e-o-9` sem recarregar o documento

#### Scenario: Aparência do botão

- **WHEN** o botão é exibido
- **THEN** ele tem fundo amarelo, texto escuro, cantos retos e área acionável de pelo menos 44 px de
  altura

#### Scenario: Hover e foco

- **WHEN** o usuário passa o mouse ou foca o botão por teclado
- **THEN** o hover escurece levemente o fundo e o foco desenha um anel escuro visível contra o amarelo

### Requirement: Separador de fim de seção

Ao final da seção de abertura SHALL existir uma linha horizontal tracejada discreta em `#514a40`,
separando o hero da próxima seção.

#### Scenario: Separador visível

- **WHEN** o usuário rola até o fim do hero
- **THEN** uma linha tracejada horizontal separa o conteúdo do hero do conteúdo seguinte

#### Scenario: Sem overflow do separador

- **WHEN** o separador é exibido em 375 px de largura
- **THEN** ele permanece dentro da largura da viewport, sem criar rolagem horizontal
