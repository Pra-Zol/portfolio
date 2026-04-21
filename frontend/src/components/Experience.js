import React from "react";
import { useInView } from "react-intersection-observer";
import { FiBriefcase, FiHeart, FiCalendar, FiMapPin } from "react-icons/fi";
import "./Experience.css";

const experiences = [
  {
    id: 1,
    role: "Care Worker (Permanent)",
    company: "OLC Care",
    location: "Sydney, NSW",
    period: "Nov 2024 – Present",
    type: "Aged Care",
    icon: <FiHeart />,
    color: "#e4a0a0",
    current: true,
    responsibilities: [
      "Provide high-quality personal care to elderly residents including bathing, grooming, and mobility support",
      "Monitor and document residents' health conditions, reporting changes to nursing staff promptly",
      "Build meaningful relationships with residents and families, promoting dignity and independence",
      "Collaborate with multidisciplinary teams to implement personalised care plans",
      "Adhere to strict infection control and manual handling protocols",
    ],
  },
  {
    id: 2,
    role: "Care Worker (Casual)",
    company: "Anglicare",
    location: "Sydney, NSW",
    period: "Feb 2026 – Present",
    type: "Aged Care",
    icon: <FiHeart />,
    color: "#a0c4e4",
    current: true,
    responsibilities: [
      "Deliver compassionate community and residential aged care services across multiple sites",
      "Support residents with daily living activities and social engagement programs",
      "Maintain accurate care documentation and handover notes",
      "Work flexibly across shifts to support resident care needs",
    ],
  },
  {
    id: 3,
    role: "Social Media Manager",
    company: "Project (Nepal)",
    location: "Nepal",
    period: "Apr 2023 – Nov 2023",
    type: "IT",
    icon: <FiBriefcase />,
    color: "#c9a84c",
    current: false,
    responsibilities: [
      "Managed and grew social media presence across multiple platforms including Facebook and Instagram",
      "Created engaging content strategy to increase brand awareness and audience engagement",
      "Analysed social media metrics and prepared performance reports",
      "Collaborated with team members to plan and execute digital marketing campaigns",
      "Scheduled and published content consistently to maintain audience growth",
    ],
  },
];

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="section experience-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">04. Career</span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        {/* Timeline */}
        <div className={`timeline ${inView ? "visible" : ""}`}>
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className="timeline-item"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {/* Timeline dot */}
              <div className="timeline-dot">
                <span className="dot-icon">{exp.icon}</span>
              </div>

              {/* Card */}
              <div className="timeline-card">
                {/* Card Header */}
                <div className="tc-header">
                  <div className="tc-title-group">
                    <div className="tc-top">
                      <span
                        className={`exp-type-badge type-${exp.type.replace(" ", "-").toLowerCase()}`}
                      >
                        {exp.type}
                      </span>
                      {exp.current && (
                        <span className="current-badge">● Current</span>
                      )}
                    </div>
                    <h3 className="tc-role">{exp.role}</h3>
                    <p className="tc-company">{exp.company}</p>
                  </div>
                  <div className="tc-meta">
                    <span>
                      <FiCalendar size={13} /> {exp.period}
                    </span>
                    <span>
                      <FiMapPin size={13} /> {exp.location}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="tc-responsibilities">
                  {exp.responsibilities.map((r, j) => (
                    <li key={j}>
                      <span className="resp-dot" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Note about IT focus */}
        <div className={`exp-note ${inView ? "visible" : ""}`}>
          <div className="exp-note-icon">
            <FiBriefcase />
          </div>
          <div>
            <h4>Transitioning to Software Engineering</h4>
            <p>
              Currently pursuing my Bachelor of IT while gaining real-world
              experience in aged care. My care background gives me unique
              insight into building empathetic, user-focused technology.
              Actively seeking <strong>junior developer</strong> and{" "}
              <strong>IT graduate</strong> opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
