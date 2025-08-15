import React from 'react';
import { Link } from 'react-scroll';

export default function Nav({ onAboutClick, onPublicationsClick, onTeachingClick, onTalksAndActivitiesClick }) {
    return (
        <nav>
            <Link to='about' smooth={true} duration={500} onClick={onAboutClick}>
                About
            </Link>
            <Link to='team' smooth={true} duration={500}>
                Team
            </Link>
            <Link
                to='publications'
                smooth={true}
                duration={500}
                onClick={onPublicationsClick} // trigger animation
            >
                Publications
            </Link>
            <Link to='teaching' smooth={true} duration={500} onClick={onTeachingClick}>
                Teaching
            </Link>
            <Link to='talksandactivities' smooth={true} duration={500} onClick={onTalksAndActivitiesClick}>
                Talks & Activities
            </Link>
        </nav>
    );
}
