import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const bioParagraphs = [
  "I co-founded TRAX, a venture-backed direct-to-fan music platform, and served as CTO from the first line of code through to a $2.4M raise, a team of three engineers, and 50,000 fans across 75 countries.",
  "Right now I'm building CallGuard: a SaaS product for UK tradespeople that automates missed-call handling. Designed, engineered, and shipped solo.",
  "I work at the intersection of design and engineering. I care about how products feel and how they're built, and think both matter equally.",
];

const stats = [
  { value: "$2.4M", label: "Raised at TRAX" },
  { value: "50k+",  label: "Fans, 75+ Countries" },
  { value: "2",     label: "Ventures Co-Founded" },
  { value: "2026",  label: "CallGuard Shipped" },
];

const About = () => (
  <section id="about" className="section-padding">
    <div className="max-w-5xl mx-auto px-6">

      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title mb-4">About</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          background: 'linear-gradient(135deg, rgba(77,159,255,0.28) 0%, rgba(77,159,255,0.06) 35%, rgba(255,255,255,0.06) 100%)',
          padding: '1px',
          borderRadius: '32px',
        }}
      >
        <div
          style={{
            background: '#ffffff09',
            backdropFilter: "blur(10px)",
            borderRadius: '31px',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 md:gap-14">

            <div className="flex flex-col gap-5">
              {bioParagraphs.map((para, i) => (
                <motion.p
                  key={i}
                  style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                    lineHeight: 1.8,
                    color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: i === 0 ? 500 : 400,
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <div
              className="flex flex-col gap-6 md:border-l"
              style={{
                borderColor: 'rgba(255, 255, 255, 0)',
                paddingLeft: 'clamp(0px, 3vw, 2.5rem)',
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  style={{
                    paddingLeft: '1rem',
                    borderLeft: '2px solid rgba(77,159,255,0.5)',
                  }}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.1 }}
                >
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.04em', color: 'var(--text-tertiary)', marginTop: '0.35rem', lineHeight: 1.4, textTransform: 'uppercase' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </motion.div>

    </div>
  </section>
);

export default About;
