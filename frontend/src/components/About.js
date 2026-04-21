import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiHeart, FiTarget, FiCoffee } from 'react-icons/fi';
import './About.css';

const highlights = [
  { icon: <FiCode />, label: 'Full-Stack Dev', desc: 'React, Node.js, PostgreSQL' },
  { icon: <FiHeart />, label: 'Aged Care', desc: '2+ Years of Compassionate Care' },
  { icon: <FiTarget />, label: 'Problem Solver', desc: 'Clean & Efficient Code' },
  { icon: <FiCoffee />, label: 'Always Learning', desc: 'Driven & Self-Motivated' },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        <div className={`about-grid ${inView ? 'visible' : ''}`}>

          {/* Left — Text */}
          <div className="about-text">
            <span className="section-label">01. About Me</span>
            <h2 className="section-title about-title">
              Bridging Technology<br />& Human Care
            </h2>

            <div className="about-bio">
              <p>
                Hi! I'm <strong>Prajwal Khanal</strong>, a passionate Full-Stack Developer and
                Bachelor of IT student based in <strong>Sydney, Australia</strong>. I have a
                unique background that blends software engineering with frontline aged care work —
                a combination that shapes how I think about building technology that truly serves people.
              </p>
              <p>
                Currently working as a <strong>Care Worker at OLC Care</strong> and <strong>Anglicare</strong>,
                I bring empathy, patience, and a human-centred perspective to everything I build.
                Whether it's designing an intuitive UI or architecting a backend API, I always ask:
                <em> "How does this help real people?"</em>
              </p>
              <p>
                I'm actively seeking opportunities in <strong>software engineering</strong> where I can
                contribute to meaningful products while continuing to grow as a developer.
              </p>
            </div>

            {/* Fun facts */}
            <div className="about-facts">
              <div className="fact-item">
                <span className="fact-number">2+</span>
                <span className="fact-label">Years in Aged Care</span>
              </div>
              <div className="fact-divider" />
              <div className="fact-item">
                <span className="fact-number">5+</span>
                <span className="fact-label">Projects Built</span>
              </div>
              <div className="fact-divider" />
              <div className="fact-item">
                <span className="fact-number">∞</span>
                <span className="fact-label">Cups of Coffee</span>
              </div>
            </div>
          </div>

          {/* Right — Highlights Grid */}
          <div className="about-highlights">
            {highlights.map((item, i) => (
              <div
                key={item.label}
                className="highlight-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="highlight-icon">{item.icon}</div>
                <div className="highlight-info">
                  <h4>{item.label}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}

            {/* Quote */}
            <div className="about-quote">
              <span className="quote-mark">"</span>
              <p>Code is poetry. Care is art. I practise both.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
