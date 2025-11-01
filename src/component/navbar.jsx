import { useState } from 'react';
import styles from './navbar.module.css';
import logo from '../assets/logo.png';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Logo" className={styles.logoImage} />
                    <h1 className={styles.logo}>NRI Stories</h1>
                </div>
                <div className={styles.separator} aria-hidden="true" />
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
                    <li><a className={`${styles.navLink} ${styles.navLinkActive}`} href="default.asp">Background</a></li>
                    <li><a className={styles.navLink} href="news.asp">Concept</a></li>
                    <li><a className={styles.navLink} href="contact.asp">Approach</a></li>
                    <li><a className={styles.navLink} href="contact.asp">Treatment</a></li>
                    <li><a className={styles.navLink} href="contact.asp">Stories</a></li>
                    <li><a className={styles.navLink} href="contact.asp">Platforms</a></li>
                    <li><a className={styles.navLink} href="contact.asp">Plans</a></li>
                    <li><a className={styles.navLink} href="about.asp">Reach out</a></li>
                </ul>
            </div>
        </nav>
        );
}

export default Navbar;
