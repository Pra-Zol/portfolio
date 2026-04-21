import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  FiCode, FiDatabase, FiGitBranch, FiLayout,
  FiServer, FiUsers, FiBriefcase, FiHeart
} from 'react-icons/fi';
import './Skills.css';

const technicalSkills = [
  { name: 'HTML / CSS / JavaScript', level: 88, icon: <FiLayout /> },
  { name: 'React / Next.js', level: 80, icon: <FiCode /> },
  { name: 'Node.js / Express', level: 75, icon: <FiServer /> },
  { name: 'PostgreSQL', level: 72, icon: <FiDatabase /> },
  { name: 'Git / GitHub', level: 82, icon: <FiGitBranch /> },
  { name: 'REST APIs', level: 78, icon: <FiCode /> },
];

const softSkills = [
  { name: 'Empathy & Compassion', icon: <FiHeart />, desc: 'Honed through frontline care work' },
  { name: 'Team Collaboration', icon: <FiUsers />, desc: 'Cross-functional team experience' },
  { name: 'Problem Solving', icon: <FiBriefcase />, desc: 'Analytical & creative thinking' },
  { name: 'Communication', icon: <FiUsers />, desc: 'Clear & concise communication' },
  { name: 'Time Management', icon: <FiBriefcase />, desc: 'Juggling studies & work' },
  { name: 'Adaptability', icon: <FiHeart />, desc: 'Quick learner in new environments' },
];

const techStack = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Node.js', color: '#68A063' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Express', color: '#c9a84c' },
  { name: 'Git', color: '#F05032' },
  { name: 'HTML5', color: '#E34F26' },
  { name: 'CSS3', color: '#1572B6' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'Next.js', color: '#c9a84c' },
  { name: 'REST API', color: '#6DB33F' },
];

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">02. My Toolkit</span>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        <div className={`skills-grid ${inView ? 'visible' : ''}`}>

          {/* Technical Skills */}
          <div className="skills-column">
            <h3 className="skills-col-title">
              <FiCode className="col-icon" /> Technical Skills
            </h3>
            <div className="skill-bars">
              {technicalSkills.map((skill, i) => (
                <div key={skill.name} className="skill-bar-item" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="skill-bar-header">
                    <span className="skill-bar-name">
                      <span className="skill-icon">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="skill-bar-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{ width: inView ? `${skill.level}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="skills-column">
            <h3 className="skills-col-title">
              <FiHeart className="col-icon" /> Soft Skills
            </h3>
            <div className="soft-skills-grid">
              {softSkills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="soft-skill-card"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="soft-skill-icon">{skill.icon}</div>
                  <div>
                    <h4>{skill.name}</h4>
                    <p>{skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Tech Stack Pills */}
        <div className={`tech-stack ${inView ? 'visible' : ''}`}>
          <h3 className="tech-stack-title">Full Tech Stack</h3>
          <div className="tech-pills">
            {techStack.map((tech, i) => (
              <span
                key={tech.name}
                className="tech-pill"
                style={{
                  '--pill-color': tech.color,
                  animationDelay: `${i * 0.05}s`
                }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
