import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle2, ExternalLink, Clock, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface GuideProvider {
  name: string
  url: string
  note: string
}

interface Guide {
  title: string
  metaTitle: string
  metaDescription: string
  category: string
  readingTime: string
  lastUpdated: string
  intro: string
  sections: {
    heading: string
    body: string
    list?: string[]
    warning?: string
    tip?: string
  }[]
  providers?: GuideProvider[]
  relatedTaskId: string
  relatedGuides?: string[]
}

const GUIDES: Record<string, Guide> = {
  'anmeldung-germany': {
    title: 'Anmeldung in Germany (2025): Complete Step-by-Step Guide',
    metaTitle: 'How to Do Anmeldung in Germany (2025) — Complete Guide',
    metaDescription:
      'Complete guide to Anmeldung — registering your address in Germany. Documents needed, how to book an appointment, and what happens if you miss the 14-day deadline.',
    category: 'Registration',
    readingTime: '6 min',
    lastUpdated: 'January 2025',
    intro:
      'Anmeldung — registering your address at the local Bürgeramt — is the single most important administrative step when you move to Germany. It is legally required within 14 days of moving into a property, and the Meldebescheinigung (registration certificate) you receive is the document you\'ll need to open a bank account, apply for your residence permit, get a tax ID, and complete almost every other bureaucratic task.',
    sections: [
      {
        heading: 'What is the Anmeldung?',
        body: 'Anmeldung (literally: registration) is the process of telling your local government where you live. Every person living in Germany — citizen or foreigner — must register their address at the Bürgeramt (citizens\' office) within 14 days of moving into a new property. Failing to do so is an administrative offence that can result in a fine of up to €1,000, though first-time offenders are rarely fined in practice.',
      },
      {
        heading: 'Why is it so important?',
        body: 'The Meldebescheinigung (registration certificate) you receive on the day of your appointment is the foundation of all further German bureaucracy:',
        list: [
          'Opens your German bank account (N26, DKB, Commerzbank — all require it)',
          'Triggers the automatic issuing of your Steueridentifikationsnummer (tax ID) within 2–4 weeks',
          'Required for your residence permit application at the Ausländerbehörde',
          'Needed to sign up for health insurance, register for the Rundfunkbeitrag, and set up utilities',
          'Your official German address for all government correspondence',
        ],
      },
      {
        heading: 'Documents you need',
        body: 'Bring these to your appointment — missing any one of them can result in the office turning you away:',
        list: [
          'Valid passport or national ID card',
          'Completed Anmeldeformular (registration form — download from your city\'s Bürgeramt website)',
          'Wohnungsgeberbestätigung — a signed confirmation from your landlord that you live at the address. This is legally required. Use the official form from your city\'s website.',
          'Your rental contract (not legally required but good backup)',
        ],
        warning: 'The Wohnungsgeberbestätigung is a common trip-up. Many landlords — especially private landlords — are unaware of this requirement. Print the form and bring it to them before your appointment.',
      },
      {
        heading: 'How to book an appointment',
        body: 'In most German cities, you can book a Bürgeramt appointment online. In Berlin and Munich, slots fill up 4–8 weeks in advance, so book as soon as you have your address:',
        list: [
          'Berlin: service.berlin.de — search for "Anmeldung einer Wohnung"',
          'Munich: muenchen.de (KVR) — available 2 months in advance',
          'Frankfurt: frankfurt.de/buergeramt',
          'Hamburg: hamburg.de/buergerservice',
          'Cologne: stadt-koeln.de/buergerservice',
        ],
        tip: 'If no slots are available online, try calling the Bürgeramt directly or showing up early (before 8am) on the day to queue for walk-in slots. Some offices reserve a small number of same-day slots.',
      },
      {
        heading: 'At the appointment',
        body: 'The appointment itself typically takes 10–15 minutes. The officer will review your documents, enter your information into the system, and print your Meldebescheinigung on the spot. Make at least 5 photocopies immediately — you will need them throughout the following weeks.',
      },
      {
        heading: 'After the Anmeldung',
        body: 'Once registered, several things happen automatically:',
        list: [
          'Your Steuer-ID (tax identification number) is mailed to your registered address within 2–4 weeks',
          'You become liable for the Rundfunkbeitrag (broadcasting fee, €18.36/month) — register or claim exemption on rundfunkbeitrag.de',
          'If you are registered as a member of a religious community, you\'ll start paying Kirchensteuer (church tax) — opt out at the Amtsgericht if it doesn\'t apply to you',
        ],
      },
    ],
    relatedTaskId: 'anmeldung',
    relatedGuides: ['bank-account-germany', 'residence-permit-germany'],
  },

  'bank-account-germany': {
    title: 'Best Bank Account for Expats in Germany (2025)',
    metaTitle: 'Best Bank Account for Expats & Internationals in Germany (2025)',
    metaDescription:
      'Compare N26, DKB, Commerzbank and more. Find the best German bank account for internationals and students — with no monthly fees, English apps, and fast opening.',
    category: 'Banking',
    readingTime: '7 min',
    lastUpdated: 'January 2025',
    intro:
      'Opening a German bank account (Girokonto) is one of the most urgent tasks after arriving. Your landlord will need a German IBAN for rent, your employer needs one for salary payments, and most direct debits (Deutschlandticket, Rundfunkbeitrag, utilities) require a German account. The good news: online banks like N26 and DKB can have you set up in 15 minutes.',
    sections: [
      {
        heading: 'What you need before opening an account',
        body: 'Most German banks require:',
        list: [
          'Valid passport or EU national ID',
          'Meldebescheinigung (address registration certificate from your Anmeldung)',
          'German phone number (for two-factor authentication)',
          'In some cases: proof of income or employment contract',
        ],
        tip: 'N26 can sometimes open an account before your Anmeldung — useful if you need an IBAN urgently for a rental deposit.',
      },
      {
        heading: 'N26 — Best overall for newcomers',
        body: 'N26 is a Berlin-based fully digital bank with 8 million customers across Europe. It\'s the most popular choice for internationals because of its English-language app, instant account opening, and no monthly fees on the standard plan.',
        list: [
          'Free standard account (N26 Standard)',
          'Full English app and customer support',
          'Instant IBAN (account number) after identity verification',
          'Mastercard debit card delivered within 5–7 business days',
          'Free cash withdrawals at ATMs (3 free/month on standard plan)',
        ],
      },
      {
        heading: 'DKB — Best for students and long-term residents',
        body: 'Deutsche Kreditbank (DKB) is a traditional German bank with a strong digital offering. It\'s particularly popular with students and those who want a free VISA debit card usable worldwide.',
        list: [
          'Free Girokonto with VISA debit card (free worldwide ATM withdrawals)',
          'No monthly fees for active accounts',
          'German-language interface (some English support available)',
          'Requires German address (Meldebescheinigung) to open',
          'Popular for its good interest rate on savings accounts',
        ],
      },
      {
        heading: 'Commerzbank — Best for branch access',
        body: 'If you prefer in-person banking or need complex products (e.g. a mortgage or credit card), Commerzbank is a safe choice. It has branches across Germany and English-speaking staff at major city branches.',
        list: [
          'Free account for the first year (then €9.90/month if conditions not met)',
          '1,000+ branches nationwide for in-person service',
          'Credit cards available (better for credit history building)',
          'English-speaking staff at major branch locations',
        ],
        warning: 'Traditional banks (Sparkasse, Deutsche Bank, Commerzbank) often have monthly fees (€5–10) unless you meet minimum deposit or salary requirements. Check conditions carefully before opening.',
      },
      {
        heading: 'When to open your account',
        body: 'Open your bank account in the first week after getting your Meldebescheinigung. Waiting longer creates practical problems:',
        list: [
          'Rent may need to be paid by SEPA transfer before your card arrives',
          'Your employer needs your IBAN before your first salary payment',
          'Direct debits for Deutschlandticket, internet, and utilities all need a German IBAN',
          'Card delivery typically takes 5–10 business days after verification',
        ],
      },
    ],
    providers: [
      { name: 'N26', url: 'https://n26.com/en-de', note: 'Free, English app, instant IBAN, most popular for newcomers' },
      { name: 'DKB', url: 'https://www.dkb.de', note: 'Free VISA debit card, great for students and long-term use' },
      { name: 'Commerzbank', url: 'https://www.commerzbank.de', note: 'Branch access, credit cards, English staff at major branches' },
      { name: 'Wise (multi-currency)', url: 'https://wise.com', note: 'Not a full bank, but excellent for international transfers and holding multiple currencies' },
    ],
    relatedTaskId: 'bank-account',
    relatedGuides: ['anmeldung-germany', 'health-insurance-germany'],
  },

  'health-insurance-germany': {
    title: 'Health Insurance in Germany for Newcomers: GKV vs PKV (2025)',
    metaTitle: 'Health Insurance Germany for Expats: GKV vs PKV Explained (2025)',
    metaDescription:
      'GKV or PKV? Which health insurance do you need in Germany? Complete guide for international students, Blue Card holders, and newcomers — with provider comparison.',
    category: 'Insurance',
    readingTime: '8 min',
    lastUpdated: 'January 2025',
    intro:
      'Health insurance is mandatory in Germany from day one of residence — you cannot legally live or work here without it. The German system has two tracks: statutory insurance (GKV — gesetzliche Krankenversicherung) and private insurance (PKV — private Krankenversicherung). Most newcomers and all students are in the GKV system.',
    sections: [
      {
        heading: 'GKV vs PKV: which one applies to you?',
        body: 'Your eligibility is determined by your employment status and income:',
        list: [
          'GKV (statutory): mandatory for employees earning below €69,300/year gross (2025 threshold), all students, and most job seekers',
          'PKV (private): optional for employees above €69,300/year, freelancers, and civil servants (Beamte)',
          'If you\'re on a Blue Card and earn above €69,300, you can choose PKV — but GKV is often better for newcomers',
          'Students under 30 always go into GKV at a subsidised rate (~€120/month)',
        ],
        tip: 'When in doubt, choose GKV. Switching from GKV to PKV is easy; switching back can be very difficult, especially as you age.',
      },
      {
        heading: 'How much does GKV cost?',
        body: 'GKV contributions are income-based:',
        list: [
          'Employees: 14.6% of gross salary, split 50/50 with employer — so you pay ~7.3%',
          'Students: flat rate of approximately €120/month (heavily subsidised)',
          'Job seekers / Chancenkarte: voluntary contributions, approximately €200–230/month',
          'Family members: can be added for free if they have no own income (family insurance / Familienversicherung)',
        ],
      },
      {
        heading: 'TK — best for internationals',
        body: 'TK (Techniker Krankenkasse) is Germany\'s largest GKV provider and the most popular among expats and international students. It offers English-language customer service, a well-designed app, and fast provisional membership letters.',
        list: [
          'English customer service line: +49 800 285 00 85',
          'Online application in English with English confirmation documents',
          'Provisional membership letter (Vorläufige Mitgliedsbescheinigung) issued immediately — needed for doctor visits before your card arrives',
          'Free digital health card (eGK) — delivered within 2–3 weeks',
        ],
      },
      {
        heading: 'BARMER — strong alternative',
        body: 'BARMER is the second-largest GKV and is well-regarded for its nationwide network and digital services. It has solid English support and is a good alternative to TK, particularly if your employer or university has a preferred insurer.',
      },
      {
        heading: 'When to register',
        body: 'Register with a GKV provider before you arrive in Germany if possible — certainly in the first week. This matters because:',
        list: [
          'Your employer needs your insurer\'s name and membership details for payroll setup',
          'The Ausländerbehörde requires proof of insurance for your residence permit',
          'Retroactive coverage can be claimed back to your start of employment / arrival',
          'Students need proof of insurance to complete university enrolment',
        ],
        warning: 'Do not arrive in Germany without health insurance. Emergency treatment will still be provided, but you will be billed at full cost — ambulance calls start at €700.',
      },
    ],
    providers: [
      { name: 'TK — Techniker Krankenkasse', url: 'https://www.tk.de/en', note: 'Most popular GKV for internationals, English-language support and application' },
      { name: 'BARMER', url: 'https://www.barmer.de/en', note: 'Second-largest GKV, solid English service, good nationwide network' },
      { name: 'AOK', url: 'https://www.aok.de/pk/', note: 'Largest GKV by member count, strong regional offices' },
    ],
    relatedTaskId: 'health-insurance',
    relatedGuides: ['anmeldung-germany', 'residence-permit-germany'],
  },

  'residence-permit-germany': {
    title: 'How to Apply for a German Residence Permit (Aufenthaltstitel) in 2025',
    metaTitle: 'German Residence Permit (Aufenthaltstitel): How to Apply in 2025',
    metaDescription:
      'Step-by-step guide to applying for a German residence permit (Aufenthaltstitel) at the Ausländerbehörde. Documents, costs, timelines, and what to do while you wait.',
    category: 'Registration',
    readingTime: '9 min',
    lastUpdated: 'January 2025',
    intro:
      'Non-EU nationals who arrive in Germany on a national visa (visa D) must convert it to a formal residence permit (Aufenthaltstitel) at the local Ausländerbehörde (immigration office). This is one of the most time-sensitive tasks: appointment waiting times in Berlin and Munich routinely reach 10–12 weeks, so you must book the moment you arrive.',
    sections: [
      {
        heading: 'Who needs a residence permit?',
        body: 'You need to apply if you are:',
        list: [
          'A non-EU national on a national visa (D-Visum) — student, Blue Card, Chancenkarte, job seeker, or family reunion',
          'A non-EU national who has changed visa type or purpose of stay',
          'Anyone who needs to extend their residence beyond their current visa validity',
        ],
        tip: 'EU citizens and Swiss nationals do not need a residence permit — Anmeldung is sufficient. However, you can voluntarily apply for a registration certificate (Registrierbescheinigung) for convenience.',
      },
      {
        heading: 'Book your appointment immediately',
        body: 'This cannot be overstated: book your Ausländerbehörde appointment on the day you arrive or in the first week. In major cities:',
        list: [
          'Berlin: appointment waiting times of 8–14 weeks are common',
          'Munich: KVR appointments can be 6–10 weeks out',
          'Frankfurt and Hamburg: typically 4–8 weeks',
          'Cologne and smaller cities: usually 2–4 weeks',
        ],
        warning: 'If your visa expires before your appointment date, apply for a Fiktionsbescheinigung (fictional permit extension) at the Ausländerbehörde in person — this is issued immediately and allows you to stay legally while your application is processed.',
      },
      {
        heading: 'Documents to prepare',
        body: 'Standard document set for most residence permit types:',
        list: [
          'Valid passport with current entry visa',
          'Current Meldebescheinigung (address registration — must be up to date)',
          '2 biometric passport photos (35×45 mm, white background)',
          'Proof of health insurance (membership letter from GKV or PKV)',
          'Proof of income or financing: employment contract + salary slips, scholarship letter, or blocked account statement',
          'Enrolment certificate (Immatrikulationsbescheinigung) — for student permits',
          'Completed application form downloaded from your city\'s Ausländerbehörde website',
        ],
        warning: 'Bring more than you think you\'ll need. Officers can and do reject applications for missing documents, and re-booking an appointment can add another 6–8 weeks to your wait.',
      },
      {
        heading: 'The appointment',
        body: 'Ausländerbehörde appointments typically last 30–60 minutes. The officer reviews your documents, may ask questions about your purpose of stay and financial situation, and then:',
        list: [
          'Issues a Fiktionsbescheinigung on the day — this is a paper document that legally allows you to stay and work while your residence permit is processed',
          'Collects the application fee: typically €100–110 for most first-time permits',
          'Sends your application to be processed (4–6 weeks) — the plastic residence permit card arrives by post',
        ],
      },
      {
        heading: 'After the appointment',
        body: 'Once your residence permit arrives by post:',
        list: [
          'Check the permit carefully: permitted activities (Erlaubte Beschäftigung), validity dates, and your name/date of birth must be correct',
          'If applying for an EU Blue Card, the permit enables a fast track to permanent residence (21 months with B1 German, 33 months without)',
          'Keep the Fiktionsbescheinigung until you receive the physical card — it\'s your legal residence proof in the interim',
          'Notify your employer of the new permit type and expiry date',
        ],
      },
    ],
    relatedTaskId: 'residence-permit',
    relatedGuides: ['anmeldung-germany', 'health-insurance-germany'],
  },
}

