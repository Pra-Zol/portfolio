import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'Student Expense Tracker',
    description:
      'A full-stack web application to help students track their income and expenses with visualised breakdowns. Features secure authentication, budget goals, category management, and monthly reports.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Express', 'Chart.js'],
    tags: ['React', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/Pra-Zol',
    live: null,
    featured: true,
    status: 'Complete',
  },
  {
    id: 2,
    title: 'Hotel Management System',
    description:
      'A comprehensive hotel management platform with room booking, guest management, billing, and staff dashboards. Built with a RESTful API backend and a clean, intuitive front-end interface.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'PostgreSQL'],
    tags: ['JavaScript', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/Pra-Zol',
    live: null,
    featured: true,
    status: 'Complete',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description:
      'This very portfolio — a modern, responsive personal portfolio with dark/light mode, animated sections, a working contact form with backend storage, and a professional Navy & Gold design system.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'CSS3'],
    tags: ['React', 'Node.js'],
    github: 'https://github.com/Pra-Zol',
    live: '#',
    featured: true,
    status: 'In Progress',
  },
];

const allTags = ['All', 'React', 'Node.js', 'PostgreSQL', 'JavaScript'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter));

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">03. My Work</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Filter Buttons */}
        <div className={`project-filters ${inView ? 'visible' : ''}`}>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`filter-btn ${activeFilter === tag ? 'active' : ''}`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className={`projects-grid ${inView ? 'visible' : ''}`}>
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Card Header */}
              <div className="project-card-header">
                <div className="project-icon">
                  <FiFolder />
                </div>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <FiGithub />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <span className={`project-status status-${project.status.replace(' ', '-').toLowerCase()}`}>
                {project.status}
              </span>

              {/* Title & Description */}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              {/* Tech Stack */}
              <div className="project-tech">
                {project.tech.map(t => (
                  <span key={t} className="project-tech-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className={`projects-cta ${inView ? 'visible' : ''}`}>
          <p>See more of my work on GitHub</p>
          <a
            href="https://github.com/Pra-Zol"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <FiGithub />
            View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
