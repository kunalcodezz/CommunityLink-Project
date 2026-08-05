import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  LogIn, 
  User, 
  HeartHandshake, 
  Users, 
  ShieldAlert, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  UserPlus,
  AlertCircle
} from 'lucide-react';

export const LoginModal = ({ isOpen, onClose, targetTab, setActiveTab }) => {
  const { 
    firebaseSignIn, 
    firebaseSignUp, 
    firebaseGoogleSignIn,
    updateStudentProfile,
    openStudentSetupModal
  } = useApp();

  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [dob, setDob] = useState('');
  const [college, setCollege] = useState('');
  const [education, setEducation] = useState('B.Tech / B.E.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const roleOptions = [
    {
      id: 'student',
      title: 'Student Volunteer',
      icon: User,
      color: '#2563EB',
      description: 'Access student missions, log hours, track XP & earn verified certificates.'
    },
    {
      id: 'ngo',
      title: 'NGO Organization',
      icon: HeartHandshake,
      color: '#22C55E',
      description: 'Post drives, manage volunteer applications & issue official certificates.'
    },
    {
      id: 'resident',
      title: 'Local Resident',
      icon: Users,
      color: '#F59E0B',
      description: 'Report civic issues & connect with local student volunteer groups.'
    },
    {
      id: 'admin',
      title: 'Platform Admin',
      icon: ShieldAlert,
      color: '#8B5CF6',
      description: 'Monitor platform governance, verify NGOs & audit safety compliance.'
    }
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both Email and Password to continue.');
      return;
    }

    if (authMode === 'signup' && !displayName.trim()) {
      setErrorMessage('Please enter your Full Name for registration.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (authMode === 'signup') {
        await firebaseSignUp(email.trim(), password.trim(), displayName.trim(), selectedRole);
      } else {
        await firebaseSignIn(email.trim(), password.trim(), selectedRole);
      }

      if (selectedRole === 'student') {
        updateStudentProfile({
          name: displayName.trim() || email.split('@')[0],
          dob: dob || undefined,
          college: college.trim() || undefined,
          education: education || 'B.Tech / B.E.',
          isSetupComplete: true
        });
        if (!dob || !college) {
          openStudentSetupModal();
        }
      }

      if (setActiveTab && targetTab) {
        setActiveTab(targetTab);
      }
      onClose();
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      await firebaseGoogleSignIn(selectedRole);
      if (setActiveTab && targetTab) {
        setActiveTab(targetTab);
      }
      onClose();
    } catch (err) {
      setErrorMessage(err.message || 'Google Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '580px', padding: '2.25rem', position: 'relative' }}
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
            boxShadow: 'var(--shadow-neu-sm)',
            transition: 'all 0.2s'
          }}
        >
          <X size={18} />
        </button>

        {/* Header Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <img 
            src="/logo.png" 
            alt="CommunityLink Logo" 
            style={{
              height: '56px',
              width: 'auto',
              borderRadius: 'var(--radius-md)',
              objectFit: 'contain',
              marginBottom: '0.75rem',
              boxShadow: 'var(--shadow-neu-sm)'
            }}
          />

          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
            {authMode === 'signin' ? 'Sign In' : 'Create Account'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            {authMode === 'signin' ? 'Welcome back! Please enter your details.' : 'Join CommunityLink to start your social impact journey.'}
          </p>
        </div>

        {/* Sign In vs Sign Up Tabs */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-primary)',
          padding: '0.35rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem',
          boxShadow: 'var(--shadow-neu-inset)'
        }}>
          <button
            type="button"
            onClick={() => { setAuthMode('signin'); setErrorMessage(''); }}
            style={{
              flex: 1,
              padding: '0.6rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: authMode === 'signin' ? 'var(--primary)' : 'transparent',
              color: authMode === 'signin' ? '#fff' : 'var(--text-muted)',
              boxShadow: authMode === 'signin' ? '0 4px 10px rgba(37, 99, 235, 0.35)' : 'none',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
          >
            <LogIn size={15} /> Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('signup'); setErrorMessage(''); }}
            style={{
              flex: 1,
              padding: '0.6rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: authMode === 'signup' ? 'var(--primary)' : 'transparent',
              color: authMode === 'signup' ? '#fff' : 'var(--text-muted)',
              boxShadow: authMode === 'signup' ? '0 4px 10px rgba(37, 99, 235, 0.35)' : 'none',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
          >
            <UserPlus size={15} /> Create Account
          </button>
        </div>

        {/* Google Auth Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className="btn btn-secondary"
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.92rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '1.25rem'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>OR EMAIL & PASSWORD</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
        </div>

        {/* Account Role Selector */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>
            Select Profile Role:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            {roleOptions.map((r) => {
              const RoleIcon = r.icon;
              const isSelected = selectedRole === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  style={{
                    padding: '0.85rem 0.95rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? `2px solid ${r.color}` : '1px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: isSelected ? 'var(--shadow-neu-inset)' : 'var(--shadow-neu-sm)',
                    background: 'var(--bg-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: r.color,
                      color: '#FFFFFF',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <RoleIcon size={16} />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {r.title}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div style={{ position: 'absolute', top: '8px', right: '8px', color: r.color }}>
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleFormSubmit}>
          {authMode === 'signup' && (
            <div className="form-group" style={{ marginBottom: '0.75rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="form-input"
                style={{ padding: '0.75rem 0.95rem', fontSize: '0.88rem' }}
              />
            </div>
          )}

          {authMode === 'signup' && selectedRole === 'student' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Date of Birth (DOB)</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.75rem 0.95rem', fontSize: '0.85rem' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>College / University</label>
                <input
                  type="text"
                  placeholder="e.g. VJTI Mumbai"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.75rem 0.95rem', fontSize: '0.85rem' }}
                />
              </div>
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem', fontSize: '0.88rem' }}
              />
              <User size={15} style={{ position: 'absolute', left: '0.95rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem', fontSize: '0.88rem' }}
              />
              <Lock size={15} style={{ position: 'absolute', left: '0.95rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          {errorMessage && (
            <div style={{
              background: 'var(--accent-rose-light)',
              color: 'var(--accent-rose)',
              border: '1px solid var(--accent-rose)',
              padding: '0.75rem 0.95rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', fontWeight: 700 }}
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : authMode === 'signin' ? (
              <>
                <LogIn size={17} /> Sign In <ArrowRight size={17} />
              </>
            ) : (
              <>
                <UserPlus size={17} /> Create Account <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
