import React from 'react';

const Experience = () => {
  return (
    <section id="experience" className="section" style={{ backgroundColor: 'rgba(18, 17, 16, 0.2)' }}>
      <div className="container">
        <h2 className="section-title animate-on-scroll">Professional Experience</h2>

        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="glass-panel animate-on-scroll" style={{ position: 'relative', paddingLeft: '4rem', paddingRight: '3rem', paddingTop: '3rem', paddingBottom: '3rem' }}>
            {/* Timeline Line */}
            <div style={{
              position: 'absolute',
              left: '2rem',
              top: '2.5rem',
              bottom: '2.5rem',
              width: '1px',
              background: 'linear-gradient(180deg, var(--accent-color) 0%, rgba(229, 193, 88, 0.05) 100%)'
            }}></div>

            {/* Timeline Dot (Eclipse Orbiter) */}
            <div
              className="timeline-pulsating-dot"
              style={{
                position: 'absolute',
                left: '1.75rem',
                top: '3.3rem',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-color)',
                boxShadow: '0 0 10px var(--accent-color)'
              }}
            ></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
              <h3 style={{
                fontSize: '1.55rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 400
              }}>
                Software Engineering Intern
              </h3>
              <span style={{
                color: 'var(--accent-color)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                backgroundColor: 'rgba(229, 193, 88, 0.05)',
                border: '1px solid rgba(229, 193, 88, 0.12)',
                padding: '0.3rem 0.85rem',
                borderRadius: '50px'
              }}>
                08/2025 - 09/2025
              </span>
            </div>

            <h4 style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              marginBottom: '2rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              ShadowFox
            </h4>

            <ul style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.98rem', lineHeight: 1.7, fontWeight: 300 }}>
                <span style={{ color: 'var(--accent-color)', marginTop: '0.25rem' }}>▹</span>
                <span>Developed and maintained scalable backend APIs using Python and RESTful principles to support core product features.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.98rem', lineHeight: 1.7, fontWeight: 300 }}>
                <span style={{ color: 'var(--accent-color)', marginTop: '0.25rem' }}>▹</span>
                <span>Collaborated with the data science team to integrate machine learning models into the production pipeline.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.98rem', lineHeight: 1.7, fontWeight: 300 }}>
                <span style={{ color: 'var(--accent-color)', marginTop: '0.25rem' }}>▹</span>
                <span>Optimized database queries in MySQL, significantly reducing data retrieval times for large datasets.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pulsating animation keyframes injection */}
      <style>{`
        @keyframes timelinePulse {
          0% {
            box-shadow: 0 0 0 0 rgba(229, 193, 88, 0.4);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(229, 193, 88, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(229, 193, 88, 0);
          }
        }
        
        .timeline-pulsating-dot {
          animation: timelinePulse 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Experience;
