import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { publications } from '../../data/publicationsData';
import styles from './Publications.module.css';

const Publications = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(Array(publications.length).fill(false));
    const [cardsVisible, setCardsVisible] = useState(false); // triggers cards after header

    const cardsRef = useRef([]);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const underlineRef = useRef(null);

    // Intersection Observer for cards fade-in
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = cardsRef.current.indexOf(entry.target);
                    if (entry.isIntersecting && index !== -1) {
                        setVisible((prev) => {
                            const copy = [...prev];
                            copy[index] = true;
                            return copy;
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 },
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    // Expose animate() for Nav click
    useImperativeHandle(ref, () => ({
        animate() {
            if (titleRef.current && underlineRef.current) {
                // reset title
                titleRef.current.style.opacity = 0;
                titleRef.current.style.transform = 'translateY(40px) scale(0.8)';
                
                setTimeout(() => {
                    titleRef.current.style.transition =
                        'all 1.2s cubic-bezier(0.68,-0.55,0.265,1.55)';
                    titleRef.current.style.opacity = 1;
                    titleRef.current.style.transform = 'translateY(0) scale(1)';

                    setTimeout(() => {
                        // animate underline
                        underlineRef.current.style.width = '50%';

                        // Trigger cards after header animation
                        setCardsVisible(true);
                    }, 1200);
                }, 100);
            }
        }
    }));

    // Animate header when section scrolls into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        ref?.current?.animate?.();
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, [ref]);

    return (
        <section className={styles.publicationsSection} id='publications' ref={sectionRef}>
            <h2 className={styles.title} ref={titleRef}>
                Publications
                <span className={styles.underline} ref={underlineRef}></span>
            </h2>

            <div className={styles.publicationsGrid}>
                {publications.map((pub, i) => (
                    <div
                        key={i}
                        ref={(el) => (cardsRef.current[i] = el)}
                        className={`${styles.publicationCard} ${
                            visible[i] && cardsVisible ? styles.publicationCardFadeIn : styles.hidden
                        }`}
                        style={{ transitionDelay: `${i * 150}ms` }} // staggered fade-in
                    >
                        <div className={styles.cardContent}>
                            <h3 className={styles.pubTitle}>{pub.title}</h3>
                            <p className={styles.pubAuthors}>{pub.authors}</p>
                            <p className={styles.pubVenue}>
                                {pub.venueShort} — {pub.venue}
                            </p>
                            {pub.link && (
                                <a
                                    className={styles.pdfLink}
                                    href={pub.link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    View PDF
                                </a>
                            )}
                            {pub.extra && <p className={styles.pubExtra}>{pub.extra}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

export default Publications;
