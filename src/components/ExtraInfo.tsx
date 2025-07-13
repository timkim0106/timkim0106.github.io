import React from 'react';

interface ExtraInfoProps {
  skills: string[];
  hobbies: string[];
  languages: string[];
  leagueOfLegends?: string[];
}

const ExtraInfo: React.FC<ExtraInfoProps> = ({ skills, hobbies, languages, leagueOfLegends }) => {
  return (
    <section className="nes-container with-title" style={{ marginBottom: '20px' }}>
      <p className="title">Extra Info</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div className="nes-container">
          <h3 className="nes-text is-primary">Skills</h3>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '8px', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '10px'
          }}>
            {skills.map((skill, index) => (
              <span key={index} style={{ 
                display: 'inline-block',
                backgroundColor: '#28a745',
                color: 'white',
                padding: '4px 8px',
                border: '4px solid #ffffff',
                borderRadius: '0',
                fontFamily: 'monospace',
                fontSize: '12px',
                margin: '2px',
                flexShrink: 0
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="nes-container">
          <h3 className="nes-text is-primary">Languages</h3>
          <ul className="nes-list is-disc">
            {languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>

        <div className="nes-container">
          <h3 className="nes-text is-primary">Hobbies</h3>
          <ul className="nes-list is-disc">
            {hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
        </div>

        {leagueOfLegends && leagueOfLegends.length > 0 && (
          <div className="nes-container">
            <h3 className="nes-text is-primary">League of Legends</h3>
            <ul className="nes-list is-disc">
              {leagueOfLegends.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div style={{ marginTop: '15px' }}>
              <a href="/blog/league-of-legends" className="nes-btn is-primary" style={{ fontSize: '12px' }}>
                Read My LoL Blog Posts
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExtraInfo;