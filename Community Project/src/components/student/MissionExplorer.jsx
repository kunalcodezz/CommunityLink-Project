import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  Sparkles, 
  CheckCircle, 
  Bot, 
  ArrowRight,
  PlusCircle
} from 'lucide-react';

export const MissionExplorer = () => {
  const { missions, joinMission, studentProfile } = useApp();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMissionForModal, setSelectedMissionForModal] = useState(null);
  const [showAiSummaryModal, setShowAiSummaryModal] = useState(null);

  const categories = ['All', 'Environment', 'Health', 'Education', 'Social Relief'];

  // Filter Missions
  const filteredMissions = missions.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.ngoName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Banner */}
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
        <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={14} /> AI-Powered Smart Matching
        </span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>
          Discover Local Social Impact Opportunities
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Browse verified NGO missions near your college, earn XP rewards & badges, and build verifiable community service credentials.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by mission name, NGO, or city location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="grid-2">
        {filteredMissions.map(mission => {
          const isJoined = studentProfile.joinedMissions.includes(mission.id);

          return (
            <div key={mission.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', padding: 0 }}>
              
              {/* Card Image Header */}
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img
                  src={mission.image}
                  alt={mission.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.95), transparent)' }} />
                
                <span className="badge badge-blue" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  {mission.category}
                </span>

                <span className="badge badge-emerald" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                  +{mission.xpReward} XP
                </span>

                <div style={{ position: 'absolute', bottom: '0.75rem', left: '1rem', right: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 700 }}>{mission.ngoName}</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.3 }}>{mission.title}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={15} color="var(--primary)" /> <span>{mission.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={15} color="var(--accent-amber)" /> <span>{mission.date} ({mission.time})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Users size={15} color="var(--accent-emerald)" /> <span>{mission.slotsAvailable} / {mission.slotsTotal} slots open</span>
                    </div>
                  </div>

                  {/* Required Skills Chips */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {mission.requiredSkills.map(skill => (
                      <span key={skill} style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)' }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* AI Summary Banner */}
                  <div style={{
                    background: 'var(--accent-purple-light)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.82rem',
                    marginBottom: '1.25rem',
                    color: 'var(--text-main)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: '#c084fc', marginBottom: '0.2rem' }}>
                      <Bot size={14} /> AI Quick Summary
                    </div>
                    {mission.aiSummary}
                  </div>
                </div>

                {/* Footer Controls */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => setSelectedMissionForModal(mission)}
                  >
                    Details
                  </button>

                  {isJoined ? (
                    <button className="btn btn-emerald btn-sm" style={{ flex: 1 }} disabled>
                      <CheckCircle size={15} /> Registered
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => joinMission(mission.id)}
                    >
                      Join Mission (+{mission.xpReward} XP)
                    </button>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Mission Detail Modal */}
      {selectedMissionForModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span className="badge badge-purple">{selectedMissionForModal.category}</span>
              <span className="badge badge-emerald">+{selectedMissionForModal.xpReward} XP</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.3rem' }}>{selectedMissionForModal.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '1.25rem' }}>
              Organized by {selectedMissionForModal.ngoName}
            </p>

            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div>📍 <strong>Location:</strong> {selectedMissionForModal.location}</div>
              <div>📅 <strong>Date & Time:</strong> {selectedMissionForModal.date} ({selectedMissionForModal.time})</div>
              <div>⏱️ <strong>Duration:</strong> {selectedMissionForModal.durationHours} hours of service</div>
              <div>👥 <strong>Available Slots:</strong> {selectedMissionForModal.slotsAvailable} / {selectedMissionForModal.slotsTotal}</div>
              <div>🏅 <strong>Badge Progress:</strong> {selectedMissionForModal.badgeReward}</div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Full Description</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{selectedMissionForModal.description}</p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedMissionForModal(null)}>Close</button>
              {!studentProfile.joinedMissions.includes(selectedMissionForModal.id) && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    joinMission(selectedMissionForModal.id);
                    setSelectedMissionForModal(null);
                  }}
                >
                  Confirm Registration
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
