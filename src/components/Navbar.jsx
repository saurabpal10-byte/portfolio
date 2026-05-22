import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import profileImg from '../assets/profile_avatar.jpg';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'blog', label: 'Blog and Events' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background shading on scroll
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ['hero', ...navItems.map(item => item.id)];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{ 
      background: scrolled ? 'rgba(13, 12, 12, 0.85)' : 'rgba(13, 12, 12, 0.4)',
      boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.4)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(229, 193, 88, 0.08)' : '1px solid rgba(229, 193, 88, 0.02)'
    }}>
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={() => setActiveSection('hero')} style={{ 
          letterSpacing: '0.15em', 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem'
        }}>
          <img 
            src={profileImg} 
            alt="Saurav K Pal Logo" 
            style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              border: '1.5px solid var(--accent-color)',
              objectFit: 'cover',
              boxShadow: '0 0 10px rgba(229, 193, 88, 0.2)'
            }} 
          />
          SAURAV K PAL
        </a>
        
        {/* Desktop Nav */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ 
            display: 'none', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            border: '1px solid rgba(229, 193, 88, 0.1)', 
            backgroundColor: 'rgba(255, 255, 255, 0.02)' 
          }}
        >
          {mobileMenuOpen ? <X size={20} color="var(--accent-color)" /> : <Menu size={20} color="white" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{ 
          background: 'rgba(18, 17, 16, 0.98)', 
          backdropFilter: 'blur(20px)',
          padding: '2rem 1.5rem', 
          borderBottom: '1px solid rgba(229, 193, 88, 0.1)', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.25rem',
          position: 'absolute',
          top: '5rem',
          left: 0,
          right: 0,
          zIndex: 99
        }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{ 
                color: activeSection === item.id ? 'var(--accent-color)' : 'var(--text-secondary)', 
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.02)'
              }}
              onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* CSS injection for mobile menu toggle visibility */}
      <style>{`
        @media (max-width: 900px) {
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
