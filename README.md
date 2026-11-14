# 9000 — Landing Page Oficial

Landing page pessoal dedicada a **Victor Kovalski**, conhecido pelo apelido **9000**, ou simplesmente **Nove**.

O objetivo é apresentar quem é o 9000, sua identidade e a história por trás de seu apelido, por meio de uma experiência visual inspirada na estética urbana, underground e vintage do site [SkateArchive](https://skatearchive.com).

A aplicação deve ser uma landing page moderna, responsiva, visualmente marcante e fiel às referências de design fornecidas.

---

## 1. Visão geral do projeto

### Objetivo

Desenvolver uma landing page pessoal para Victor Kovalski, conhecido como 9000, contendo três seções principais:

1. **Início** — Hero Section apresentando o 9000.
2. **Quem é o 9?** — About Me, apresentando Victor Kovalski.
3. **História do 9** — Seção contando a origem do apelido 9000.

A landing page será uma aplicação de página única (*Single Page Application*), com navegação por âncoras e rolagem suave entre as seções.

### Tecnologias

Utilizar as seguintes tecnologias:

- Angular (versão estável compatível com o ambiente).
- TypeScript.
- HTML5 semântico.
- SCSS.
- Angular Standalone Components.
- Bootstrap Icons, apenas se necessário.
- Google Fonts ou fontes locais licenciadas.

Não utilizar backend, banco de dados ou autenticação.

Priorizar CSS/SCSS personalizado para reproduzir a identidade visual.

---

## 2. Identidade visual

### Referência principal

Site: https://skatearchive.com

A landing page deve seguir fielmente a linguagem visual da referência, especialmente:

- Fundo escuro com textura granulada.
- Estética underground e skate dos anos 1990/2000.
- Tipografia expressiva, irregular e desgastada.
- Textos secundários com aparência de máquina de escrever.
- Paleta composta por preto, creme, vermelho e amarelo.
- Bordas claras ao redor das fotografias.
- Linhas divisórias vermelhas.
- Sublinhados vermelhos com aparência de pincel.
- Botões amarelos com texto escuro.
- Composição editorial, semelhante a uma revista de skate.
- Poucos elementos decorativos, evitando excesso de efeitos modernos.

**Importante:** o objetivo não é copiar o código ou os elementos proprietários do SkateArchive, mas reproduzir sua linguagem estética com uma identidade própria para o 9000.

### 2.1. Paleta de cores

Utilizar as seguintes variáveis SCSS:

```scss
$background-primary: #141311;
$background-secondary: #1b1917;

$text-primary: #f3ead8;
$text-secondary: #c8beae;

$accent-yellow: #f5bb08;
$accent-red: #d92e29;

$border-light: #eee4cf;
$border-muted: #514a40;
```

Aplicação das cores:

| Elemento | Cor |
|---|---|
| Fundo principal | `#141311` |
| Fundo alternativo | `#1b1917` |
| Títulos | `#f3ead8` |
| Textos | `#f3ead8` |
| Textos secundários | `#c8beae` |
| Logo 9 | `#f5bb08` |
| Botões | `#f5bb08` |
| Linhas e sublinhados | `#d92e29` |
| Bordas das imagens | `#eee4cf` |

Evitar gradientes coloridos, roxo, azul, glassmorphism e sombras luminosas.

### 2.2. Tipografia

Utilizar duas famílias tipográficas principais.

**Títulos e elementos expressivos:**

Preferencialmente uma fonte com aparência de pincel, graffiti ou escrita manual irregular.

Sugestões:

- Permanent Marker.
- Rock Salt.
- Outra fonte licenciada visualmente mais próxima da referência.

Aplicações:

- Logo 9.
- Título 9000.
- Quem é o 9?
- História do Nove.

**Textos e navegação:**

Utilizar uma fonte monoespaçada com aparência de máquina de escrever.

Sugestões:

- Special Elite.
- Courier Prime.
- Courier New como fallback.

Aplicações:

- Navbar.
- Parágrafos.
- Subtítulos.
- Botões.

Exemplo de configuração:

```scss
$font-heading: "Permanent Marker", cursive;
$font-body: "Special Elite", monospace;
```

A tipografia deve transmitir uma estética vintage, artesanal e urbana.

### 2.3. Textura de fundo

O fundo não deve ser preto sólido.

Adicionar uma textura discreta de ruído/granulação, semelhante a papel antigo ou fotografia analógica.

Requisitos:

- Textura muito sutil.
- Baixa opacidade.
- Não comprometer a legibilidade.
- Aplicada consistentemente em todas as seções.
- Não utilizar animação no ruído.

Preferir um pequeno arquivo de textura otimizado, repetido por CSS.

### 2.4. Elementos decorativos

**Sublinhados vermelhos:**

Os títulos principais devem possuir um sublinhado vermelho com aparência de pincel.

O sublinhado deve:

- Ser irregular.
- Ter espessura visual de aproximadamente 5 a 9 pixels em desktop.
- Ficar imediatamente abaixo do título.
- Não parecer uma borda CSS perfeitamente reta.

Pode ser implementado utilizando SVG próprio.

**Linhas divisórias:**

Utilizar dois tipos:

- Linha vermelha contínua abaixo da navbar.
- Linha horizontal pontilhada ou tracejada em creme/cinza escuro para separar conteúdos.

**Fotografias:**

Utilizar molduras claras, ligeiramente grossas, com aparência de fotografias impressas.

Evitar:

- Bordas arredondadas exageradas.
- Sombras modernas.
- Glassmorphism.
- Efeitos 3D.

---

## 3. Estrutura geral da página

A aplicação deve possuir a seguinte organização:

```text
App
│
├── Navbar
│
├── Main
│   │
│   ├── Hero Section
│   │
│   ├── About Section
│   │   ├── Banner 9000
│   │   └── Quem é o 9?
│   │
│   └── History Section
│       ├── História do Nove
│       └── Fotografia
│
└── Footer (opcional e discreto)
```

Todas as seções devem estar na mesma página.

A navbar deve permitir a navegação para as seções correspondentes sem recarregar a aplicação.

---

## 4. Navbar

### Layout desktop

A navbar deve ocupar toda a largura da página.

**Lado esquerdo:**

Exibir o número `9` em destaque.

Características:

- Cor amarela.
- Fonte estilo pincel.
- Tamanho aproximado de 70px no desktop.
- Aparência irregular.
- Funcionar como link para o início da página.

**Lado direito:**

Exibir os links:

- Início
- Quem é o 9
- História do 9

Características:

- Fonte monoespaçada.
- Cor creme.
- Espaçamento generoso.
- Alinhamento horizontal.
- Tamanho aproximado de 20px.

### Estado ativo

O link correspondente à seção atual deve receber um sublinhado amarelo.

O sublinhado deve ter aparência artesanal, semelhante a uma pincelada.

Ao navegar entre as seções, atualizar o link ativo.

### Divisória

Abaixo da navbar deve existir uma linha vermelha horizontal, ocupando 100% da largura da tela.

Espessura aproximada: 4px.

### Comportamento

- Navbar fixa ou sticky no topo.
- Navegação suave.
- Destaque do link ativo.
- Links acessíveis por teclado.
- Compensar a altura da navbar ao navegar por âncoras.

### Responsividade

Em telas pequenas:

- Reduzir o tamanho do logo.
- Utilizar menu compacto quando necessário.
- Preservar as três opções de navegação.
- Não permitir overflow horizontal.

---

## 5. Hero Section — Início

ID: `inicio`

### Objetivo

Apresentar Victor Kovalski como 9000.

A seção deve ser o principal destaque visual da landing page.

### Layout desktop

Utilizar duas colunas:

- Esquerda: fotografia de Victor Kovalski.
- Direita: título, nome, descrição e botão.

Distribuição aproximada:

- Imagem: 52%.
- Conteúdo textual: 48%.

Utilizar espaçamento generoso entre os elementos.

### 5.1. Fotografia

Utilizar a primeira imagem fornecida, mostrando Victor Kovalski com um moletom preto, capuz e celular.

A fotografia original deve ser preservada.

Requisitos:

- Moldura clara com aproximadamente 5px.
- Fundo interno escuro.
- Imagem proporcional.
- Pessoa centralizada.
- Não cortar o rosto.
- Não distorcer a fotografia.

Adicionar um grande número `9` desgastado ao fundo da fotografia.

Esse número deve:

- Aparecer atrás da pessoa.
- Ter coloração creme/cinza.
- Possuir baixa opacidade.
- Parecer pintado sobre uma parede.
- Não atrapalhar o destaque da pessoa.

### 5.2. Conteúdo textual

Título principal:

**9000**

Características:

- Fonte estilo pincel.
- Cor creme.
- Tamanho aproximado de 100 a 120px em desktop.
- Sublinhado vermelho irregular.
- Grande destaque visual.

Subtítulo:

**Victor Kovalski**

Características:

- Fonte monoespaçada.
- Cor creme.
- Tamanho aproximado de 38 a 44px.
- Peso visual forte.

Descrição sugerida:

"Conhecido como 9000, Victor Kovalski carrega uma identidade que vai muito além de um simples apelido. Uma história construída entre amizades, momentos e experiências que transformaram o Nove em uma figura única."

Não apresentar informações biográficas não confirmadas como fatos.

### 5.3. Botão

Texto:

**Quem é o 9 →**

Estilo:

- Fundo amarelo.
- Texto preto.
- Fonte monoespaçada em negrito.
- Bordas retas.
- Padding generoso.
- Sem border-radius exagerado.

Comportamento:

Ao clicar, navegar suavemente para a seção `quem-e-o-9`.

### 5.4. Separador

Ao final da Hero Section, adicionar uma linha horizontal tracejada.

A linha deve ser discreta, em cinza/creme escuro.

### 5.5. Responsividade

Em dispositivos móveis:

1. Exibir fotografia primeiro.
2. Exibir título 9000.
3. Exibir Victor Kovalski.
4. Exibir descrição.
5. Exibir botão.

Centralizar os elementos quando apropriado.

Reduzir o título proporcionalmente utilizando `clamp()`.

---

## 6. About Section — Quem é o 9?

ID: `quem-e-o-9`

### Objetivo

Apresentar o 9000 de maneira pessoal, com destaque para sua identidade e o significado do apelido.

A seção será composta por duas partes:

1. Banner fotográfico horizontal.
2. Conteúdo textual centralizado.

### 6.1. Banner fotográfico

Utilizar a segunda imagem fornecida, que apresenta diversas cópias de Victor Kovalski e o número 9.000.

A imagem deve aparecer imediatamente abaixo da Hero Section.

**Requisitos principais:**

- Ocupar 100% da largura da página.
- Não possuir margens laterais.
- Não utilizar bordas.
- Funcionar como um banner panorâmico.
- Ter aproximadamente 50vh de altura no desktop.
- Utilizar `object-fit: cover`.
- Preservar o destaque das pessoas na composição.
- Manter o número 9.000 visível, quando possível.

Exemplo:

```scss
.about-banner {
  width: 100%;
  height: 50vh;
  min-height: 300px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
}
```

Em dispositivos móveis, adaptar a altura e o enquadramento para evitar cortes excessivos.

Não esticar a imagem.

### 6.2. Conteúdo About Me

Abaixo do banner, criar uma área de texto centralizada.

Fundo:

`#141311`

Título:

**QUEM É O 9?**

Características:

- Centralizado.
- Fonte estilo pincel.
- Cor creme.
- Tamanho aproximado de 65px no desktop.
- Sublinhado vermelho irregular.

### 6.3. Texto

Utilizar um container centralizado com largura máxima de aproximadamente 900px.

Texto sugerido:

"9000, ou simplesmente 9, é o nome pelo qual Victor Kovalski ficou conhecido. Mais do que um número, o apelido se tornou uma forma de identificação, acompanhando momentos, amizades e experiências que fazem parte de sua trajetória."

Segundo parágrafo:

"O Nove representa uma identidade que foi ganhando significado com o tempo. Uma história que começou de maneira simples, mas que se transformou em algo reconhecido por aqueles que fazem parte de sua vida."

Esses textos são provisórios e podem ser substituídos pela biografia verdadeira.

### 6.4. Estilização dos textos

- Alinhamento centralizado.
- Fonte monoespaçada.
- Cor creme.
- Tamanho entre 20 e 24px no desktop.
- Line-height entre 1.6 e 1.8.
- Espaçamento generoso entre parágrafos.
- Padding vertical de aproximadamente 80px.

Não utilizar cards ou caixas ao redor dos textos.

O conteúdo deve aparecer diretamente sobre o fundo escuro texturizado.

### 6.5. Responsividade

Em dispositivos móveis:

- Reduzir o título.
- Utilizar padding lateral de 20px.
- Reduzir a fonte dos parágrafos para aproximadamente 16 a 18px.
- Preservar alinhamento centralizado.
- Evitar linhas excessivamente compridas.

---

## 7. History Section — História do Nove

ID: `historia-do-9`

### Objetivo

Contar a história de como Victor Kovalski recebeu o apelido 9000.

### Layout desktop

Utilizar duas colunas:

**Esquerda:**

- Título.
- Sublinhado vermelho.
- Texto contando a história.

**Direita:**

- Fotografia enviada com Victor Kovalski e outra pessoa.

Distribuição aproximada:

- Conteúdo textual: 55%.
- Fotografia: 45%.

### 7.1. Título

Texto:

**HISTÓRIA DO NOVE**

Características:

- Fonte estilo pincel.
- Cor creme.
- Tamanho aproximado de 65 a 75px.
- Sublinhado vermelho irregular.
- Alinhado à esquerda.

### 7.2. Texto da história

O conteúdo deve explicar como surgiu o apelido 9000.

**Importante:** a origem exata do apelido ainda não foi informada. Portanto, não inventar acontecimentos, diálogos, datas ou pessoas.

Utilizar o seguinte texto provisório:

"Todo apelido tem uma origem. Alguns surgem de momentos inesperados, outros de brincadeiras entre amigos. Com Victor Kovalski, o nome 9000 acabou se tornando parte de sua identidade, passando a acompanhá-lo em diferentes momentos de sua vida."

Segundo parágrafo:

"Com o passar do tempo, o apelido ganhou reconhecimento entre as pessoas próximas. Hoje, ser chamado de Nove representa muito mais do que um número: é uma lembrança das histórias, amizades e experiências que ajudaram a construir quem ele é."

Esses parágrafos devem ser facilmente editáveis.

Não afirmar que o apelido surgiu de uma brincadeira específica sem confirmação.

### 7.3. Estilo textual

- Fonte monoespaçada.
- Cor creme.
- Tamanho aproximado de 20 a 23px.
- Line-height de 1.6.
- Alinhamento à esquerda.
- Parágrafos separados por espaçamento vertical.
- Destaque discreto para palavras como `9000` e `Nove`, utilizando negrito.

### 7.4. Fotografia

Utilizar a terceira imagem fornecida, que mostra Victor Kovalski sentado em uma cadeira amarela, acompanhado por outra pessoa.

Requisitos:

- Manter a fotografia original.
- Não substituir pessoas.
- Não alterar rostos.
- Preservar a proporção.
- Moldura clara com aproximadamente 6px.
- Alinhamento vertical centralizado em relação ao texto.
- Tamanho visualmente equilibrado com a coluna esquerda.

A fotografia deve transmitir uma estética de lembrança pessoal, combinando com o estilo vintage da página.

### 7.5. Responsividade

Em dispositivos móveis:

1. Título História do Nove.
2. Texto da história.
3. Fotografia.

O layout deve passar de duas colunas para uma única coluna.

Centralizar a fotografia e preservar o alinhamento dos textos de maneira legível.

---

## 8. Footer

Criar um footer discreto ao final da landing page.

Características:

- Fundo escuro.
- Linha divisória vermelha ou tracejada.
- Texto centralizado.
- Fonte monoespaçada.
- Cor creme/cinza.

Texto sugerido:

`9000 — Victor Kovalski`

Não adicionar links de redes sociais sem que sejam fornecidos.

---

## 9. Estrutura de componentes Angular

Utilizar Angular Standalone Components.

Estrutura sugerida:

```text
src/
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   │   ├── navbar.ts
│   │   │   ├── navbar.html
│   │   │   └── navbar.scss
│   │   │
│   │   ├── hero/
│   │   │   ├── hero.ts
│   │   │   ├── hero.html
│   │   │   └── hero.scss
│   │   │
│   │   ├── about/
│   │   │   ├── about.ts
│   │   │   ├── about.html
│   │   │   └── about.scss
│   │   │
│   │   ├── history/
│   │   │   ├── history.ts
│   │   │   ├── history.html
│   │   │   └── history.scss
│   │   │
│   │   └── footer/
│   │       ├── footer.ts
│   │       ├── footer.html
│   │       └── footer.scss
│   │
│   ├── app.ts
│   ├── app.html
│   └── app.scss
│
├── assets/
│   ├── images/
│   │   ├── victor-hero.png
│   │   ├── victor-9000-banner.png
│   │   └── victor-history.png
│   │
│   └── textures/
│       └── noise.png
│
└── styles.scss
```

Os nomes dos arquivos de imagens são sugestões. Caso os arquivos tenham outros nomes, ajustar os caminhos.

### Responsabilidades

**NavbarComponent**

Responsável por:

- Navegação entre seções.
- Destaque da seção ativa.
- Layout responsivo.
- Menu mobile.

**HeroComponent**

Responsável por:

- Apresentação inicial do 9000.
- Fotografia principal.
- Botão para a seção About.

**AboutComponent**

Responsável por:

- Banner panorâmico.
- Título Quem é o 9?
- Biografia centralizada.

**HistoryComponent**

Responsável por:

- Título História do Nove.
- Texto da origem do apelido.
- Fotografia histórica.

**FooterComponent**

Responsável pelo encerramento visual da página.

---

## 10. Responsividade

A aplicação deve funcionar corretamente em desktop, tablet e mobile.

Breakpoints sugeridos:

```scss
$mobile: 576px;
$tablet: 768px;
$desktop: 1024px;
```

### Desktop

- Navbar horizontal.
- Hero com duas colunas.
- Banner ocupando toda a largura.
- About centralizado.
- History com duas colunas.

### Tablet

- Reduzir tamanhos de fontes.
- Ajustar espaçamentos.
- Preservar duas colunas quando houver espaço suficiente.

### Mobile

- Navbar compacta.
- Hero em uma coluna.
- Banner adaptado.
- About centralizado.
- History em uma coluna.
- Fotografias proporcionais.
- Nenhum overflow horizontal.

Utilizar `clamp()`, Flexbox e CSS Grid quando apropriado.

---

## 11. Comportamento e interatividade

### Navegação

Todos os links da navbar devem funcionar por âncoras.

IDs:

```text
#inicio
#quem-e-o-9
#historia-do-9
```

Ativar rolagem suave:

```scss
html {
  scroll-behavior: smooth;
}
```

Considerar a preferência do usuário por movimento reduzido:

```scss
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

### Animações

Utilizar animações discretas, sem comprometer a estética vintage.

Permitido:

- Transições suaves nos links.
- Hover nos botões.
- Pequenas animações de entrada.
- Mudanças sutis de opacidade.

Evitar:

- Parallax excessivo.
- Efeitos 3D.
- Partículas.
- Animações neon.
- Gradientes animados.
- Movimentos exagerados.

### Hover

Botões amarelos podem receber um leve escurecimento no hover.

Links da navbar podem mudar discretamente de cor.

Não utilizar efeitos que descaracterizem a referência visual.

---

## 12. Acessibilidade e performance

### Acessibilidade

- Utilizar HTML semântico.
- Adicionar `alt` descritivo às imagens.
- Garantir contraste adequado.
- Permitir navegação por teclado.
- Utilizar estados de foco visíveis.
- Respeitar `prefers-reduced-motion`.
- Não depender exclusivamente de cores para indicar ações.

### Performance

- Otimizar as imagens sem perder qualidade visual.
- Utilizar formatos modernos quando possível.
- Evitar bibliotecas desnecessárias.
- Carregar imagens abaixo da dobra com lazy loading.
- Reservar espaço para as imagens para evitar layout shift.
- Evitar JavaScript desnecessário.
- Manter a aplicação leve.

---

## 13. Critérios de aceite

A implementação será considerada concluída quando:

- [ ] A aplicação utilizar Angular Standalone Components.
- [ ] A identidade visual estiver fiel às referências.
- [ ] O fundo possuir textura granulada discreta.
- [ ] A navbar possuir o número 9 amarelo à esquerda.
- [ ] A navbar possuir os três links definidos.
- [ ] O link ativo possuir sublinhado amarelo.
- [ ] A Hero Section possuir a fotografia original de Victor.
- [ ] O título 9000 possuir destaque e sublinhado vermelho.
- [ ] O botão Quem é o 9 funcionar.
- [ ] O banner 9.000 ocupar toda a largura da página.
- [ ] O banner possuir aproximadamente 50vh no desktop.
- [ ] A seção Quem é o 9? possuir textos centralizados.
- [ ] A seção História do Nove possuir texto à esquerda e fotografia à direita no desktop.
- [ ] As fotografias utilizarem molduras claras quando especificado.
- [ ] A aplicação funcionar em dispositivos móveis.
- [ ] Não existir overflow horizontal.
- [ ] A navegação por âncoras funcionar.
- [ ] A aplicação não exigir backend.
- [ ] A aplicação compilar sem erros.
- [ ] Os textos provisórios puderem ser substituídos facilmente.

---

## 14. Instruções para o agente de IA

Você é um desenvolvedor frontend responsável por implementar a landing page pessoal do 9000.

Sua tarefa é desenvolver a aplicação completa utilizando Angular, TypeScript e SCSS, seguindo rigorosamente as especificações deste README.

### Prioridades

**1. Fidelidade visual**

A prioridade máxima é reproduzir a identidade visual apresentada nas referências.

Não transformar o projeto em uma landing page corporativa ou um portfólio genérico.

Preservar a estética underground, vintage e inspirada no universo do skate.

**2. Utilização das imagens**

Utilizar obrigatoriamente as três imagens originais fornecidas.

Não substituir fotografias por imagens de banco.

Não gerar rostos ou pessoas diferentes.

**3. Componentização**

Criar componentes Angular independentes para cada seção.

Manter o código organizado, reutilizável e legível.

**4. Responsividade**

A aplicação deve funcionar corretamente em diferentes resoluções.

A versão mobile deve preservar a identidade visual do desktop.

**5. Conteúdo**

Não inventar fatos sobre Victor Kovalski.

Utilizar os textos provisórios deste README até que a história verdadeira seja fornecida.

**6. Qualidade técnica**

Utilizar boas práticas de Angular, TypeScript, HTML e SCSS.

Evitar dependências desnecessárias.

### Resultado esperado

Uma landing page pessoal, com aparência de um site underground de skate, dedicada ao 9000.

O resultado deve parecer uma página autoral, com fotografias pessoais, tipografia expressiva, cores marcantes e uma narrativa visual consistente.

A aplicação deve transmitir personalidade, nostalgia e identidade própria, mantendo a experiência moderna e responsiva.

---

## 15. Referências visuais

**Referência externa:**

https://skatearchive.com

**Referências do projeto:**

1. Hero Section — Victor com moletom preto e celular, título 9000 à direita.
2. About Section — Banner horizontal com múltiplas imagens de Victor e o número 9.000, seguido do título Quem é o 9? e textos centralizados.
3. History Section — Texto à esquerda e fotografia de Victor acompanhado por outra pessoa à direita.

As imagens de referência geradas anteriormente devem ser utilizadas para orientar a composição, a tipografia, as proporções e os espaçamentos.

**Observação final:** priorizar fidelidade às referências visuais sobre a criação de novos elementos decorativos. Não adicionar seções, funcionalidades ou componentes que não estejam previstos neste documento sem necessidade.