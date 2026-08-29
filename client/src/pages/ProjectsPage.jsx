import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, Target, Code2, Sparkles, Search } from 'lucide-react'
import { useFetch } from '../hooks/useFetch'
import { API_BASE } from '../lib/apiBase'
import { AnimatedPage } from '../components/AnimatedPage'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { GameCard } from '../components/GameCard'
import { ProjectCard } from '../components/ProjectCard'

const CATEGORY_ORDER = ['Games', 'Hobbies', 'Personal Projects', 'Interests']
const CATEGORY_ICONS = {
  Games: Gamepad2,
  Hobbies: Target,
  'Personal Projects': Code2,
  Interests: Sparkles,
}
const SUBCATEGORIES = {
  Games: ['All', 'Rhythm', 'FPS', 'Battle Royale', 'RPG', 'Strategy', 'Speedrun', 'Action RPG', 'Strategy RPG'],
  Hobbies: ['All'],
  'Personal Projects': ['All'],
  Interests: ['All'],
}
const PAGE_SIZE = 6

function groupByCategory(projects) {
  return CATEGORY_ORDER.reduce((acc, cat) => {
    const items = projects.filter(p => p.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {})
}

export function ProjectsPage() {
  const { data: projects, loading, error } = useFetch(`${API_BASE}/api/projects`)
  const [activeFilter, setActiveFilter] = useState({})
  const [visibleCount, setVisibleCount] = useState({})
  const [searchQuery, setSearchQuery] = useState({})

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  const grouped = groupByCategory(projects)

  return (
    <AnimatedPage>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        <div>
          <p className="font-mono-label text-xs mb-2" style={{ color: 'var(--accent-dev)' }}>{'// projects & games'}</p>
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>What I build and play</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Everything I play, build, and care about.</p>
        </div>

        {Object.entries(grouped).map(([category, items]) => {
          const subs = SUBCATEGORIES[category] || ['All']
          const filter = activeFilter[category] || 'All'
          const query = (searchQuery[category] || '').toLowerCase()
          const filtered = (filter === 'All' ? items : items.filter(p => p.subcategory === filter))
            .filter(p => !query || p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
          const shown = visibleCount[category] ?? PAGE_SIZE
          const visible = filtered.slice(0, shown)
          const hasMore = filtered.length > shown
          const CategoryIcon = CATEGORY_ICONS[category]
          const isGameRegister = category === 'Games' || category === 'Hobbies'

          return (
            <section key={category}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-5">
                <CategoryIcon
                  size={18}
                  strokeWidth={1.75}
                  style={{ color: isGameRegister ? 'var(--accent-game)' : 'var(--accent-dev)' }}
                />
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{category}</h2>
                <div className="flex-1 h-px" style={{ background: 'var(--border-hairline)' }} />
                <span className="font-mono-label text-xs" style={{ color: 'var(--text-muted)' }}>{filtered.length} items</span>
              </div>

              {/* Subcategory filter tabs + search */}
              {subs.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {subs.map(sub => {
                    const isActive = filter === sub
                    return (
                      <button
                        key={sub}
                        onClick={() => {
                          setActiveFilter(prev => ({ ...prev, [category]: sub }))
                          setVisibleCount(prev => ({ ...prev, [category]: PAGE_SIZE }))
                        }}
                        className="px-3 py-1.5 font-mono-label text-xs border transition-colors duration-150"
                        style={{
                          background: isActive ? 'var(--accent-game)' : 'transparent',
                          color: isActive ? '#1A0A0E' : 'var(--text-muted)',
                          borderColor: isActive ? 'var(--accent-game)' : 'var(--border-hairline-strong)',
                        }}
                      >
                        {sub}
                      </button>
                    )
                  })}
                  <div className="ml-auto relative">
                    <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery[category] || ''}
                      onChange={e => setSearchQuery(prev => ({ ...prev, [category]: e.target.value }))}
                      className="pl-7 pr-3 py-1.5 font-mono-label text-xs border focus:outline-none w-32"
                      style={{ background: 'var(--bg-raised)', borderColor: 'var(--border-hairline-strong)', color: 'var(--text-secondary)' }}
                    />
                  </div>
                </div>
              )}

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                <AnimatePresence mode="popLayout">
                  {visible.map((project, index) =>
                    isGameRegister ? (
                      <GameCard key={project.id} project={project} index={index} />
                    ) : (
                      <ProjectCard key={project.id} project={project} index={index} category={category} />
                    )
                  )}
                </AnimatePresence>
              </div>

              {/* Load more */}
              {hasMore && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setVisibleCount(prev => ({ ...prev, [category]: (prev[category] ?? PAGE_SIZE) + PAGE_SIZE }))}
                    className="px-6 py-2.5 border font-mono-label text-xs transition-all"
                    style={{ borderColor: 'var(--border-hairline-strong)', color: 'var(--text-secondary)', background: 'var(--bg-raised)' }}
                  >
                    Load more ({filtered.length - shown} remaining)
                  </button>
                </div>
              )}
            </section>
          )
        })}
      </div>
    </AnimatedPage>
  )
}