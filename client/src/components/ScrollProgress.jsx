import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress({ sections }) {
  const [active, setActive] = useState(sections[0]?.id)
  const { scrollYProgress } = useScroll()
  const fillHeight = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-0"
      aria-hidden="true"
    >
      {/* Track + fill */}
      <div className="relative w-px h-64" style={{ background: 'var(--border-hairline-strong)' }}>
        <motion.div
          className="absolute top-0 left-0 w-px"
          style={{ height: fillHeight, scaleY: 1, transformOrigin: 'top', background: 'var(--accent-dev)' }}
        />
      </div>

      {/* Section markers, overlaid on the track */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 flex flex-col justify-between py-0">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group relative flex items-center justify-center w-4 h-4 -ml-[1px]"
            aria-label={`Go to ${label}`}
          >
            <span
              className="block rounded-full transition-all duration-200"
              style={{
                width: active === id ? 7 : 5,
                height: active === id ? 7 : 5,
                background: active === id ? 'var(--accent-dev)' : 'var(--border-hairline-strong)',
              }}
            />
            <span
              className="absolute right-full mr-3 whitespace-nowrap font-mono-label text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
              style={{ color: 'var(--text-secondary)' }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}