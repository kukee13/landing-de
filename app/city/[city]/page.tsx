import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, MapPin, Clock, Users } from 'lucide-react'
import tasksData from '@/data/tasks/common.json'
import type { Task } from '@/lib/types'

const allTasks = tasksData as unknown as Task[]

const CITY_DATA: Record<string, {
  name: string
  state: string
  population: string
  burgeramt: string
  burgeramtUrl: string
  auslanderUrl: string
  tips: string[]
}> = {
  berlin: {
    name: 'Berlin',
    state: 'Berlin',
    population: '3.7 million',
    burgeramt: 'Bürgeramt Berlin',
    burgeramtUrl: 'https://service.berlin.de/dienstleistung/120686/',
    auslanderUrl: 'https://www.berlin.de/labo/willkommen-in-berlin/',
    tips: [
      'Bürgeramt appointments in Berlin book out 4–8 weeks ahead — book the moment you arrive.',
      'The Ausländerbehörde is at Friedrich-Krause-Ufer 24; bring a number ticket early.',
      'Berlin has the most English-speaking government services of any German city.',
      'The BVG semester ticket for students covers all public transport in Berlin and Potsdam.',
    ],
  },
  munich: {
    name: 'Munich',
    state: 'Bavaria',
    population: '1.5 million',
    burgeramt: 'Kreisverwaltungsreferat (KVR)',
    burgeramtUrl: 'https://www.muenchen.de/rathaus/Stadtverwaltung/Kreisverwaltungsreferat/Buergerbuero.html',
    auslanderUrl: 'https://www.muenchen.de/rathaus/Stadtverwaltung/Kreisverwaltungsreferat/Auslaenderrecht.html',
    tips: [
      "Munich's KVR handles both Anmeldung and immigration — different departments, same building.",
      'Book KVR appointments via the Munich city portal; slots open 2 months in advance.',
      'Bavaria charges the highest church tax (8% of income tax) — opt out early if not religious.',
      'The MVV semester ticket for LMU and TU students covers most of the Munich transport zone.',
    ],
  },
  frankfurt: {
    name: 'Frankfurt',
    state: 'Hesse',
    population: '760,000',
    burgeramt: 'Bürgeramt Frankfurt',
    burgeramtUrl: 'https://www.frankfurt.de/buergeramt',
    auslanderUrl: 'https://www.frankfurt.de/auslaenderbehorde',
    tips: [
      "Frankfurt's Ausländerbehörde is at Kleyerstraße 86 — book online in advance.",
      'As a financial hub, Frankfurt has many English-speaking banks and English HR support.',
      'The RMV semester ticket covers all public transport in the Rhine-Main region.',
      'Frankfurt airport means many international arrivals — services are generally well set up for newcomers.',
    ],
  },
  hamburg: {
    name: 'Hamburg',
    state: 'Hamburg',
    population: '1.8 million',
    burgeramt: 'Einwohner-Zentralamt Hamburg',
    burgeramtUrl: 'https://www.hamburg.de/buergerservice/',
    auslanderUrl: 'https://www.hamburg.de/auslaenderbehoerde/',
    tips: [
      'Hamburg uses a central Einwohner-Zentralamt for registration — not distributed Bürgerämter.',
      'The HVV ProfiCard for students provides all-zone Hamburg transport coverage.',
      'Hamburg has a large international business community and strong English-language services.',
      "Register early — Hamburg's immigration office appointment wait times can reach 10–12 weeks.",
    ],
  },
  cologne: {
    name: 'Cologne',
    state: 'North Rhine-Westphalia',
    population: '1.1 million',
    burgeramt: 'Bürgeramt Köln',
    burgeramtUrl: 'https://www.stadt-koeln.de/buergerservice/aemter/buergeramt',
    auslanderUrl: 'https://www.stadt-koeln.de/auslaenderamt',
    tips: [
      'Cologne has multiple Bürgeramt branches — choose the one closest to your address.',
      'North Rhine-Westphalia charges 9% church tax (highest in Germany) — opt out if applicable.',
      'The KVB semester ticket for University of Cologne students covers all Cologne zones.',
      "Cologne's cost of living is significantly lower than Munich or Frankfurt.",
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(CITY_DATA).map((city) => ({ city }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params
  const data = CITY_DATA[city]
  if (!data) return {}
  return {
    title: `Moving to ${data.name} — Germany checklist & guide | Landing.de`,
    description: `Personalized checklist for internationals moving to ${data.name}. Anmeldung, residence permit, health insurance, bank account and more — with ${data.name}-specific links and tips.`,
  }
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params
  const data = CITY_DATA[city]
  if (!data) notFound()

  const taskCount = allTasks.filter((t) => t.applicableCities.includes(city as never)).length
  const criticalCount = allTasks.filter(
    (t) => t.applicableCities.includes(city as never) && t.priority === 'critical'
  ).length

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10">
        <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
          ← Landing.de
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">{data.state}, Germany · {data.population} residents</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Moving to {data.name}?<br />
            <span className="underline decoration-yellow-400 decoration-4 underline-offset-4">
              Here's your checklist.
            </span>
          </h1>
          <p className="mt-4 text-gray-600">
            {taskCount} bureaucratic tasks, {criticalCount} critical — personalised to your visa type,
            with {data.name}-specific office links and booking URLs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/onboarding?city=${city}`}
              className={buttonVariants({ size: 'lg' })}
            >
              Get my {data.name} checklist →
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-3 gap-4 rounded-xl border bg-gray-50 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{taskCount}</p>
            <p className="text-xs text-gray-500">Total tasks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
            <p className="text-xs text-gray-500">Critical</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">90</p>
            <p className="text-xs text-gray-500">Days covered</p>
          </div>
        </div>

        {/* City-specific tips */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gray-400">
            <MapPin className="h-3.5 w-3.5" /> {data.name}-specific tips
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

        {/* Key offices */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Key offices
          </h2>
          <div className="space-y-3">
            <a href={data.burgeramtUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-900">{data.burgeramt}</p>
                <p className="text-sm text-gray-500">Anmeldung (address registration)</p>
              </div>
              <Badge variant="outline">Book →</Badge>
            </a>
            <a href={data.auslanderUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-900">Ausländerbehörde {data.name}</p>
                <p className="text-sm text-gray-500">Residence permit application</p>
              </div>
              <Badge variant="outline">Book →</Badge>
            </a>
          </div>
        </section>

        {/* Task list preview */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Critical tasks for {data.name} arrivals
          </h2>
          <ul className="space-y-2">
            {allTasks
              .filter((t) => t.applicableCities.includes(city as never) && t.priority === 'critical')
              .map((task) => (
                <li key={task.id} className="flex items-center gap-3 rounded-xl border p-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  <span className="font-medium text-gray-900 text-sm">{task.title}</span>
                  {task.deadlineDaysFromArrival && (
                    <span className="ml-auto text-xs text-gray-400">
                      Day {task.deadlineDaysFromArrival}
                    </span>
                  )}
                </li>
              ))}
          </ul>
        </section>

        <div className="rounded-xl bg-black p-6 text-center text-white">
          <p className="mb-1 font-semibold">Ready to build your full checklist?</p>
          <p className="mb-4 text-sm text-gray-400">Takes 60 seconds. No account needed.</p>
          <Link
            href={`/onboarding?city=${city}`}
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
