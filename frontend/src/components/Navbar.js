import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenuOpen(false);
      setActiveSection(href.replace('#', ''));
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <a href="#hero" className="navbar-logo" onClick={(e) => handleNavClick(e, '#hero')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">PK</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar-links">
          {navLinks.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className={activeSection === link.href.replace('#','') ? 'active' : ''}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Controls */}
        <div className="navbar-controls">
          <button
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <a
            href="/cv.pdf"
            download
            className="btn-outline nav-cv-btn"
          >
            Resume
          </a>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                <span className="mobile-link-num">0{navLinks.indexOf(link) + 1}.</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="/cv.pdf" download className="btn-primary mobile-cv-btn">
          <span>Download Resume</span>
        </a>
      </div>
    </nav>
  );
}
