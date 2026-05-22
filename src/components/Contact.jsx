import React, { useState } from 'react';
import { Mail, Send, Check, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Get In Touch</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '5rem', maxWidth: '1050px', margin: '0 auto' }}>

          <div className="animate-on-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.9rem', marginBottom: '1.25rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Let's Connect</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.75, fontWeight: 300, marginBottom: '1rem' }}>
                I am currently open to internships, entry-level engineering roles, AI, and Data Analytics. and collaborative projects.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.75, fontWeight: 300 }}>
                Whether you have an opportunity to share or simply want to ask a question, my inbox is always open. Feel free to connect with me for opportunities, collaborations, or professional discussions.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <a href="mailto:saurabpal10@gmail.com" className="contact-info-card">
                <div className="contact-icon-wrapper">
                  <Mail size={20} />
                </div>
                <div>
                  <span style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Email</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 300 }}>saurabpal10@gmail.com</span>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/sauravpal10/" target="_blank" rel="noreferrer" className="contact-info-card">
                <div className="contact-icon-wrapper">
                  <LinkedinIcon size={20} />
                </div>
                <div>
                  <span style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>LinkedIn</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 300 }}>linkedin.com/in/sauravpal10</span>
                </div>
              </a>

              <a href="https://github.com/saurabpal10-byte" target="_blank" rel="noreferrer" className="contact-info-card">
                <div className="contact-icon-wrapper">
                  <GithubIcon size={20} />
                </div>
                <div>
                  <span style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>GitHub</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 300 }}>github.com/saurabpal10-byte</span>
                </div>
              </a>
            </div>
          </div>

          <div className="animate-on-scroll">
            <form onSubmit={handleSubmit} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', padding: '3rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="contact-input"
                  />
                  <span className="input-focus-line"></span>
                </div>
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="contact-input"
                  />
                  <span className="input-focus-line"></span>
                </div>
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Message</label>
                <div className="input-wrapper">
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="contact-input"
                    style={{ resize: 'vertical' }}
                  />
                  <span className="input-focus-line"></span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ marginTop: '1rem', width: '100%', borderRadius: '30px' }}
              >
                {isSubmitting ? (
                  <><Loader2 size={18} className="spinner" /> Sending Message</>
                ) : submitStatus === 'success' ? (
                  <><Check size={18} /> Message Sent</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>

              {submitStatus === 'success' && (
                <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', textAlign: 'center', margin: 0, fontWeight: 500 }}>
                  Thank you! Your message has been sent successfully.
                </p>
              )}
              {submitStatus === 'error' && (
                <p style={{ color: '#f87171', fontSize: '0.9rem', textAlign: 'center', margin: 0, fontWeight: 500 }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Styling injection for inputs, loaders and info cards */}
      <style>{`
        .input-wrapper {
          position: relative;
          width: 100%;
        }

        .input-focus-line {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
          box-shadow: 0 0 10px var(--accent-color), 0 0 18px var(--accent-color);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateX(-50%);
          pointer-events: none;
        }

        .contact-input:focus + .input-focus-line {
          width: 90%;
        }

        .contact-input {
          width: 100%; 
          padding: 0.85rem 1rem; 
          border-radius: 12px; 
          border: 1px solid rgba(229, 193, 88, 0.08); 
          background-color: rgba(255, 255, 255, 0.01); 
          color: white; 
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 300;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .contact-input:focus {
          outline: none;
          border-color: rgba(229, 193, 88, 0.45);
          background-color: rgba(229, 193, 88, 0.03);
          box-shadow: 0 0 15px rgba(229, 193, 88, 0.08);
        }
        
        .contact-info-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          border: 1px solid rgba(229, 193, 88, 0.06);
          border-radius: 16px;
          background-color: rgba(21, 19, 18, 0.3);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }
        
        .contact-info-card:hover {
          border-color: var(--accent-color);
          transform: translateX(5px);
          background-color: rgba(229, 193, 88, 0.02);
        }
        
        .contact-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: rgba(229, 193, 88, 0.05);
          border: 1px solid rgba(229, 193, 88, 0.1);
          color: var(--accent-color);
          transition: all 0.4s ease;
        }
        
        .contact-info-card:hover .contact-icon-wrapper {
          background-color: var(--accent-color);
          color: #0d0c0c;
          box-shadow: 0 0 10px rgba(229, 193, 88, 0.2);
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 900px) {
          #contact .container > div {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
