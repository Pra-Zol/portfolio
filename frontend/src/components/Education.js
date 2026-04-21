import React from "react";
import { useInView } from "react-intersection-observer";
import { FiBook, FiAward, FiCalendar } from "react-icons/fi";
import "./Education.css";

const education = [
  {
    id: 1,
    degree: "Bachelor of Information Technology",
    institution: "Kent Institute Australia",
    period: "2024 – Present",
    status: "In Progress",
    focus: "Software Engineering & Web Development",
    highlights: [
      "Full-Stack Web Development",
      "Database Management Systems",
      "Software Engineering Principles",
      "Algorithms & Data Structures",
      "Computer Networks",
    ],
    icon: "🎓",
  },
];

export default function Education() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="section education-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">05. Learning</span>
          <h2 className="section-title">Education</h2>
        </div>

        <div className={`education-grid ${inView ? "visible" : ""}`}>
          {education.map((edu, i) => (
            <div
              key={edu.id}
              className="edu-card"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="edu-card-left">
                <div className="edu-icon-wrap">
                  <span className="edu-emoji">{edu.icon}</span>
                </div>
                <div className="edu-timeline-line" />
              </div>

              <div className="edu-card-body">
                <div className="edu-header">
                  <div>
                    <span
                      className={`edu-status ${edu.status === "In Progress" ? "in-progress" : "complete"}`}
                    >
                      {edu.status}
                    </span>
                    <h3 className="edu-degree">{edu.degree}</h3>
                    <p className="edu-institution">
                      <FiBook size={14} /> {edu.institution}
                    </p>
                  </div>
                  <div className="edu-period">
                    <FiCalendar size={13} />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <p className="edu-focus">
                  Focus: <strong>{edu.focus}</strong>
                </p>

                <div className="edu-highlights">
                  {edu.highlights.map((h) => (
                    <span key={h} className="edu-highlight-tag">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
