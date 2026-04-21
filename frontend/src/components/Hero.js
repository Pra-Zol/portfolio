import React, { useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import "./Hero.css";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
        ctx.fill();
      });

      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(201, 168, 76, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-orb" />

      <div className="hero-content container">
        <div className="hero-text">
          <p className="hero-greeting animate-fade-up">
            <span className="mono gold-text">$</span> Hello, World! I'm
          </p>

          <h1
            className="hero-name animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Prajwal
            <br />
            <span className="name-gold">Khanal</span>
          </h1>

          <div
            className="hero-role animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <TypeAnimation
              sequence={[
                "Full-Stack Developer",
                2000,
                "React & Node.js Engineer",
                2000,
                "Aged Care Professional",
                2000,
                "Problem Solver",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ color: "var(--gold)" }}
            />
          </div>

          <p
            className="hero-bio animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            A passionate Full-Stack Developer based in{" "}
            <strong>Sydney, Australia</strong>, blending technical expertise
            with a deep commitment to human-centred care. Building elegant web
            solutions while making a difference in people's lives every day.
          </p>

          <div
            className="hero-ctas animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              className="btn-primary"
              onClick={() =>
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>View My Work</span>
            </button>
            <a href="/cv.pdf" download className="btn-outline">
              Download CV
            </a>
          </div>

          <div
            className="hero-socials animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <a
              href="https://github.com/Pra-Zol"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/prajwal-khanal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a href="mailto:off.pklm10@gmail.com" aria-label="Email">
              <FiMail />
            </a>
            <span className="social-line" />
          </div>
        </div>

        {/* Profile Image */}
        <div
          className="hero-image-wrap animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="hero-image-frame">
            <img
              src="/profile.jpg"
              alt="Prajwal Khanal"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <div className="corner corner-tl" />
            <div className="corner corner-tr" />
            <div className="corner corner-bl" />
            <div className="corner corner-br" />
          </div>
          <div className="floating-badge badge-1">
            <span className="badge-icon">💻</span>
            <span>Full-Stack Dev</span>
          </div>
          <div className="floating-badge badge-2">
            <span className="badge-icon">🏥</span>
            <span>Aged Care</span>
          </div>
          <div className="floating-badge badge-3">
            <span className="badge-icon">📍</span>
            <span>Sydney, AU</span>
          </div>
        </div>
      </div>

      <button className="scroll-indicator" onClick={scrollToAbout}>
        <span>Scroll Down</span>
        <FiArrowDown className="scroll-arrow" />
      </button>
    </section>
  );
}
