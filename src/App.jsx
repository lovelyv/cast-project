import Navbar from "./component/navbar";
import ScrollToTop from "./component/ScrollToTop";
import HitItPage from "./component/HitItPage";
import AudioRecorder from "./component/AudioRecorder";
import SubpageWatermark from "./component/SubpageWatermark";
import Thoughts from "./component/Thoughts";
import SupportUs from "./component/SupportUs";
import YouAFit from "./component/YouAFit";
import OurShowcase from "./component/OurShowcase";
import JumpIn from "./component/JumpIn";
import homepageBackLogo from "./assets/homepagebacklogo.png";
import styles from "./App.module.css";

const SUBPAGE_WATERMARK_OPACITY = 0.17;

function Home() {
  const heroRef = useRef(null);
  const subcopyRef = useRef(null);
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="glitter-overlay" aria-hidden="true" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <section className={styles["hero-section"]} aria-label="Homepage hero" ref={heroRef}>
          <div className={styles["hero-container"]}>
            {/* Left: Image */}
            <div className={styles["hero-left"]}>
              <img
                className={`${styles["hero-fade-in"]} ${styles["hero-image"]}`}
                src={homepageBackLogo}
                alt="NRI Stories emblem"
              />
            </div>
            {/* Right: Copy */}
            <div className={`${styles["hero-right"]} copy-slide-in`}>
              <p ref={subcopyRef} className={`${styles["hero-subcopy"]}`}> 
                <span className={styles.embossed}><span className={styles.nowrap}>NRI stories<span className={styles['reg-mark']}>®</span></span></span><br></br> 
                is<br/>a next generation<br/>storytelling podcast.<br></br><br></br>Authentic stories<br></br>from the global Indian diaspora.<br></br><br></br>
                Told straight from the heart.<br/> 
                In a visually immersive,<br/> <span className={styles.nowrap}>documentary style format.</span><br/>
                We have coined it as <b>D<b style={{fontSize: '0.8em'}}>OCU</b>C<b style={{fontSize: '0.8em'}}>AST</b>™.</b>
              </p>
              <div style={{ marginTop: '2.2rem' }}></div>
              <button
                className={styles.pulse}
                style={{
                  background: 'linear-gradient(90deg, #FFD700 0%, #FFF8DC 40%, #FFD700 60%, #B8860B 100%)',
                  color: '#3a2600',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  borderRadius: '2.2rem',
                  boxShadow: '0 2px 12px 0 rgba(255,140,0,0.10)',
                  cursor: 'pointer',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block',
                  padding: '0.9em 2.2em',
                }}
                onClick={() => { navigate('/hitit'); }}
              >
                Hit It
              </button>
              <div className={styles['bottom-spacer']} aria-hidden="true"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hitit" element={<><SubpageWatermark size="45vw" opacity={SUBPAGE_WATERMARK_OPACITY} position="center center" zIndex={0} /><Navbar /><HitItPage /></>} />
        <Route path="/thoughts" element={<><SubpageWatermark size="45vw" opacity={SUBPAGE_WATERMARK_OPACITY} position="center center" zIndex={0} /><Navbar /><Thoughts /></>} />
        <Route path="/thoughts-format" element={<><SubpageWatermark size="45vw" opacity={SUBPAGE_WATERMARK_OPACITY} position="center center" zIndex={0} /><Navbar /><Thoughts scrollTo="format" /></>} />
        <Route path="/youafit" element={<><SubpageWatermark size="45vw" opacity={SUBPAGE_WATERMARK_OPACITY} position="center center" zIndex={0} /><Navbar /><YouAFit /></>} />
        <Route path="/showcase" element={<><SubpageWatermark size="45vw" opacity={SUBPAGE_WATERMARK_OPACITY} position="center center" zIndex={0} /><Navbar /><OurShowcase /></>} />
        <Route path="/jumpin" element={<><SubpageWatermark size="45vw" opacity={SUBPAGE_WATERMARK_OPACITY} position="center center" zIndex={0} /><Navbar /><JumpIn /></>} />
        <Route path="/supportus" element={<><SubpageWatermark size="45vw" opacity={SUBPAGE_WATERMARK_OPACITY} position="center center" zIndex={0} /><Navbar /><SupportUs /></>} />
        <Route path="/audiorecorder" element={<><SubpageWatermark size="45vw" opacity={SUBPAGE_WATERMARK_OPACITY} position="center center" zIndex={0} /><Navbar /><AudioRecorder /></>} />
      </Routes>
    </Router>
  );
}

export default App;
import { useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
