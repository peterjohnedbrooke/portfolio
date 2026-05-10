import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ThemeProvider from '@/components/providers/ThemeProvider'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-code',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://peteredbrooke.dev'
  ),
  title: {
    default: 'Peter J Edbrooke — Frontend Developer',
    template: '%s | Peter J Edbrooke',
  },
  description:
    'Senior React & TypeScript developer based in the UK, available for freelance projects. Specialising in accessible, high-performance web experiences.',
  keywords: ['React', 'TypeScript', 'Next.js', 'Frontend Developer', 'Freelance', 'UK'],
  authors: [{ name: 'Peter J Edbrooke' }],
  creator: 'Peter J Edbrooke',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Peter J Edbrooke — Frontend Developer',
    title: 'Peter J Edbrooke — Frontend Developer',
    description:
      'Senior React & TypeScript developer available for freelance work in the UK.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peter J Edbrooke — Frontend Developer',
    description: 'Senior React & TypeScript developer available for freelance work in the UK.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      data-theme="dark"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/*
          No-flash theme script: runs synchronously before first paint so the
          correct theme is applied before React hydrates, preventing a flash.
          suppressHydrationWarning on <html> tells React not to reconcile the
          data-theme attribute during hydration (it was mutated by this script).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('portfolio-theme');
                var parsed = stored ? JSON.parse(stored) : null;
                var theme = (parsed && parsed.state && parsed.state.theme === 'light') ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch(e) {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
              try { localStorage.removeItem('portfolio-colour'); } catch(e) {}
              try { localStorage.removeItem('portfolio-font'); } catch(e) {}
              try { localStorage.removeItem('portfolio-logo'); } catch(e) {}
              ['--accent','--accent-hover','--accent-glow','--accent-dark','--bg-primary','--bg-secondary','--bg-elevated','--font-body','--font-code'].forEach(function(p){document.documentElement.style.removeProperty(p);});
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {/* Skip to main content link (WCAG 2.4.1) */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          <Nav />

          <main id="main-content" tabIndex={-1}>
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
