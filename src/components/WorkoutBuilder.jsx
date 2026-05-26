import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { getExerciseById, equipmentIcons } from '../data/exercises'

function SortableItem({ item, onRemove, onUpdate, onWatchVideo }) {
  const exercise = getExerciseById(item.exerciseId)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.uid,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  if (!exercise) return null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-[#1a1a1a] border rounded-lg p-3 flex gap-3 items-start transition-colors ${
        isDragging ? 'border-[#39ff14]/50 shadow-lg shadow-[#39ff14]/10' : 'border-[#2a2a2a]'
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="text-[#444] hover:text-[#888] cursor-grab active:cursor-grabbing mt-1 flex-shrink-0"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">{equipmentIcons[exercise.equipment]}</span>
          <span className="font-heading font-semibold text-sm text-white truncate">{exercise.name}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-1.5 text-xs text-[#888]">
            Séries
            <input
              type="number"
              min={1}
              max={20}
              value={item.sets}
              onChange={(e) => onUpdate(item.uid, { sets: parseInt(e.target.value) || 1 })}
              className="w-14 bg-[#111] border border-[#333] rounded px-2 py-1 text-white text-xs font-body focus:outline-none focus:border-[#39ff14]/50"
            />
          </label>
          <label className="flex items-center gap-1.5 text-xs text-[#888]">
            Reps
            <input
              type="number"
              min={1}
              max={200}
              value={item.reps}
              onChange={(e) => onUpdate(item.uid, { reps: parseInt(e.target.value) || 1 })}
              className="w-14 bg-[#111] border border-[#333] rounded px-2 py-1 text-white text-xs font-body focus:outline-none focus:border-[#39ff14]/50"
            />
          </label>
          <label className="flex items-center gap-1.5 text-xs text-[#888]">
            Descanso
            <select
              value={item.restSeconds}
              onChange={(e) => onUpdate(item.uid, { restSeconds: parseInt(e.target.value) })}
              className="bg-[#111] border border-[#333] rounded px-2 py-1 text-white text-xs font-body focus:outline-none focus:border-[#39ff14]/50"
            >
              <option value={30}>30s</option>
              <option value={45}>45s</option>
              <option value={60}>1min</option>
              <option value={90}>1:30</option>
              <option value={120}>2min</option>
              <option value={180}>3min</option>
            </select>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-1 flex-shrink-0">
        <button
          onClick={() => onWatchVideo(exercise)}
          className="text-[#555] hover:text-[#888] transition-colors p-1"
          title="Ver vídeo"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <button
          onClick={() => onRemove(item.uid)}
          className="text-[#555] hover:text-red-400 transition-colors p-1"
          title="Remover"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function WorkoutBuilder({ builder, onSave, onWatchVideo, mobileHeader = true }) {
  const { name, setName, items, removeExercise, updateItem, reorder, buildPayload, clear } = builder
  const [savedId, setSavedId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      reorder(active.id, over.id)
    }
  }

  const handleSave = () => {
    const payload = buildPayload(savedId)
    setSavedId(payload.id)
    onSave(payload)
  }

  return (
    <div className="flex flex-col h-full">
      {mobileHeader && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a] lg:flex">
          <h2 className="font-display text-lg text-[#39ff14] tracking-wide">MINHA FICHA</h2>
          {items.length > 0 && (
            <button
              onClick={clear}
              className="text-xs text-[#555] hover:text-red-400 transition-colors font-body"
            >
              Limpar
            </button>
          )}
        </div>
      )}
      {!mobileHeader && items.length > 0 && (
        <div className="flex justify-end px-4 pt-2 pb-0">
          <button
            onClick={clear}
            className="text-xs text-[#555] hover:text-red-400 transition-colors font-body"
          >
            Limpar tudo
          </button>
        </div>
      )}

      <div className="p-4 border-b border-[#2a2a2a]">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do treino (ex: Treino A - Peito)"
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm font-body text-white placeholder-[#444] focus:outline-none focus:border-[#39ff14]/50 transition-colors"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[#333] py-12">
            <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
            </svg>
            <p className="text-sm font-body text-center">
              Adicione exercícios<br />
              <span className="text-[#2a2a2a]">usando os cards ao lado</span>
            </p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <SortableItem
                    key={item.uid}
                    item={item}
                    onRemove={removeExercise}
                    onUpdate={updateItem}
                    onWatchVideo={onWatchVideo}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t border-[#2a2a2a]">
          <div className="text-xs text-[#555] font-body mb-3 text-center">
            {items.length} exercício{items.length !== 1 ? 's' : ''}
          </div>
          <button
            onClick={handleSave}
            className="w-full py-3 rounded-lg bg-[#39ff14] text-black font-heading font-bold text-sm tracking-wide hover:bg-[#2bc410] transition-colors active:scale-95"
          >
            SALVAR TREINO
          </button>
        </div>
      )}
    </div>
  )
}
