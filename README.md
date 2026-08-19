# OT-Pokémon HD Tracker

Aplicação web para acompanhamento e gerenciamento de progresso no **OTPokémon**, permitindo organizar informações sobre Pokémon, progresso de captura e outros dados relacionados à jornada do jogador.

O projeto está sendo desenvolvido com foco em uma interface simples, rápida e prática para facilitar o acompanhamento da coleção e do progresso dentro do jogo.

## 🎯 Objetivo

O objetivo do **OT-Pokémon HD Tracker** é centralizar informações que normalmente precisam ser controladas manualmente pelo jogador, oferecendo uma ferramenta para:

* 📖 Consultar Pokémon disponíveis;
* 🔎 Pesquisar Pokémon rapidamente;
* 📝 Cadastrar e gerenciar Pokémon;
* 📊 Acompanhar o progresso da coleção;
* ✅ Marcar Pokémon conforme o progresso do jogador;
* 🧩 Organizar informações relacionadas à jornada no OTPokémon.

## 🚀 Funcionalidades

### Pokémon

* Cadastro de Pokémon;
* Listagem de Pokémon;
* Ordenação pela numeração da Pokédex;
* Pesquisa de Pokémon;
* Autocomplete durante a pesquisa;
* Visualização das informações cadastradas;
* Gerenciamento dos registros.

### Rastreamento de progresso

O projeto também possui uma estrutura voltada para acompanhar o progresso do jogador, permitindo futuramente expandir o controle para diferentes objetivos e coleções.

## 🛠️ Tecnologias

O projeto utiliza tecnologias modernas do ecossistema web, incluindo:

* **React**
* **TypeScript**
* **Vite**
* **Lucide React**
* **ESLint**
* **CSS**

## 📁 Estrutura do projeto

A estrutura pode ser organizada aproximadamente da seguinte maneira:

```text
otp-hd-tracker/
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── types/
│   ├── hooks/
│   └── ...
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 💻 Instalação

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

* [Node.js](https://nodejs.org/)
* npm

### Clone o projeto

```bash
git clone <URL_DO_REPOSITORIO>
cd otp-hd-tracker
```

### Instale as dependências

```bash
npm install
```

### Execute em ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível na URL apresentada pelo Vite, normalmente:

```text
http://localhost:5173
```

## 📦 Build

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## 🧹 Lint

Para verificar problemas no código:

```bash
npm run lint
```

## 🗺️ Roadmap

Algumas ideias para evolução do projeto:

* [ ] Persistência dos dados;
* [ ] Sistema de autenticação;
* [ ] Perfil do jogador;
* [ ] Controle de Pokémon capturados;
* [ ] Controle de Pokémon faltantes;
* [ ] Progresso por região/geração;
* [ ] Filtros avançados;
* [ ] Estatísticas da coleção;
* [ ] Importação e exportação dos dados;
* [ ] Responsividade aprimorada para dispositivos móveis;
* [ ] Deploy da aplicação;
* [ ] Integração com outras informações do OTPokémon.

## 🤝 Contribuição

Contribuições são bem-vindas.

Para contribuir:

1. Faça um fork do projeto;
2. Crie uma branch para sua alteração:

```bash
git checkout -b feature/minha-feature
```

3. Faça suas alterações;
4. Commit:

```bash
git commit -m "feat: adiciona minha feature"
```

5. Envie a branch:

```bash
git push origin feature/minha-feature
```

6. Abra um Pull Request.

## 📄 Licença

Este projeto é desenvolvido para fins pessoais e de estudo.

O **OT-Pokémon** e suas respectivas marcas, imagens e conteúdos pertencem aos seus respectivos proprietários. Este projeto não possui vínculo oficial com o OTPokémon.

---

**OT-Pokémon HD Tracker** — acompanhando sua jornada, Pokémon por Pokémon. 🎮
