import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Cake, MapPin, GraduationCap, Music, Video, Globe2 } from 'lucide-react'
import { useFetch } from '../hooks/useFetch'
import { API_BASE } from '../lib/apiBase'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { ScrollProgress } from '../components/ScrollProgress'

const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'facts', label: 'Quick facts' },
  { id: 'origin', label: 'My story' },
  { id: 'developer', label: 'Who I am' },
  { id: 'rmit', label: 'Scholarship' },
  { id: 'gaming', label: 'Beyond the code' },
  { id: 'next', label: "What's next" },
]

function SlideSection({ children, fromRight = false, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-15% 0px -15% 0px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: fromRight ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromRight ? 40 : -40 }}
      transition={{ duration: 0.5, delay: inView ? delay : 0, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

const quickFacts = [
  { Icon: Cake, label: 'Born', value: 'May 24, 2006' },
  { Icon: Globe2, label: 'Birthplace', value: 'Bangkok, Thailand' },
  { Icon: MapPin, label: 'Based in', value: 'Vietnam (since 2020)' },
  { Icon: GraduationCap, label: 'University', value: 'RMIT — 50% Scholarship' },
  { Icon: Music, label: 'osu! Rank', value: '#3,022 Global' },
  { Icon: Video, label: 'YouTube', value: '1.4K Subscribers' },
]

export function HomePage() {
  const { data: profile, loading, error } = useFetch(`${API_BASE}/api/profile`)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="relative">
      <ScrollProgress sections={sections} />

      {/* Hero */}
      <section
        id="hero"
        className="relative overflow-hidden mb-16 border-b"
        style={{ borderColor: 'var(--border-hairline)' }}
      >
        <div className="relative z-10 px-4 sm:px-8 py-20 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}>
            <p className="font-mono-label text-xs mb-3" style={{ color: 'var(--accent-dev)' }}>
              {'// hi, im'}
            </p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {profile.name}
            </h1>
            <p className="text-xl sm:text-2xl mb-6" style={{ color: 'var(--text-secondary)' }}>
              {profile.tagline}
            </p>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-xl mb-10"
              style={{ color: 'var(--text-secondary)' }}
            >
              {profile.bio}
            </p>
            <div className="flex flex-wrap gap-3 font-mono-label text-xs">
              <Link
                to="/projects"
                className="px-5 py-3 rounded-sm font-medium transition-colors"
                style={{ background: 'var(--accent-dev)', color: '#0B0B0F' }}
              >
                View projects
              </Link>
              <Link
                to="/resume"
                className="px-5 py-3 rounded-sm border transition-colors"
                style={{ borderColor: 'var(--border-hairline-strong)', color: 'var(--text-secondary)' }}
              >
                View resume
              </Link>
              <Link
                to="/history"
                className="px-5 py-3 rounded-sm border transition-colors"
                style={{ borderColor: 'var(--border-hairline)', color: 'var(--text-muted)' }}
              >
                My history
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick facts — spec-sheet style */}
      <section id="facts" className="px-4 sm:px-0 mb-20">
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-px"
          style={{ background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)' }}
        >
          {quickFacts.map(({ Icon, label, value }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="px-4 py-4"
              style={{ background: 'var(--bg-raised)' }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon size={14} style={{ color: 'var(--accent-dev)' }} strokeWidth={1.75} />
                <span className="font-mono-label text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story sections */}
      <div className="space-y-24 px-4 sm:px-0 pb-24">

        {/* 1: Origin */}
        <div id="origin" className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <SlideSection fromRight={false}>
            <p className="font-mono-label text-xs mb-2" style={{ color: 'var(--accent-dev)' }}>My story</p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Born in Bangkok, raised in Vietnam
            </h2>
            <p className="leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
              I was born on May 24, 2006 in Bangkok, Thailand to Vietnamese parents, both holding
              American passports. I attended Lertlah Kaset Nawamin School in Bangkok during my early
              years, where I first discovered my love for technology and games.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              In 2020, my family moved to Vietnam, where I've been building my life and career ever since.
              That multicultural background shapes how I think and how I build things for people.
            </p>
            <div className="flex flex-wrap gap-2 mt-4 font-mono-label text-xs">
              <span className="px-3 py-1 border rounded-sm" style={{ borderColor: 'var(--border-hairline-strong)', color: 'var(--text-secondary)' }}>Bangkok born</span>
              <span className="px-3 py-1 border rounded-sm" style={{ borderColor: 'var(--border-hairline-strong)', color: 'var(--text-secondary)' }}>Vietnam based</span>
              <span className="px-3 py-1 border rounded-sm" style={{ borderColor: 'var(--border-hairline-strong)', color: 'var(--text-secondary)' }}>US passport</span>
            </div>
          </SlideSection>
          <SlideSection fromRight={true} delay={0.05}>
            <div
              className="h-60 rounded-sm border flex items-center justify-center font-mono-label text-xs"
              style={{ borderColor: 'var(--border-hairline)', background: 'var(--bg-raised)', color: 'var(--text-muted)' }}
            >
              [ your photo here ]
            </div>
          </SlideSection>
        </div>

        {/* 2: Developer */}
        <div id="developer" className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <SlideSection fromRight={false}>
            <div
              className="h-60 rounded-sm border flex items-center justify-center font-mono-label text-xs"
              style={{ borderColor: 'var(--border-hairline)', background: 'var(--bg-raised)', color: 'var(--text-muted)' }}
            >
              [ project screenshot here ]
            </div>
          </SlideSection>
          <SlideSection fromRight={true}>
            <p className="font-mono-label text-xs mb-2" style={{ color: 'var(--accent-dev)' }}>Who I am</p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              A developer with a passion for craft
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I started coding because I wanted to build things that felt alive. From my first HTML page
              to full-stack React apps, every project has been a step toward mastering the craft of
              software development. I care deeply about clean code, good design, and building things
              that actually work.
            </p>
          </SlideSection>
        </div>

        {/* 3: RMIT */}
        <div id="rmit" className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <SlideSection fromRight={false}>
            <p className="font-mono-label text-xs mb-2" style={{ color: 'var(--accent-dev)' }}>Academic achievement</p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              50% RMIT scholarship
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              Earning a 50% merit scholarship at RMIT University is one of the achievements I'm most
              proud of. It represents not just academic performance, but the recognition that hard work
              and dedication genuinely pay off.
            </p>
            <div
              className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-sm border"
              style={{ borderColor: 'var(--accent-dev-dim)', background: 'var(--bg-raised)' }}
            >
              <span className="text-2xl font-bold" style={{ color: 'var(--accent-dev)' }}>50%</span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Merit scholarship, RMIT University</span>
            </div>
          </SlideSection>
          <SlideSection fromRight={true} delay={0.05}>
            <div
              className="h-60 rounded-sm border flex items-center justify-center font-mono-label text-xs"
              style={{ borderColor: 'var(--border-hairline)', background: 'var(--bg-raised)', color: 'var(--text-muted)' }}
            >
              [ RMIT photo/carousel here ]
            </div>
          </SlideSection>
        </div>

        {/* 4: Gaming — distinct register */}
        <div id="gaming">
          <SlideSection fromRight={false}>
          <div
            className="relative panel-clip halftone-bg p-8 sm:p-10 border"
            style={{ background: 'var(--accent-game-bg)', borderColor: 'var(--accent-game-border)' }}
          >
            <div
              className="absolute top-0 left-0 w-16 h-1"
              style={{ background: 'var(--accent-game)' }}
            />
            <p className="font-mono-label text-xs mb-2" style={{ color: 'var(--accent-game)' }}>Beyond the code</p>
            <h2
              className="text-3xl sm:text-4xl font-bold italic mb-4"
              style={{ color: '#FFFFFF', textShadow: '2px 2px 0 var(--accent-game)' }}
            >
              Gaming sharpens my thinking
            </h2>
            <p className="leading-relaxed mb-6 max-w-2xl" style={{ color: '#C7A9AF' }}>
              osu!, Valorant, and Fortnite aren't just hobbies. They've trained my reaction time,
              strategic thinking, and ability to stay calm under pressure, the same focus I bring to
              debugging a tricky problem at 2am. Full live stats are on the{' '}
              <Link to="/projects" style={{ color: 'var(--accent-game)' }}>projects page</Link>.
            </p>
            <div className="flex flex-wrap gap-2 font-mono-label text-xs">
              {['osu!', 'Valorant', 'Fortnite'].map(tag => (
                <span
                  key={tag}
                  className="panel-clip-sm px-3 py-1"
                  style={{ background: 'var(--accent-game)', color: '#4A1B0C' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          </SlideSection>
        </div>

        {/* 5: What's next */}
        <div id="next" className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <SlideSection fromRight={false}>
            <p className="font-mono-label text-xs mb-2" style={{ color: 'var(--accent-dev)' }}>What's next</p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Building toward something real
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              I'm actively looking for opportunities to grow as a developer, whether through
              internships, collaborative projects, or open source contributions. I want to work on
              things that matter and with people who care about quality.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono-label text-xs transition-colors"
              style={{ color: 'var(--accent-dev)' }}
            >
              See my work →
            </Link>
          </SlideSection>
          <SlideSection fromRight={true} delay={0.05}>
            <div
              className="h-60 rounded-sm border flex items-center justify-center font-mono-label text-xs"
              style={{ borderColor: 'var(--border-hairline)', background: 'var(--bg-raised)', color: 'var(--text-muted)' }}
            >
              [ photo here ]
            </div>
          </SlideSection>
        </div>

      </div>
    </div>
  )
}