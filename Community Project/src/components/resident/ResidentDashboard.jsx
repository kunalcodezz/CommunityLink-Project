import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertTriangle, 
  MapPin, 
  ThumbsUp, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  Users, 
  Send 
} from 'lucide-react';

export const ResidentDashboard = () => {
  const { residentIssues, reportIssue, upvoteIssue } = useApp();

  const [showFormModal, setShowFormModal] = useState(false);
  const [newIssue, setNewIssue] = useState({
    title: '',
    category: 'Sanitation',
    location: '',
    urgency: 'Medium',
    description: '',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    reportIssue(newIssue);
    setShowFormModal(false);
    setNewIssue({
      title: '',
      category: 'Sanitation',
      location: '',
      urgency: 'Medium',
      description: '',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Resident Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)',
        borderLeft: '4px solid var(--accent-amber)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'var(--accent-amber)',
            color: '#fff',
            padding: '1rem',
            borderRadius: 'var(--radius-md)'
          }}>
            <Users size={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Resident Community Request Portal</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Report local civic or community needs (cleanups, blood drives, food distribution, book donations) to connect with student volunteer groups and NGOs.
            </p>
          </div>
        </div>

        <button className="btn btn-amber" onClick={() => setShowFormModal(true)}>
          <PlusCircle size={18} /> Report Community Issue
        </button>
      </div>

      {/* Reported Issues List */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={20} color="var(--accent-amber)" /> Active Community Reports ({residentIssues.length})
        </h3>

        <div className="grid-2">
          {residentIssues.map(issue => (
            <div key={issue.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-amber">{issue.category}</span>
                  <span className={`badge ${issue.urgency === 'High' ? 'badge-rose' : 'badge-blue'}`}>
                    Urgency: {issue.urgency}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>{issue.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                  📍 {issue.location} • Submitted by {issue.residentName} on {issue.date}
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                  <img
                    src={issue.image}
                    alt={issue.title}
                    style={{ width: '100px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                  />
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, flex: 1 }}>
                    {issue.description}
                  </p>
                </div>
              </div>

              {/* Status & Upvote Footer */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={14} /> Status: {issue.status}
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => upvoteIssue(issue.id)}
                >
                  <ThumbsUp size={14} color="var(--primary)" /> {issue.upvotes} Upvotes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Report Community Issue Form */}
      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>Report Local Community Need</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Provide details so nearby student groups and NGOs can assist.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Issue / Need Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Park Garbage Cleanup or Slum Reading Material Need"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newIssue.category}
                    onChange={(e) => setNewIssue({ ...newIssue, category: e.target.value })}
                    className="form-select"
                  >
                    <option value="Sanitation">Sanitation & Cleanup</option>
                    <option value="Education">Education & Books</option>
                    <option value="Health">Health & Blood Need</option>
                    <option value="Food Relief">Food & Clothes Relief</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Urgency Level</label>
                  <select
                    value={newIssue.urgency}
                    onChange={(e) => setNewIssue({ ...newIssue, urgency: e.target.value })}
                    className="form-select"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High (Urgent)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Exact Location / Area Landmark</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sector 4 Primary School Road, Airoli"
                  value={newIssue.location}
                  onChange={(e) => setNewIssue({ ...newIssue, location: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Description & Requirements</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Explain the problem or how volunteers can help..."
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowFormModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-amber">
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
