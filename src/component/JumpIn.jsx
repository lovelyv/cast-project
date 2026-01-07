import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import AudioRecorder from './AudioRecorder';
import Navbar from './navbar';
import appStyles from '../App.module.css';
import styles from './JumpIn.module.css';
import SubpageWatermark from './SubpageWatermark';
import handpointer from '../assets/handpointer.png';
import Footer from './Footer';



function JumpIn() {
  const navigate = useNavigate();
  // Detect Android device
  const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);
  const [showRecorder, setShowRecorder] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    storySummary: ''
  });

  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Enter a valid email address.';
    if (formData.phone && !/^\+?[0-9\s\-()]{7,20}$/.test(formData.phone)) newErrors.phone = 'Enter a valid phone number.';
    // Story summary: 20 to 50 words
    if (formData.storySummary) {
      const wordCount = formData.storySummary.trim().split(/\s+/).filter(w => w.length > 0).length;
      if (wordCount > 50) {
        newErrors.storySummary = 'Please enter between 20 to 50 words.';
      }
    }
   
    if (!captchaToken) {
      newErrors.captcha = "Please verify captcha";
    
    }
    return newErrors;
  };
const API_SECRET = import.meta.env.VITE_API_SECRET;
 const JUMPIN_SUBMIT_URL = import.meta.env.VITE_SCRIPT_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const [submitMessage, setSubmitMessage] = useState("");
 
  const handleSubmit = (e) => { 
    e.preventDefault();
    const validationErrors = validate();
    if (!captchaToken) {
      validationErrors.captcha = 'Please verify you are not a robot.';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field
      const firstError = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstError);
      if (el && typeof el.focus === 'function') el.focus();
      return;
    }
    setErrors({});
    fetch(JUMPIN_SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: (`token=${API_SECRET}&fullName=${e.target.fullName.value}&email=${e.target.email.value}&phone=${e.target.phone.value}&storySummary=${e.target.storySummary.value}&captcha=${captchaToken}`)
    })
      .then(res => res.text())
      .then(resText => {
     
        const data = JSON.parse(resText);
        if (!data.success) 
          {
          
          // 🔐 Forbidden or validation error
          if (data.error === "Unauthorized") 
          {
            setSubmitMessage("Forbidden request – invalid token");
            return;
          }
          // 🔐 Forbidden or validation error
          if (data.error === "Captcha verification failed") 
          {
            setSubmitMessage("Captcha verification failed");
            return;
          }
        }
  setSubmitMessage("Thankyou!\nWe will be in touch soon.");
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          storySummary: ''
        });
      })
      .catch(error => {
        
        setSubmitMessage("There was an error submitting your story. Please try again.");
      });
  }

  return (
     <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
     <div className={appStyles['all-page']}>
        <SubpageWatermark size="60vmin" position="center center" zIndex={0} />
        <div className={styles["jumpin-container"]}>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <h2 id="jumpin-top" tabIndex="-1" className={`${appStyles.headline}`}>
              <span>We want<br/>to hear from you.</span>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 1.5em 0', marginTop: 0 }}>
              <img src={handpointer} alt="Hand pointer" className={styles.handpointerImg} />
            </div>
          </div>
          <b>IF</b>Your story resonates<br/> or you know someone<br/>whose journey<br/>
deserves to be showcased.<br/><br/>Share a few details.<br/>Our team<br/>will connect to explore<br/>fit, filming and collaboration.<br/><br/>
In the process,<br/>
showcasing and immortalizing you<br/>
across the entire digital landscape.<br/><br/><br/>



          <form
            onSubmit={handleSubmit}
            noValidate
            className={styles.form}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div className={styles['form-row']}>
              <label htmlFor="fullName" style={{ color: '#1a3a52', fontWeight: 'bold', marginBottom: 0 }}>
                Full Name <span aria-hidden="true" style={{ color: '#b00020' }}>*</span>
              </label>
              <div className={styles.inputStack}>
                <input
                  className={`${styles.opaqueField} ${styles.input40} ${errors.fullName ? styles.invalid : ''}`}
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  aria-required="true"
                  aria-invalid={errors.fullName ? 'true' : 'false'}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  autoComplete="name"
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    color: '#0d2d44',
                    backgroundColor: '#ffffff'
                  }}
                />
                {errors.fullName && (
                  <span id="fullName-error" role="alert" className={styles.errorText}>{errors.fullName}</span>
                )}
              </div>
            </div>

            <div className={styles['form-row']}>
              <label htmlFor="email" style={{ color: '#1a3a52', fontWeight: 'bold', marginBottom: 0 }}>
                Email <span aria-hidden="true" style={{ color: '#b00020' }}>*</span>
              </label>
              <div className={styles.inputStack}>
                <input
                  className={`${styles.opaqueField} ${styles.input40} ${errors.email ? styles.invalid : ''}`}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  autoComplete="email"
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    color: '#0d2d44',
                    backgroundColor: '#ffffff'
                  }}
                />
                {errors.email && (
                  <span id="email-error" role="alert" className={styles.errorText}>{errors.email}</span>
                )}
              </div>
            </div>
            


            <div className={styles['form-row']}>
              <label htmlFor="phone" style={{ color: '#1a3a52', fontWeight: 'bold', marginBottom: 0 }}>
                Phone
              </label>
              <div className={styles.inputStack}>
                <input
                  className={`${styles.opaqueField} ${styles.input40} ${errors.phone ? styles.invalid : ''}`}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number (optional)"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  autoComplete="tel"
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    color: '#0d2d44',
                    backgroundColor: '#ffffff'
                  }}
                />
                {errors.phone && (
                  <span id="phone-error" role="alert" className={styles.errorText}>{errors.phone}</span>
                )}
              </div>
            </div>

            <div className={styles['form-row']}>
              <label htmlFor="storySummary" style={{ color: '#1a3a52', fontWeight: 'bold', marginBottom: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                Story Summary
                {!isAndroid && (
                  <button type="button" aria-label="Record story summary" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setShowRecorder(true)}>
                    {showRecorder && (
                      <div 
                        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.32)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <div 
                          style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', padding: 32, minWidth: 320, maxWidth: '90vw', position: 'relative' }}
                          onClick={e => e.stopPropagation()}
                        >
                          <button 
                            onClick={e => { e.stopPropagation(); setShowRecorder(false); }} 
                            style={{ position: 'absolute', top: 8, right: 12, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#D2691E', zIndex: 10001 }} 
                            aria-label="Close recorder"
                          >&times;</button>
                          <AudioRecorder onTranscriptReady={t => setFormData(prev => ({ ...prev, storySummary: t }))} />
                        </div>
                      </div>
                    )}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D2691E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3" fill="#FFD700" stroke="#D2691E"/><path d="M5 10v2a7 7 0 0 0 14 0v-2"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>
                  </button>
                )}
              </label>
              <div className={styles.inputStack}>
                <textarea
                  className={`${styles.opaqueField} ${styles.input40}`}
                  id="storySummary"
                  name="storySummary"
                  value={formData.storySummary}
                  onChange={handleChange}
                  placeholder="Two to three sentences about your journey (optional)"
                  required
                  rows="4"
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    color: '#0d2d44',
                    backgroundColor: '#ffffff',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
                {errors.storySummary && (
                  <span id="storySummary-error" role="alert" className={styles.errorText}>{errors.storySummary}</span>
                )}
              </div>
            </div>

            {/* Removed alternate contact line per request */}
            <div className={styles.captchaBlock} style={{marginLeft: 'auto', marginRight: 'auto', display: 'flex', justifyContent: 'center'}}>
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={setCaptchaToken}
              />
            </div>
            <div style={{ marginTop: '0.5em', minHeight: '1.2em' }}>
              {errors.captcha && (
                <div style={{ color: 'red', fontSize: '0.95em', marginTop: '0.5em' }}>{errors.captcha}</div>
              )}
            </div>
            {submitMessage && (
              <div style={{ marginTop: '1em', color: '#1a3a52', fontWeight: 'bold', textAlign: 'center', whiteSpace: 'pre-line' }}>
                {submitMessage}
              </div>
            )}
            <button
              type="submit"
              className={styles['submit-btn']}
            >
              Submit Your Story
            </button>
            <button
              className={styles['submit-btn']}
              onClick={() => navigate('/showcase')}
            >
              Our Showcase
            </button>
          </form>
      
        </div>
    <Footer />
      </div>
    </div>
  );
}

export default JumpIn;
