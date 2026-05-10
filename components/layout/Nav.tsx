'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hamburger from 'hamburger-react'
import ThemeToggle from '@/components/ui/ThemeToggle'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b' : ''
        }`}
        style={{ borderColor: scrolled ? 'var(--border-color)' : 'transparent' }}
      >
        <nav
          aria-label="Main navigation"
          className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Home"
            className="key-btn key-btn--ghost text-sm font-semibold tracking-tight"
            style={{ 
              padding: '0.375rem 0.875rem',
              fontFamily: 'var(--font-body), system-ui, sans-serif',
            }}
          >
            {'<pje />'}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className="key-btn key-btn--ghost text-xs"
                    style={{
                      padding: '0.375rem 0.875rem',
                      color: active ? 'var(--accent)' : 'var(--text-muted)',
                      borderColor: active ? 'var(--accent)' : 'var(--border-color)',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Hire me CTA (desktop) */}
            <Link
              href="/contact"
              className="key-btn key-btn--accent hidden md:inline-flex text-xs"
              style={{ padding: '0.375rem 0.875rem' }}
            >
              Hire Me
            </Link>

            {/* Mobile hamburger */}
            <div
              className="!flex md:!hidden"
              style={{ padding: '10px' }}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Hamburger
                toggled={mobileOpen}
                toggle={setMobileOpen}
                size={24}
                color="var(--text-primary)"
                rounded
                label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.6)' }}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-label="Navigation menu"
              aria-modal="true"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col"
              style={{ background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="key-btn key-btn--ghost"
                  style={{ padding: '0.375rem 0.5rem' }}
                >
                  <span aria-hidden="true">✕</span>
                </button>
              </div>

              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col p-6 gap-3" role="list">
                  {navLinks.map(({ href, label }) => {
                    const active = pathname === href
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          aria-current={active ? 'page' : undefined}
                          className="key-btn key-btn--ghost w-full justify-start text-sm"
                          style={{
                            color: active ? 'var(--accent)' : 'var(--text-primary)',
                            borderColor: active ? 'var(--accent)' : 'var(--border-color)',
                          }}
                        >
                          {label}
                        </Link>
                      </li>
                    )
                  })}
                  <li className="mt-2">
                    <Link href="/contact" className="key-btn key-btn--accent w-full justify-center">
                      Hire Me
                    </Link>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
