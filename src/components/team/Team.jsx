import React, { useEffect, useState } from "react";
import { alumni, teamMembers } from "../../data/teamData";
import styles from "./Team.module.css";

const Team = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subTitleVisible, setSubTitleVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 200);
    const subTitleTimer = setTimeout(() => setSubTitleVisible(true), 700);
    const cardsTimer = setTimeout(() => setCardsVisible(true), 1200);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subTitleTimer);
      clearTimeout(cardsTimer);
    };
  }, []);

  const renderSection = (heading, members) => (
    <>
      <h3
        className={`${styles.subTitle} ${subTitleVisible ? styles.visible : ""}`}
      >
        {heading}
      </h3>
  
      <div className={styles.grid}>
        {members.map((member, index) => (
          <div
            key={index}
            className={`${styles.card} ${cardsVisible ? styles.cardVisible : ""}`}
            style={{ "--delay": `${index * 120}ms` }}
          >
            <img
              src={member.img || "/images/default-avatar.png"}
              alt={member.name || "Team member"}
              className={styles.image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/default-avatar.png";
              }}
            />
            <div className={styles.info}>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              <p className={styles.period}>{member.period}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
  

  return (
    <section id="team" className={styles.teamSection}>
      <h2 className={`${styles.title} ${titleVisible ? styles.visible : ""}`}>
        Team
        <span
          className={`${styles.underline} ${titleVisible ? styles.visible : ""}`}
        ></span>
      </h2>

      {/* Current Members */}
      {renderSection("Current Members", teamMembers)}

      {/* Alumni */}
      {renderSection("Alumni", alumni)}
    </section>
  );
};

export default Team;
