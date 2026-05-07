export type SponsorBadge = 'Sponsored' | 'Community Partner'

export interface Sponsor {
  id: string
  name: string
  tagline: string
  description: string
  ctaText: string
  destinationUrl: string
  badge: SponsorBadge
  accentColor?: string
  targetVisaTypes?: string[]
  targetCities?: string[]
  showAfterTaskIndex: number
}

// Add real sponsors here. Each entry appears once per timeline, after task index N.
// destinationUrl can be your affiliate/tracking link for that sponsor.
export const SPONSORS: Sponsor[] = [
  {
    id: 'bharat-in-germany',
    name: 'Bharat in Germany',
    tagline: 'Moving from India? You\'re not alone.',
    description:
      '50,000+ Indians navigating visas, jobs, and daily life in Germany. Free guides, community Q&A, and weekly events.',
    ctaText: 'Join the community',
    destinationUrl: 'https://youtube.com/@bharatingermany',
    badge: 'Community Partner',
    accentColor: 'orange',
    targetVisaTypes: ['student', 'blue-card', 'chancenkarte'],
    showAfterTaskIndex: 3,
  },
  // Add more sponsors here:
  // {
  //   id: 'expatrio',
  //   name: 'Expatrio',
  //   tagline: 'Blocked account + health insurance in one place.',
  //   description: 'Open your German blocked account and get health insurance for students — all online in 15 min.',
  //   ctaText: 'Get your blocked account',
  //   destinationUrl: 'https://www.expatrio.com/?ref=landingde',  ← your affiliate link
  //   badge: 'Sponsored',
  //   targetVisaTypes: ['student'],
  //   showAfterTaskIndex: 5,
  // },
]
