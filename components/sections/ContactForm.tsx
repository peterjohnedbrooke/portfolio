'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  budget: z.string().optional(),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be under 2000 characters'),
})

type FormData = z.infer<typeof schema>

const budgetOptions = [
  { value: '', label: 'Select a range (optional)' },
  { value: 'under-5k', label: 'Under £5,000' },
  { value: '5k-15k', label: '£5,000 – £15,000' },
  { value: '15k-50k', label: '£15,000 – £50,000' },
  { value: 'over-50k', label: 'Over £50,000' },
  { value: 'ongoing', label: 'Ongoing retainer / contract' },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 500,
  letterSpacing: '0.04em',
  textTransform: 'uppercase' as const,
  color: 'var(--text-muted)',
  marginBottom: '0.5rem',
}

const errorStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#f87171',
  marginTop: '0.375rem',
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="card p-10 flex flex-col items-center text-center gap-4"
        style={{ borderRadius: 14 }}
        role="alert"
        aria-live="polite"
      >
        <span style={{ fontSize: '2.5rem' }} aria-hidden="true">✓</span>
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Message sent!
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Thanks for getting in touch. I typically respond within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="key-btn mt-2"
          type="button"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-6"
    >
      {status === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-4 rounded-lg border text-sm"
          style={{
            background: 'rgba(239, 68, 68, 0.08)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
            color: '#f87171',
          }}
        >
          Something went wrong. Please try again or email me directly.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" style={labelStyle}>
            Your name{' '}
            <span aria-label="required" style={{ color: 'var(--accent)' }}>*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            placeholder="Jane Smith"
            className="form-input"
            {...register('name')}
          />
          {errors.name && (
            <p id="name-error" style={errorStyle} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" style={labelStyle}>
            Email address{' '}
            <span aria-label="required" style={{ color: 'var(--accent)' }}>*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="jane@company.com"
            className="form-input"
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" style={errorStyle} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" style={labelStyle}>
          Project budget
        </label>
        <select
          id="budget"
          className="form-input"
          style={{
            cursor: 'pointer',
            appearance: 'none' as const,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2371717a' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            paddingRight: '2.5rem',
          }}
          {...register('budget')}
        >
          {budgetOptions.map(({ value, label }) => (
            <option key={value} value={value} style={{ background: 'var(--bg-secondary)' }}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" style={labelStyle}>
          Message{' '}
          <span aria-label="required" style={{ color: 'var(--accent)' }}>*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : 'message-hint'}
          placeholder="Tell me about your project — what you're building, your timeline, and any specific requirements..."
          className="form-input"
          style={{ resize: 'vertical', minHeight: 140 }}
          {...register('message')}
        />
        {errors.message ? (
          <p id="message-error" style={errorStyle} role="alert">
            {errors.message.message}
          </p>
        ) : (
          <p
            id="message-hint"
            style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}
          >
            Minimum 20 characters. Be as specific as you like.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="key-btn key-btn--accent self-start"
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
