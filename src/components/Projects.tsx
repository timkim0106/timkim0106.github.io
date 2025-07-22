import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="nes-container with-title" style={{ marginBottom: '20px' }}>
      <p className="title">Projects</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {projects.map((project) => (
          <div key={project.id} className="nes-container">
            <h3 className="nes-text is-primary">{project.title}</h3>
            <p>{project.description}</p>
            
            <div style={{ marginBottom: '10px' }}>
              <strong>Technologies:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
                {project.technologies.map((tech, index) => (
                  <span key={index} style={{
                    display: 'inline-block',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    padding: '2px 6px',
                    border: '2px solid #ffffff',
                    borderRadius: '0',
                    fontFamily: 'monospace',
                    fontSize: '11px'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="nes-btn is-primary">
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="nes-btn is-success">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;