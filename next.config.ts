import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    const isDev = process.env.NODE_ENV === 'development'
    
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent MIME-type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Prevent clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },
          // Limit referrer leakage
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Restrict browser feature access
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Content Security Policy
          // Note: 'unsafe-inline' for scripts is required by the no-flash theme
          // inline script in layout.tsx. To eliminate it, generate a per-request
          // nonce in Next.js Middleware and thread it through to the script tag.
          // 'unsafe-eval' is required in development for React DevTools and HMR.
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              isDev 
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
                : "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self'",
              "img-src 'self' data: https:",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
