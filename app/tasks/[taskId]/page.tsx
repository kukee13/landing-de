import { Suspense } from 'react'
import type { Metadata } from 'next'
import TaskDetail from './TaskDetail'
import tasksData from '@/data/tasks/common.json'
import type { Task } from '@/lib/types'

const allTasks = tasksData as unknown as Task[]

export async function generateStaticParams() {
  return allTasks.map((t) => ({ taskId: t.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ taskId: string }>
}): Promise<Metadata> {
  const { taskId } = await params
  const task = allTasks.find((t) => t.id === taskId)
  if (!task) return {}
  const priorityLabel = task.priority === 'critical' ? 'Critical · ' : task.priority === 'high' ? 'Important · ' : ''
  return {
    title: `${task.title} — Germany Checklist`,
    description: `${priorityLabel}${task.description.slice(0, 155).replace(/\s\S*$/, '')}…`,
    openGraph: {
      title: `${task.title} — How to in Germany`,
      description: task.description.slice(0, 155).replace(/\s\S*$/, '') + '…',
    },
  }
}

export default function TaskDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-gray-400">
          Loading task…
        </div>
      }
    >
      <TaskDetail />
    </Suspense>
  )
}
