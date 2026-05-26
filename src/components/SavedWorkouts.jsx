import { useNavigate } from 'react-router-dom'
import { muscleGroups } from '../data/exercises'
import { getExerciseById } from '../data/exercises'

function getGroupsInvolved(exercises) {
  const groups = new Set(
    exercises
      .map((e) => getExerciseById(e.exerciseId)?.group)
      .filter(Boolean)
  )
  return muscleGroups.filter((g) => groups.has(g.id)).map((g) => g.label)
}

function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(iso))
  } catch {
    return ''
  }
}

export default function SavedWorkouts({ workouts, onDelete, onDuplicate }) {
  const navigate = useNavigate()

  if (workouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[#333]">
        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="font-body text-sm text-[#555]">Nenhum treino salvo ainda</p>
        <p className="font-body text-xs text-[#333] mt-1">Monte seu primeiro treino na tela inicial</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {workouts.map((w) => {
        const groups = getGroupsInvolved(w.exercises)
        return (
          <div
            key={w.id}
            className="bg-[#111] border border-[#2a2a2a] rounded-xl p-4 flex flex-col gap-3 hover:border-[#39ff14]/20 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading font-bold text-white text-base leading-tight">{w.name}</h3>
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => onDuplicate(w.id)}
                  title="Duplicar"
                  className="text-[#555] hover:text-[#888] transition-colors p-1.5 rounded hover:bg-[#1a1a1a]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(w.id)}
                  title="Excluir"
                  className="text-[#555] hover:text-red-400 transition-colors p-1.5 rounded hover:bg-[#1a1a1a]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {groups.map((g) => (
                <span key={g} className="px-2 py-0.5 rounded-full text-xs font-body bg-[#1a1a1a] border border-[#2a2a2a] text-[#777]">
                  {g}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#555] font-body">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                </svg>
                {w.exercises.length} exercício{w.exercises.length !== 1 ? 's' : ''}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(w.createdAt)}
              </span>
            </div>

            <button
              onClick={() => navigate(`/meus-treinos/${w.id}`)}
              className="mt-auto w-full py-2.5 rounded-lg bg-[#39ff14]/5 border border-[#39ff14]/20 text-[#39ff14] font-heading font-semibold text-sm hover:bg-[#39ff14]/15 hover:border-[#39ff14]/40 transition-all"
            >
              Abrir treino
            </button>
          </div>
        )
      })}
    </div>
  )
}
