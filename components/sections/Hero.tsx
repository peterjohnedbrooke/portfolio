'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const itemTransition = { duration: 0.6, ease: 'easeOut' as const }

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="grid-overlay" aria-hidden="true" />

      {/* Gradient orbs */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          width: 600,
          height: 600,
          top: '10%',
          left: '50%',
          transform: 'translateX(-30%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          width: 400,
          height: 400,
          bottom: '15%',
          right: '15%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Status badge */}
          {/* <motion.div variants={item} transition={itemTransition}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border"
              style={{
                background: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-muted)',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'inline-block',
                  boxShadow: '0 0 6px #22c55e',
                }}
                aria-hidden="true"
              />
              Available for freelance work
            </span>
          </motion.div> */}

          {/* Name */}
          <motion.h1
            variants={item}
            transition={itemTransition}
            className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-none"
          >
            <span style={{ color: 'var(--text-primary)' }}>Peter J Edbrooke</span>
            <br />
            <span className="gradient-text">Frontend Developer</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={item}
            transition={itemTransition}
            className="max-w-xl text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            Senior React developer at{' '}
            <a
              href="https://www.zengenti.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}
            >
              Zengenti
            </a>{' '}
            building accessible, high-performance web experiences for universities and public sector organisations across the UK.
          </motion.p>

          {/* Tech pills */}
          <motion.ul
            variants={item}
            transition={itemTransition}
            className="flex flex-wrap justify-center gap-2"
            aria-label="Core technologies"
            role="list"
          >
            {['React', 'TypeScript', 'Next.js', 'Node.js'].map((tech) => (
              <li key={tech}>
                <span className="skill-key">{tech}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div variants={item} transition={itemTransition} className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/work" className="key-btn key-btn--accent">
              View My Work
            </Link>
            <Link 
              href="/contact" 
              className="key-btn"
              style={{ borderWidth: '2px', borderColor: 'var(--accent)' }}
            >
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
