import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialMissions,
  initialBadges,
  initialLeaderboard,
  initialResidentIssues,
  initialPosts,
  initialCertificates
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Active User Persona
  const [currentUserRole, setCurrentUserRole] = useState('student'); // 'student' | 'ngo' | 'resident' | 'admin'

  const [studentProfile, setStudentProfile] = useState({
    name: "Aarav Sharma",
    email: "aarav.sharma@vjti.ac.in",
    college: "VJTI Mumbai",
    xp: 450,
    level: "Volunteer", // Beginner (0-100), Helper (101-300), Volunteer (301-600), Leader (601-1000), Ambassador (1001-1500), Community Hero (1500+)
    hoursLogged: 16,
    badges: ["b-1", "b-2"],
    joinedMissions: ["m-1"],
    submittedProofs: [
      {
        missionId: "m-1",
        proofImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80",
        notes: "Gathered 4 bags of plastic and planted 2 neem saplings with team B.",
        status: "approved"
      }
    ]
  });

  const [ngoProfile, setNgoProfile] = useState({
    id: "ngo-1",
    name: "Green Earth Alliance",
    registrationNo: "NGO-MH-2018-9942",
    contactEmail: "contact@greenearth.org",
    verified: true
  });

  // App Data Collections
  const [missions, setMissions] = useState(() => {
    const saved = localStorage.getItem('cl_missions');
    return saved ? JSON.parse(saved) : initialMissions;
  });

  const [residentIssues, setResidentIssues] = useState(() => {
    const saved = localStorage.getItem('cl_issues');
    return saved ? JSON.parse(saved) : initialResidentIssues;
  });

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('cl_posts');
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('cl_certificates');
    return saved ? JSON.parse(saved) : initialCertificates;
  });

  const [notifications, setNotifications] = useState([
    { id: "n1", title: "Mission Approval", message: "Your participation in Powai Lake Clean-up was approved! +150 XP", read: false, time: "10 mins ago" },
    { id: "n2", title: "Badge Unlocked!", message: "You earned the 'Tree Guardian' badge! 🌳", read: false, time: "2 hours ago" },
    { id: "n3", title: "New Nearby Mission", message: "Red Cross announced a Blood Donation Drive near Parel.", read: true, time: "1 day ago" }
  ]);

  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [accessibilityMode, setAccessibilityMode] = useState('normal'); // 'normal' | 'high-contrast' | 'large-text'
  const [language, setLanguage] = useState('en'); // 'en' | 'hi' | 'mr'

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('cl_missions', JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    localStorage.setItem('cl_issues', JSON.stringify(residentIssues));
  }, [residentIssues]);

  useEffect(() => {
    localStorage.setItem('cl_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('cl_certificates', JSON.stringify(certificates));
  }, [certificates]);

  // Theme & Accessibility Attribute Sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accessibility', accessibilityMode);
  }, [theme, accessibilityMode]);

  // Level Calculation Helper
  const calculateLevel = (xp) => {
    if (xp >= 1500) return "Community Hero";
    if (xp >= 1000) return "Ambassador";
    if (xp >= 600) return "Leader";
    if (xp >= 300) return "Volunteer";
    if (xp >= 100) return "Helper";
    return "Beginner";
  };

  // Actions: Student Join Mission
  const joinMission = (missionId) => {
    if (studentProfile.joinedMissions.includes(missionId)) return;
    
    setStudentProfile(prev => ({
      ...prev,
      joinedMissions: [...prev.joinedMissions, missionId]
    }));

    setMissions(prev => prev.map(m => {
      if (m.id === missionId) {
        return { ...m, slotsAvailable: Math.max(0, m.slotsAvailable - 1) };
      }
      return m;
    }));

    addNotification("Mission Joined!", "You successfully registered for the mission. Check details in your dashboard.");
  };

  // Actions: Submit Proof
  const submitMissionProof = (missionId, proofImage, notes) => {
    const existingIndex = studentProfile.submittedProofs.findIndex(p => p.missionId === missionId);
    const newProof = { missionId, proofImage, notes, status: "pending", submittedAt: new Date().toISOString() };

    setStudentProfile(prev => {
      let updatedProofs = [...prev.submittedProofs];
      if (existingIndex >= 0) {
        updatedProofs[existingIndex] = newProof;
      } else {
        updatedProofs.push(newProof);
      }
      return { ...prev, submittedProofs: updatedProofs };
    });

    addNotification("Proof Uploaded", "Your proof of completion has been submitted to the NGO for verification.");
  };

  // Actions: NGO Approve Proof & Issue Certificate
  const approveStudentProof = (missionId, studentName = "Aarav Sharma") => {
    const targetMission = missions.find(m => m.id === missionId);
    const xpReward = targetMission ? targetMission.xpReward : 150;
    const hours = targetMission ? targetMission.durationHours : 4;

    // Update Student Profile XP & Hours
    setStudentProfile(prev => {
      const newXp = prev.xp + xpReward;
      const newHours = prev.hoursLogged + hours;
      const updatedProofs = prev.submittedProofs.map(p => 
        p.missionId === missionId ? { ...p, status: "approved" } : p
      );

      return {
        ...prev,
        xp: newXp,
        level: calculateLevel(newXp),
        hoursLogged: newHours,
        submittedProofs: updatedProofs
      };
    });

    // Generate Certificate
    const newCert = {
      id: `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: studentName,
      college: studentProfile.college,
      missionTitle: targetMission ? targetMission.title : "Community Mission",
      ngoName: targetMission ? targetMission.ngoName : ngoProfile.name,
      hoursLogged: hours,
      issueDate: new Date().toISOString().split('T')[0],
      qrCodeToken: `CL-VERIFY-${Math.floor(1000 + Math.random() * 9000)}-${studentName.split(' ')[0].toUpperCase()}`,
      aiSummary: `Exemplary participation in '${targetMission ? targetMission.title : "Community Mission"}' for ${hours} hours of dedicated service.`
    };

    setCertificates(prev => [newCert, ...prev]);

    // Create Community Post for Achievement
    const newPost = {
      id: `post-${Date.now()}`,
      authorName: studentName,
      authorRole: "Student",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      timeAgo: "Just now",
      content: `🎉 Successfully completed '${targetMission?.title}' and earned +${xpReward} XP & a verified certificate on CommunityLink!`,
      image: targetMission?.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&auto=format&fit=crop&q=80",
      likes: 1,
      comments: []
    };
    setPosts(prev => [newPost, ...prev]);

    addNotification("Proof Verified! 🎉", `NGO approved your work! +${xpReward} XP awarded and Certificate generated.`);
  };

  // Actions: NGO Create Mission
  const createMission = (newMissionData) => {
    const newMission = {
      ...newMissionData,
      id: `m-${Date.now()}`,
      ngoId: ngoProfile.id,
      ngoName: ngoProfile.name,
      slotsAvailable: Number(newMissionData.slotsTotal),
      slotsTotal: Number(newMissionData.slotsTotal),
      xpReward: Number(newMissionData.xpReward),
      durationHours: Number(newMissionData.durationHours),
      status: "active",
      aiSummary: `✨ ${newMissionData.durationHours}-hour mission: ${newMissionData.description.substring(0, 100)}... Earn ${newMissionData.xpReward} XP.`,
      image: newMissionData.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80"
    };

    setMissions(prev => [newMission, ...prev]);
    addNotification("Mission Published", `Your mission '${newMission.title}' is now live for students to join!`);
  };

  // Actions: Resident Report Issue
  const reportIssue = (issueData) => {
    const newIssue = {
      ...issueData,
      id: `issue-${Date.now()}`,
      residentName: "Sunita Deshmukh",
      status: "Pending NGO Pick-up",
      date: new Date().toISOString().split('T')[0],
      upvotes: 1,
      coords: issueData.coords || [19.0760, 72.8777]
    };

    setResidentIssues(prev => [newIssue, ...prev]);
    addNotification("Issue Submitted", "Your community issue report was posted to NGOs and local leaders.");
  };

  // Actions: Upvote Resident Issue
  const upvoteIssue = (issueId) => {
    setResidentIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return { ...issue, upvotes: issue.upvotes + 1 };
      }
      return issue;
    }));
  };

  // Actions: Add Post & Like Post
  const createCommunityPost = (content, image) => {
    const newPost = {
      id: `post-${Date.now()}`,
      authorName: currentUserRole === 'ngo' ? ngoProfile.name : studentProfile.name,
      authorRole: currentUserRole === 'ngo' ? "NGO" : "Student",
      avatar: currentUserRole === 'ngo' 
        ? "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80" 
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      timeAgo: "Just now",
      content,
      image,
      likes: 0,
      comments: []
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const likePost = (postId) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const addCommentToPost = (postId, text) => {
    const author = currentUserRole === 'ngo' ? ngoProfile.name : studentProfile.name;
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, { id: `c-${Date.now()}`, author, text }]
        };
      }
      return p;
    }));
  };

  // Notifications Helper
  const addNotification = (title, message) => {
    setNotifications(prev => [
      { id: `n-${Date.now()}`, title, message, read: false, time: "Just now" },
      ...prev
    ]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider
      value={{
        currentUserRole,
        setCurrentUserRole,
        studentProfile,
        ngoProfile,
        missions,
        badges: initialBadges,
        leaderboard: initialLeaderboard,
        residentIssues,
        posts,
        certificates,
        notifications,
        theme,
        setTheme,
        accessibilityMode,
        setAccessibilityMode,
        language,
        setLanguage,
        joinMission,
        submitMissionProof,
        approveStudentProof,
        createMission,
        reportIssue,
        upvoteIssue,
        createCommunityPost,
        likePost,
        addCommentToPost,
        markNotificationAsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
