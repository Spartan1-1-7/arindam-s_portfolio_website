'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/skills/`)
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(error => console.error('Error fetching skills:', error));
  }, []);

  return (
    <div className="skills-page">
      {/* Hero Section */}
      <section className="section" style={{paddingTop: '120px'}}>
        <div className="container">
          <h1 className="section-title">Technical Skills</h1>
          <p className="section-subtitle">Complete overview of my skills in various technologies and tools</p>
        </div>
      </section>

      {/* All Skills Grid */}
      <section className="section">
        <div className="container">
          <div className="skills-full-grid">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <div key={skill.id} className="skill-card">
                  <div className="skill-icon">
                    {skill.icon.includes('http') || skill.icon.includes('.') ? (
                      <img src={skill.icon} alt={skill.name} style={{width: '60px', height: '60px', objectFit: 'contain'}} />
                    ) : (
                      <span style={{fontSize: '3rem'}}>{skill.icon}</span>
                    )}
                  </div>
                  <h3>{skill.name}</h3>
                  <p>{skill.category}</p>
                </div>
              ))
            ) : (
              <div className="loading">Loading skills...</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
