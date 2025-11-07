import { useState, useEffect, useRef } from 'react';
import styles from './navbar.module.css';
import logo from '../assets/logo.png';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeHash, setActiveHash] = useState('');
    const base = import.meta.env.BASE_URL || '/';
    const navRef = useRef(null);

    useEffect(() => {
        const updateActiveHash = () => {
            setActiveHash(window.location.hash);
        };
        updateActiveHash();
        window.addEventListener('hashchange', updateActiveHash);
        return () => window.removeEventListener('hashchange', updateActiveHash);
    }, []);

    // Close menu when clicking or focusing outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        const handleFocusOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.relatedTarget)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('focusout', handleFocusOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('focusout', handleFocusOutside);
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.navbar} ref={navRef}>
            <div className={styles.navContent}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoWrapper}>
                        {/* Removed registered mark */}
                        <img src={logo} alt="Logo" className={styles.logoImage} />
                    </div>
                    <a href={base} className={styles.logoLink} aria-label="Go to homepage">
                        <h1 className={styles.logo}>
                            NRI stories
                            <span className={styles.regMark} aria-hidden="true">®</span>
                        </h1>
                    </a>
                </div>
                <div className={styles.separator} aria-hidden="true" />
                <button 
                    className={styles.hamburger} 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                </button>
                <ul className={`${styles.navList} ${isMenuOpen ? styles.navListOpen : ''}`}>
                    <li>
                        <a 
                            className={`${styles.navLink} ${(activeHash === '#thoughts' || activeHash === '#thoughts-format') ? styles.navLinkActive : ''}`} 
                            href="#thoughts"
                        >
                            The Thought
                        </a>
                    </li>
                    <li>
                        <a 
                            className={`${styles.navLink} ${activeHash === '#youafit' ? styles.navLinkActive : ''}`} 
                            href="#youafit"
                        >
                            You a fit?
                        </a>
                    </li>
                    <li>
                        <a 
                            className={`${styles.navLink} ${activeHash === '#showcase' ? styles.navLinkActive : ''}`} 
                            href="#showcase"
                        >
                            Our Showcase
                        </a>
                    </li>
                    <li>
                        <a 
                            className={`${styles.navLink} ${activeHash === '#jumpin' ? styles.navLinkActive : ''}`} 
                            href="#jumpin"
                        >
                            Jump In
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        );
}

export default Navbar;
