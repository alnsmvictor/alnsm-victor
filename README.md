# Victor Alonso Portfolio

Portfólio front-end desenvolvido com Next.js, React e TypeScript. O projeto apresenta uma interface inspirada em menus táticos de videogame, com foco em navegação visual, internacionalização e uma experiência mais interativa do que um portfólio tradicional.

## Sobre o projeto

A aplicação reúne informações profissionais em telas separadas para menu, experiências, habilidades e contato. O visual utiliza uma estética de sistema/HUD, com grid de fundo, scanline animada, cards interativos e navegação por teclado em pontos específicos da experiência.

O projeto possui suporte a português e inglês usando `next-intl`.

## Funcionalidades

- Menu principal com navegação por teclado no desktop.
- Troca de idioma entre português e inglês.
- Página de experiências com cards detalhados em modal.
- Navegação na experiência por setas no teclado.
- Página de skills em formato de inventário.
- Página de contato com links para email, LinkedIn e GitHub.
- Layout responsivo para desktop e mobile.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- CSS Modules
- next-intl
- next/font
- ESLint

## Navegação por teclado

No menu principal em desktop:

```txt
↑ / ↓   Alterna a opção selecionada
Enter   Acessa a opção selecionada
```

Na página de experiências em desktop:

```txt
↑ / ↓   Alterna o card selecionado
Enter   Abre o modal da experiência
Esc     Fecha o modal ou volta para o menu
```

Nas páginas internas:

```txt
Esc     Volta para o menu principal
```

## Como rodar localmente

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
```

Executa o projeto em modo de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run start
```

Executa a versão de produção após o build.

```bash
npm run lint
```

Executa a análise estática com ESLint.

## Deploy

O projeto está preparado para deploy na Vercel, aproveitando o suporte nativo da plataforma para aplicações Next.js.
