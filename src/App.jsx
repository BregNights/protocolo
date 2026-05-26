import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import MyWorkouts from './pages/MyWorkouts'
import WorkoutDetail from './pages/WorkoutDetail'
import { useSavedWorkouts } from './hooks/useWorkout'

function Nav() {
  return (
    <header className="h-14 lg:h-16 flex items-center justify-between px-3 lg:px-6 bg-[#0a0a0a] border-b border-[#1a1a1a] sticky top-0 z-40">
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-[#39ff14]/10 border border-[#39ff14]/30 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#39ff14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="font-display text-lg lg:text-xl text-white tracking-[0.12em] lg:tracking-[0.15em]">PROTOCOLO</span>
      </div>

      <nav className="flex items-center gap-0.5">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-2.5 lg:px-3 py-2 rounded-lg text-xs lg:text-sm font-heading font-semibold transition-all ${
              isActive ? 'text-[#39ff14] bg-[#39ff14]/10' : 'text-[#666] hover:text-[#999]'
            }`
          }
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <span className="hidden sm:inline">Exercícios</span>
        </NavLink>
        <NavLink
          to="/meus-treinos"
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-2.5 lg:px-3 py-2 rounded-lg text-xs lg:text-sm font-heading font-semibold transition-all ${
              isActive ? 'text-[#39ff14] bg-[#39ff14]/10' : 'text-[#666] hover:text-[#999]'
            }`
          }
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
          </svg>
          <span className="hidden sm:inline">Meus Treinos</span>
        </NavLink>
      </nav>
    </header>
  )
}

export default function App() {
  const savedWorkoutsHook = useSavedWorkouts()

  return (
    <BrowserRouter basename="/protocolo">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home savedWorkoutsHook={savedWorkoutsHook} />} />
          <Route path="/meus-treinos" element={<MyWorkouts savedWorkoutsHook={savedWorkoutsHook} />} />
          <Route path="/meus-treinos/:id" element={<WorkoutDetail savedWorkoutsHook={savedWorkoutsHook} />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
