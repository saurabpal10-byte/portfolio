import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import profileImg from '../assets/profile_avatar.jpg';



// HTML5 Canvas dynamic neural network mesh with mouse attraction
const NeuralBackdrop = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const particleCount = 42;
    const connectionDistance = 120;
    const mouse = { x: null, y: null, radius: 160 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse attraction
        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 0.45;
            this.y += (dy / dist) * force * 0.45;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(229, 193, 88, 0.45)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(229, 193, 88, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvas) canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7
      }}
    />
  );
};

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <NeuralBackdrop />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid">

          {/* Left Column: Intro copy and CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-text-col"
          >
            {/* Status Badge */}
            <div className="status-badge animate-on-scroll visible">
              <span className="status-badge-dot"></span>
              <p className="status-badge-text">Available for Opportunities</p>
            </div>

            <h1 className="hero-title">
              Building intelligent systems that solve <span className="italic-accent">real-world problems.</span>
            </h1>



            <p className="hero-description">
              Final-year Information Science & Engineering student specializing in AI engineering, data analytics, and transforming ideas into scalable intelligent solutions.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View Work <ArrowRight size={16} />
              </a>
            </div>

            {/* Glowing Circular Social Frames */}
            <div className="hero-socials">
              <a
                href="https://www.linkedin.com/in/sauravpal10/"
                target="_blank"
                rel="noreferrer"
                className="social-icon-frame"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="https://github.com/saurabpal10-byte"
                target="_blank"
                rel="noreferrer"
                className="social-icon-frame"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href="mailto:[saurabpal10@gmail.com"
                className="social-icon-frame"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Headshot and Astronomical Orbit frames */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-image-col"
          >
            <div className="profile-container">
              {/* Shifting radial solar corona behind portrait */}
              <div className="profile-corona-glow"></div>

              {/* Conical framed headshot portrait */}
              <div className="profile-avatar-frame">
                <img src={profileImg} alt="Saurav K Pal" className="profile-avatar-img" />
              </div>

              {/* Concordant circular astronomical orbit */}
              <div className="profile-orbit-ring">
                {/* Rotating golden planet satellite */}
                <div className="profile-orbit-satellite"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Pulsing Golden Scroll Down Indicator */}
      <a href="#about" className="hero-scroll-indicator">
        <span className="mouse-wheel-track">
          <span className="mouse-wheel-dot"></span>
        </span>
      </a>

      {/* Embedded Component Stylesheet */}
      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 6rem;
          position: relative;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 5rem;
          align-items: center;
          width: 100%;
        }

        .hero-text-col {
          text-align: left;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.55rem 1.3rem;
          background-color: rgba(229, 193, 88, 0.03);
          border: 1px solid rgba(229, 193, 88, 0.12);
          border-radius: 50px;
          margin-bottom: 2.5rem;
        }

        .status-badge-dot {
          width: 6px;
          height: 6px;
          background-color: var(--accent-color);
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 12px var(--accent-color);
        }

        .status-badge-dot::before,
        .status-badge-dot::after {
          content: "";
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          border: 1px solid var(--accent-color);
          border-radius: 50%;
          animation: badgeRipple 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          opacity: 0;
          pointer-events: none;
        }

        .status-badge-dot::after {
          animation-delay: 1.1s;
        }

        @keyframes badgeRipple {
          0% {
            transform: scale(0.6);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.6);
            opacity: 0;
          }
        }

        .status-badge-text {
          color: var(--accent-color);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0;
        }

        .hero-title {
          font-size: clamp(2.75rem, 5.5vw, 4.5rem);
          line-height: 1.15;
          font-family: var(--font-serif);
          color: var(--text-primary);
          font-weight: 400;
          margin-bottom: 2rem;
        }

        .italic-accent {
          color: var(--accent-color);
          font-style: italic;
        }

        .hero-description {
          font-size: clamp(1.05rem, 1.8vw, 1.25rem);
          color: var(--text-secondary);
          max-width: 640px;
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 3.5rem;
        }

        .hero-actions {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .hero-socials {
          display: flex;
          gap: 1.25rem;
          margin-top: 5rem;
        }

        .social-icon-frame {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(229, 193, 88, 0.08);
          color: var(--text-secondary);
          background-color: rgba(255, 255, 255, 0.01);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .social-icon-frame:hover {
          color: var(--accent-color);
          border-color: var(--accent-color);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 4px 15px rgba(229, 193, 88, 0.15);
          background-color: rgba(229, 193, 88, 0.03);
        }

        /* Profile Photo Astronomical Frame */
        .hero-image-col {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .profile-container {
          position: relative;
          width: 380px;
          height: 380px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: -4.5rem;
          cursor: pointer;
        }

        .profile-corona-glow {
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(229, 193, 88, 0.09) 0%, rgba(229, 193, 88, 0.01) 70%, transparent 100%);
          filter: blur(30px);
          z-index: 0;
          pointer-events: none;
          animation: profilePulseCorona 8s ease-in-out infinite;
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .profile-container:hover .profile-corona-glow {
          transform: scale(1.18);
          background: radial-gradient(circle, rgba(229, 193, 88, 0.16) 0%, rgba(229, 193, 88, 0.03) 70%, transparent 100%);
          opacity: 1;
        }

        .profile-avatar-frame {
          position: relative;
          width: 290px;
          height: 290px;
          border-radius: 50%;
          border: 1px solid rgba(229, 193, 88, 0.2);
          background-color: rgba(21, 19, 18, 0.95);
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.65), 
            inset 0 0 20px rgba(229, 193, 88, 0.06);
          overflow: hidden;
          z-index: 2;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .profile-avatar-frame:hover {
          border-color: rgba(229, 193, 88, 0.5);
          box-shadow: 
            0 20px 50px rgba(229, 193, 88, 0.08), 
            inset 0 0 25px rgba(229, 193, 88, 0.12);
          transform: scale(1.02);
        }

        .profile-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: grayscale(12%) contrast(102%);
          transition: all 0.6s ease;
        }

        .profile-avatar-frame:hover .profile-avatar-img {
          filter: grayscale(0%) contrast(102%);
          transform: scale(1.03);
        }

        .profile-orbit-ring {
          position: absolute;
          width: 330px;
          height: 330px;
          border: 1px dashed rgba(229, 193, 88, 0.15);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          animation: profileOrbitRotate 55s linear infinite;
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .profile-container:hover .profile-orbit-ring {
          border-color: rgba(229, 193, 88, 0.45);
          transform: scale(1.06);
          border-style: solid;
          animation-duration: 18s;
        }

        .profile-orbit-satellite {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: var(--accent-color);
          border-radius: 50%;
          top: 50%;
          left: -4px;
          margin-top: -4px;
          box-shadow: 0 0 12px var(--accent-color);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .profile-container:hover .profile-orbit-satellite {
          transform: scale(1.6);
          box-shadow: 0 0 22px var(--accent-color), 0 0 40px var(--accent-color);
        }

        @keyframes profilePulseCorona {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        @keyframes profileOrbitRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1050px) {
          .hero-grid {
            gap: 3.5rem;
          }
          .profile-container {
            width: 330px;
            height: 330px;
          }
          .profile-avatar-frame {
            width: 250px;
            height: 250px;
          }
          .profile-orbit-ring {
            width: 290px;
            height: 290px;
          }
        }

        @media (max-width: 900px) {
          .hero-section {
            padding-top: 8rem;
            padding-bottom: 4rem;
          }
          
          .profile-container {
            margin-top: 0;
          }
          
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 4.5rem;
            text-align: center;
          }

          .hero-text-col {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-socials {
            justify-content: center;
            margin-top: 3.5rem;
          }

          .hero-image-col {
            grid-row: 1; /* Shift picture above copy on mobile */
          }
        }

        /* Pulsing Golden Scroll Down Indicator Styles */
        .hero-scroll-indicator {
          position: absolute;
          bottom: 2.25rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--text-secondary);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 10;
        }

        .hero-scroll-indicator:hover {
          color: var(--accent-color);
          transform: translateX(-50%) translateY(4px);
        }

        .mouse-wheel-track {
          width: 24px;
          height: 38px;
          border: 1px solid currentColor;
          border-radius: 20px;
          position: relative;
          display: block;
          opacity: 0.45;
          transition: all 0.4s ease;
        }

        .hero-scroll-indicator:hover .mouse-wheel-track {
          opacity: 1;
          border-color: var(--accent-color);
        }

        .mouse-wheel-dot {
          width: 3px;
          height: 7px;
          background-color: var(--accent-color);
          border-radius: 50%;
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          animation: scrollDotAnimation 1.8s ease-in-out infinite;
        }

        @keyframes scrollDotAnimation {
          0% {
            opacity: 0;
            top: 6px;
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            top: 22px;
          }
        }

        @media (max-width: 900px), (max-height: 720px) {
          .hero-scroll-indicator {
            display: none;
          }
        }


      `}</style>
    </section>
  );
};

export default Hero;
