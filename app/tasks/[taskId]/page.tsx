import { Suspense } from 'react'
import TaskDetail from './TaskDetail'

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
