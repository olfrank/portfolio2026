import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { portfolioData } from '../data/mock';
import { ArrowDown } from 'lucide-react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const Hero = () => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const btnSpringX = useSpring(btnX, { stiffness: 180, damping: 18 });
  const btnSpringY = useSpring(btnY, { stiffness: 180, damping: 18 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const btn = btnRef.current;
      if (!btn) return;

      const r    = btn.getBoundingClientRect();
      const cx   = r.left + r.width  / 2;
      const cy   = r.top  + r.height / 2;
      const dx   = e.clientX - cx;
      const dy   = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const RADIUS = 150;

      if (dist < RADIUS) {
        const pull = (1 - dist / RADIUS) * 10;
        btnX.set(dx / dist * pull);
        btnY.set(dy / dist * pull);
      } else {
        btnX.set(0);
        btnY.set(0);
      }
    };

    const onMouseLeave = () => { btnX.set(0); btnY.set(0); };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [btnX, btnY]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="relative max-w-5xl mx-auto px-6 text-center"
        style={{ opacity: scrollOpacity, zIndex: 3 }}
      >
        {/* Name */}
        <motion.h1
          id="hero-title"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.5rem, 11vw, 8rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.0,
            marginBottom: '1.5rem',
            background: 'linear-gradient(158deg, #dbdbdb 25%, rgba(190,215,255,0.93) 65%, rgba(155,190,255,0.86) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {portfolioData.personal.name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="hero-subtitle mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          {portfolioData.personal.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="hero-tagline mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
        >
          {portfolioData.personal.tagline}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
        >
          <motion.button
            ref={btnRef}
            onClick={scrollToProjects}
            className="glass-button"
            style={{ x: btnSpringX, y: btnSpringY }}
            whileTap={{ scale: 0.97 }}
          >
            View Work
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
        style={{ opacity: scrollOpacity, zIndex: 3 }}
        onClick={scrollToProjects}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 0.8, duration: 0.7, ease: EASE },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.8 },
          }}
        >
          <ArrowDown className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
