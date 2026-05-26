import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getExerciseById, difficultyColors, equipmentIcons } from '../data/exercises'
import VideoModal from '../components/VideoModal'

export default function WorkoutDetail({ savedWorkoutsHook }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { workouts, deleteWorkout } = savedWorkoutsHook
  const [videoExercise, setVideoExercise] = useState(null)
  const [timerActive, setTimerActive] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [timerInterval, setTimerInterval] = useState(null)

  const workout = workouts.find((w) => w.id === id)

  if (!workout) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6">
        <p className="text-[#555] font-body">Treino não encontrado</p>
        <button
          onClick={() => navigate('/meus-treinos')}
          className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] font-heading text-sm hover:text-white transition-colors"
        >
          Voltar
        </button>
      </div>
    )
  }

  const toggleTimer = () => {
    if (timerActive) {
      clearInterval(timerInterval)
      setTimerInterval(null)
      setTimerActive(false)
    } else {
      setElapsed(0)
      const iv = setInterval(() => setElapsed((p) => p + 1), 1000)
      setTimerInterval(iv)
      setTimerActive(true)
    }
  }

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const handleDelete = () => {
    if (window.confirm('Excluir este treino?')) {
      deleteWorkout(id)
      navigate('/meus-treinos')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 lg:p-6 flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/meus-treinos')}
            className="flex items-center gap-1.5 text-[#555] hover:text-[#888] transition-colors text-sm font-body mb-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Meus treinos
          </button>
          <h1 className="font-display text-3xl lg:text-4xl text-white tracking-wider">{workout.name}</h1>
          <p className="text-[#555] text-sm font-body mt-1">
            {workout.exercises.length} exercício{workout.exercises.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleDelete}
            className="p-2.5 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#555] hover:text-red-400 hover:border-red-400/30 transition-all"
            title="Excluir treino"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Timer */}
      <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#555] font-body mb-1">Cronômetro de treino</p>
          <p className="font-display text-3xl text-white tracking-widest">{formatTime(elapsed)}</p>
        </div>
        <button
          onClick={toggleTimer}
          className={`px-5 py-2.5 rounded-lg font-heading font-bold text-sm tracking-wide transition-all ${
            timerActive
              ? 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20'
              : 'bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] hover:bg-[#39ff14]/20'
          }`}
        >
          {timerActive ? 'PARAR' : 'INICIAR TREINO'}
        </button>
      </div>

      {/* Exercise list */}
      <div className="flex flex-col gap-3">
        {workout.exercises.map((item, idx) => {
          const exercise = getExerciseById(item.exerciseId)
          if (!exercise) return null
          const color = difficultyColors[exercise.difficulty]

          return (
            <div
              key={`${item.exerciseId}-${idx}`}
              className="bg-[#111] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-4 hover:border-[#2a2a2a]/80 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                <span className="font-display text-sm text-[#555]">{idx + 1}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{equipmentIcons[exercise.equipment]}</span>
                  <h3 className="font-heading font-semibold text-white text-sm">{exercise.name}</h3>
                  <span
                    className="px-1.5 py-0.5 rounded text-xs font-body"
                    style={{ color, backgroundColor: `${color}18` }}
                  >
                    {exercise.difficulty}
                  </span>
                </div>
                <div className="flex gap-3 text-xs text-[#666] font-body">
                  <span>{item.sets} séries × {item.reps} reps</span>
                  <span>•</span>
                  <span>{item.restSeconds}s descanso</span>
                </div>
              </div>

              <button
                onClick={() => setVideoExercise(exercise)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#666] hover:text-white hover:border-[#444] transition-all text-xs font-heading font-semibold flex-shrink-0"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Vídeo
              </button>
            </div>
          )
        })}
      </div>

      {videoExercise && (
        <VideoModal exercise={videoExercise} onClose={() => setVideoExercise(null)} />
      )}
    </div>
  )
}
