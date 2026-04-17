import { motion } from 'framer-motion';
import { GlassEffect, GlassFilter } from '@/components/ui/liquid-glass';

const Header = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4 "
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <GlassFilter />
      <GlassEffect className="max-w-[500px] mx-4 w-full rounded-full">
        <div className="w-full mx-4 px-6 py-4 flex items-center justify-center w-full">
          <nav className="flex items-center gap-8">
            <a
              href="#"
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.22)',
                background: 'rgba(255,255,255,0.09)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                flexShrink: 0,
                transition: 'border-color 0.25s ease, background 0.25s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(77,159,255,0.55)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(77,159,255,0.1)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)';
              }}
            >
              OF
            </a>
            <a href="#projects" className="nav-link">Work</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        </div>
      </GlassEffect>
    </motion.header>
  );
};

export default Header;
