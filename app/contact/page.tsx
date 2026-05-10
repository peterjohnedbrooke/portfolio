import type { Metadata } from 'next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ContactForm from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch to discuss a freelance project, contract work, or consulting engagement.',
}

const contactInfo = [
  { label: 'Based in', value: 'United Kingdom' },
  { label: 'Available for', value: 'Freelance & Contract' },
  { label: 'Typical rate', value: '£450–£550/day' },
  { label: 'Response time', value: 'Within 24 hours' },
]

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      {/* Header */}
      <AnimatedSection className="mb-16">
        <span className="section-label mb-4 block" aria-hidden="true">Contact</span>
        <h1
          className="text-5xl sm:text-6xl font-bold tracking-tight mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Let&apos;s build something{' '}
          <span className="gradient-text">great together</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Whether you have a project in mind, need a contractor for a specific engagement, or
          just want to explore what&apos;s possible — I&apos;d love to hear from you.
        </p>
      </AnimatedSection>

      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
        {/* Form */}
        <AnimatedSection delay={0.1}>
          <ContactForm />
        </AnimatedSection>

        {/* Info panel */}
        <AnimatedSection delay={0.2} className="flex flex-col gap-6">
          {/* Quick facts */}
          <div
            className="card p-6 flex flex-col gap-4"
            style={{ borderRadius: '12px' }}
          >
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Quick facts
            </h2>
            <dl className="flex flex-col gap-3">
              {contactInfo.map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4">
                  <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</dt>
                  <dd
                    className="text-xs font-medium text-right"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Social links */}
          <div
            className="card p-6 flex flex-col gap-4"
            style={{ borderRadius: '12px' }}
          >
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Find me online
            </h2>
            <ul className="flex flex-col gap-2" role="list">
              {[
                { href: 'https://github.com/peterjohnedbrooke', label: 'GitHub', handle: '@peterjohnedbrooke' },
                { href: 'https://linkedin.com/in/peter-edbrooke-b29b0a203', label: 'LinkedIn', handle: 'Peter J Edbrooke' },
              ].map(({ href, label, handle }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label}: ${handle} (opens in new tab)`}
                    className="social-link"
                  >
                    <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                      {label}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {handle} ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
