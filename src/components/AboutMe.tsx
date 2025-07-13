import React from 'react';

interface AboutMeProps {
  name: string;
  description: string;
  workExperience: string[];
}

const AboutMe: React.FC<AboutMeProps> = ({ name, description, workExperience }) => {
  return (
    <section className="nes-container with-title" style={{ marginBottom: '20px' }}>
      <p className="title">About Me</p>
      <div className="nes-container">
        <h2 className="nes-text is-primary">{name}</h2>
        <p>{description}</p>
        
        <h3>Work Experience</h3>
        <div className="lists">
          {workExperience.map((experience, index) => (
            <ul key={index} className="nes-list is-disc">
              <li>{experience}</li>
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;