import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about my background as a senior React developer at Zengenti, my values, and how I approach frontend engineering.',
}

const values = [
  {
    title: 'Accessibility first',
    description:
      'Every project I deliver meets WCAG 2.2 AA standards. Accessibility isn\'t a checkbox — it\'s a quality baseline.',
  },
  {
    title: 'Performance matters',
    description:
      'I optimise for Core Web Vitals from day one. Fast sites aren\'t just better for SEO — they\'re better for everyone.',
  },
  {
    title: 'Clean, maintainable code',
    description:
      'Future-you (and your team) will thank you. I write code that\'s easy to extend, test, and hand over.',
  },
  {
    title: 'Communication',
    description:
      'I keep clients informed throughout a project. No nasty surprises, no missed deadlines without warning.',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      {/* Header */}
      <AnimatedSection className="mb-16">
        <span className="section-label mb-4 block" aria-hidden="true">About Me</span>
        <h1
          className="text-5xl sm:text-6xl font-bold tracking-tight mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Building for the web,{' '}
          <span className="gradient-text">done properly</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          I&apos;m a senior frontend developer based in the UK, currently working at{' '}
          <a
            href="https://www.zengenti.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            Zengenti
          </a>
          . I specialise in React and TypeScript, building accessible, high-performance websites
          for universities, public sector bodies, and enterprise organisations across the UK.
        </p>
      </AnimatedSection>

      <div className="grid gap-16 lg:grid-cols-2">
        {/* Story */}
        <AnimatedSection delay={0.1} className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            My story
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            <p>
              I started my career building component libraries and CMS-driven websites,
              where I developed a deep appreciation for the craft of accessible, semantic HTML
              paired with well-structured JavaScript.
            </p>
            <p>
              At Zengenti, I work across a range of high-profile projects — from university
              websites serving tens of thousands of students, to public sector portals used
              by hundreds of thousands of residents. I&apos;ve led frontend architecture on
              large-scale React projects and mentored junior developers along the way.
            </p>
            <p>
              Outside of work, I&apos;m passionate about keeping up with the React ecosystem,
              contributing to open-source, and continuously expanding my skillset — which
              is why I&apos;m building this very site with Next.js, TanStack Query, and Framer Motion.
            </p>
          </div>
        </AnimatedSection>

        {/* Values */}
        <AnimatedSection delay={0.15} className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            How I work
          </h2>
          <ul className="flex flex-col gap-4" role="list">
            {values.map((v) => (
              <li
                key={v.title}
                className="card p-5 flex flex-col gap-2"
                style={{ borderRadius: '10px' }}
              >
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {v.description}
                </p>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>

      {/* Currently at */}
      <AnimatedSection delay={0.2} className="mt-16 pt-16" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div
          className="card p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ borderRadius: '14px' }}
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Currently
            </p>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Senior Frontend Developer @ Zengenti
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Herefordshire, UK — React, TypeScript, Contensis CMS
            </p>
          </div>
          <Link href="/contact" className="key-btn key-btn--accent flex-shrink-0">
            Work with me
          </Link>
        </div>
      </AnimatedSection>
    </div>
  )
}
