import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Award, Medal, Crown, Flame, Star, Shield } from 'lucide-react';

export const Leaderboard = () => {
  const { leaderboard, studentProfile } = useApp();
  const [category, setCategory] = useState('weekly');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <span className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>
          <Trophy size={14} /> Student Impact Rankings
        </span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Community Leaderboard
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Recognizing exemplary student volunteers earning XP, logging service hours, and completing community missions across colleges.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
        {['weekly', 'monthly', 'college', 'city'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ textTransform: 'capitalize' }}
          >
            {cat} Leaderboard
          </button>
        ))}
      </div>

      {/* Top 3 Podium Showcase */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', alignItems: 'end', marginTop: '1rem' }}>
        
        {/* #2 Rank (Silver) */}
        <div className="glass-card" style={{ textAlign: 'center', padding: '1.75rem 1rem', borderTop: '4px solid #94a3b8' }}>
          <div style={{ position: 'relative', width: '70px', height: '70px', margin: '0 auto 0.75rem auto' }}>
            <img src={leaderboard[1].avatar} alt={leaderboard[1].name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', bottom: '-8px', right: '-4px', background: '#94a3b8', color: '#0f172a', fontWeight: 800, width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>2</span>
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{leaderboard[1].name}</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{leaderboard[1].college}</p>
          <span className="badge badge-blue">{leaderboard[1].xp} XP</span>
        </div>

        {/* #1 Rank (Gold - Crowned) */}
        <div className="glass-card pulse-glow" style={{ textAlign: 'center', padding: '2.25rem 1rem', borderTop: '4px solid #f59e0b', background: 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(245,158,11,0.1))' }}>
          <div style={{ color: '#f59e0b', marginBottom: '0.2rem' }}>
            <Crown size={28} />
          </div>
          <div style={{ position: 'relative', width: '85px', height: '85px', margin: '0 auto 0.75rem auto' }}>
            <img src={leaderboard[0].avatar} alt={leaderboard[0].name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f59e0b' }} />
            <span style={{ position: 'absolute', bottom: '-8px', right: '-4px', background: '#f59e0b', color: '#ffffff', fontWeight: 800, width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>1</span>
          </div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{leaderboard[0].name}</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{leaderboard[0].college}</p>
          <span className="badge badge-amber" style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}>{leaderboard[0].xp} XP</span>
        </div>

        {/* #3 Rank (Bronze) */}
        <div className="glass-card" style={{ textAlign: 'center', padding: '1.5rem 1rem', borderTop: '4px solid #b45309' }}>
          <div style={{ position: 'relative', width: '65px', height: '65px', margin: '0 auto 0.75rem auto' }}>
            <img src={leaderboard[2].avatar} alt={leaderboard[2].name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', bottom: '-8px', right: '-4px', background: '#b45309', color: '#ffffff', fontWeight: 800, width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>3</span>
          </div>
          <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>{leaderboard[2].name}</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{leaderboard[2].college}</p>
          <span className="badge badge-blue">{leaderboard[2].xp} XP</span>
        </div>

      </div>

      {/* Full Leaderboard Table */}
      <div className="glass-card" style={{ padding: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.85rem 1rem' }}>Rank</th>
              <th style={{ padding: '0.85rem 1rem' }}>Student</th>
              <th style={{ padding: '0.85rem 1rem' }}>College</th>
              <th style={{ padding: '0.85rem 1rem' }}>Service Hours</th>
              <th style={{ padding: '0.85rem 1rem' }}>XP Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((item) => (
              <tr 
                key={item.rank}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: item.name === studentProfile.name ? 'var(--primary-light)' : 'transparent'
                }}
              >
                <td style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>#{item.rank}</td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={item.avatar} alt={item.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontWeight: 700 }}>{item.name}</span>
                  </div>
                </td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{item.college}</td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{item.hours} hrs</td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <span className="badge badge-emerald">+{item.xp} XP</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
