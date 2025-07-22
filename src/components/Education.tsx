import React from 'react';

interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  field: string;
  graduationYear: string;
  gpa?: string;
  achievements?: string[];
  coursework?: string[];
}

interface EducationProps {
  education: EducationItem[];
}

const Education: React.FC<EducationProps> = ({ education }) => {
  return (
    <section className="nes-container with-title" style={{ marginBottom: '20px' }}>
      <p className="title">Education</p>
      <div>
        {education.map((item) => (
          <div key={item.id} className="nes-container" style={{ marginBottom: '15px' }}>
            <h3 className="nes-text is-primary">{item.institution}</h3>
            <p><strong>{item.degree} in {item.field}</strong></p>
            <p>Expected Graduation: {item.graduationYear}</p>
            {item.gpa && <p>GPA: {item.gpa}</p>}
            
            {item.achievements && item.achievements.length > 0 && (
              <div>
                <strong>Achievements:</strong>
                <ul className="nes-list is-disc">
                  {item.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}

            {item.coursework && item.coursework.length > 0 && (
              <div>
                <strong>Relevant Coursework:</strong>
                <p style={{ marginTop: '5px', lineHeight: '1.4' }}>
                  {item.coursework.join(', ')}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;