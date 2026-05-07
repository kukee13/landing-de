
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
