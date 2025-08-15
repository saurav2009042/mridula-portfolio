import { gsap } from "gsap";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import styles from "./About.module.css";

const About = forwardRef((props, ref) => {
  const aboutRef = useRef(null);

  const bio = [
    <>
      <span className={styles.highlight}>Mridula Singh</span> is (tenure-track) Faculty at <span className={styles.highlight}>CISPA – Helmholtz Center for Information Security</span> in Saarbrucken, Germany.
    </>,
    <>
      Her research interests span <span className={styles.highlight}>systems security</span> and <span className={styles.highlight}>wireless security</span>. She addresses security challenges through systematic problem analysis and mitigation.
    </>,
    <>
      She designs physical layer <span className={styles.highlight}>Message Time of Arrival Codes</span> for secure proximity-based access control and positioning systems, enabling <span className={styles.highlight}>secure passive keyless entry</span> and start systems in cars.
    </>,
    <>
      Currently, she focuses on secure sensing modalities in <span className={styles.highlight}>autonomous vehicles</span> (LiDAR, Radar, Camera) and designing scalable positioning systems (UWB, WiFi, LTE, 5G, GNSS).
    </>,
    <>
      She co-founded <span className={styles.highlight}>Trishulam</span> during her master's, worked as a research engineer at <span className={styles.highlight}>Xerox Research Center India</span>, and earned a master's from <span className={styles.highlight}>IIIT-Delhi</span> and a PhD from <span className={styles.highlight}>ETH Zurich</span>.
    </>
  ];

  useImperativeHandle(ref, () => ({
    animate() {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          aboutRef.current.querySelector(`.${styles.title}`),
          { y: 40, scale: 0.8, opacity: 0 },
          { 
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            onComplete: () => {
              gsap.to(aboutRef.current.querySelector(`.${styles.underline}`), {
                width: "50%",
                duration: 0.8,
                ease: "power2.out"
              });
            }
          }
        );

        gsap.fromTo(
          aboutRef.current.querySelectorAll(`.${styles.bioLine}`),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.3, ease: "power3.out" }
        );

      }, aboutRef);

      return () => ctx.revert();
    }
  }));

  return (
    <section className={styles.section} id="about" ref={aboutRef}>
      <div className={styles.container}>
      <h2 className={styles.title}>
        About Dr. Mridula Singh
        <span className={styles.underline}></span>
      </h2>
      {bio.map((line, index) => (
        <p key={index} className={styles.bioLine}>{line}</p>
      ))}
      </div>
    </section>
  );
});

export default About;
