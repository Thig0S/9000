# Spec Delta

## Purpose

Define a seção História do 9 da landing page: narrativa da origem do apelido 9000 em duas colunas,
título com sublinhado de pincel, fotografia emoldurada e integração com a navegação por âncoras.

## ADDED Requirements

### Requirement: Estrutura da seção História do 9

A página SHALL apresentar uma seção identificada por `historia-do-9`, rotulada pelo próprio título e
posicionada após a seção `quem-e-o-9`, dentro do `<main>`. A seção SHALL conter um `h2` com o texto
`HISTÓRIA DO NOVE`, mantendo o `h1` `9000` do hero como único título de nível 1.

#### Scenario: Seção presente e rotulada

- **WHEN** a página é renderizada
- **THEN** existe uma seção `#historia-do-9` cujo `aria-labelledby` aponta para o título da própria
  seção

#### Scenario: Hierarquia de títulos

- **WHEN** os títulos do documento são inspecionados
- **THEN** `9000` continua sendo o único `h1` e `HISTÓRIA DO NOVE` é um `h2` da seção

#### Scenario: Posição na página

- **WHEN** a página é lida de cima para baixo
- **THEN** a seção `#historia-do-9` aparece depois da seção `#quem-e-o-9` e antes do fim do `<main>`

### Requirement: Composição em duas colunas

No desktop a seção SHALL organizar o bloco textual à esquerda, com aproximadamente 55% da largura, e
a fotografia à direita, com aproximadamente 45%, alinhados verticalmente ao centro. A seção SHALL
manter espaçamento interno coerente com o restante da página.

#### Scenario: Desktop em duas colunas

- **WHEN** a seção é exibida com 1024 px ou mais de largura
- **THEN** título, sublinhado e parágrafos ocupam a coluna esquerda e a fotografia ocupa a coluna
  direita

#### Scenario: Alinhamento vertical

- **WHEN** a seção é exibida no desktop
- **THEN** a fotografia fica verticalmente equilibrada em relação ao bloco textual, sem ultrapassar
  a altura disponível da seção

### Requirement: Título com sublinhado vermelho à esquerda

A seção SHALL exibir o título `HISTÓRIA DO NOVE` em caixa alta, na fonte display, cor creme e alinhado
à esquerda, com tamanho entre aproximadamente 40 px e 75 px no desktop, acompanhado de um sublinhado
vermelho `#d92e29` irregular, com espessura visual de 6 a 10 px, posicionado logo abaixo do texto e
alinhado à esquerda.

#### Scenario: Aparência no desktop

- **WHEN** o título é exibido no desktop
- **THEN** ele usa a fonte display, está alinhado à esquerda e o sublinhado vermelho irregular fica
  logo abaixo do texto, começando na mesma borda esquerda

#### Scenario: Escala em telas pequenas

- **WHEN** o título é exibido em 375 px de largura
- **THEN** ele reduz proporcionalmente, permanece legível e não provoca rolagem horizontal

#### Scenario: Sublinhado artesanal

- **WHEN** o sublinhado é inspecionado visualmente
- **THEN** ele tem aparência de pincelada irregular, com espessura variável, e não de borda reta

### Requirement: Conteúdo da história

A seção SHALL exibir dois parágrafos em fonte monoespaçada, cor creme, alinhados à esquerda, com
tamanho entre 20 e 23 px no desktop, entrelinha próxima de 1.6 e separação vertical generosa entre
eles. O texto SHALL reproduzir exatamente a narrativa fornecida, sem inventar acontecimentos, datas,
diálogos ou pessoas.

#### Scenario: Conteúdo dos parágrafos

- **WHEN** a seção é renderizada
- **THEN** o primeiro parágrafo é exatamente "O nome 9000 (ou simplesmente Nove) surgiu de forma
  natural, entre amigos, e rapidamente se tornou parte da sua identidade. Tudo começou com uma
  brincadeira em um grupo, quando, em meio a várias ideias de apelido, alguém soltou “nove mil”. A
  piada pegou, e o que era apenas um comentário descontraído logo virou o seu vulgo." e o segundo é
  exatamente "Desde então, o 9000 acompanha Victor Kovalski em projetos, estudos e na sua jornada na
  área de tecnologia, representando mais do que um apelido: é uma marca da sua história, das
  amizades que construiu e de tudo que vem desenvolvendo ao longo do caminho."

