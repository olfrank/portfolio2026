import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-16 text-center">About</h2>
        </motion.div>

        <motion.div
          className="about-glass-panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="about-text">
            {portfolioData.personal.bio}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
