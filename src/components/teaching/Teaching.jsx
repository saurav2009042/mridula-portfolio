import { gsap } from 'gsap';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './Teaching.module.css';

const coursesData = [
  {
    institution: 'CISPA – Helmholtz Center for Information Security, Germany',
    courses: [
      { name: '[Seminar] Wireless Security', semester: 'SS 2023' },
      { name: '[Proseminar] Wireless and Mobile Security', semester: 'WS 2022' },
      { name: '[Advanced Lecture] Physical-Layer Security, Co-teaching with Nils Ole Tippenhauer', semester: 'SS 2022' },
    ],
  },
  {
    institution: 'ETH Zurich, Switzerland',
    courses: [
      { name: 'TA - Current Topics in Information Security, Srdjan Capkun, Kenneth Paterson, Adrian Perrig', semester: 'SS 2020' },
      { name: 'TA - Security of Wireless Networks, Srdjan Capkun', semester: 'SS 2020' },
      { name: 'TA - Security of Wireless Networks, Srdjan Capkun', semester: 'SS 2019' },
      { name: 'TA - Current Topics in Information Security, Srdjan Capkun, Kenneth Paterson, Adrian Perrig', semester: 'SS 2018' },
      { name: 'Head TA - Security of Wireless Networks, Srdjan Capkun', semester: 'SS 2018' },
      { name: 'TA - Digital Circuits, Srdjan Capkun, Onur Mutlu', semester: 'SS 2018' },
      { name: 'Head TA - Security of Wireless Networks, Srdjan Capkun', semester: 'SS 2017' },
      { name: 'TA - Introduction to Programming, Thomas Gross', semester: 'SS 2017' },
      { name: 'TA - Digital Circuits, Srdjan Capkun, and Onur Mutlu', semester: 'WS 2017' },
      { name: 'TA - Security of Wireless Networks, Srdjan Capkun', semester: 'SS 2016' },
      { name: 'TA - Introduction to Programming for Civil Engineering', semester: 'SS 2016' },
    ],
  },
  {
    institution: 'IIIT-Delhi, India',
    courses: [
      { name: 'Head TA - Wireless Networks, Sanjit Krishnan Kaul', semester: 'WS 2013' },
      { name: 'Technical Communication, Hemant Kumar', semester: 'SS 2013' },
      { name: 'TA - Computer Networks, Vinayak Naik', semester: 'SS 2013' },
      { name: 'TA - Computer Organization, Pushpendra Singh', semester: 'SS 2013' },
    ],
  },
];

const projectsData = [
  { name: 'Security of 5G-augmented GPS for VANETS, Sarah Moy de Vitry', year: '2020' },
  { name: 'Distance Modification Attacks against Wireless Multi-carrier Systems, Julia Badertscher', year: '2020' },
  { name: 'Secure Two-Way Ranging in 5G-enabled VANETs, Manisha De', year: '2020' },
  { name: 'Early Detection & Late Commit on OFDM Based ToA Measurements, Martin Kotuliak', year: '2019' },
  { name: 'Secure Time of Arrival estimation in 5G, Andreas Enz', year: '2019' },
  { name: 'Key Signing App for Proof of Personhood, Noa Melchior', year: '2019' },
  { name: 'Distance Enlargement Attack Detection and Prevention in Impulse Radio Ultra Wideband Communications, Simon Miescher', year: '2018' },
  { name: 'Localizing mobile nodes in a relative coordinate system, Andreas Biri', year: '2017' },
];

