import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, FileText, Clock, AlertCircle } from 'lucide-react'
import tasksData from '@/data/tasks/common.json'
import type { Task } from '@/lib/types'

const allTasks = tasksData as unknown as Task[]

const VISA_DATA: Record<string, {
  name: string
  tagline: string
  description: string
  color: string
  requirements: string[]
  tips: string[]
  guideSlug?: string
}> = {
  student: {
    name: 'Student Visa',
    tagline: 'Your checklist for studying in Germany',
    description:
      'International students face a unique set of tasks in their first weeks — university enrolment, blocked account release, student health insurance, and semester tickets. This checklist is filtered specifically for students.',
    color: 'blue',
    requirements: [
      'Valid university admission letter (Zulassungsbescheid)',
      'Proof of financial means (blocked account, scholarship, or guarantor)',
      'Blocked account (Sperrkonto) from Fintiba, Expatrio, or Deutsche Bank',
      'Health insurance — statutory GKV at subsidised student rate (~€120/month)',
      'APS certificate (required for applicants from China, India, Vietnam, Mongolia)',
    ],
    tips: [
      'Release your blocked account funds (€934/month) as soon as you arrive — you need it for the first months',
      'Your semester fee often includes a public transport pass (Semesterticket) — check before buying a Deutschlandticket',
      'TK and BARMER offer the best English-language student health insurance — register before arriving if possible',
      'DAAD offers emergency grants if you face unexpected financial hardship — register on their portal early',
      'Many German universities have an international student buddy programme — request one before orientation week',
    ],
    guideSlug: 'health-insurance-germany',
  },
  'blue-card': {
    name: 'EU Blue Card',
    tagline: 'Your checklist for skilled workers in Germany',
    description:
      'EU Blue Card holders are highly qualified workers with a recognised degree and a job offer above the salary threshold. You get a fast track to permanent residence (21 months with B1 German, 33 months without) and your family can join you immediately.',
    color: 'indigo',
    requirements: [
      'University degree recognised in Germany (check Anabin database)',
      'Employment contract with salary above the threshold (€45,300 for regulated professions; €56,400 general threshold in 2025)',
      'Valid passport with entry visa (national visa D) or existing residence title',
      'Health insurance — statutory (GKV) or private (PKV) if salary exceeds €69,300',
      'Proof of registered address (Meldebescheinigung)',
    ],
    tips: [
      'Apply for the Blue Card at your Ausländerbehörde immediately — it converts your national visa and allows you to work full time',
      'Your spouse gets an unrestricted work permit if they join you on family reunion — a major advantage over other permit types',
      'After 21 months with B1 German OR 33 months without, you qualify for permanent residence (Niederlassungserlaubnis)',
      'If you change employers within the first 2 years, you must notify the Ausländerbehörde — approval is usually routine for similar roles',
      'Enrol in a German course immediately — B1 unlocks permanent residence 12 months faster',
    ],
  },
  chancenkarte: {
    name: 'Chancenkarte',
    tagline: 'Your checklist for Opportunity Card holders',
    description:
      'The Chancenkarte (Opportunity Card) is Germany\'s points-based visa for skilled workers who don\'t yet have a job offer. You can enter Germany, look for work, and take on limited employment (up to 20 hours/week or trial work) for up to 12 months.',
    color: 'green',
    requirements: [
      'Recognised university degree or German vocational qualification',
      'At least 6 months of work experience in a qualified profession',
      'Sufficient financial means (€1,027/month or equivalent bank statements)',
      'Basic German (A1 minimum) or English B2 — part of the points calculation',
      'Score at least 6 points in the Chancenkarte points system',
    ],
    tips: [
      'Register with the Federal Employment Agency (Bundesagentur für Arbeit) and the Make it in Germany job portal as soon as you arrive',
      'You can work up to 20 hours/week or do short-term trial work while searching — this helps cover living costs',
      'If you find a qualifying job within 12 months, you convert the Chancenkarte to a work permit — no need to return home',
      'Germany has a chronic shortage in IT, engineering, healthcare, and skilled trades — focus your applications there',
      'The Chancenkarte costs €100 and is valid for 12 months from entry — use the full period',
    ],
  },
  'job-seeker': {
    name: 'Job Seeker Visa',
    tagline: 'Your checklist for job seekers in Germany',
    description:
      'The Job Seeker Visa allows holders of a recognised foreign degree to enter Germany and look for work for up to 6 months. You cannot work while on this visa (except trial work), but once you find a job, you convert to a work permit without leaving Germany.',
    color: 'purple',
    requirements: [
      'University degree with at least 5 years of professional experience, OR a German-recognised qualification',
      'Proof of financial means sufficient for 6 months (approx. €6,000–€9,000)',
      'Health insurance valid for Germany for the full 6-month period',
      'Proof of accommodation in Germany (hotel booking, WG contract, or host letter)',
      'CV and degree certificates (translated by a certified translator)',
    ],
    tips: [
      'The 6-month period starts from the date of entry — maximise it by registering at the Ausländerbehörde in week 1',
      'Anmeldung (address registration) is required within 14 days even on a job seeker visa',
      'Networking events (Meetup, LinkedIn local events, industry trade fairs like CeBIT, Hannover Messe) often lead to faster job offers than applications',
      'Germany\'s job centres (Arbeitsagentur) can\'t assist you on this visa, but private recruiters and LinkedIn InMail to HR managers can',
      'If you don\'t find work in 6 months, you must leave — the Chancenkarte is a better long-term alternative',
    ],
  },
  'family-reunion': {
    name: 'Family Reunion Visa',
    tagline: 'Your checklist for joining family in Germany',
    description:
      'Family reunion allows spouses, registered partners, and minor children of German residents to join them. Requirements vary significantly depending on whether you\'re joining an EU/German citizen (simpler) or a third-country national (more requirements).',
    color: 'rose',
    requirements: [
      'Proof of family relationship (marriage certificate, birth certificate — officially translated and apostilled)',
      'Basic German language proof — A1 level for spouses joining non-EU nationals (waived in some cases)',
      'Proof the sponsor has sufficient income and adequate housing',
      'Valid passport and entry visa (national visa D for 3rd-country nationals)',
      'Health insurance starting from day 1 of arrival',
    ],
    tips: [
      'The A1 German language requirement for spousal reunion can be waived in some hardship cases — check with the German embassy in your country',
      'If your sponsor holds an EU Blue Card, you get an unrestricted work permit immediately — no waiting period',
      'Apostille your marriage and birth certificates before leaving your home country — German authorities will require it',
      'Integration courses (Integrationskurs) are often mandatory for family reunion visa holders — register early as waiting lists can be long',
      'Children under 16 can generally join without German language requirements — they learn through school',
    ],
  },
}

