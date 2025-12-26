'use client';

import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link href="/" className="logo">
          <div className="logo-circle">AS</div>
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
          <Link href="/#resume" className="btn btn-primary">
            Resume
          </Link>
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
