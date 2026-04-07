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
  description: string;
  techStack: string[];
  link: string | null;
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
    title: "Senior Front-End Engineer & Product-Focused Software Developer",
    tagline: "Design-led front-end engineering for modern products.",
    bio: "I'm a product-focused front-end engineer with a strong eye for design and a deep appreciation for detail, motion, and performance. I enjoy building interfaces that feel calm, intuitive, and refined, and I care as much about how something feels as how it functions. My work sits at the intersection of design, engineering, and product thinking.",
    email: "olliefrancis97@hotmail.co.uk",
    linkedin: "https://www.linkedin.com/in/ollie--francis/",
    github: "https://github.com/olfrank"
  },

  projects: [
    {
      id: 1,
      name: "TRAX — Direct-to-Fan Music Platform",
      description: "A venture-backed direct-to-fan platform enabling artists to monetise content through subscriptions, pay-per-view, and tipping. I led front-end architecture, UX, and premium interaction design across web and mobile.",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Capacitor", "Web Audio APIs"],
      link: null
    },
    {
      id: 2,
      name: "Internet Creatives — Web Studio",
      description: "A boutique web studio delivering fast, modern, conversion-focused websites for clients using a mix of custom code and AI-assisted workflows. Focused on speed, polish, and maintainability.",
      techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      link: null
    },
    {
      id: 3,
      name: "White-Label Fan Hub Platform",
      description: "A scalable, white-label fan engagement platform built for labels and artist managers, offering analytics dashboards, content gating, and premium UX patterns.",
      techStack: ["Next.js", "React", "TypeScript", "Node.js", "Charting libraries", "Framer Motion"],
      link: null
    },
    {
      id: 4,
      name: "Experimental UI & Motion Playground",
      description: "A collection of UI experiments exploring glassmorphism, parallax scrolling, scroll-based animations, and Apple-inspired interaction patterns. Built to test performance-first motion design.",
      techStack: ["React", "TypeScript", "Framer Motion", "CSS backdrop-filter", "Web animations"],
      link: null
    }
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
