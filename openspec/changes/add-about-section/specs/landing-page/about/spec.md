# Spec Delta

## Purpose

Define a seção Quem é o 9 da landing page: banner panorâmico full-bleed, título com sublinhado de
pincel, biografia centralizada e integração com a navegação por âncoras já existente.

## ADDED Requirements

### Requirement: Estrutura da seção Quem é o 9

A página SHALL apresentar uma seção identificada por `quem-e-o-9`, rotulada pelo seu próprio título e
posicionada imediatamente após o hero, dentro do `<main>`. A seção SHALL conter um `h2` com o texto
`QUEM É O 9?` seguido de dois parágrafos de biografia, mantendo o `h1` `9000` do hero como único
título de nível 1 do documento.

#### Scenario: Seção presente e rotulada

- **WHEN** a página é renderizada
- **THEN** existe uma seção `#quem-e-o-9` cujo `aria-labelledby` aponta para o título da própria seção

#### Scenario: Hierarquia de títulos

- **WHEN** os títulos do documento são inspecionados
- **THEN** `9000` continua sendo o único `h1` e `QUEM É O 9?` é um `h2` da seção

#### Scenario: Posição na página

- **WHEN** a página é lida de cima para baixo
- **THEN** a seção `#quem-e-o-9` aparece depois do hero e antes do fim do `<main>`

### Requirement: Banner fotográfico full-bleed

A seção SHALL exibir `imagens/imagemParaQuemÉo9.png` em um banner que ocupa 100% da largura da
viewport, sem margens laterais, bordas ou cantos arredondados, cobrindo a área com `object-fit:
cover` e sem esticar a imagem. A imagem SHALL ter texto alternativo descritivo e espaço reservado
pelas dimensões declaradas.

#### Scenario: Largura total

- **WHEN** a seção é exibida em 1440 px de largura
- **THEN** o banner se estende de borda a borda da viewport, sem margem lateral, borda ou raio

#### Scenario: Sem distorção

- **WHEN** o banner é inspecionado em qualquer largura
- **THEN** a imagem mantém a proporção original, sem esticamento ou compressão

#### Scenario: Texto alternativo e carregamento

- **WHEN** a imagem é lida por um leitor de tela ou carregada fora da dobra
- **THEN** seu `alt` descreve a cena com as várias cópias de Victor Kovalski e a imagem usa
  carregamento preguiçoso com dimensões reservadas

### Requirement: Prioridade de enquadramento do banner

O banner SHALL priorizar os rostos em primeiro plano. Por causa da proporção do recorte disponível
(720×658), em larguras de desktop o `9.000` impresso no topo do arquivo MAY ficar fora do quadro; o
corte SHALL ser uniforme e não SHALL remover a fileira da frente.

#### Scenario: Enquadramento no desktop

- **WHEN** o banner é exibido em 1440 px de largura
- **THEN** a fileira da frente permanece visível e a imagem não é distorcida, ainda que o `9.000`
  do topo fique fora do recorte

#### Scenario: Enquadramento no mobile

- **WHEN** o banner é exibido em 375 px de largura
- **THEN** os rostos em primeiro plano continuam visíveis e não há rolagem horizontal

### Requirement: Título com sublinhado vermelho centralizado

A seção SHALL exibir o título `QUEM É O 9?` em caixa alta, na fonte display, cor creme e centralizado,
com tamanho entre aproximadamente 32 px e 64 px, acompanhado de um sublinhado vermelho `#d92e29`
irregular, centralizado, de 6 a 10 px de espessura e mais largo que o texto.

#### Scenario: Aparência no desktop

- **WHEN** o título é exibido no desktop
- **THEN** ele usa a fonte display, está centralizado e o sublinhado vermelho irregular fica logo
  abaixo, centralizado e mais largo que o texto

#### Scenario: Escala em telas pequenas

- **WHEN** o título é exibido em 375 px de largura
- **THEN** ele reduz proporcionalmente, permanece legível e não provoca rolagem horizontal

