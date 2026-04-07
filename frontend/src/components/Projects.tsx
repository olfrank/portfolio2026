import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">Selected Work</h2>
          <p className="section-subtitle mb-16">
            A collection of projects showcasing design-led engineering and product thinking.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {portfolioData.projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="project-card group"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="project-card-content">
                <h3 className="project-title mb-3">{project.name}</h3>
                <p className="project-description mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}
              </div>
              
              {/* Hover glow effect */}
              <div className="project-glow" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
