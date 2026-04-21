import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/mock';
import type { Project } from '../data/mock';
import { X, Monitor, CircleUser, Sparkles, MessageSquareText } from 'lucide-react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ACCENTS: Record<number, string> = {
  1: '#4d9fff',   
  2: '#bfff00', 
  3: '#94a3b8',
  4: '#bfff00',  
  5: '#bfff00',  
};


const Slideshow = ({
  images,
  bg,
  accent,
  featured = false,
  isModal = false,
}: {
  images: string[];
  bg: string;
  accent: string;
  featured?: boolean;
  isModal?: boolean;
}) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const id = setInterval(() => setCurrent(c => (c + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, [images.length, paused]);

  useEffect(() => { setCurrent(0); }, [images]);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: bg,
        aspectRatio: isModal ? '16/10' : featured ? '16/9' : '16/10',
        borderTop: isModal ? 'none' : `2px solid ${accent}`,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Screenshot ${i + 1}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      ))}

      {images.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
            zIndex: 20,
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setCurrent(i); }}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: i === current ? accent : 'rgba(255,255,255,0.3)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                flexShrink: 0,
              }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {!isModal && (
        <div
          className="card-img-overlay absolute inset-0 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0)', transition: 'background 0.3s ease', zIndex: 10 }}
        >
          <span
            className="card-img-label"
            style={{
              fontFamily: 'var(--font-sans)',
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
      )}
    </div>
  );
};


const ProjectCard = ({
  project,
  onClick,
  delay = 0,
}: {
  project: Project;
  onClick: () => void;
  delay?: number;
}) => {
  const accent = ACCENTS[project.id] ?? '#4d9fff';
  return (
    <motion.div
      className="project-card-hover flex flex-col rounded-2xl overflow-hidden cursor-pointer h-full"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      whileHover={{ y: -5, boxShadow: `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${accent}28`, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
      onClick={onClick}
    >
      <Slideshow images={project.images} bg={project.bg} accent={accent} />

      <div className="px-5 py-5 flex flex-col gap-2.5 backdrop-blur-sm">
        <span
          className="self-start text-xs px-2.5 py-1 rounded-full font-medium tracking-wide uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.04em',
            background: `${accent}18`,
            color: accent,
            border: `1px solid ${accent}30`,
          }}
        >
          {project.category}
        </span>

        <div className="flex items-center justify-between gap-4">
          <h3
            className="text-2xl leading-tight"
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              color: 'var(--foreground)',
            }}
          >
            {project.name}
          </h3>
          <span
            className="shrink-0 text-xs px-2.5 py-1 rounded-full"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 400,
              letterSpacing: '0.02em',
              background: `${accent}18`,
              color: accent,
              border: `1px solid ${accent}30`,
            }}
          >
            {project.year}
          </span>
        </div>

        <p
          className="text-xs tracking-widest uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 400,
            letterSpacing: '0.06em',
            color: 'var(--text-tertiary)',
          }}
        >
          {project.role}
        </p>

        <p
          className="text-sm leading-relaxed"
          style={{
            color: 'var(--text-secondary)',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          } as React.CSSProperties}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
          {project.techStack.slice(0, 5).map((tech, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.02em',
                color: 'var(--text-tertiary)',
                opacity: 0.7,
              }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                opacity: 0.45,
              }}
            >
              +{project.techStack.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};


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
      <div className="flex flex-col md:flex-row">

        <div className="md:w-[58%] shrink-0">
          <Slideshow images={project.images} bg={project.bg} accent={accent} featured />
        </div>

        <div className="flex flex-col justify-center gap-4 px-7 py-8 md:py-10 backdrop-blur-sm">
          <span
            className="self-start text-xs px-2.5 py-1 rounded-full uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              letterSpacing: '0.04em',
              background: `${accent}18`,
              color: accent,
              border: `1px solid ${accent}30`,
            }}
          >
            {project.category}
          </span>

          {/* Name + year */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3
                className="text-2xl leading-tight"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  color: 'var(--foreground)',
                }}
              >
                {project.name}
              </h3>
              <span
                className="shrink-0 text-xs px-2.5 py-1 rounded-full mt-1"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  background: `${accent}18`,
                  color: accent,
                  border: `1px solid ${accent}30`,
                }}
              >
                {project.year}
              </span>
            </div>
            <p
              className="text-xs tracking-widest uppercase mt-1.5"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 400,
                letterSpacing: '0.06em',
                color: 'var(--text-tertiary)',
              }}
            >
              {project.role}
            </p>
          </div>

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

          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {project.techStack.slice(0, 6).map((tech, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.02em',
                  color: 'var(--text-tertiary)',
                  opacity: 0.7,
                }}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 6 && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-tertiary)',
                  opacity: 0.45,
                }}
              >
                +{project.techStack.length - 6}
              </span>
            )}
          </div>

          <span
            className="text-xs font-medium mt-1"
            style={{ fontFamily: 'var(--font-sans)', color: accent, opacity: 0.8 }}
          >
            View Project →
          </span>
        </div>
      </div>
    </motion.div>
  );
};