const VISA_COLORS: Record<string, { badge: string; hero: string; cta: string }> = {
  blue: { badge: 'bg-blue-100 text-blue-700', hero: 'text-blue-600', cta: 'bg-blue-600 hover:bg-blue-700' },
  indigo: { badge: 'bg-indigo-100 text-indigo-700', hero: 'text-indigo-600', cta: 'bg-indigo-600 hover:bg-indigo-700' },
  green: { badge: 'bg-green-100 text-green-700', hero: 'text-green-600', cta: 'bg-green-600 hover:bg-green-700' },
  purple: { badge: 'bg-purple-100 text-purple-700', hero: 'text-purple-600', cta: 'bg-purple-600 hover:bg-purple-700' },
  rose: { badge: 'bg-rose-100 text-rose-700', hero: 'text-rose-600', cta: 'bg-rose-600 hover:bg-rose-700' },
}

export async function generateStaticParams() {
  return Object.keys(VISA_DATA).map((visa) => ({ visa }))
}

export async function generateMetadata({ params }: { params: Promise<{ visa: string }> }): Promise<Metadata> {
  const { visa } = await params
  const data = VISA_DATA[visa]
  if (!data) return {}
  return {
    title: `${data.name} Germany Checklist — What to do in your first 90 days`,
    description: `Personalised checklist for ${data.name} holders moving to Germany. Anmeldung, health insurance, bank account and more — filtered for your visa type.`,
  }
}

