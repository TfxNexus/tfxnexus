export function SkillTag({ skill }) {
  return (
    <span
      className="inline-block px-2.5 py-0.5 font-mono-label text-xs border rounded-sm"
      style={{ color: 'var(--accent-dev)', borderColor: 'var(--accent-dev-dim)', background: 'rgba(91,140,255,0.06)' }}
    >
      {skill}
    </span>
  )
}