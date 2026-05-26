import { useState, useMemo } from 'react'
import MuscleGroupTabs from '../components/MuscleGroupTabs'
import ExerciseGrid from '../components/ExerciseGrid'
import WorkoutBuilder from '../components/WorkoutBuilder'
import VideoModal from '../components/VideoModal'
import { useWorkoutBuilder } from '../hooks/useWorkout'

export default function Home({ savedWorkoutsHook }) {
  const [activeGroup, setActiveGroup] = useState('peito')
  const [videoExercise, setVideoExercise] = useState(null)
  const [builderOpen, setBuilderOpen] = useState(false)
  const [saved, setSaved] = useState(false)

  const builder = useWorkoutBuilder()
  const addedIds = useMemo(() => new Set(builder.items.map((i) => i.exerciseId)), [builder.items])

  const handleAddToWorkout = (exercise) => {
    builder.addExercise(exercise)
    setSaved(false)
  }

  const handleSave = (payload) => {
    savedWorkoutsHook.saveWorkout(payload)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex lg:flex-row h-[calc(100vh-56px)] lg:h-[calc(100vh-64px)] overflow-hidden">
      {/* ── Main scroll area ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-4 lg:p-6 flex flex-col gap-4 pb-24 lg:pb-6">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white tracking-wider leading-tight">
              MONTE SEU PROTOCOLO
            </h1>
            <p className="text-[#555] text-xs sm:text-sm font-body mt-1">
              Selecione um grupo muscular e adicione exercícios ao seu treino
            </p>
          </div>

          <MuscleGroupTabs active={activeGroup} onChange={setActiveGroup} />

          <ExerciseGrid
            group={activeGroup}
            addedIds={addedIds}
            onAddToWorkout={handleAddToWorkout}
            onWatchVideo={setVideoExercise}
          />
        </div>
      </div>

      {/* ── Desktop sidebar ── */}
      <div className="hidden lg:flex lg:w-80 xl:w-96 border-l border-[#2a2a2a] bg-[#0d0d0d] flex-col">
        <WorkoutBuilder
          builder={builder}
          onSave={handleSave}
          onWatchVideo={setVideoExercise}
          mobileHeader={false}
        />
        {saved && (
          <div className="mx-4 mb-4 p-3 rounded-lg bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] text-xs font-body text-center">
            ✓ Treino salvo com sucesso!
          </div>
        )}
      </div>

      {/* ── Mobile: FAB trigger ── */}
      <button
        onClick={() => setBuilderOpen(true)}
        className="lg:hidden fixed bottom-5 right-4 z-30 flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-[#39ff14] text-black font-heading font-bold text-sm shadow-xl shadow-[#39ff14]/30 active:scale-95 transition-transform"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
        </svg>
        Minha Ficha
        {builder.items.length > 0 && (
          <span className="bg-black/20 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {builder.items.length}
          </span>
        )}
      </button>

      {/* ── Mobile: slide-up sheet ── */}
      {builderOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setBuilderOpen(false)}
          />
          {/* Sheet */}
          <div className="relative bg-[#0d0d0d] rounded-t-2xl border-t border-[#2a2a2a] flex flex-col max-h-[85vh] shadow-2xl">
            {/* Drag handle + header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#2a2a2a] flex-shrink-0">
              <h2 className="font-display text-lg text-[#39ff14] tracking-wide">
                MINHA FICHA
                {builder.items.length > 0 && (
                  <span className="ml-2 text-sm bg-[#39ff14]/20 px-2 py-0.5 rounded-full font-body">
                    {builder.items.length}
                  </span>
                )}
              </h2>
              <button
                onClick={() => setBuilderOpen(false)}
                className="text-[#555] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#2a2a2a]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
              <WorkoutBuilder
                builder={builder}
                onSave={(payload) => { handleSave(payload); setBuilderOpen(false) }}
                onWatchVideo={(ex) => { setBuilderOpen(false); setVideoExercise(ex) }}
                mobileHeader={false}
              />
            </div>

            {saved && (
              <div className="mx-4 mb-4 p-3 rounded-lg bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] text-xs font-body text-center">
                ✓ Treino salvo com sucesso!
              </div>
            )}
          </div>
        </div>
      )}

      {videoExercise && (
        <VideoModal exercise={videoExercise} onClose={() => setVideoExercise(null)} />
      )}
    </div>
  )
}
