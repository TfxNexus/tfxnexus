import { Download } from 'lucide-react'
import { useFetch } from '../hooks/useFetch'
import { API_BASE } from '../lib/apiBase'
import { AnimatedPage } from '../components/AnimatedPage'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { SkillTag } from '../components/SkillTag'

export function ResumePage() {
  const { data: resume, loading, error } = useFetch(`${API_BASE}/api/resume`)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <AnimatedPage>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-14">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="font-mono-label text-xs mb-2" style={{ color: 'var(--accent-dev)' }}>{'// resume'}</p>
            <h1 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>Resume</h1>
          </div>
          <a
            href="/resume.pdf"
            download="Johnny_Tran_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 font-mono-label text-xs transition-colors duration-150"
            style={{ background: 'var(--accent-dev)', color: '#0B0B0F' }}
          >
            <Download size={14} strokeWidth={2} /> Download PDF
          </a>
        </div>

        {/* Experience */}
        {resume.experience.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-mono-label text-xs whitespace-nowrap" style={{ color: 'var(--accent-dev)' }}>Experience</h2>
              <div className="flex-1 h-px" style={{ background: 'var(--border-hairline)' }} />
            </div>
            <div className="space-y-px" style={{ background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)' }}>
              {resume.experience.map((entry, i) => (
                <div key={i} className="p-5" style={{ background: 'var(--bg-raised)' }}>
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{entry.title}</h3>
                      <p className="text-sm" style={{ color: 'var(--accent-dev)' }}>{entry.company}</p>
                    </div>
                    <span className="font-mono-label text-xs px-2.5 py-1 border" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-hairline-strong)' }}>
                      {entry.period}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{entry.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-mono-label text-xs whitespace-nowrap" style={{ color: 'var(--accent-dev)' }}>Education</h2>
              <div className="flex-1 h-px" style={{ background: 'var(--border-hairline)' }} />
            </div>
            <div className="space-y-px" style={{ background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)' }}>
              {resume.education.map((entry, i) => (
                <div key={i} className="p-5" style={{ background: 'var(--bg-raised)' }}>
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{entry.degree}</h3>
                      <p className="text-sm" style={{ color: 'var(--accent-dev)' }}>{entry.institution}</p>
                    </div>
                    <span className="font-mono-label text-xs px-2.5 py-1 border" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-hairline-strong)' }}>
                      {entry.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-mono-label text-xs whitespace-nowrap" style={{ color: 'var(--accent-dev)' }}>Skills</h2>
            <div className="flex-1 h-px" style={{ background: 'var(--border-hairline)' }} />
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map(skill => (
              <SkillTag key={skill} skill={skill} />
            ))}
          </div>
        </section>

      </div>
    </AnimatedPage>
  )
}