import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BarChart3, Boxes, Rocket } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">About Me</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          <div className="animate-on-scroll">
            <h3 style={{
              fontSize: '1.8rem',
              marginBottom: '1.75rem',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-serif)'
            }}>
              Professional Summary
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: 1.75, fontWeight: 300 }}>
              My name is Saurav Pal, and I have completed my B.Tech in Information Science & Engineering from Presidency University, Bangalore. I am passionate about artificial intelligence, software development, and data analytics, with a strong interest in building intelligent systems that solve real-world problems efficiently.

              During my academic journey, I completed certifications in Machine Learning using Python from Infosys and Data Analytics from Deloitte, which strengthened my understanding of machine learning, data visualization, analytical thinking, and business-oriented problem solving. I have also worked on several technical projects that enhanced my practical skills in AI, computer vision, and backend development.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.75, fontWeight: 300 }}>
              One of my key projects was AI Derma, an AI-based dermatological analysis system for preliminary skin condition identification using machine learning and image processing. I also developed a Traffic Sign Detection system using computer vision techniques for real-time sign classification. In my final-year project, I contributed to developing a smart Tourism Platform for Jharkhand that helps users discover destinations, generate travel recommendations, and plan trips efficiently.
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.75, fontWeight: 300 }}>
              Apart from academics, I actively participated in sports and served as the captain of my college volleyball team, which helped me develop leadership, teamwork, discipline, and communication skills.
            </p>
          </div>

          <div className="animate-on-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Education Timeline Card */}
            <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', padding: '2.5rem' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'linear-gradient(180deg, var(--accent-color), transparent)' }}></div>
              <h4 style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2rem' }}>Education</h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem', position: 'relative' }}>
                {/* 1. B.Tech Entry */}
                <div style={{ position: 'relative', paddingLeft: '1.75rem' }}>
                  {/* Outer active ring dot */}
                  <div style={{ position: 'absolute', left: '-4.5px', top: '7px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-color)', boxShadow: '0 0 10px var(--accent-color)' }}></div>
                  {/* Connecting track line */}
                  <div className="timeline-track-line" style={{ position: 'absolute', left: '0px', top: '17px', bottom: '-28px', width: '1px', backgroundColor: 'rgba(229, 193, 88, 0.15)', overflow: 'hidden' }}>
                    <div className="timeline-track-laser"></div>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 400 }}>B.Tech Information Science & Engineering</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 300 }}>Presidency University</p>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.85rem',
                    background: 'rgba(229, 193, 88, 0.04)',
                    border: '1px solid rgba(229, 193, 88, 0.12)',
                    color: 'var(--accent-color)',
                    borderRadius: '50px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}>
                    2022 – 2026
                  </span>
                </div>

                {/* 2. PUC Entry */}
                <div style={{ position: 'relative', paddingLeft: '1.75rem' }}>
                  {/* Outer concentric hollow dot */}
                  <div style={{ position: 'absolute', left: '-4px', top: '7px', width: '9px', height: '9px', borderRadius: '50%', border: '1px solid var(--accent-color)', backgroundColor: 'var(--bg-color)' }}></div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Pre-University Course (PUC)</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.35rem', fontSize: '0.9rem', fontWeight: 300 }}>St Joseph’s PU College • Karwar, India</p>
                  <p style={{ color: 'var(--accent-color)', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.02em' }}>Percentage: 91.6%</p>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.85rem',
                    background: 'rgba(229, 193, 88, 0.04)',
                    border: '1px solid rgba(229, 193, 88, 0.12)',
                    color: 'var(--accent-color)',
                    borderRadius: '50px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}>
                    2020 – 2022
                  </span>
                </div>
              </div>
            </div>

            {/* Technical Mindset Card */}
            <div className="mindset-card">
              {/* Subtle dot matrix grid in the top-right corner */}
              <div className="mindset-dot-grid">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="mindset-dot"></div>
                ))}
              </div>

              {/* Title Section */}
              <div className="mindset-header">
                <div className="mindset-header-icon">
                  <Brain size={24} />
                </div>
                <div>
                  <h4 className="mindset-title">
                    <span style={{ color: 'var(--accent-color)', fontWeight: 700 }}>TECHNICAL</span>{' '}
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>MINDSET</span>
                  </h4>
                  <div className="mindset-header-bar"></div>
                </div>
              </div>

              {/* Rows */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Row 1: Analytical */}
                <div className="mindset-row">
                  <div className="mindset-row-icon-wrapper">
                    <BarChart3 size={22} />
                  </div>
                  <div className="mindset-row-divider"></div>
                  <div className="mindset-row-text">
                    <h5 className="mindset-row-title">Analytical & Data-Driven Problem Solving</h5>
                    <p className="mindset-row-description">
                      I approach problems with a data-first mindset, extracting insights, analyzing patterns, and building solutions that create real impact.
                    </p>
                  </div>
                </div>

                {/* Row 2: Clean Architecture */}
                <div className="mindset-row">
                  <div className="mindset-row-icon-wrapper">
                    <Boxes size={22} />
                  </div>
                  <div className="mindset-row-divider"></div>
                  <div className="mindset-row-text">
                    <h5 className="mindset-row-title">Clean, Scalable & Maintainable Architecture</h5>
                    <p className="mindset-row-description">
                      I write clean, modular code and design scalable systems that are efficient, reliable, and easy to maintain.
                    </p>
                  </div>
                </div>

                {/* Row 3: Continuous learning & optimization */}
                <div className="mindset-row">
                  <div className="mindset-row-icon-wrapper">
                    <Rocket size={22} />
                  </div>
                  <div className="mindset-row-divider"></div>
                  <div className="mindset-row-text">
                    <h5 className="mindset-row-title">Continuous Learning & Backend Performance Optimization</h5>
                    <p className="mindset-row-description">
                      I stay curious, keep learning new technologies, and constantly optimize backend performance to build fast, robust, and future-ready applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Embedded Component Stylesheet */}
      <style>{`
        .mindset-card {
          position: relative;
          padding: 2.75rem 2.5rem;
          border: 1px solid rgba(229, 193, 88, 0.08);
          border-radius: 20px;
          background: linear-gradient(145deg, rgba(21, 19, 18, 0.45) 0%, rgba(13, 12, 12, 0.6) 100%);
          box-shadow: 
            0 15px 40px rgba(0, 0, 0, 0.55),
            inset 0 0 20px rgba(229, 193, 88, 0.01);
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mindset-card:hover {
          border-color: rgba(229, 193, 88, 0.15);
          box-shadow: 
            0 20px 45px rgba(0, 0, 0, 0.65), 
            0 0 30px rgba(229, 193, 88, 0.03),
            inset 0 0 25px rgba(229, 193, 88, 0.03);
          transform: translateY(-2px);
        }

        .mindset-dot-grid {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          display: grid;
          grid-template-columns: repeat(4, 4px);
          gap: 6px;
          opacity: 0.2;
          pointer-events: none;
        }

        .mindset-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: var(--accent-color);
        }

        .mindset-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
          position: relative;
        }

        .mindset-header-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid rgba(229, 193, 88, 0.3);
          background-color: rgba(229, 193, 88, 0.03);
          color: var(--accent-color);
          box-shadow: 
            0 0 15px rgba(229, 193, 88, 0.1),
            inset 0 0 10px rgba(229, 193, 88, 0.05);
        }

        .mindset-title {
          font-size: 1.25rem;
          letter-spacing: 0.08em;
          margin: 0;
          line-height: 1.2;
          font-family: inherit;
        }

        .mindset-header-bar {
          width: 45px;
          height: 2px;
          background-color: var(--accent-color);
          margin-top: 0.55rem;
          border-radius: 50px;
        }

        .mindset-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          transition: all 0.4s ease;
        }

        .mindset-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .mindset-row:first-child {
          padding-top: 0.5rem;
        }

        .mindset-row-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid rgba(229, 193, 88, 0.15);
          background-color: rgba(255, 255, 255, 0.01);
          color: var(--accent-color);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }

        .mindset-row:hover .mindset-row-icon-wrapper {
          border-color: var(--accent-color);
          background-color: rgba(229, 193, 88, 0.04);
          box-shadow: 0 0 15px rgba(229, 193, 88, 0.15);
          transform: scale(1.05);
        }

        .mindset-row-divider {
          width: 1.5px;
          height: 48px;
          background: linear-gradient(180deg, var(--accent-color) 0%, rgba(229, 193, 88, 0.15) 100%);
          flex-shrink: 0;
          opacity: 0.85;
          transition: all 0.4s ease;
        }

        .mindset-row:hover .mindset-row-divider {
          opacity: 1;
          box-shadow: 0 0 8px rgba(229, 193, 88, 0.5);
        }

        .mindset-row-text {
          flex-grow: 1;
        }

        .mindset-row-title {
          font-size: 1.05rem;
          color: #ffffff;
          font-weight: 600;
          margin: 0 0 0.35rem 0;
          font-family: inherit;
          letter-spacing: 0.01em;
          transition: color 0.3s ease;
        }

        .mindset-row:hover .mindset-row-title {
          color: var(--accent-color);
        }

        .mindset-row-description {
          font-size: 0.88rem;
          color: var(--text-secondary);
          font-weight: 300;
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .mindset-row {
            gap: 1rem !important;
          }
          .mindset-row-icon-wrapper {
            width: 44px !important;
            height: 44px !important;
          }
          .mindset-row-divider {
            height: 58px !important;
          }
        }

        /* Dotted Matrix Flicker Animation */
        .mindset-card:hover .mindset-dot {
          animation: dotTwinkle 1.6s ease-in-out infinite alternate;
        }

        .mindset-card:hover .mindset-dot:nth-child(4n) {
          animation-delay: 0.15s;
        }
        .mindset-card:hover .mindset-dot:nth-child(4n+1) {
          animation-delay: 0.3s;
        }
        .mindset-card:hover .mindset-dot:nth-child(4n+2) {
          animation-delay: 0.45s;
        }
        .mindset-card:hover .mindset-dot:nth-child(4n+3) {
          animation-delay: 0.6s;
        }

        @keyframes dotTwinkle {
          0% {
            opacity: 0.25;
            transform: scale(0.85);
            background-color: var(--accent-color);
            box-shadow: none;
          }
          100% {
            opacity: 1;
            transform: scale(1.3);
            background-color: #ffffff;
            box-shadow: 0 0 6px #ffffff, 0 0 10px var(--accent-color);
          }
        }

        /* Timeline Running Laser Pulse */
        .timeline-track-laser {
          position: absolute;
          top: -100px;
          left: 0;
          width: 100%;
          height: 60px;
          background: linear-gradient(180deg, transparent, var(--accent-color), transparent);
          animation: timelineLaser 4.5s linear infinite;
        }

        @keyframes timelineLaser {
          0% {
            top: -100px;
          }
          100% {
            top: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
