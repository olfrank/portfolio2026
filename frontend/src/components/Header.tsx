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
      <GlassEffect className="max-w-[500px] w-full rounded-full">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center w-full">
          <nav className="flex items-center gap-8">
            <a href="#" className="nav-link">OF</a>
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
