import AnimatedSection from '@/components/ui/AnimatedSection'

interface SkillCategory {
  label: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    label: 'Core',
    skills: ['React', 'TypeScript', 'JavaScript (ES2024)', 'HTML5', 'CSS3'],
  },
  {
    label: 'Frameworks',
    skills: ['Next.js 16', 'Node.js', 'Express', 'Vite'],
  },
  {
    label: 'Styling',
    skills: ['Tailwind CSS', 'Styled Components', 'CSS Modules', 'Framer Motion'],
  },
  {
    label: 'State & Data',
    skills: ['Redux Toolkit', 'Zustand', 'TanStack Query', 'REST APIs', 'GraphQL'],
  },
  {
    label: 'Tooling',
    skills: ['Git', 'GitHub Actions', 'Vitest', 'Playwright', 'Storybook'],
  },
  {
    label: 'CMS & Platform',
    skills: ['Contensis CMS', 'Headless CMS', 'Vercel', 'AWS'],
  },
]

export default function SkillGrid() {
  return (
    <section
      aria-labelledby="skills-heading"
      className="max-w-6xl mx-auto px-6 py-24"
      style={{ borderTop: '1px solid var(--border-color)' }}
    >
      <AnimatedSection>
        <div className="flex flex-col gap-3 mb-12">
          <span className="section-label" aria-hidden="true">Skills</span>
          <h2
            id="skills-heading"
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Technologies I work with
          </h2>
        </div>
      </AnimatedSection>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => (
          <AnimatedSection key={category.label} delay={i * 0.07}>
            <div className="flex flex-col gap-3">
              <h3
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'var(--accent)' }}
              >
                {category.label}
              </h3>
              <ul className="flex flex-wrap gap-2" role="list">
                {category.skills.map((skill) => (
                  <li key={skill}>
                    <span className="skill-key">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