export async function generateStaticParams() {
  return Object.keys(GUIDES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = GUIDES[slug]
  if (!guide) return {}
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = GUIDES[slug]
  if (!guide) notFound()

  const otherGuides = Object.entries(GUIDES)
    .filter(([s]) => (guide.relatedGuides ?? []).includes(s))
    .map(([s, g]) => ({ slug: s, title: g.title, category: g.category }))

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-20 pt-10">
        <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
          ← Landing.de
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="outline">{guide.category}</Badge>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="h-3 w-3" /> {guide.readingTime} read
            </span>
            <span className="text-xs text-gray-400">Updated {guide.lastUpdated}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{guide.title}</h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">{guide.intro}</p>
        </div>

        <Separator className="mb-8" />

        {/* Sections */}
        <div className="space-y-10">
          {guide.sections.map((section, i) => (
            <section key={i}>
              <h2 className="mb-3 text-xl font-bold text-gray-900">{section.heading}</h2>
              <p className="text-gray-700 leading-relaxed">{section.body}</p>

              {section.list && (
                <ul className="mt-3 space-y-2">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.warning && (
                <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <p className="text-sm text-amber-800">{section.warning}</p>
                </div>
              )}

              {section.tip && (
                <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Tip: </span>{section.tip}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Providers */}
        {guide.providers && guide.providers.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-1 text-lg font-bold text-gray-900">Recommended providers</h2>
            <p className="mb-4 text-xs text-gray-400">
              These links may earn Landing.de a referral fee at no cost to you.
            </p>
            <ul className="space-y-2">
              {guide.providers.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-3 rounded-xl border p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{p.name}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{p.note}</p>
                    </div>
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-xl bg-black p-6 text-center text-white">
          <p className="font-semibold">Turn this guide into your personal checklist</p>
          <p className="mt-1 text-sm text-gray-400">
            Get every task in the right order, with deadlines and steps — filtered to your visa type.
          </p>
          <Link
            href={`/tasks/${guide.relatedTaskId}`}
            className="mt-4 inline-block rounded-lg border border-white px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white hover:text-black"
          >
            View the full task →
          </Link>
          <span className="mx-3 text-gray-500">or</span>
          <Link
            href="/onboarding"
            className="mt-4 inline-block rounded-lg border border-white px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white hover:text-black"
          >
            Build my checklist →
          </Link>
        </div>

        {/* Related guides */}
        {otherGuides.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">Related guides</h2>
            <ul className="space-y-2">
              {otherGuides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guide/${g.slug}`}
                    className="flex items-center justify-between rounded-xl border p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <span className="text-xs text-gray-400">{g.category}</span>
                      <p className="text-sm font-medium text-gray-900">{g.title}</p>
                    </div>
                    <span className="text-gray-400">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-8 text-center text-xs text-gray-400">
          <Link href="/impressum" className="underline">Impressum</Link>
          {' · '}
          <Link href="/datenschutz" className="underline">Datenschutz</Link>
        </p>
      </div>
    </div>
  )
}
