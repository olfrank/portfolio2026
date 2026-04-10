import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/mock';
import type { Project } from '../data/mock';
import { X, Monitor, CircleUser, Sparkles, MessageSquareText } from 'lucide-react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Per-project accent colours
const ACCENTS: Record<number, string> = {
  1: '#4d9fff',   // CallGuard — site blue
  2: '#bfff00',   // TRAX — lime green
  3: '#a78bfa',   // Nous — soft violet
};

// ─── Skeleton placeholder ────────────────────────────────────────────────────
// Suggests a real dashboard UI while product screenshots aren't available yet

const UISkeleton = ({ accent }: { accent: string }) => (
  <div className="absolute inset-0 p-5 flex flex-col gap-3 pointer-events-none select-none">
    {/* TODO: Replace placeholder with actual product screenshot */}
    {/* Top bar */}
    <div className="flex items-center gap-2">
      <div style={{ width: 48, height: 8, borderRadius: 4, background: accent, opacity: 0.18 }} />
      <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'white', opacity: 0.05 }} />
      <div style={{ width: 28, height: 8, borderRadius: 4, background: 'white', opacity: 0.05 }} />
    </div>
    {/* Stat row */}
    <div className="flex gap-2 mt-1">
      {[1, 1, 1].map((_, i) => (
        <div key={i} style={{ flex: 1, height: 48, borderRadius: 8, background: 'white', opacity: 0.04, border: `1px solid ${accent}22` }} />
      ))}
    </div>
    {/* Chart area */}
    <div style={{ flex: 1, borderRadius: 8, background: 'white', opacity: 0.03, border: `1px solid ${accent}18`, position: 'relative', overflow: 'hidden' }}>
      {/* Fake chart line */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <polyline
          points="0,70 15,55 30,60 45,35 60,45 75,20 90,30 105,15 120,25 135,10 150,18"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          opacity="0.2"
        />
      </svg>
    </div>
    {/* Row of list items */}
    <div className="flex flex-col gap-1.5">
      {[0.07, 0.05, 0.04].map((op, i) => (
        <div key={i} className="flex gap-2 items-center">
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, opacity: 0.3 }} />
          <div style={{ flex: 1, height: 7, borderRadius: 4, background: 'white', opacity: op }} />
          <div style={{ width: 32, height: 7, borderRadius: 4, background: 'white', opacity: op * 0.7 }} />
        </div>
      ))}
    </div>
  </div>
);

// ─── Image area shared between featured and standard cards ───────────────────

const CardImage = ({ project, featured = false }: { project: Project; featured?: boolean }) => {
  const accent = ACCENTS[project.id] ?? '#4d9fff';
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: project.bg,
        aspectRatio: featured ? '16/9' : '16/10',
        borderTop: `2px solid ${accent}`,
      }}
    >
      {/* Skeleton behind logo */}
      <UISkeleton accent={accent} />
      {/* <img
            src={project.image}
            alt={project.name}
            style={{ height: 36, width: 'auto', objectFit: 'contain', opacity: 0.9 }}
            className='rounded-full'
          /> */}


      {/* Logo — small brand mark in top-left */}
      {project.image && (
        <div className="absolute top-4 left-4 z-10">
          <img
            src={project.image}
            alt={project.name}
            style={{ height: 36, width: 'auto', objectFit: 'contain', opacity: 0.9 }}
            className='rounded-full'
          />
        </div>
      )}

      {/* Hover overlay + label — handled by CSS group on parent card */}
      <div
        className="card-img-overlay absolute inset-0 flex items-center justify-center"
        style={{
          background: 'rgba(0,0,0,0)',
          transition: 'background 0.3s ease',
        }}
      >
        <span
          className="card-img-label"
          style={{
            color: accent,
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            opacity: 0,
            transform: 'translateY(6px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          View Project →
        </span>
      </div>
    </div>
  );
};

