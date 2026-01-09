import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';
import { Mail, Linkedin, Github } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4 text-center">Let's Work Together</h2>
          <p className="section-subtitle mb-16 text-center">
            Open to new opportunities and interesting projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Contact Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="contact-link-card group"
            >
              <Mail className="w-5 h-5" />
              <div>
                <div className="contact-link-title">Email</div>
                <div className="contact-link-value">{portfolioData.personal.email}</div>
              </div>
            </a>

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

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="form-input resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <motion.button
                type="submit"
                className="form-submit-button w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
