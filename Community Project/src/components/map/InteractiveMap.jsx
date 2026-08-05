import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Navigation, Filter, Layers, CheckCircle } from 'lucide-react';

export const InteractiveMap = () => {
  const { missions, residentIssues, joinMission, studentProfile, currentUserRole } = useApp();
  const [filterType, setFilterType] = useState('all'); // 'all' | 'missions' | 'issues'
  const [selectedPin, setSelectedPin] = useState(null);

  const displayMissions = filterType === 'issues' ? [] : missions;
  const displayIssues = filterType === 'missions' ? [] : residentIssues;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Controls */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MapPin color="var(--primary)" /> Interactive Community & Impact Map
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Locate nearby social impact missions, registered NGOs, and resident civic issue reports visually.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`btn btn-sm ${filterType === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterType('all')}
          >
            Show All Pins
          </button>
          <button
            className={`btn btn-sm ${filterType === 'missions' ? 'btn-emerald' : 'btn-secondary'}`}
            onClick={() => setFilterType('missions')}
          >
            🌱 Missions Only ({missions.length})
          </button>
          <button
            className={`btn btn-sm ${filterType === 'issues' ? 'btn-amber' : 'btn-secondary'}`}
            onClick={() => setFilterType('issues')}
          >
            🏡 Resident Issues ({residentIssues.length})
          </button>
        </div>
      </div>

      {/* Map Layout split view */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        {/* Visual Simulated Interactive Map Window */}
        <div className="glass-card" style={{ padding: 0, position: 'relative', height: '550px', overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
          
          {/* Map Canvas Background Simulation */}
          <iframe
            title="Mumbai Community Map"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=72.7800%2C18.9500%2C73.0500%2C19.2000&amp;layer=mapnik"
          />

          {/* Floating Interactive Marker Pins Overlay */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            
            {/* Mission Pin 1: Powai Lake */}
            {(filterType === 'all' || filterType === 'missions') && (
              <div 
                onClick={() => setSelectedPin({ type: 'mission', data: missions[0] })}
                style={{
                  position: 'absolute',
                  top: '35%',
                  left: '60%',
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  transform: 'translate(-50%, -50%)',
                  background: 'var(--secondary)',
                  color: '#0F172A',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '2.5px solid #0F172A',
                  boxShadow: '3px 3px 0px #0F172A',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
                className="pulse-glow"
              >
                🌱 Powai Lake Clean-up (+150 XP)
              </div>
            )}

            {/* Mission Pin 2: KEM Hospital Parel */}
            {(filterType === 'all' || filterType === 'missions') && (
              <div 
                onClick={() => setSelectedPin({ type: 'mission', data: missions[1] })}
                style={{
                  position: 'absolute',
                  top: '65%',
                  left: '42%',
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  transform: 'translate(-50%, -50%)',
                  background: 'var(--accent-rose)',
                  color: '#ffffff',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '2.5px solid #0F172A',
                  boxShadow: '3px 3px 0px #0F172A',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                🩸 Blood Drive KEM (+200 XP)
              </div>
            )}

            {/* Resident Issue Pin 1: Airoli Container */}
            {(filterType === 'all' || filterType === 'issues') && (
              <div 
                onClick={() => setSelectedPin({ type: 'issue', data: residentIssues[0] })}
                style={{
                  position: 'absolute',
                  top: '25%',
                  left: '80%',
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  transform: 'translate(-50%, -50%)',
                  background: 'var(--accent)',
                  color: '#0F172A',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '2.5px solid #0F172A',
                  boxShadow: '3px 3px 0px #0F172A',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                ⚠️ Garbage Cleanup Need
              </div>
            )}

          </div>

          {/* Map Overlay Badge Info */}
          <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: '#FFFFFF', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: '#0F172A', fontWeight: 800, border: '2.5px solid #0F172A', boxShadow: '3px 3px 0px #0F172A' }}>
            Showing pins across Greater Mumbai & Navi Mumbai
          </div>

        </div>

        {/* Sidebar Info Panel */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '550px' }}>
          
          {selectedPin ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className={`badge ${selectedPin.type === 'mission' ? 'badge-emerald' : 'badge-amber'}`}>
                  {selectedPin.type === 'mission' ? 'Active Mission' : 'Resident Civic Report'}
                </span>
                <button 
                  onClick={() => setSelectedPin(null)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Clear Selection
                </button>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                {selectedPin.data.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                📍 {selectedPin.data.location}
              </p>

              <img
                src={selectedPin.data.image}
                alt="Selected item"
                style={{ width: '100%', height: '160px', borderRadius: 'var(--radius-md)', objectFit: 'cover', marginBottom: '1rem' }}
              />

              <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
                {selectedPin.data.description}
              </p>

              {selectedPin.type === 'mission' && currentUserRole !== 'ngo' && currentUserRole !== 'admin' && (
                <div>
                  {!studentProfile.joinedMissions.includes(selectedPin.data.id) ? (
                    <button
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                      onClick={() => joinMission(selectedPin.data.id)}
                    >
                      Join Mission (+{selectedPin.data.xpReward} XP)
                    </button>
                  ) : (
                    <button className="btn btn-emerald" style={{ width: '100%' }} disabled>
                      <CheckCircle size={16} /> Registered
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Navigation size={36} color="var(--primary)" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                Select Map Pins
              </h4>
              <p style={{ fontSize: '0.85rem' }}>
                Click any interactive marker on the map to inspect mission details, available slots, and register!
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
