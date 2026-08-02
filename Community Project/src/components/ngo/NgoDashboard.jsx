import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  PlusCircle, 
  CheckCircle, 
  XCircle, 
  HeartHandshake, 
  Users, 
  Calendar, 
  MapPin, 
  Award,
  Sparkles,
  FileCheck
} from 'lucide-react';

export const NgoDashboard = () => {
  const { 
    ngoProfile, 
    missions, 
    createMission, 
    studentProfile, 
    approveStudentProof, 
    residentIssues 
  } = useApp();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newMission, setNewMission] = useState({
    title: '',
    category: 'Environment',
    location: '',
    date: '',
    time: '09:00 AM - 01:00 PM',
    durationHours: 4,
    slotsTotal: 20,
    xpReward: 150,
    badgeReward: 'Community Champion',
    requiredSkills: 'Teamwork, Physical Activity',
    description: '',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80'
  });

  // Filter missions owned by this NGO
  const ngoMissions = missions.filter(m => m.ngoId === ngoProfile.id || m.ngoName === ngoProfile.name);

  // Pending student proof approvals queue
  const pendingProofSubmissions = studentProfile.submittedProofs.filter(p => p.status === 'pending');

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createMission({
      ...newMission,
      requiredSkills: newMission.requiredSkills.split(',').map(s => s.trim())
    });
    setShowCreateModal(false);
    setNewMission({
      title: '',
      category: 'Environment',
      location: '',
      date: '',
      time: '09:00 AM - 01:00 PM',
      durationHours: 4,
      slotsTotal: 20,
      xpReward: 150,
      badgeReward: 'Community Champion',
      requiredSkills: 'Teamwork, Physical Activity',
      description: '',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* NGO Header */}
      <div className="glass-card" style={{
        background: 'var(--bg-primary)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            background: 'var(--bg-primary)',
            color: 'var(--accent-emerald)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-neu-sm)',
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}>
            <HeartHandshake size={32} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>{ngoProfile.name}</h2>
              <span className="badge badge-emerald">Verified NGO</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Reg No: {ngoProfile.registrationNo} • {ngoProfile.contactEmail}
            </p>
          </div>
        </div>

        <button className="btn btn-emerald" onClick={() => setShowCreateModal(true)}>
          <PlusCircle size={18} /> Create New Mission
        </button>
      </div>

      {/* Verification Queue Section */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileCheck size={20} color="var(--accent-amber)" /> Volunteer Proof Verification Queue
        </h3>

        {pendingProofSubmissions.length === 0 ? (
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No pending volunteer proof uploads requiring approval right now. All caught up! 🎉
          </div>
        ) : (
          <div className="grid-2">
            {pendingProofSubmissions.map((proof, idx) => {
              const mission = missions.find(m => m.id === proof.missionId);

              return (
                <div key={idx} className="glass-card" style={{ borderLeft: '4px solid var(--accent-amber)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="badge badge-amber">Pending Approval</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Submitted {new Date(proof.submittedAt).toLocaleDateString()}</span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem', color: 'var(--text-main)' }}>
                    Student: {studentProfile.name} ({studentProfile.college})
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.85rem' }}>
                    Mission: {mission ? mission.title : 'Community Drive'}
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                    <img
                      src={proof.proofImage}
                      alt="Proof"
                      style={{ 
                        width: '90px', 
                        height: '90px', 
                        borderRadius: 'var(--radius-md)', 
                        objectFit: 'cover',
                        boxShadow: 'var(--shadow-neu-sm)' 
                      }}
                    />
                    <div style={{ flex: 1, fontSize: '0.82rem', color: 'var(--text-muted)', background: 'var(--bg-primary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-neu-inset)' }}>
                      <strong style={{ color: 'var(--text-main)' }}>Notes:</strong> {proof.notes}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-emerald btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => approveStudentProof(proof.missionId, studentProfile.name)}
                    >
                      <CheckCircle size={15} /> Approve & Generate Cert (+{mission?.xpReward || 150} XP)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Active Missions Published by NGO */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={20} color="var(--primary)" /> Published Missions ({ngoMissions.length})
        </h3>

        <div className="grid-2">
          {ngoMissions.map(m => (
            <div key={m.id} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="badge badge-blue">{m.category}</span>
                <span className="badge badge-emerald">+{m.xpReward} XP</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>{m.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                📍 {m.location} • 📅 {m.date}
              </p>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                Registered Volunteers: {m.slotsTotal - m.slotsAvailable} / {m.slotsTotal}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Mission Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Create New Social Impact Mission</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Publish a volunteering initiative for students in your region.
            </p>

            <form onSubmit={handleCreateSubmit}>
              <div className="form-group">
                <label>Mission Title</label>
                <input
                  type="text"
                  required
                  value={newMission.title}
                  onChange={(e) => setNewMission({ ...newMission, title: e.target.value })}
                  placeholder="e.g. Mangrove Clean-Up & Sapling Drive"
                  className="form-input"
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newMission.category}
                    onChange={(e) => setNewMission({ ...newMission, category: e.target.value })}
                    className="form-select"
                  >
                    <option value="Environment">Environment</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Social Relief">Social Relief</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Location / Landmark</label>
                  <input
                    type="text"
                    required
                    value={newMission.location}
                    onChange={(e) => setNewMission({ ...newMission, location: e.target.value })}
                    placeholder="e.g. Carter Road Promenade, Bandra"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid-3">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    required
                    value={newMission.date}
                    onChange={(e) => setNewMission({ ...newMission, date: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="text"
                    value={newMission.time}
                    onChange={(e) => setNewMission({ ...newMission, time: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Duration (Hours)</label>
                  <input
                    type="number"
                    value={newMission.durationHours}
                    onChange={(e) => setNewMission({ ...newMission, durationHours: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Max Volunteer Slots</label>
                  <input
                    type="number"
                    value={newMission.slotsTotal}
                    onChange={(e) => setNewMission({ ...newMission, slotsTotal: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>XP Points Reward</label>
                  <input
                    type="number"
                    value={newMission.xpReward}
                    onChange={(e) => setNewMission({ ...newMission, xpReward: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description & Objectives</label>
                <textarea
                  rows="3"
                  required
                  value={newMission.description}
                  onChange={(e) => setNewMission({ ...newMission, description: e.target.value })}
                  placeholder="Explain what volunteers will be doing and what to bring..."
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-emerald">
                  Publish Mission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
