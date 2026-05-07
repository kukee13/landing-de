'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Share2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { parseProfileFromParams, loadTimeline, saveTimeline, toggleTask } from '@/lib/storage'
import { getTasksForUser } from '@/lib/taskFilter'
import tasksData from '@/data/tasks/common.json'
import type { Task, UserProfile, TimelineState } from '@/lib/types'

const allTasks = tasksData as unknown as Task[]

const PRIORITY_STYLES: Record<string, string> = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-amber-100 text-amber-700',
  medium: 'bg-blue-100 text-blue-700',
  low: 'bg-gray-100 text-gray-600',
}

const CITY_LABELS: Record<string, string> = {
  berlin: 'Berlin', munich: 'Munich', frankfurt: 'Frankfurt',
  hamburg: 'Hamburg', cologne: 'Cologne', other: 'Germany',
}

const VISA_LABELS: Record<string, string> = {
  student: 'Student', 'blue-card': 'EU Blue Card',
  chancenkarte: 'Chancenkarte', 'job-seeker': 'Job Seeker',
  'family-reunion': 'Family Reunion',
}

function formatDeadline(arrivalDate: string, days: number): string {
  const d = new Date(arrivalDate)
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default function TimelineView() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = params.id as string

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [timelineState, setTimelineState] = useState<TimelineState | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const parsed = parseProfileFromParams(searchParams as unknown as URLSearchParams)
    if (!parsed) {
      router.replace('/onboarding')
      return
    }
    setProfile(parsed)

    let state = loadTimeline(id)
    if (!state) {
      // First open of a shared link — seed local state with the URL's UUID
      state = { profileId: id, completedTaskIds: [], createdAt: new Date().toISOString() }
      saveTimeline(state)
    }
    setTimelineState(state)
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleToggle(taskId: string) {
    const updated = toggleTask(id, taskId)
    if (updated) setTimelineState(updated)
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (!profile || !timelineState) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-400">
        Loading your checklist…
      </div>
    )
  }

  const tasks = getTasksForUser(profile, allTasks)
  const completedCount = tasks.filter((t) => timelineState.completedTaskIds.includes(t.id)).length
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0
  const allDone = tasks.length > 0 && completedCount === tasks.length

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sticky header */}
      <div className="sticky top-0 z-10 border-b bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto max-w-lg">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="font-semibold text-gray-900">Your Germany Checklist</h1>
              <p className="mt-0.5 truncate text-sm text-gray-500">
                {CITY_LABELS[profile.city]} · {VISA_LABELS[profile.visaType]} · arriving{' '}
                {new Date(profile.arrivalDate).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'short', year: 'numeric',
                })}
              </p>
            </div>
            <button
              onClick={handleShare}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
            >
              <Share2 className="h-3.5 w-3.5" />
              {copied ? 'Copied!' : 'Share'}
            </button>
          </div>

          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-xs text-gray-500">
              <span>{completedCount} of {tasks.length} tasks complete</span>
              {allDone && <span className="font-medium text-green-600">All done! 🎉</span>}
            </div>
            <Progress value={progress} />
          </div>
        </div>
      </div>

      {/* Task list */}
      <div className="mx-auto max-w-lg space-y-3 px-4 py-6">

        {tasks.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center">
            <p className="font-medium text-gray-700">No tasks found for your profile</p>
            <p className="mt-1 text-sm text-gray-500">
              We may not have tasks for this visa + city combination yet.
            </p>
            <Link
              href="/onboarding"
              className="mt-4 inline-block text-sm text-black underline underline-offset-2"
            >
              ← Update my profile
            </Link>
          </div>
        ) : (
          tasks.map((task) => {
            const isCompleted = timelineState.completedTaskIds.includes(task.id)
            return (
              <div
                key={task.id}
                className={[
                  'rounded-xl border bg-white p-4 transition-opacity duration-200',
                  isCompleted ? 'opacity-50' : '',
                ].join(' ')}
              >
                <div className="flex gap-3">
                  <Checkbox
                    checked={isCompleted}
                    onCheckedChange={() => handleToggle(task.id)}
                    className="mt-0.5 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={[
                        'font-medium leading-snug text-gray-900',
                        isCompleted ? 'line-through' : '',
                      ].join(' ')}
                    >
                      {task.title}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span
                        className={[
                          'rounded-full px-2 py-0.5 text-xs font-medium capitalize',
                          PRIORITY_STYLES[task.priority],
                        ].join(' ')}
                      >
                        {task.priority}
                      </span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {task.category}
                      </Badge>
                      {task.deadlineDaysFromArrival !== null ? (
                        <span className="text-xs text-gray-500">
                          Due by {formatDeadline(profile.arrivalDate, task.deadlineDaysFromArrival)}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Flexible timeline</span>
                      )}
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {task.description}
                    </p>

                    <Link
                      href={`/tasks/${task.id}?ref=${id}&city=${profile.city}&visa=${profile.visaType}&arrival=${profile.arrivalDate}&country=${encodeURIComponent(profile.countryOfOrigin)}`}
                      className="mt-2 inline-block text-sm text-black underline underline-offset-2 hover:no-underline"
                    >
                      View steps →
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        )}

        {allDone && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
            <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-500" />
            <p className="font-semibold text-green-800">You&apos;re all set!</p>
            <p className="mt-1 text-sm text-green-700">
              All tasks for your first 90 days are done.
            </p>
          </div>
        )}

        <p className="pt-2 text-center text-xs text-gray-400">
          Progress is saved automatically in this browser.{' '}
          <Link href="/onboarding" className="underline">
            Edit profile
          </Link>
        </p>
      </div>
    </div>
  )
}
