/**
 * projects.js — single source of truth for all project data.
 * Verbatim copy from the build brief §6 and §7.
 */

export const projectData = {
  authorBookstore: {
    slug: 'author-bookstore',
    num: '01',
    caseStudyEyebrow: 'Case study · 01 of 04',
    title: 'The Author Bookstore & Blog',
    tagline: 'A mobile-first website where a Nigerian author sells his books and publishes on his own.',
    shortDesc: 'A mobile-first site where a Nigerian author sells his books and publishes on his own.',
    stages: ['idea', 'decisions', 'build', 'status'],
    currentStage: 'status',
    statusText: 'Live, in use by the client',
    fullStatus: 'Live, in real use by the client.',
    liveLink: 'https://livinglogoshub.vercel.app',
    liveLinkPlaceholder: '[PLACEHOLDER: https://livinglogoshub.vercel.app]',
    liveLinkLabel: 'Visit the live site',
    authorNamePlaceholder: '[PLACEHOLDER: author\'s name, used with his permission]',
    route: '/work/author-bookstore',
    nextProject: {
      title: 'OneTax Marketing & Content Pipeline',
      route: '/work/onetax-pipeline',
    },
    desktopCover: '/images/author-bookstore/desktop-1.webp',
    sections: {
      problem:
        'The author writes Bible-based books for both adults and children. He needed one place to sell his books and publish articles, and most of his readers would visit on their phones.',
      decisions: [
        {
          num: '01',
          heading: 'Mobile-first, as a hard rule.',
          body: 'Every page was designed for the phone first and scaled up after.',
        },
        {
          num: '02',
          heading: 'One design, two audiences.',
          body: 'A warm, rounded look in cream, burnt orange, and deep brown, built to feel right for both children\'s and adult readers without splitting into two sites.',
        },
        {
          num: '03',
          heading: 'A simple payment flow.',
          body: 'Customers pay by bank transfer and the site sends the notifications automatically, instead of using a payment processor. This kept the first version simple and fully under the client\'s control.',
        },
        {
          num: '04',
          heading: 'A blog the author runs himself.',
          body: 'The site is connected to a blog system so he can publish without needing me.',
        },
        {
          num: '05',
          heading: 'Motion with purpose.',
          body: 'Smooth scroll animations and page transitions throughout, so the site feels polished on a phone.',
        },
      ],
      buildHeading: 'How I built it',
      buildIntro:
        'I wrote the product requirements and a detailed build brief, then directed AI agents to build the site in HTML, CSS, and JavaScript. I reviewed the results and steered them, including the serverless functions on Vercel that send payment notifications and deliver books by email.',
      features: [
        {
          num: '01',
          title: 'Mobile-first bookstore',
          desc: 'Customers can browse and buy books with seamless bank transfer notifications on any device.',
          image: '/images/author-bookstore/mobile-1.webp',
        },
        {
          num: '02',
          title: 'Author-managed blog',
          desc: 'Connected to a clean publishing system so the author can write and publish articles independently.',
          image: '/images/author-bookstore/mobile-2.webp',
        },
        {
          num: '03',
          title: 'Automated order delivery',
          desc: 'Serverless functions on Vercel handle payment verification alerts and automatic book delivery by email.',
          image: '/images/author-bookstore/mobile-3.webp',
        },
      ],
      resultHeading: 'The result',
      result: 'The author has published 8 articles on his own, with no developer involved.',
    },
  },

  onetaxPipeline: {
    slug: 'onetax-pipeline',
    num: '02',
    caseStudyEyebrow: 'Case study · 02 of 04',
    title: 'OneTax Marketing & Content Pipeline',
    tagline: 'An AI-powered workflow that researches, writes, and displays marketing content for a tax firm\'s team.',
    shortDesc: 'An AI-powered workflow that researches, writes, and displays marketing content for a tax firm\'s team.',
    stages: ['idea', 'decisions', 'build'],
    currentStage: 'build',
    statusText: 'Live, in use by the OneTax team',
    fullStatus: 'Live, in use by the OneTax team.',
    roleLabel: 'Software Engineering Intern, OneTax NG, May 2026 to present.',
    liveLink: null,
    route: '/work/onetax-pipeline',
    nextProject: {
      title: 'Cashpod',
      route: '/work/cashpod',
    },
    desktopCover: null, // Flow visual used as card and cover
    sections: {
      problem:
        'The marketing team at a B2B tax and compliance firm needed research and content produced faster, plus one place to track leads and see everything.',
      decisions: [
        {
          num: '01',
          heading: 'Design the data first.',
          body: 'I shaped the JSON files to match the interface, so uploaded work appears instantly with no manual formatting and the dashboard stays fast as new content types are added.',
        },
        {
          num: '02',
          heading: 'Split the AI work into two focused skills,',
          body: 'one for research and one for content, instead of one big prompt.',
        },
        {
          num: '03',
          heading: 'Plan before building.',
          body: 'I scoped four pages (Dashboard, Reports, Content & Analytics, and Settings) and the full data model up front.',
        },
        {
          num: '04',
          heading: 'Keep it simple.',
          body: 'Plain HTML, CSS, and JavaScript, so it\'s lightweight and easy to maintain.',
        },
      ],
      next: 'Connecting AI agents directly into the dashboard to update content and report marketing performance live.',
    },
  },

  cashpod: {
    slug: 'cashpod',
    num: '03',
    caseStudyEyebrow: 'Case study · 03 of 04',
    title: 'Cashpod',
    tagline: 'A personal finance app that helps you decide where money goes before it lands.',
    shortDesc: 'A personal finance app that helps you decide where money goes before it lands.',
    stages: ['idea', 'decisions', 'build'],
    currentStage: 'build',
    statusText: 'Live, in early testing',
    fullStatus: 'Live, in early testing with a small group of users.',
    liveLink: 'https://cashpod.vercel.app',
    liveLinkPlaceholder: '[PLACEHOLDER: https://cashpod.vercel.app]',
    liveLinkLabel: 'Visit the live site',
    route: '/work/cashpod',
    nextProject: {
      title: 'Peekytoe',
      route: '/work/peekytoe',
    },
    desktopCover: '/images/cashpod/desktop-1.webp',
    sections: {
      problem:
        'Most people only find out where their money went after it\'s gone. Cashpod flips that: you plan your money into "envelopes" first, so every naira or dollar already has a job.',
      decisions: [
        {
          num: '01',
          heading: 'Money doesn\'t always arrive on the 1st.',
          body: 'Choose a calendar month or a flexible cycle, so the app fits freelancers and irregular income.',
        },
        {
          num: '02',
          heading: 'Plan first, confirm later.',
          body: 'Allocate expected income to envelopes, then mark it as landed when it arrives.',
        },
        {
          num: '03',
          heading: 'Envelopes as the core idea,',
          body: 'carried through the whole app, its wording, and its taglines.',
        },
        {
          num: '04',
          heading: 'Not just for Nigerians.',
          body: 'Open to many currencies, not locked to the naira.',
        },
        {
          num: '05',
          heading: 'A name that had to be earned.',
          body: 'Keet was taken, so I tested alternatives with real people and settled on Cashpod.',
        },
        {
          num: '06',
          heading: 'One consistent brand,',
          body: 'with a product and voice guide and a design system behind the logo, banners, and copy.',
        },
      ],
      buildHeading: 'What it does',
      features: [
        {
          num: '01',
          title: 'Onboarding & cycle',
          desc: 'Set your pay cycle, choose your currency, and configure custom spending envelopes.',
          image: '/images/cashpod/mobile-1.webp',
        },
        {
          num: '02',
          title: 'Plan envelopes',
          desc: 'Allocate expected income before it lands so every naira or dollar already has a designated job.',
          image: '/images/cashpod/mobile-2.webp',
        },
        {
          num: '03',
          title: 'Real-time tracking',
          desc: 'Expenses adjust envelope balances instantly, with month-to-month comparison reports.',
          image: '/images/cashpod/mobile-3.webp',
        },
      ],
      builtWith: 'Next.js, TypeScript, React, Tailwind CSS, Supabase.',
      feedback: 'Testers say it will be important to their financial habits.',
      testerQuotePlaceholder:
        '[PLACEHOLDER: one short real quote from a tester, with permission. If none is supplied, keep the sentence above and add no quote.]',
      next: 'Refining the envelope budgeting algorithm and preparing for broader beta access.',
    },
  },

  peekytoe: {
    slug: 'peekytoe',
    num: '04',
    caseStudyEyebrow: 'Case study · 04 of 04',
    title: 'Peekytoe',
    tagline: 'A place where founders meet investors, and learn to pitch properly.',
    shortDesc: 'A place where founders meet investors, and learn to pitch properly.',
    stages: ['idea', 'decisions', 'build'],
    currentStage: 'build',
    statusText: 'Live, in development',
    fullStatus: 'Live, in development, not yet launched publicly.',
    liveLink: 'https://peekytoeapp.vercel.app/',
    liveLinkPlaceholder: '[PLACEHOLDER: https://peekytoeapp.vercel.app/]',
    liveLinkLabel: 'Visit the live site',
    route: '/work/peekytoe',
    nextProject: {
      title: 'The Author Bookstore & Blog',
      route: '/work/author-bookstore',
    },
    desktopCover: '/images/peekytoe/desktop-1.webp',
    sections: {
      problem:
        'Founders often pitch badly or put up sloppy profiles, which wastes investors\' time. And getting a pitch in front of the right investor usually means covering a lot of distance.',
      decisions: [
        {
          num: '01',
          heading: 'Profile requirements are based on what investors actually look for,',
          body: 'so investors do not meet sloppy pitches.',
        },
        {
          num: '02',
          heading: 'The marketplace and the AI pitch practice room carry equal weight,',
          body: 'because finding investors and being ready for them go together.',
        },
        {
          num: '03',
          heading: 'I said no to AI-written profiles.',
          body: 'The point is for founders to learn to explain their own idea, and drafting it for them would defeat that. The AI reviews and coaches; the founder still does the thinking.',
        },
        {
          num: '04',
          heading: 'Free founders get 3 practice pitches.',
          body: 'Paid founders get unlimited practice, and those scores count toward verified status.',
        },
        {
          num: '05',
          heading: 'For the hackathon I focused on subscription revenue only,',
          body: 'and kept features like deal tracking and e-signatures for later.',
        },
      ],
      buildHeading: 'What I built',
      features: [
        {
          num: '01',
          title: 'Idea profile',
          desc: 'Founders create a profile for their startup, and AI reviews it against what investors actually look for in a solid idea, so weak spots get fixed before an investor sees them.',
          image: '/images/peekytoe/mobile-1.webp',
        },
        {
          num: '02',
          title: 'Pitch practice room',
          desc: 'A founder pitches by voice to three AI investors matched to their industry, then gets detailed feedback, including pacing and filler words.',
          image: '/images/peekytoe/mobile-2.webp',
        },
      ],
      next: 'Public launch.',
    },
  },
}

export const homeProjectOrder = [
  projectData.authorBookstore,
  projectData.onetaxPipeline,
  projectData.cashpod,
  projectData.peekytoe,
]
