import { muscleGroups } from '../data/exercises'

const svgIcons = {
  chest: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M12 3C8 3 4 6 4 10c0 2 1 4 3 5l1 6h8l1-6c2-1 3-3 3-5 0-4-4-7-8-7z" />
      <path d="M4 10h16" strokeDasharray="2 2" />
    </svg>
  ),
  back: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M12 2v20M7 5l5 3 5-3M7 12l5 3 5-3M7 19l5-2 5 2" />
    </svg>
  ),
  shoulders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <circle cx="12" cy="8" r="3" />
      <path d="M3 8c0 0 2-3 9-3s9 3 9 3M5 21V14a7 7 0 0114 0v7" />
    </svg>
  ),
  arms: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M6 3l2 8-4 3 4 7M18 3l-2 8 4 3-4 7" />
    </svg>
  ),
  legs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M8 2v10l-2 10M16 2v10l2 10M8 12h8" />
    </svg>
  ),
}

export default function MuscleGroupTabs({ active, onChange, className = '' }) {
  return (
    <div className={`flex gap-1.5 ${className}`}>
      {muscleGroups.map((g) => (
        <button
          key={g.id}
          onClick={() => onChange(g.id)}
          className={`flex-1 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 px-2 sm:px-4 py-2.5 rounded-lg font-heading font-semibold transition-all duration-200 border ${
            active === g.id
              ? 'bg-[#39ff14]/10 border-[#39ff14] text-[#39ff14]'
              : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#888] hover:border-[#39ff14]/40 hover:text-[#ccc]'
          }`}
        >
          <span className={`${active === g.id ? 'text-[#39ff14]' : 'text-[#555]'} w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0`}>
            {svgIcons[g.icon]}
          </span>
          <span className="text-[10px] sm:text-sm leading-none whitespace-nowrap">{g.label}</span>
        </button>
      ))}
    </div>
  )
}
