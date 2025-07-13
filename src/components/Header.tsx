import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  githubUrl?: string;
  resumeUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ githubUrl, resumeUrl }) => {
  return (
    <header className="nes-container with-title" style={{ marginBottom: '20px' }}>
      <p className="title">Portfolio</p>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" className="nes-btn" style={{ backgroundColor: '#495057', color: '#ffffff', borderColor: '#ffffff' }}>Home</Link>
          <Link to="/contact" className="nes-btn" style={{ backgroundColor: '#495057', color: '#ffffff', borderColor: '#ffffff' }}>Contact</Link>
          <Link to="/blog" className="nes-btn" style={{ backgroundColor: '#495057', color: '#ffffff', borderColor: '#ffffff' }}>Blog</Link>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="nes-btn is-primary">
              GitHub
            </a>
          )}
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="nes-btn is-warning">
              Resume
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;