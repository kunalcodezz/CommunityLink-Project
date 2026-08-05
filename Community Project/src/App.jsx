import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AiAssistant } from './components/AiAssistant';
import { LoginModal } from './components/auth/LoginModal';
import { StudentProfileSetupModal } from './components/student/StudentProfileSetupModal';
import { RoleSelectionModal } from './components/auth/RoleSelectionModal';
import { PremiumLandingPage } from './components/landing/PremiumLandingPage';
import { Lock, LogIn, Sparkles, ShieldCheck } from 'lucide-react';

// Tab Screens
import { MissionExplorer } from './components/student/MissionExplorer';
import { Leaderboard } from './components/student/Leaderboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { NgoDashboard } from './components/ngo/NgoDashboard';
import { ResidentDashboard } from './components/resident/ResidentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { InteractiveMap } from './components/map/InteractiveMap';
import { CommunityFeed } from './components/community/CommunityFeed';

const MainLayout = () => {
  // Premium Landing initial tab screen
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'feed' | 'explore' | 'map' | 'leaderboard' | 'dashboard'
  const { 
    currentUserRole, 
    isLoggedIn, 
    isAuthModalOpen, 
    openAuthModal, 
    closeAuthModal, 
    targetTabAfterLogin,
    isStudentSetupModalOpen,
    closeStudentSetupModal,
    isRoleSelectionModalOpen,
    pendingGoogleUser,
    confirmGoogleUserRole,
    closeRoleSelectionModal
  } = useApp();

  // Auto-redirect navigation based on auth state & role
  React.useEffect(() => {
    if (isLoggedIn) {
      if (activeTab === 'landing' || (currentUserRole === 'ngo' && activeTab === 'explore')) {
        setActiveTab('dashboard');
      }
    } else {
      setActiveTab('landing');
    }
  }, [isLoggedIn, currentUserRole, activeTab]);

  const renderDashboardScreen = () => {
    if (!isLoggedIn) {
      return (
        <div style={{ maxWidth: '650px', margin: '3rem auto', textAlign: 'center' }}>
          <div className="glass-card" style={{ padding: '3rem 2rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'var(--bg-primary)',
              boxShadow: 'var(--shadow-neu-sm)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <Lock size={32} />
            </div>

            <span className="badge badge-blue" style={{ marginBottom: '1rem' }}>
              <ShieldCheck size={14} /> Authentication Required
            </span>

            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              Access Your Personal Dashboard
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Sign in to manage your volunteer missions, submit proof, track XP rewards, issue verified certificates, or oversee local community drives.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => openAuthModal('dashboard')}
                className="btn btn-primary btn-lg pulse-glow"
                style={{ fontWeight: 700 }}
              >
                <LogIn size={20} /> Log In to Access Dashboard
              </button>

              <button 
                onClick={() => setActiveTab('explore')}
                className="btn btn-secondary btn-lg"
              >
                <Sparkles size={20} /> Explore Missions
              </button>
            </div>
          </div>
        </div>
      );
    }

    switch (currentUserRole) {
      case 'student': return <StudentDashboard setActiveTab={setActiveTab} />;
      case 'ngo': return <NgoDashboard />;
      case 'resident': return <ResidentDashboard />;
      case 'admin': return <AdminDashboard />;
      default: return <StudentDashboard setActiveTab={setActiveTab} />;
    }
  };

  const renderFeedScreen = () => {
    if (!isLoggedIn) {
      return (
        <div style={{ maxWidth: '650px', margin: '3rem auto', textAlign: 'center' }}>
          <div className="glass-card" style={{ padding: '3rem 2rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'var(--bg-primary)',
              boxShadow: 'var(--shadow-neu-sm)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <Lock size={32} />
            </div>

            <span className="badge badge-blue" style={{ marginBottom: '1rem' }}>
              <ShieldCheck size={14} /> Authentication Required
            </span>

            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              Access Community Feed
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Log in or create an account to view community updates, volunteer achievements, photos, and social impact stories.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => openAuthModal('feed')}
                className="btn btn-primary btn-lg pulse-glow"
                style={{ fontWeight: 700 }}
              >
                <LogIn size={20} /> Log In to Access Feed
              </button>

              <button 
                onClick={() => setActiveTab('explore')}
                className="btn btn-secondary btn-lg"
              >
                <Sparkles size={20} /> Explore Missions
              </button>
            </div>
          </div>
        </div>
      );
    }

    return <CommunityFeed />;
  };

  return (
    <div className="app-container">
      {/* Render Floating Navbar only when user is logged in */}
      {isLoggedIn && <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />}

      <main className={activeTab === 'landing' ? '' : 'main-content'}>
        {activeTab === 'landing' && (
          <PremiumLandingPage 
            onGetStarted={() => openAuthModal('dashboard')}
            onExploreMissions={() => setActiveTab('explore')}
            onSelectTab={(tab) => setActiveTab(tab)}
          />
        )}
        {activeTab === 'explore' && <MissionExplorer />}
        {activeTab === 'map' && <InteractiveMap />}
        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'feed' && renderFeedScreen()}
        {activeTab === 'dashboard' && renderDashboardScreen()}
      </main>

      {isLoggedIn && <AiAssistant />}
      {activeTab !== 'landing' && <Footer />}

      <LoginModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        targetTab={targetTabAfterLogin} 
        setActiveTab={setActiveTab} 
      />

      <StudentProfileSetupModal
        isOpen={isStudentSetupModalOpen}
        onClose={closeStudentSetupModal}
      />

      <RoleSelectionModal
        isOpen={isRoleSelectionModalOpen}
        onClose={closeRoleSelectionModal}
        pendingUser={pendingGoogleUser}
        onConfirmRole={confirmGoogleUserRole}
      />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
