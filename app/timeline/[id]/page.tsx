import { Suspense } from 'react'
import TimelineView from './TimelineView'

export default function TimelinePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-gray-400">
          Loading your checklist…
        </div>
      }
    >
      <TimelineView />
    </Suspense>
  )
}
