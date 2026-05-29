# PROTOCOLO

Aplicativo web para montagem de treinos personalizados na academia. Selecione exercícios por grupo muscular, configure séries e repetições, salve seus treinos e consulte vídeos de execução — tudo rodando no navegador, sem backend.

**[Acessar o app](https://bregnights.github.io/protocolo/)**

---

## Sobre o projeto

Este projeto foi desenvolvido como estudo prático sobre **agentes de inteligência artificial** — explorando como criar prompts eficazes, estruturar fluxos de geração de código e iterar com agentes para produzir uma aplicação funcional do zero.

O foco foi aprender na prática:
- Criação e refinamento de prompts para geração de código
- Uso de agentes de IA para acelerar o desenvolvimento
- Otimização das instruções para obter resultados mais precisos e alinhados ao objetivo
- Avaliação crítica da saída gerada e iteração até o resultado desejado

---

## Funcionalidades

- **Biblioteca de exercícios** — 100 exercícios divididos em 5 grupos musculares (Peito, Costas, Ombros, Braços e Pernas)
- **Filtros e busca** — filtre por dificuldade, equipamento ou pesquise por nome
- **Cards detalhados** — cada exercício exibe dificuldade, equipamento necessário e músculos secundários
- **Vídeos de execução** — modal com vídeo do YouTube ou link direto para busca
- **Construtor de treino** — monte seu treino adicionando exercícios, definindo séries/repetições e reordenando com drag-and-drop
- **Meus Treinos** — salve, visualize, duplique, edite e exclua treinos salvos localmente
- **Persistência local** — tudo salvo no `localStorage`, sem necessidade de conta ou login

---

## Stack

| Tecnologia | Uso |
|---|---|
| React 19 + Vite 8 | Interface e build |
| React Router DOM 7 | Roteamento entre páginas |
| Tailwind CSS 4 | Estilização |
| @dnd-kit | Drag-and-drop no construtor de treino |
| localStorage | Persistência dos treinos |
| GitHub Actions | CI/CD para deploy automático |
| GitHub Pages | Hospedagem |

---

## Rodando localmente

```bash
npm install
npm run dev
```

O app estará disponível em `http://localhost:5173`.

---

## Deploy

O deploy é automático via GitHub Actions a cada push na branch `main`. O workflow em [.github/workflows/deploy.yml](.github/workflows/deploy.yml) faz o build e publica no GitHub Pages.

Para fazer o deploy manualmente:

```bash
npm run build
```

O conteúdo da pasta `dist/` é o que vai para o Pages.

---

## Estrutura do projeto

```
src/
├── data/
│   └── exercises.js        # 100 exercícios com metadados completos
├── hooks/
│   └── useWorkout.js       # Lógica de treino e integração com localStorage
├── components/
│   ├── ExerciseCard.jsx
│   ├── ExerciseGrid.jsx
│   ├── MuscleGroupTabs.jsx
│   ├── WorkoutBuilder.jsx
│   ├── VideoModal.jsx
│   └── SavedWorkouts.jsx
└── pages/
    ├── Home.jsx
    ├── MyWorkouts.jsx
    └── WorkoutDetail.jsx
```
