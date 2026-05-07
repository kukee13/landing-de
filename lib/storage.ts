import type { UserProfile, TimelineState } from '@/lib/types'

const STORAGE_PREFIX = 'landing_de_'

function timelineKey(id: string): string {
  return `${STORAGE_PREFIX}${id}`
}

export function generateId(): string {
  return crypto.randomUUID()
}

// ── Read / Write ─────────────────────────────────────────────────────────────

export function saveTimeline(state: TimelineState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(timelineKey(state.profileId), JSON.stringify(state))
}

export function loadTimeline(id: string): TimelineState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(timelineKey(id))
    if (!raw) return null
    return JSON.parse(raw) as TimelineState
  } catch {
    return null
  }
}

// ── Create ────────────────────────────────────────────────────────────────────

export function createTimeline(_profile: UserProfile): { id: string; state: TimelineState } {
  const id = generateId()
  const state: TimelineState = {
    profileId: id,
    completedTaskIds: [],
    createdAt: new Date().toISOString(),
  }
  saveTimeline(state)
  return { id, state }
}

// ── Task toggling ─────────────────────────────────────────────────────────────

export function toggleTask(timelineId: string, taskId: string): TimelineState | null {
  const state = loadTimeline(timelineId)
  if (!state) return null

  const isCompleted = state.completedTaskIds.includes(taskId)
  const updated: TimelineState = {
    ...state,
    completedTaskIds: isCompleted
      ? state.completedTaskIds.filter((id) => id !== taskId)
      : [...state.completedTaskIds, taskId],
  }

  saveTimeline(updated)
  return updated
}

// ── Per-task document checklist ──────────────────────────────────────────────

export function saveDocChecked(timelineId: string, taskId: string, checked: string[]): void {
  if (typeof window === 'undefined') return
  const key = `${STORAGE_PREFIX}docs_${timelineId}_${taskId}`
  checked.length ? localStorage.setItem(key, JSON.stringify(checked)) : localStorage.removeItem(key)
}

export function loadDocChecked(timelineId: string, taskId: string): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}docs_${timelineId}_${taskId}`)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

// ── Per-task notes ───────────────────────────────────────────────────────────

export function saveNote(timelineId: string, taskId: string, note: string): void {
  if (typeof window === 'undefined') return
  const key = `${STORAGE_PREFIX}note_${timelineId}_${taskId}`
  note.trim() ? localStorage.setItem(key, note) : localStorage.removeItem(key)
}

export function loadNote(timelineId: string, taskId: string): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(`${STORAGE_PREFIX}note_${timelineId}_${taskId}`) ?? ''
}

// ── Share URL ─────────────────────────────────────────────────────────────────

// Returns a relative path; callers prepend window.location.origin for clipboard copy.
export function buildSharePath(id: string, profile: UserProfile): string {
  const params = new URLSearchParams({
    city: profile.city,
    visa: profile.visaType,
    arrival: profile.arrivalDate,
    country: profile.countryOfOrigin,
  })
  return `/timeline/${id}?${params.toString()}`
}

// Used on the timeline page to reconstruct the profile from URL search params.
export function parseProfileFromParams(params: URLSearchParams): UserProfile | null {
  const city = params.get('city')
  const visa = params.get('visa')
  const arrival = params.get('arrival')
  const country = params.get('country')

  if (!city || !visa || !arrival || !country) return null

  return {
    city: city as UserProfile['city'],
    visaType: visa as UserProfile['visaType'],
    arrivalDate: arrival,
    countryOfOrigin: country,
  }
}