#### Scenario: Sublinhado artesanal

- **WHEN** o sublinhado é inspecionado visualmente
- **THEN** ele tem aparência de pincelada irregular, com espessura variável, e não de borda reta

### Requirement: Biografia centralizada

A seção SHALL exibir dois parágrafos centralizados em fonte monoespaçada, cor creme, com tamanho entre
20 e 24 px no desktop e 16 e 18 px no mobile, entrelinha próxima de 1.7 e largura de linha máxima de
aproximadamente 62 caracteres, separados por espaçamento vertical generoso e sem cards, caixas ou
fundos próprios.

#### Scenario: Conteúdo dos parágrafos

- **WHEN** a seção é renderizada
- **THEN** o primeiro parágrafo é exatamente "9000, ou simplesmente 9, é o nome pelo qual Victor
  Kovalski é conhecido. Desenvolvedor, estudante de Sistemas de Informação e apaixonado por
  tecnologia, ele busca unir criatividade, disciplina e aprendizado constante para tirar ideias do
  papel e transformá-las em soluções reais." e o segundo é exatamente "O 9 representa mais do que um
  apelido: é uma identidade construída ao longo de projetos, desafios e experiências que marcam sua
  trajetória, dentro e fora da programação.", sem texto inventado ou omitido

#### Scenario: Legibilidade no desktop

- **WHEN** o texto é exibido no desktop
- **THEN** cada linha tem no máximo cerca de 62 caracteres, o entrelinha fica próximo de 1.7 e os
  parágrafos ficam centralizados

#### Scenario: Legibilidade no mobile

- **WHEN** o texto é exibido em 375 px de largura
- **THEN** a fonte fica entre 16 e 18 px, o texto permanece centralizado e o padding lateral é de
  aproximadamente 20 px

#### Scenario: Sem caixas

- **WHEN** a seção é exibida
- **THEN** o texto aparece diretamente sobre o fundo escuro texturizado, sem card ou contêiner visual

### Requirement: Integração com a navegação por âncoras

A seção SHALL ser o destino de `#quem-e-o-9`, alcançável pelo link `Quem é o 9` da navbar e pelo CTA
do hero, com o início da seção visível abaixo da navbar fixa. Ao entrar na área de leitura, o link
correspondente SHALL ser o único marcado como atual.

#### Scenario: Link da navbar

- **WHEN** o usuário aciona `Quem é o 9` na navbar
- **THEN** a página rola até a seção `#quem-e-o-9` sem recarregar o documento

#### Scenario: CTA do hero

- **WHEN** o usuário aciona o botão `Quem é o 9` do hero
- **THEN** a página rola até a seção `#quem-e-o-9` sem recarregar o documento

#### Scenario: Link ativo

- **WHEN** a seção entra na área de leitura da viewport
- **THEN** `Quem é o 9` é o único link da navbar com pincelada amarela e `aria-current="location"`

#### Scenario: Compensação da navbar

- **WHEN** a rolagem para `#quem-e-o-9` termina
- **THEN** o título da seção aparece abaixo da navbar, sem ficar encoberto por ela

### Requirement: Adaptação responsiva da seção

A seção SHALL usar uma coluna única em telas menores que 1024 px, com o banner no topo, bloco textual
centralizado e tipografia reduzida. Em qualquer largura a seção SHALL permanecer dentro da viewport,
sem rolagem horizontal.

#### Scenario: Layout em 375 px

- **WHEN** a seção é exibida em 375 px de largura
- **THEN** banner, título e parágrafos aparecem empilhados, centralizados e sem cortes laterais

#### Scenario: Layout em 768 px

- **WHEN** a seção é exibida em 768 px de largura
- **THEN** o conteúdo permanece em coluna única, com o banner adaptado e sem overflow

#### Scenario: Sem overflow horizontal

- **WHEN** a seção é exibida em qualquer uma das larguras de referência
- **THEN** nenhum elemento ultrapassa a largura da viewport
