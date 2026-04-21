import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import {
  FiMail,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import "./Contact.css";

const contactInfo = [
  {
    icon: <FiMail />,
    label: "Email",
    value: "off.pklm10@gmail.com",
    href: "mailto:off.pklm10@gmail.com",
  },
  {
    icon: <FiMapPin />,
    label: "Location",
    value: "Sydney, NSW, Australia",
    href: null,
  },
  {
    icon: <FiLinkedin />,
    label: "LinkedIn",
    value: "Prajwal Khanal",
    href: "https://www.linkedin.com/in/prajwal-khanal-a4b000262",
  },
  {
    icon: <FiGithub />,
    label: "GitHub",
    value: "Pra-Zol",
    href: "https://github.com/Pra-Zol",
  },
];

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus("sending");
    try {
      await axios.post(
        process.env.REACT_APP_API_URL
          ? `${process.env.REACT_APP_API_URL}/api/contact`
          : "https://portfolio-tfnb.onrender.com/api/contact",
        form,
      );
      setStatus("success");
      setForm(initialForm);
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">07. Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
          <p className="contact-subtitle">
            I'm currently open to <strong>junior developer</strong> roles and
            internships. Whether you have an opportunity, a question, or just
            want to say hi — my inbox is always open!
          </p>
        </div>

        <div className={`contact-grid ${inView ? "visible" : ""}`}>
          {/* Left — Info */}
          <div className="contact-info">
            <h3 className="contact-info-title">Let's Connect</h3>
            <p className="contact-info-desc">
              I'm passionate about building meaningful software and would love
              to discuss how I can contribute to your team. Feel free to reach
              out through any channel below.
            </p>

            <div className="contact-items">
              {contactInfo.map((item) => (
                <div key={item.label} className="contact-item">
                  <div className="contact-item-icon">{item.icon}</div>
                  <div className="contact-item-body">
                    <span className="contact-item-label">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-item-value link"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-item-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="availability-badge">
              <span className="avail-dot" />
              <span>Open to new opportunities</span>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-form-wrap">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={`form-group ${errors.name ? "has-error" : ""}`}>
                  <label htmlFor="name">
                    <FiUser size={13} /> Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className="form-error">{errors.name}</span>
                  )}
                </div>

                <div
                  className={`form-group ${errors.email ? "has-error" : ""}`}
                >
                  <label htmlFor="email">
                    <FiMail size={13} /> Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="form-error">{errors.email}</span>
                  )}
                </div>
              </div>

              <div
                className={`form-group ${errors.subject ? "has-error" : ""}`}
              >
                <label htmlFor="subject">
                  <FiMessageSquare size={13} /> Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Job opportunity / Freelance project / Just saying hi"
                  value={form.subject}
                  onChange={handleChange}
                />
                {errors.subject && (
                  <span className="form-error">{errors.subject}</span>
                )}
              </div>

              <div
                className={`form-group ${errors.message ? "has-error" : ""}`}
              >
                <label htmlFor="message">
                  <FiMessageSquare size={13} /> Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={handleChange}
                />
                <span className="char-count">{form.message.length} chars</span>
                {errors.message && (
                  <span className="form-error">{errors.message}</span>
                )}
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div className="form-status success">
                  <FiCheckCircle /> Message sent! I'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="form-status error">
                  <FiAlertCircle /> Something went wrong. Please try emailing
                  directly.
                </div>
              )}

              <button
                type="submit"
                className="btn-primary submit-btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <span className="spinner" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FiSend />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
