import React from 'react';

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'Java', 'SQL', 'JavaScript', 'HTML/CSS']
  },
  {
    title: 'Python libraries',
    skills: ['TensorFlow', 'PyTorch', 'OpenCV', 'CNN', 'ResNet', 'Scikit-Learn', 'Pandas', 'NumPy']
  },
  {
    title: 'Data Analytics and Tools',
    skills: ['Power BI', 'Tableau', 'Excel', 'DAX', 'Git', 'Docker']
  },
  {
    title: 'Backend and Databases',
    skills: ['FastAPI', 'Node.js', 'REST APIs', 'MySQL', 'MongoDB']
  },
  {
    title: 'Soft Skills',
    skills: [' Problem-solving', 'Analytical skills', 'Decision-making', 'Time management', 'Agile methodologies']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="section" style={{ backgroundColor: 'rgba(18, 17, 16, 0.4)' }}>
      <div className="container">
        <h2 className="section-title animate-on-scroll">Technical Expertise</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem' }}>
          {skillCategories.map((category, idx) => (
            <div key={idx} className="glass-panel animate-on-scroll" style={{ transitionDelay: `${idx * 80}ms`, padding: '2.5rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                marginBottom: '1.5rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-serif)',
                borderBottom: '1px solid rgba(229, 193, 88, 0.08)',
                paddingBottom: '0.75rem',
                fontWeight: 400
              }}>
                {category.title}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="skill-tag"
                    style={{ transitionDelay: `${sIdx * 45}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Style Injection for Interactive Skills tags */}
      <style>{`
        .skill-tag {
          display: inline-block;
          padding: 0.5rem 1.15rem; 
          background-color: rgba(255, 255, 255, 0.01); 
          border: 1px solid rgba(229, 193, 88, 0.06);
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 300;
          color: var(--text-secondary);
          cursor: default;
          opacity: 0;
          transform: translateY(8px);
          transition: 
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), 
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-panel.visible .skill-tag {
          opacity: 1;
          transform: translateY(0);
        }
        
        .skill-tag:hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
          background-color: rgba(229, 193, 88, 0.05);
          transform: translateY(-3px) scale(1.04) !important;
          box-shadow: 0 5px 15px rgba(229, 193, 88, 0.18);
        }
      `}</style>
    </section>
  );
};

export default Skills;
