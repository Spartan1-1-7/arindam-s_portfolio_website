import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Hello, I'm <span className="gradient-text">Arindam Shukla</span>
              </h1>
              <p className="hero-subtitle">AI/ML Specialist & Computer Science Student</p>
              <p className="hero-description">
                Specializing in Machine Learning, Deep Learning, and Data Science solutions.
              </p>
              <div className="hero-buttons">
                <Link href="/projects" className="btn btn-primary">
                  View Projects
                </Link>
                <Link href="/contact" className="btn btn-secondary">
                  Contact Me
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <svg className="neural-network" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                {/* Input Layer */}
                <circle cx="50" cy="75" r="12" className="node input" />
                <circle cx="50" cy="150" r="12" className="node input" />
                <circle cx="50" cy="225" r="12" className="node input" />
                
                {/* Hidden Layer 1 */}
                <circle cx="150" cy="50" r="12" className="node hidden" />
                <circle cx="150" cy="125" r="12" className="node hidden" />
                <circle cx="150" cy="200" r="12" className="node hidden" />
                <circle cx="150" cy="275" r="12" className="node hidden" />
                
                {/* Hidden Layer 2 */}
                <circle cx="250" cy="75" r="12" className="node hidden" />
                <circle cx="250" cy="150" r="12" className="node hidden" />
                <circle cx="250" cy="225" r="12" className="node hidden" />
                
                {/* Output Layer */}
                <circle cx="350" cy="100" r="12" className="node output" />
                <circle cx="350" cy="200" r="12" className="node output" />
                
                {/* Connections */}
                <line x1="50" y1="75" x2="150" y2="50" className="connection" />
                <line x1="50" y1="75" x2="150" y2="125" className="connection" />
                <line x1="50" y1="75" x2="150" y2="200" className="connection" />
                <line x1="50" y1="150" x2="150" y2="50" className="connection" />
                <line x1="50" y1="150" x2="150" y2="125" className="connection" />
                <line x1="50" y1="150" x2="150" y2="200" className="connection" />
                <line x1="50" y1="225" x2="150" y2="125" className="connection" />
                <line x1="50" y1="225" x2="150" y2="200" className="connection" />
                <line x1="50" y1="225" x2="150" y2="275" className="connection" />
                
                <line x1="150" y1="50" x2="250" y2="75" className="connection" />
                <line x1="150" y1="50" x2="250" y2="150" className="connection" />
                <line x1="150" y1="125" x2="250" y2="75" className="connection" />
                <line x1="150" y1="125" x2="250" y2="150" className="connection" />
                <line x1="150" y1="125" x2="250" y2="225" className="connection" />
                <line x1="150" y1="200" x2="250" y2="150" className="connection" />
                <line x1="150" y1="200" x2="250" y2="225" className="connection" />
                <line x1="150" y1="275" x2="250" y2="225" className="connection" />
                
                <line x1="250" y1="75" x2="350" y2="100" className="connection" />
                <line x1="250" y1="75" x2="350" y2="200" className="connection" />
                <line x1="250" y1="150" x2="350" y2="100" className="connection" />
                <line x1="250" y1="150" x2="350" y2="200" className="connection" />
                <line x1="250" y1="225" x2="350" y2="100" className="connection" />
                <line x1="250" y1="225" x2="350" y2="200" className="connection" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-image">
              <div className="image-placeholder">
                <div className="image-glow"></div>
              </div>
            </div>
            <div className="about-text">
              <h3>Computer Science Student specializing in AI & ML</h3>
              
              <div className="education-info">
                <h4 className="info-title">🎓 Education</h4>
                <p className="info-text">
                  Bachelor of Technology in Computer Science and Technology with Specialization in Artificial Intelligence
                </p>
                <p className="info-subtext">🏛️ University of Lucknow</p>
              </div>
              
              <div className="about-buttons">
                <Link href="/#skills" className="btn btn-outline">
                  Learn More
                </Link>
                <a href="/resume.pdf" className="btn btn-primary" download>
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section projects-section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Explore some of my recent AI and ML projects</p>
          
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <span className="project-badge badge-ml">Machine Learning</span>
              </div>
              <div className="project-content">
                <h3>Sentiment Analysis with BERT</h3>
                <p>Fine-tuned BERT model for sentiment classification on movie reviews, achieving 95% accuracy on IMDB dataset.</p>
                <div className="project-tags">
                  <span className="tag">Python</span>
                  <span className="tag">TensorFlow</span>
                  <span className="tag">BERT</span>
                  <span className="tag">+More</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a href="#" className="project-link">
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

            <div className="project-card">
              <div className="project-image">
                <span className="project-badge badge-dl">Deep Learning</span>
              </div>
              <div className="project-content">
                <h3>Image Classification CNN</h3>
                <p>Convolutional Neural Network for classifying images across 10 categories with data augmentation.</p>
                <div className="project-tags">
                  <span className="tag">Python</span>
                  <span className="tag">PyTorch</span>
                  <span className="tag">OpenCV</span>
                  <span className="tag">+More</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a href="#" className="project-link">
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

            <div className="project-card">
              <div className="project-image">
                <span className="project-badge badge-ds">Data Science</span>
              </div>
              <div className="project-content">
                <h3>Customer Segmentation Analysis</h3>
                <p>K-means clustering analysis on e-commerce customer data to identify distinct customer segments.</p>
                <div className="project-tags">
                  <span className="tag">Python</span>
                  <span className="tag">Scikit-learn</span>
                  <span className="tag">Pandas</span>
                  <span className="tag">+More</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a href="#" className="project-link">
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
          </div>

          <div className="section-cta">
            <Link href="/projects" className="btn btn-primary btn-lg">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">My proficiency levels in various technologies and tools</p>
          
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon">🐍</div>
              <h3>Python</h3>
              <p>Programming</p>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">🔥</div>
              <h3>TensorFlow</h3>
              <p>ML Framework</p>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">⚡</div>
              <h3>PyTorch</h3>
              <p>ML Framework</p>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">🤖</div>
              <h3>Scikit-learn</h3>
              <p>ML Framework</p>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">🐼</div>
              <h3>Pandas</h3>
              <p>Data Analysis</p>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">🔢</div>
              <h3>NumPy</h3>
              <p>Data Analysis</p>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">💾</div>
              <h3>SQL</h3>
              <p>Database</p>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">🐳</div>
              <h3>Docker</h3>
              <p>DevOps</p>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">📝</div>
              <h3>Git</h3>
              <p>Version Control</p>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">📓</div>
              <h3>Jupyter</h3>
              <p>Tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="section experience-section">
        <div className="container">
          <h2 className="section-title">Work Experience</h2>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-content">
                <span className="timeline-date">2024 - Present | Remote</span>
                <h3>Machine Learning Engineer</h3>
                <h4>Tech Company</h4>
                <p>Developing and deploying ML models for production. Built recommender systems and NLP pipelines.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-content">
                <span className="timeline-date">2023 - 2024 | San Francisco, CA</span>
                <h3>Data Science Intern</h3>
                <h4>Startup Inc</h4>
                <p>Analyzed customer data, built predictive models, and created dashboards for business insights.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section achievements-section">
        <div className="container">
          <h2 className="section-title">Achievements</h2>
          
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-icon">🏆</div>
              <h3>Best ML Project Award</h3>
              <span className="achievement-year">2024</span>
              <p>Won first place in university ML competition for sentiment analysis project.</p>
              <span className="achievement-location">📍 University Name</span>
            </div>
            
            <div className="achievement-card">
              <div className="achievement-icon">📄</div>
              <h3>Research Paper Published</h3>
              <span className="achievement-year">2023</span>
              <p>Published paper on deep learning applications in IEEE conference.</p>
              <span className="achievement-location">📍 IEEE Conference</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Let's Work Together</h2>
            <p>Interested in collaborating on a project or have any questions?</p>
            <Link href="/contact" className="btn btn-white btn-lg">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>Arindam Shukla</h3>
              <p>AI/ML Specialist and Computer Science Student</p>
            </div>
            <div className="footer-social">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="mailto:contact@example.com" aria-label="Email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Arindam Shukla. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
