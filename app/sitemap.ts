import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://peterjohnedbrooke.dev'
  const lastModified = new Date()

  return [
    { url: siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/work`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/skills`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
  ]
}
