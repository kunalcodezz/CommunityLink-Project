import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  User, 
  Eye, 
  LogIn, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { 
    currentUserRole, 
    isLoggedIn,
    logout,
    openAuthModal,
    firebaseUser,
    notifications, 
    markNotificationAsRead,
    studentProfile,
    ngoProfile,
    accessibilityMode,
    setAccessibilityMode
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Do not render Navbar if user is logged out
  if (!isLoggedIn) {
    return null;
  }

  const getUserDisplayName = () => {
    if (firebaseUser) {
      return firebaseUser.displayName || firebaseUser.email || 'User';
    }
    switch (currentUserRole) {
      case 'student': return studentProfile?.name || 'Student';
      case 'ngo': return ngoProfile?.name || 'NGO Partner';
      case 'resident': return 'Resident';
      case 'admin': return 'Admin';
      default: return 'User';
    }
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setMobileMenuOpen(false);
    logout();
  };

  const navTabs = [
    ...(!isLoggedIn ? [{ id: 'landing', label: 'Eco Home' }] : []),
    { id: 'feed', label: 'Feed' },
    ...(currentUserRole !== 'ngo' ? [{ id: 'explore', label: 'Missions' }] : []),
    { id: 'map', label: 'Impact Map' },
    { id: 'leaderboard', label: 'Leaderboard' },
    ...(isLoggedIn ? [{ id: 'dashboard', label: 'My Portal' }] : [])
  ];

  return (
    <div className="dark-navbar-wrapper">
      <div className="dark-navbar-inner">

        {/* BRAND LOGO */}
        <div 
          onClick={() => {
            setActiveTab(isLoggedIn ? 'feed' : 'landing');
            setMobileMenuOpen(false);
          }}
          className="dark-navbar-brand"
        >
          <div style={{ position: 'relative' }}>
            <img 
              src="/logo.png" 
              alt="CommunityLink Logo" 
              style={{ 
                height: '32px', 
                width: 'auto', 
                borderRadius: '8px', 
                objectFit: 'contain',
                opacity: 0.95
              }} 
            />
            <span style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22C55E',
              border: '1.5px solid #0a0a0a',
              boxShadow: '0 0 6px rgba(34, 197, 94, 0.8)'
            }} />
          </div>
          <span className="dark-navbar-brand-name">CommunityLink</span>
        </div>

        {/* DESKTOP NAVIGATION TABS */}
        <nav className="dark-nav-tabs desktop-nav-pills">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'dashboard' && !isLoggedIn) {
                    openAuthModal('dashboard');
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`dark-nav-tab-btn ${isActive ? 'active' : ''}`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="dark-nav-tab-underline"
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* DESKTOP CONTROLS */}
        <div className="dark-navbar-controls desktop-controls-group">

          {/* Accessibility Toggle */}
          <button
            title={`Accessibility: ${accessibilityMode}`}
            className="dark-nav-icon-btn"
            onClick={() => {
              if (accessibilityMode === 'normal') setAccessibilityMode('high-contrast');
              else if (accessibilityMode === 'high-contrast') setAccessibilityMode('large-text');
              else setAccessibilityMode('normal');
            }}
          >
            <Eye size={15} color={accessibilityMode !== 'normal' ? '#22C55E' : 'rgba(255,255,255,0.65)'} />
          </button>

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button
              className="dark-nav-icon-btn"
              style={{ position: 'relative' }}
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
            >
              <Bell size={15} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  background: '#EF4444',
                  color: '#fff',
                  fontSize: '0.58rem',
                  fontWeight: 900,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid #0a0a0a'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 12px)',
                    width: '310px',
                    background: '#161616',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    padding: '1rem',
                    zIndex: 300
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', margin: 0 }}>Notifications</h4>
                    <span style={{ fontSize: '0.7rem', color: '#22C55E', fontWeight: 700 }}>{unreadCount} unread</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '260px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '1rem' }}>
                        No notifications yet!
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          style={{
                            padding: '0.6rem 0.8rem',
                            borderRadius: '8px',
                            background: n.read ? 'rgba(255,255,255,0.04)' : 'rgba(37, 99, 235, 0.15)',
                            border: `1px solid ${n.read ? 'rgba(255,255,255,0.06)' : 'rgba(37, 99, 235, 0.3)'}`,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: n.read ? 'rgba(255,255,255,0.45)' : '#60A5FA' }}>
                            {n.title}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.12rem' }}>
                            {n.message}
                          </div>
                          <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.2rem', fontWeight: 600 }}>
                            {n.time}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Auth */}
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.3rem 0.8rem',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.85)',
              }}>
                <User size={13} color="rgba(255,255,255,0.6)" />
                <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {getUserDisplayName()}
                </span>
              </div>
              <button 
                onClick={() => setShowLogoutModal(true)}
                className="dark-nav-icon-btn"
                title="Sign Out"
                style={{ color: '#EF4444' }}
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => openAuthModal('dashboard')}
              className="dark-nav-login-btn"
            >
              <LogIn size={14} /> Log In
            </button>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="dark-nav-icon-btn mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

      </div>

      {/* MOBILE EXPANDABLE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="dark-mobile-drawer"
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.id === 'dashboard' && !isLoggedIn) {
                        openAuthModal('dashboard');
                      } else {
                        setActiveTab(tab.id);
                      }
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.7rem 1rem',
                      borderRadius: '10px',
                      border: isActive ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.08)',
                      background: isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Bottom Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="dark-nav-icon-btn"
                  onClick={() => {
                    if (accessibilityMode === 'normal') setAccessibilityMode('high-contrast');
                    else if (accessibilityMode === 'high-contrast') setAccessibilityMode('large-text');
                    else setAccessibilityMode('normal');
                  }}
                >
                  <Eye size={15} />
                </button>
              </div>

              {isLoggedIn ? (
                <button
                  onClick={() => setShowLogoutModal(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
                    color: '#EF4444', borderRadius: '8px', padding: '0.45rem 1rem',
                    fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)'
                  }}
                >
                  <LogOut size={14} /> Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    openAuthModal('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="dark-nav-login-btn"
                >
                  <LogIn size={14} /> Log In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGOUT CONFIRMATION POPUP MODAL */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '400px',
                padding: '2rem 1.75rem',
                textAlign: 'center',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-neu-xl)'
              }}
            >
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <LogOut size={26} />
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Confirm Sign Out
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.75rem' }}>
                Are you sure you want to log out of CommunityLink?
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.65rem', fontWeight: 700, borderRadius: '12px' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="btn"
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    fontWeight: 700,
                    borderRadius: '12px',
                    background: '#EF4444',
                    color: '#ffffff',
                    border: 'none',
                    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)'
                  }}
                >
                  Log Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
