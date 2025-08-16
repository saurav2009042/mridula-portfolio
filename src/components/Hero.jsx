import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./hero.css";

export default function Hero({ onScrollDownAnimation }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", { y: 50, opacity: 0, duration: 1.2, ease: "power3.out" });
      gsap.from(".hero-subtitle", { y: 50, opacity: 0, duration: 1.2, delay: 0.3, ease: "power3.out" });
      gsap.from(".hero-bio", { y: 50, opacity: 0, duration: 1.2, delay: 0.6, ease: "power3.out" });
      gsap.from(".hero-info", { y: 50, opacity: 0, duration: 1.2, delay: 0.9, ease: "power3.out" });

      gsap.to(".social-links a", {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from(".scroll-down", { y: -10, opacity: 0, duration: 1, delay: 1.6, repeat: -1, yoyo: true });
      gsap.from(".hero-call-container", { y: 20, opacity: 0, duration: 1, delay: 1.9, ease: "power3.out" });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
      if (onScrollDownAnimation) onScrollDownAnimation();
    }
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">Dr. Mridula Singh</h1>
        <p className="hero-subtitle">Faculty at CISPA – Helmholtz Center for Information Security</p>
        <p className="hero-bio">
          Researching systems and wireless security, secure positioning, and proximity-based access control for autonomous vehicles.
        </p>

        <div className="hero-info">
          <p>Stuhlsatzenhaus 5, 66123 Saarbrucken, Germany</p>
          <p>Email: <a href="mailto:singh@cispa.de">singh@cispa.de</a></p>
        </div>

        <div className="social-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        </div>

        <div className="scroll-down" onClick={handleScrollDown}>&#x2193;</div>
      </div>

      <div className="hero-call-container">
  <div className="hero-call-text">
    I am looking for Ph.D. students and postdocs. If research on systems or wireless security excites you, send your resume to 
    <a href="mailto:singh@cispa.de">singh@cispa.de</a>
  </div>
</div>
    </section>
  );
}
