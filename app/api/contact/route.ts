import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  budget: z.string().max(50).optional(),
  message: z.string().min(20).max(2000),
})

// ---------------------------------------------------------------------------
// In-memory rate limiting
//
// KNOWN LIMITATION: This Map is per-serverless-instance. On Vercel, multiple
// concurrent instances each maintain independent state, so a distributed
// attacker can bypass this limit by hitting different instances.
//
// For production hardening, replace with Upstash Redis:
//   npm install @upstash/ratelimit @upstash/redis
//   https://github.com/upstash/ratelimit-js
// ---------------------------------------------------------------------------
const rateLimit = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const window = 60_000 // 1 minute
  const limit = 3

  const entry = rateLimit.get(ip)

  // Entry exists and window is still open
  if (entry && entry.resetAt >= now) {
    if (entry.count >= limit) return true
    entry.count++
    return false
  }

  // Expired or new entry — evict stale data and create fresh
  rateLimit.delete(ip)
  rateLimit.set(ip, { count: 1, resetAt: now + window })
  return false
}

function getClientIp(request: NextRequest): string {
  // Prefer platform-set headers over the spoofable x-forwarded-for.
  // On Vercel, x-real-ip is populated from the verified client IP by the edge.
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp

  // Fallback: take the first value from x-forwarded-for (set by trusted proxies
  // in most hosting environments). This is spoofable if the app is reached
  // directly without a proxy — acceptable risk at this traffic level.
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()

  // Unknown IP: use a shared bucket that drains quickly to limit blast radius
  return 'unknown'
}

export async function POST(request: NextRequest) {
  // CSRF: reject requests from unexpected origins
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (origin && host) {
    try {
      const originHost = new URL(origin).host
      if (originHost !== host) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    } catch {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  // Rate limiting
  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  // Parse and validate body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { name, email, budget, message } = result.data

  // Require env vars
  const resendApiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_EMAIL

  if (!resendApiKey || !toEmail) {
    console.error('Missing RESEND_API_KEY or CONTACT_EMAIL environment variables')
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const resend = new Resend(resendApiKey)

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: `New enquiry from ${name}${budget ? ` (Budget: ${budget})` : ''}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
          <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">New contact form submission</h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
            <tr>
              <td style="padding: 0.5rem 0; font-size: 0.875rem; color: #71717a; width: 120px;">Name</td>
              <td style="padding: 0.5rem 0; font-size: 0.875rem; font-weight: 600;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; font-size: 0.875rem; color: #71717a;">Email</td>
              <td style="padding: 0.5rem 0; font-size: 0.875rem;">
                <a href="mailto:${escapeHtml(email)}" style="color: #6366f1;">${escapeHtml(email)}</a>
              </td>
            </tr>
            ${budget ? `
            <tr>
              <td style="padding: 0.5rem 0; font-size: 0.875rem; color: #71717a;">Budget</td>
              <td style="padding: 0.5rem 0; font-size: 0.875rem;">${escapeHtml(budget)}</td>
            </tr>
            ` : ''}
          </table>

          <div style="background: #f4f4f5; padding: 1.25rem; border-radius: 8px; font-size: 0.875rem; line-height: 1.6; white-space: pre-wrap;">
            ${escapeHtml(message)}
          </div>

          <p style="margin-top: 1.5rem; font-size: 0.75rem; color: #a1a1aa;">
            Sent via your portfolio contact form
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
