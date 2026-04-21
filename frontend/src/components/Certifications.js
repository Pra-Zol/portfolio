import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiCode, FiTrendingUp, FiHeart } from 'react-icons/fi';
import './Certifications.css';

const certifications = [
  {
    id: 1,
    title: 'Programming to JavaScript',
    issuer: 'Online Certification',
    category: 'Technical',
    icon: <FiCode />,
    color: '#F7DF1E',
    desc: 'Core programming concepts and JavaScript fundamentals including functions, DOM manipulation, and modern ES6+ syntax.',
  },
  {
    id: 2,
    title: 'Fundamentals of Digital Marketing',
    issuer: 'Google Digital Garage',
    category: 'Marketing',
    icon: <FiTrendingUp />,
    color: '#4285F4',
    desc: 'Comprehensive digital marketing fundamentals covering SEO, social media, analytics, and online business strategy.',
  },
  {
    id: 3,
    title: 'First Aid & CPR for Aged Care',
    issuer: 'Accredited Training Provider',
    category: 'Healthcare',
    icon: <FiHeart />,
    color: '#e4a0a0',
    desc: 'Industry-recognised first aid and CPR certification tailored for aged care settings. Includes emergency response protocols.',
  },
];

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="certifications" className="section certs-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">06. Credentials</span>
          <h2 className="section-title">Certifications</h2>
        </div>

        <div className={`certs-grid ${inView ? 'visible' : ''}`}>
          {certifications.map((cert, i) => (
            <div
              key={cert.id}
              className="cert-card"
              style={{ '--cert-color': cert.color, animationDelay: `${i * 0.15}s` }}
            >
              <div className="cert-icon-wrap">
                <span className="cert-icon">{cert.icon}</span>
              </div>

              <div className="cert-badge-row">
                <span className="cert-category">{cert.category}</span>
                <FiAward className="cert-award-icon" />
              </div>

              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-desc">{cert.desc}</p>

              {/* Decorative line */}
              <div className="cert-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
