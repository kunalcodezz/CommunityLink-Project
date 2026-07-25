import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AiAssistant } from './components/AiAssistant';

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
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'map' | 'leaderboard' | 'feed' | 'dashboard'
  const { currentUserRole } = useApp();

  const renderDashboardScreen = () => {
    switch (currentUserRole) {
      case 'student': return <StudentDashboard />;
      case 'ngo': return <NgoDashboard />;
      case 'resident': return <ResidentDashboard />;
      case 'admin': return <AdminDashboard />;
      default: return <StudentDashboard />;
    }
  };

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {activeTab === 'explore' && <MissionExplorer />}
        {activeTab === 'map' && <InteractiveMap />}
        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'feed' && <CommunityFeed />}
        {activeTab === 'dashboard' && renderDashboardScreen()}
      </main>

      <AiAssistant />
      <Footer />
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
