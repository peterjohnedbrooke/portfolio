import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { featuredProjects } from '@/lib/projects'

export default function FeaturedWork() {
  return (
    <section
      aria-labelledby="work-heading"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-24">
      <AnimatedSection>
        <div className="flex items-end justify-between mb-12 gap-4">
          <div className="flex flex-col gap-3">
            <span className="section-label" aria-hidden="true">Selected Work</span>
            <h2
              id="work-heading"
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Projects I&apos;ve shipped
            </h2>
          </div>
          <Link
            href="/work"
            className="key-btn hidden sm:inline-flex text-sm"
            aria-label="View all projects"
          >
            All work →
          </Link>
        </div>
      </AnimatedSection>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <AnimatedSection key={project.slug} delay={i * 0.08}>
            <article className="card p-6 flex flex-col gap-4 h-full">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--accent)' }}>
                    {project.year}
                  </p>
                  <h3
                    className="font-semibold text-lg leading-snug"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {project.role}
                  </p>
                </div>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title} (opens in new tab)`}
                    className="skill-key flex-shrink-0"
                    style={{ cursor: 'pointer' }}
                  >
                    ↗
                  </a>
                )}
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {project.description}
              </p>

              {/* Tech stack */}
              <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used" role="list">
                {project.tech.slice(0, 4).map((t) => (
                  <li key={t}>
                    <span className="skill-key">{t}</span>
                  </li>
                ))}
                {project.tech.length > 4 && (
                  <li>
                    <span className="skill-key" aria-label={`and ${project.tech.length - 4} more`}>
                      +{project.tech.length - 4}
                    </span>
                  </li>
                )}
              </ul>
            </article>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection className="mt-8 sm:hidden" delay={0.3}>
        <Link href="/work" className="key-btn w-full justify-center">
          View all projects →
        </Link>
      </AnimatedSection>
      </div>
    </section>
  )
}
