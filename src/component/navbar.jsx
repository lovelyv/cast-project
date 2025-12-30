import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './navbar.module.css';
import logo from '../assets/logo.png';


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef(null);
    const location = useLocation();

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
                <div className={styles.logoCol}>
                    <Link to="/" className={styles.logoLink} aria-label="Go to homepage">
                        <div className={styles.logoWrapper}>
                            <img src={logo} alt="Logo" className={styles.logoImage} />
                        </div>
                    </Link>
                </div>
                <div className={styles.titleCol}>
                    <Link to="/" className={styles.logoLink} aria-label="Go to homepage">
                        <h1 className={styles.logo}>
                            NRI stories
                            <span className={styles.regMark} aria-hidden="true">®</span>
                        </h1>
                    </Link>
                </div>
                <div className={styles.hamburgerCol}>
                    <button 
                        className={styles.hamburger} 
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={styles.hamburgerLine}></span>
                        <span className={styles.hamburgerLine}></span>
                    </button>
                </div>
                <ul className={`${styles.navList} ${isMenuOpen ? styles.navListOpen : ''}`}>
                    <li>
                        <Link 
                            className={`${styles.navLink} ${['/thoughts', '/thoughts-format'].includes(location.pathname) ? styles.navLinkActive : ''}`} 
                            to="/thoughts"
                        >
                            The Thought
                        </Link>
                    </li>
                    <li>
                        <Link 
                            className={`${styles.navLink} ${location.pathname === '/youafit' ? styles.navLinkActive : ''}`} 
                            to="/youafit"
                        >
                            U a FIT ?
                        </Link>
                    </li>
                    <li>
                        <Link 
                            className={`${styles.navLink} ${location.pathname === '/jumpin' ? styles.navLinkActive : ''}`} 
                            to="/jumpin"
                        >
                            Jump In
                        </Link>
                    </li>
                    <li>
                        <Link 
                            className={`${styles.navLink} ${location.pathname === '/showcase' ? styles.navLinkActive : ''}`} 
                            to="/showcase"
                        >
                            Our Showcase
                        </Link>
                    </li>
                    <li>
                        <Link 
                            className={`${styles.navLink} ${location.pathname === '/supportus' ? styles.navLinkActive : ''}`} 
                            to="/supportus"
                        >
                            Support Us
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
