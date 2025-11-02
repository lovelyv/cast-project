import { useState } from 'react';
import styles from './navbar.module.css';
import logo from '../assets/logo.png';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const base = import.meta.env.BASE_URL || '/';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Logo" className={styles.logoImage} />
                    <a href={base} className={styles.logoLink} aria-label="Go to homepage">
                        <h1 className={styles.logo}>NRI Stories</h1>
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
                    <span className={styles.hamburgerLine}></span>
                </button>
                <ul className={`${styles.navList} ${isMenuOpen ? styles.navListOpen : ''}`}>
                                <li><a className={styles.navLink} href="#thoughts">The Thought</a></li>
                    <li><a className={styles.navLink} href="news.asp">You a fit?</a></li>
                    <li><a className={styles.navLink} href="contact.asp">Our Showcase</a></li>
                    <li><a className={styles.navLink} href="contact.asp">Jump In</a></li>
                </ul>
            </div>
        </nav>
        );
}

export default Navbar;
