import React from "react";
import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">
              <span className="logo-bracket">&lt;</span>PK
              <span className="logo-bracket">/&gt;</span>
            </span>
            <p>
              Full-Stack Developer & Aged Care Professional
              <br />
              Based in Sydney, Australia
            </p>
          </div>

          <div className="footer-links">
            <h4>Navigation</h4>
            <ul>
              {[
                "About",
                "Skills",
                "Projects",
                "Experience",
                "Education",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector(`#${link.toLowerCase()}`)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <a href="mailto:off.pklm10@gmail.com">off.pklm10@gmail.com</a>
            <a
              href="https://www.linkedin.com/in/prajwal-khanal-a4b000262"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Pra-Zol"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} Prajwal Khanal. Built with{" "}
            <FiHeart className="heart-icon" /> using React & Node.js
          </p>
          <div className="footer-socials">
            <a
              href="https://github.com/Pra-Zol"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/prajwal-khanal-a4b000262"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a href="mailto:off.pklm10@gmail.com" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
