export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Project {
  id: number;
  name: string;
  role: string;
  description: string;
  techStack: string[];
  link: string | null;
  year: string;
  images: string[];
  bg: string;
  // Modal fields
  client: string;
  category: string;
  techType: string;
  fullDescription: string;
  highlights: string[];
}

export interface Skills {
  technical: string[];
  designProduct: string[];
}

export interface PortfolioData {
  personal: PersonalInfo;
  projects: Project[];
  skills: Skills;
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Ollie Francis",
    title: "Senior Product Engineer",
    tagline: "Co-founded TRAX, scaling it to 1,250 artists, 50,000 fans across 75 countries. Bringing the same product instincts to your team.",
    bio: "I'm a product-focused front-end engineer with a strong eye for design and a deep appreciation for detail, motion, and performance. I enjoy building interfaces that feel calm, intuitive, and refined, and I care as much about how something feels as how it functions. My work sits at the intersection of design, engineering, and product thinking.",
    email: "olliefrancis97@hotmail.co.uk",
    linkedin: "https://www.linkedin.com/in/ollie--francis/",
    github: "https://github.com/olfrank"
  },

  projects: [
    {
      id: 2,
      name: "TRAX",
      role: "Co-Founder & CTO",
      description: "Co-founded and led engineering for a venture backed direct-to-fan music platform. Architected the full front-end across web and iOS, managed a team of 3 engineers, and shipped the product to 50,000+ fans across 75 countries.",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Capacitor", "Node.js"],
      link: null,
      year: "2022–2026",
      images: [
        "/static/trax/trax-home.png",
        "/static/trax/trax-home-2.png",
        "/static/trax/trax-music.png",
        "/static/trax/trax-search.png",
        "/static/trax/trax-unlock.png",
        "/static/trax/trax-upload.png",
        "/static/trax/trax-upload-2.png",
        "/static/trax/trax-wallet.png",
      ],
      bg: "#000000",
      client: "TRAX (Venture-Backed)",
      category: "D2F Music Platform",
      techType: "Web & iOS Engineering",
      fullDescription: "TRAX is a direct-to-fan music platform built to give artists true ownership of how their music is distributed, experienced, and monetised, without the gatekeeping of traditional streaming services. As Co-Founder and CTO, I owned the entire front-end codebase across web and native iOS while managing a team of three engineers through the full product lifecycle. ",
      highlights: [
        "Led engineering across the full stack and iOS from pre seed through to venture backed growth",
        "Managed and mentored a team of three engineers across frontend and backend through the full product lifecycle",
        "Rebuilt the iOS audio streaming architecture from a custom resource loader to a native AVPlayer pipeline, eliminating instability bugs and significantly reducing playback startup time",
        "Built a decentralised canister storage system on ICP with dynamic canister creation, chunked uploads, and artist owned content infrastructure",
        "Designed and shipped a royalty sharing canister handling pay-per-access payments, block index verification, and automatic collaborator splits on chain",
        "Native iOS app delivered via Capacitor from a shared codebase, with platform parity across web and mobile",
        "Shipped to 50,000 fans across 75 countries with 1,250 artists onboarded including Grammy nominee GoldLink, and UK rising rap stars like Jimothy Lacoste and Blanco",
      ],
    },
    {
      id: 4,
      name: "TRAX Admin Panel",
      role: "Lead Developer",
      description: "Built a full featured admin dashboard for managing artists, content, users, subscriptions, and platform wide analytics. Includes role based access, real time revenue tracking, and batch content management.",
      techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST API"],
      link: null,
      year: "2023–2026",
      images: [
        "/static/admin-panel/admin-analytics.png",
        "/static/admin-panel/admin-artists.png",
      ],
      bg: "#0a0c12",
      client: "TRAX (Internal)",
      category: "Internal Tool",
      techType: "Full-Stack Development",
      fullDescription: "The TRAX admin panel is the internal platform the TRAX team used to manage every layer of the business - artists, content, users, subscriptions, and platform wide financials - from a single dashboard. Built and maintained as a project alongside the main platform, it was designed to reduce operational overhead and give the team full visibility over platform health without needing to touch the database directly.\n\n The dashboard includes role based access control, real time revenue tracking across subscription tiers, and batch content management tools for handling music releases and user accounts at scale. Built in React and TypeScript with a MongoDB backend and REST API, hosted on AWS alongside the main platform.",
      highlights: [
        "Role based access control with distinct admin and support level permissions",
        "Real time revenue tracking and subscription analytics giving the team live visibility over platform financials",
        "Built a canister smart contract monitoring system and an automatic cycle replenishment layer to maintain uptime of web3 features and systems",
        "Batch content management tools for music releases, artist accounts, and platform wide data operations",
        "Shared MongoDB backend and REST API with the main platform, keeping infrastructure lean and consistent",
        "Platform wide data analytics and insights to monitor growth and inform marketing and development decisions",
      ],
    },
    {
      id: 5,
      name: "LINX",
      role: "Solo Developer",
      description: "A customisable link-in-bio tool built as an independent project, later integrated into the TRAX platform to give artists a branded, mobile first landing page.",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      link: null,
      year: "2024–2025",
      images: [
        "/static/link-in-bio/lib-page.png",
        "/static/link-in-bio/lib-edit.png",
        "/static/link-in-bio/lib-scroll.png",
      ],
      bg: "#0a0c12",
      client: "Personal Project",
      category: "Consumer Product",
      techType: "Full-Stack Development",
      fullDescription: "Linx is a customisable link-in-bio product I designed and built independently before integrating it into the TRAX platform. The idea came from watching artists struggle to consolidate their online presence across streaming platforms, socials, and release content - Linx gives them a premium single branded landing page that pulls it all together. \n\nBuilt end-to-end in Next.js with a Tailwind CSS design system, the product was designed mobile first with a focus on performance and smooth micro interactions throughout. After proving the concept as a standalone project, Linx was integrated into TRAX and rolled out to the full artist base, giving every artist a fully customisable page with colour themes, background imagery, and linking into their TRAX releases and DSP content.",
      highlights: [
        "Conceived, designed, and built independently as a standalone product before being adopted into the TRAX platform",
        "Rolled out to 1,250 artists as part of the TRAX platform integration",
        "Deep linking layer connecting artist pages directly to TRAX releases, streaming content, and social profiles",
        "Fully customisable pages with branded colour themes, background imagery, and layout controls",
        "Mobile first design with smooth animations and micro interactions built in Next.js and Tailwind CSS",
      ],
    },
    {
      id: 1,
      name: "CallGuard",
      role: "Solo Developer",
      description: "Designed, built, and deployed a full-stack SaaS platform that automates missed call handling for UK tradespeople, from system architecture through to production release.",
      techStack: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "REST API"],
      link: null,
      year: "2026",
      images: [
        "/static/callguard/callguard-home.png",
        "/static/callguard/callguard-demo.png",
        "/static/callguard/callguard-self-onboarding.png",
      ],
      bg: "#10121b",
      client: "Solo Project",
      category: "SaaS Product",
      techType: "Full-Stack Development",
      fullDescription: "CallGuard automates missed call handling for UK tradespeople. When a call goes unanswered, the platform fires an SMS triage message, captures the customer's job details in reply, runs AI classification to extract urgency, job type, and location, and delivers a clean structured alert to the tradesperson on WhatsApp. The entire product was designed, architected, built, and launched solo. \n\nThe backend runs on Node.js and Express, using Twilio webhooks as the entry point for call events and inbound SMS. Rather than processing everything synchronously in the webhook path, the system uses background workers that poll Postgres for pending jobs, lock rows, and process them independently. This keeps the webhook handlers fast and makes the system reliable and idempotent even when Twilio retries or messages arrive in bursts. Postgres acts as both the operational data store and a lightweight queue, tracking every stage of the missed call recovery workflow.",
      highlights: [
        "Designed, architected, and shipped end-to-end as a solo developer, from first line of code through to production",
        "Background worker architecture using Postgres row locking to handle Twilio webhook retries reliably without duplicate processing",
        "AI classification layer that extracts urgency, job type, postcode, and spam detection from raw customer SMS replies before alert dispatch",
        "WhatsApp first alert delivery with SMS fallback, matching how tradespeople actually communicate day to day",
        "Weekly ROI reporting pipeline querying Postgres and delivering structured performance summaries per customer",
        "Multi tenant PostgreSQL schema with isolated business accounts, call logs, message threading, and opt out management"
      ],
    },
    {
      id: 3,
      name: "Nous",
      role: "Web3 Developer",
      description: "Decentralised hedge fund offering fixed and variable rate investment contracts powered by algorithmic trading.",
      techStack: ["Next.js", "React", "TypeScript", "Solidity", "Tailwind CSS", "Framer Motion"],
      link: null,
      year: "2021–2022",
      images: [
        "/static/nous/nous-home.png",
        "/static/nous/nous-invest.png",
        "/static/nous/nous-invest-2.png",
      ],
      bg: "#0d0f18",
      client: "Nous Protocol",
      category: "Web3 Platform",
      techType: "Web3 Development",
      fullDescription: "Nous is a decentralised hedge fund protocol offering investors fixed and variable rate returns, with yields generated by an underlying algorithmic trading system running arbitrage and market making strategies. I joined as a frontend Web3 developer and was responsible for the trading dashboard and all wallet and contract integration work.\n\nThe frontend was built in Next.js and TypeScript, surfacing real-time position data, portfolio performance, and yield metrics with Framer Motion transitions throughout. Wallet connection and transaction flows were handled via ethers.js with Metamask and TrustWallet integration, allowing users to enter investment vaults, sign transactions, and track their positions directly from the browser. I also wrote ethers.js test scripts for the Solidity smart contracts to verify contract behaviour before deployment. The project was showcased at the Polygon Hackathon.",
      highlights: [
        "Built the full frontend trading dashboard in Next.js and TypeScript with real time on chain data feeds",
        "Wallet connection and transaction signing via ethers.js and Metamask, covering the full investment flow from vault entry to position tracking",
        "Wrote ethers.js test scripts to verify Solidity smart contract behaviour prior to Polygon deployment",
        "Variable rate yield mechanism tied directly to live algorithmic trading performance",
        "Framer Motion used throughout for fluid state transitions and data visualisation",
        "Showcased at the Polygon Hackathon"
      ],
    },
  ],

  skills: {
    technical: [
      "React",
      "Next.js",
      "TypeScript",
      "Modern CSS",
      "Tailwind CSS",
      "Framer Motion",
      "Component Architecture",
      "Performance Optimisation",
      "Responsive Design",
      "Accessibility"
    ],
    designProduct: [
      "UI/UX Design",
      "Motion Design",
      "Micro interactions",
      "Design to Code Translation",
      "Product Thinking",
      "Design Systems",
      "Apple inspired Interfaces"
    ]
  }
};
