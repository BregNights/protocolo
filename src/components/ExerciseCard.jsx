import { difficultyColors, equipmentIcons } from '../data/exercises'

const difficultyLabel = {
  iniciante: 'Iniciante',
  intermediário: 'Intermediário',
  avançado: 'Avançado',
}

export default function ExerciseCard({ exercise, onAddToWorkout, onWatchVideo, isAdded }) {
  const color = difficultyColors[exercise.difficulty]
  const icon = equipmentIcons[exercise.equipment]

  return (
    <div className="group bg-[#111] border border-[#2a2a2a] rounded-xl p-4 flex flex-col gap-3 hover:border-[#39ff14]/30 hover:bg-[#131313] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#39ff14]/5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-heading font-semibold text-white text-base leading-tight">{exercise.name}</h3>
        <span className="text-xl flex-shrink-0">{icon}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-body font-medium"
          style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}40` }}
        >
          {difficultyLabel[exercise.difficulty]}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-body text-[#888] bg-[#1a1a1a] border border-[#2a2a2a]">
          {exercise.equipment}
        </span>
      </div>

      {exercise.secondary.length > 0 && (
        <p className="text-[#555] text-xs font-body leading-relaxed">
          Secundários: <span className="text-[#777]">{exercise.secondary.join(', ')}</span>
        </p>
      )}

      <div className="flex gap-2 mt-auto pt-1">
        <button
          onClick={() => onWatchVideo(exercise)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:text-white hover:border-[#444] transition-all text-xs font-heading font-semibold"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Ver vídeo
        </button>
        <button
          onClick={() => onAddToWorkout(exercise)}
          disabled={isAdded}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-heading font-semibold transition-all ${
            isAdded
              ? 'bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] cursor-default'
              : 'bg-[#39ff14]/5 border border-[#39ff14]/20 text-[#39ff14] hover:bg-[#39ff14]/15 hover:border-[#39ff14]/50'
          }`}
        >
          {isAdded ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Adicionado
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar
            </>
          )}
        </button>
      </div>
    </div>
  )
}
