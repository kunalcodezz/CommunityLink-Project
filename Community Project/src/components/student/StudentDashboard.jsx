import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  Clock, 
  CheckCircle, 
  Upload, 
  FileText, 
  Sparkles, 
  Star, 
  ShieldCheck,
  Calendar,
  ExternalLink,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { CertificateModal } from '../certificate/CertificateModal';

export const StudentDashboard = () => {
  const { 
    studentProfile, 
    missions, 
    badges, 
    certificates, 
    submitMissionProof,
    openStudentSetupModal
  } = useApp();

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [proofModalMission, setProofModalMission] = useState(null);
  const [proofImage, setProofImage] = useState('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80');
  const [proofNotes, setProofNotes] = useState('');

  const joinedMissionsList = missions.filter(m => studentProfile.joinedMissions.includes(m.id));

  // XP Progress calculation
  const nextLevelXp = 600; // Level goal for 'Leader'
  const xpPercentage = Math.min(100, Math.round((studentProfile.xp / nextLevelXp) * 100));

  const handleProofSubmit = (e) => {
    e.preventDefault();
    if (!proofModalMission) return;
    submitMissionProof(proofModalMission.id, proofImage, proofNotes);
    setProofModalMission(null);
    setProofNotes('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Student Banner Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
        borderLeft: '4px solid var(--primary)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Student Avatar"
            style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{studentProfile.name}</h2>
              <span className="badge badge-purple">
                <Star size={12} fill="#c084fc" /> {studentProfile.level}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{studentProfile.college || 'College N/A'} • {studentProfile.email}</p>
          </div>
        </div>

        {/* Edit Student Info Button */}
        <button
          onClick={openStudentSetupModal}
          className="btn btn-secondary btn-sm"
          style={{ gap: '0.4rem', fontWeight: 700 }}
        >
          ✏️ Edit Academic Profile
        </button>

        {/* Level XP Progress Bar */}
        <div style={{ minWidth: '260px', flex: 1, maxWidth: '350px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 600 }}>
            <span>XP Progress to 'Leader'</span>
            <span style={{ color: 'var(--primary)' }}>{studentProfile.xp} / {nextLevelXp} XP</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{ width: `${xpPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: 'var(--radius-full)', transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>

      {/* Student Academic Details Card */}
      <div className="glass-card" style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-secondary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🎓 Student Academic & Personal Info
          </h3>
          <button onClick={openStudentSetupModal} className="btn btn-outline btn-sm" style={{ fontSize: '0.8rem' }}>
            Update Details
          </button>
        </div>

        <div className="grid-4" style={{ gap: '1rem' }}>
          <div style={{ background: 'var(--bg-primary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>Full Name</span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{studentProfile.name || 'Not provided'}</strong>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>Date of Birth (DOB)</span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--primary)' }}>{studentProfile.dob || '15/05/2004'}</strong>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>College / University</span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--accent-emerald)' }}>{studentProfile.college || 'VJTI Mumbai'}</strong>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>Education Level</span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--accent-purple)' }}>{studentProfile.education || 'B.Tech / B.E.'}</strong>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid-4">
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--primary-light)', padding: '0.85rem', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{studentProfile.xp} XP</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Earned Points</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--accent-emerald-light)', padding: '0.85rem', borderRadius: 'var(--radius-md)', color: 'var(--accent-emerald)' }}>
            <Clock size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{studentProfile.hoursLogged} Hours</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Service</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--accent-amber-light)', padding: '0.85rem', borderRadius: 'var(--radius-md)', color: 'var(--accent-amber)' }}>
            <Award size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{studentProfile.badges.length} Badges</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Unlocked Badges</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--accent-purple-light)', padding: '0.85rem', borderRadius: 'var(--radius-md)', color: 'var(--accent-purple)' }}>
            <FileText size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{certificates.length} Certs</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Official Certificates</div>
          </div>
        </div>
      </div>

      {/* Joined Missions & Verification Status */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={20} color="var(--primary)" /> Joined Missions & Completion Verification
        </h3>

        {joinedMissionsList.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>You haven't joined any social impact missions yet.</p>
            <button onClick={() => window.location.hash = '#explore'} className="btn btn-primary">
              Explore Active Missions
            </button>
          </div>
        ) : (
          <div className="grid-2">
            {joinedMissionsList.map(mission => {
              const proof = studentProfile.submittedProofs.find(p => p.missionId === mission.id);
              
              return (
                <div key={mission.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <span className="badge badge-blue">{mission.category}</span>
                      <span className="badge badge-emerald">+{mission.xpReward} XP</span>
                    </div>

                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{mission.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                      Organized by <strong style={{ color: 'var(--text-main)' }}>{mission.ngoName}</strong>
                    </p>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1rem' }}>
                      <div>📅 {mission.date} ({mission.time})</div>
                      <div>📍 {mission.location}</div>
                    </div>
                  </div>

                  {/* Submission & Status Footer */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                    {proof ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>
                          {proof.status === 'approved' && <span style={{ color: 'var(--accent-emerald)' }}>✅ Approved by NGO</span>}
                          {proof.status === 'pending' && <span style={{ color: 'var(--accent-amber)' }}>⏳ Pending NGO Verification</span>}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Proof Uploaded</span>
                      </div>
                    ) : (
                      <button
                        className="btn btn-outline btn-sm"
                        style={{ width: '100%' }}
                        onClick={() => setProofModalMission(mission)}
                      >
                        <Upload size={14} /> Upload Completion Proof (Image & Notes)
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Verified Certificates Section */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={20} color="var(--accent-emerald)" /> Verified Certificates & QR Tokens
        </h3>

        <div className="grid-2">
          {certificates.map(cert => (
            <div key={cert.id} className="glass-card" style={{ borderLeft: '4px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>ID: {cert.id}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Issued {cert.issueDate}</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.3rem' }}>{cert.missionTitle}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Issued by {cert.ngoName} for {cert.hoursLogged} hours of service.
              </p>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedCertificate(cert)}
              >
                <ExternalLink size={14} /> View & Download Verified Certificate
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Showcase */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={20} color="var(--accent-amber)" /> Achievement Badges Showcase
        </h3>

        <div className="grid-3">
          {badges.map(b => {
            const isUnlocked = studentProfile.badges.includes(b.id);
            return (
              <div 
                key={b.id} 
                className="glass-card" 
                style={{
                  opacity: isUnlocked ? 1 : 0.5,
                  border: isUnlocked ? '1px solid rgba(245, 158, 11, 0.4)' : '1px dashed var(--border-color)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{b.icon}</div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{b.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{b.description}</p>
                <span className={`badge ${isUnlocked ? 'badge-amber' : 'badge-blue'}`}>
                  {isUnlocked ? 'Unlocked 🎉' : `Requires ${b.requiredHours} Hours`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Upload Proof Form */}
      {proofModalMission && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Upload Proof: {proofModalMission.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Submit photo proof or activity notes for verification by {proofModalMission.ngoName}.
            </p>

            <form onSubmit={handleProofSubmit}>
              <div className="form-group">
                <label>Photo Proof URL / Sample</label>
                <input
                  type="text"
                  value={proofImage}
                  onChange={(e) => setProofImage(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Activity Summary / Notes</label>
                <textarea
                  rows="3"
                  value={proofNotes}
                  onChange={(e) => setProofNotes(e.target.value)}
                  placeholder="Describe what you accomplished during the mission..."
                  className="form-textarea"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setProofModalMission(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit to NGO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Printable Certificate */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}

    </div>
  );
};
