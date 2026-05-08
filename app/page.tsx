import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landing.de — Your first 90 days in Germany, sorted',
  description:
    'A free personalized checklist of bureaucratic tasks for international students and skilled workers arriving in Germany.',
}

const VALUE_PROPS = [
  {
    title: 'Personalized to your visa and city',
    description:
      'Different tasks for students, Blue Card holders, Chancenkarte applicants, and more — filtered to what actually applies to you.',
  },
  {
    title: 'City-specific links and offices',
    description:
      'Direct links to your local Bürgeramt, registration portals, and government offices — not generic Google results.',
  },
  {
    title: 'No account. Nothing stored on a server.',
    description:
      'Your progress lives in your browser. Share your timeline via a link, or just bookmark it.',
  },
  {
    title: 'Deadline-ordered checklist',
    description:
      'Tasks are sorted by urgency from day 1 — so you always know what to do next.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero */}
        <section className="px-4 pt-16 pb-12 text-center sm:pt-24 sm:pb-16">
          <Badge variant="outline" className="mb-5 text-sm font-normal">
            Free · No account needed · Takes 60 seconds
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Your first 90 days
            <br className="hidden sm:inline" /> in Germany,{' '}
            <span className="text-black underline decoration-yellow-400 decoration-4 underline-offset-4">
              sorted.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base text-gray-600 sm:text-lg">
            Landing.de gives you a personalized checklist of every bureaucratic task —
            Anmeldung, health insurance, tax ID, bank account, and more — tailored to
            your visa type and city.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/onboarding"
              className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-auto')}
            >
              Get my timeline →
            </Link>
            <p className="text-sm text-gray-500">No email. No sign-up.</p>
          </div>
        </section>

        <Separator />

        {/* Value props */}
        <section className="bg-gray-50 px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-gray-500">
              Why Landing.de
            </h2>
            <ul className="space-y-6">
              {VALUE_PROPS.map(({ title, description }) => (
                <li key={title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">{title}</p>
                    <p className="mt-0.5 text-sm text-gray-600">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Separator />

        {/* Social proof placeholder */}
        <section className="px-4 py-12 text-center sm:py-16">
          <p className="mx-auto max-w-md text-gray-600">
            Moving to a new country is hard enough. We handle the paperwork maze so you
            can focus on settling in.
          </p>
          <Link
            href="/onboarding"
            className={cn(buttonVariants({ size: 'lg' }), 'mt-6 w-full sm:w-auto')}
          >
            Get my personalized checklist →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t px-4 py-8 text-center text-xs text-gray-400">
        <p>Landing.de — Built for newcomers to Germany. Free forever.</p>
        <p className="mt-1">
          Task information is for guidance only. Always verify with official sources.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <span className="text-gray-300">Cities:</span>
          <Link href="/city/berlin" className="underline hover:text-gray-600">Berlin</Link>
          <Link href="/city/munich" className="underline hover:text-gray-600">Munich</Link>
          <Link href="/city/frankfurt" className="underline hover:text-gray-600">Frankfurt</Link>
          <Link href="/city/hamburg" className="underline hover:text-gray-600">Hamburg</Link>
          <Link href="/city/cologne" className="underline hover:text-gray-600">Cologne</Link>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <span className="text-gray-300">Visas:</span>
          <Link href="/visa/student" className="underline hover:text-gray-600">Student</Link>
          <Link href="/visa/blue-card" className="underline hover:text-gray-600">Blue Card</Link>
          <Link href="/visa/chancenkarte" className="underline hover:text-gray-600">Chancenkarte</Link>
          <Link href="/visa/job-seeker" className="underline hover:text-gray-600">Job Seeker</Link>
          <Link href="/visa/family-reunion" className="underline hover:text-gray-600">Family Reunion</Link>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <span className="text-gray-300">Guides:</span>
          <Link href="/guide/anmeldung-germany" className="underline hover:text-gray-600">Anmeldung</Link>
          <Link href="/guide/bank-account-germany" className="underline hover:text-gray-600">Bank account</Link>
          <Link href="/guide/health-insurance-germany" className="underline hover:text-gray-600">Health insurance</Link>
          <Link href="/guide/residence-permit-germany" className="underline hover:text-gray-600">Residence permit</Link>
        </div>
        <div className="mt-3 flex justify-center gap-4">
          <Link href="/impressum" className="underline hover:text-gray-600">Impressum</Link>
          <Link href="/datenschutz" className="underline hover:text-gray-600">Datenschutz</Link>
          <Link href="/advertise" className="underline hover:text-gray-600">Advertise</Link>
        </div>
      </footer>
    </div>
  )
}