const Teaching = forwardRef((_, ref) => {
  const teachingRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);
  const [openIndices, setOpenIndices] = useState([]); // default closed
  const [search, setSearch] = useState('');

  // SEARCH → auto-open matching accordions
  useEffect(() => {
    if (!search) {
      setOpenIndices([]); // close all if search empty
      return;
    }
    const indicesToOpen = coursesData
      .map((item, idx) =>
        item.courses.some(course =>
          course.name.toLowerCase().includes(search.toLowerCase())
        ) ? idx : null
      )
      .filter(idx => idx !== null);

    setOpenIndices(indicesToOpen);
  }, [search]);

  const toggleAccordion = index => {
    setOpenIndices(prev => {
      const newOpen = prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index];

      if (!prev.includes(index)) {
        setTimeout(() => {
          const ul = teachingRef.current.querySelectorAll(`.${styles.institution}`)[index]?.querySelector(`.${styles.ul}`);
          if (ul) {
            const lis = ul.querySelectorAll(`.${styles.li}`);
            gsap.fromTo(lis, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" });
          }
        }, 0);
      }

      return newOpen;
    });
  };

  useImperativeHandle(ref, () => ({
    animate() {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          titleRef.current,
          { y: 40, scale: 0.8, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            onComplete: () => {
              gsap.to(underlineRef.current, { width: "50%", duration: 0.8, ease: "power2.out" });
            },
          }
        );

        // Animate open accordions
        openIndices.forEach(index => {
          const ul = teachingRef.current.querySelectorAll(`.${styles.institution}`)[index]?.querySelector(`.${styles.ul}`);
          if (ul) {
            const lis = ul.querySelectorAll(`.${styles.li}`);
            gsap.fromTo(lis, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" });
          }
        });

        // Animate projects
        gsap.fromTo(
          teachingRef.current.querySelectorAll(`.${styles.projectItem}`),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.5 }
        );
      }, teachingRef);

      return () => ctx.revert();
    },
  }));

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, idx) =>
      regex.test(part) ? <span key={idx} className={styles.highlight}>{part}</span> : part
    );
  };

  return (
    <section className={`${styles.section} ${styles.fadeInSection}`} id="teaching" ref={teachingRef}>
      <h2 className={styles.title} ref={titleRef}>
        Teaching
        <span className={styles.underline} ref={underlineRef}></span>
      </h2>

      <input
        type="text"
        placeholder="Search courses or projects..."
        className={styles.searchBar}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <h3 className={styles.subsectionTitle}>Courses</h3>
      {coursesData.map((item, index) => {
        const filteredCourses = item.courses.filter(course =>
          course.name.toLowerCase().includes(search.toLowerCase())
        );

        return (
          <div key={index} className={styles.institution}>
            <div
              className={`${styles.institutionHeader} ${openIndices.includes(index) ? styles.active : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              Courses at {item.institution}
              <span className={`${styles.arrow} ${openIndices.includes(index) ? styles.arrowOpen : ''}`}>▶</span>
            </div>

            <ul className={`${styles.ul} ${openIndices.includes(index) ? styles.ulOpen : ''}`}>
              {filteredCourses.map((course, idx) => {
                const splitIndex = course.name.indexOf(',');
                const courseTitle = splitIndex !== -1 ? course.name.substring(0, splitIndex) : course.name;
                const courseProf = splitIndex !== -1 ? course.name.substring(splitIndex + 1).trim() : '';

                return (
                  <li key={idx} className={`${styles.li} ${styles.fadeInLi}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className={styles.courseContent}>
                      <span className={styles.courseTitle}>{highlightText(courseTitle, search)}</span>
                      {courseProf && <span className={styles.courseProf}>{highlightText(courseProf, search)}</span>}
                    </div>
                    <span className={styles.tag}>{course.semester}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <h3 className={styles.subsectionTitle}>Projects Supervised</h3>
      <ul className={styles.projectsList}>
        {projectsData.map((project, idx) => {
          const splitIndex = project.name.lastIndexOf(',');
          const titleText = project.name.substring(0, splitIndex);
          const authorText = project.name.substring(splitIndex + 1).trim();

          return (
            <li key={idx} className={`${styles.projectItem} ${styles.fadeInProject}`}>
              <div className={styles.projectInfo}>
                <span className={styles.projectTitle}>{highlightText(titleText, search)}</span>
                <span className={styles.projectAuthor}>{highlightText(authorText, search)}</span>
              </div>
              <span className={styles.projectYear}>{project.year}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
});

export default Teaching;
