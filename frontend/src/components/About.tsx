import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const bioParagraphs = [
  "I'm a product-focused front-end engineer with a strong eye for design and a deep appreciation for detail, motion, and performance.",
  "I enjoy building interfaces that feel calm, intuitive, and refined — caring as much about how something feels as how it functions.",
  "My work sits at the intersection of design, engineering, and product thinking.",
];

const stats = [
  { value: "4+",   label: "Years Building Products" },
  { value: "2",    label: "Ventures Co-Founded" },
  { value: "Solo", label: "End-to-End Delivery" },
  { value: "UK",   label: "Based & Available" },
];

const About = () => (
  <section id="about" className="section-padding">
    <div className="max-w-5xl mx-auto px-6">

      {/* Eyebrow label */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title mb-4">About</h2>
        <p className="section-subtitle mb-6">
          A focused toolkit for building premium, performance-first interfaces.
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

      {/* Gradient-border card wrapper */}
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
            background: 'rgba(12,14,22,0.92)',
            borderRadius: '31px',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 md:gap-14">

            {/* Left: bio text */}
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

            {/* Right: stats */}
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
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.3rem', lineHeight: 1.4 }}>
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
