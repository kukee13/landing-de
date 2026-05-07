'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Share2, Mail, ChevronDown, ChevronUp } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { parseProfileFromParams, loadTimeline, saveTimeline, toggleTask, saveNote, loadNote } from '@/lib/storage'
import { getTasksForUser } from '@/lib/taskFilter'
import tasksData from '@/data/tasks/common.json'
import { SPONSORS } from '@/data/sponsors'
import { SponsoredCard } from '@/components/SponsoredCard'
import type { Task, UserProfile, TimelineState, TaskCategory } from '@/lib/types'

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

const CATEGORIES: { value: 'all' | TaskCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'registration', label: 'Registration' },
  { value: 'banking', label: 'Banking' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'housing', label: 'Housing' },
  { value: 'transport', label: 'Transport' },
  { value: 'employment', label: 'Employment' },
  { value: 'language', label: 'Language' },
  { value: 'social', label: 'Social' },
]

function deadlineChip(arrivalDate: string, days: number) {
  const arrival = new Date(arrivalDate)
  const due = new Date(arrival)
  due.setDate(due.getDate() + days)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const daysLeft = Math.ceil((due.getTime() - today.getTime()) / 86400000)
  const dateStr = due.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

  if (daysLeft < 0) return { label: `Overdue by ${Math.abs(daysLeft)}d`, className: 'text-red-600 font-medium' }
  if (daysLeft === 0) return { label: 'Due today', className: 'text-red-600 font-medium' }
  if (daysLeft <= 7) return { label: `${daysLeft}d left · ${dateStr}`, className: 'text-amber-600 font-medium' }
  return { label: `Due ${dateStr}`, className: 'text-gray-500' }
}

function TaskNoteField({ timelineId, taskId }: { timelineId: string; taskId: string }) {
  const [note, setNote] = useState('')
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const saved = loadNote(timelineId, taskId)
    if (saved) { setNote(saved); setOpen(true) }
  }, [timelineId, taskId])

  function handleChange(val: string) {
    setNote(val)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => saveNote(timelineId, taskId, val), 600)
  }

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        {note ? 'Note saved' : 'Add a note'}
      </button>
      {open && (
        <textarea
          rows={2}
          value={note}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="e.g. appointment booked for Jan 15 at 10am"
          className="mt-1.5 w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 resize-none"
        />
      )}
    </div>
  )
}

