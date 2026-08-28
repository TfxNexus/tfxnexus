import { motion } from 'framer-motion'
import { Gamepad2 } from 'lucide-react'
import { useFetch } from '../hooks/useFetch'
import { API_BASE } from '../lib/apiBase'

function LiveBadge() {
  return (
    <span className="flex items-center gap-1 font-mono-label text-xs" style={{ color: 'var(--accent-game)' }}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-game)' }} />
      Live
    </span>
  )
}

function OsuStats() {
  const { data, loading, error } = useFetch(`${API_BASE}/api/stats/osu`)
  if (loading) return <p className="text-xs text-gray-500">Loading...</p>
  if (error || !data) return <p className="text-xs text-gray-500">Stats unavailable</p>
  return (
    <div className="grid grid-cols-2 gap-1.5 mt-2">
      <Stat label="Global Rank" value={`#${data.rank?.toLocaleString()}`} />
      <Stat label="Country Rank" value={`#${data.countryRank?.toLocaleString()}`} />
      <Stat label="PP" value={`${data.pp}pp`} />
      <Stat label="Accuracy" value={`${data.accuracy}%`} />
    </div>
  )
}

function DraftoutStats() {
  const { data, loading, error } = useFetch(`${API_BASE}/api/stats/draftout`)
  if (loading) return <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Loading...</p>
  if (error || !data) return <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Stats unavailable</p>
  return (
    <div className="grid grid-cols-3 gap-1.5 mt-2">
      <Stat label="Peak ELO" value={data.elo} />
      <Stat label="Win rate" value={`${data.winRate}%`} />
      <Stat label="Best streak" value={data.bestStreak} />
    </div>
  )
}

function ChessStats() {
  const { data, loading, error } = useFetch(`${API_BASE}/api/stats/chess`)
  if (loading) return <p className="text-xs text-gray-500">Loading...</p>
  if (error || !data) return <p className="text-xs text-gray-500">Stats unavailable</p>
  return (
    <div className="grid grid-cols-3 gap-1.5 mt-2">
      {data.rapid && <Stat label="Rapid" value={data.rapid} />}
      {data.blitz && <Stat label="Blitz" value={data.blitz} />}
      {data.bullet && <Stat label="Bullet" value={data.bullet} />}
    </div>
  )
}

function ClashRoyaleStats() {
  const { data, loading, error } = useFetch(`${API_BASE}/api/stats/clashroyale`)
  if (loading) return <p className="text-xs text-gray-500">Loading...</p>
  if (error || !data) return <p className="text-xs text-gray-500">Stats unavailable</p>
  return (
    <div className="grid grid-cols-2 gap-1.5 mt-2">
      <Stat label="Trophies" value={data.trophies?.toLocaleString()} />
      <Stat label="Best" value={data.bestTrophies?.toLocaleString()} />
      <Stat label="Wins" value={data.wins?.toLocaleString()} />
      <Stat label="Level" value={data.level} />
    </div>
  )
}

function ClashOfClansStats() {
  const { data, loading, error } = useFetch(`${API_BASE}/api/stats/clashofclans`)
  if (loading) return <p className="text-xs text-gray-500">Loading...</p>
  if (error || !data) return <p className="text-xs text-gray-500">Stats unavailable</p>
  return (
    <div className="grid grid-cols-2 gap-1.5 mt-2">
      <Stat label="Town Hall" value={`TH${data.townHallLevel}`} />
      <Stat label="Trophies" value={data.trophies?.toLocaleString()} />
      <Stat label="Best" value={data.bestTrophies?.toLocaleString()} />
      <Stat label="War Stars" value={data.warStars?.toLocaleString()} />
    </div>
  )
}

function YouTubeStats() {
  const { data, loading, error } = useFetch(`${API_BASE}/api/stats/youtube`)
  if (loading) return <p className="text-xs text-gray-500">Loading...</p>
  if (error || !data) return <p className="text-xs text-gray-500">Stats unavailable</p>
  return (
    <div className="grid grid-cols-3 gap-1.5 mt-2">
      <Stat label="Subscribers" value={data.subscribers >= 1000 ? `${(data.subscribers/1000).toFixed(1)}K` : data.subscribers} />
      <Stat label="Videos" value={data.videos} />
      <Stat label="Views" value={data.views >= 1000 ? `${(data.views/1000).toFixed(1)}K` : data.views} />
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="px-2 py-1.5 text-center border" style={{ borderColor: 'var(--accent-game-border)', background: 'rgba(0,0,0,0.2)' }}>
      <p className="text-sm font-bold leading-none" style={{ color: '#FFFFFF' }}>{value}</p>
      <p className="font-mono-label text-xs mt-1" style={{ color: '#E88A9A' }}>{label}</p>
    </div>
  )
}

function LiveStats({ stats }) {
  if (!stats) return null
  if (!stats.live) {
    return (
      <div className="mt-2 px-3 py-2 flex items-center justify-between border" style={{ borderColor: 'var(--accent-game-border)', background: 'rgba(0,0,0,0.2)' }}>
        <span className="font-mono-label text-xs" style={{ color: '#E88A9A' }}>{stats.label}</span>
        <span className="text-sm font-bold" style={{ color: '#FFFFFF' }}>{stats.value}</span>
      </div>
    )
  }
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono-label text-xs" style={{ color: '#E88A9A' }}>Stats</span>
        <LiveBadge />
      </div>
      {stats.type === 'osu' && <OsuStats />}
      {stats.type === 'draftout' && <DraftoutStats />}
      {stats.type === 'chess' && <ChessStats />}
      {stats.type === 'clashroyale' && <ClashRoyaleStats />}
      {stats.type === 'clashofclans' && <ClashOfClansStats />}
      {stats.type === 'youtube' && <YouTubeStats />}
    </div>
  )
}

export function GameCard({ project, index = 0 }) {
  const { title, description, imageUrl, liveUrl, stats, characterImage, characterName } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
      className="relative panel-clip halftone-bg border flex flex-col h-full group"
      style={{ background: 'var(--accent-game-bg)', borderColor: 'var(--accent-game-border)' }}
    >
      {/* Top accent line */}
      <div className="h-1 w-full" style={{ background: 'var(--accent-game)' }} />

      {/* Image */}
      <div className="relative w-full h-36 overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="max-h-full max-w-[80%] object-contain group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.style.display = 'none' }}
          />
        ) : (
          <Gamepad2 size={40} strokeWidth={1.5} style={{ color: 'var(--accent-game)', opacity: 0.4 }} />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--accent-game-bg), transparent)' }} />

        {characterImage && (
          <div className="absolute bottom-1 right-2 z-10">
            <img
              src={characterImage}
              alt={characterName}
              className="h-14 w-auto object-contain"
              onError={e => { e.target.style.display = 'none' }}
              title={characterName}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold italic leading-snug" style={{ color: '#FFFFFF' }}>
            {title}
          </h3>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-label text-xs transition-colors flex-shrink-0 mt-0.5"
              style={{ color: 'var(--accent-game)' }}
            >
              Visit →
            </a>
          )}
        </div>

        <p className="text-xs leading-relaxed" style={{ color: '#C7A9AF' }}>{description}</p>

        <LiveStats stats={stats} />
      </div>
    </motion.div>
  )
}