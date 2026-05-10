import type { Metadata } from 'next'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'My full technical skillset — React, TypeScript, Next.js, Node.js, and the tools I use day-to-day.',
}

interface Skill {
  name: string
  level: 'Expert' | 'Proficient' | 'Familiar'
  years?: number
}

interface Category {
  heading: string
  description: string
  skills: Skill[]
}

const categories: Category[] = [
  {
    heading: 'Frontend Core',
    description: 'The foundation of everything I build.',
    skills: [
      { name: 'React', level: 'Expert', years: 5 },
      { name: 'TypeScript', level: 'Expert', years: 4 },
      { name: 'JavaScript (ES2024)', level: 'Expert', years: 7 },
      { name: 'HTML5 & ARIA', level: 'Expert', years: 7 },
      { name: 'CSS3 & Custom Properties', level: 'Expert', years: 7 },
      { name: 'WCAG 2.2 Accessibility', level: 'Expert', years: 4 },
    ],
  },
  {
    heading: 'Frameworks & Meta-Frameworks',
    description: 'The runtime environments I work in.',
    skills: [
      { name: 'Next.js (App Router)', level: 'Proficient', years: 2 },
      { name: 'Node.js', level: 'Proficient', years: 5 },
      { name: 'Express', level: 'Proficient', years: 4 },
      { name: 'Vite', level: 'Proficient', years: 2 },
    ],
  },
  {
    heading: 'Styling',
    description: 'How I make things look good.',
    skills: [
      { name: 'Tailwind CSS', level: 'Proficient', years: 2 },
      { name: 'Styled Components', level: 'Expert', years: 4 },
      { name: 'CSS Modules', level: 'Expert', years: 5 },
      { name: 'Framer Motion', level: 'Proficient', years: 1 },
      { name: 'GSAP', level: 'Familiar' },
    ],
  },
  {
    heading: 'State & Data',
    description: 'Managing complexity at scale.',
    skills: [
      { name: 'Redux Toolkit', level: 'Expert', years: 4 },
      { name: 'Zustand', level: 'Proficient', years: 1 },
      { name: 'TanStack Query', level: 'Proficient', years: 1 },
      { name: 'REST APIs', level: 'Expert', years: 6 },
      { name: 'GraphQL', level: 'Familiar' },
    ],
  },
  {
    heading: 'Testing & Quality',
    description: 'Confidence through coverage.',
    skills: [
      { name: 'Vitest', level: 'Proficient', years: 2 },
      { name: 'React Testing Library', level: 'Proficient', years: 3 },
      { name: 'Playwright', level: 'Familiar' },
      { name: 'Storybook', level: 'Proficient', years: 2 },
    ],
  },
  {
    heading: 'Tooling & Deployment',
    description: 'From local to production.',
    skills: [
      { name: 'Git & GitHub', level: 'Expert', years: 7 },
      { name: 'GitHub Actions', level: 'Proficient', years: 3 },
      { name: 'Vercel', level: 'Proficient', years: 2 },
      { name: 'AWS (S3, CloudFront)', level: 'Familiar' },
      { name: 'Contensis CMS', level: 'Expert', years: 4 },
    ],
  },
  {
    heading: 'AI & Workflow',
    description: 'Tools that accelerate design implementation, prototyping, and development.',
    skills: [
      { name: 'GitHub Copilot', level: 'Proficient', years: 2 },
      { name: 'Claude Code', level: 'Proficient', years: 1 },
      { name: 'Claude (chat)', level: 'Proficient', years: 1 },
      { name: 'Figma (design handoff)', level: 'Proficient', years: 3 },
    ],
  },
]

const levelChipClass: Record<Skill['level'], string> = {
  Expert:     'skill-chip--expert',
  Proficient: 'skill-chip--proficient',
  Familiar:   'skill-chip--familiar',
}


export default function SkillsPage() {
  return (
    <div>
      {/* Page header — constrained width */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <AnimatedSection>
          <span className="section-label mb-4 block" aria-hidden="true">Skills</span>
          <h1
            className="text-5xl sm:text-6xl font-bold tracking-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            My technical <span className="gradient-text">toolkit</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Seven years of frontend engineering, with a focus on React and TypeScript ecosystems.
            Here&apos;s an honest breakdown of where I sit with each technology.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-8" aria-label="Skill level legend" role="list">
            {(Object.keys(levelChipClass) as Skill['level'][]).map((level) => (
              <span
                key={level}
                className={`skill-chip ${levelChipClass[level]}`}
                role="listitem"
              >
                <span className="skill-chip-dot" aria-hidden="true" />
                {level}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Full-width categories band */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, ci) => (
              <AnimatedSection key={cat.heading} delay={ci * 0.07}>
                <section aria-labelledby={`cat-${ci}`} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h2
                      id={`cat-${ci}`}
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {cat.heading}
                    </h2>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {cat.description}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-2" role="list">
                    {cat.skills.map((skill) => (
                      <li key={skill.name}>
                        <span
                          className={`skill-chip ${levelChipClass[skill.level]}`}
                          aria-label={`${skill.name} — ${skill.level}${skill.years ? `, ${skill.years}+ years` : ''}`}
                        >
                          <span className="skill-chip-dot" aria-hidden="true" />
                          {skill.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications / WCAG callout — constrained width */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <AnimatedSection delay={0.3} className="pt-16">
          <div
            className="card p-8 flex flex-col gap-4"
            style={{ borderRadius: '14px' }}
          >
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Accessibility commitment
            </h2>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              Every project I deliver meets{' '}
              <a
                href="https://www.w3.org/WAI/WCAG22/quickref/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                WCAG 2.2 AA
              </a>{' '}
              standards. For public sector clients this is a legal requirement under the{' '}
              <abbr title="Public Sector Bodies Accessibility Regulations">PSBAR</abbr>, and I treat
              it as a baseline for all work — not an afterthought.
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Accessibility practices" role="list">
              {[
                'Semantic HTML',
                'ARIA labels',
                'Keyboard navigation',
                'Screen reader testing',
                'Colour contrast ≥ 4.5:1',
                'Focus management',
                'Reduced motion support',
              ].map((item) => (
                <li key={item}>
                  <span className="skill-key" style={{ color: '#22c55e', borderColor: 'rgba(34,197,94,0.3)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
