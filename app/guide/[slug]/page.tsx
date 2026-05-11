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
    relatedGuides: ['anmeldung-germany', 'health-insurance-germany', 'blocked-account-germany'],
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
    relatedGuides: ['anmeldung-germany', 'residence-permit-germany', 'blocked-account-germany'],
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

  'blocked-account-germany': {
    title: 'Blocked Account (Sperrkonto) Germany: Complete Guide for Students (2025)',
    metaTitle: 'Blocked Account Germany (Sperrkonto): Expatrio vs Fintiba — Complete Guide 2025',
    metaDescription:
      'Everything you need to know about opening a blocked account (Sperrkonto) in Germany. Compare Expatrio and Fintiba, step-by-step setup, and how to release funds after arrival.',
    category: 'Banking',
    readingTime: '6 min',
    lastUpdated: 'January 2025',
    intro:
      'A blocked account (Sperrkonto) is a mandatory requirement for international students applying for a German student visa. You must deposit €11,208 (€934 × 12 months) before your visa application, and after arriving in Germany, you can withdraw €934 each month. Expatrio and Fintiba are the fastest — both fully online, no German bank account needed.',
    sections: [
      {
        heading: 'What is a Sperrkonto?',
        body: 'A Sperrkonto (blocked account) is a special bank account that holds your financial security deposit. The German government requires it to ensure you have enough money to support yourself for one year without working. The money is yours — it is not a fee or deposit you lose. The "blocking" simply means you can only withdraw a fixed monthly amount (€934) after arriving in Germany.',
        list: [
          'You deposit €11,208 (€934 × 12) before your visa application',
          'The bank issues a confirmation letter (Kontoeröffnungsbestätigung) — this is what you submit with your visa application',
          'After you arrive in Germany and activate your account, you receive €934 each month',
          'After 12 months, the blocking lifts and you can access the remaining balance freely',
        ],
      },
      {
        heading: 'Who needs a Sperrkonto?',
        body: 'A blocked account is required for:',
        list: [
          'Non-EU students applying for a German student visa at a German embassy or consulate',
          'Students extending their student residence permit in Germany in some cases',
          'Applicants from countries that require a Sperrkonto as part of the visa process (India, China, Nigeria, Pakistan, etc.)',
        ],
        tip: 'EU citizens do not need a Sperrkonto — freedom of movement applies. Students with a fully-funded DAAD or Erasmus scholarship may be exempt if their scholarship letter covers the full amount.',
      },
      {
        heading: 'Expatrio — fastest and most popular',
        body: 'Expatrio is the most popular Sperrkonto provider among Indian and international students. It partners with Deutsche Kreditbank (DKB) and can issue your confirmation letter within 24 hours of your deposit clearing.',
        list: [
          'Setup fee: ~€49 one-time',
          'Confirmation letter issued within 1–2 business days of deposit clearing',
          'Fully English-language process — no German required',
          'Optional extras: health insurance, travel insurance, SIM card bundled',
          'After arrival: activate online, receive €934/month via bank transfer',
        ],
      },
      {
        heading: 'Fintiba — strong alternative with extra services',
        body: 'Fintiba is the second most popular provider and offers a broader financial platform. It charges an annual fee and provides a Solaris Bank-backed account.',
        list: [
          'Annual fee: ~€89/year (first year)',
          'Confirmation letter within 2–3 business days',
          'Optional liability insurance and Haftpflicht bundles',
          'English-language support team',
          'Fintiba PRIME bundle includes health insurance for an additional fee',
        ],
        tip: 'Both Expatrio and Fintiba are reliable. Expatrio is slightly cheaper; Fintiba\'s insurance bundles can be convenient if you need to arrange multiple products at once.',
      },
      {
        heading: 'Deutsche Bank — for those who prefer traditional banking',
        body: 'Deutsche Bank offers a Sperrkonto but requires an in-person visit to a Deutsche Bank branch in Germany or — in some countries — at a partner bank. It is slower and less convenient than Expatrio or Fintiba.',
        warning: 'Avoid Deutsche Bank Sperrkonto if you are setting up from outside Germany — the in-person requirement makes it impractical and the process takes 2–4 weeks.',
      },
      {
        heading: 'Step-by-step: how to open a Sperrkonto',
        body: 'The process with Expatrio or Fintiba takes 15 minutes to start:',
        list: [
          'Go to Expatrio.com or Fintiba.com and click "Open Sperrkonto"',
          'Fill in your personal details: name, date of birth, passport number, home address',
          'Pay the setup fee by card or bank transfer',
          'Transfer €11,208 to the provided bank account (wire transfer from any bank worldwide)',
          'Wait 1–3 business days for the deposit to clear and receive your confirmation letter by email',
          'Submit the confirmation letter as part of your student visa application',
        ],
      },
      {
        heading: 'After arriving in Germany: releasing your funds',
        body: 'Once you arrive and complete your Anmeldung, you can activate your Sperrkonto:',
        list: [
          'Log in to your Expatrio/Fintiba account and submit your Meldebescheinigung',
          'Set up a German bank account (N26, DKB) to receive the monthly transfer — or use a PayPal/Revolut account in the interim',
          'Your first €934 transfer will arrive within a few business days of activation',
          'Subsequent transfers happen automatically each month on the same date',
        ],
      },
    ],
    providers: [
      { name: 'Expatrio', url: 'https://www.expatrio.com', note: '~€49 setup fee, fastest confirmation letter, most popular for Indian students' },
      { name: 'Fintiba', url: 'https://www.fintiba.com', note: '~€89/year, English support, optional insurance bundles' },
    ],
    relatedTaskId: 'blocked-account',
    relatedGuides: ['anmeldung-germany', 'bank-account-germany', 'health-insurance-germany'],
  },

  'chancenkarte-germany': {
    title: 'Chancenkarte Germany (Opportunity Card): Complete Guide 2025',
    metaTitle: 'Chancenkarte Germany 2025: Who Qualifies, Points System, and How to Apply',
    metaDescription:
      'Complete guide to Germany\'s Chancenkarte (Opportunity Card). Who qualifies, how the points system works, what you can do while in Germany, and how to convert to a work permit.',
    category: 'Visa',
    readingTime: '8 min',
    lastUpdated: 'January 2025',
    intro:
      'The Chancenkarte (Opportunity Card) is Germany\'s points-based visa for skilled workers who don\'t yet have a job offer. Launched in June 2024, it allows you to enter Germany, look for work, and take on limited employment for up to 12 months. If you find a qualifying job, you convert in-country — no need to return home.',
    sections: [
      {
        heading: 'What is the Chancenkarte?',
        body: 'The Chancenkarte replaces the older Job Seeker Visa with a more structured, points-based system. Unlike the Blue Card (which requires a job offer), the Chancenkarte lets you enter Germany first and job-hunt from within the country. You earn points based on your qualifications, work experience, language skills, age, and ties to Germany.',
        list: [
          'Valid for 12 months from entry — non-renewable',
          'Costs €100 at the Ausländerbehörde after arrival',
          'You can work up to 20 hours per week in any job while searching',
          'Probearbeit (trial work): up to 2 weeks with any employer — even without a contract',
          'Once you find a qualifying job, you convert the Chancenkarte to a work permit in Germany',
        ],
      },
      {
        heading: 'Do you qualify? The basic requirements',
        body: 'Before calculating points, you must meet all three baseline requirements:',
        list: [
          '1. Recognised qualification: either a 4-year university degree recognised in Germany (check Anabin) OR a completed German vocational qualification (Berufsausbildung) AND at least 5 years of relevant professional experience',
          '2. Financial means: proof of sufficient funds to support yourself for the full 12 months — approximately €12,000 in a bank account or a blocked account',
          '3. Language skills: at least A1 German or B2 English (used only as baseline; more points for higher levels)',
        ],
        warning: 'Check your degree on the Anabin database before applying. A degree rated "H+" or "H++" is fully recognised. If your degree isn\'t in the database, apply for a Statement of Comparability (Zeugnisbewertung) from the anabin-kmk office.',
      },
      {
        heading: 'The points system: how to calculate your score',
        body: 'You need at least 6 points from the following criteria:',
        list: [
          'Qualification: 4-year university degree = 4 points | German vocational qualification = 2 points',
          'Professional experience: 5+ years relevant experience = 3 points | 2–5 years = 2 points',
          'German language skills: B2 = 4 points | A2 = 2 points | A1 = 1 point',
          'Age: under 35 = 3 points | 35–40 = 2 points | 41–45 = 1 point',
          'English B2 or higher = 2 points',
          'Ties to Germany: close relative living in Germany = 1 point | prior legal stay of 6+ months = 1 point',
        ],
        tip: 'Most university graduates with 5+ years of experience and B1 German (or English B2) comfortably score 6+ points. Use the official calculator on make-it-in-germany.com to verify your score.',
      },
      {
        heading: 'What can you do on the Chancenkarte?',
        body: 'The Chancenkarte is not a work visa — it is a job-search permit. Your allowed activities are:',
        list: [
          'Work up to 20 hours per week in any job (Nebenbeschäftigung) — this covers living costs while you search',
          'Probearbeit: work full-time with one employer for up to 2 weeks as a trial — this is a key tool for securing job offers without a formal contract',
          'Attend job fairs, networking events, and company visits',
          'Register with the Bundesagentur für Arbeit for free career counselling (they cannot place you, but they provide job leads)',
          'You cannot start full-time employment until you have converted to a work permit',
        ],
      },
      {
        heading: 'Converting to a work permit',
        body: 'If you receive a qualifying job offer during your 12 months, you convert the Chancenkarte to a work permit at the Ausländerbehörde — without leaving Germany. The conversion options are:',
        list: [
          'EU Blue Card: if salary meets the threshold (€45,300 for shortage occupations, €56,400 general) and you have a recognised degree',
          'Skilled worker residence permit (§ 18a/b AufenthG): for recognised vocational qualifications',
          'You apply for the conversion at your local Ausländerbehörde — bring your employment contract, passport, current Chancenkarte, and Meldebescheinigung',
        ],
        tip: 'Book your conversion appointment as early as possible after receiving a job offer — appointment waiting times in major cities are 6–12 weeks, and your Chancenkarte must still be valid when you submit the application.',
      },
      {
        heading: 'How to apply for the Chancenkarte',
        body: 'The application process depends on your nationality and whether your country is visa-free for Germany:',
        list: [
          'Non-visa-free countries: apply at the German embassy in your home country with your qualifications, bank statements, points calculation, and passport photos',
          'Visa-free countries (e.g. USA, Canada, Australia): enter Germany as a tourist and apply for the Chancenkarte at the Ausländerbehörde within your 90-day visa-free period',
          'Submit: application form, degree certificates (translated and certified), proof of financial means, CV, and language certificate',
          'Processing at embassy: 4–12 weeks | At Ausländerbehörde in Germany: 4–8 weeks',
        ],
      },
    ],
    relatedTaskId: 'job-search',
    relatedGuides: ['bank-account-germany', 'health-insurance-germany', 'residence-permit-germany'],
  },

  'german-cv-format': {
    title: 'German CV Format (Lebenslauf) 2025: Complete Guide with Structure',
    metaTitle: 'German CV Format 2025: How to Write a Lebenslauf for Germany',
    metaDescription:
      'How to write a German CV (Lebenslauf) that gets interviews. Structure, photo rules, what to include and exclude — with a section-by-section breakdown for international applicants.',
    category: 'Employment',
    readingTime: '7 min',
    lastUpdated: 'January 2025',
    intro:
      'A German CV (Lebenslauf) follows specific conventions that differ significantly from Anglo-American CVs. German employers expect a clean, structured, 1–2 page document with a professional photo, precise employment dates, and no unexplained gaps. Getting the format right is the first filter — a poorly structured CV signals unfamiliarity with German work culture.',
    sections: [
      {
        heading: 'Key differences from other CV formats',
        body: 'German CVs differ from British and American CVs in several important ways:',
        list: [
          'Photo: a professional headshot is standard and expected — typically in the top-right corner',
          'Personal data: include full name, address, phone number, email, date of birth, nationality, and LinkedIn',
          'No "References available upon request" — German employers contact references separately',
          'Career objective: rarely used in Germany — let your experience speak for itself',
          'Length: 1 page for under 5 years experience, 2 pages maximum for senior roles',
          'Signature: traditional German CVs are signed and dated at the bottom',
        ],
        tip: 'German employers do not discard CVs with photos on the grounds of discrimination — the photo is a standard, expected element. Use a professional headshot (not a selfie or holiday photo).',
      },
      {
        heading: 'Structure: section by section',
        body: 'Use this order for a standard German CV:',
        list: [
          '1. Contact details (Kontaktdaten): full name, phone, email, address, LinkedIn, GitHub (for tech roles)',
          '2. Work experience (Berufserfahrung): reverse chronological order — most recent role first. For each role: company name, job title, dates (MM/YYYY – MM/YYYY), and 3–5 bullet points of achievements',
          '3. Education (Ausbildung / Bildung): reverse chronological — degree, institution, dates, grade (if strong)',
          '4. Skills (Kenntnisse): technical skills, software, certifications',
          '5. Languages (Sprachen): list each language with CEFR level (A1–C2) or equivalent (e.g. "Deutsch: B2", "Englisch: Muttersprache")',
          '6. Hobbies (Hobbys/Interessen): optional — include only if genuinely interesting or relevant to the role',
        ],
      },
      {
        heading: 'Work experience: what German employers look for',
        body: 'Each role should include specific, quantified achievements — not just job descriptions:',
        list: [
          'Use action verbs in German (or English for international applications): entwickelt, implementiert, geleitet, verantwortlich für',
          'Quantify where possible: "Reduced server response time by 40%" beats "Improved performance"',
          'List employment dates precisely: "Jan 2021 – Mar 2023" not "2021–2023"',
          'Explain gaps: a note like "Sabbatical/travel" or "Visa processing" is better than a silent gap',
          'Include part-time roles, internships (Praktika), and Werkstudent positions — German employers value all work experience',
        ],
        warning: 'German employers are more conservative about employment gaps than employers in other countries. If you have a gap of more than 3 months, add a brief explanation — even just "Job search" or "Language study".',
      },
      {
        heading: 'Education',
        body: 'German employers care about educational background more than many other countries. Include:',
        list: [
          'Your highest degree: full name of the degree, institution, country, start and end dates',
          'Grade/GPA: include if it\'s strong (above 2.5 on the German 1–5 scale, or equivalent). German system: 1 = excellent (sehr gut), 5 = fail (ungenügend)',
          'Thesis topic: for bachelor\'s and master\'s, add a one-line description if relevant to the role',
          'For non-German degrees: add "(equivalent to German Master/Bachelor)" in brackets if you have a Statement of Comparability',
          'School education: only include Abitur (German A-levels) equivalent — omit primary and middle school',
        ],
      },
      {
        heading: 'Language skills',
        body: 'List all languages with CEFR levels — this is taken seriously in Germany:',
        list: [
          'Deutsch (German): always list your actual level — A1, A2, B1, B2, C1, C2, or Muttersprache (native)',
          'Englisch: most professional roles require B2 minimum — "business fluent" is an acceptable description',
          'Other languages: even basic skills (A2) are worth listing in a globalised workforce',
          'Certificates: mention Goethe-Institut, TELC, DSH, or TestDaF levels if you have them — they carry weight',
        ],
        tip: 'Do not overstate your German level. HR managers often screen in German, and being caught out in an interview is more damaging than listing a lower level on your CV.',
      },
      {
        heading: 'Common mistakes international applicants make',
        body: 'Avoid these errors that immediately flag a CV as non-German:',
        list: [
          'Missing photo: always include a professional headshot',
          'Wrong date format: use DD.MM.YYYY or MM/YYYY for German applications',
          'Including "References available upon request": never included in German CVs',
          'One-page rule from the US: German CVs can be 2 pages — cramming experience into 1 page looks amateurish',
          'Listing "Objective" or "Summary" at the top: optional and rarely used in Germany',
          'Using a non-standard format (infographic CVs, excessive colour): conservative industries (finance, law, consulting) prefer plain formats',
        ],
      },
    ],
    relatedTaskId: 'job-search',
    relatedGuides: ['chancenkarte-germany', 'residence-permit-germany'],
  },

  'driving-licence-germany': {
    title: 'Driving Licence Conversion in Germany 2025: Country-by-Country Guide',
    metaTitle: 'Convert Driving Licence to German Führerschein 2025 — Do You Need a Test?',
    metaDescription:
      'How to convert your foreign driving licence to a German Führerschein. Which countries need a test, which can convert directly, documents required, timeline, and cost.',
    category: 'Transport',
    readingTime: '6 min',
    lastUpdated: 'January 2025',
    intro:
      'If you hold a non-EU/EEA driving licence, it is valid in Germany for 6 months from the date of your Anmeldung (address registration). After that, you must either convert it to a German Führerschein or pass German driving tests. Whether you need tests depends entirely on your country of issue — some countries have bilateral agreements with Germany allowing direct exchange; others require the full theory and practical exam.',
    sections: [
      {
        heading: 'EU/EEA licences: no conversion needed',
        body: 'If you hold a driving licence from an EU or EEA country (plus Switzerland and the UK), it remains valid in Germany indefinitely. You do not need to convert it. If it expires, you renew it at your local Führerscheinstelle.',
        list: [
          'EU/EEA countries: licence valid with no conversion required',
          'UK: licence valid after Brexit (reciprocal agreement in place)',
          'Switzerland: no conversion needed',
        ],
      },
      {
        heading: 'Non-EU countries: do you need a test?',
        body: 'Germany has bilateral agreements with several non-EU countries allowing licence exchange without a theory or practical exam. Check your country below:',
        list: [
          'Direct exchange (no test): Japan, South Korea, Taiwan, Singapore, New Zealand, Zimbabwe, Namibia, South Africa, Andorra, Monaco, San Marino, and certain US states and Canadian provinces',
          'Direct exchange — USA: varies by state. Exchange possible from: Alabama, Colorado, Delaware, Iowa, Illinois, Kansas, Kentucky, Louisiana, Michigan, New Mexico, Ohio, Oklahoma, Pennsylvania, South Carolina, South Dakota, Texas, Utah, Wyoming. All other US states require a practical driving test.',
          'Partial exchange (practical only, no theory test): Australia, Canada (some provinces), Israel, Bosnia-Herzegovina, Serbia',
          'Full test required (theory + practical): India, China, Nigeria, Pakistan, Turkey, Philippines, Brazil, and most other countries',
        ],
        warning: 'The 6-month window starts from your Anmeldung date — not your arrival date. If you delay your address registration, you technically extend the window, but this is not recommended.',
      },
      {
        heading: 'Documents you need',
        body: 'Standard document set for licence conversion or exchange at the Führerscheinstelle:',
        list: [
          'Valid foreign driving licence (original)',
          'Official translation by a certified translator (vereidigter Übersetzer) or ADAC — most offices require this for non-Latin-script licences',
          'Passport and valid residence permit (or Fiktionsbescheinigung)',
          'Meldebescheinigung',
          'Biometric passport photo (35×45mm)',
          'Eye test certificate (Sehtest): from any optician — costs ~€6–10',
          'First aid certificate (Erste-Hilfe-Kurs): valid if taken within the last 12 years (varies by state) — one-day course, ~€35',
          'Completed application form (download from your local Führerscheinstelle website)',
        ],
        tip: 'ADAC (the German automobile club) offers translation and legalisation services for foreign licences and is widely accepted by Führerscheinstellen. Their service costs ~€60–100.',
      },
      {
        heading: 'The process: step by step',
        body: 'Whether you are exchanging directly or taking tests, the process starts the same way:',
        list: [
          '1. Get your foreign licence translated by a certified translator or ADAC',
          '2. Complete the eye test (Sehtest) at any optician — takes 5 minutes',
          '3. Complete a first aid course (Erste-Hilfe-Kurs) if your certificate is expired or you don\'t have one — one-day course available at German Red Cross and ADAC',
          '4. Book an appointment at your local Führerscheinstelle (Straßenverkehrsamt) — bring all documents',
          '5. If direct exchange: pay the fee (€35–60) and your German licence is issued within 2–4 weeks',
          '6. If tests required: enrol in a German driving school (Fahrschule) for theory preparation and practical lessons, then book exams at TÜV or DEKRA',
        ],
      },
      {
        heading: 'Cost and timeline',
        body: 'The total cost varies widely depending on whether you need tests:',
        list: [
          'Direct exchange (no tests): €35–60 conversion fee + €60–100 ADAC translation = €95–160 total. Timeline: 3–6 weeks.',
          'Theory test only: add €25–35 for the TÜV/DEKRA theory exam + driving school fees (€300–500 for study materials and theory lessons)',
          'Full test (theory + practical): total cost typically €1,500–2,500 including driving school lessons (German Fahrschule average: 15–20 practical lessons at €50–80/each)',
          'Processing time with full tests: 3–6 months depending on how quickly you pass',
        ],
        warning: 'Do not drive in Germany with an expired or unconverted licence. Fines start at €40 for driving without a valid licence and can include points on your record or vehicle impoundment for more serious violations.',
      },
    ],
    relatedTaskId: 'drivers-license',
    relatedGuides: ['anmeldung-germany', 'chancenkarte-germany'],
  },

  'tax-return-germany': {
    title: 'German Tax Return (Steuererklärung) 2025: How to File and Get Your Refund',
    metaTitle: 'German Tax Return 2025: How to File Steuererklärung & Get a Refund',
    metaDescription:
      'How to file a German tax return (Steuererklärung) in 2025. Who must file, how to use ELSTER, Taxfix, and Wundertax — and how to claim the average €1,000+ refund.',
    category: 'Employment',
    readingTime: '7 min',
    lastUpdated: 'January 2025',
    intro:
      'Many international workers and students in Germany are entitled to a significant tax refund — the average is €1,072. Unlike some countries, Germany does not automatically send you a refund; you must file a Steuererklärung (tax return) to claim it. The deadline is 31 July of the following year, and even if you are not legally required to file, filing voluntarily almost always results in money back.',
    sections: [
      {
        heading: 'Who must file a tax return in Germany?',
        body: 'You are legally required to file if any of the following apply:',
        list: [
          'You have income from multiple employers in the same year (e.g., changed jobs)',
          'You have additional income not subject to withholding (freelance, rental income)',
          'You claim certain tax allowances (e.g., home office, exceptional expenses)',
          'You receive wage replacement benefits (Elterngeld, Kurzarbeitergeld, Arbeitslosengeld) above €410/year',
          'Your spouse is taxed under a combined tax class and you were both employed',
        ],
        tip: 'Even if you are not required to file, doing so almost always results in a refund — especially if you arrived mid-year, had work-related expenses, or paid into a pension.',
      },
      {
        heading: 'Why do internationals often get large refunds?',
        body: 'Several factors mean newcomers typically overpay tax throughout the year:',
        list: [
          'Partial-year employment: if you arrived in June, you paid tax on an annualised salary, but your total income was much lower',
          'Tax-free allowances (Grundfreibetrag) of €11,604 (2024) were not fully offset against withholding',
          'Work-related expenses (Werbungskosten): home office, professional memberships, language courses, relocation costs can be deducted',
          'Double taxation credits if you paid tax in your home country for part of the year',
          'Standard work expense flat rate (€1,230/year) is automatically applied even without receipts',
        ],
      },
      {
        heading: 'The deadline',
        body: 'The filing deadline for the tax year is 31 July of the following year:',
        list: [
          '2024 tax year → deadline: 31 July 2025',
          '2025 tax year → deadline: 31 July 2026',
          'If you use a Steuerberater (tax advisor), the deadline extends to 28 February of the year after',
          'Voluntary filings (when not legally required) can be submitted up to 4 years retroactively',
        ],
        warning: 'Missing the mandatory filing deadline can result in a late filing penalty (Verspätungszuschlag) — typically 0.25% of the tax due per month, minimum €25/month.',
      },
      {
        heading: 'ELSTER — the official portal (free but complex)',
        body: 'ELSTER (Elektronische Steuererklärung) is the official German government portal for tax returns. It is free but requires registration (takes 2–3 weeks for the activation letter to arrive by post).',
        list: [
          'Register at elster.de and choose "Privatperson" account type',
          'Submit your Steuer-ID, date of birth, and address to receive an activation code by post',
          'Use ELSTER Online or the ElsterFormular software to fill in your return',
          'ELSTER supports all tax forms but has a steep learning curve for first-time filers',
        ],
      },
      {
        heading: 'Taxfix and Wundertax — simpler English-friendly alternatives',
        body: 'For most employees (no rental income, no self-employment), Taxfix and Wundertax offer a guided interview-style process in English — often the better choice for newcomers:',
        list: [
          'Taxfix: English-language app, step-by-step questions, flat fee ~€39.99, files directly with ELSTER',
          'Wundertax: web-based, German/English, ~€34.99, shows estimated refund before you pay',
          'SteuerGo: ~€29.99, simplified interface, good for straightforward employment income',
          'WISO Steuer: most powerful, ~€29.99/year, used by ~3 million Germans, complex cases',
        ],
        tip: 'Taxfix is the most popular among internationals for good reason — the English interview format explains every question clearly. If your situation is simple (1 employer, no investments), it takes under 20 minutes.',
      },
      {
        heading: 'What can you deduct?',
        body: 'Common deductions that increase your refund:',
        list: [
          'Werbungskosten (work expenses): up to €1,230/year flat rate automatically applied; above that, you need receipts',
          'Home office (Homeoffice-Pauschale): €6/day working from home, up to €1,260/year from 2023',
          'Relocation costs (Umzugskosten): if you moved to Germany for work',
          'German language course fees: if required for your job',
          'Professional memberships, subscriptions, and tools used for work',
          'Commuting allowance (Entfernungspauschale): €0.30/km for the one-way distance to your workplace',
        ],
      },
      {
        heading: 'How long does a refund take?',
        body: 'After filing, the Finanzamt (tax office) processes your return and issues a Steuerbescheid (tax assessment notice):',
        list: [
          'Standard processing time: 4–12 weeks depending on the Finanzamt and time of year',
          'Refund is transferred directly to your German bank account',
          'If the assessment shows additional tax due, you have 4 weeks to pay',
          'You can object (Einspruch) to the assessment within 1 month if you disagree',
        ],
      },
    ],
    providers: [
      { name: 'Taxfix', url: 'https://www.taxfix.de', note: 'English-language, guided interview, ~€39.99 flat fee — best for internationals' },
      { name: 'Wundertax', url: 'https://www.wundertax.de', note: 'Shows estimated refund before paying, ~€34.99, web-based' },
      { name: 'ELSTER (free)', url: 'https://www.elster.de', note: 'Free official portal — complex, German-only, requires postal activation' },
    ],
    relatedTaskId: 'elster',
    relatedGuides: ['anmeldung-germany', 'bank-account-germany'],
  },

  'housing-germany': {
    title: 'Finding a Flat in Germany (2025): Complete Guide for Newcomers',
    metaTitle: 'How to Find a Flat in Germany 2025 — Renting Guide for Internationals',
    metaDescription: 'How to find an apartment in Germany as a foreigner. WG-Gesucht vs ImmobilienScout24, documents landlords require, Schufa report, and tenant rights.',
    category: 'Housing',
    readingTime: '8 min',
    lastUpdated: 'January 2025',
    intro: 'Finding a flat in Germany is one of the hardest parts of relocating — especially in Berlin, Munich, and Frankfurt where vacancy rates are below 1%. Landlords receive dozens of applications per flat, so having a complete, professional application dossier ready before you start viewing is essential.',
    sections: [
      {
        heading: 'Where to Search',
        body: 'The two dominant portals are ImmobilienScout24 and WG-Gesucht. ImmobilienScout24 lists entire apartments; WG-Gesucht specialises in flatshares (WGs). For temporary housing while you search, try Wunderflats or Homelike for furnished apartments.',
        list: [
          'ImmobilienScout24 — largest database of entire flats',
          'WG-Gesucht — best for shared apartments (WG/Wohngemeinschaft)',
          'Wunderflats / Homelike — furnished, short-term for the first 1–3 months',
          'Facebook groups: "Wohnungen in [City]" — often cheaper, no platform fee',
        ],
      },
      {
        heading: 'The Application Dossier',
        body: 'German landlords expect a complete self-disclosure packet with every inquiry. Missing documents means immediate rejection. Prepare this before you start applying.',
        list: [
          'Passport copy',
          'Last 3 payslips or proof of scholarship/funding',
          'Employment contract or university enrolment letter',
          'Schufa credit report (order free via Schufa — takes 1 week by post)',
          'Last 3 months bank statements',
          'Landlord reference letter from your previous landlord if available',
        ],
        tip: 'Create a PDF dossier with all documents ready to send within minutes of seeing a listing — speed matters more than anything else.',
      },
      {
        heading: 'The Schufa Credit Report',
        body: "Schufa is Germany's credit bureau. Most landlords require a clean Schufa report before signing a lease. As a newcomer you likely have no German credit history — this is fine and expected.",
        list: [
          'Free annual report: request at schufa.de (Datenkopie nach Art. 15 DSGVO) — takes 1–2 weeks by post',
          'Instant report: via Bonify app (free) or IdentityCheck (~€30) — instant PDF',
          'MEL Finance and other fintechs also offer instant Schufa checks',
        ],
        warning: 'Never apply for credit (loans, credit cards) in your first weeks in Germany — each credit application is recorded and temporarily lowers your score.',
      },
      {
        heading: 'Typical Costs',
        body: 'Renting in Germany involves upfront costs that can add up quickly.',
        list: [
          'Cold rent (Kaltmiete) — the base rent, excludes utilities',
          'Warm rent (Warmmiete) — includes utilities (Nebenkosten), typically €100–200/month more',
          'Security deposit (Kaution) — maximum 3 months cold rent, paid upfront',
          'No broker fee (Bestellerprinzip) — since 2015, landlords pay the agent, not tenants',
        ],
      },
      {
        heading: 'Tenant Rights',
        body: 'Germany has some of the strongest tenant protection laws in Europe. Once you sign a lease, you are well protected.',
        list: [
          'Rent increases limited by the Mietspiegel (rent index) in regulated cities',
          'Minimum 3 months notice for landlord to terminate — usually much longer in practice',
          'Deposit must be returned within 3–6 months of moving out (minus documented damages)',
          'Renters insurance (Hausratversicherung) is strongly recommended — protects your belongings',
        ],
      },
    ],
    providers: [
      { name: 'ImmobilienScout24', url: 'https://www.immobilienscout24.de', note: 'Largest German property portal for entire apartments' },
      { name: 'WG-Gesucht', url: 'https://www.wg-gesucht.de', note: 'Best flatshare (WG) listings — essential for students' },
      { name: 'Wunderflats', url: 'https://wunderflats.com/en', note: 'Furnished short-term flats — ideal for first 1–3 months' },
    ],
    relatedTaskId: 'anmeldung',
    relatedGuides: ['anmeldung-germany', 'bank-account-germany'],
  },

  'freelance-germany': {
    title: 'How to Become a Freelancer in Germany (2025): Gewerbe, Tax, Insurance',
    metaTitle: 'Freelancing in Germany 2025 — Register Gewerbe, Tax ID, Health Insurance',
    metaDescription: 'How to register as a freelancer (Freiberufler) or self-employed (Gewerbetreibender) in Germany. Gewerbe registration, tax number, Kleinunternehmer rule, and health insurance.',
    category: 'Work & Finance',
    readingTime: '9 min',
    lastUpdated: 'January 2025',
    intro: 'Germany distinguishes between liberal professions (Freiberufler — IT contractors, designers, translators, journalists) and tradespeople (Gewerbetreibende). The registration process, tax treatment, and obligations differ. This guide covers both paths and the key decisions you need to make.',
    sections: [
      {
        heading: 'Freiberufler vs. Gewerbetreibender',
        body: 'The classification determines your registration requirement and tax obligations.',
        list: [
          'Freiberufler (liberal professions): software developers, graphic designers, translators, journalists, consultants — no Gewerbe registration, no trade tax (Gewerbesteuer)',
          'Gewerbetreibender (tradespeople): e-commerce, physical products, some service businesses — must register a Gewerbe at the Gewerbeamt',
          'Uncertain? Ask a Steuerberater (tax advisor) — misclassification can result in back taxes',
        ],
      },
      {
        heading: 'Step 1: Register Your Business',
        body: 'Freiberufler register directly with the Finanzamt (tax office) via the Fragebogen zur steuerlichen Erfassung. Gewerbetreibende must first register at the Gewerbeamt.',
        list: [
          'Freiberufler: complete the "Fragebogen zur steuerlichen Erfassung" on ELSTER (elster.de) or paper form — submit to your local Finanzamt',
          'Gewerbetreibender: register at the Gewerbeamt (€20–65 fee) then submit the tax questionnaire to the Finanzamt',
          'You receive a Steuernummer (tax number) within 2–8 weeks — needed on every invoice',
        ],
        tip: 'Apply for your Steuernummer as soon as you have your Anmeldung — you can start working immediately and invoice clients with "Steuernummer beantragt" (applied for).',
      },
      {
        heading: 'The Kleinunternehmer Rule',
        body: 'If your annual turnover is below €22,000, you can opt for the Kleinunternehmerregelung — you do not charge VAT on invoices and do not file VAT returns. This simplifies accounting significantly for low-income freelancers.',
        list: [
          'Threshold: €22,000 in first year, €50,000 projected in following year',
          'Benefit: no VAT on invoices, no quarterly VAT returns',
          'Downside: cannot reclaim input VAT on business expenses',
          'Choose this if: you have mostly B2C clients or low startup costs',
        ],
        warning: 'Once you exceed €22,000, you must switch to regular VAT taxation and retroactively charge VAT. Track revenue carefully.',
      },
      {
        heading: 'Health Insurance for Freelancers',
        body: 'Self-employed people must arrange their own health insurance — it is not automatic. This is often the largest cost of freelancing in Germany.',
        list: [
          'GKV (statutory): available if you were previously GKV-insured; income-based premium ~€200–900/month depending on earnings',
          'PKV (private): available if healthy and earning well; can be cheaper than GKV for young healthy freelancers (~€200–400/month)',
          'Artist/journalist? Apply to the Künstlersozialkasse (KSK) — the state subsidises 50% of your GKV/PKV premium',
          'Get quotes from several PKV insurers (Ottonova, AXA, Allianz) before deciding',
        ],
      },
      {
        heading: 'Invoicing Requirements',
        body: 'German invoices (Rechnungen) must include specific fields to be legally valid.',
        list: [
          'Your full name and address',
          'Client full name and address',
          'Your Steuernummer or Umsatzsteuer-ID (VAT ID)',
          'Sequential invoice number',
          'Date of service and invoice date',
          'Clear description of services',
          'Net amount, VAT rate and amount (or Kleinunternehmer note), gross total',
          'Your German IBAN for payment',
        ],
      },
    ],
    relatedTaskId: 'tax-id',
    relatedGuides: ['tax-return-germany', 'bank-account-germany'],
  },

  'pension-germany': {
    title: 'German Pension for Expats (2025): What You Need to Know',
    metaTitle: 'German Pension System for Expats 2025 — Contributions, Refunds, Totalization',
    metaDescription: 'How the German pension system (Deutsche Rentenversicherung) works for internationals. Contributions, pension refund when leaving, totalization agreements, and what to expect.',
    category: 'Finance',
    readingTime: '7 min',
    lastUpdated: 'January 2025',
    intro: 'Every employee in Germany contributes 9.3% of their gross salary to the Deutsche Rentenversicherung (DRV) — matched by 9.3% from the employer. If you leave Germany, you may be able to get your contributions refunded, or transfer entitlements to your home country. This guide explains what happens to your pension contributions as an expat.',
    sections: [
      {
        heading: 'How Contributions Work',
        body: 'German pension contributions are automatic and appear on your payslip as "Rentenversicherung." Both you and your employer each pay 9.3% of gross salary (18.6% total).',
        list: [
          'Contribution rate: 18.6% of gross salary total (9.3% employee + 9.3% employer)',
          'Contribution ceiling (2024): €7,550/month in western Germany',
          'Contributions are tracked individually by your Rentenversicherungsnummer',
          'You receive your pension number on a green card within weeks of starting employment — keep it safe',
        ],
        tip: 'Your Rentenversicherungsnummer is printed on your Sozialversicherungsausweis and on your payslips. Keep it for life — it never changes.',
      },
      {
        heading: 'Will I Get a Pension?',
        body: 'To receive a German state pension, you need at least 5 qualifying years (Mindestversicherungszeit). Under EU rules and bilateral agreements, contribution years from other countries can count toward this threshold.',
        list: [
          'Minimum qualifying period: 5 years of contributions',
          'EU/EEA citizens: years in any EU country count (totalization)',
          'Non-EU: depends on whether your country has a social security totalization agreement with Germany (USA, Canada, Australia — check DRV website)',
          'If you do not reach 5 years and no agreement applies, you can apply for a refund when you leave',
        ],
      },
      {
        heading: 'Getting a Pension Refund When Leaving Germany',
        body: "If you leave Germany permanently and your home country has no totalization agreement, you can apply for a refund of your own contributions (not the employer's share) after 24 months of leaving the EU.",
        list: [
          'Eligible: non-EU citizens whose home country has no totalization agreement with Germany',
          'Waiting period: 24 months after leaving Germany (and the EU)',
          'You get back: only your own contributions, not the employer 9.3%',
          'Tax: the refund is taxed at a 15% flat rate in Germany (withheld at source)',
          'Apply via: Deutsche Rentenversicherung (DRV) — application can be made online at eservice-drv.de',
        ],
        warning: 'EU citizens cannot get a pension refund — contributions are locked in and transferable under EU rules instead.',
      },
      {
        heading: 'Totalization Agreements',
        body: 'Germany has social security agreements (Sozialversicherungsabkommen) with many countries. These prevent double contributions and allow years to be combined.',
        list: [
          'EU/EEA + Switzerland: automatic, no application needed',
          'USA, Canada, Australia: agreement in place — years combine for entitlement threshold',
          'India: limited agreement as of 2024 — check current status on DRV website',
          'China, Nigeria, Philippines: no agreement — refund option applies after 24 months',
        ],
      },
    ],
    relatedTaskId: 'tax-id',
    relatedGuides: ['tax-return-germany', 'bank-account-germany'],
  },

  'internet-germany': {
    title: 'Getting Home Internet in Germany (2025): DSL, Cable, and Fibre Guide',
    metaTitle: 'Home Internet in Germany 2025 — Best Providers, DSL vs Cable vs Fibre',
    metaDescription: 'How to get home internet in Germany. DSL vs cable vs fibre comparison, top providers (Telekom, Vodafone, o2, 1&1), contract tips, and what to do without fibre.',
    category: 'Social',
    readingTime: '5 min',
    lastUpdated: 'January 2025',
    intro: "Getting home internet set up in Germany takes 1–4 weeks from ordering to activation. Germany's infrastructure varies significantly — city centres often have cable (250–1000 Mbit/s) or fibre, while some buildings in older districts are still DSL-only. Always check what your specific address supports before choosing a provider.",
    sections: [
      {
        heading: 'Types of Connection',
        body: 'The type of connection available at your address determines your maximum speed.',
        list: [
          'DSL (via telephone line): widely available, 16–250 Mbit/s — cheapest but slowest',
          'Cable (Koaxialkabel): available in most cities via Vodafone; 100–1000 Mbit/s down, often asymmetric upload',
          'FTTH Fibre (Glasfaser): fastest and most future-proof, 500 Mbit/s–2 Gbit/s symmetric — expanding rapidly',
          'LTE/5G Home: good alternative in rural areas or temporary housing, no line installation needed',
        ],
      },
      {
        heading: 'Top Providers',
        body: 'Use Check24 or Verivox to compare current prices and availability at your exact address before ordering.',
        list: [
          'Deutsche Telekom (Magenta): widest DSL + fibre coverage; fastest network, slightly pricier (~€30–60/month)',
          'Vodafone: dominant cable provider in major cities; 250/500/1000 Mbit/s (~€25–50/month)',
          'o2 (Telefónica): DSL on Telekom infrastructure; competitive prices, good for existing o2 mobile customers',
          '1&1: budget DSL/fibre, often cheapest introductory prices (~€20–40/month)',
        ],
      },
      {
        heading: 'Ordering and Activation',
        body: 'The process from order to active internet typically takes 2–4 weeks.',
        list: [
          'Check address availability on provider websites or Check24',
          'Order online — you need your IBAN for monthly direct debit',
          'A technician visit is needed for new DSL lines; cable and existing connections sometimes activate remotely',
          'Contracts are typically 24 months minimum — check for early termination clauses',
          'Router is usually shipped by the provider (included or small monthly rental fee)',
        ],
        tip: 'If you need internet urgently, use your mobile data hotspot or buy a prepaid LTE router from MediaMarkt/Saturn (~€40) while waiting for your fixed-line connection to activate.',
      },
      {
        heading: 'Tenant Considerations',
        body: 'Check with your landlord before ordering — some buildings have existing contracts or infrastructure constraints.',
        list: [
          'Many WG and student dorms include internet in the Nebenkosten (utilities) — check your lease before ordering separately',
          'Ask your landlord if the building is connected to a cable or fibre provider — saves time checking availability',
          'Older Altbau buildings may only support DSL — but this can still be perfectly adequate for most uses',
        ],
      },
    ],
    providers: [
      { name: 'Check24 Internet', url: 'https://www.check24.de/internet/', note: 'Best comparison site — enter your address for live availability and prices' },
      { name: 'Telekom MagentaZuhause', url: 'https://www.telekom.de/zuhause/tarife-und-optionen/internet', note: 'Widest coverage, fastest support — slightly premium priced' },
      { name: 'Vodafone Cable', url: 'https://www.vodafone.de/zuhause/kabel-internet/', note: 'Best value for cable internet in major cities' },
    ],
    relatedTaskId: 'anmeldung',
    relatedGuides: ['bank-account-germany'],
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

  const BASE_URL = 'https://landing-de-brown.vercel.app'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: '2025-01-01',
    dateModified: '2025-01-15',
    publisher: { '@type': 'Organization', name: 'Landing.de', url: BASE_URL },
    author: { '@type': 'Organization', name: 'Landing.de' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/guide/${slug}` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Landing.de', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guide` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: `${BASE_URL}/guide/${slug}` },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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

        <div className="mt-8 border-t pt-6">
          <p className="mb-3 text-center text-xs font-medium text-gray-400">Country-specific guides</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-400">
            {['india','china','nigeria','usa','turkey','brazil','philippines','ukraine'].map((c) => (
              <Link key={c} href={`/from/${c}`} className="capitalize underline hover:text-gray-600">
                From {c.charAt(0).toUpperCase() + c.slice(1)}
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400">
          <Link href="/impressum" className="underline">Impressum</Link>
          {' · '}
          <Link href="/datenschutz" className="underline">Datenschutz</Link>
        </p>
      </div>
    </div>
  )
}
