import { gsap } from 'gsap';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import styles from './TalksAndActivities.module.css';

const servicesData = [
    {
        category: 'Selected Talks',
        items: [
            { type: 'Invited Talk', title: 'Challenges and Opportunities in Enabling Secure 5G Positioning', event: 'COMSNETS 2023' },
            { type: 'Invited Talk', title: 'Security of the Positioning Systems', event: 'IIIT Delhi 2023' },
            { type: 'Invited Talk', title: 'Precise, Performant and Secure UWB (Ultra-Wideband) Ranging Systems', event: 'Platform Security Summit 2019' },
            { type: 'Invited Talk', title: 'Security of Ultra-Wideband Ranging Systems', event: 'Amazon, Seattle 2019' },
            { type: 'Invited Talk', title: 'Secure Distance Measurement: Challenges and Results', event: 'ISIT Conference 2019' },
        ],
    },
    {
        category: 'Professional & Social Activities',
        items: [
            { title: 'Technical Program Committee Member', event: 'NDSS 2024' },
            { title: 'Technical Program Committee Member', event: 'IEEE S&P 2024' },
            { title: 'Publicity Committee Co-Chair', event: 'COMSNETS 2024' },
            { title: 'Technical Program Committee Member', event: 'RAID 2023' },
            { title: 'Panel Discussion on Crystal-Gazing Cybersecurity and Privacy for T20s', event: 'COMSNETS 2023' },
            { title: 'Technical Program Committee Member', event: 'ACM WiSec 2023' },
            { title: 'Publicity Committee Co-Chair', event: 'ACM WiSec 2023' },
            { title: 'Technical Program Committee Member', event: 'IEEE Euro S&P 2023' },
            { title: 'Technical Program Committee Member', event: 'RAID 2022' },
            { title: 'Technical Program Committee Member', event: 'CANS 2022' },
            { title: 'Technical Program Committee Member', event: 'ACM WiSec 2022' },
            { title: 'Workshop on Secure Positioning in Wireless Systems', event: 'COMSNETS 2022' },
            { title: 'Co-leading CSNoW - Network of Women in Computer Science', event: '2019 - 2021' },
            {
                title: 'Sub-reviewer for top conferences in Wireless Communication and Security',
                bullets: ['IEEE S&P', 'USENIX-Security', 'NDSS', 'CCS', 'Mobicom', 'WiSec'],
            },
            { title: "Winner of 'Hack for a Cause' Hackathon", event: 'IIM-Bangalore 2015' },
            {
                title: 'Involved in CSR activities at Xerox Research',
                event: '2014 - 2016',
                bullets: ['Teach computer science to kids', 'Visit nursing homes', 'Organize blood donation camps'],
            },
            {
                title: 'Co-founder of Trishulam',
                event: '2011 - Present',
                bullets: ['Finalist of Manthan Award 2013', 'Nominee of FICCI and Dell Innovation Awards 2012']
            },
            { title: 'Head of Student Senate', event: 'IIIT Delhi 2013 - 2014' },
        ],
    },
];

const highlightText = (text, query) => {
    if (!query) return <>{text}</>;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
        regex.test(part) ? <span key={i} className={styles.highlight}>{part}</span> : part
    );
};

const Services = forwardRef((_, ref) => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const underlineRef = useRef(null);
    const [search, setSearch] = useState('');
    const [modalContent, setModalContent] = useState(null);

    useImperativeHandle(ref, () => ({
      animate() {
        const ctx = gsap.context(() => {
          // Animate heading
          gsap.fromTo(
            titleRef.current,
            { y: 40, scale: 0.8, opacity: 0 },
            { 
              y: 0, 
              scale: 1, 
              opacity: 1, 
              duration: 1.2, 
              ease: 'back.out(1.7)',
              onComplete: () => {
                // Animate underline
                gsap.to(underlineRef.current, { 
                  width: '50%', 
                  duration: 0.8, 
                  ease: 'power2.out' 
                });
              }
            }
          );
        }, sectionRef);
    
        return () => ctx.revert();
      }
    }));
    
    const openModal = (bullets) => setModalContent(bullets);
    const closeModal = () => setModalContent(null);

    return (
        <>
          <section className={`${styles.section} ${styles.fadeInSection}`} id='talksandactivities' ref={sectionRef}>
            <h2 className={styles.title} ref={titleRef}>
              Talks & Activities
              <span className={styles.underline} ref={underlineRef}></span>
            </h2>
      
            <input
              type='text'
              placeholder='Search talks or activities...'
              className={styles.searchBar}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
      
            {servicesData.map((category, idx) => {
              const filteredItems = category.items.filter(item => {
                const titleMatch = item.title?.toLowerCase().includes(search.toLowerCase());
                const eventMatch = item.event?.toLowerCase().includes(search.toLowerCase());
                const bulletsMatch = item.bullets?.some(b => b.toLowerCase().includes(search.toLowerCase()));
                return titleMatch || eventMatch || bulletsMatch;
              });
      
              return (
                <div key={idx}>
                  <h3 className={styles.subsectionTitle}>{category.category}</h3>
                  <ul className={styles.projectsList}>
                    {filteredItems.map((item, i) => (
                      <li key={i} className={styles.projectItem}>
                        <div className={styles.projectInfo}>
                          {item.type && <span className={styles.tag}>{item.type}</span>}
                          <span className={styles.projectTitle}>{highlightText(item.title, search)}</span>
      
                          {item.bullets?.length > 0 && (
                            <FaInfoCircle
                              className={styles.infoIcon}
                              title='Click to see details'
                              onClick={() => openModal(item.bullets)}
                            />
                          )}
                        </div>
                        {item.event && <span className={styles.projectYear}>{item.event}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </section>
      
          {/* Modal */}
          {modalContent && (
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <h4>Details</h4>
                <ul className={styles.bulletsList}>
                  {modalContent.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <button className={styles.closeBtn} onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
        </>
      );
      
});

export default Services;
