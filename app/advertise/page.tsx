import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle2, Mail } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Advertise on Landing.de — Reach internationals moving to Germany',
  description:
    'Sponsor Landing.de to reach thousands of international students and skilled workers in their first week in Germany. Community partners, banner ads, and affiliate integrations.',
}

const TIERS = [
  {
    name: 'Community Partner',
    price: '€150 / month',
    description: 'Your community or content channel shown to users in their personalised checklist.',
    features: [
      'Branded card inserted in the task list (every user sees it once)',
      'Targeting by visa type (e.g. student-only) and city',
      'Click tracking dashboard via Vercel Analytics',
      'No setup fee, cancel anytime',
    ],
    ideal: 'YouTube channels, Telegram communities, WhatsApp groups',
    cta: 'Get started',
    highlight: false,
  },
  {
    name: 'Featured Provider',
    price: '€300 / month',
    description: 'Your service listed at the top of the "Recommended providers" section on relevant task detail pages.',
    features: [
      'Featured placement on 2–4 relevant task pages (e.g. bank account, health insurance)',
      '"Sponsored" badge with your name, tagline, and link',
      'Per-click tracking with monthly report',
      'Can combine with affiliate commission model',
    ],
    ideal: 'Banks, insurance providers, relocation services, language schools',
    cta: 'Get started',
    highlight: true,
  },
  {
    name: 'Affiliate Integration',
    price: 'Commission-based',
    description: 'We list your service as a recommended provider and earn a referral fee per verified signup — no upfront cost.',
    features: [
      'Listed in recommended providers on all relevant task pages',
      'Link routes through our tracking, attributed to Landing.de',
      'Works with Impact, Awin, CJ, and direct affiliate setups',
      'No monthly fee — we earn only when you do',
    ],
    ideal: 'N26, Wise, TK, Feather, Getsafe, Expatrio, and similar',
    cta: 'Discuss terms',
    highlight: false,
  },
]

const AUDIENCE = [
  { label: 'Non-EU nationals', value: '80%' },
  { label: 'Students & skilled workers', value: '75%' },
  { label: 'First week in Germany', value: '60%' },
  { label: 'Mobile visitors', value: '70%' },
]

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-12">

        <Link href="/" className="mb-8 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
          ← Landing.de
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <Badge variant="outline" className="mb-4">Advertising & Partnerships</Badge>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Reach internationals<br />
            <span className="underline decoration-yellow-400 decoration-4 underline-offset-4">
              in their first week in Germany.
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Landing.de is used by students, Blue Card holders, and families completing
            their mandatory bureaucracy. Your ad reaches them exactly when they need
            your service — not weeks later.
          </p>
        </div>

        {/* Audience stats */}
        <section className="mb-12 rounded-xl border bg-gray-50 p-6">
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Our audience
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {AUDIENCE.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <p className="mt-1 text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400 text-center">
            Top origin countries: India, China, Brazil, Nigeria, USA, Turkey.
            Top cities: Berlin, Munich, Frankfurt, Hamburg.
          </p>
        </section>

        {/* Tiers */}
        <section className="mb-12">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Placement options
          </h2>
          <div className="space-y-4">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={[
                  'rounded-xl border p-6',
                  tier.highlight ? 'border-black bg-black text-white' : 'border-gray-200 bg-white',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={['font-semibold text-lg', tier.highlight ? 'text-white' : 'text-gray-900'].join(' ')}>
                      {tier.name}
                    </p>
                    <p className={['mt-0.5 font-medium', tier.highlight ? 'text-gray-300' : 'text-gray-500'].join(' ')}>
                      {tier.price}
                    </p>
                  </div>
                  {tier.highlight && (
                    <Badge className="bg-yellow-400 text-black hover:bg-yellow-400">Most popular</Badge>
                  )}
                </div>

                <p className={['mt-3 text-sm', tier.highlight ? 'text-gray-300' : 'text-gray-600'].join(' ')}>
                  {tier.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className={['mt-0.5 h-4 w-4 shrink-0', tier.highlight ? 'text-green-400' : 'text-green-500'].join(' ')} />
                      <span className={tier.highlight ? 'text-gray-200' : 'text-gray-700'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <p className={['mt-3 text-xs', tier.highlight ? 'text-gray-400' : 'text-gray-400'].join(' ')}>
                  Ideal for: {tier.ideal}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-xl border border-gray-200 p-6 text-center">
          <Mail className="mx-auto mb-3 h-6 w-6 text-gray-400" />
          <h2 className="font-semibold text-gray-900">Ready to advertise?</h2>
          <p className="mt-1 text-sm text-gray-600">
            Email us with your website, target audience, and preferred tier.
            We respond within 24 hours.
          </p>
          <a
            href="mailto:kartikchauhanofficial@gmail.com?subject=Landing.de%20Advertising%20Inquiry"
            className={cn(buttonVariants({ size: 'lg' }), 'mt-4 inline-flex')}
          >
            Contact us →
          </a>
          <p className="mt-3 text-xs text-gray-400">
            Or message on WhatsApp / LinkedIn — links in our GitHub profile.
          </p>
        </section>

        <p className="mt-8 text-center text-xs text-gray-400">
          <Link href="/impressum" className="underline">Impressum</Link>
          {' · '}
          <Link href="/datenschutz" className="underline">Datenschutz</Link>
        </p>
      </div>
    </div>
  )
}
