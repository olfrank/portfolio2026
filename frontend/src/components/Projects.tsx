import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/mock';
import type { Project } from '../data/mock';
import { ExternalLink, X, Monitor, CircleUser, Sparkles, MessageSquareText } from 'lucide-react';

// ─── Card ────────────────────────────────────────────────────────────────────

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

const ProjectCard = ({
  project,
  offset = false,
  onClick,
}: {
  project: Project;
  offset?: boolean;
  onClick: () => void;
}) => (
  <motion.div
    variants={itemVariants}
    className="flex flex-col rounded-2xl overflow-hidden cursor-pointer"
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      marginTop: offset ? '3rem' : '0',
    }}
    whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
    onClick={onClick}
  >
    {/* Image area */}
    <div
      className="w-full overflow-hidden"
      style={{ aspectRatio: '16/10', background: 'rgba(255,255,255,0.03)' }}
    >
      {project.image ? (
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="w-24 h-24 rounded-2xl opacity-10"
            style={{ background: 'linear-gradient(135deg, var(--foreground), transparent)' }}
          />
        </div>
      )}
    </div>

    {/* Card body */}
    <div className="px-6 py-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold leading-tight" style={{ color: 'var(--foreground)' }}>
          {project.name}
        </h3>
        <span
          className="shrink-0 text-sm px-3 py-1 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.08)',
            color: 'var(--foreground)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Role — sits between name and description */}
      <p className="text-xs font-medium tracking-wide uppercase" style={{ color: 'var(--muted-foreground)', opacity: 0.7 }}>
        {project.role}
      </p>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-1">
        {project.techStack.map((tech, i) => (
          <span key={i} className="tech-badge">{tech}</span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link mt-2 self-start"
          onClick={e => e.stopPropagation()}
        >
          View Project
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      )}
    </div>
  </motion.div>
);

// ─── Modal ───────────────────────────────────────────────────────────────────

const MetaBar = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center gap-1.5 py-5">
    <div style={{ color: '#888' }}>{icon}</div>
    <span className="text-sm font-medium text-center" style={{ color: '#333' }}>{label}</span>
  </div>
);

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden overflow-y-auto"
        style={{ background: '#ffffff', maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-60"
          style={{ background: 'rgba(0,0,0,0.08)' }}
          aria-label="Close"
        >
          <X className="w-4 h-4" style={{ color: '#444' }} />
        </button>

        {/* Project image */}
        <div className="w-full" style={{ aspectRatio: '16/10', background: '#f0f0f0' }}>
          {project.image ? (
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="w-20 h-20 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #ccc, #e8e8e8)' }}
              />
            </div>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col items-center gap-2.5 pt-6 pb-4 px-8">
          <Monitor className="w-5 h-5" style={{ color: '#888' }} />
          <span
            className="text-xs px-3 py-1 rounded-full"
            style={{ background: '#f0f0f0', color: '#555', border: '1px solid #e0e0e0' }}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-2xl font-bold text-center px-8 pb-6 leading-tight"
          style={{ color: '#111' }}
        >
          {project.name}
        </h2>

        {/* Metadata bar — client + tech type */}
        <div
          className="grid grid-cols-2"
          style={{
            background: '#f5f5f5',
            borderTop: '1px solid #e8e8e8',
            borderBottom: '1px solid #e8e8e8',
          }}
        >
          <div style={{ borderRight: '1px solid #e8e8e8' }}>
            <MetaBar icon={<CircleUser className="w-5 h-5" />} label={project.client} />
          </div>
          <MetaBar icon={<Sparkles className="w-5 h-5" />} label={project.techType} />
        </div>

        {/* Full description */}
        <div className="px-8 py-8 flex flex-col gap-4">
          {project.fullDescription.split('\n\n').map((para, i) => (
            <p key={i} className="text-sm text-center leading-relaxed" style={{ color: '#555' }}>
              {para}
            </p>
          ))}
        </div>

        {/* Highlights header */}
        <div
          className="flex flex-col items-center gap-1.5 py-5"
          style={{
            background: '#f5f5f5',
            borderTop: '1px solid #e8e8e8',
            borderBottom: '1px solid #e8e8e8',
          }}
        >
          <MessageSquareText className="w-5 h-5" style={{ color: '#888' }} />
          <span className="text-sm font-semibold" style={{ color: '#333' }}>Project Highlights</span>
        </div>

        {/* Highlights list */}
        <div className="px-8 py-6 flex flex-col gap-3">
          {project.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="shrink-0 rounded-full"
                style={{ width: 6, height: 6, background: '#bbb', marginTop: 6 }}
              />
              <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{h}</p>
            </div>
          ))}
        </div>

        {/* Bottom padding */}
        <div className="h-4" />
      </motion.div>
    </motion.div>,
    document.body
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const left  = portfolioData.projects.filter((_, i) => i % 2 === 0);
  const right = portfolioData.projects.filter((_, i) => i % 2 !== 0);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">Work</h2>
          <p className="section-subtitle">A selection of recent products.</p>
        </motion.div>

        {/* Staggered two-column grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.15 }}
        >
          <div className="flex flex-col gap-6">
            {left.map(p => (
              <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {right.map(p => (
              <ProjectCard key={p.id} project={p} offset onClick={() => setSelectedProject(p)} />
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
