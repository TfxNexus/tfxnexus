import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Baby, School, Gamepad2, Music, MapPin, Code2, Trophy,
  Video, Database, GraduationCap, Rocket,
} from 'lucide-react'
import { AnimatedPage } from '../components/AnimatedPage'

const events = [
  {
    date: 'May 24, 2006',
    title: 'Born in Bangkok, Thailand',
    description: 'Born to Vietnamese parents with American passports in Bangkok, Thailand. The beginning of a multicultural journey.',
    Icon: Baby,
  },
  {
    date: '2010',
    title: 'Early childhood in Bangkok',
    description: 'Growing up in Bangkok, attending Lertlah Kaset Nawamin School. Early exposure to technology and games.',
    Icon: School,
  },
  {
    date: '2014',
    title: 'First steps into gaming',
    description: 'Discovered a passion for video games. Started with casual games and quickly developed competitive instincts.',
    Icon: Gamepad2,
  },
  {
    date: '2018',
    title: 'Discovered osu!',
    description: 'Started playing osu! competitively. This rhythm game became a defining part of my identity and sharpened my precision and focus.',
    Icon: Music,
  },
  {
    date: '2020',
    title: 'Moved to Vietnam',
    description: 'Family relocated from Bangkok to Ho Chi Minh City, Vietnam. A major life transition that opened new opportunities.',
    Icon: MapPin,
  },
  {
    date: '2021',
    title: 'Started coding',
    description: 'Wrote my first lines of HTML and CSS. Immediately fell in love with the idea of building things from scratch on the web.',
    Icon: Code2,
  },
  {
    date: '2022',
    title: 'Reached Fortnite Unreal rank',
    description: 'Achieved Unreal rank in Fortnite, the highest competitive rank. Proof that dedication and practice pay off.',
    Icon: Trophy,
  },
  {
    date: '2023',
    title: 'Started YouTube channel',
    description: 'Launched @TfxNexusOsu on YouTube, sharing osu! gameplay and gaming content. Grew to over 1,000 subscribers.',
    Icon: Video,
  },
  {
    date: '2024',
    title: 'Backend internship',
    description: 'Completed a backend internship working with SQL databases, designing tables and views, and connecting to frontend applications.',
    Icon: Database,
  },
  {
    date: 'March 2025',
    title: 'RMIT University — 50% scholarship',
    description: 'Enrolled at RMIT University with a 50% merit scholarship. A proud achievement that reflects years of hard work and dedication.',
    Icon: GraduationCap,
  },
  {
    date: 'Present',
    title: 'Building & growing',
    description: 'Actively developing full-stack projects, improving osu! rank, creating content, and looking for opportunities to grow as a developer.',
    Icon: Rocket,
  },
]

function TimelineEvent({ event }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-15% 0px -15% 0px' })
  const { Icon } = event

  return (
    <div ref={ref} className="relative flex gap-5">
      {/* Marker */}
      <div className="relative flex-shrink-0 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3 }}
          className="w-9 h-9 flex items-center justify-center border z-10"
          style={{ borderColor: 'var(--accent-dev)', background: 'var(--bg)' }}
        >
          <Icon size={15} strokeWidth={1.75} style={{ color: 'var(--accent-dev)' }} />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex-1 pb-10"
      >
        <p className="font-mono-label text-xs mb-1" style={{ color: 'var(--accent-dev)' }}>{event.date}</p>
        <h3 className="text-base font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>{event.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{event.description}</p>
      </motion.div>
    </div>
  )
}

export function HistoryPage() {
  return (
    <AnimatedPage>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-14">
          <p className="font-mono-label text-xs mb-2" style={{ color: 'var(--accent-dev)' }}>{'// timeline'}</p>
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>My history</h1>
          <p style={{ color: 'var(--text-secondary)' }}>From Bangkok to Vietnam, from HTML to full-stack. Here's my journey.</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-[17px] top-4 bottom-4 w-px" style={{ background: 'var(--border-hairline-strong)' }} />

          <div className="flex flex-col">
            {events.map((event, i) => (
              <TimelineEvent key={i} event={event} />
            ))}
          </div>
        </div>

        {/* End marker */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-dev)' }} />
          <p className="font-mono-label text-xs" style={{ color: 'var(--text-muted)' }}>To be continued...</p>
        </div>
      </div>
    </AnimatedPage>
  )
}