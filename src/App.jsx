import React, { useRef } from 'react';
import './App.css';
import About from './components/about/About';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Publications from './components/publications/Publications';
import TalksAndActivities from './components/services/TalksAndActivities';
import Teaching from './components/teaching/Teaching';
import Team from './components/team/Team';

export default function App() {
    const aboutRef = useRef(null);
    const publicationsRef = useRef(null);
    const teachingRef = useRef(null);
    const talksAndActivitiesRef = useRef(null);

    const handleAboutClick = () => {
        if (aboutRef.current) {
            aboutRef.current.animate();
        }
    };

    const handlePublicationsClick = () => {
      publicationsRef.current?.animate();
  };

    const handleTeachingClick = () => {
        teachingRef.current?.animate();
    };

    const handleTalksAndActivitiesClick = () => {
        talksAndActivitiesRef.current?.animate();
    };

    return (
        <div>
            <Nav
                onAboutClick={handleAboutClick}
                onTeachingClick={handleTeachingClick}
                onTalksAndActivitiesClick={handleTalksAndActivitiesClick}
                onPublicationsClick={handlePublicationsClick}
            />
            <Hero onScrollDownAnimation={() => aboutRef.current.animate()} />
            <About ref={aboutRef} />
            <Team />
            <Publications ref={publicationsRef}/>
            <Teaching ref={teachingRef} />
            <TalksAndActivities ref={talksAndActivitiesRef} />
            <footer>© 2025 Dr. Mridula Singh. All rights reserved.</footer>
        </div>
    );
}
