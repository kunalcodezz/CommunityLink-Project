import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export const PremiumLandingPage = ({ onGetStarted, onExploreMissions, onSelectTab }) => {
  const { openAuthModal } = useApp();

  // Custom ultra-smooth easing curve for cinematic transitions
  const smoothEase = [0.22, 1, 0.36, 1];

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      minHeight: '100vh',
      overflow: 'hidden',
      backgroundColor: '#0B0F19',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      
      {/* 1. FULL SCREEN BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 1
        }}
        src="/Video.mp4"
      >
        <source src="/Video.mp4" type="video/mp4" />
      </video>

      {/* 2. FULL SCREEN DARK AESTHETIC OVERLAY */}
      <div style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(8, 11, 20, 0.58) 0%, rgba(13, 18, 32, 0.42) 50%, rgba(8, 11, 20, 0.62) 100%)',
        zIndex: 1
      }} />

      {/* 3. TOP RIGHT NAVBAR BUTTON (SILKY ENTRANCE) */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.1, ease: smoothEase }}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '2.25rem 4.5rem',
          willChange: 'transform, opacity'
        }}
      >
        <button
          onClick={() => openAuthModal('dashboard')}
          style={{
            background: 'linear-gradient(135deg, #FF5722 0%, #FF7043 100%)',
            color: '#FFFFFF',
            border: 'none',
            padding: '0.85rem 2.2rem',
            borderRadius: '9999px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 6px 26px rgba(255, 87, 34, 0.45)',
            transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          Get started
        </button>
      </motion.header>

      {/* 4. MAIN HERO CONTENT CONTAINER (CENTERED WITH SILKY FLOATING MOTION) */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '0 2rem',
        maxWidth: '920px',
        width: '100%',
        margin: '0 auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        
        {/* Soft Blurred Radial Glow Behind Typography */}
        <div style={{
          position: 'absolute',
          width: '650px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.12) 0%, rgba(37, 99, 235, 0.06) 45%, transparent 75%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: -1
        }} />

        {/* Silky Slow Floating Wrapper (12s Continuous Loop) */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          style={{ maxWidth: '820px', textAlign: 'center', width: '100%', willChange: 'transform' }}
        >
          {/* Cinema-Grade Heading (Sharp & Clear Entrance) */}
          <motion.h1
            initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, delay: 0.2, ease: smoothEase }}
            style={{
              fontSize: 'clamp(3.8rem, 7.5vw, 6.2rem)',
              fontWeight: 900,
              lineHeight: 0.92,
              color: '#FFFFFF',
              letterSpacing: '-0.04em',
              marginBottom: '2.25rem',
              textAlign: 'center',
              textShadow: '0 12px 35px rgba(0, 0, 0, 0.7), 0 2px 10px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.15)',
              willChange: 'transform, opacity, filter'
            }}
          >
            Unlock growth <br />
            with every <br />
            <span style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 50%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.2))'
            }}>
              mission
            </span>
          </motion.h1>

          {/* Silky Subtitle (Fades 300ms After Heading) */}
          <motion.p
            initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.5, ease: smoothEase }}
            style={{
              fontSize: 'clamp(1.15rem, 2.2vw, 1.35rem)',
              color: '#E2E8F0',
              lineHeight: 1.7,
              maxWidth: '680px',
              margin: '0 auto',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              textAlign: 'center',
              textShadow: '0 4px 18px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)',
              willChange: 'transform, opacity, filter'
            }}
          >
            Connect students, NGOs, and communities. Earn verified XP, track real service hours, and automate civic impact compliance.
          </motion.p>
        </motion.div>
      </div>

    </div>
  );
};