// ─── Standard card ────────────────────────────────────────────────────────────

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const accent = ACCENTS[project.id] ?? '#4d9fff';
  return (
    <motion.div
      className="project-card-hover flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
      whileHover={{ y: -5, boxShadow: `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${accent}28`, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
      onClick={onClick}
    >
      <CardImage project={project} />

      <div className="px-5 py-5 flex flex-col gap-2.5 backdrop-blur-sm">
        {/* Name + year */}
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold leading-tight" style={{ color: 'var(--foreground)' }}>
            {project.name}
          </h3>
          <span
            className="shrink-0 text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}
          >
            {project.year}
          </span>
        </div>

        {/* Role */}
        <p className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>
          {project.role}
        </p>

        {/* Description — clamped to 2 lines */}
        <p
          className="text-sm leading-relaxed"
          style={{
            color: 'var(--text-secondary)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          } as React.CSSProperties}
        >
          {project.description}
        </p>

        {/* Tech tags — muted, minimal */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
          {project.techStack.slice(0, 5).map((tech, i) => (
            <span
              key={i}
              style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', opacity: 0.7 }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', opacity: 0.45 }}>
              +{project.techStack.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Featured card (full-width, horizontal layout) ───────────────────────────

const FeaturedCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const accent = ACCENTS[project.id] ?? '#4d9fff';
  return (
    <motion.div
      className="project-card-hover rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
      whileHover={{ y: -5, boxShadow: `0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px ${accent}35`, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
      onClick={onClick}
    >
      {/* Horizontal on md+, stacked on mobile */}
      <div className="flex flex-col md:flex-row">

        {/* Image — 58% on desktop */}
        <div className="md:w-[58%] shrink-0">
          <div className="h-full" style={{ minHeight: 260 }}>
            <CardImage project={project} featured />
          </div>
        </div>

        {/* Details — 42% */}
        <div className="flex flex-col justify-center gap-4 px-7 py-8 md:py-10 backdrop-blur-sm">
          {/* Category pill */}
          <span
            className="self-start text-xs px-2.5 py-1 rounded-full font-medium tracking-wide uppercase"
            style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}
          >
            {project.category}
          </span>

          {/* Name + year */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-2xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
                {project.name}
              </h3>
              <span
                className="shrink-0 text-xs px-2.5 py-1 rounded-full font-medium mt-1"
                style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}
              >
                {project.year}
              </span>
            </div>
            <p className="text-xs font-medium tracking-widest uppercase mt-1.5" style={{ color: 'var(--text-tertiary)' }}>
              {project.role}
            </p>
          </div>

          {/* Description — 2-line clamp */}
          <p
            className="text-sm leading-relaxed"
            style={{
              color: 'var(--text-secondary)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            } as React.CSSProperties}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {project.techStack.slice(0, 6).map((tech, i) => (
              <span key={i} style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', opacity: 0.7 }}>
                {tech}
              </span>
            ))}
            {project.techStack.length > 6 && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', opacity: 0.45 }}>
                +{project.techStack.length - 6}
              </span>
            )}
          </div>

          {/* CTA hint */}
          <span className="text-xs font-medium mt-1" style={{ color: accent, opacity: 0.8 }}>
            View Project →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Modal ───────────────────────────────────────────────────────────────────

const MetaBar = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center gap-1.5 py-5">
    <div style={{ color: '#888' }}>{icon}</div>
    <span className="text-sm font-medium text-center" style={{ color: '#333' }}>{label}</span>
  </div>
);

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-60"
          style={{ background: 'rgba(0,0,0,0.08)' }}
          aria-label="Close"
        >
          <X className="w-4 h-4" style={{ color: '#444' }} />
        </button>

        <div className="w-full" style={{ aspectRatio: '16/10', background: project.bg, position: 'relative' }}>
          {project.image && (
            <img src={project.image} alt={project.name} className="w-full h-full object-contain p-10" />
          )}
        </div>

        <div className="flex flex-col items-center gap-2.5 pt-6 pb-4 px-8">
          <Monitor className="w-5 h-5" style={{ color: '#888' }} />
          <span className="text-xs px-3 py-1 rounded-full" style={{ background: '#f0f0f0', color: '#555', border: '1px solid #e0e0e0' }}>
            {project.category}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-center px-8 pb-6 leading-tight" style={{ color: '#111' }}>
          {project.name}
        </h2>

        <div className="grid grid-cols-2" style={{ background: '#f5f5f5', borderTop: '1px solid #e8e8e8', borderBottom: '1px solid #e8e8e8' }}>
          <div style={{ borderRight: '1px solid #e8e8e8' }}>
            <MetaBar icon={<CircleUser className="w-5 h-5" />} label={project.client} />
          </div>
          <MetaBar icon={<Sparkles className="w-5 h-5" />} label={project.techType} />
        </div>

        <div className="px-8 py-8 flex flex-col gap-4">
          {project.fullDescription.split('\n\n').map((para, i) => (
            <p key={i} className="text-sm text-center leading-relaxed" style={{ color: '#555' }}>{para}</p>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1.5 py-5" style={{ background: '#f5f5f5', borderTop: '1px solid #e8e8e8', borderBottom: '1px solid #e8e8e8' }}>
          <MessageSquareText className="w-5 h-5" style={{ color: '#888' }} />
          <span className="text-sm font-semibold" style={{ color: '#333' }}>Project Highlights</span>
        </div>

        <div className="px-8 py-6 flex flex-col gap-3">
          {project.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="shrink-0 rounded-full" style={{ width: 6, height: 6, background: '#bbb', marginTop: 6 }} />
              <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{h}</p>
            </div>
          ))}
        </div>

        <div className="h-4" />
      </motion.div>
    </motion.div>,
    document.body
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featured = portfolioData.projects[0];
  const rest     = portfolioData.projects.slice(1);

  return (
    <section id="projects" className="section-padding">
      {/* Hover overlay CSS — injected once */}
      <style>{`
        .project-card-hover:hover .card-img-overlay {
          background: rgba(0,0,0,0.38) !important;
        }
        .project-card-hover:hover .card-img-label {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .project-card-hover:hover .card-img-overlay img {
          transform: scale(1.03);
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">Selected Work</h2>
          <p className="section-subtitle">Products I've designed, built, and shipped.</p>
        </motion.div>

        {/* Featured card */}
        <div className="mb-6">
          <FeaturedCard project={featured} onClick={() => setSelectedProject(featured)} />
        </div>

        {/* Secondary cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
            >
              <ProjectCard project={p} onClick={() => setSelectedProject(p)} />
            </motion.div>
          ))}
        </div>
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
