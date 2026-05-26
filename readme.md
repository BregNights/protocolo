Crie um aplicativo React completo chamado "Protocolo" para ser hospedado no GitHub Pages.

## Objetivo
O usuário monta seu treino personalizado selecionando exercícios por grupo muscular, salva localmente e pode consultar como executar cada movimento via vídeo do YouTube.

---

## Estrutura de Dados

5 grupos musculares, cada um com 20 exercícios populares:

**Peito:** Supino Reto, Supino Inclinado, Supino Declinado, Crucifixo Plano, Crucifixo Inclinado, Peck Deck, Cross-over (alto), Cross-over (baixo), Pullover com haltere, Flexão de braço, Supino com halteres, Mergulho (dips), Flexão inclinada, Cable Fly, Landmine Press, Supino Fechado, Supino com elástico, Push-up com argolas, Supino Smith Machine, Flexão Diamante.

**Costas:** Puxada frontal, Puxada pegada neutra, Remada curvada, Remada unilateral, Remada sentada, Pull-up (barra fixa), Chin-up, Levantamento terra, Good Morning, Pullover na polia, Remada cavalinho, Face Pull, Remada com triângulo, Serrote, Remada Smith, Hyperextension, Remada T-bar, Puxada com elástico, Remada baixa supinada, Remada Pendlay.

**Ombros:** Desenvolvimento com halteres, Desenvolvimento com barra, Arnold Press, Elevação lateral, Elevação frontal, Remada alta, Face Pull, Elevação lateral na polia, Desenvolvimento Smith, Encolhimento (shrug), Rotação externa, Elevação 90°, Press atrás da nuca, Push Press, Lateral raise inclinada, Cruzes para deltóide posterior, Elevação lateral sentado, Ombro com elástico, Desenvolvimento unilateral, Círculo de ombros.

**Braços:** Rosca direta, Rosca alternada, Rosca martelo, Rosca concentrada, Rosca Scott, Rosca na polia, Tríceps testa, Tríceps corda, Tríceps mergulho, Tríceps coice, Tríceps francês, Tríceps na polia alta, Rosca 21, Rosca inversa, Rosca Zottman, Extensão unilateral, Kickback com haltere, Rosca inclinada, Tríceps banco, Diamond push-up.

**Pernas:** Agachamento livre, Leg press, Cadeira extensora, Cadeira flexora, Stiff, Avanço (lunge), Agachamento sumô, Agachamento búlgaro, Agachamento hack, Leg press 45°, Panturrilha em pé, Panturrilha sentado, Hip thrust, Mesa flexora, Agachamento frontal, Pistol squat, Agachamento Smith, Adução de quadril, Abdução de quadril, Agachamento jump.

Para cada exercício, defina:
- nome
- grupo muscular
- músculos secundários (array)
- dificuldade: "iniciante" | "intermediário" | "avançado"
- equipamento: "barra" | "haltere" | "máquina" | "peso corporal" | "cabo" | "elástico"
- youtubeSearchQuery: string para busca no YouTube (ex: "supino reto academia como fazer")
- youtubeVideoId: string (pode deixar vazio "", será buscado dinamicamente ou linkado)

---

## Funcionalidades

### 1. Navegação por grupo muscular
- Tabs ou sidebar com os 5 grupos
- Ícone anatômico SVG simples para cada grupo (peito, costas, ombros, braços, pernas)

### 2. Grid de exercícios
- Cards com: nome, dificuldade (badge colorido), equipamento (ícone), músculos secundários
- Botão "Ver vídeo" → abre modal com iframe do YouTube OU redireciona para busca no YouTube
- Botão "Adicionar ao treino" → adiciona à lista de treino atual
- Filtros: por dificuldade, por equipamento
- Campo de busca por nome

### 3. Construtor de treino (painel lateral ou tela separada)
- Lista dos exercícios selecionados
- Para cada exercício: campo para séries (ex: 3) e repetições (ex: 12) ou tempo (ex: 45s)
- Drag-and-drop para reordenar (use @dnd-kit/core)
- Campo "Nome do treino" (ex: "Treino A - Peito e Tríceps")
- Botão "Salvar treino"

### 4. Meus Treinos (saved workouts)
- Lista todos os treinos salvos no localStorage
- Cada treino salvo mostra: nome, data, grupos musculares envolvidos, quantidade de exercícios
- Abrir treino → mostra lista de exercícios com séries/reps e botão "Ver vídeo" em cada um
- Opção de duplicar, editar ou excluir treino
- Botão "Iniciar treino" → modo cronômetro simples (opcional)

### 5. Modal de vídeo
- Abre ao clicar "Ver vídeo" em qualquer exercício
- Tenta embedar YouTube via iframe com youtubeVideoId
- Fallback: botão "Buscar no YouTube" que abre nova aba com a youtubeSearchQuery

---

## Stack técnica
- React 18 + Vite
- React Router DOM (para rotas: /, /meus-treinos, /treino/:id)
- localStorage para persistência (sem backend)
- @dnd-kit/core para drag and drop
- Deploy configurado para GitHub Pages (vite.config com base: '/nome-do-repo/')
- CSS Modules ou Tailwind (escolha o mais adequado para a estética)

---

## Design
- Tema escuro (dark mode) com acentos em verde neon ou laranja vibrante — estética de academia/performance
- Tipografia forte: fonte display para títulos (ex: Bebas Neue ou Barlow Condensed), fonte legível para corpo
- Cards com hover animado, micro-interações suaves
- Layout responsivo (mobile-first — o usuário vai usar na academia com o celular)
- Cores por dificuldade: verde (iniciante), amarelo (intermediário), vermelho (avançado)
- Ícones de equipamento simples e claros

---

## Estrutura de arquivos sugerida
src/
  data/exercises.js        ← todos os 100 exercícios
  hooks/useWorkout.js      ← lógica de treino e localStorage
  components/
    ExerciseCard.jsx
    ExerciseGrid.jsx
    MuscleGroupTabs.jsx
    WorkoutBuilder.jsx
    VideoModal.jsx
    SavedWorkouts.jsx
  pages/
    Home.jsx
    MyWorkouts.jsx
    WorkoutDetail.jsx
  App.jsx
  main.jsx

---

## localStorage schema
{
  "gymbuilder_workouts": [
    {
      "id": "uuid",
      "name": "Treino A - Peito",
      "createdAt": "ISO date",
      "exercises": [
        {
          "exerciseId": "supino-reto",
          "sets": 4,
          "reps": 10,
          "restSeconds": 60
        }
      ]
    }
  ]
}

Gere o projeto completo, começando pelos dados (exercises.js), depois os hooks, depois os componentes e páginas. Inclua também o vite.config.js configurado para GitHub Pages e um README com instruções de deploy.