import React, { useEffect, useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Blog from './components/Blog';
import Contact from './components/Contact';

function App() {
  const [ripples, setRipples] = useState([]);

  // Intersection Observer for fade-in animations with minimal offsets
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.05,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Performance-optimized dynamic spotlight and LERPed trail tracking
  useEffect(() => {
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const trail = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationFrameId = null;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const tick = () => {
      // Linear interpolation (LERP): trail slides towards mouse coordinates with 0.08 smoothing lag
      trail.x += (mouse.x - trail.x) * 0.08;
      trail.y += (mouse.y - trail.y) * 0.08;

      document.documentElement.style.setProperty('--trail-x', `${Math.round(trail.x)}px`);
      document.documentElement.style.setProperty('--trail-y', `${Math.round(trail.y)}px`);

      animationFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove);
    tick();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Click-triggered gravitational ripple shockwave spawner
  const handleGlobalClick = (e) => {
    const newRipple = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    
    setRipples((prev) => [...prev, newRipple]);

    // Automatically prune ripples after the animation finishes (1s)
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  // Generate static celestial coordinates for twinkling starfield once on mount
  const stars = useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x-axis
      y: Math.random() * 100, // percentage y-axis
      size: Math.random() * 1.5 + 0.6, // star width/height
      opacity: Math.random() * 0.5 + 0.15, // base opacity
      twinkleSpeed: Math.random() * 3 + 2.5, // animation duration
    }));
  }, []);

  return (
    <div className="app-container" onClick={handleGlobalClick} style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* 1. Root Celestial Fixed Background Container */}
      <div className="celestial-bg">
        {/* Astronomical blueprint concentric grid rings */}
        <div className="astronomical-grid"></div>

        {/* Twinkling coordinate starfield */}
        <div className="star-container">
          {stars.map((star) => (
            <div
              key={star.id}
              className="celestial-star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                '--base-opacity': star.opacity,
                '--twinkle-speed': `${star.twinkleSpeed}s`,
              }}
            />
          ))}
        </div>

        {/* Fluid shifting atmospheric solar orbs / nebulae */}
        <div className="morphing-nebula-container">
          <div className="morphing-nebula nebula-gold"></div>
          <div className="morphing-nebula nebula-bronze"></div>
        </div>
      </div>

      {/* 2. Interactive Click Ripples Portals */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="gravitational-ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}

      {/* 3. Hero Solar Corona Accent Layer (relative to scroll context) */}
      <div style={{
        position: 'absolute',
        top: '25vh',
        left: '50%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(229, 193, 88, 0.055) 0%, rgba(229, 193, 88, 0.01) 70%, transparent 100%)',
        filter: 'blur(60px)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'pulseCorona 9s ease-in-out infinite'
      }}></div>

      {/* 4. Portfolio Content Layout */}
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Blog />
        <Contact />
      </main>
      
      <footer style={{ padding: '3.5rem 0', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid rgba(229, 193, 88, 0.03)', marginTop: '4rem', position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: '0.9rem', letterSpacing: '0.05em' }}>© {new Date().getFullYear()} Saurav K Pal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
