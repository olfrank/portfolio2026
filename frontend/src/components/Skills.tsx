import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Icons ────────────────────────────────────────────────────────────────────
// Thin-line SVGs at 22×22, stroke-only, no fill

const icons = {
  react: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <ellipse cx="11" cy="11" rx="10" ry="4" />
      <ellipse cx="11" cy="11" rx="10" ry="4" transform="rotate(60 11 11)" />
      <ellipse cx="11" cy="11" rx="10" ry="4" transform="rotate(120 11 11)" />
      <circle cx="11" cy="11" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  motion: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <path d="M2 11 Q6 5 11 11 Q16 17 20 11" />
      <path d="M2 15 Q6 9 11 15 Q16 21 20 15" opacity="0.4" />
    </svg>
  ),
  designCode: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="7 7 2 11 7 15" />
      <polyline points="15 7 20 11 15 15" />
      <line x1="13" y1="4" x2="9" y2="18" />
    </svg>
  ),
  product: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <circle cx="11" cy="11" r="9" />
      <circle cx="11" cy="11" r="3" />
      <line x1="11" y1="2" x2="11" y2="5" />
      <line x1="11" y1="17" x2="11" y2="20" />
      <line x1="2" y1="11" x2="5" y2="11" />
      <line x1="17" y1="11" x2="20" y2="11" />
    </svg>
  ),
  typescript: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="18" height="18" rx="3" />
      <path d="M7 9h8M11 9v7" />
      <path d="M14 13.5c0-1-0.8-1.5-1.8-1.5s-2 .6-2 1.8c0 2.2 4 1.2 4 3.2 0 1.2-1 1.8-2.2 1.8-1.4 0-2.2-.7-2.2-1.8" opacity="0" />
    </svg>
  ),
  tailwind: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <path d="M5 9c1-4 3.5-5 6-5 2.5 0 4 1.5 4 3.5S13.5 11 11 11c-2.5 0-4 1.5-4 3.5S8.5 18 11 18c2.5 0 5-1 6-5" />
    </svg>
  ),
  performance: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <path d="M2 16 A9 9 0 0 1 20 16" />
      <line x1="11" y1="16" x2="15" y2="8" />
      <circle cx="11" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  uiux: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <rect x="2" y="4" width="18" height="14" rx="2" />
      <line x1="2" y1="8" x2="20" y2="8" />
      <circle cx="5" cy="6" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="8" cy="6" r="0.8" fill="currentColor" stroke="none" />
      <rect x="5" y="11" width="6" height="4" rx="1" />
      <line x1="14" y1="11" x2="17" y2="11" />
      <line x1="14" y1="13.5" x2="16" y2="13.5" />
    </svg>
  ),
  components: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="8" height="8" rx="1.5" />
      <rect x="12" y="2" width="8" height="8" rx="1.5" />
      <rect x="2" y="12" width="8" height="8" rx="1.5" />
      <rect x="12" y="12" width="8" height="8" rx="1.5" />
    </svg>
  ),
  responsive: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="5" width="14" height="11" rx="1.5" />
      <rect x="16" y="8" width="5" height="8" rx="1" />
      <line x1="6" y1="16" x2="9" y2="16" />
    </svg>
  ),
  designSystems: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <circle cx="11" cy="5" r="2.5" />
      <circle cx="4" cy="17" r="2.5" />
      <circle cx="18" cy="17" r="2.5" />
      <line x1="11" y1="7.5" x2="4" y2="14.5" />
      <line x1="11" y1="7.5" x2="18" y2="14.5" />
    </svg>
  ),
  accessibility: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
      <circle cx="11" cy="4" r="2" />
      <line x1="11" y1="6" x2="11" y2="13" />
      <path d="M4 8h14" />
      <path d="M7 20l4-7 4 7" />
    </svg>
  ),
  backend: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="18" height="5" rx="1.5" />
      <rect x="2" y="10" width="18" height="5" rx="1.5" />
      <rect x="2" y="17" width="18" height="2.5" rx="1.25" />
      <circle cx="18" cy="5.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  crossPlatform: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="5" width="13" height="12" rx="1.5" />
      <rect x="15" y="8" width="6" height="9" rx="1.25" />
      <line x1="5" y1="17" x2="10" y2="17" />
      <line x1="17" y1="17" x2="19" y2="17" />
    </svg>
  ),
  devops: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 2 L11 8" />
      <path d="M11 2 L8 5 M11 2 L14 5" />
      <circle cx="11" cy="13" r="5" />
      <path d="M9 13 Q10 11 11 13 Q12 15 13 13" />
      <line x1="11" y1="18" x2="11" y2="21" />
    </svg>
  ),
};


const tiles = [
  { icon: icons.react,        name: 'React & Next.js',    desc: 'Component architecture, SSR & app routing'            },
  { icon: icons.typescript,   name: 'TypeScript',         desc: 'Type-safe development at scale'                       },
  { icon: icons.uiux,         name: 'UI/UX Design',       desc: 'Visual systems, Figma & interaction design'           },
  { icon: icons.motion,       name: 'Motion Design',      desc: 'Framer Motion, CSS transitions & micro-interactions'  },
  { icon: icons.performance,  name: 'Performance',        desc: 'Core Web Vitals, bundle & runtime optimisation'       },
  { icon: icons.backend,      name: 'Backend & APIs',     desc: 'Node.js, Express & PostgreSQL with REST API design'   },
  { icon: icons.crossPlatform,name: 'Cross-Platform',     desc: 'Web-to-native iOS delivery via Capacitor'             },
  { icon: icons.devops,       name: 'DevOps & Deployment',desc: 'CI/CD pipelines, Vercel & Render'                     },
];

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.065 },
  }),
};

const Skills = () => (
  <section id="skills" className="section-padding">
    <div className="max-w-6xl mx-auto px-6">

      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title mb-4">Skills & Capabilities</h2>
        <p className="section-subtitle mb-6">
          From UI component to deployed product, the stack I use across web and iOS.
        </p>
        {/* <div className="flex justify-center">
          <div style={{
            width: 64,
            height: 2,
            borderRadius: 2,
            background: 'linear-gradient(to right, transparent, rgba(77,159,255,0.7) 40%, rgba(77,159,255,0.7) 60%, transparent)',
          }} />
        </div> */}
      </motion.div>

      {/* Bento grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.name}
            custom={i}
            variants={tileVariants}
            className="col-span-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '14px',
              padding: '1.35rem 1.5rem',
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
            whileHover={{
              y: -4,
              boxShadow: '0 0 0 1px rgba(77,159,255,0.3), 0 12px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(77,159,255,0.12)',
              borderColor: 'rgba(77,159,255,0.35)',
              transition: { type: 'spring', stiffness: 340, damping: 22 },
            }}
          >
            <div style={{ color: 'rgba(180,210,255,0.55)', marginBottom: '0.85rem' }}>
              {tile.icon}
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '0.35rem' }}>
              {tile.name}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
              {tile.desc}
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  </section>
);

export default Skills;