#### Scenario: Legibilidade no desktop

- **WHEN** o texto é exibido no desktop
- **THEN** os parágrafos ficam alinhados à esquerda, com entrelinha próxima de 1.6 e largura de linha
  que preserve a leitura confortável

#### Scenario: Destaques discretos

- **WHEN** as palavras `9000` e `Nove` aparecem no texto
- **THEN** elas recebem destaque discreto em negrito, sem alterar o restante da tipografia

#### Scenario: Conteúdo não inventado

- **WHEN** o texto da seção é revisado
- **THEN** ele não afirma origem, data, local ou participantes do apelido além do que consta na
  narrativa fornecida

### Requirement: Fotografia emoldurada

A seção SHALL exibir a fotografia `imgs/imagemParaHistoriaDo9.png` em uma moldura creme de
aproximadamente 5 a 6 px, com cantos retos e fundo interno escuro, preservando a proporção original
da imagem. A fotografia SHALL ter texto alternativo descritivo e carregamento preguiçoso com
dimensões reservadas.

#### Scenario: Moldura aplicada

- **WHEN** a fotografia é exibida
- **THEN** ela apresenta moldura creme, cantos retos e a imagem original sem distorção

#### Scenario: Texto alternativo e carregamento

- **WHEN** a imagem é lida por um leitor de tela ou carregada fora da dobra
- **THEN** seu `alt` descreve Victor Kovalski e a outra pessoa na cena e a imagem usa carregamento
  preguiçoso com dimensões declaradas

#### Scenario: Preservação das pessoas

- **WHEN** a fotografia é exibida
- **THEN** as pessoas e a cena originais são preservadas, sem substituição, recorte de rostos ou
  alteração da composição

### Requirement: Integração com a navegação por âncoras

A seção SHALL ser o destino de `#historia-do-9`, alcançável pelo link `História do 9` da navbar, com o
início da seção visível abaixo da navbar fixa. Ao entrar na área de leitura, o link correspondente
SHALL ser o único marcado como atual.

#### Scenario: Link da navbar

- **WHEN** o usuário aciona `História do 9` na navbar
- **THEN** a página rola até a seção `#historia-do-9` sem recarregar o documento

#### Scenario: Link ativo

- **WHEN** a seção entra na área de leitura da viewport
- **THEN** `História do 9` é o único link da navbar com pincelada amarela e `aria-current="location"`

#### Scenario: Compensação da navbar

- **WHEN** a rolagem para `#historia-do-9` termina
- **THEN** o título da seção aparece abaixo da navbar, sem ficar encoberto por ela

### Requirement: Separador de fim de seção

Ao final da seção SHALL existir uma linha horizontal tracejada discreta em `#514a40`, separando a
História do 9 do conteúdo seguinte e permanecendo dentro da largura da viewport.

#### Scenario: Separador visível

- **WHEN** o usuário rola até o fim da seção
- **THEN** uma linha tracejada horizontal separa o conteúdo da História do 9 do que vem depois

#### Scenario: Sem overflow do separador

- **WHEN** o separador é exibido em 375 px de largura
- **THEN** ele permanece dentro da largura da viewport, sem criar rolagem horizontal

### Requirement: Adaptação responsiva da seção

Em telas menores que 1024 px a seção SHALL usar uma coluna única, na ordem título, texto e fotografia,
com tipografia reduzida e padding lateral de aproximadamente 20 px. Em qualquer largura a seção SHALL
permanecer dentro da viewport, sem rolagem horizontal.

#### Scenario: Layout em 375 px

- **WHEN** a seção é exibida em 375 px de largura
- **THEN** título, texto e fotografia aparecem empilhados, alinhados de forma legível e sem cortes
  laterais

#### Scenario: Layout em 768 px

- **WHEN** a seção é exibida em 768 px de largura
- **THEN** o conteúdo permanece em coluna única, com a fotografia adaptada e sem overflow

#### Scenario: Sem overflow horizontal

- **WHEN** a seção é exibida em qualquer uma das larguras de referência
- **THEN** nenhum elemento ultrapassa a largura da viewport
