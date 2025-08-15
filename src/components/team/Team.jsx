import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import { alumni, teamMembers } from "../../data/teamData";
import styles from "./Team.module.css";

export default function Team() {
  const teamRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = teamRef.current.querySelectorAll("img");
      let loadedCount = 0;
  
      // Declare this first
      const animateCards = () => {
        gsap.from(`.${styles.teamSection} h2`, {
          y: 40,
          scale: 0.9,
          opacity: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: "back.out(1.7)"
        });
  
        gsap.from(`.${styles.teamCard}`, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        });
      };
  
      const checkAllLoaded = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          animateCards();
        }
      };
  
      images.forEach((img) => {
        if (img.complete) {
          checkAllLoaded();
        } else {
          img.addEventListener("load", checkAllLoaded);
        }
      });
  
      // In case there are no images
      if (images.length === 0) animateCards();
    }, teamRef);
  
    return () => ctx.revert();
  }, []);
  

  const renderCards = (members) => (
    <div className={styles.teamGrid}>
      {members.map((m, i) => (
        <div key={i} className={styles.teamCard}>
          <div className={styles.cardImgContainer}>
            <img src={m.img} alt={m.name} />
          </div>
          <h3>{m.name}</h3>
          <p className={styles.role}>{m.role}</p>
          <p className={styles.period}>{m.period}</p>
        </div>
      ))}
    </div>
  );

  return (
    <section className={styles.teamSection} id="team" ref={teamRef}>
      <h2>Team</h2>
      {renderCards(teamMembers)}
      <h2>Alumni</h2>
      {renderCards(alumni)}
    </section>
  );
}
