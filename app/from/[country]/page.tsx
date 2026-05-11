import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buttonVariants } from '@/components/ui/button'
import { CheckCircle2, AlertCircle, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CountryData {
  name: string
  flag: string
  tagline: string
  description: string
  keyFacts: string[]
  requirements: string[]
  tips: string[]
  commonVisas: string[]
  communityLinks?: { label: string; url: string }[]
}

const COUNTRY_DATA: Record<string, CountryData> = {
  india: {
    name: 'India',
    flag: '🇮🇳',
    tagline: 'Moving to Germany from India',
    description:
      'India is the largest source of new skilled workers and students in Germany. Over 200,000 Indians now live in Germany — concentrated in Berlin, Munich, Frankfurt, and Stuttgart. Whether you\'re on a Blue Card, Chancenkarte, or Student visa, the process involves a few India-specific requirements including APS certification and a blocked account.',
    keyFacts: [
      '200,000+ Indians currently live in Germany',
      'India is the #1 source of EU Blue Card holders in Germany',
      'APS certificate is mandatory for Indian students applying to German universities',
      'Sperrkonto (blocked account) of €11,208/year required for student visa',
      'IELTS or German B2 typically required — German skills open more opportunities',
    ],
    requirements: [
      'APS certificate (Akademische Prüfstelle) — mandatory for Indian degree holders applying to German universities or student visas',
      'Blocked account (Sperrkonto) with €11,208/year (≈ €934/month) from Expatrio, Fintiba, or Deutsche Bank',
      'Degree evaluation via Anabin database (check "H+" or "H++" rating) or a Statement of Comparability from anabin',
      'Health insurance — statutory GKV at student rates (~€120/month) or travel insurance for initial entry',
      'Biometric passport with at least 6 months validity beyond your intended stay',
    ],
    tips: [
      'Apply for your APS certificate at least 3–4 months before your university application deadline — it takes 4–8 weeks',
      'Expatrio and Fintiba are the fastest options for blocked accounts — open one online in minutes, funds accessible monthly after arrival',
      'TK (Techniker Krankenkasse) has the best English service and is the most popular health insurer among Indian newcomers',
      'The Bharat in Germany community (YouTube, WhatsApp groups) is an excellent resource for real-time advice from Indians already in Germany',
      'Register with the Make It in Germany portal and the Federal Employment Agency as soon as you arrive for job leads',
      'Download the Bharat in Germany app or join local Indian communities (IndUS, Mumbai Berlin etc.) for housing leads and social support',
    ],
    commonVisas: ['student', 'blue-card', 'chancenkarte', 'job-seeker'],
    communityLinks: [
      { label: 'Bharat in Germany (YouTube)', url: 'https://youtube.com/@bharatingermany' },
      { label: 'APS India — Certificate application', url: 'https://www.aps.org.in' },
      { label: 'Expatrio — Blocked account', url: 'https://www.expatrio.com' },
    ],
  },
  china: {
    name: 'China',
    flag: '🇨🇳',
    tagline: 'Moving to Germany from China',
    description:
      'China sends one of the largest groups of international students to Germany each year, particularly in engineering, natural sciences, and business. APS certification is mandatory. Many Chinese students go on to work in Germany under the Blue Card or skilled worker visa after completing their studies.',
    keyFacts: [
      '40,000+ Chinese students study in Germany — one of the largest groups',
      'APS certificate is mandatory for applicants from China, Vietnam, and Mongolia',
      'Confucius Institute language preparation can help meet German language requirements',
      'Many Chinese graduates transition to Blue Card after completing their degree in Germany',
    ],
    requirements: [
      'APS certificate (Akademische Prüfstelle) in Beijing or Shanghai — mandatory for all Chinese applicants',
      'Blocked account (Sperrkonto) with €11,208/year from Expatrio, Fintiba, or a German bank',
      'German language certificate B2 (or English IELTS 6.5+ for English-taught programmes)',
      'University admission letter (Zulassungsbescheid) from a German university',
      'Proof of accommodation for the first semester',
    ],
    tips: [
      'APS interviews are required in China — book your slot months in advance at the APS office in Beijing or Shanghai',
      'The DAAD scholarship is competitive but worth applying for — it covers tuition and provides a monthly stipend',
      'German universities in Bavaria and Baden-Württemberg charge semester fees (~€150) but no tuition fees for bachelor and master programmes',
      'WeChat groups for Chinese students in your target city are extremely active — they share housing, part-time job leads, and bureaucracy tips',
      'Open your blocked account before applying for the visa — the confirmation letter is a required document',
    ],
    commonVisas: ['student', 'blue-card'],
    communityLinks: [
      { label: 'APS China — Certificate application', url: 'https://www.aps.org.cn' },
      { label: 'DAAD — Scholarships for Chinese students', url: 'https://www.daad.de/en/studying-in-germany/scholarships/' },
    ],
  },
  nigeria: {
    name: 'Nigeria',
    flag: '🇳🇬',
    tagline: 'Moving to Germany from Nigeria',
    description:
      'Nigeria has one of the fastest-growing communities of skilled workers in Germany. Nigerian professionals in healthcare, IT, and engineering are increasingly sought after under the EU Blue Card and Chancenkarte schemes. The application process can be lengthy — start early and document everything meticulously.',
    keyFacts: [
      'Nigerian-born population in Germany has grown 40% in the last 5 years',
      'Nigerian nurses and doctors are among the most sought-after skilled workers',
      'The Chancenkarte is an excellent path for Nigerians with a 4-year degree and work experience',
      'No APS certificate required for Nigerian applicants',
    ],
    requirements: [
      'Statement of Comparability (Gleichwertigkeitsbescheinigung) from anabin.kmk.org — verify your degree is recognised',
      'Recognition of professional qualifications via the BAMF BERUFENET database for regulated professions (doctors, nurses, engineers)',
      'Health insurance valid for Germany (proof required for visa application)',
      'Police clearance certificate from Nigeria Police Force — apostilled and certified',
      'Proof of German or English language skills (B2 minimum for most programmes)',
    ],
    tips: [
      'Request your Nigerian Police clearance certificate early — processing can take 4–6 weeks and requires apostille from the Ministry of Foreign Affairs',
      'The German Embassy in Abuja and Lagos have long appointment queues — book your visa appointment months in advance',
      'Healthcare workers (nurses, doctors, medical technologists) are in very high demand — check the Germany skilled worker recognition database',
      'African German communities in major cities (Berlin has the largest Afro-German community) organise regular networking events',
      'The Chancenkarte points system gives extra credit for German language skills — even A2 level helps your score',
    ],
    commonVisas: ['blue-card', 'chancenkarte', 'job-seeker'],
  },
  usa: {
    name: 'USA',
    flag: '🇺🇸',
    tagline: 'Moving to Germany from the USA',
    description:
      'Americans moving to Germany benefit from a unique privilege: you can enter Germany as a tourist and apply for a residence permit or conversion in-country without needing a prior national visa. The Chancenkarte, Blue Card, and freelancer visa are all popular choices for Americans. No APS certificate is required.',
    keyFacts: [
      'Americans can enter Germany visa-free for 90 days and apply for a permit in-country',
      'No APS certificate required for US degree holders',
      'The USA has a bilateral driving licence agreement with Germany — conversion possible without a full test in most states',
      'Americans with German ancestry may be eligible for citizenship by descent (Abstammungsprinzip)',
      'Bilateral social security agreement means US work years count toward German pension',
    ],
    requirements: [
      'Valid US passport (no national visa required to enter — apply for residence permit in Germany)',
      'For Blue Card: employment contract with salary above threshold (~€56,400 general or ~€45,300 for shortage occupations)',
      'Proof of qualifications — US degrees are generally well-recognised, but verify on the Anabin database',
      'Health insurance starting from day 1 of residence (statutory GKV or approved private)',
      'Anmeldung within 14 days of finding permanent accommodation',
    ],
    tips: [
      'Open a local bank account immediately — Wise or Revolut are great bridging options before you can open a German bank account',
      'Most German employers are comfortable with English — but German language skills significantly expand your job market',
      'Many US driving licences can be exchanged for a German one without a test — check the BMDV list of reciprocal states',
      'US citizens are subject to US taxes on worldwide income even while in Germany — consult a US expat tax specialist (FBAR and Form 2555)',
      'The InterNations community has a large and active American expat community in Berlin, Munich, and Frankfurt',
    ],
    commonVisas: ['blue-card', 'chancenkarte', 'job-seeker'],
  },
  turkey: {
    name: 'Turkey',
    flag: '🇹🇷',
    tagline: 'Moving to Germany from Turkey',
    description:
      'Germany has the largest Turkish diaspora in Europe — over 3 million people of Turkish origin. If you\'re joining family, looking for work, or coming as a student, you benefit from a large, established community with extensive support networks. Turkish nationals are subject to standard third-country visa rules.',
    keyFacts: [
      'Germany has 3+ million people of Turkish origin — the largest diaspora outside Turkey',
      'Family reunion (Familienzusammenführung) is the most common visa category for Turkish nationals',
      'A1 German is required for family reunion visas joining non-EU spouses',
      'Bilateral social security agreement between Germany and Turkey recognises work years in both countries',
      'Turkish driving licences can be exchanged for German ones without an additional test',
    ],
    requirements: [
      'For family reunion: A1 German language certificate (Goethe-Institut or TELC exam at German embassy)',
      'Proof of family relationship — marriage or birth certificates, officially translated (German or Turkish) and apostilled',
      'Proof of adequate accommodation and income from the sponsor in Germany',
      'Valid Turkish passport with national visa (D-Visum) from the German consulate in Istanbul, Ankara, or Izmir',
      'Health insurance starting from day 1 of arrival',
    ],
    tips: [
      'Learn German before you arrive — the A1 language requirement for spousal reunion is tested at the German embassy in Turkey',
      'Diyanet İşleri Türk İslam Birliği (DITIB) and Türkisch-Islamische Union (UETD) run integration programmes in major German cities',
      'Turkish community centres (Türkische Gemeinde) in Berlin, Cologne, and Hamburg provide free legal advice for bureaucratic issues',
      'Turkish expats report that TK and AOK have Turkish-speaking staff at some branches in high-diaspora cities',
      'If you have German of Turkish origin already in Germany, they can act as a Wohnungsgeber (landlord confirmant) to support your Anmeldung',
    ],
    commonVisas: ['family-reunion', 'blue-card', 'job-seeker'],
    communityLinks: [
      { label: 'Türkische Gemeinde Deutschland', url: 'https://www.tgd.de' },
    ],
  },
  brazil: {
    name: 'Brazil',
    flag: '🇧🇷',
    tagline: 'Moving to Germany from Brazil',
    description:
      'Brazil has growing numbers of students and skilled workers in Germany, particularly in IT, engineering, and academia. Brazilians do not need a visa for short stays (up to 90 days in the Schengen area) and can apply for a residence permit in Germany from within the country. Portuguese-speaking communities are well-established in Berlin and Frankfurt.',
    keyFacts: [
      'Brazilians can enter Germany visa-free for up to 90 days (Schengen) and apply for permits in-country',
      'No APS certificate required for Brazilian degree holders',
      'Brazil and Germany have a bilateral social security agreement',
      'German-Brazilian community (Deutsch-Brasilianische Gesellschaft) is active in major cities',
      'Many Brazilians with German ancestry may qualify for citizenship by descent',
    ],
    requirements: [
      'Valid Brazilian passport — no national visa required for initial entry up to 90 days',
      'For Blue Card or work permit: employment contract and degree recognised via Anabin or anabin.kmk.org',
      'For student visa: university admission letter, blocked account, health insurance',
      'Proof of financial means for your stay or employment',
      'Registered address (Meldebescheinigung) within 14 days of moving into permanent accommodation',
    ],
    tips: [
      'Open a blocked account or show sufficient bank statements before applying for a student visa extension',
      'The DAAD-CAPES scholarship programme specifically supports Brazilian students in Germany — worth applying for',
      'Portuguese is not widely spoken in German bureaucracy — bring a bilingual friend or hire an interpreter for Ausländerbehörde appointments',
      'Facebook groups like "Brasileiros em Berlim" and "Brasileiros em Munique" are excellent for housing, job leads, and community events',
      'German universities partner heavily with Brazilian universities (especially USP and UNICAMP) — check for joint degree programmes',
    ],
    commonVisas: ['student', 'blue-card', 'chancenkarte'],
  },
  philippines: {
    name: 'Philippines',
    flag: '🇵🇭',
    tagline: 'Moving to Germany from the Philippines',
    description:
      'Germany has actively recruited Filipino healthcare workers — nurses, doctors, and medical technologists — as part of the Triple Win recruitment programme. Filipino professionals are highly regarded in Germany\'s healthcare sector. Excellent English skills and a strong work ethic make Filipino workers attractive candidates for Blue Card and skilled worker visas.',
    keyFacts: [
      'Germany is the #1 EU destination for Filipino healthcare workers under the Triple Win programme',
      'Over 30,000 Filipino nationals live in Germany — with a large concentration in Bavaria',
      'Nursing degree holders qualify for the skilled worker visa without needing to meet the Blue Card salary threshold',
      'Philippines and Germany have a bilateral labour agreement for healthcare workers',
      'Filipino driving licences can be exchanged for a German licence without an additional test',
    ],
    requirements: [
      'Recognition of professional qualifications through the relevant state authority (Landesbehörde) — critical for healthcare roles',
      'German language certificate B2 (required for most healthcare positions and mandatory for patient-facing roles)',
      'Equivalency check for your nursing or medical degree via the recognition database (Anerkennungsberatung)',
      'Valid Philippine passport with national visa from the German embassy in Manila',
      'Health insurance starting from day 1 — typically provided by the employer for healthcare workers',
    ],
    tips: [
      'Apply through the Triple Win programme (BA, GIZ, and Sequa) — it includes German language training before you leave the Philippines and job placement support',
      'Philippine Overseas Employment Administration (POEA) accreditation of your employer is important — verify before signing any contract',
      'German language training (at least B2) before arrival dramatically improves your chances of quick recognition and better roles',
      'Filipino community organisations (Filipino Communities in Germany) organise regular events and provide integration support',
      'The Anerkennung online portal helps you check recognition requirements for your specific profession and federal state',
    ],
    commonVisas: ['blue-card', 'chancenkarte'],
    communityLinks: [
      { label: 'Triple Win Programme — GIZ', url: 'https://www.giz.de/de/weltweit/15023.html' },
      { label: 'Anerkennung in Deutschland', url: 'https://www.anerkennung-in-deutschland.de/html/en/index.php' },
    ],
  },
  ukraine: {
    name: 'Ukraine',
    flag: '🇺🇦',
    tagline: 'Moving to Germany from Ukraine',
    description:
      'Ukrainians fleeing the war are covered by the EU Temporary Protection Directive (§24 AufenthG), which grants automatic residency rights, access to the labour market, and welfare support without needing a standard visa. Germany has taken in over 1 million Ukrainian refugees. The process is simpler than standard immigration but still requires completing key registrations.',
    keyFacts: [
      'Germany hosts 1+ million Ukrainian refugees — the largest Ukrainian diaspora in the EU',
      '§24 AufenthG (temporary protection) gives automatic right to stay, work, and access social benefits',
      'Ukrainian children must enrol in German school within 3 months of arrival',
      'Ukrainian driving licences are valid in Germany for 6 months — conversion possible after registration',
      'Bürgergeld (social support) and housing assistance available through Jobcenter',
    ],
    requirements: [
      'Ukrainian passport or biometric ID card — sufficient for crossing the Schengen border without a visa',
      'Registration at the Ausländerbehörde to receive the §24 residence permit — required within 14 days of settling',
      'Anmeldung (address registration) at the Bürgeramt within 14 days of arrival at your accommodation',
      'Enrolment with the Jobcenter for Bürgergeld entitlement and housing assistance',
      'German health insurance — those receiving Bürgergeld are automatically enrolled through the Jobcenter',
    ],
    tips: [
      'Register at the Ausländerbehörde immediately — your §24 permit enables bank accounts, mobile contracts, and social services',
      'Diakonie, AWO, and Caritas all have Ukrainian-speaking advisors in most large German cities — they provide free integration support',
      'Ukrainian educational qualifications are generally accepted in Germany — check the anabin database for your specific credential',
      'Bundesagentur für Arbeit offers free German language courses and vocational integration programmes specifically for Ukrainians',
      'The "Germany4Ukraine" portal has resources in Ukrainian for navigating the registration process step by step',
    ],
    commonVisas: ['blue-card', 'chancenkarte', 'family-reunion'],
    communityLinks: [
      { label: 'Germany4Ukraine — Arrival guide', url: 'https://www.germany4ukraine.de' },
      { label: 'Bundesagentur für Arbeit — Ukraine support', url: 'https://www.arbeitsagentur.de/ukraine' },
    ],
  },

  'south-korea': {
    name: 'South Korea',
    flag: '🇰🇷',
    tagline: 'Moving to Germany from South Korea',
    description: 'South Korea is a growing source of students and skilled workers in Germany. Korean engineers, researchers, and IT professionals are in high demand, and German universities have strong ties with Korean institutions. The Korean community in Berlin is well-established and provides excellent support for newcomers.',
    keyFacts: [
      'Korean nationals need a national (D) visa for stays over 90 days in Germany — including study and work',
      'Korea–Germany double taxation agreement prevents paying income tax in both countries simultaneously',
      'Germany has a large Korean expat community, particularly in Berlin — Korean language support is available at many services',
      'Korean academic and professional qualifications are generally recognised in Germany — confirm via the anabin database',
    ],
    requirements: [
      'Valid Korean passport (minimum 6 months validity beyond intended stay)',
      'Biometric photos (35×45 mm, ICAO compliant)',
      'Completed visa application form from the German Embassy in Seoul or Consulate in Busan',
      'Proof of accommodation in Germany',
      'Financial proof: blocked account (€11,208 for students) or employment contract for Blue Card',
      'Health insurance confirmation from German provider',
      'Language proficiency certificate (German B1–B2 for most work visas; English accepted for some Blue Card positions)',
    ],
    tips: [
      'Apply at the German Embassy in Seoul or the Consulate General in Busan — Seoul handles most visa categories',
      'Processing time: 4–8 weeks for student/work visas — allow extra time during the summer semester intake period',
      'The Korea–Germany Social Security Agreement means your Korean pension years can count toward German entitlement',
      'DAAD (German Academic Exchange Service) offers scholarships specifically for Korean students and researchers',
      'Kakao Talk is widely used in the Korean Berlin community — join expat groups for housing leads and settling-in advice',
    ],
    commonVisas: ['student', 'blue-card', 'job-seeker'],
    communityLinks: [
      { label: 'German Embassy Seoul — Visa information', url: 'https://seoul.diplo.de/kr-de/service/-/1342596' },
      { label: 'DAAD — Scholarships for Korean students', url: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/daad-scholarships/' },
    ],
  },

  'vietnam': {
    name: 'Vietnam',
    flag: '🇻🇳',
    tagline: 'Moving to Germany from Vietnam',
    description: 'Vietnam has one of the largest diaspora communities in Germany, with over 200,000 Vietnamese residents. Germany is increasingly popular among Vietnamese engineers and IT professionals seeking Blue Cards or the Chancenkarte. The Vietnamese community in Berlin is particularly well-organised and supportive for newcomers.',
    keyFacts: [
      'Vietnamese nationals require a national (D) visa for stays over 90 days — including study, work, and the Chancenkarte',
      'Germany is a popular destination for Vietnamese engineers and IT professionals seeking a Blue Card',
      'Vietnam has a large diaspora community in Germany — particularly in Berlin, Dresden, and Hamburg',
      'Vietnamese qualifications are assessed via the anabin database — engineering and medicine often require additional recognition steps',
    ],
    requirements: [
      'Valid Vietnamese passport (minimum 6 months validity beyond your intended stay)',
      'Biometric photos (35×45 mm)',
      'Completed visa application form from the German Embassy in Hanoi or Consulate General in Ho Chi Minh City',
      'Proof of accommodation in Germany',
      'Financial proof: blocked account (€11,208 for students) or employment contract for Blue Card',
      'University admission letter (for student visa) or job offer from German employer',
      'German or English language certificate depending on visa category',
      'Health insurance confirmation',
    ],
    tips: [
      'Apply at the German Embassy in Hanoi or the Consulate General in Ho Chi Minh City — allow 6–10 weeks processing time',
      'The Vietnamese community in Berlin (especially around Karl-Marx-Straße in Neukölln) is one of the largest in Germany — a great resource for settling in',
      'APS certificate (Akademische Prüfstelle) may be required before university admission in Germany — apply early as it takes several weeks',
      'DAAD offers several scholarships available to Vietnamese students and researchers — apply a year before your intended start date',
      'Germany has no pension totalization agreement with Vietnam — contributions can be refunded after 24 months if you leave the EU',
    ],
    commonVisas: ['student', 'blue-card', 'chancenkarte'],
    communityLinks: [
      { label: 'German Embassy Hanoi — Visa application', url: 'https://hanoi.diplo.de/vn-de/service/visa' },
      { label: 'APS Vietnam — Academic credential review', url: 'https://www.aps.org.vn' },
    ],
  },

  'pakistan': {
    name: 'Pakistan',
    flag: '🇵🇰',
    tagline: 'Moving to Germany from Pakistan',
    description: 'Pakistan is among the top source countries for skilled worker migration to Germany. Engineering, IT, and medical professionals from Pakistan are in high demand. The Chancenkarte has opened a direct pathway for qualified Pakistanis to arrive in Germany and job-search on the ground.',
    keyFacts: [
      'Pakistani nationals require a national (D) visa from the German Embassy in Islamabad or Consulate in Karachi or Lahore',
      'Germany introduced the Chancenkarte specifically to attract skilled workers from countries including Pakistan',
      'Engineering, IT, and medicine are the most in-demand fields for Pakistani professionals in Germany',
      'Pakistani qualifications from NUST, LUMS, and IIT are often recognised — verify via the anabin database',
    ],
    requirements: [
      'Valid Pakistani passport (minimum 6 months validity beyond intended stay)',
      'Biometric photos (35×45 mm, white background)',
      'Completed visa application form',
      'Proof of accommodation in Germany',
      'Financial proof: blocked account (€11,208 for students) or employment contract/salary evidence for skilled workers',
      'Academic or professional qualifications — certified translations required for Urdu or regional language documents',
      'German language certificate (A1 for family reunion; B1/B2 for most work visas; not required for some Blue Card roles)',
      'Health insurance confirmation from German provider',
    ],
    tips: [
      'Book your visa appointment at the German Embassy Islamabad or Consulates in Karachi/Lahore well in advance — demand is high',
      'The Chancenkarte is a good option if you have a bachelor degree and some work experience — no job offer required to apply',
      'DAAD offers several scholarships for Pakistani students — apply a year before your intended start date',
      'Pakistani documents often need apostille or notarisation plus certified German translation — factor this into your timeline',
      'Germany has no pension totalization agreement with Pakistan — contributions can be refunded after 24 months if you leave the EU',
    ],
    commonVisas: ['student', 'blue-card', 'chancenkarte'],
    communityLinks: [
      { label: 'German Embassy Islamabad — Visa section', url: 'https://islamabad.diplo.de/pk-de/service/visa' },
      { label: 'DAAD — Scholarships for Pakistani applicants', url: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/daad-scholarships/' },
    ],
  },

  'morocco': {
    name: 'Morocco',
    flag: '🇲🇦',
    tagline: 'Moving to Germany from Morocco',
    description: 'Morocco is one of the largest source countries for migration to Germany. Moroccan engineers, IT professionals, and tradespeople find strong demand for their skills. A bilateral social security agreement eases pension portability, and the Chancenkarte offers a streamlined path for qualified Moroccan professionals.',
    keyFacts: [
      'Moroccan nationals need a national (D) visa — available from the German Embassy in Rabat or Consulate General in Casablanca',
      'Germany and Morocco have a bilateral social security agreement — pension years in Morocco count partially toward German entitlements',
      'Morocco is one of the top source countries for skilled worker migration to Germany',
      'French language skills are an advantage in some German workplace environments, but German is required for most roles',
    ],
    requirements: [
      'Valid Moroccan passport (minimum 6 months validity beyond intended stay)',
      'Biometric photos (35×45 mm)',
      'Completed visa application form',
      'Proof of accommodation in Germany',
      'Financial proof: blocked account (€11,208 for students) or employment contract/salary evidence',
      'Certified translations of academic documents (French originals may not need full translation — confirm with the embassy)',
      'German language certificate (level depends on visa type)',
      'Health insurance confirmation',
    ],
    tips: [
      'Apply at the German Embassy in Rabat or the Consulate General in Casablanca — Casablanca handles most student and work visas',
      'Processing time: 4–8 weeks; summer semester applicants should apply by November',
      'The Chancenkarte is an excellent option for Moroccan engineering and IT graduates — apply without needing a job offer first',
      'French-speaking Moroccans often find German easier to learn than English speakers — leverage this advantage in language courses',
      'The Germany–Morocco social security agreement means some pension contributions may be portable — consult the Deutsche Rentenversicherung',
    ],
    commonVisas: ['student', 'blue-card', 'chancenkarte'],
    communityLinks: [
      { label: 'German Embassy Rabat — Visa information', url: 'https://rabat.diplo.de/ma-de/service/visa' },
      { label: 'German Consulate Casablanca', url: 'https://casablanca.diplo.de/ma-de/service/visa' },
    ],
  },
}

const VISA_LABELS: Record<string, string> = {
  student: 'Student Visa',
  'blue-card': 'EU Blue Card',
  chancenkarte: 'Chancenkarte',
  'job-seeker': 'Job Seeker',
  'family-reunion': 'Family Reunion',
}

export async function generateStaticParams() {
  return Object.keys(COUNTRY_DATA).map((country) => ({ country }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country } = await params
  const data = COUNTRY_DATA[country]
  if (!data) return {}
  return {
    title: `Moving to Germany from ${data.name} — First 90 days checklist`,
    description: `Everything you need to know about moving to Germany from ${data.name}. Personalised checklist for Anmeldung, health insurance, bank account, and more — with ${data.name}-specific tips.`,
    openGraph: {
      title: `Moving to Germany from ${data.name} — First 90 days checklist`,
      description: `Country-specific guide and checklist for ${data.name} nationals moving to Germany.`,
    },
  }
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const data = COUNTRY_DATA[country]
  if (!data) notFound()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Do I need a visa to move to Germany from ${data.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: data.requirements[0],
        },
      },
      {
        '@type': 'Question',
        name: `What are the most important tasks when moving to Germany from ${data.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The critical first tasks are Anmeldung (address registration within 14 days), getting health insurance (mandatory from day 1), opening a German bank account, and applying for your residence permit. ${data.tips[0]}`,
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
        >
          ← Landing.de
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-3xl">{data.flag}</span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              {data.name}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{data.tagline}</h1>
          <p className="mt-4 text-gray-600">{data.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {data.commonVisas.map((visa) => (
              <Link
                key={visa}
                href={`/onboarding?visa=${visa}`}
                className={cn(buttonVariants({ size: 'sm' }), 'text-sm')}
              >
                {VISA_LABELS[visa] ?? visa} checklist →
              </Link>
            ))}
          </div>
        </div>

        {/* Key facts */}
        <section className="mb-10 rounded-xl border bg-gray-50 p-5">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Key facts — {data.name} to Germany
          </h2>
          <ul className="space-y-2">
            {data.keyFacts.map((fact, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                {fact}
              </li>
            ))}
          </ul>
        </section>

        {/* Requirements */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
            What you need before you arrive
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

        {/* Tips */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Tips from the {data.name} community in Germany
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

        {/* Community links */}
        {data.communityLinks && data.communityLinks.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gray-400">
              <Users className="h-3.5 w-3.5" /> Community &amp; resources
            </h2>
            <ul className="space-y-2">
              {data.communityLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <span className="flex-1">{link.label}</span>
                    <span className="text-gray-400">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <div className="rounded-xl bg-black p-6 text-center text-white">
          <p className="mb-1 font-semibold">
            Build your personalised Germany checklist
          </p>
          <p className="mb-4 text-sm text-gray-400">
            60 seconds · No account · Free forever
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {data.commonVisas.slice(0, 2).map((visa) => (
              <Link
                key={visa}
                href={`/onboarding?visa=${visa}`}
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
              >
                {VISA_LABELS[visa] ?? visa} →
              </Link>
            ))}
          </div>
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
