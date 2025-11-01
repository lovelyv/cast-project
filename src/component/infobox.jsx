import React from 'react';

function InfoBox({ children }) {
    return (
        <div style={{
            background: '#e8ecf5',
            borderRadius: '18px',
            padding: 'clamp(12px, 2.5vw, 24px)',
            color: '#23272f',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            width: '100%',
            maxWidth: '100%',
            margin: '0 auto',
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
            lineHeight: 1.5,
            overflowWrap: 'anywhere',
        }}>
            {children}
        </div>
    );
}

export default InfoBox;