import type { Task, UserProfile } from '@/lib/types'

export function getTasksForUser(profile: UserProfile, allTasks: Task[]): Task[] {
  return allTasks
    .filter(
      (task) =>
        task.applicableVisaTypes.includes(profile.visaType) &&
        task.applicableCities.includes(profile.city),
    )
    .sort((a, b) => {
      if (a.deadlineDaysFromArrival === null && b.deadlineDaysFromArrival === null) return 0
      if (a.deadlineDaysFromArrival === null) return 1
      if (b.deadlineDaysFromArrival === null) return -1
      return a.deadlineDaysFromArrival - b.deadlineDaysFromArrival
    })
}
