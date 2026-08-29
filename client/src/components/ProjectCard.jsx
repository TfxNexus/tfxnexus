import { motion } from 'framer-motion'
import { Terminal, ExternalLink, Gamepad2, Sparkles, Code2 } from 'lucide-react'
import { SkillTag } from './SkillTag'

const categoryIcon = {
  Games: Gamepad2,
  Interests: Sparkles,
  'Personal Projects': Code2,
}

export function ProjectCard({ project, index = 0, category }) {
  const { title, description, techStack, repoUrl, liveUrl, imageUrl } = project
  const Icon = categoryIcon[category] || Code2

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      className="relative border flex flex-col h-full group transition-colors duration-200"
      style={{ background: 'var(--bg-raised)', borderColor: 'var(--border-hairline)' }}
    >
      {/* Top accent line, appears on hover */}
      <div
        className="h-0.5 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
        style={{ background: 'var(--accent-dev)' }}
      />

      {/* Image area */}
      {imageUrl ? (
        <div className="relative w-full h-40 overflow-hidden flex-shrink-0" style={{ background: 'var(--bg)' }}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div
          className="relative w-full h-24 flex-shrink-0 flex items-center justify-center border-b"
          style={{ background: 'var(--bg)', borderColor: 'var(--border-hairline)' }}
        >
          <Icon size={32} strokeWidth={1.25} style={{ color: 'var(--text-muted)' }} />
        </div>
      )}

      {/* Content */}
      <div className="relative flex-1 flex flex-col gap-2.5 p-5">
        <h3 className="text-base font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>{description}</p>

        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {techStack.map(skill => (
              <SkillTag key={skill} skill={skill} />
            ))}
          </div>
        )}

        {(repoUrl || liveUrl) && (
          <div className="flex gap-4 pt-3 mt-auto border-t" style={{ borderColor: 'var(--border-hairline)' }}>
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono-label text-xs transition-colors"
                style={{ color: 'var(--accent-dev)' }}
              >
                <Terminal size={13} strokeWidth={1.75} /> Source
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono-label text-xs transition-colors"
                style={{ color: 'var(--accent-dev)' }}
              >
                <ExternalLink size={13} strokeWidth={1.75} /> Visit
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}