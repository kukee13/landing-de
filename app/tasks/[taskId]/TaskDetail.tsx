'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Clock, FileText, Lightbulb, BookOpen } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { track } from '@vercel/analytics'
import { loadTimeline, toggleTask, saveDocChecked, loadDocChecked } from '@/lib/storage'
import tasksData from '@/data/tasks/common.json'
import type { Task, TimelineState } from '@/lib/types'

const allTasks = tasksData as unknown as Task[]

const TASK_GUIDE_MAP: Record<string, { slug: string; label: string }> = {
  'anmeldung': { slug: 'anmeldung-germany', label: 'Full Anmeldung guide →' },
  'bank-account': { slug: 'bank-account-germany', label: 'Best German bank accounts guide →' },
  'health-insurance': { slug: 'health-insurance-germany', label: 'GKV vs PKV health insurance guide →' },
  'residence-permit': { slug: 'residence-permit-germany', label: 'Residence permit application guide →' },
  'blocked-account': { slug: 'blocked-account-germany', label: 'Blocked account (Sperrkonto) guide →' },
  'elster': { slug: 'tax-return-germany', label: 'German tax return guide →' },
  'tax-id': { slug: 'tax-return-germany', label: 'German tax guide →' },
}

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

  const backUrl = ref
    ? `/timeline/${ref}?city=${searchParams.get('city')}&visa=${searchParams.get('visa')}&arrival=${arrival}&country=${searchParams.get('country')}`
    : '/onboarding'

  const task = allTasks.find((t) => t.id === taskId) ?? null

  const [timelineState, setTimelineState] = useState<TimelineState | null>(null)
  const [checkedDocs, setCheckedDocs] = useState<string[]>([])

  useEffect(() => {
    if (!ref) return
    const state = loadTimeline(ref)
    if (state) setTimelineState(state)
    setCheckedDocs(loadDocChecked(ref, taskId))
  }, [ref, taskId])

  function handleToggle() {
    if (!ref || !task) return
    const updated = toggleTask(ref, task.id)
    if (updated) setTimelineState(updated)
  }

  function handleDocToggle(doc: string) {
    if (!ref || !task) return
    setCheckedDocs((prev) => {
      const next = prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
      saveDocChecked(ref, task.id, next)
      return next
    })
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
          {task.costEstimate && (
            <Badge variant="outline" className="text-gray-500">
              {task.costEstimate}
            </Badge>
          )}
          {task.timeEstimate && (
            <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              {task.timeEstimate}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="mt-4 text-2xl font-bold text-gray-900">{task.title}</h1>

        <Separator className="my-5" />

        {/* Description */}
        <p className="text-gray-700 leading-relaxed">{task.description}</p>

        {/* Documents checklist */}
        {task.documents && task.documents.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gray-400">
              <FileText className="h-3.5 w-3.5" /> Documents to prepare
            </h2>
            <ul className="space-y-2.5">
              {task.documents.map((doc) => {
                const checked = checkedDocs.includes(doc)
                return (
                  <li key={doc} className="flex items-start gap-3">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => handleDocToggle(doc)}
                      className="mt-0.5 shrink-0"
                      disabled={!ref}
                    />
                    <span
                      className={[
                        'text-sm text-gray-700 leading-snug',
                        checked ? 'line-through text-gray-400' : '',
                      ].join(' ')}
                    >
                      {doc}
                    </span>
                  </li>
                )
              })}
            </ul>
            {!ref && (
              <p className="mt-2 text-xs text-gray-400">Open from your checklist to track documents.</p>
            )}
          </section>
        )}

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

        {/* Community tips */}
        {task.communityTips && task.communityTips.length > 0 && (
          <section className="mt-8 rounded-xl border border-amber-100 bg-amber-50 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-amber-800">
              <Lightbulb className="h-4 w-4" /> Community tips
            </h2>
            <ul className="space-y-2">
              {task.communityTips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm text-amber-900">
                  <span className="shrink-0 text-amber-500">·</span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Recommended providers */}
        {task.providers && task.providers.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-widest text-gray-400">
              Recommended providers
            </h2>
            <p className="mb-3 text-xs text-gray-400">
              Links may earn Landing.de a referral fee at no cost to you.
            </p>
            <ul className="space-y-2">
              {task.providers.map((provider) => {
                const href = provider.affiliateUrl
                  ? `/api/track?id=${encodeURIComponent(provider.name)}&type=affiliate&dest=${encodeURIComponent(provider.affiliateUrl)}`
                  : provider.url
                return (
                  <li key={provider.name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('provider_click', { provider: provider.name, task: task.id })}
                      className="flex items-start justify-between gap-3 rounded-xl border p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900">{provider.name}</p>
                        <p className="mt-0.5 text-xs text-gray-500">{provider.note}</p>
                      </div>
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {/* Related guide */}
        {TASK_GUIDE_MAP[task.id] && (
          <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="h-4 w-4 text-gray-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Deep dive</span>
            </div>
            <Link
              href={`/guide/${TASK_GUIDE_MAP[task.id].slug}`}
              className="text-sm font-medium text-black underline underline-offset-2 hover:no-underline"
            >
              {TASK_GUIDE_MAP[task.id].label}
            </Link>
          </div>
        )}

        <Separator className="my-8" />

        {/* Appointment booking */}
        {task.appointmentUrl && (
          <a
            href={task.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Book appointment ↗
          </a>
        )}

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