'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { loadTimeline, toggleTask } from '@/lib/storage'
import tasksData from '@/data/tasks/common.json'
import type { Task, TimelineState } from '@/lib/types'

const allTasks = tasksData as unknown as Task[]

const PRIORITY_STYLES: Record<string, string> = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-amber-100 text-amber-700',
  medium: 'bg-blue-100 text-blue-700',
  low: 'bg-gray-100 text-gray-600',
}

function formatDeadline(arrivalDate: string, days: number): string {
  const d = new Date(arrivalDate)
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function TaskDetail() {
  const params = useParams()
  const searchParams = useSearchParams()

  const taskId = params.taskId as string
  const ref = searchParams.get('ref')
  const arrival = searchParams.get('arrival')

  // Reconstruct the back-to-timeline URL from the params passed by TimelineView
  const backUrl = ref
    ? `/timeline/${ref}?city=${searchParams.get('city')}&visa=${searchParams.get('visa')}&arrival=${arrival}&country=${searchParams.get('country')}`
    : '/onboarding'

  const task = allTasks.find((t) => t.id === taskId) ?? null

  const [timelineState, setTimelineState] = useState<TimelineState | null>(null)

  useEffect(() => {
    if (!ref) return
    const state = loadTimeline(ref)
    if (state) setTimelineState(state)
  }, [ref])

  function handleToggle() {
    if (!ref || !task) return
    const updated = toggleTask(ref, task.id)
    if (updated) setTimelineState(updated)
  }

  if (!task) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-gray-500">
        <p className="font-medium">Task not found.</p>
        <Link href="/onboarding" className="text-sm text-black underline">
          ← Back to onboarding
        </Link>
      </div>
    )
  }

  const isCompleted = timelineState?.completedTaskIds.includes(task.id) ?? false

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-lg px-4 pb-16 pt-8">

        {/* Back link */}
        <Link
          href={backUrl}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to checklist
        </Link>

        {/* Badges row */}
        <div className="flex flex-wrap gap-2">
          <span
            className={[
              'rounded-full px-2.5 py-1 text-xs font-medium capitalize',
              PRIORITY_STYLES[task.priority],
            ].join(' ')}
          >
            {task.priority}
          </span>
          <Badge variant="outline" className="capitalize">
            {task.category}
          </Badge>
          {task.deadlineDaysFromArrival !== null && arrival ? (
            <Badge variant="secondary">
              Due by {formatDeadline(arrival, task.deadlineDaysFromArrival)}
            </Badge>
          ) : task.deadlineDaysFromArrival !== null ? (
            <Badge variant="secondary">
              Due within {task.deadlineDaysFromArrival} days of arrival
            </Badge>
          ) : (
            <Badge variant="outline" className="text-gray-400">
              Flexible timeline
            </Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="mt-4 text-2xl font-bold text-gray-900">{task.title}</h1>

        <Separator className="my-5" />

        {/* Description */}
        <p className="text-gray-700 leading-relaxed">{task.description}</p>

        {/* Steps */}
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Steps
          </h2>
          <ol className="space-y-3">
            {task.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Official links */}
        {task.officialLinks.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
              Official links
            </h2>
            <ul className="space-y-2">
              {task.officialLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-black underline underline-offset-2 hover:no-underline"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3 shrink-0 text-gray-400" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <Separator className="my-8" />

        {/* Completion toggle */}
        {ref ? (
          <button
            type="button"
            onClick={handleToggle}
            className="flex w-full items-center gap-3 rounded-xl border-2 border-dashed border-gray-200 p-4 text-left transition-colors hover:border-gray-400"
          >
            <Checkbox checked={isCompleted} className="pointer-events-none" />
            <span className="font-medium text-gray-700">
              {isCompleted ? 'Marked as done — click to undo' : 'Mark this task as done'}
            </span>
          </button>
        ) : (
          <p className="text-center text-sm text-gray-400">
            Open this task from your checklist to track completion.
          </p>
        )}

      </div>
    </div>
  )
}
