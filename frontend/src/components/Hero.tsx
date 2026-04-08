import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../data/mock';
import { ArrowDown } from 'lucide-react';
import {GlassButton} from "@/components/ui/liquid-glass"

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content overlay */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <h1 className="hero-title mb-6">
            {portfolioData.personal.name}
          </h1>
          <p className="hero-subtitle mb-4">
            {portfolioData.personal.title}
          </p>
          <p className="hero-tagline mb-12">
            {portfolioData.personal.tagline}
          </p>

          <div className='w-fit m-auto '>
            <GlassButton >
             <span onClick={scrollToProjects} className='text-white'> View Work</span>
            </GlassButton>
          </div>
          
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={scrollToProjects}
      >
        <ArrowDown className="w-6 h-6 text-white/40" />
      </motion.div>
    </section>
  );
};

export default Hero;