export default async function VisaPage({ params }: { params: Promise<{ visa: string }> }) {
  const { visa } = await params
  const data = VISA_DATA[visa]
  if (!data) notFound()

  const visaTasks = allTasks.filter((t) => t.applicableVisaTypes.includes(visa as never))
  const criticalTasks = visaTasks.filter((t) => t.priority === 'critical')
  const colors = VISA_COLORS[data.color] ?? VISA_COLORS.blue

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10">
        <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
          ← Landing.de
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <span className={['mb-3 inline-block rounded-full px-3 py-1 text-sm font-medium', colors.badge].join(' ')}>
            {data.name}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {data.tagline}
          </h1>
          <p className="mt-4 text-gray-600">{data.description}</p>
          <div className="mt-6">
            <Link
              href={`/onboarding?visa=${visa}`}
              className={[buttonVariants({ size: 'lg' }), 'inline-flex'].join(' ')}
            >
              Get my personalised checklist →
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-3 gap-4 rounded-xl border bg-gray-50 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{visaTasks.length}</p>
            <p className="text-xs text-gray-500">Total tasks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{criticalTasks.length}</p>
            <p className="text-xs text-gray-500">Critical</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">90</p>
            <p className="text-xs text-gray-500">Days covered</p>
          </div>
        </div>

        {/* Key requirements */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gray-400">
            <FileText className="h-3.5 w-3.5" /> Key requirements
          </h2>
          <ul className="space-y-2">
            {data.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border p-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <p className="text-sm text-gray-700">{req}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Critical tasks */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Critical tasks for {data.name} holders
          </h2>
          <ul className="space-y-2">
            {criticalTasks.map((task) => (
              <li key={task.id} className="flex items-center gap-3 rounded-xl border p-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                <span className="flex-1 text-sm font-medium text-gray-900">{task.title}</span>
                {task.deadlineDaysFromArrival && (
                  <span className="text-xs text-gray-400 shrink-0">Day {task.deadlineDaysFromArrival}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Tips */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gray-400">
            <Clock className="h-3.5 w-3.5" /> Tips for {data.name} holders
          </h2>
          <ul className="space-y-3">
            {data.tips.map((tip, i) => (
              <li key={i} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <p className="text-sm text-gray-700">{tip}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* All tasks preview */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
            All {visaTasks.length} tasks for {data.name} holders
          </h2>
          <ul className="space-y-1.5">
            {visaTasks.slice(0, 8).map((task) => (
              <li key={task.id} className="flex items-center gap-3 py-1.5 border-b border-gray-100 last:border-0">
                <span className={[
                  'h-1.5 w-1.5 shrink-0 rounded-full',
                  task.priority === 'critical' ? 'bg-red-500' :
                  task.priority === 'high' ? 'bg-amber-500' : 'bg-gray-300'
                ].join(' ')} />
                <span className="text-sm text-gray-700">{task.title}</span>
                {task.costEstimate && (
                  <span className="ml-auto text-xs text-gray-400 shrink-0">{task.costEstimate.split('·')[0].trim()}</span>
                )}
              </li>
            ))}
            {visaTasks.length > 8 && (
              <li className="py-1.5 text-sm text-gray-400">
                + {visaTasks.length - 8} more tasks in your personalised checklist
              </li>
            )}
          </ul>
        </section>

        {/* CTA */}
        <div className="rounded-xl bg-black p-6 text-center text-white">
          <p className="mb-1 font-semibold">Ready to build your full checklist?</p>
          <p className="mb-4 text-sm text-gray-400">60 seconds. No account. Free forever.</p>
          <Link
            href={`/onboarding?visa=${visa}`}
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
          >
            Get my {data.name} checklist →
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          <Link href="/impressum" className="underline">Impressum</Link>
          {' · '}
          <Link href="/datenschutz" className="underline">Datenschutz</Link>
        </p>
      </div>
    </div>
  )
}
