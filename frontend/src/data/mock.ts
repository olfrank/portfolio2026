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
    title: "Product-focused Front-End Engineer",
    tagline: "Design-led engineering for modern products.",
    bio: "I'm a product-focused front-end engineer with a strong eye for design and a deep appreciation for detail, motion, and performance. I enjoy building interfaces that feel calm, intuitive, and refined, and I care as much about how something feels as how it functions. My work sits at the intersection of design, engineering, and product thinking.",
    email: "olliefrancis97@hotmail.co.uk",
    linkedin: "https://www.linkedin.com/in/ollie--francis/",
    github: "https://github.com/olfrank"
  },

  projects: [
    // ── Row 1: Featured ────────────────────────────────────────────────────────
    {
      id: 2,
      name: "TRAX",
      role: "Co-Founder & CTO",
      description: "Co-founded and led engineering for a venture-backed direct-to-fan music platform. Architected the full front-end across web and iOS, managed a team of 3 engineers, and shipped the product to 50,000+ fans across 75 countries.",
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
      fullDescription: "TRAX is a direct-to-fan music platform built to give artists true ownership of how their music is distributed, experienced, and monetised — without the gatekeeping of traditional streaming services. As Co-Founder and CTO, I owned the entire front-end codebase across web and native iOS while managing a team of three engineers through the full product lifecycle.\n\nThe platform was built in Next.js and React, with Capacitor providing native iOS deployment from a shared codebase. Audio playback was engineered using the Web Audio API to support gapless transitions and visualisation. On-chain ownership of content was recorded via Motoko smart contracts on the Internet Computer Protocol (ICP), with the Node.js backend bridging web2 infrastructure and the decentralised layer.",
      highlights: [
        "Led engineering across web and iOS from pre-seed through to venture-backed growth",
        "Managed and mentored a team of three engineers across front-end and backend",
        "Built a custom audio engine using the Web Audio API for gapless playback and waveform visualisation",
        "Native iOS app delivered via Capacitor from a shared Next.js codebase",
        "ICP blockchain integration via Motoko for on-chain content ownership",
        "Designed and implemented the full component architecture and design system",
        "Shipped to 50,000+ fans across 75 countries",
      ],
    },
    // ── Row 2: TRAX sub-products ───────────────────────────────────────────────
    {
      id: 4,
      name: "TRAX Admin Panel",
      role: "Lead Developer",
      description: "Built a full-featured admin dashboard for managing artists, content, users, subscriptions, and platform-wide analytics. Includes role-based access, real-time revenue tracking, and batch content management.",
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
      fullDescription: "TRAX Studio is the internal administration platform powering the entire TRAX music ecosystem. Built as a single-page dashboard for use by the TRAX team, it provides comprehensive tools for managing artists, content, users, subscriptions, and platform-wide analytics in one place.\n\nThe dashboard features role-based access control, real-time revenue tracking, and batch content management tools — reducing operational overhead and giving the team full visibility over platform health. Built in React and TypeScript with a PostgreSQL backend and REST API.",
      highlights: [
        "Full-featured admin dashboard for managing artists, content, users, and subscriptions",
        "Role-based access control with distinct admin and support-level permissions",
        "Real-time revenue tracking and platform-wide analytics dashboards",
        "Batch content management for music releases, user accounts, and platform data",
        "PostgreSQL backend with REST API, served on the same infrastructure as the main platform",
      ],
    },
    {
      id: 5,
      name: "LINX",
      role: "Solo Developer",
      description: "A customisable link-in-bio tool built as an independent project, later integrated into the TRAX platform to give artists a branded, mobile-first landing page.",
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
      fullDescription: "Linx is a customisable link-in-bio product designed and built as an independent project. It enables musicians to consolidate their entire online presence — streaming links, social profiles, and release content — on a single branded, mobile-first page.\n\nAfter proving the concept independently, Linx was integrated into the TRAX platform, giving every artist on the platform a fully customisable landing page with colour themes, background imagery, and automatic deep-linking to their TRAX content.\n\nBuilt end-to-end in Next.js with a Tailwind CSS design system, with a focus on performance, mobile responsiveness, and smooth micro-interactions throughout.",
      highlights: [
        "Built independently as a personal project, then adopted into the TRAX platform",
        "Fully customisable artist pages with branded colour themes and background imagery",
        "Mobile-first responsive design with smooth animations and micro-interactions",
        "Deep integration layer connecting artist pages to TRAX releases and streaming content",
        "Designed and developed solo in Next.js, TypeScript, and Tailwind CSS",
      ],
    },
    // ── Row 3: Other projects ──────────────────────────────────────────────────
    {
      id: 1,
      name: "CallGuard",
      role: "Solo Developer",
      description: "Designed, built, and deployed a full-stack SaaS platform that automates missed-call handling for UK tradespeople — from system architecture through to production release.",
      techStack: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "REST API"],
      link: null,
      year: "2026",
      images: [
        "/static/callguard/callguard-home.png",
      ],
      bg: "#10121b",
      client: "Solo Project",
      category: "SaaS Product",
      techType: "Full-Stack Development",
      fullDescription: "CallGuard automates missed-call handling for UK tradespeople — whenever a call goes unanswered, the platform instantly fires an SMS reply with a personalised message and booking link. The product was designed, architected, built, and launched entirely solo, from the first line of code through to production deployment.\n\nThe backend runs on Node.js and Express with a PostgreSQL database, integrating Twilio webhooks to intercept missed calls and trigger automated responses. The front-end dashboard — built in React and TypeScript — gives business owners full visibility over call activity, control over their auto-reply sequences, and simple customisation without any technical knowledge required.",
      highlights: [
        "Designed, built, and shipped end-to-end as a solo founder",
        "Twilio integration for real-time missed-call detection and automated SMS dispatch",
        "Multi-tenant PostgreSQL schema supporting isolated business accounts",
        "Stripe billing integration with usage-based subscription tiers",
        "Deployed to production on Render with zero-downtime release pipeline",
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
      fullDescription: "Nous is a decentralised hedge fund protocol that offers investors fixed and variable rate returns, with yields generated by an underlying algorithmic trading system. The project spanned both smart contract development and the front-end trading dashboard, requiring tight coordination between on-chain logic and the user-facing interface.\n\nSolidity contracts govern the investment vaults — users can enter a fixed-rate product with predictable returns, or opt into a variable-rate vault where yield tracks live trading performance. The front-end, built in Next.js and TypeScript, surfaces real-time position data and portfolio metrics with smooth Framer Motion transitions throughout.",
      highlights: [
        "Solidity smart contracts for fixed and variable rate investment vaults on EVM networks",
        "Front-end trading dashboard built in Next.js with real-time on-chain data feeds",
        "Variable-rate yield mechanism tied directly to algorithmic trading performance",
        "Wallet connection and transaction flows via ethers.js",
        "Framer Motion used throughout for fluid state transitions and data visualisation",
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
      "Micro-interactions",
      "Design-to-Code Translation",
      "Product Thinking",
      "Design Systems",
      "Apple-inspired Interfaces"
    ]
  }
};
