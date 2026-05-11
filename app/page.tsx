import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landing.de — Your first 90 days in Germany, sorted',
  description:
    'A free personalized checklist of bureaucratic tasks for international students and skilled workers arriving in Germany.',
}

const FAQ_ITEMS = [
  {
    question: 'What is Anmeldung and when do I need to do it?',
    answer:
      'Anmeldung is the mandatory address registration at your local Bürgeramt (citizen services office). You must complete it within 14 days of moving into your accommodation. The Meldebescheinigung (registration certificate) you receive is required for almost everything else: opening a bank account, applying for your residence permit, and getting your tax ID.',
  },
  {
    question: 'What health insurance do I need in Germany?',
    answer:
      'Health insurance is mandatory in Germany from day 1 of residence. Most newcomers choose statutory insurance (GKV) — popular providers include TK, BARMER, and AOK. Students pay a subsidised rate of around €120/month. Employees have contributions split with their employer (~€350–450/month total). Private insurance (PKV) is only available if you earn above ~€69,300/year or are self-employed.',
  },
  {
    question: 'Do I need a blocked account (Sperrkonto) to study in Germany?',
    answer:
      'Yes, if you are applying for a German student visa as a non-EU national, you must open a Sperrkonto with €11,208 (€934/month × 12 months). After you arrive, you can withdraw €934 each month. Popular providers are Expatrio and Fintiba. You can open the account entirely online.',
  },
  {
    question: 'How long does it take to get a German bank account?',
    answer:
      'Online banks like N26 and DKB take 10–15 minutes to apply and 5–10 business days to receive your debit card by post. Traditional banks require an in-person appointment and can take 2–3 weeks. You need your passport and Meldebescheinigung. Online banks are the fastest option for newcomers.',
  },
  {
    question: 'What is the Deutschlandticket and should I get it?',
    answer:
      'The Deutschlandticket costs €58/month and gives unlimited travel on all regional public transport across Germany — U-Bahn, S-Bahn, buses, trams, and regional trains. Students may already have a transport pass included in their semester fee — check before buying. You need a German bank account (IBAN) for the monthly direct debit.',
  },
  {
    question: 'How long does it take to get a residence permit (Aufenthaltstitel)?',
    answer:
      'You should book an appointment at the Ausländerbehörde (immigration office) as soon as you arrive — waiting times in Berlin and Munich are 6–12 weeks. On the day of your appointment, you receive a temporary permit (Fiktionsbescheinigung) which allows you to legally stay and work. The physical card arrives by post within 4–6 weeks.',
  },
]

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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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

        {/* Visa quick-start */}
        <section className="border-t px-4 py-8 bg-gray-50">
          <div className="mx-auto max-w-xl">
            <p className="mb-4 text-center text-sm font-medium text-gray-500">Pick your visa — get an instant checklist</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {[
                { visa: 'student', label: 'Student Visa', emoji: '🎓' },
                { visa: 'blue-card', label: 'EU Blue Card', emoji: '💼' },
                { visa: 'chancenkarte', label: 'Chancenkarte', emoji: '🎯' },
                { visa: 'job-seeker', label: 'Job Seeker', emoji: '🔍' },
                { visa: 'family-reunion', label: 'Family Reunion', emoji: '🏠' },
              ].map(({ visa, label, emoji }) => (
                <Link
                  key={visa}
                  href={`/onboarding?visa=${visa}`}
                  className="flex flex-col items-center gap-1.5 rounded-xl border bg-white px-3 py-3 text-center transition-all hover:border-gray-400 hover:shadow-sm"
                >
                  <span className="text-xl">{emoji}</span>
                  <span className="text-xs font-medium text-gray-700 leading-tight">{label}</span>
                </Link>
              ))}
            </div>
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

        <Separator />

        {/* FAQ */}
        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-gray-500">
              Frequently asked questions
            </h2>
            <dl className="space-y-4">
              {FAQ_ITEMS.map(({ question, answer }) => (
                <details key={question} className="group rounded-xl border bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                    <span className="font-medium text-gray-900">{question}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-4 pt-0">
                    <p className="text-sm leading-relaxed text-gray-600">{answer}</p>
                  </div>
                </details>
              ))}
            </dl>
          </div>
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
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <span className="text-gray-300">From:</span>
          <Link href="/from/india" className="underline hover:text-gray-600">India</Link>
          <Link href="/from/china" className="underline hover:text-gray-600">China</Link>
          <Link href="/from/nigeria" className="underline hover:text-gray-600">Nigeria</Link>
          <Link href="/from/usa" className="underline hover:text-gray-600">USA</Link>
          <Link href="/from/turkey" className="underline hover:text-gray-600">Turkey</Link>
          <Link href="/from/brazil" className="underline hover:text-gray-600">Brazil</Link>
          <Link href="/from/philippines" className="underline hover:text-gray-600">Philippines</Link>
          <Link href="/from/ukraine" className="underline hover:text-gray-600">Ukraine</Link>
          <Link href="/from/south-korea" className="underline hover:text-gray-600">South Korea</Link>
          <Link href="/from/vietnam" className="underline hover:text-gray-600">Vietnam</Link>
          <Link href="/from/pakistan" className="underline hover:text-gray-600">Pakistan</Link>
          <Link href="/from/morocco" className="underline hover:text-gray-600">Morocco</Link>
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
