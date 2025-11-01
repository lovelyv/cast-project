import styles from './homeNavbar.module.css';
import logo from '../assets/logo.png';

function HomeNavbar() {
  return (
    <nav className={styles.homeNavbar} aria-label="Homepage navigation">
      <div className={styles.navContent}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="NRI Stories logo" className={styles.logoImage} />
          <h1 className={styles.logoText}>NRI Stories</h1>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;
