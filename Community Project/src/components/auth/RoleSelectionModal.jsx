import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  HeartHandshake, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';

export const RoleSelectionModal = ({ isOpen, onClose, pendingUser, onConfirmRole }) => {
  const [selectedRole, setSelectedRole] = useState('student');

  if (!isOpen) return null;

  const roleOptions = [
    {
      id: 'student',
      title: '🎓 Student Volunteer',
      subtitle: 'Join social drives, earn XP, badges & verified certificates.',
      icon: User,
      color: '#2563EB',
      badgeClass: 'badge-blue'
    },
    {
      id: 'ngo',
      title: '🤝 NGO Organization',
      subtitle: 'Create community drives, verify student work & issue certificates.',
      icon: HeartHandshake,
      color: '#22C55E',
      badgeClass: 'badge-emerald'
    },
    {
      id: 'resident',
      title: '🏡 Local Resident',
      subtitle: 'Report civic issues, upvote local causes & connect with volunteers.',
      icon: Users,
      color: '#F59E0B',
      badgeClass: 'badge-amber'
    }
  ];

  const handleConfirm = () => {
    onConfirmRole(selectedRole);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '560px', padding: '2.25rem', position: 'relative' }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-primary)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            color: 'var(--text-muted)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-neu-sm)'
          }}
        >
          <X size={18} />
        </button>

        {/* User Google Greeting */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          {pendingUser?.photoURL ? (
            <img 
              src={pendingUser.photoURL} 
              alt="Google Profile" 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                boxShadow: 'var(--shadow-neu-sm)',
                marginBottom: '0.75rem',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--bg-primary)',
              boxShadow: 'var(--shadow-neu-sm)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem auto'
            }}>
              <User size={30} />
            </div>
          )}

          <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>
            <ShieldCheck size={13} /> Google Authenticated
          </span>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--text-main)' }}>
            Welcome, {pendingUser?.displayName || pendingUser?.email || 'User'}!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Please choose your platform role to setup your personalized dashboard:
          </p>
        </div>

        {/* Role Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          {roleOptions.map((r) => {
            const RoleIcon = r.icon;
            const isSelected = selectedRole === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                style={{
                  padding: '1.1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: isSelected ? 'var(--shadow-neu-inset)' : 'var(--shadow-neu-sm)',
                  border: isSelected ? `2px solid ${r.color}` : '1px solid rgba(255, 255, 255, 0.8)',
                  background: 'var(--bg-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: `${r.color}15`,
                    color: r.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <RoleIcon size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: isSelected ? r.color : 'var(--text-main)', marginBottom: '0.2rem' }}>
                      {r.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {r.subtitle}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div style={{ color: r.color, marginLeft: '0.5rem' }}>
                    <CheckCircle2 size={22} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Confirm Role Button */}
        <button
          onClick={handleConfirm}
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700 }}
        >
          Confirm Role & Access Dashboard <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
};
