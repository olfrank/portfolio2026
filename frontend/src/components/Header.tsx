import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 header-glass"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#"
          className="header-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          OF
        </motion.a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#projects" className="nav-link">Work</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        <motion.button
          onClick={toggleTheme}
          className="theme-toggle"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
