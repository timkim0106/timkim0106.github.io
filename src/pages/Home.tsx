import React from 'react';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Education from '../components/Education';
import ExtraInfo from '../components/ExtraInfo';

const Home: React.FC = () => {
  const personalInfo = {
    name: "Timothy Kim",
    description: "I'm a passionate software engineer with experience in full-stack development. I love creating efficient, scalable solutions and am always eager to learn new technologies.",
    workExperience: [
      "Software Engineer at Second Dinner (Present) - As an intern on the Tools team, I am learning about the development infrastructure and the processes for building tools that suppor the mobile game Marvel Snap.",
      "Professional Esports Athlete (2020-2024) - Competed in the North American League of Legends Secondary League as Jungler for Golden Guardians and Counter Logic Gaming."
    ]
  };

  const projects = [
    {
      id: 1,
      title: "MedGrouper",
      description: "Med-Scheduler is a React-based healthcare management application designed to help organize patient medication schedules while preventing dangerous drug interactions. The system allows users to add patients and medications, then automatically groups medications based on their known interactions to ensure safe administration timing. Built with a clean, responsive interface, it provides an intuitive way for healthcare professionals to visualize and manage complex medication regimens for multiple patients.",
      technologies: ["React", "TypeScript", "Node.js", "Bootstrap"],
      githubUrl: "https://github.com/timkim0106/med-grouper",
    },
    {
      id: 2,
      title: "Race to Chall",
      description: "RaceToChall is a competitive gaming platform for League of Legends that enables players to create and participate in skill-based races to climb the ranked ladder. I completely transformed an inconsistent prototype with critical security vulnerabilities into a production-ready application with modern architecture, enterprise-grade security, and real-time Riot Games API integration, achieving 100% feature functionality.",
      technologies: ["Python", "SQL", "React", "TypeScript", "Vercel"],
      githubUrl: "https://github.com/timkim0106/RaceToChall"
    },
    {
      id: 3,
      title: "LoL Scouting and Analysis",
      description: "  A comprehensive League of Legends analytics framework that calculates optimal champion builds through sophisticated damage modeling and statistical analysis. The system implements complex game mechanics including item passives, ability scaling, and champion-specific interactions, using Monte Carlo simulations to analyze damage variance across different scenarios. Features professional-grade architecture with type-safe data models, secure API integration with Riot Games services, and advanced visualization capabilities for build optimization and performance analysis.",
      technologies: ["Python", "Pydantic", "numpy", "Pandas", "Matplotlib", "Seaborn"],
      githubUrl: "https://github.com/timkim0106/LoL_Scouting_Analysis"
    }
  ];

  const education = [
    {
      id: 1,
      institution: "University Of California, Irvine",
      degree: "Bachelor of Science",
      field: "Computer Science and Engineering",
      graduationYear: "June 2026",
      gpa: "3.9/4.0",
      achievements: [
        "Dean's List for 3 Quarters"
      ],
      coursework: ["Design and Analysis of Algorithms", "Data Structures and Algorithms",
         "Operating Systems", "Computer Networks", "Software Engineering",
          "User Interaction Software", "C++ Programming", "OO Programming",
           "Organization of Digital Computers", "Linear Algebra"
      ]
    }
  ];

  const extraInfo = {
    skills: ["Python", "C/C++", "TypeScript", "C#", "React", "YAML", "Node.js", "JavaScript", "SQL", "Git", "HTML/CSS"],
    hobbies: ["League of Legends", "Bouldering", "Hiking", "Traveling", "Trying New Food"],
    languages: ["English", "Korean"],
    leagueOfLegends: ["Peaked Rank 1 in 2022 and 2023", "Main role: Jungle", "Favorite champion: Elise"]
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