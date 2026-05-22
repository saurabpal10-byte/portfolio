import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

const projects = [
  {
    title: 'AI Dermatological Diagnosis Tool',
    description: 'Developed an AI-based dermatological diagnosis tool using CNN and ResNet deep learning models for accurate skin disease classification. Improved model performance through advanced data preprocessing, image augmentation, and fine-tuning techniques. Designed a prototype mobile interface integrated with Grad-CAM visualization to enhance model explainability and provide better diagnostic insights.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    features: ['High-accuracy classification', 'Skin disease classification using CNN and ResNet models', 'Advanced image preprocessing and data augmentation', 'Grad-CAM visualization for explainable AI predictions', 'Mobile-friendly interface for real-time image analysis'],
    images: [
      '/projects/derma_tool_2.png'
    ],
    imageFit: 'contain',
    github: 'https://github.com/saurabpal10-byte/Al-based-tool-for-preliminary-diagnosis-of-Dermatological-',
    demo: '#'
  },
  {
    title: 'Traffic Sign Recognition System',
    description: 'Developed a computer vision-based Traffic Sign Recognition system using Python, OpenCV, and CNN models to detect and classify road signs in real time. Trained and evaluated the model on the GTSRB dataset, achieving high accuracy and improving understanding of deep learning, image processing, and real-time driver-assistance applications.',
    tech: ['OpenCV', 'PyTorch', 'ResNet', 'Python', 'Docker'],
    features: ['Real-time traffic sign detection and classification', 'CNN-based deep learning model for high accuracy', 'Trained using the German Traffic Sign Recognition Benchmark (GTSRB) dataset', 'Supports driver-assistance and smart transportation systems'],
    images: [
      '/projects/traffic_sign_2.png'
    ],
    imageFit: 'contain',
    github: 'https://github.com/saurabpal10-byte/traffic-siign-recognition',
    demo: '#'
  },
  {
    title: 'AI Jharkhand Tourism Digital Platform',
    description: 'Developed an AI-powered tourism platform for Jharkhand featuring an intelligent chatbot that provides travel information and user assistance. Utilized NLP and LLM-based conversational logic to understand user queries and deliver contextual responses. Built scalable backend APIs using Python and FastAPI, enhancing user interaction and tourism accessibility through an interactive digital experience.',
    tech: ['NLP', 'Gemini API', 'Node.js', 'MongoDB', 'React'],
    features: ['AI-powered chatbot for real-time tourism guidance and assistance', 'Personalized travel recommendations based on user interests and preferences', 'NLP-based query understanding for accurate and contextual responses', 'Interactive trip planning with destination and route information support'],
    images: [
      '/projects/jharkhand_tourism_1.jpg',
      '/projects/jharkhand_tourism_2.png'
    ],
    imageFit: 'contain',
    github: 'https://github.com/saurabpal10-byte/JH-tourism',
    demo: '#'
  }
];

const ProjectImage = ({ images, defaultImage, title, imageFit = 'cover' }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const imageList = React.useMemo(() => images || [defaultImage], [images, defaultImage]);

  React.useEffect(() => {
    if (imageList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageList.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [imageList]);

  if (imageList.length <= 1) {
    return (
      <img
        src={imageList[0]}
        alt={title}
        className="project-image"
        style={{
          objectFit: imageFit,
          padding: imageFit === 'contain' ? '1.5rem' : '0',
          width: '100%',
          height: '100%'
        }}
      />
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {imageList.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`${title} - Slide ${index + 1}`}
          className="project-image"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: imageFit,
            padding: imageFit === 'contain' ? '1.5rem' : '0',
            opacity: index === currentIndex ? 1 : 0,
            transform: index === currentIndex ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: index === currentIndex ? 2 : 1
          }}
        />
      ))}

      {/* Slider dots indicators */}
      <div style={{
        position: 'absolute',
        bottom: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.45rem',
        zIndex: 5
      }}>
        {imageList.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            style={{
              width: index === currentIndex ? '22px' : '6px',
              height: '6px',
              borderRadius: '50px',
              backgroundColor: index === currentIndex ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.35)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.4s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Featured Projects</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="glass-panel animate-on-scroll project-card"
              style={{
                display: 'flex',
                flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse',
                gap: '0',
                alignItems: 'stretch',
                padding: '0',
                overflow: 'hidden'
              }}
            >
              {/* Project Image Frame */}
              <div className="project-image-frame">
                {project.imageFit !== 'contain' && <div className="project-image-overlay"></div>}
                <ProjectImage
                  images={project.images}
                  defaultImage={project.image}
                  title={project.title}
                  imageFit={project.imageFit}
                />
              </div>

              {/* Project Details Frame */}
              <div style={{ flex: '1 1 50%', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{
                  fontSize: '1.9rem',
                  marginBottom: '1rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400
                }}>
                  {project.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.98rem', lineHeight: 1.7, fontWeight: 300 }}>
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
                  {project.tech.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--accent-color)',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        backgroundColor: 'rgba(229, 193, 88, 0.04)',
                        border: '1px solid rgba(229, 193, 88, 0.12)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '50px',
                        textTransform: 'uppercase'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features List */}
                <ul style={{ marginBottom: '2.5rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {project.features.map((feature, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', fontWeight: 300 }}>
                      <span style={{
                        display: 'inline-flex',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-color)'
                      }}></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.65rem 1.35rem', fontSize: '0.8rem', borderRadius: '30px' }}>
                    <GithubIcon size={16} /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Media query handling and custom card hovers */}
      <style>{`
        .project-card {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .project-image-frame {
          flex: '1 1 50%';
          position: relative;
          min-height: 380px;
          overflow: hidden;
          background-color: #0c0b0b;
          width: 50%;
        }
        
        .project-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(13, 12, 12, 0.1) 0%, rgba(13, 12, 12, 0.65) 100%);
          z-index: 1;
          transition: opacity 0.5s ease;
        }
        
        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .project-card:hover .project-image {
          transform: scale(1.06);
        }
        
        .project-card:hover .project-image-overlay {
          opacity: 0.45;
        }

        @media (max-width: 950px) {
          #projects .project-card {
            flex-direction: column !important;
          }
          .project-image-frame {
            width: 100% !important;
            height: 300px !important;
            min-height: 300px !important;
          }
          #projects .project-card > div {
            padding: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
