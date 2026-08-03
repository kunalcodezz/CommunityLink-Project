import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  User, 
  Award, 
  Map, 
  Users, 
  Sparkles,
  Eye,
  LogIn,
  LogOut,
  Lock,
  TreePine,
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

  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navTabs = [
    ...(!isLoggedIn ? [{ id: 'landing', label: 'Eco Home', icon: TreePine }] : []),
    { id: 'feed', label: 'Feed', icon: Users },
    { id: 'explore', label: 'Missions', icon: Sparkles },
    { id: 'map', label: 'Impact Map', icon: Map },
    { id: 'leaderboard', label: 'Leaderboard', icon: Award },
    ...(isLoggedIn ? [{ id: 'dashboard', label: 'My Portal', icon: User }] : [])
  ];

  return (
    <div className={`floating-navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className={`floating-navbar-card ${isScrolled ? 'scrolled' : ''}`} style={{ background: '#FFFFFF' }}>
        
        {/* BRAND LOGO */}
        <div 
          onClick={() => {
            setActiveTab(isLoggedIn ? 'feed' : 'landing');
            setMobileMenuOpen(false);
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', flexShrink: 0 }}
        >
          <div style={{ position: 'relative' }}>
            <img 
              src="/logo.png" 
              alt="CommunityLink Logo" 
              style={{ 
                height: '38px', 
                width: 'auto', 
                borderRadius: '10px', 
                objectFit: 'contain',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)',
                border: '1px solid rgba(226, 232, 240, 0.8)'
              }} 
            />
            <span style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#22C55E',
              border: '2px solid #FFF',
              boxShadow: '0 0 6px rgba(34, 197, 94, 0.8)'
            }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '1.25rem', 
                fontWeight: 900, 
                color: 'var(--text-main)', 
                letterSpacing: '-0.03em',
                lineHeight: 1.1 
              }}>
                CommunityLink
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.62rem', padding: '0.15rem 0.45rem', fontWeight: 800 }}>
                HUB
              </span>
            </div>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, margin: 0, lineHeight: 1 }}>
              Student Social Impact Platform
            </p>
          </div>
        </div>

        {/* DESKTOP NAVIGATION PILLS */}
        <nav className="desktop-nav-pills nav-pills-container">
          {navTabs.map((tab) => {
            const TabIcon = tab.icon;
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
                className={`nav-pill-btn ${isActive ? 'active' : ''}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activePillBg"
                    className={`nav-pill-active-bg ${tab.id === 'landing' ? 'landing' : ''}`}
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <TabIcon size={15} style={{ zIndex: 1, position: 'relative' }} />
                <span style={{ zIndex: 1, position: 'relative' }}>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* DESKTOP CONTROL BUTTONS */}
        <div className="desktop-controls-group" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          
          {/* Accessibility Toggle */}
          <button
            title={`Accessibility: ${accessibilityMode}`}
            className="nav-icon-btn"
            onClick={() => {
              if (accessibilityMode === 'normal') setAccessibilityMode('high-contrast');
              else if (accessibilityMode === 'high-contrast') setAccessibilityMode('large-text');
              else setAccessibilityMode('normal');
            }}
          >
            <Eye size={16} color={accessibilityMode !== 'normal' ? 'var(--primary)' : 'currentColor'} />
          </button>


          {/* Notifications Toggle & Drawer Popover */}
          <div style={{ position: 'relative' }}>
            <button
              className="nav-icon-btn"
              style={{ position: 'relative' }}
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="pulse-badge" style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: 'var(--accent-rose)',
                  color: '#fff',
                  fontSize: '0.62rem',
                  fontWeight: 900,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #FFFFFF'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '135%',
                    width: '320px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-neu-lg)',
                    padding: '1.1rem',
                    zIndex: 300
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Notifications</h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 800 }}>{unreadCount} unread</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', maxHeight: '260px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                        No notifications yet!
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          style={{
                            padding: '0.65rem 0.85rem',
                            borderRadius: 'var(--radius-sm)',
                            background: n.read ? '#F8FAFC' : 'var(--primary-light)',
                            border: `1px solid ${n.read ? 'transparent' : 'rgba(37, 99, 235, 0.2)'}`,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: n.read ? 'var(--text-muted)' : 'var(--primary)' }}>
                            {n.title}
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-main)', marginTop: '0.15rem' }}>
                            {n.message}
                          </div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontWeight: 700 }}>
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

          {/* User Auth Control Pill */}
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  background: '#FFFFFF',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                }}
              >
                <User size={14} color="var(--primary)" />
                <span style={{ maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {getUserDisplayName()}
                </span>
              </div>

              <button 
                onClick={logout}
                className="nav-icon-btn"
                title="Sign Out"
                style={{ color: 'var(--accent-rose)' }}
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => openAuthModal('dashboard')}
              className="btn btn-primary btn-sm pulse-glow"
              style={{ fontWeight: 700, padding: '0.45rem 1.1rem', fontSize: '0.84rem' }}
            >
              <LogIn size={15} /> Log In
            </button>
          )}

        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          className="nav-icon-btn mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* MOBILE EXPANDABLE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-nav-drawer"
            style={{ background: '#FFFFFF' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {navTabs.map((tab) => {
                const TabIcon = tab.icon;
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
                      gap: '0.6rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                      background: isActive ? 'var(--primary-light)' : '#FFFFFF',
                      color: isActive ? 'var(--primary)' : 'var(--text-main)',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <TabIcon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Controls & Auth */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="nav-icon-btn"
                  onClick={() => {
                    if (accessibilityMode === 'normal') setAccessibilityMode('high-contrast');
                    else if (accessibilityMode === 'high-contrast') setAccessibilityMode('large-text');
                    else setAccessibilityMode('normal');
                  }}
                >
                  <Eye size={16} />
                </button>
              </div>

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ color: 'var(--accent-rose)' }}
                >
                  <LogOut size={15} /> Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    openAuthModal('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <LogIn size={15} /> Log In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
