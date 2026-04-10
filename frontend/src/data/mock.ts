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
  image: string | null;
  bg: string;
  screenshot: string;
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
    {
      id: 1,
      name: "CallGuard",
      role: "Solo Developer",
      description: "Designed, built, and deployed a full-stack SaaS platform that automates missed-call handling for UK tradespeople — from system architecture through to production release.",
      techStack: ["React", "TypeScript", "Node.js", "Express.js", "PostgresSQL", "REST API", "Render", "Twilio"],
      link: null,
      year: "2026",
      image: "/static/callguard-logo.png",
      screenshot:"/static/callguard-ss.png",
      client: "Solo Project",
      category: "SaaS Product",
      bg: "#10121b",
      techType: "Full-Stack Development",
      fullDescription: "CallGuard automates missed-call handling for UK tradespeople — whenever a call goes unanswered, the platform instantly fires an SMS reply with a personalised message and booking link. The product was designed, architected, built, and launched entirely solo, from the first line of code through to production development. \n\nThe backend runs on Node.js and Express with a PostgreSQL database, integrating Twilio webhooks to intercept missed calls and trigger automated responses. The front-end dashboard — built in React and TypeScript — gives business owners full visibility over call activity, control over their auto-reply sequences, and simple customisation without any technical knowledge required.",
      highlights: [
        "Designed, built, and shipped end-to-end as a solo founder",
        "Twilio integration for real-time missed-call detection and automated SMS dispatch",
        "Multi-tenant PostgreSQL schema supporting isolated business accounts",
        "Stripe billing integration with usage-based subscription tiers",
        "Deployed to production on Render with zero-downtime release pipeline",
        
      ],
    },
    {
      id: 2,
      name: "TRAX",
      role: "Co-Founder & CTO",
      description: "Co-founded and led engineering at a venture-backed direct-to-fan music platform. Managed a team of 3 engineers while personally owning front-end architecture and feature delivery across web and iOS.",
      techStack: ["Next.js", "React", "TypeScript", "Motoko", "Tailwind CSS", "Framer Motion", "Capacitor", "Node.js", "Web Audio APIs"],
      link: null,
      year: "2022–2026",
      image: "/static/trax-logo.png",
      screenshot:"/static/callguard-ss.png",
      client: "TRAX (Venture-Backed)",
      category: "Music Platform",
      techType: "Web & iOS Engineering",
      bg: "#000000",
      fullDescription: "TRAX is a direct-to-fan music platform built to give artists true ownership of how their music is distributed, experienced, and monetised — without the gatekeeping of traditional streaming services. As Co-Founder and CTO, I owned the entire front-end codebase across web and native iOS while managing a team of three engineers through the full product lifecycle.\n\nThe platform was built in Next.js and React, with Capacitor providing native iOS deployment from a shared codebase. Audio playback was engineered using the Web Audio API to support gapless transitions and visualisation. On-chain ownership of content was recorded via Motoko smart contracts on the Internet Computer Protocol (ICP), with the Node.js backend bridging web2 infrastructure and the decentralised layer.",
      highlights: [
        "Led engineering across web and iOS from pre-seed through to venture-backed growth",
        "Managed and mentored a team of three engineers across front-end and backend",
        "Built a custom audio engine using the Web Audio API for gapless playback and waveform visualisation",
        "Native iOS app delivered via Capacitor from a shared Next.js codebase",
        "ICP blockchain integration via Motoko for on-chain content ownership",
        "Designed and implemented the full component architecture and design system",
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
      image: "/static/nous-logo-white.png",
      screenshot:"/static/callguard-ss.png",
      client: "Nous Protocol",
      category: "DeFi Protocol",
      techType: "Web3 Development",
      bg: "#0d0f18",
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
