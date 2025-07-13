import React from 'react';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Education from '../components/Education';
import ExtraInfo from '../components/ExtraInfo';

const Home: React.FC = () => {
  // Sample data - replace with your actual information
  const personalInfo = {
    name: "Timothy Kim",
    description: "I'm a passionate software engineer with experience in full-stack development. I love creating efficient, scalable solutions and am always eager to learn new technologies.",
    workExperience: [
      "Software Engineer at Tech Company (2022-Present) - Developed web applications using React and Node.js",
      "Junior Developer at Startup (2021-2022) - Built mobile applications and RESTful APIs",
      "Intern at Software Firm (2020-2021) - Worked on database optimization and testing"
    ]
  };

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce application with user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "https://github.com/yourusername/ecommerce",
      liveUrl: "https://your-ecommerce-demo.com"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      technologies: ["TypeScript", "Express", "PostgreSQL", "Socket.io"],
      githubUrl: "https://github.com/yourusername/task-manager"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard that displays current conditions and forecasts for multiple cities.",
      technologies: ["React", "CSS3", "Weather API"],
      githubUrl: "https://github.com/yourusername/weather-dashboard",
      liveUrl: "https://your-weather-app.com"
    }
  ];

  const education = [
    {
      id: 1,
      institution: "University Name",
      degree: "Bachelor of Science",
      field: "Computer Science",
      graduationYear: "2021",
      gpa: "3.8/4.0",
      achievements: [
        "Dean's List for 4 semesters",
        "Computer Science Department Award",
        "President of Programming Club"
      ]
    }
  ];

  const extraInfo = {
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "Git", "AWS"],
    hobbies: ["Photography", "Hiking", "Reading", "Gaming"],
    languages: ["English (Native)", "Spanish (Conversational)", "French (Basic)"],
    leagueOfLegends: ["Peaked Diamond in Season 11", "Main role: ADC, can flex to Mid", "Favorite champion: Jinx (because chaos)", "Still blame my teammates for every loss", "1.2 million mastery points on Yasuo (and still feeding)"]
  };

  return (
    <main>
      <AboutMe {...personalInfo} />
      <Projects projects={projects} />
      <Education education={education} />
      <ExtraInfo {...extraInfo} />
    </main>
  );
};

export default Home;