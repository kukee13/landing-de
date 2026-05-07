'use client'

import { track } from '@vercel/analytics'
import type { Sponsor } from '@/data/sponsors'

const ACCENT_CLASSES: Record<string, { border: string; badge: string; cta: string }> = {
  orange: {
    border: 'border-orange-200 bg-orange-50',
    badge: 'bg-orange-100 text-orange-700',
    cta: 'bg-orange-500 hover:bg-orange-600 text-white',
  },
  default: {
    border: 'border-blue-200 bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
    cta: 'bg-blue-600 hover:bg-blue-700 text-white',
  },
}

export function SponsoredCard({ sponsor }: { sponsor: Sponsor }) {
  const accent = ACCENT_CLASSES[sponsor.accentColor ?? 'default'] ?? ACCENT_CLASSES.default

  function handleClick() {
    track('sponsor_click', { sponsor: sponsor.id, badge: sponsor.badge })
    window.open(sponsor.destinationUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={['rounded-xl border px-4 py-4', accent.border].join(' ')}>
      <div className="flex items-start justify-between gap-3">
        <span className={['rounded-full px-2 py-0.5 text-xs font-medium', accent.badge].join(' ')}>
          {sponsor.badge}
        </span>
        <span className="text-xs text-gray-400">Ad</span>
      </div>

      <p className="mt-2 font-semibold text-gray-900">{sponsor.name}</p>
      <p className="text-sm font-medium text-gray-700">{sponsor.tagline}</p>
      <p className="mt-1 text-sm text-gray-600">{sponsor.description}</p>

      <button
        type="button"
        onClick={handleClick}
        className={[
          'mt-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
          accent.cta,
        ].join(' ')}
      >
        {sponsor.ctaText} →
      </button>
    </div>
  )
}
