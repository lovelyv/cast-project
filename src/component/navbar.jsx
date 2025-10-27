import { useState } from 'react';
import styles from './navbar.module.css';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <h1 className={styles.logo}>NRI Stories</h1>
                <button 
                    className={styles.hamburger} 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                </button>
                <ul className={`${styles.navList} ${isMenuOpen ? styles.navListOpen : ''}`}>
                    <li><a className={styles.navLink} href="default.asp">Concept</a></li>
                    <li><a className={styles.navLink} href="news.asp">Experience</a></li>
                    <li><a className={styles.navLink} href="contact.asp">Themes</a></li>
                    <li><a className={styles.navLink} href="about.asp">Share Your Story</a></li>
                </ul>
            </div>
        </nav>
        );
}

export default Navbar;
