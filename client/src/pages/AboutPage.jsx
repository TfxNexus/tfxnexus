import { motion } from 'framer-motion'
import { GraduationCap, Wrench, Mail, Github, Code2, Palette, Zap, Coffee, Database } from 'lucide-react'
import { useFetch } from '../hooks/useFetch'
import { API_BASE } from '../lib/apiBase'
import { AnimatedPage } from '../components/AnimatedPage'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'

const skillIcons = {
  HTML: Code2, CSS: Palette, JavaScript: Zap, React: Zap,
  Java: Coffee, SQL: Database,
}

function SectionLabel({ Icon, children }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <Icon size={16} style={{ color: 'var(--accent-dev)' }} strokeWidth={1.75} />
      <h2 className="font-mono-label text-xs" style={{ color: 'var(--accent-dev)' }}>{children}</h2>
    </div>
  )
}

export function AboutPage() {
  const { data: profile, loading, error } = useFetch(`${API_BASE}/api/profile`)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <AnimatedPage>
      {/* Hero banner */}
      <div className="relative overflow-hidden border-b" style={{ borderColor: 'var(--border-hairline)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div
              className="w-20 h-20 flex items-center justify-center text-2xl font-bold flex-shrink-0 border"
              style={{ background: 'var(--bg-raised)', borderColor: 'var(--accent-dev-dim)', color: 'var(--accent-dev)' }}
            >
              JT
            </div>
            <div>
              <p className="font-mono-label text-xs mb-2" style={{ color: 'var(--accent-dev)' }}>{'// profile'}</p>
              <h1 className="text-4xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{profile.name}</h1>
              <p style={{ color: 'var(--text-secondary)' }}>{profile.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-14">

        {/* Bio */}
        <section>
          <SectionLabel Icon={Code2}>About me</SectionLabel>
          <div className="border p-6" style={{ borderColor: 'var(--border-hairline)', background: 'var(--bg-raised)' }}>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{profile.bio}</p>
          </div>
        </section>

        {/* RMIT highlight */}
        <section>
          <div className="relative border p-6" style={{ borderColor: 'var(--accent-dev-dim)', background: 'var(--bg-raised)' }}>
            <div className="flex items-start gap-4">
              <GraduationCap size={28} strokeWidth={1.5} style={{ color: 'var(--accent-dev)' }} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-mono-label text-xs mb-1" style={{ color: 'var(--accent-dev)' }}>
                  Academic achievement
                </p>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>50% Merit Scholarship, RMIT University</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Awarded a 50% merit scholarship at RMIT University, recognising academic excellence
                  and commitment to the field of technology. This achievement drives me to keep
                  pushing my limits every day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <SectionLabel Icon={Wrench}>Skills</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px" style={{ background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)' }}>
            {profile.skills.map((skill, i) => {
              const Icon = skillIcons[skill] || Code2
              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="flex items-center gap-3 px-4 py-3"
                  style={{ background: 'var(--bg-raised)' }}
                >
                  <Icon size={16} strokeWidth={1.75} style={{ color: 'var(--accent-dev)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{skill}</span>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Contact */}
        <section>
          <SectionLabel Icon={Mail}>Get in touch</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)' }}>
            <a
              href={`mailto:${profile.contact.email}`}
              className="flex items-center gap-4 px-5 py-4 transition-colors group"
              style={{ background: 'var(--bg-raised)' }}
            >
              <Mail size={20} strokeWidth={1.5} style={{ color: 'var(--text-muted)' }} />
              <div>
                <p className="font-mono-label text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>Email</p>
                <p className="text-sm transition-colors" style={{ color: 'var(--accent-dev)' }}>
                  {profile.contact.email}
                </p>
              </div>
            </a>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-4 transition-colors group"
              style={{ background: 'var(--bg-raised)' }}
            >
              <Github size={20} strokeWidth={1.5} style={{ color: 'var(--text-muted)' }} />
              <div>
                <p className="font-mono-label text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>GitHub</p>
                <p className="text-sm transition-colors" style={{ color: 'var(--accent-dev)' }}>
                  TfxNexus
                </p>
              </div>
            </a>
          </div>
        </section>

      </div>
    </AnimatedPage>
  )
}