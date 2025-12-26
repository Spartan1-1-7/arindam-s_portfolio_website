export default function Projects() {
  const projects = [
    {
      title: 'Sentiment Analysis with BERT',
      category: 'Machine Learning',
      badge: 'badge-ml',
      description: 'Fine-tuned BERT model for sentiment classification on movie reviews, achieving 95% accuracy on IMDB dataset. Implemented custom preprocessing pipeline and deployed using FastAPI.',
      tags: ['Python', 'TensorFlow', 'BERT', 'FastAPI', 'Docker'],
      github: 'https://github.com',
      demo: '#',
    },
    {
      title: 'Image Classification CNN',
      category: 'Deep Learning',
      badge: 'badge-dl',
      description: 'Convolutional Neural Network for classifying images across 10 categories with data augmentation. Achieved 92% accuracy using transfer learning with ResNet50.',
      tags: ['Python', 'PyTorch', 'OpenCV', 'ResNet50', 'Gradio'],
      github: 'https://github.com',
      demo: '#',
    },
    {
      title: 'Customer Segmentation Analysis',
      category: 'Data Science',
      badge: 'badge-ds',
      description: 'K-means clustering analysis on e-commerce customer data to identify distinct customer segments. Created interactive dashboards for business insights.',
      tags: ['Python', 'Scikit-learn', 'Pandas', 'Plotly', 'Streamlit'],
      github: 'https://github.com',
      demo: '#',
    },
    {
      title: 'Real-time Object Detection',
      category: 'Computer Vision',
      badge: 'badge-cv',
      description: 'YOLOv5-based object detection system for real-time video analysis. Optimized for edge devices with 30+ FPS performance.',
      tags: ['Python', 'YOLOv5', 'OpenCV', 'TensorRT', 'Flask'],
      github: 'https://github.com',
      demo: '#',
    },
    {
      title: 'Chatbot with NLP',
      category: 'Natural Language Processing',
      badge: 'badge-nlp',
      description: 'Intent-based chatbot using transformer models for customer support automation. Integrated with multiple channels.',
      tags: ['Python', 'Transformers', 'Rasa', 'MongoDB', 'React'],
      github: 'https://github.com',
      demo: '#',
    },
    {
      title: 'Stock Price Predictor',
      category: 'Time Series',
      badge: 'badge-ts',
      description: 'LSTM-based model for stock price prediction with technical indicators. Backtesting framework for strategy evaluation.',
      tags: ['Python', 'TensorFlow', 'Pandas', 'TA-Lib', 'Dash'],
      github: 'https://github.com',
      demo: '#',
    },
  ];

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
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <span className={`project-badge ${project.badge}`}>{project.category}</span>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    <a href={project.demo} className="project-link">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                      Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
