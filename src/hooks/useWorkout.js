import { useState, useCallback } from 'react'

const STORAGE_KEY = 'gymbuilder_workouts'

function loadWorkouts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveWorkouts(workouts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts))
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useSavedWorkouts() {
  const [workouts, setWorkouts] = useState(() => loadWorkouts())

  const saveWorkout = useCallback((workout) => {
    setWorkouts((prev) => {
      const exists = prev.find((w) => w.id === workout.id)
      const next = exists
        ? prev.map((w) => (w.id === workout.id ? { ...workout } : w))
        : [{ ...workout, id: workout.id || generateId(), createdAt: new Date().toISOString() }, ...prev]
      saveWorkouts(next)
      return next
    })
  }, [])

  const deleteWorkout = useCallback((id) => {
    setWorkouts((prev) => {
      const next = prev.filter((w) => w.id !== id)
      saveWorkouts(next)
      return next
    })
  }, [])

  const duplicateWorkout = useCallback((id) => {
    setWorkouts((prev) => {
      const source = prev.find((w) => w.id === id)
      if (!source) return prev
      const copy = {
        ...source,
        id: generateId(),
        name: `${source.name} (cópia)`,
        createdAt: new Date().toISOString(),
      }
      const next = [copy, ...prev]
      saveWorkouts(next)
      return next
    })
  }, [])

  return { workouts, saveWorkout, deleteWorkout, duplicateWorkout }
}

export function useWorkoutBuilder(initial = null) {
  const [name, setName] = useState(initial?.name ?? '')
  const [items, setItems] = useState(
    () =>
      initial?.exercises?.map((e) => ({
        ...e,
        uid: generateId(),
      })) ?? []
  )

  const addExercise = useCallback((exercise) => {
    setItems((prev) => {
      if (prev.find((i) => i.exerciseId === exercise.id)) return prev
      return [
        ...prev,
        {
          uid: generateId(),
          exerciseId: exercise.id,
          sets: 3,
          reps: 12,
          restSeconds: 60,
        },
      ]
    })
  }, [])

  const removeExercise = useCallback((uid) => {
    setItems((prev) => prev.filter((i) => i.uid !== uid))
  }, [])

  const updateItem = useCallback((uid, patch) => {
    setItems((prev) => prev.map((i) => (i.uid === uid ? { ...i, ...patch } : i)))
  }, [])

  const reorder = useCallback((activeId, overId) => {
    setItems((prev) => {
      const oldIndex = prev.findIndex((i) => i.uid === activeId)
      const newIndex = prev.findIndex((i) => i.uid === overId)
      if (oldIndex === -1 || newIndex === -1) return prev
      const next = [...prev]
      const [moved] = next.splice(oldIndex, 1)
      next.splice(newIndex, 0, moved)
      return next
    })
  }, [])

  const buildPayload = useCallback(
    (existingId) => ({
      id: existingId || generateId(),
      name: name.trim() || 'Meu Treino',
      createdAt: new Date().toISOString(),
      exercises: items.map(({ exerciseId, sets, reps, restSeconds }) => ({
        exerciseId,
        sets,
        reps,
        restSeconds,
      })),
    }),
    [name, items]
  )

  const clear = useCallback(() => {
    setName('')
    setItems([])
  }, [])

  return { name, setName, items, addExercise, removeExercise, updateItem, reorder, buildPayload, clear }
}
