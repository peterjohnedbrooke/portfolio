import Link from 'next/link'

const socialLinks = [
  { href: 'https://github.com/peterjohnedbrooke', label: 'GitHub', shortLabel: 'GH' },
  { href: 'https://linkedin.com/in/peter-edbrooke-b29b0a203', label: 'LinkedIn', shortLabel: 'LI' },
  { href: 'mailto:peter.john.edbrooke@gmail.com', label: 'Email', shortLabel: 'EM' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="border-t mt-32"
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p
          className="text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          © {year} — Built with Next.js 16 &amp; Tailwind CSS
        </p>

        <ul className="flex items-center gap-2" role="list">
          {socialLinks.map(({ href, label, shortLabel }) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="skill-key"
                style={{ cursor: 'pointer' }}
              >
                {shortLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
