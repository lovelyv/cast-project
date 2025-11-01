import { useState } from 'react';
import docucastAsset from './assets/docucast.png';
 

function Background({ hideDocuCast = false }) {
  const base = import.meta.env.BASE_URL || '/';
  // Revert: prefer bundled PNG asset; fallback to public SVG placeholder
  const [imageSrc, setImageSrc] = useState(docucastAsset);
  const [showDocuCast, setShowDocuCast] = useState(true);
  return (
    <div style={{ padding: '80px 20px 60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Centered DocuCast image at top */}
      {showDocuCast && !hideDocuCast && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <figure style={{
            margin: 0,
            width: 'fit-content',
            maxWidth: '320px',
            background: 'transparent',
            border: '1px solid rgba(31,40,51,0.08)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(31, 40, 51, 0.08)'
          }}>
            <img
              src={imageSrc}
              alt="DocuCast — Documentary × Podcast"
              onError={() => {
                // Fallback: PNG asset -> public placeholder -> hide
                if (imageSrc.endsWith('.png')) {
                  setImageSrc(`${base}docucast.svg`);
                } else {
                  setShowDocuCast(false);
                }
              }}
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                padding: 0,
                backgroundColor: 'transparent'
              }}
            />
            <figcaption style={{
              width: '100%',
              textAlign: 'center',
              padding: '8px 10px 12px',
              color: '#364154',
              background: 'transparent',
              borderTop: '1px solid rgba(31,40,51,0.06)',
              fontSize: '0.85rem'
            }}>
              <div style={{
                fontWeight: 700,
                color: '#1f2833',
                letterSpacing: '0.2px',
                marginBottom: '2px'
              }}>DocuCast</div>
              <div style={{
                fontSize: '0.8rem',
                opacity: 0.85
              }}>Documentary storytelling meets podcast intimacy</div>
            </figcaption>
          </figure>
        </div>
      )}

      {/* Text content below, centered container */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ minWidth: '300px' }}>
          {/* Text content in a subtle card box */}
          <div style={{ 
            maxWidth: '520px',
            background: 'rgba(0,0,0,0.10)',
            border: '1px solid rgba(31,40,51,0.08)',
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 4px 12px rgba(31, 40, 51, 0.06)'
          }}>
            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
              lineHeight: 1.8, 
              color: '#23272f',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Over 6.5 million podcasts exist worldwide — yet most fade after a few episodes.
            </p>
            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
              lineHeight: 1.8, 
              color: '#23272f',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Traditional podcasts rely heavily on talk-based formats: two cameras, one composite shot, minimal narrative structure.
            </p>
            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
              lineHeight: 1.8, 
              color: '#23272f',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              The ones that thrive do so through storytelling craft — not technology — by holding audience attention through cinematic pacing, emotional truth, and immersive presentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Background;