const MetaBar = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center gap-1.5 py-5">
    <div style={{ color: '#888' }}>{icon}</div>
    <span
      className="text-sm font-medium text-center"
      style={{ fontFamily: 'var(--font-sans)', color: '#b0b0b0' }}
    >
      {label}
    </span>
  </div>
);

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const accent = ACCENTS[project.id] ?? '#4d9fff';

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
        style={{ background: '#222222', maxHeight: '90vh', fontFamily: 'var(--font-sans)' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-60"
          style={{ background: 'rgba(0, 0, 0, 0.47)' }}
          aria-label="Close"
        >
          <X className="w-4 h-4" style={{ color: '#f0f0f0' }} />
        </button>

        <Slideshow images={project.images} bg={project.bg} accent={accent} isModal />

        <div className="flex flex-col items-center gap-2.5 pt-6 pb-4 px-8">
          <Monitor className="w-5 h-5" style={{ color: '#999999' }} />
          <span
            className="text-xs px-3 py-1 rounded-full uppercase tracking-wide"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              letterSpacing: '0.05em',
              background: `${accent}18`,
              color: accent,
              border: `1px solid ${accent}30`,
            }}
          >
            {project.category}
          </span>
        </div>

        <h2
          className="text-3xl text-center px-8 pb-6 leading-tight"
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            color: '#ffffff',
          }}
        >
          {project.name}
        </h2>

        <div
          className="grid grid-cols-2"
          style={{ background: '#0c0c0c', borderTop: '1px solid #505050', borderBottom: '1px solid #505050' }}
        >
          <div style={{ borderRight: '1px solid #505050' }}>
            <MetaBar icon={<CircleUser className="w-5 h-5" />} label={project.client} />
          </div>
          <MetaBar icon={<Sparkles className="w-5 h-5" />} label={project.techType} />
        </div>

        <div className="px-8 py-8 flex flex-col gap-4">
          {project.fullDescription.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="text-sm text-center leading-relaxed"
              style={{ fontFamily: 'var(--font-sans)', color: '#dddddd' }}
            >
              {para}
            </p>
          ))}
        </div>

        <div
          className="flex flex-col items-center gap-1.5 py-5"
          style={{ background: '#0c0c0c', borderTop: '1px solid #505050', borderBottom: '1px solid #505050' }}
        >
          <MessageSquareText className="w-5 h-5" style={{ color: '#888' }} />
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: 'var(--font-sans)', color: '#b0b0b0' }}
          >
            Project Highlights
          </span>
        </div>

        <div className="px-8 py-6 flex flex-col gap-3">
          {project.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="shrink-0 rounded-full mt-1.5"
                style={{ width: 6, height: 6, background: accent, opacity: 0.6 }}
              />
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)', color: '#dddddd' }}
              >
                {h}
              </p>
            </div>
          ))}
        </div>

        <div className="h-4" />
      </motion.div>
    </motion.div>,
    document.body
  );
};


const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [featured, ...rest] = portfolioData.projects;
  const row2 = rest.slice(0, 2);
  const row3 = rest.slice(2, 4);

  return (
    <section id="projects" className="section-padding">
      <style>{`
        .project-card-hover:hover .card-img-overlay {
          background: rgba(0,0,0,0.38) !important;
        }
        .project-card-hover:hover .card-img-label {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
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

        <div className="mb-6">
          <FeaturedCard project={featured} onClick={() => setSelectedProject(featured)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {row2.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              delay={i * 0.15}
              onClick={() => setSelectedProject(p)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {row3.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              delay={i * 0.15}
              onClick={() => setSelectedProject(p)}
            />
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
