import { useEffect } from 'react'

export default function VideoModal({ exercise, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!exercise) return null

  const hasVideo = !!exercise.youtubeVideoId

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl bg-[#111] rounded-xl border border-[#2a2a2a] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2a]">
          <div>
            <h2 className="font-display text-xl text-white tracking-wide">{exercise.name}</h2>
            <p className="text-[#888] text-xs mt-0.5 font-body">Como executar</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#888] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#2a2a2a]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          {hasVideo ? (
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${exercise.youtubeVideoId}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={exercise.name}
              />
            </div>
          ) : (
            <div className="aspect-video rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex flex-col items-center justify-center gap-4">
              <svg className="w-16 h-16 text-[#333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[#555] text-sm font-body">Vídeo não configurado</p>
            </div>
          )}

          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.youtubeSearchQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#ff0000]/10 border border-[#ff0000]/30 text-[#ff4444] hover:bg-[#ff0000]/20 transition-colors font-heading font-semibold text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5V8.5l6.25 3.5-6.25 3.5z" />
            </svg>
            Buscar no YouTube
          </a>
        </div>
      </div>
    </div>
  )
}
