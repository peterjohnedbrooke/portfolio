import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { projects } from '@/lib/projects'
import { getGitHubRepos } from '@/lib/github'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'A selection of projects I\'ve worked on — from public sector portals to university websites — built with React, TypeScript, and modern tooling.',
}

export default async function WorkPage() {
  const repos = await getGitHubRepos()
  const topRepos = repos.slice(0, 6)

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      {/* Header */}
      <AnimatedSection className="mb-16">
        <span className="section-label mb-4 block" aria-hidden="true">Work</span>
        <h1
          className="text-5xl sm:text-6xl font-bold tracking-tight mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Projects I&apos;ve <span className="gradient-text">shipped</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          A selection of professional and personal work. All client sites listed are publicly
          accessible — no confidential details included.
        </p>
      </AnimatedSection>

      {/* Client work */}
      <section aria-labelledby="client-work-heading" className="mb-24">
        <AnimatedSection>
          <h2
            id="client-work-heading"
            className="text-2xl font-semibold mb-8"
            style={{ color: 'var(--text-primary)' }}
          >
            Client &amp; professional work
          </h2>
        </AnimatedSection>

        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <AnimatedSection key={project.slug} delay={i * 0.06}>
              <article
                className="card p-6 sm:p-8"
                style={{ borderRadius: '12px' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  {/* Meta */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="text-xs"
                        style={{ color: 'var(--accent)' }}
                      >
                        {project.year}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded border"
                        style={{
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {project.role}
                      </span>
                    </div>

                    <h3
                      className="text-xl font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {project.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed max-w-2xl"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {project.description}
                    </p>

                    <ul
                      className="flex flex-wrap gap-1.5 mt-1"
                      aria-label="Technologies used"
                      role="list"
                    >
                      {project.tech.map((t) => (
                        <li key={t}>
                          <span className="skill-key">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Link */}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.title} (opens in new tab)`}
                      className="key-btn flex-shrink-0 self-start"
                    >
                      Visit site ↗
                    </a>
                  )}
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* GitHub repos */}
      {topRepos.length > 0 && (
        <section aria-labelledby="oss-heading">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-8 gap-4">
              <h2
                id="oss-heading"
                className="text-2xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Open source &amp; personal projects
              </h2>
              <a
                href={`https://github.com/${process.env.GITHUB_USERNAME ?? 'your-github-username'}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View all repositories on GitHub (opens in new tab)"
                className="key-btn hidden sm:inline-flex text-sm"
              >
                GitHub →
              </a>
            </div>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topRepos.map((repo, i) => (
              <AnimatedSection key={repo.id} delay={i * 0.06}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-5 flex flex-col gap-3 h-full no-underline"
                  aria-label={`${repo.name} on GitHub (opens in new tab)`}
                  style={{ display: 'flex', textDecoration: 'none' }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className="text-sm font-medium truncate"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {repo.name}
                    </h3>
                    <span className="skill-key flex-shrink-0" aria-hidden="true">↗</span>
                  </div>

                  {repo.description && (
                    <p
                      className="text-xs leading-relaxed flex-1 line-clamp-3"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {repo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {repo.language && <span>{repo.language}</span>}
                    {repo.stargazers_count > 0 && (
                      <span aria-label={`${repo.stargazers_count} stars`}>
                        ★ {repo.stargazers_count}
                      </span>
                    )}
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
