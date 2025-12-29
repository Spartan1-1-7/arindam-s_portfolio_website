'use client';

import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string;
  github_url: string;
  demo_url: string;
  image: string;
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [showModal, setShowModal] = useState(false);

  const getCategoryBadgeClass = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Machine Learning': 'badge-ml',
      'Deep Learning': 'badge-dl',
      'Data Science': 'badge-ds',
      'Computer Vision': 'badge-cv',
      'Natural Language Processing': 'badge-nlp',
      'Time Series': 'badge-ts',
    };
    return categoryMap[category] || 'badge-ml';
  };

  const handleDemoClick = (e: React.MouseEvent, demoUrl: string) => {
    if (!demoUrl || demoUrl === '#' || demoUrl === '') {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <div className="page-container">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">
            All <span className="gradient-text">Projects</span>
          </h1>
          <p className="page-description">
            A comprehensive collection of my AI, ML, and Data Science projects
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="projects-grid">
            {projects.map((project: Project) => (
              <div key={project.id} className="project-card">
                <div className="project-image" style={project.image ? {
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                } : {}}>
                  <span className={`project-badge ${getCategoryBadgeClass(project.category)}`}>{project.category}</span>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.technologies.split(',').map((tag, i) => (
                      <span key={i} className="tag">{tag.trim()}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.demo_url} className="project-link" onClick={(e) => handleDemoClick(e, project.demo_url)}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                      Check Out
                    </a>
                    <a href={project.github_url} className="project-link" target="_blank" rel="noopener noreferrer">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Coming soon 🚧</h2>
            <p>This project isn't deployed yet, but it will be live very soon.</p>
            <p>Check back shortly!</p>
            <button className="btn btn-primary" onClick={() => setShowModal(false)}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}
