import React, { useState, useEffect } from 'react';
import { Calendar, Plus, X, Lock, Camera, Trash2, Loader2, BookOpen, Eye } from 'lucide-react';

const API_BASE = import.meta.env.DEV ? `http://${window.location.hostname}:5000` : '';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Creator Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passcode, setPasscode] = useState(() => {
    try {
      return localStorage.getItem('saurav_passcode') || '';
    } catch (e) {
      return '';
    }
  });
  const [savePasscode, setSavePasscode] = useState(true);
  const [form, setForm] = useState({ title: '', content: '', event_date: '', image: '' });
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lightbox view for image zoom
  const [zoomImage, setZoomImage] = useState(null);

  // Full blog post reading view state
  const [selectedPost, setSelectedPost] = useState(null);

  // Format date safely to avoid any locale/parsing crashes
  const formatDate = (dateStr) => {
    try {
      if (!dateStr) return 'Date N/A';
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return dateStr;
      }
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        timeZone: 'UTC' 
      });
    } catch (e) {
      return dateStr || 'Date N/A';
    }
  };

  // Fetch posts from backend
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not load thoughts. Ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Trigger scroll-entry animations for dynamically loaded elements (skeletons, posts, error states)
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
      threshold: 0.02,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const blogSection = document.getElementById('blog');
    if (blogSection) {
      const elements = blogSection.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, posts, error]);

  // Handle escape key listener to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPost(null);
        setIsModalOpen(false);
        setZoomImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle Image Conversion to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setFormError('Image size is too large (maximum 8MB)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
      setFormError(null);
    };
    reader.onerror = () => {
      setFormError('Error reading file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  // Submit new thought
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    if (!form.title.trim() || !form.content.trim() || !form.event_date) {
      setFormError('Title, event date, and thoughts content are required.');
      setIsSubmitting(false);
      return;
    }

    if (!passcode) {
      setFormError('Passcode is required to post thoughts.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          passcode
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit post');
      }

      // Save passcode if requested safely
      if (savePasscode) {
        try {
          localStorage.setItem('saurav_passcode', passcode);
        } catch (e) {}
      } else {
        try {
          localStorage.removeItem('saurav_passcode');
        } catch (e) {}
      }

      // Reset form and close modal
      setForm({ title: '', content: '', event_date: '', image: '' });
      setIsModalOpen(false);
      fetchPosts();
    } catch (err) {
      setFormError(err.message || 'Network error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete a thought
  const handleDelete = async (postId) => {
    const code = passcode || prompt('Enter passcode to delete this post:');
    if (!code) return;

    if (confirm('Are you sure you want to delete this event/thought?')) {
      try {
        const response = await fetch(`${API_BASE}/api/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-passcode': code
          }
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || 'Failed to delete post');
        }

        // Cache valid passcode if successfully deleted safely
        if (savePasscode && code) {
          setPasscode(code);
          try {
            localStorage.setItem('saurav_passcode', code);
          } catch (e) {}
        }

        fetchPosts();
      } catch (err) {
        alert(err.message || 'Failed to delete post');
      }
    }
  };

  return (
    <section id="blog" className="section" style={{ backgroundColor: 'rgba(13, 12, 12, 0.2)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '4rem' }}>
          <h2 className="section-title animate-on-scroll" style={{ marginBottom: 0 }}>
            Blog and Events
          </h2>
          
          <button 
            className="btn-create-post animate-on-scroll"
            onClick={() => setIsModalOpen(true)}
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.4rem',
              backgroundColor: 'rgba(229, 193, 88, 0.04)',
              border: '1px solid rgba(229, 193, 88, 0.15)',
              borderRadius: '50px',
              color: 'var(--accent-color)',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 4px 15px rgba(229, 193, 88, 0.02)'
            }}
          >
            <Plus size={16} /> Write Thought
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderColor: 'rgba(239, 68, 68, 0.2)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            <p style={{ color: '#ef4444', fontSize: '0.95rem' }}>{error}</p>
            <button 
              onClick={fetchPosts} 
              style={{ marginTop: '1rem', color: 'var(--accent-color)', textDecoration: 'underline', fontSize: '0.85rem' }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Skeletons/Loading State */}
        {loading ? (
          <div className="blog-grid">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-panel blog-skeleton" style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2.5rem' }}>
                <div style={{ width: '40%', height: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}></div>
                <div style={{ width: '80%', height: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', margin: '0.5rem 0' }}></div>
                <div style={{ width: '100%', height: '120px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}></div>
                <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', marginTop: 'auto' }}></div>
                <div style={{ width: '60%', height: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}></div>
              </div>
            ))}
          </div>
        ) : !error && (!Array.isArray(posts) || posts.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem' }} className="animate-on-scroll">
            <div style={{ display: 'inline-flex', padding: '1.25rem', borderRadius: '50%', backgroundColor: 'rgba(229, 193, 88, 0.02)', border: '1px solid rgba(229, 193, 88, 0.05)', color: 'rgba(229, 193, 88, 0.3)', marginBottom: '1.5rem' }}>
              <BookOpen size={36} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 400, marginBottom: '0.5rem' }}>No events or thoughts posted yet</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 1.5rem auto', fontWeight: 300 }}>
              Use the "+ Write Thought" button to share what you have been working on, local hackathons, major tech events, or simply write down your personal thoughts!
            </p>
          </div>
        ) : (
          /* Actual Blog Post Grid */
          <div className="blog-grid">
            {(Array.isArray(posts) ? posts : []).map((post, idx) => (
              <article 
                key={post.id} 
                className="glass-panel animate-on-scroll blog-card"
                onClick={() => setSelectedPost(post)}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 0,
                  overflow: 'hidden',
                  height: '100%',
                  minHeight: '420px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                {/* Delete button */}
                <button
                  className="blog-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(post.id);
                  }}
                  title="Delete this entry"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 10,
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(15, 12, 12, 0.65)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.6,
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(5px)'
                  }}
                >
                  <Trash2 size={14} />
                </button>

                {/* Event Image Banner (Optional) */}
                {post.image ? (
                  <div 
                    className="blog-image-wrapper" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomImage(post.image);
                    }}
                  >
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="blog-card-image"
                      loading="lazy"
                    />
                    <div className="blog-image-overlay">
                      <Eye size={20} color="var(--accent-color)" />
                    </div>
                  </div>
                ) : (
                  <div style={{
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(229, 193, 88, 0.01) 0%, rgba(13, 12, 12, 0.1) 100%)',
                    borderBottom: '1px solid rgba(229, 193, 88, 0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(229, 193, 88, 0.05)',
                    flexShrink: 0
                  }}>
                    <BookOpen size={48} />
                  </div>
                )}

                {/* Card Content Area */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '1rem' }}>
                  {/* Event Date badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-color)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.02em' }}>
                    <Calendar size={13} />
                    <span>{formatDate(post.event_date)}</span>
                  </div>

                  <h3 className="blog-card-title">
                    {post.title}
                  </h3>

                  <p className="blog-card-text">
                    {post.content}
                  </p>

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.3s ease' }} className="blog-read-more">
                    <span>Read Full Story</span>
                    <BookOpen size={14} className="blog-read-more-icon" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Modal: Write Thoughts Creator */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px', width: '90%', padding: '2.5rem', overflowY: 'auto', maxHeight: '90vh' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Plus size={20} color="var(--accent-color)" /> Write Thought
                </h3>
                <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} className="modal-close-btn">
                  <X size={20} />
                </button>
              </div>

              {formError && (
                <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: '10px', color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* 1. Passcode Check */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    <Lock size={12} /> Owner Passcode
                  </label>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    required
                    placeholder="Enter passcode to authenticate"
                    className="blog-input"
                    style={{ fontFamily: 'sans-serif' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
                    <input
                      type="checkbox"
                      id="savePasscode"
                      checked={savePasscode}
                      onChange={(e) => setSavePasscode(e.target.checked)}
                      style={{ cursor: 'pointer', accentColor: 'var(--accent-color)' }}
                    />
                    <label htmlFor="savePasscode" style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', cursor: 'pointer', userSelect: 'none' }}>
                      Keep me authenticated on this device
                    </label>
                  </div>
                </div>

                {/* 2. Event Title */}
                <div>
                  <label htmlFor="post-title" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Event Title
                  </label>
                  <input
                    type="text"
                    id="post-title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    placeholder="e.g. Google Vertex AI Hackathon"
                    className="blog-input"
                  />
                </div>

                {/* 3. Event Date */}
                <div>
                  <label htmlFor="post-date" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="post-date"
                    value={form.event_date}
                    onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                    required
                    className="blog-input"
                  />
                </div>

                {/* 4. Thoughts text */}
                <div>
                  <label htmlFor="post-content" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Thoughts & Description
                  </label>
                  <textarea
                    id="post-content"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    required
                    placeholder="Write your experience, technical thoughts, or event summary..."
                    className="blog-textarea"
                    rows={5}
                  />
                </div>

                {/* 5. Image Upload */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Event Photo (Optional)
                  </label>
                  
                  {form.image ? (
                    <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(229,193,88,0.2)', maxHeight: '200px' }}>
                      <img src={form.image} alt="Preview" style={{ width: '100%', height: '100%', maxHeight: '198px', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, image: '' })}
                        style={{
                          position: 'absolute',
                          top: '0.5rem',
                          right: '0.5rem',
                          padding: '0.35rem',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="blog-upload-area">
                      <input
                        type="file"
                        id="post-image"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="post-image" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '2rem 1rem' }}>
                        <div style={{ color: 'var(--accent-color)', opacity: 0.6 }}>
                          <Camera size={32} />
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Click to upload event image</span>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)' }}>PNG, JPG, or WEBP (Max 8MB)</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      flex: 1,
                      padding: '0.8rem',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      textAlign: 'center',
                      backgroundColor: 'rgba(255,255,255,0.01)',
                      transition: 'all 0.2s'
                    }}
                    className="modal-cancel-btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      flex: 1.5,
                      padding: '0.8rem',
                      border: '1px solid rgba(229, 193, 88, 0.25)',
                      borderRadius: '12px',
                      color: 'var(--bg-color)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      backgroundColor: 'var(--accent-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 4px 20px rgba(229, 193, 88, 0.15)'
                    }}
                    className="modal-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Publishing...
                      </>
                    ) : (
                      'Publish Thought'
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* Lightbox Zoom Portal */}
        {zoomImage && (
          <div className="modal-overlay" style={{ zIndex: 1000 }} onClick={() => setZoomImage(null)}>
            <button 
              onClick={() => setZoomImage(null)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                color: '#fff',
                backgroundColor: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1001,
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
            <div 
              style={{ 
                maxWidth: '90%', 
                maxHeight: '90%', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                border: '1px solid rgba(229,193,88,0.2)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.9)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={zoomImage} 
                alt="Zoomed Event View" 
                style={{ width: '100%', height: 'auto', maxHeight: '85vh', objectFit: 'contain', display: 'block' }} 
              />
            </div>
          </div>
        )}

        {/* Modal: Read Full Blog Post */}
        {selectedPost && (
          <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
            <div className="modal-content glass-panel blog-read-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px', width: '92%', padding: 0, overflowY: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: '1px solid rgba(229, 193, 88, 0.2)' }}>
              
              {/* Top Banner (Optional Image or styled gradient) */}
              {selectedPost.image ? (
                <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={selectedPost.image} alt={selectedPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, rgba(13, 12, 12, 0.95), transparent)' }}></div>
                  <button 
                    onClick={() => setSelectedPost(null)} 
                    style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#fff', backgroundColor: 'rgba(13, 12, 12, 0.75)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', cursor: 'pointer', zIndex: 10 }}
                    className="modal-close-btn"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div style={{ position: 'relative', width: '100%', padding: '2.5rem 2.5rem 1rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 500 }}>
                    <Calendar size={14} />
                    <span>{formatDate(selectedPost.event_date)}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedPost(null)} 
                    style={{ color: 'var(--text-secondary)', transition: 'all 0.3s ease', cursor: 'pointer' }} 
                    className="modal-close-btn"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              {/* Scrollable Content Container */}
              <div className="blog-modal-body" style={{ padding: selectedPost.image ? '1.5rem 2.5rem 2.5rem 2.5rem' : '0 2.5rem 2.5rem 2.5rem', overflowY: 'auto', flexGrow: 1 }}>
                {selectedPost.image && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 500, marginBottom: '1rem' }}>
                    <Calendar size={14} />
                    <span>{formatDate(selectedPost.event_date)}</span>
                  </div>
                )}
                
                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 400, lineHeight: '1.3', marginBottom: '1.5rem' }}>
                  {selectedPost.title}
                </h2>
                
                <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--accent-color)', opacity: 0.6, marginBottom: '2rem' }}></div>
                
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', lineHeight: '1.8', fontWeight: 300, whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'var(--font-sans)', letterSpacing: '0.01em' }}>
                  {selectedPost.content}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>

      <style>{`
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2.5rem;
          margin-top: 1rem;
        }

        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .blog-card {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blog-card:hover {
          border-color: rgba(229, 193, 88, 0.35) !important;
          box-shadow: 0 20px 45px rgba(229, 193, 88, 0.05), 0 2px 25px rgba(0, 0, 0, 0.5) !important;
          transform: translateY(-5px);
        }

        .blog-card:hover .blog-delete-btn {
          opacity: 1;
        }

        .blog-delete-btn {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .blog-delete-btn:hover {
          background-color: #ef4444 !important;
          color: white !important;
          transform: scale(1.1) rotate(5deg);
        }

        .blog-image-wrapper {
          height: 200px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          border-bottom: 1px solid rgba(229, 193, 88, 0.05);
          flex-shrink: 0;
        }

        .blog-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blog-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(13, 12, 12, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
          backdrop-filter: blur(3px);
        }

        .blog-image-wrapper:hover .blog-card-image {
          transform: scale(1.05) rotate(0.5deg);
        }

        .blog-image-wrapper:hover .blog-image-overlay {
          opacity: 1;
        }

        .blog-card-title {
          font-size: 1.35rem;
          color: var(--text-primary);
          font-family: var(--font-serif);
          font-weight: 400;
          line-height: 1.3;
          letter-spacing: -0.01em;
          transition: color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blog-card:hover .blog-card-title {
          color: var(--accent-color);
        }

        .blog-read-more {
          color: var(--accent-color);
          opacity: 0.85;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blog-card:hover .blog-read-more {
          color: #fff !important;
          opacity: 1;
          transform: translateX(4px);
        }

        .blog-read-more-icon {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blog-card:hover .blog-read-more-icon {
          transform: scale(1.15) rotate(5deg);
        }

        .blog-card-text {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.65;
          font-weight: 300;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.3s ease;
        }

        .blog-card:hover .blog-card-text {
          color: #e5e0d8;
        }

        .btn-create-post {
          position: relative;
        }

        .btn-create-post::after {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 50px;
          border: 1px solid rgba(229, 193, 88, 0.25);
          opacity: 0;
          pointer-events: none;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-create-post:hover::after {
          transform: scale(1.06);
          opacity: 1;
          border-color: rgba(229, 193, 88, 0);
        }

        .btn-create-post:hover {
          background-color: var(--accent-color) !important;
          color: var(--bg-color) !important;
          border-color: var(--accent-color) !important;
          box-shadow: 0 4px 20px rgba(229, 193, 88, 0.22) !important;
          transform: translateY(-2px);
        }

        /* High-End Shimmer Skeletons */
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .blog-skeleton div {
          background: linear-gradient(90deg, rgba(255,255,255,0.01) 25%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.01) 75%) !important;
          background-size: 200% 100% !important;
          animation: shimmer 1.8s infinite linear !important;
        }

        /* Modal Transitions */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(9, 8, 8, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalEntry {
          0% {
            transform: translateY(20px) scale(0.97);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        .modal-content {
          animation: modalEntry 0.55s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(229, 193, 88, 0.15) !important;
          box-shadow: 0 24px 50px rgba(0, 0, 0, 0.6) !important;
        }

        .blog-read-modal {
          background: rgba(13, 12, 12, 0.85) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          animation: modalEntry 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .blog-modal-body::-webkit-scrollbar {
          width: 6px;
        }
        .blog-modal-body::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 10px;
        }
        .blog-modal-body::-webkit-scrollbar-thumb {
          background: rgba(229, 193, 88, 0.15);
          border-radius: 10px;
        }
        .blog-modal-body::-webkit-scrollbar-thumb:hover {
          background: rgba(229, 193, 88, 0.3);
        }

        .modal-close-btn:hover {
          color: #ef4444 !important;
          transform: rotate(90deg);
        }

        .blog-input, .blog-textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(229, 193, 88, 0.12);
          border-radius: 12px;
          padding: 0.8rem 1rem;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 300;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blog-input:focus, .blog-textarea:focus {
          outline: none;
          border-color: var(--accent-color);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 0 15px rgba(229, 193, 88, 0.05);
        }

        .blog-upload-area {
          border: 1.5px dashed rgba(229, 193, 88, 0.18);
          border-radius: 12px;
          background: rgba(229, 193, 88, 0.01);
          transition: all 0.3s ease;
        }

        .blog-upload-area:hover {
          border-color: var(--accent-color);
          background: rgba(229, 193, 88, 0.03);
        }

        .modal-cancel-btn:hover {
          background-color: rgba(239, 68, 68, 0.06) !important;
          border-color: rgba(239, 68, 68, 0.2) !important;
          color: #ef4444 !important;
        }

        .modal-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(229, 193, 88, 0.25) !important;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Blog;
