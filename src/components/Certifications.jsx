import React from 'react';
import { Award, ArrowUpRight } from 'lucide-react';

const certifications = [
  {
    name: 'Prompt Design in Vertex AI Skill Badge',
    issuer: 'Google Cloud',
    year: '2026',
    description: 'Complete the introductory Prompt Design in Vertex AI skill badge to demonstrate skills in the following: prompt engineering, image analysis, and multimodal generative techniques, within Vertex AI. Discover how to craft effective prompts, guide generative AI output, and apply Gemini models to real-world marketing scenarios.',
    skills: ['Artificial Intelligence (AI)', 'Gemini APIs', 'Generative AI', 'Prompt Engineering'],
    link: 'https://www.credly.com/users/saurav-pal10'
  },
  {
    name: 'Explore Machine Learning Using Python',
    issuer: 'Infosys Springboard',
    description: 'Completed the Explore Machine Learning Using Python certification from Infosys Springboard, gaining foundational knowledge in data preprocessing, exploratory data analysis, predictive modeling, supervised learning, model evaluation, and data visualization while developing hands-on experience with Python-based machine learning techniques for solving real-world data-driven problems.',
    year: '2025',
    skills: ['Predictive Modeling', 'Supervised Learning', 'Python'],
    link: 'https://www.credly.com/users/saurav-pal10'
  },
  {
    name: 'Data Analytics Job Simulation Virtual Experience',
    issuer: 'Deloitte',
    year: '2025',
    description: 'Completed the Data Analytics Job Simulation program by Deloitte, gaining practical experience in data analysis, data visualization, business intelligence, and problem-solving through real-world analytical tasks. Developed skills in interpreting complex datasets, creating meaningful insights, and applying analytical thinking to support data-driven business decisions using modern analytics and visualization concepts.',
    skills: ['Data Visualization', 'Business Intelligence', 'Data Analysis'],
    link: 'https://www.credly.com/users/saurav-pal10'
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="section" style={{ backgroundColor: 'rgba(18, 17, 16, 0.4)' }}>
      <div className="container">
        <h2 className="section-title animate-on-scroll">Certifications</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {certifications.map((cert, idx) => {
            const isClickable = !!cert.link;
            const CardComponent = isClickable ? 'a' : 'div';

            return (
              <CardComponent
                key={idx}
                href={isClickable ? cert.link : undefined}
                target={isClickable ? '_blank' : undefined}
                rel={isClickable ? 'noopener noreferrer' : undefined}
                className={`glass-panel animate-on-scroll cert-card ${isClickable ? 'clickable' : ''}`}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  padding: '2.5rem',
                  position: 'relative',
                  cursor: isClickable ? 'pointer' : 'default',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                {/* External Credential Hyperlink Icon */}
                {isClickable && (
                  <div className="cert-link-icon" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'rgba(229, 193, 88, 0.3)', transition: 'color 0.3s ease' }}>
                    <ArrowUpRight size={18} />
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{
                    padding: '0.85rem',
                    backgroundColor: 'rgba(229, 193, 88, 0.04)',
                    border: '1px solid rgba(229, 193, 88, 0.12)',
                    borderRadius: '14px',
                    color: 'var(--accent-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(229, 193, 88, 0.03)',
                    flexShrink: 0
                  }}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.15rem',
                      marginBottom: '0.35rem',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 400,
                      lineHeight: 1.3
                    }}>
                      {cert.name}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 300 }}>
                      {cert.issuer} &bull; {cert.year}
                    </p>
                  </div>
                </div>

                {cert.description && (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 300, margin: '0.5rem 0 0 0' }}>
                    {cert.description}
                  </p>
                )}

                {cert.skills && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          fontSize: '0.68rem',
                          color: 'var(--accent-color)',
                          fontWeight: 500,
                          backgroundColor: 'rgba(229, 193, 88, 0.03)',
                          border: '1px solid rgba(229, 193, 88, 0.08)',
                          padding: '0.25rem 0.7rem',
                          borderRadius: '50px',
                          letterSpacing: '0.02em',
                          textTransform: 'uppercase'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </CardComponent>
            );
          })}
        </div>
      </div>

      <style>{`
        .cert-card {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        
        .cert-card:hover {
          border-color: var(--accent-color);
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.55), 
            0 0 25px rgba(229, 193, 88, 0.04),
            inset 0 0 15px rgba(229, 193, 88, 0.02);
          transform: translateY(-5px) scale(1.02);
        }

        .cert-card.clickable:hover {
          border-color: rgba(229, 193, 88, 0.5);
          box-shadow: 
            0 20px 45px rgba(0, 0, 0, 0.6), 
            0 0 35px rgba(229, 193, 88, 0.07),
            inset 0 0 20px rgba(229, 193, 88, 0.03);
          transform: translateY(-6px) scale(1.025);
        }

        .cert-link-icon {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .cert-card.clickable:hover .cert-link-icon {
          color: var(--accent-color) !important;
          transform: translate(3px, -3px);
        }
      `}</style>
    </section>
  );
};

export default Certifications;
