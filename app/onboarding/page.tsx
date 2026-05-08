'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { createTimeline, buildSharePath } from '@/lib/storage'
import type { City, VisaType, UserProfile } from '@/lib/types'

const TOTAL_STEPS = 4

const CITIES: { value: City; label: string }[] = [
  { value: 'berlin', label: 'Berlin' },
  { value: 'munich', label: 'Munich' },
  { value: 'frankfurt', label: 'Frankfurt' },
  { value: 'hamburg', label: 'Hamburg' },
  { value: 'cologne', label: 'Cologne' },
  { value: 'other', label: 'Other city' },
]

const VISA_TYPES: { value: VisaType; label: string; description: string }[] = [
  {
    value: 'student',
    label: 'Student Visa',
    description: 'Enrolled in a German university or language school',
  },
  {
    value: 'blue-card',
    label: 'EU Blue Card',
    description: 'Skilled worker with a recognised degree and a job offer',
  },
  {
    value: 'chancenkarte',
    label: 'Chancenkarte',
    description: 'Opportunity Card — seeking employment in Germany',
  },
  {
    value: 'job-seeker',
    label: 'Job Seeker Visa',
    description: 'Actively looking for work in Germany',
  },
  {
    value: 'family-reunion',
    label: 'Family Reunion',
    description: 'Joining a family member already living in Germany',
  },
]

function SelectionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full rounded-xl border-2 p-4 text-left transition-all',
        selected
          ? 'border-black bg-black text-white'
          : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const cityParam = searchParams.get('city') as City | null
  const visaParam = searchParams.get('visa') as VisaType | null
  const initialProfile: Partial<UserProfile> = {}
  if (cityParam && CITIES.some((c) => c.value === cityParam)) initialProfile.city = cityParam
  if (visaParam && VISA_TYPES.some((v) => v.value === visaParam)) initialProfile.visaType = visaParam

  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState<Partial<UserProfile>>(initialProfile)

  const canAdvance =
    (step === 1 && Boolean(profile.city)) ||
    (step === 2 && Boolean(profile.arrivalDate)) ||
    (step === 3 && Boolean(profile.visaType)) ||
    (step === 4 && Boolean(profile.countryOfOrigin?.trim()))

  function next() {
    if (canAdvance) setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  function back() {
    setStep((s) => Math.max(s - 1, 1))
  }

  function handleSubmit() {
    const { city, arrivalDate, visaType, countryOfOrigin } = profile
    if (!city || !arrivalDate || !visaType || !countryOfOrigin) return
    const fullProfile: UserProfile = { city, arrivalDate, visaType, countryOfOrigin }
    const { id } = createTimeline(fullProfile)
    router.push(buildSharePath(id, fullProfile))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-lg px-4 pb-16 pt-10">

        {/* Progress */}
        <div className="mb-10">
          <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
            <span>Step {step} of {TOTAL_STEPS}</span>
            <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
          </div>
          <Progress value={(step / TOTAL_STEPS) * 100} />
        </div>

        {/* Step 1 — City */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Which city are you moving to?</h1>
              <p className="mt-1 text-gray-500">
                We&apos;ll show you the right local offices and booking links.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CITIES.map(({ value, label }) => (
                <SelectionCard
                  key={value}
                  selected={profile.city === value}
                  onClick={() => setProfile((p) => ({ ...p, city: value }))}
                >
                  <span className="font-medium">{label}</span>
                </SelectionCard>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Arrival date */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">When do you arrive in Germany?</h1>
              <p className="mt-1 text-gray-500">
                Deadlines like Anmeldung (14 days) are calculated from this date.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="arrival-date">Arrival date</Label>
              <Input
                id="arrival-date"
                type="date"
                value={profile.arrivalDate ?? ''}
                className="h-11 text-base"
                onChange={(e) =>
                  setProfile((p) => ({ ...p, arrivalDate: e.target.value }))
                }
              />
            </div>
          </div>
        )}

        {/* Step 3 — Visa type */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">What&apos;s your visa type?</h1>
              <p className="mt-1 text-gray-500">
                Different visas require different permits and registrations.
              </p>
            </div>
            <div className="space-y-3">
              {VISA_TYPES.map(({ value, label, description }) => (
                <SelectionCard
                  key={value}
                  selected={profile.visaType === value}
                  onClick={() => setProfile((p) => ({ ...p, visaType: value }))}
                >
                  <p className="font-medium">{label}</p>
                  <p
                    className={[
                      'mt-0.5 text-sm',
                      profile.visaType === value ? 'text-gray-300' : 'text-gray-500',
                    ].join(' ')}
                  >
                    {description}
                  </p>
                </SelectionCard>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 — Country of origin */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Where are you coming from?</h1>
              <p className="mt-1 text-gray-500">
                Some requirements differ for EU vs. non-EU citizens.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country of origin</Label>
              <Input
                id="country"
                type="text"
                placeholder="e.g. India, Brazil, Nigeria, USA"
                value={profile.countryOfOrigin ?? ''}
                className="h-11 text-base"
                onChange={(e) =>
                  setProfile((p) => ({ ...p, countryOfOrigin: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && canAdvance) handleSubmit()
                }}
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={back} className="flex-1">
              ← Back
            </Button>
          )}

          {step < TOTAL_STEPS ? (
            <Button onClick={next} disabled={!canAdvance} className="flex-1">
              Next →
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canAdvance} className="flex-1">
              Get my timeline →
            </Button>
          )}
        </div>

      </div>
    </div>
  )
}
