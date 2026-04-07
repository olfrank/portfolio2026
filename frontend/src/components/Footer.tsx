import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="footer-text mb-2">
            Designed and built with care by Ollie Francis
          </p>
          <p className="footer-subtext">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