export default function TimelineView() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = params.id as string

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [timelineState, setTimelineState] = useState<TimelineState | null>(null)
  const [copied, setCopied] = useState(false)
  const [activeCategory, setActiveCategory] = useState<'all' | TaskCategory>('all')
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const confettiFired = useRef(false)

  useEffect(() => {
    const parsed = parseProfileFromParams(searchParams as unknown as URLSearchParams)
    if (!parsed) { router.replace('/onboarding'); return }
    setProfile(parsed)
    let state = loadTimeline(id)
    if (!state) {
      state = { profileId: id, completedTaskIds: [], createdAt: new Date().toISOString() }
      saveTimeline(state)
    }
    setTimelineState(state)
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Confetti when all tasks complete
  useEffect(() => {
    if (!timelineState || !profile) return
    const tasks = getTasksForUser(profile, allTasks)
    if (tasks.length > 0 && timelineState.completedTaskIds.filter(tid => tasks.some(t => t.id === tid)).length === tasks.length && !confettiFired.current) {
      confettiFired.current = true
      import('canvas-confetti').then(({ default: confetti }) => {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } })
      })
    }
  }, [timelineState, profile])

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

  async function handleEmailReminder() {
    if (!email || !profile || !timelineState) return
    setEmailStatus('sending')
    const tasks = getTasksForUser(profile, allTasks).map((t) => ({
      title: t.title,
      priority: t.priority,
      deadline: t.deadlineDaysFromArrival
        ? new Date(new Date(profile.arrivalDate).getTime() + t.deadlineDaysFromArrival * 86400000)
            .toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : null,
    }))
    try {
      const res = await fetch('/api/remind', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tasks, profile }),
      })
      setEmailStatus(res.ok ? 'sent' : 'error')
    } catch {
      setEmailStatus('error')
    }
  }

  if (!profile || !timelineState) {
    return <div className="flex min-h-screen items-center justify-center text-gray-400">Loading…</div>
  }

  const allFilteredTasks = getTasksForUser(profile, allTasks)
  const tasks = activeCategory === 'all'
    ? allFilteredTasks
    : allFilteredTasks.filter((t) => t.category === activeCategory)

  const completedCount = allFilteredTasks.filter((t) => timelineState.completedTaskIds.includes(t.id)).length
  const progress = allFilteredTasks.length > 0 ? (completedCount / allFilteredTasks.length) * 100 : 0
  const allDone = allFilteredTasks.length > 0 && completedCount === allFilteredTasks.length

  // Only show categories that have tasks for this user
  const availableCategories = CATEGORIES.filter(
    (c) => c.value === 'all' || allFilteredTasks.some((t) => t.category === c.value)
  )

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
                {new Date(profile.arrivalDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
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
              <span>{completedCount} of {allFilteredTasks.length} tasks complete</span>
              {allDone && <span className="font-medium text-green-600">All done! 🎉</span>}
            </div>
            <Progress value={progress} />
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-lg overflow-x-auto">
          <div className="flex gap-1 px-4 py-2">
            {availableCategories.map((c) => (
              <button
                key={c.value}
                onClick={() => setActiveCategory(c.value)}
                className={[
                  'shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  activeCategory === c.value
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                ].join(' ')}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task list */}
      <div className="mx-auto max-w-lg space-y-3 px-4 py-6">
        {tasks.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center">
            <p className="font-medium text-gray-700">No tasks in this category</p>
            <button onClick={() => setActiveCategory('all')} className="mt-2 text-sm text-black underline">
              Show all tasks
            </button>
          </div>
        ) : (
          tasks.map((task, index) => {
            const isCompleted = timelineState.completedTaskIds.includes(task.id)
            const chip = task.deadlineDaysFromArrival !== null
              ? deadlineChip(profile.arrivalDate, task.deadlineDaysFromArrival)
              : null

            // Find any sponsor to show after this task
            const sponsorHere = SPONSORS.find(
              (s) =>
                s.showAfterTaskIndex === index &&
                (!s.targetVisaTypes || s.targetVisaTypes.includes(profile.visaType)) &&
                (!s.targetCities || s.targetCities.includes(profile.city))
            )

            return (
              <div key={task.id}>
                <div
                  className={['rounded-xl border bg-white p-4 transition-opacity duration-200', isCompleted ? 'opacity-50' : ''].join(' ')}
                >
                  <div className="flex gap-3">
                    <Checkbox
                      checked={isCompleted}
                      onCheckedChange={() => handleToggle(task.id)}
                      className="mt-0.5 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className={['font-medium leading-snug text-gray-900', isCompleted ? 'line-through' : ''].join(' ')}>
                        {task.title}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <span className={['rounded-full px-2 py-0.5 text-xs font-medium capitalize', PRIORITY_STYLES[task.priority]].join(' ')}>
                          {task.priority}
                        </span>
                        <Badge variant="outline" className="text-xs capitalize">{task.category}</Badge>
                        {chip ? (
                          <span className={['text-xs', chip.className].join(' ')}>{chip.label}</span>
                        ) : (
                          <span className="text-xs text-gray-400">Flexible timeline</span>
                        )}
                        {task.costEstimate && (
                          <span className="text-xs text-gray-400">{task.costEstimate}</span>
                        )}
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">{task.description}</p>

                      <div className="mt-2 flex items-center gap-3">
                        <Link
                          href={`/tasks/${task.id}?ref=${id}&city=${profile.city}&visa=${profile.visaType}&arrival=${profile.arrivalDate}&country=${encodeURIComponent(profile.countryOfOrigin)}`}
                          className="text-sm text-black underline underline-offset-2 hover:no-underline"
                        >
                          View steps →
                        </Link>
                        {task.appointmentUrl && (
                          <a href={task.appointmentUrl} target="_blank" rel="noopener noreferrer"
                            className="text-sm text-blue-600 underline underline-offset-2 hover:no-underline">
                            Book appointment ↗
                          </a>
                        )}
                      </div>

                      <TaskNoteField timelineId={id} taskId={task.id} />
                    </div>
                  </div>
                </div>
                {sponsorHere && <SponsoredCard sponsor={sponsorHere} />}
              </div>
            )
          })
        )}

        {allDone && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
            <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-500" />
            <p className="font-semibold text-green-800">You're all set!</p>
            <p className="mt-1 text-sm text-green-700">All tasks for your first 90 days are done.</p>
          </div>
        )}

        {/* Email reminder */}
        <div className="rounded-xl border bg-white p-4">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-4 w-4 text-gray-400" />
            <p className="text-sm font-medium text-gray-900">Email me this checklist</p>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Get a one-time email with all your tasks and deadlines. Your address is not stored.
          </p>
          {emailStatus === 'sent' ? (
            <p className="text-sm text-green-600 font-medium">✓ Sent! Check your inbox.</p>
          ) : (
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEmailReminder()}
                className="flex-1 h-9 text-sm"
              />
              <button
                onClick={handleEmailReminder}
                disabled={!email || emailStatus === 'sending'}
                className="rounded-lg bg-black px-3 py-1.5 text-sm text-white disabled:opacity-50 hover:bg-gray-800 transition-colors shrink-0"
              >
                {emailStatus === 'sending' ? 'Sending…' : 'Send'}
              </button>
            </div>
          )}
          {emailStatus === 'error' && (
            <p className="mt-1.5 text-xs text-red-500">Something went wrong — try again.</p>
          )}
        </div>

        <p className="pt-2 text-center text-xs text-gray-400">
          Progress saved in this browser.{' '}
          <Link href="/onboarding" className="underline">Edit profile</Link>
        </p>
      </div>
    </div>
  )
}