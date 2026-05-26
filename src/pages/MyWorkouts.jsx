import SavedWorkouts from '../components/SavedWorkouts'

export default function MyWorkouts({ savedWorkoutsHook }) {
  const { workouts, deleteWorkout, duplicateWorkout } = savedWorkoutsHook

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-6 flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl lg:text-4xl text-white tracking-wider">MEUS TREINOS</h1>
        <p className="text-[#555] text-sm font-body mt-1">
          {workouts.length} treino{workouts.length !== 1 ? 's' : ''} salvo{workouts.length !== 1 ? 's' : ''}
        </p>
      </div>

      <SavedWorkouts
        workouts={workouts}
        onDelete={deleteWorkout}
        onDuplicate={duplicateWorkout}
      />
    </div>
  )
}
