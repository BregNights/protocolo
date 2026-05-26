import { useState, useMemo } from 'react'
import ExerciseCard from './ExerciseCard'
import { getExercisesByGroup } from '../data/exercises'

const DIFFICULTIES = ['iniciante', 'intermediário', 'avançado']
const EQUIPMENTS = ['barra', 'haltere', 'máquina', 'peso corporal', 'cabo', 'elástico']

export default function ExerciseGrid({ group, addedIds, onAddToWorkout, onWatchVideo }) {
  const [search, setSearch] = useState('')
  const [diffFilter, setDiffFilter] = useState('')
  const [equipFilter, setEquipFilter] = useState('')

  const all = useMemo(() => getExercisesByGroup(group), [group])

  const filtered = useMemo(() => {
    return all.filter((e) => {
      const matchSearch = e.name.toLowerCase().includes(search.toLowerCase())
      const matchDiff = !diffFilter || e.difficulty === diffFilter
      const matchEquip = !equipFilter || e.equipment === equipFilter
      return matchSearch && matchDiff && matchEquip
    })
  }, [all, search, diffFilter, equipFilter])

  const toggleDiff = (d) => setDiffFilter((v) => (v === d ? '' : d))
  const toggleEquip = (e) => setEquipFilter((v) => (v === e ? '' : e))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar exercício..."
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-9 pr-4 py-2.5 text-sm font-body text-white placeholder-[#555] focus:outline-none focus:border-[#39ff14]/50 transition-colors"
          />
        </div>

        <div className="relative -mx-4 lg:-mx-6">
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 lg:px-6 pr-8 lg:pr-10">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => toggleDiff(d)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-heading font-semibold border transition-all ${
                diffFilter === d
                  ? d === 'iniciante'
                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                    : d === 'intermediário'
                    ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
                    : 'bg-red-500/20 border-red-500/50 text-red-400'
                  : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#666] hover:text-[#999]'
              }`}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
          <div className="w-px flex-shrink-0 bg-[#2a2a2a] mx-1" />
          {EQUIPMENTS.map((eq) => (
            <button
              key={eq}
              onClick={() => toggleEquip(eq)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-heading font-semibold border transition-all ${
                equipFilter === eq
                  ? 'bg-[#39ff14]/15 border-[#39ff14]/40 text-[#39ff14]'
                  : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#666] hover:text-[#999]'
              }`}
            >
              {eq}
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0.5 w-10 bg-gradient-to-l from-[#0a0a0a] to-transparent rounded-r" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-[#444]">
          <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-body text-sm">Nenhum exercício encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              isAdded={addedIds.has(ex.id)}
              onAddToWorkout={onAddToWorkout}
              onWatchVideo={onWatchVideo}
            />
          ))}
        </div>
      )}
    </div>
  )
}
