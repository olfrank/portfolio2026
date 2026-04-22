import { motion } from 'framer-motion';
import { FileText, Mail, Linkedin, Github, } from 'lucide-react';
import { portfolioData } from '../data/mock';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const Contact = () => (
  <section id="contact" className="section-padding">
    <div className="max-w-4xl mx-auto px-6 text-center w-fit">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="section-title mb-4">Let's Work Together</h2>
        <p className="section-subtitle">
          Open to new opportunities and interesting projects.
        </p>
      </motion.div>

<motion.div
            className="space-y-4 w-full mb-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
      <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-card group"
            >
              <Linkedin className="w-5 h-5" />
              <div>
                <div className="contact-link-title">LinkedIn</div>
                <div className="contact-link-value">Connect with me</div>
              </div>
            </a>

            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-card group"
            >
              <Github className="w-5 h-5" />
              <div>
                <div className="contact-link-title">GitHub</div>
                <div className="contact-link-value">View my code</div>
              </div>
            </a>
          </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
      >
        <motion.a
          href="/static/CV-2026-pdf.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-button"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', textDecoration: 'none' }}
          whileTap={{ scale: 0.97 }}
        >
          <FileText size={16} strokeWidth={2} />
          View my CV
        </motion.a>

        <motion.a
          href="mailto:olliefrancis97@hotmail.co.uk"
          target='_blank'
          className="glass-button"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', textDecoration: 'none' }}
          whileTap={{ scale: 0.97 }}
        >
          <Mail size={16} strokeWidth={2} />
          Get in touch
        </motion.a>
      </motion.div>

    </div>
  </section>
);

export default Contact;
