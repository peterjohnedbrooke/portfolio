import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import FeaturedWork from '@/components/sections/FeaturedWork'
import SkillGrid from '@/components/sections/SkillGrid'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Peter J Edbrooke — Senior Frontend Developer',
  description:
    'Senior React & TypeScript developer at Zengenti, available for freelance work across the UK.',
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats strip */}
      <AnimatedSection>
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <ul
            className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6"
            aria-label="Career highlights"
            role="list"
          >
            {([
              { value: '7+',       label: 'Years experience'     },
              { value: '20+',      label: 'Projects delivered'   },
              { value: 'WCAG 2.2', label: 'Accessibility expert' },
              { value: 'Remote',   label: 'Available now'        },
            ] as const).map(({ value, label }) => (
              <li
                key={label}
                className="flex flex-col items-center text-center gap-1"
                role="listitem"
              >
                <span
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {value}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <FeaturedWork />
      <SkillGrid />

      {/* CTA banner */}
      <section aria-labelledby="cta-heading" className="max-w-6xl mx-auto px-6 py-24">
        <AnimatedSection>
          <div
            className="rounded-2xl p-10 text-center flex flex-col items-center gap-6"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div className="flex flex-col gap-3">
              <span className="section-label justify-center" aria-hidden="true">
                Let&apos;s work together
              </span>
              <h2
                id="cta-heading"
                className="text-4xl sm:text-5xl font-bold tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Got a project in mind?
              </h2>
              <p
                className="max-w-md text-base leading-relaxed mx-auto"
                style={{ color: 'var(--text-muted)' }}
              >
                I&apos;m available for freelance projects, contract work, and consulting.
                Let&apos;s build something great together.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="key-btn key-btn--accent">
                Start a conversation
              </Link>
              <Link href="/work" className="key-btn">
                See my work first
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
