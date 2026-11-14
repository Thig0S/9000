# landing-page/navigation Specification

## Purpose

Define a navegação principal da landing page do 9000: identificação da marca pelo glifo `9`, acesso
direto às três seções por âncoras, indicação da seção atual e comportamento fixo e responsivo em
qualquer tamanho de tela.

## Requirements

### Requirement: Conteúdo e semântica da navbar

A página SHALL apresentar um cabeçalho com um marco de navegação rotulado, contendo o glifo `9` à
esquerda — link com nome acessível que leva ao início da página — e, à direita, os links `Início`,
`Quem é o 9` e `História do 9`, nesta ordem, apontando respectivamente para `#inicio`,
`#quem-e-o-9` e `#historia-do-9`.

#### Scenario: Estrutura da navbar

- **WHEN** a página é renderizada
- **THEN** existe um `header` com um `nav` rotulado, um link para `#inicio` com nome acessível e os
  três links na ordem `Início`, `Quem é o 9`, `História do 9`

#### Scenario: Destinos dos links

- **WHEN** os links da navbar são inspecionados
- **THEN** seus destinos são exatamente `#inicio`, `#quem-e-o-9` e `#historia-do-9`

#### Scenario: Logo leva ao início

- **WHEN** o usuário aciona o glifo `9`
- **THEN** a página navega para a seção `#inicio`

### Requirement: Navbar fixa com divisória vermelha

A navbar SHALL permanecer visível no topo durante a rolagem, com fundo escuro opaco igual ao da
página, e SHALL ter abaixo de si uma linha vermelha `#d92e29` contínua de aproximadamente 4 px
ocupando toda a largura da viewport.

#### Scenario: Navbar visível durante a rolagem

- **WHEN** o usuário rola a página até o fim da seção do hero
- **THEN** a navbar continua visível no topo, sem transparência

#### Scenario: Divisória de largura total

- **WHEN** a navbar é exibida em qualquer largura de tela
- **THEN** a linha vermelha se estende de borda a borda da viewport

### Requirement: Indicação da seção ativa

A navbar SHALL destacar exatamente um link como seção atual, com pincelada amarela sob o texto e
`aria-current="location"`, e SHALL atualizar esse destaque conforme a seção visível muda durante a
rolagem. Enquanto apenas a seção `#inicio` existir, `Início` SHALL ser o link ativo.

#### Scenario: Estado inicial

- **WHEN** a página é carregada no topo
- **THEN** `Início` é o único link com pincelada amarela e `aria-current="location"`

#### Scenario: Destaque acompanha a rolagem

- **WHEN** outra seção entra na área de leitura da viewport
- **THEN** o link correspondente passa a ser o único ativo e o anterior perde o destaque

#### Scenario: Destino ainda inexistente

- **WHEN** o usuário aciona `Quem é o 9` ou `História do 9` e a seção de destino ainda não existe
- **THEN** a página não quebra e o link ativo permanece o último válido

#### Scenario: Destaque não depende só de cor

- **WHEN** o link ativo é lido por um leitor de tela
- **THEN** o estado é anunciado por `aria-current`, além da pincelada visual

### Requirement: Navegação por âncoras com compensação da navbar

Os links da navbar SHALL navegar dentro da mesma página, sem recarregar a aplicação, e SHALL deixar o
início da seção de destino visível abaixo da navbar, nunca encoberto por ela.

#### Scenario: Navegação sem recarregar

- **WHEN** o usuário aciona um link da navbar
- **THEN** a página rola para o destino sem recarregar o documento

#### Scenario: Título do destino não encoberto

- **WHEN** a rolagem para `#inicio` termina
- **THEN** o conteúdo inicial da seção aparece abaixo da navbar, sem sobreposição

### Requirement: Adaptação responsiva da navbar

Em telas largas a navbar SHALL exibir o logo e os três links em uma única linha, com espaçamento
generoso. Em telas menores que 768 px SHALL reorganizar-se em duas linhas — logo na primeira, os três
links na segunda — reduzindo a tipografia, mantendo as três opções visíveis e sem menu hambúrguer.

#### Scenario: Layout desktop

- **WHEN** a página é exibida com 1024 px ou mais de largura
- **THEN** logo e links ocupam uma única linha horizontal

#### Scenario: Layout mobile sem overflow

- **WHEN** a página é exibida com 375 px de largura
- **THEN** o logo fica na primeira linha, os três links na segunda, todos visíveis, e não há rolagem
  horizontal

#### Scenario: Área de toque adequada

- **WHEN** os links são usados em tela sensível ao toque
- **THEN** cada link tem área acionável de pelo menos 24 × 24 px

### Requirement: Acessibilidade da navbar

Todos os links SHALL ser alcançáveis por teclado na ordem visual, exibir foco visível e manter
contraste adequado entre texto creme e fundo escuro.

#### Scenario: Percorrer a navbar com Tab

- **WHEN** o usuário pressiona Tab a partir do início do documento
- **THEN** o logo e os três links recebem foco em sequência, cada um com contorno visível
