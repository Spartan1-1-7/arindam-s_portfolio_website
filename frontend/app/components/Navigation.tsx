'use client';

import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:8000';

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
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`nav-link ${pathname === item.path ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
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
