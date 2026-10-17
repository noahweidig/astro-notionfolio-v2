/**
 * The one file to edit to make this site yours.
 *
 * Everything personal lives here: name, contact details, links, homepage and
 * about-page copy, FAQ, skills, affiliations, SEO metadata and third-party IDs.
 * Pages, components, scripts and workflows read from this file; nothing else
 * hardcodes a name, email or URL.
 *
 * The long-form items (projects, publications, experience, education, awards,
 * blog posts) are Markdown files under `src/content/<collection>/<slug>/index.md`.
 * Images you swap by replacing the file in place; see "Images" in the README.
 *
 * Keep this file plain data (no imports other than types): Node scripts and
 * `astro.config.mjs` import it directly.
 */

export const config = {
  // ── Identity ────────────────────────────────────────────────────────────
  person: {
    /** Shown in the header wordmark: `first` in the tag, `last` in plain ink. */
    firstName: 'John',
    lastName: 'Smith',
    /** Job title shown under the name, in the <title> and in structured data. */
    role: 'Professional Title',
    /** Used for the footer copyright and meta author. */
    legalName: 'John Smith',
    /** Short name for the PWA manifest. */
    shortName: 'js',
    /** One or two sentences. Default meta description for every page. */
    description:
      'John is a professional with a passion for lorem ipsum dolor sit amet, consectetur adipiscing elit, and sed do eiusmod tempor.',
    /** Bio line for the résumé PDF. */
    resumeSummary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },

  // ── Site ────────────────────────────────────────────────────────────────
  site: {
    /**
     * Production origin, no trailing slash. `npm run sync` (run automatically
     * before dev and build) propagates it to robots.txt, the manifest and the
     * redirect pages.
     */
    url: 'https://example.com',
    /** true if the site is served from your own domain (writes `public/CNAME`). */
    customDomain: false,
    /** Default social share card. Replace the file or point this elsewhere. */
    ogImage: '/media/authors/site-og.webp',
    /** Portrait on the about page and next to blog bylines. */
    portrait: '/media/authors/me.webp',
    /** Google Analytics 4 measurement ID. Leave '' to disable analytics. */
    analyticsId: '',
    /** Google Search Console verification token. Leave '' to omit the tag. */
    googleSiteVerification: '',
    /** Blog tagline, used in the RSS feed. */
    blogDescription: 'Notes on lorem ipsum, dolor sit amet, and consectetur.',
    /** Date shown on the legal pages. */
    legalUpdated: '1 January 2026',
  },

  // ── Contact ─────────────────────────────────────────────────────────────
  contact: {
    email: 'john.smith@example.com',
    /** Plain-text location used in cards, résumé and CV. */
    location: 'Springfield, USA',
    /** Map on the about page. Longitude first, as in GeoJSON. */
    map: { label: 'Springfield, USA', lng: -89.6501, lat: 39.7817 },
    /** Calendar link. `label` is the visible text. Leave `url` '' to hide it. */
    booking: { url: 'https://cal.com/johnsmith/meet', label: 'cal.com/johnsmith' },
    /** Formspree form URL for the contact form (https://formspree.io). */
    formEndpoint: 'https://formspree.io/f/your-form-id',
    /** Promise shown on the contact page. */
    replyTime: 'within 24 hours',
    /** What the contact page says you are open to. */
    openTo: 'Lorem ipsum roles, collaborations',
  },

  /** Substack newsletter. Leave `url` '' to remove the footer form and nav link. */
  newsletter: { url: 'https://johnsmith.substack.com' },

  /** PDFs served from `public/uploads/`; regenerate with `npm run pdfs`. */
  documents: { resume: '/uploads/resume.pdf', cv: '/uploads/cv.pdf' },

  /** The site's GitHub repo, used by comments, the blog editor and the AI page. */
  github: { owner: 'johnsmith', repo: 'johnsmith.github.io' },

  /**
   * Giscus blog comments. Comments stay off until both ids are filled in.
   * Get them at https://giscus.app after enabling Discussions on the repo.
   */
  giscus: { repoId: '', category: 'Announcements', categoryId: '' },

  /**
   * /blog/write/ editor: a GitHub OAuth app client ID plus the URL of the
   * Cloudflare worker in `worker/` that exchanges the code. Leave both '' to
   * leave the editor inert.
   */
  blogWrite: { clientId: '', workerUrl: '' },

  /** Links shown in the hero, footer, CV and JSON-LD. `icon` is a brand-icon name. */
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/johnsmith/', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/johnsmith/', icon: 'github' },
    {
      label: 'Google Scholar',
      href: 'https://scholar.google.com/citations?user=XXXXXXXXXXXX',
      icon: 'scholar',
    },
    { label: 'ORCID', href: 'https://orcid.org/0000-0000-0000-0000', icon: 'orcid' },
    {
      label: 'ResearchGate',
      href: 'https://www.researchgate.net/profile/John-Smith',
      icon: 'researchgate',
    },
  ],

  /** Zotero "My Publications" user ID, for `npm run` publication sync (scripts/update-pubs.js). */
  zoteroUserId: '',

  /** Used to spot your own name in publication author lists (bold + "first-author" count). */
  authorMatch: { family: 'Smith', givenPrefix: 'john' },

  // ── Structured data (SEO) ───────────────────────────────────────────────
  seo: {
    alumniOf: [
      { name: 'Lorem Ipsum University', url: 'https://example.edu/' },
      { name: 'Dolor Sit College', url: 'https://example.org/' },
    ],
    knowsAbout: ['Lorem Ipsum', 'Dolor Sit Amet', 'Consectetur', 'Adipiscing Elit'],
  },

  // ── Navigation ──────────────────────────────────────────────────────────
  nav: [
    { text: 'About', href: '/about/', tip: 'A bit more about who I am' },
    { text: 'Projects', href: '/projects/', tip: 'Tools, sites and applications' },
    { text: 'Publications', href: '/publications/', tip: 'Papers, talks and peer review' },
    { text: 'Experience', href: '/experience/', tip: 'Roles and internships' },
    { text: 'Awards', href: '/awards/', tip: 'Fellowships, scholarships and honors' },
    { text: 'Blog', href: '/blog/', tip: 'Notes and tutorials' },
    { text: 'CV', href: '/cv/', tip: 'Full record, plus CV and résumé PDFs' },
    { text: 'Contact', href: '/contact/', tip: 'Email, booking and the contact form' },
  ],

  // ── Homepage ────────────────────────────────────────────────────────────
  home: {
    hero: {
      /** First line of the headline. Keep it under about 18 characters so it fits on one line. */
      line: 'Lorem ipsum dolor.',
      /** Second line is "{prefix} {word}." with the word rolling through `words`. */
      prefix: 'Real',
      words: ['insights', 'answers', 'impact', 'clarity', 'action'],
      lede: 'I turn lorem ipsum, dolor sit amet, and messy consectetur data into things people can actually decide something with.',
    },

    /** Four stat cards under the hero. Publication and project counts are computed. */
    stats: {
      years: {
        value: '8+',
        label: 'Years Experience',
        body: 'Lorem ipsum roles across universities, a federal agency, and local government.',
      },
      tools: {
        value: '20+',
        label: 'Tools Mastered',
        body: 'Mostly Lorem and Ipsum for analysis, dolor for wrangling, and sit amet tooling for the rest.',
      },
    },

    /** The "Worked with" logo strip. `logo` is an SVG in `public/media/icons/custom/`. */
    affiliations: [
      { name: 'Lorem Ipsum University', href: 'https://example.edu/', logo: 'org-1' },
      { name: 'Dolor Sit Institute', href: 'https://example.org/', logo: 'org-2' },
      { name: 'Amet Consectetur Agency', href: 'https://example.gov/', logo: 'org-3' },
      { name: 'Adipiscing College', href: 'https://example.edu/', logo: 'org-4' },
      { name: 'Eiusmod State University', href: 'https://example.edu/', logo: 'org-5' },
      { name: 'Tempor Foundation', href: 'https://example.org/', logo: 'org-6' },
    ],

    /** Three "ways in" cards. */
    starts: {
      research: {
        title: 'Research',
        body: 'Six focus areas, from lorem ipsum to dolor sit amet, with the papers behind each.',
        cta: 'Read the research',
      },
      tools: {
        title: 'Tools & apps',
        body: 'Open tools: a lorem package, ipsum dashboards, interactive galleries.',
        cta: 'Browse the work',
      },
      writing: {
        title: 'Writing',
        body: 'Tutorials and notes on lorem, ipsum, and doing dolor sit amet in the open.',
        cta: 'Read the blog',
      },
    },

    /**
     * Research-area tabs. `image` is a project slug (its screenshot in
     * `src/assets/albums/projects/<slug>.webp` is reused here).
     */
    areas: [
      {
        id: 'area-one',
        tab: 'Lorem Ipsum',
        icon: 'satellite',
        eyebrow: 'Lorem Ipsum & Dolor Sit',
        heading: 'Lorem ipsum dolor sit.',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        chips: ['Lorem Ipsum', 'Dolor Sit', 'Amet Elit'],
        image: 'alpha',
        alt: 'Placeholder screenshot for Project Alpha',
        caption: 'Project Alpha · lorem ipsum',
      },
      {
        id: 'area-two',
        tab: 'Dolor Sit',
        icon: 'layers',
        eyebrow: 'Dolor Sit & Consectetur',
        heading: 'Ut enim ad minim veniam.',
        body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        chips: ['Dolor Sit', 'Consectetur', 'Adipiscing'],
        image: 'bravo',
        alt: 'Placeholder screenshot for Project Bravo',
        caption: 'Project Bravo · dolor sit',
      },
      {
        id: 'area-three',
        tab: 'Amet Elit',
        icon: 'chart',
        eyebrow: 'Amet Elit & Statistics',
        heading: 'Duis aute irure dolor.',
        body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        chips: ['Amet Elit', 'Tempor', 'Incididunt'],
        image: 'charlie',
        alt: 'Placeholder screenshot for Project Charlie',
        caption: 'Project Charlie · amet elit',
      },
      {
        id: 'area-four',
        tab: 'Tempor',
        icon: 'ai',
        eyebrow: 'Tempor & Incididunt',
        heading: 'Excepteur sint occaecat.',
        body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        chips: ['Tempor', 'Incididunt', 'Labore'],
        image: 'delta',
        alt: 'Placeholder screenshot for Project Delta',
        caption: 'Project Delta · tempor',
      },
      {
        id: 'area-five',
        tab: 'Labore',
        icon: 'leaf',
        eyebrow: 'Labore & Dolore',
        heading: 'Sed ut perspiciatis unde.',
        body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        chips: ['Labore', 'Dolore', 'Magna'],
        image: 'echo',
        alt: 'Placeholder screenshot for Project Echo',
        caption: 'Project Echo · labore',
      },
      {
        id: 'area-six',
        tab: 'Magna Aliqua',
        icon: 'database',
        eyebrow: 'Magna Aliqua & Engineering',
        heading: 'Nemo enim ipsam voluptatem.',
        body: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
        chips: ['Magna', 'Aliqua', 'Engineering'],
        image: 'foxtrot',
        alt: 'Placeholder screenshot for Project Foxtrot',
        caption: 'Project Foxtrot · magna aliqua',
      },
    ],

    /** Call-to-action block near the bottom. */
    cta: {
      kicker: 'Open to lorem ipsum roles',
      title: "Let's talk about problems worth solving.",
      /** Plain text; wrap the words in **double asterisks** to bold them. */
      lede: 'Looking for **lorem ipsum** and **dolor sit** roles where rigorous work drives real decisions.',
    },

    faq: [
      {
        q: 'What do you do?',
        a: 'I work at the intersection of lorem ipsum, dolor sit amet, and consectetur, building reproducible workflows that turn raw data into decision-ready insights.',
      },
      {
        q: 'What kinds of projects are you interested in?',
        a: "I'm drawn to work involving lorem ipsum, dolor sit amet, and consectetur adipiscing. I especially enjoy projects where rigorous analysis meets clear visual communication.",
      },
      {
        q: 'Are you open to collaboration?',
        a: "Yes. I'm happy to discuss collaborations, freelance work, and full-time opportunities. The best way to start a conversation is through the contact page.",
        link: { href: '/contact/', text: 'contact page' },
      },
      {
        q: 'What tools do you typically work with?',
        a: 'Mostly Lorem and Ipsum for analysis, alongside Dolor for wrangling and a range of Sit Amet tools for everything else. See the tech stack section for the full toolkit.',
      },
      {
        q: 'How can I get in touch?',
        a: "Email is the easiest. You'll find it on the contact page.",
        link: { href: '/contact/', text: 'contact page' },
      },
    ],
  },

  // ── Contact page ────────────────────────────────────────────────────────
  contactPage: {
    heading: 'Start a conversation',
    body: 'I work on lorem ipsum, dolor sit amet and the tools that put a result in front of someone who has to decide something. If you are hiring, planning a collaboration, or stuck on a problem, tell me what you are working on and I will reply promptly.',
  },

  // ── About page ──────────────────────────────────────────────────────────
  about: {
    title: "Hi, I'm John.",
    intro:
      "By day I turn lorem ipsum into decisions. Outside of that, I'm still mostly outdoors, just without the laptop.",
    /** The "at a glance" card. "Currently" is filled from your most recent experience entry. */
    glance: [
      { icon: 'flame', label: 'Focus', value: 'Lorem ipsum dolor sit amet' },
      {
        icon: 'school',
        label: 'Education',
        value: 'M.S. Lorem Ipsum, Lorem Ipsum University',
      },
    ],
    storyTitle: 'How I got here',
    story: [
      'I grew up more interested in the woods behind my house than anything on a screen, which is a strange starting point for someone who now spends most days in front of one.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    ],
    beyondWork: [
      {
        icon: 'earth',
        tint: 'green',
        title: 'Outside',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      },
      {
        icon: 'flame',
        tint: 'yellow',
        title: 'Coffee & cooking',
        body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
      },
      {
        icon: 'video',
        tint: 'purple',
        title: 'Photography',
        body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      },
      {
        icon: 'book',
        tint: 'red',
        title: 'Always reading',
        body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
      },
    ],
    mapTitle: "Where I'm based",
    quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit."',
  },

  // ── Skills (CV, résumé) ─────────────────────────────────────────────────
  skills: [
    ['Languages', 'Lorem, Ipsum, Dolor, Sit'],
    ['Markup', 'Markdown, LaTeX, HTML, CSS'],
    ['Libraries', 'Amet, Consectetur, Adipiscing, Elit'],
    ['Platforms', 'Sed, Do, Eiusmod, Tempor, Incididunt'],
    ['Workflows', 'Git, GitHub, GitHub Actions, Conda'],
  ],

  // ── 404 / 500 helper copy, keyed by nav item ────────────────────────────
  errorPageBlurbs: {
    Projects: 'Tools, sites and applications.',
    Publications: 'Papers, talks and peer review.',
    Experience: 'Roles and internships.',
    Blog: 'Notes and tutorials.',
    Contact: 'Email, book a call, or send a message.',
  } as Record<string, string>,
};

export type SiteConfig = typeof config;
