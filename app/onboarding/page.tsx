import { Suspense } from 'react'
import OnboardingClient from './OnboardingClient'

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-gray-400">Loading…</div>}>
      <OnboardingClient />
    </Suspense>
  )
}
