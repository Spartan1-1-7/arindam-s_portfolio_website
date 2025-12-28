'use client';

import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Profile {
  id: number;
  name: string;
  profile_image: string;
  resume_url: string;
}

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [hash, setHash] = useState('');
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Update hash on mount and when it changes
    setHash(window.location.hash);
    
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Track scroll position to detect active section
  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // offset for navbar
      
      // Get all sections
      const heroSection = document.querySelector('.hero-section');
      const aboutSection = document.getElementById('about');
      
      if (aboutSection) {
        const aboutTop = aboutSection.offsetTop;
        
        if (scrollPosition >= aboutTop) {
          setActiveSection('#about');
        } else {
          setActiveSection('');
        }
      }
    };

    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile/`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setProfile(data[0]);
        }
      })
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  // Get initials from profile name or default to AS
  const getInitials = () => {
    if (profile?.name) {
      const names = profile.name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return profile.name.substring(0, 2).toUpperCase();
    }
    return 'AS';
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          {profile?.profile_image ? (
            <img 
              src={profile.profile_image} 
              alt={profile.name || 'Profile'} 
              className="logo-image"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          ) : (
            <div className="logo-circle">{getInitials()}</div>
          )}
        </Link>
        
        <div className="nav-links">
          {navItems.map((item) => {
            let isActive = false;
            
            if (item.path.includes('#')) {
              // For hash links (like About), use activeSection from scroll tracking
              const hashPart = `#${item.path.split('#')[1]}`;
              isActive = pathname === '/' && (hash === hashPart || activeSection === hashPart);
            } else if (item.path === '/') {
              // For Home, active when on home page and not in about section
              isActive = pathname === '/' && activeSection === '' && !hash.startsWith('#');
            } else {
              // For other pages (Skills, Projects, Contact), just check pathname
              isActive = pathname === item.path;
            }
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            );
          })}
          {profile?.resume_url ? (
            <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Resume
            </a>
          ) : (
            <Link href="/#resume" className="btn btn-primary">
              Resume
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}
