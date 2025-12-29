import ProjectsClient from './ProjectsClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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

// Enable ISR with 180 second (3 minute) revalidation
export const revalidate = 180;

// Fetch projects data at build time and revalidate every 3 minutes
async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/projects/`, {
      next: { revalidate: 180 }
    });
    
    if (!res.ok) {
      console.error('Failed to fetch projects');
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Server component (default export)
export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return <ProjectsClient projects={projects} />;
}
