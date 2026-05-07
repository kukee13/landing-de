
export type VisaType =
  | 'student'
  | 'blue-card'
  | 'chancenkarte'
  | 'job-seeker'
  | 'family-reunion'

export type City =
  | 'frankfurt'
  | 'berlin'
  | 'munich'
  | 'hamburg'
  | 'cologne'
  | 'other'

export type TaskCategory =
  | 'registration'
  | 'banking'
  | 'insurance'
  | 'housing'
  | 'transport'
  | 'employment'
  | 'language'
  | 'social'

export type TaskPriority = 'critical' | 'high' | 'medium' | 'low'

export interface OfficialLink {
  label: string
  url: string
  verify?: boolean
}

export interface Provider {
  name: string
  url: string
  note: string
  affiliateUrl?: string
}

export interface Task {
  id: string
  title: string
  category: TaskCategory
  priority: TaskPriority
  deadlineDaysFromArrival: number | null
  description: string
  steps: string[]
  officialLinks: OfficialLink[]
  applicableVisaTypes: VisaType[]
  applicableCities: City[]
  costEstimate?: string
  timeEstimate?: string
  documents?: string[]
  communityTips?: string[]
  appointmentUrl?: string
  providers?: Provider[]
}

export interface UserProfile {
  city: City
  arrivalDate: string
  visaType: VisaType
  countryOfOrigin: string
}

export interface TimelineState {
  profileId: string
  completedTaskIds: string[]
  createdAt: string
}
