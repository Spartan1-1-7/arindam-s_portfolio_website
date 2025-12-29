import Image from 'next/image';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string;
}

// Enable ISR with 300 second (5 minute) revalidation
export const revalidate = 300;

// Fetch skills data at build time and revalidate every 5 minutes
async function getSkills(): Promise<Skill[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/skills/`, {
      next: { revalidate: 300 }
    });
    
    if (!res.ok) {
      console.error('Failed to fetch skills');
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export default async function SkillsPage() {
  const skills = await getSkills();

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
              skills.map((skill: Skill) => (
                <div key={skill.id} className="skill-card">
                  <div className="skill-icon">
                    {skill.icon.includes('http') || skill.icon.includes('.') ? (
                      <Image src={skill.icon} alt={skill.name} width={60} height={60} style={{objectFit: 'contain'}} />
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
