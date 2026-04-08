import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';
import { Dithering } from "@paper-design/shaders-react"

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section id="skills" className="section-padding relative">
      {/* Background dithering — rendered behind all content */}
      {/* <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={"#0a0a0a"}
          colorFront={"hsla(320, 100%, 70%, 0.53)"}
          shape="simplex"
          type="4x4"
          size={2}
          offsetX={0}
          offsetY={0}
          scale={0.5}
          rotation={0}
          speed={0.03}
        />
      </div> */}

      <div className="w-1/2 max-w-6xl mx-auto px-6 relative" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">Skills & Capabilities</h2>
          <p className="section-subtitle mb-16">
            A focused toolkit for building premium, performance-first interfaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <motion.div
            className="skills-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <h3 className="skills-category-title mb-6">Front-End Engineering</h3>
            <motion.div
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {portfolioData.skills.technical.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="skill-item"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Design & Product Skills */}
          <motion.div
            className="skills-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <h3 className="skills-category-title mb-6">Design & Product</h3>
            <motion.div
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {portfolioData.skills.designProduct.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="skill-item"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default Skills;
