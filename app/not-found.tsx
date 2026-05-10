import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
      <span
        className="text-8xl font-bold tracking-tight"
        style={{ color: 'var(--border-color)' }}
        aria-hidden="true"
      >
        404
      </span>
      <h1
        className="text-3xl sm:text-4xl font-bold tracking-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        Page not found
      </h1>
      <p className="max-w-sm text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="key-btn key-btn--accent">
        Go home →
      </Link>
    </div>
  )
}
