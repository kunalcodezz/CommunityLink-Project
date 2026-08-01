import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartHandshake, 
  Bell, 
  Sun, 
  Moon, 
  User, 
  ShieldAlert, 
  Award, 
  Map, 
  Users, 
  CheckCircle,
  Sparkles,
  Eye,
  Globe,
  LogIn,
  LogOut,
  Lock
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { 
    currentUserRole, 
    setCurrentUserRole, 
    isLoggedIn,
    logout,
    openAuthModal,
    firebaseUser,
    theme, 
    setTheme, 
    notifications, 
    markNotificationAsRead,
    studentProfile,
    ngoProfile,
    accessibilityMode,
    setAccessibilityMode,
    language,
    setLanguage
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels = {
    student: { label: "Student View", icon: User, color: "var(--primary)" },
    ngo: { label: "NGO View", icon: HeartHandshake, color: "var(--accent-emerald)" },
    resident: { label: "Resident View", icon: Users, color: "var(--accent-amber)" },
    admin: { label: "Admin Portal", icon: ShieldAlert, color: "var(--accent-purple)" }
  };

  const getUserDisplayName = () => {
    if (firebaseUser) {
      return firebaseUser.displayName || firebaseUser.email || 'Firebase User';
    }
    switch (currentUserRole) {
      case 'student': return studentProfile?.name || 'Student User';
      case 'ngo': return ngoProfile?.name || 'NGO Org';
      case 'resident': return 'Resident User';
      case 'admin': return 'Admin User';
      default: return 'Firebase User';
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.75rem 1.5rem'
    }}>
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('feed')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <img 
            src="/logo.png" 
            alt="CommunityLink Logo" 
            style={{ 
              height: '45px', 
              width: 'auto', 
              borderRadius: 'var(--radius-md)', 
              objectFit: 'contain',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)'
            }} 
          />
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              CommunityLink
            </h1>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Smart Student Social Impact Platform
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            className={`btn btn-sm ${activeTab === 'feed' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('feed')}
          >
            <Users size={16} /> Community Feed
          </button>

          <button 
            className={`btn btn-sm ${activeTab === 'explore' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('explore')}
          >
            <Sparkles size={16} /> Explore Missions
          </button>

          <button 
            className={`btn btn-sm ${activeTab === 'map' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('map')}
          >
            <Map size={16} /> Impact Map
          </button>

          <button 
            className={`btn btn-sm ${activeTab === 'leaderboard' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            <Award size={16} /> Leaderboard
          </button>

          <button 
            className={`btn btn-sm ${activeTab === 'dashboard' ? (isLoggedIn ? 'btn-emerald' : 'btn-primary') : 'btn-secondary'}`}
            onClick={() => {
              if (isLoggedIn) {
                setActiveTab('dashboard');
              } else {
                openAuthModal('dashboard');
              }
            }}
          >
            {isLoggedIn ? (
              <>
                {currentUserRole === 'student' && <User size={16} />}
                {currentUserRole === 'ngo' && <HeartHandshake size={16} />}
                {currentUserRole === 'resident' && <Users size={16} />}
                {currentUserRole === 'admin' && <ShieldAlert size={16} />}
                My Portal ({currentUserRole.toUpperCase()})
              </>
            ) : (
              <>
                <Lock size={16} /> My Dashboard
              </>
            )}
          </button>
        </nav>

        {/* Controls Header Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Quick Role Switcher (If logged in) */}
          {isLoggedIn && (
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginRight: '0.4rem', fontWeight: 600 }}>Role:</span>
              <select
                value={currentUserRole}
                onChange={(e) => {
                  setCurrentUserRole(e.target.value);
                  setActiveTab('dashboard');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: roleLabels[currentUserRole].color,
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="student">🎓 Student</option>
                <option value="ngo">🤝 NGO Org</option>
                <option value="resident">🏡 Resident</option>
                <option value="admin">🛡️ Admin</option>
              </select>
            </div>
          )}

          {/* Accessibility Settings */}
          <button
            title="Accessibility Mode Toggle"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              if (accessibilityMode === 'normal') setAccessibilityMode('high-contrast');
              else if (accessibilityMode === 'high-contrast') setAccessibilityMode('large-text');
              else setAccessibilityMode('normal');
            }}
          >
            <Eye size={16} />
          </button>

          {/* Theme Toggle */}
          <button
            title="Toggle Light/Dark Theme"
            className="btn btn-secondary btn-sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={16} color="#fbbf24" /> : <Moon size={16} color="#3b82f6" />}
          </button>

          {/* Notifications Drawer Toggle */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{ position: 'relative' }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--accent-rose)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Drawer Popover */}
            {showNotifications && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '120%',
                width: '320px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-card)',
                padding: '1rem',
                zIndex: 200
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Notifications</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{unreadCount} unread</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '250px', overflowY: 'auto' }}>
                  {notifications.map(n => (
                    <div 
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      style={{
                        padding: '0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        background: n.read ? 'transparent' : 'var(--primary-light)',
                        borderLeft: n.read ? '3px solid transparent' : '3px solid var(--primary)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{n.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{n.message}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side Auth Control (Login vs User Profile / Logout) */}
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'var(--primary-light)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--primary)'
                }}
              >
                <User size={14} />
                <span>{getUserDisplayName()}</span>
              </div>
              <button 
                onClick={logout}
                className="btn btn-secondary btn-sm"
                title="Sign Out"
                style={{ color: 'var(--accent-rose)' }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => openAuthModal()}
              className="btn btn-primary btn-sm pulse-glow"
              style={{ fontWeight: 700, padding: '0.45rem 1rem' }}
            >
              <LogIn size={16} /> Log In
            </button>
          )}

        </div>
      </div>
    </header>
  );
};

