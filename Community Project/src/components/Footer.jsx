import React from 'react';
import { HeartHandshake, Shield, Sparkles, Globe, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { language, setLanguage } = useApp();

  return (
    <footer style={{
      background: 'var(--bg-primary)',
      borderTop: '1px solid rgba(255, 255, 255, 0.8)',
      boxShadow: 'var(--shadow-neu-lg)',
      padding: '3rem 1.5rem 1.5rem 1.5rem',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2.5rem',
        marginBottom: '2.5rem'
      }}>
        
        {/* Brand Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <img 
              src="/logo.png" 
              alt="CommunityLink Logo" 
              style={{
                height: '36px',
                width: 'auto',
                borderRadius: 'var(--radius-sm)',
                objectFit: 'contain',
                boxShadow: 'var(--shadow-neu-sm)'
              }}
            />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>CommunityLink</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Bridging college students, local NGOs, and residents to create verifiable community impact through gamification, interactive mapping, and automated certificates.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>Platform Features</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <li>🌱 Environment & Clean-up Missions</li>
            <li>🩸 Health & Blood Donation Drives</li>
            <li>📚 STEM Mentorship & Slum Education</li>
            <li>🏆 XP Leaderboards & Verified Certificates</li>
            <li>🏡 Community Issue Reporting for Residents</li>
          </ul>
        </div>

        {/* Impact Numbers */}
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>Live Community Impact</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>1,480+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Volunteer Hours</div>
            </div>
            <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>35+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified NGOs</div>
            </div>
            <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-amber)' }}>420+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Certificates Issued</div>
            </div>
            <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-purple)' }}>98%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Issue Resolution</div>
            </div>
          </div>
        </div>

        {/* Language & Accessibility */}
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>Regional Support</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Select primary interface language:
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={18} color="var(--primary)" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="form-select"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
            >
              <option value="en">English (US/UK)</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
            </select>
          </div>
        </div>

      </div>

      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.82rem',
        color: 'var(--text-dim)'
      }}>
        <div>© 2026 CommunityLink Platform. Built for College Major Project.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Made with <Heart size={14} color="var(--accent-rose)" fill="var(--accent-rose)" /> for Social Good & Community Growth
        </div>
      </div>
    </footer>
  );
};
