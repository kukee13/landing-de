import type { MetadataRoute } from 'next'
import tasksData from '@/data/tasks/common.json'

const BASE_URL = 'https://landing-de-brown.vercel.app'

const CITIES = ['berlin', 'munich', 'frankfurt', 'hamburg', 'cologne']
const VISA_TYPES = ['student', 'blue-card', 'chancenkarte', 'job-seeker', 'family-reunion']
const GUIDE_SLUGS = [
  'anmeldung-germany',
  'bank-account-germany',
  'health-insurance-germany',
  'residence-permit-germany',
  'blocked-account-germany',
  'tax-return-germany',
  'chancenkarte-germany',
  'german-cv-format',
  'driving-licence-germany',
]

const FROM_COUNTRIES = [
  'india', 'china', 'nigeria', 'usa', 'turkey', 'brazil', 'philippines', 'ukraine',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const tasks = tasksData as Array<{ id: string }>

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/onboarding`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/advertise`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/impressum`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.1 },
    { url: `${BASE_URL}/datenschutz`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.1 },

    ...CITIES.map((city) => ({
      url: `${BASE_URL}/city/${city}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    ...VISA_TYPES.map((visa) => ({
      url: `${BASE_URL}/visa/${visa}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    ...GUIDE_SLUGS.map((slug) => ({
      url: `${BASE_URL}/guide/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    ...FROM_COUNTRIES.map((country) => ({
      url: `${BASE_URL}/from/${country}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    ...tasks.map((task) => ({
      url: `${BASE_URL}/tasks/${task.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}
