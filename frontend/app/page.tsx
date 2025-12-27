'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:8000';

interface Profile {
  id: number;
  name: string;
  tagline: string;
  bio: string;
  profile_image: string;
  about_image: string;
  resume_url: string;
}

interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  github_url: string;
  demo_url: string;
  image: string;
  category: string;
  order: number;
}

interface Experience {
  id: number;
  title: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
  location: string;
}

interface Achievement {
  id: number;
  icon: string;
  name: string;
  date: string;
  description: string;
  location: string;
}

export default function Home() {
  const [animationStep, setAnimationStep] = useState<number>(0);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch profile data
    fetch(`${API_BASE_URL}/api/profile/`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setProfile(data[0]); // Get first profile
        }
      })
      .catch(error => console.error('Error fetching profile:', error));

    // Fetch skills data
    fetch(`${API_BASE_URL}/api/skills/`)
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(error => console.error('Error fetching skills:', error));

    // Fetch projects data (first 3 for featured)
    fetch(`${API_BASE_URL}/api/projects/`)
      .then(res => res.json())
      .then(data => setProjects(data.slice(0, 3)))
      .catch(error => console.error('Error fetching projects:', error));

    // Fetch experiences data
    fetch(`${API_BASE_URL}/api/experience/`)
      .then(res => res.json())
      .then(data => setExperiences(data))
      .catch(error => console.error('Error fetching experiences:', error));

    // Fetch achievements data
    fetch(`${API_BASE_URL}/api/achievements/`)
      .then(res => res.json())
      .then(data => setAchievements(data))
      .catch(error => console.error('Error fetching achievements:', error));
  }, []);

  // Define connection groups by layer
  const connectionGroups = {
    inputToHidden1: [0, 1, 2, 3, 4, 5, 6, 7, 8], // connections from input to hidden layer 1
    hidden1ToHidden2: [9, 10, 11, 12, 13, 14, 15, 16], // connections from hidden layer 1 to hidden layer 2
    hidden2ToOutput: [17, 18, 19, 20, 21, 22], // connections from hidden layer 2 to output
  };

  // Define all connections
  const connections = [
    { x1: 50, y1: 75, x2: 150, y2: 50, id: 0 },
    { x1: 50, y1: 75, x2: 150, y2: 125, id: 1 },
    { x1: 50, y1: 75, x2: 150, y2: 200, id: 2 },
    { x1: 50, y1: 150, x2: 150, y2: 50, id: 3 },
    { x1: 50, y1: 150, x2: 150, y2: 125, id: 4 },
    { x1: 50, y1: 150, x2: 150, y2: 200, id: 5 },
    { x1: 50, y1: 225, x2: 150, y2: 125, id: 6 },
    { x1: 50, y1: 225, x2: 150, y2: 200, id: 7 },
    { x1: 50, y1: 225, x2: 150, y2: 275, id: 8 },
    { x1: 150, y1: 50, x2: 250, y2: 75, id: 9 },
    { x1: 150, y1: 50, x2: 250, y2: 150, id: 10 },
    { x1: 150, y1: 125, x2: 250, y2: 75, id: 11 },
    { x1: 150, y1: 125, x2: 250, y2: 150, id: 12 },
    { x1: 150, y1: 125, x2: 250, y2: 225, id: 13 },
    { x1: 150, y1: 200, x2: 250, y2: 150, id: 14 },
    { x1: 150, y1: 200, x2: 250, y2: 225, id: 15 },
    { x1: 150, y1: 275, x2: 250, y2: 225, id: 16 },
    { x1: 250, y1: 75, x2: 350, y2: 100, id: 17 },
    { x1: 250, y1: 75, x2: 350, y2: 200, id: 18 },
    { x1: 250, y1: 150, x2: 350, y2: 100, id: 19 },
    { x1: 250, y1: 150, x2: 350, y2: 200, id: 20 },
    { x1: 250, y1: 225, x2: 350, y2: 100, id: 21 },
    { x1: 250, y1: 225, x2: 350, y2: 200, id: 22 },
  ];

  // Define node groups by layer
  const nodeGroups = {
    input: ['i0', 'i1', 'i2'],
    hidden1: ['h1_0', 'h1_1', 'h1_2', 'h1_3'],
    hidden2: ['h2_0', 'h2_1', 'h2_2'],
    output: ['o0', 'o1'],
  };

  const nodes = [
    { cx: 50, cy: 75, className: 'input', id: 'i0' },
    { cx: 50, cy: 150, className: 'input', id: 'i1' },
    { cx: 50, cy: 225, className: 'input', id: 'i2' },
    { cx: 150, cy: 50, className: 'hidden', id: 'h1_0' },
    { cx: 150, cy: 125, className: 'hidden', id: 'h1_1' },
    { cx: 150, cy: 200, className: 'hidden', id: 'h1_2' },
    { cx: 150, cy: 275, className: 'hidden', id: 'h1_3' },
    { cx: 250, cy: 75, className: 'hidden', id: 'h2_0' },
    { cx: 250, cy: 150, className: 'hidden', id: 'h2_1' },
    { cx: 250, cy: 225, className: 'hidden', id: 'h2_2' },
    { cx: 350, cy: 100, className: 'output', id: 'o0' },
    { cx: 350, cy: 200, className: 'output', id: 'o1' },
  ];

  // Determine which elements should be active based on animation step
  const getActiveElements = (step: number) => {
    const activeNodes: string[] = [];
    const activeConnections: number[] = [];

    // Pick random subset of neurons for each layer
    const randomSubset = (arr: string[], min: number, max: number) => {
      const count = Math.floor(Math.random() * (max - min + 1)) + min;
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    };

    // Select random neurons for this animation cycle (stored once per cycle)
    if (step === 0) {
      // Store random selections for this animation cycle
      (window as any).__nnActiveInput = randomSubset(nodeGroups.input, 1, 2);
      (window as any).__nnActiveHidden1 = randomSubset(nodeGroups.hidden1, 1, 3);
      (window as any).__nnActiveHidden2 = randomSubset(nodeGroups.hidden2, 1, 2);
      (window as any).__nnActiveOutput = randomSubset(nodeGroups.output, 1, 2);
    }

    const selectedInput = (window as any).__nnActiveInput || [];
    const selectedHidden1 = (window as any).__nnActiveHidden1 || [];
    const selectedHidden2 = (window as any).__nnActiveHidden2 || [];
    const selectedOutput = (window as any).__nnActiveOutput || [];

    // Animation sequence with random neurons
    switch (step) {
      case 0: // Random input neurons
        activeNodes.push(...selectedInput);
        break;
      case 1: // Lines from active inputs to selected hidden1
        connectionGroups.inputToHidden1.forEach(connId => {
          const conn = connections[connId];
          const sourceActive = nodes.some(n => 
            selectedInput.includes(n.id) && n.cx === conn.x1 && n.cy === conn.y1
          );
          const targetActive = nodes.some(n => 
            selectedHidden1.includes(n.id) && n.cx === conn.x2 && n.cy === conn.y2
          );
          if (sourceActive && targetActive) {
            activeConnections.push(connId);
          }
        });
        break;
      case 2: // Random hidden1 neurons
        activeNodes.push(...selectedHidden1);
        break;
      case 3: // Lines from active hidden1 to selected hidden2
        connectionGroups.hidden1ToHidden2.forEach(connId => {
          const conn = connections[connId];
          const sourceActive = nodes.some(n => 
            selectedHidden1.includes(n.id) && n.cx === conn.x1 && n.cy === conn.y1
          );
          const targetActive = nodes.some(n => 
            selectedHidden2.includes(n.id) && n.cx === conn.x2 && n.cy === conn.y2
          );
          if (sourceActive && targetActive) {
            activeConnections.push(connId);
          }
        });
        break;
      case 4: // Random hidden2 neurons
        activeNodes.push(...selectedHidden2);
        break;
      case 5: // Lines from active hidden2 to selected output
        connectionGroups.hidden2ToOutput.forEach(connId => {
          const conn = connections[connId];
          const sourceActive = nodes.some(n => 
            selectedHidden2.includes(n.id) && n.cx === conn.x1 && n.cy === conn.y1
          );
          const targetActive = nodes.some(n => 
            selectedOutput.includes(n.id) && n.cx === conn.x2 && n.cy === conn.y2
          );
          if (sourceActive && targetActive) {
            activeConnections.push(connId);
          }
        });
        break;
      case 6: // Random output neurons
        activeNodes.push(...selectedOutput);
        break;
      case 7: // Idle state
        break;
    }

    return { activeNodes, activeConnections };
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const runAnimation = () => {
      let step = 0;
      
      const animate = () => {
        setAnimationStep(step);
        step++;
        
        if (step < 8) {
          const timings = [1200, 300, 900, 300, 900, 300, 900, 600];
          timeoutId = setTimeout(animate, timings[step - 1]);
        } else {
          // Reset and loop with new random selection
          timeoutId = setTimeout(runAnimation, 300);
        }
      };
      
      animate();
    };

    runAnimation();

    return () => clearTimeout(timeoutId);
  }, []);

  const { activeNodes, activeConnections } = getActiveElements(animationStep);
  
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Hello, I'm <span className="gradient-text">{profile?.name || 'Arindam Shukla'}</span>
              </h1>
              <p className="hero-subtitle">{profile?.tagline || 'AI/ML Specialist & Computer Science Student'}</p>
              <p className="hero-description">
                {profile?.bio || 'Specializing in Machine Learning, Deep Learning, and Data Science solutions.'}
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
                {/* Connections - drawn first so they appear behind nodes */}
                {connections.map((conn) => (
                  <line
                    key={conn.id}
                    x1={conn.x1}
                    y1={conn.y1}
                    x2={conn.x2}
                    y2={conn.y2}
                    className={`connection ${activeConnections.includes(conn.id) ? 'active' : ''}`}
                  />
                ))}
                
                {/* Nodes */}
                {nodes.map((node) => (
                  <circle
                    key={node.id}
                    cx={node.cx}
                    cy={node.cy}
                    r="12"
                    className={`node ${node.className} ${activeNodes.includes(node.id) ? 'active' : ''}`}
                  />
                ))}
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
              {profile?.about_image ? (
                <img 
                  src={profile.about_image} 
                  alt={profile.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '20px'
                  }}
                />
              ) : (
                <div className="image-placeholder">
                  <div className="image-glow"></div>
                </div>
              )}
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
                <a href={profile?.resume_url || '/resume.pdf'} className="btn btn-primary" download>
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
            {projects.length > 0 ? (
              projects.map((project) => {
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
                        {project.technologies.split(',').slice(0, 3).map((tech, index) => (
                          <span key={index} className="tag">{tech.trim()}</span>
                        ))}
                        {project.technologies.split(',').length > 3 && <span className="tag">+More</span>}
                      </div>
                      <div className="project-links">
                        <a 
                          href={project.demo_url || '#'} 
                          className="project-link"
                          onClick={(e) => handleDemoClick(e, project.demo_url)}
                          target={project.demo_url && project.demo_url !== '#' ? '_blank' : undefined}
                          rel={project.demo_url && project.demo_url !== '#' ? 'noopener noreferrer' : undefined}
                        >
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
                );
              })
            ) : (
              // Fallback hardcoded projects if no data in database
              <>
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
                  <a href="#" className="project-link" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    Check Out
                  </a>
                  <a href="#" className="project-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
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
                  <a href="#" className="project-link" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    Check Out
                  </a>
                  <a href="#" className="project-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
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
                  <a href="#" className="project-link" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    Check Out
                  </a>
                  <a href="#" className="project-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            </>
            )}
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
            {skills.length > 0 ? (
              skills.map((skill) => (
                <div key={skill.id} className="skill-card">
                  <div className="skill-icon">
                    {skill.icon.includes('http') || skill.icon.includes('.') ? (
                      <img src={skill.icon} alt={skill.name} style={{width: '40px', height: '40px'}} />
                    ) : (
                      skill.icon
                    )}
                  </div>
                  <h3>{skill.name}</h3>
                  <p>{skill.category}</p>
                </div>
              ))
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="section experience-section">
        <div className="container">
          <h2 className="section-title">Work Experience</h2>
          
          <div className="timeline">
            {experiences.length > 0 ? (
              experiences.map((experience) => (
                <div key={experience.id} className="timeline-item">
                  <div className="timeline-content">
                    <span className="timeline-date">
                      {experience.start_date} - {experience.end_date}{experience.location ? ` | ${experience.location}` : ''}
                    </span>
                    <h3>{experience.title}</h3>
                    <h4>{experience.company}</h4>
                    <p>{experience.description}</p>
                  </div>
                </div>
              ))
            ) : (
              // Fallback hardcoded experience
              <>
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
            </>
            )}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section achievements-section">
        <div className="container">
          <h2 className="section-title">Achievements</h2>
          
          <div className="achievements-grid">
            {achievements.length > 0 ? (
              achievements.map((achievement) => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">
                    {achievement.icon && (achievement.icon.includes('http') || achievement.icon.includes('.')) ? (
                      <img src={achievement.icon} alt={achievement.name} style={{width: '60px', height: '60px', objectFit: 'contain'}} />
                    ) : (
                      achievement.icon
                    )}
                  </div>
                  <h3>{achievement.name}</h3>
                  <span className="achievement-year">{achievement.date}</span>
                  <p>{achievement.description}</p>
                  {achievement.location && <span className="achievement-location">📍 {achievement.location}</span>}
                </div>
              ))
            ) : (
              // Fallback hardcoded achievements
              <>
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
            </>
            )}
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
              <a href="https://github.com/Spartan1-1-7" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/arindam-shukla" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="mailto:arindamshrish@gmail.com" aria-label="Email">
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
    </>
  );
}
