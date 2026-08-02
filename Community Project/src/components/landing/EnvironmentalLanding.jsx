import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export const EnvironmentalLanding = ({ onGetStarted }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3D Scroll Animation calculations
  const rotateX = Math.max(-25, Math.min(25, 15 - scrollY * 0.05));
  const rotateY = Math.max(-20, Math.min(20, Math.sin(scrollY * 0.004) * 15));
  const translateZ = Math.min(80, scrollY * 0.1);
  const scale = Math.max(0.9, 1 - scrollY * 0.0004);

  return (
    <div style={{ 
      minHeight: '70vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '4rem 1.5rem',
      perspective: '1200px'
    }}>
      <div 
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s cubic-bezier(0.1, 0.5, 0.1, 1)',
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid rgba(255, 255, 255, 0.9)',
          boxShadow: 'var(--shadow-neu-xl)',
          padding: '5rem 3rem',
          textAlign: 'center',
          maxWidth: '550px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ transform: 'translateZ(60px)' }}>
          <button
            onClick={onGetStarted}
            className="btn btn-emerald btn-lg pulse-glow"
            style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              padding: '1.25rem 3.5rem',
              borderRadius: 'var(--radius-full)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.85rem',
              boxShadow: '-6px -6px 16px #FFFFFF, 8px 8px 24px rgba(34, 197, 94, 0.5)',
              cursor: 'pointer'
            }}
          >
            Get Started <ArrowRight size={26} />
          </button>
        </div>
      </div>
    </div>
  );
};
