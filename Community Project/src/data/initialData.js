export const initialMissions = [
  {
    id: "m-1",
    title: "Weekend Community Lake & Park Clean-up",
    ngoId: "ngo-1",
    ngoName: "Green Earth Alliance",
    category: "Environment",
    location: "Powai Lake Promenade, Mumbai",
    coords: [19.1232, 72.9090],
    date: "2026-08-01",
    time: "07:00 AM - 11:00 AM",
    durationHours: 4,
    requiredSkills: ["Teamwork", "Physical Activity"],
    slotsAvailable: 15,
    slotsTotal: 30,
    xpReward: 150,
    badgeReward: "Tree Guardian",
    description: "Join us this Saturday for a lake restoration and trash clearing drive. We will collect plastic waste, clear overgrown pathways, and plant native saplings along the lake perimeter. Equipment & refreshments provided!",
    aiSummary: "🌱 4-hour weekend drive at Powai Lake focusing on plastic cleanup, sapling planting, and trail restoration. Earn 150 XP and Tree Guardian badge progress.",
    status: "active",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "m-2",
    title: "Emergency Blood Donation Drive",
    ngoId: "ngo-2",
    ngoName: "Red Cross & LifeCare Foundation",
    category: "Health",
    location: "KEM Hospital Campus, Parel",
    coords: [19.0028, 72.8427],
    date: "2026-08-02",
    time: "09:00 AM - 04:00 PM",
    durationHours: 5,
    requiredSkills: ["Donor Management", "First Aid Assistant"],
    slotsAvailable: 8,
    slotsTotal: 25,
    xpReward: 200,
    badgeReward: "Blood Donation Hero",
    description: "Urgent need for student volunteers to manage donor registration, guide donors through health screening desks, and distribute post-donation fruit packages.",
    aiSummary: "🩸 Urgent hospital blood drive. Volunteers help register donors, manage queue desk, and hand out post-donation refreshments. Earn 200 XP.",
    status: "active",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "m-3",
    title: "After-School STEM Mentorship for Kids",
    ngoId: "ngo-3",
    ngoName: "EduEmpower Society",
    category: "Education",
    location: "Dharavi Community Learning Hub",
    coords: [19.0434, 72.8559],
    date: "2026-08-05",
    time: "04:00 PM - 06:30 PM",
    durationHours: 3,
    requiredSkills: ["Basic Math & Science", "Communication"],
    slotsAvailable: 12,
    slotsTotal: 15,
    xpReward: 120,
    badgeReward: "Education Mentor",
    description: "Conduct interactive science experiments and basic coding puzzles for 6th to 8th graders from underserved areas. Materials & worksheets supplied.",
    aiSummary: "📚 2.5-hour teaching session helping grade school kids learn science and basic computer logic through fun hands-on activities.",
    status: "active",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "m-4",
    title: "Surplus Food Rescue & Distribution",
    ngoId: "ngo-4",
    ngoName: "NoHunger Network",
    category: "Social Relief",
    location: "Dadar Central Station Kitchen",
    coords: [19.0178, 72.8478],
    date: "2026-08-03",
    time: "08:00 PM - 10:30 PM",
    durationHours: 3,
    requiredSkills: ["Food Handling", "Packing"],
    slotsAvailable: 5,
    slotsTotal: 20,
    xpReward: 140,
    badgeReward: "Community Champion",
    description: "Help pack and distribute untouched surplus meals collected from wedding halls and corporate events to homeless shelters.",
    aiSummary: "🍲 Evening food rescue mission. Pack fresh surplus food and deliver to local shelters. 140 XP reward.",
    status: "active",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80"
  }
];

export const initialBadges = [
  { id: "b-1", name: "First Volunteer", icon: "🌱", description: "Completed your first community mission", requiredHours: 1 },
  { id: "b-2", name: "Tree Guardian", icon: "🌳", description: "Participated in 3+ environmental or tree planting drives", requiredHours: 10 },
  { id: "b-3", name: "Blood Donation Hero", icon: "🩸", description: "Helped organize or donate in 2+ blood donation drives", requiredHours: 8 },
  { id: "b-4", name: "Education Mentor", icon: "📚", description: "Taught kids in community learning programs", requiredHours: 15 },
  { id: "b-5", name: "Community Champion", icon: "⭐", description: "Logged 25+ verified volunteer hours", requiredHours: 25 },
  { id: "b-6", name: "100 Hours Club", icon: "🏆", description: "Exemplary commitment: 100+ volunteer hours", requiredHours: 100 }
];

export const initialLeaderboard = [
  { rank: 1, name: "Aarav Sharma", college: "VJTI Mumbai", hours: 42, xp: 1450, badgeCount: 5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
  { rank: 2, name: "Priya Patel", college: "IIT Bombay", hours: 38, xp: 1320, badgeCount: 4, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80" },
  { rank: 3, name: "Rohan Verma", college: "St. Xavier's College", hours: 35, xp: 1180, badgeCount: 4, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
  { rank: 4, name: "Ananya Iyer", college: "KJ Somaiya Institute", hours: 28, xp: 950, badgeCount: 3, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
  { rank: 5, name: "Devendra Kulkarni", college: "SPIT Mumbai", hours: 24, xp: 820, badgeCount: 3, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" }
];

export const initialResidentIssues = [
  {
    id: "issue-1",
    title: "Overflowing Garbage Container near Primary School",
    residentName: "Sunita Deshmukh",
    location: "Sector 4, AIroli, Navi Mumbai",
    coords: [19.1579, 72.9935],
    category: "Sanitation",
    urgency: "High",
    status: "Pending NGO Pick-up",
    date: "2026-07-24",
    description: "The community dumpster near Sector 4 primary school has been overflowing for 3 days. Seeking student volunteer group support for clean up and awareness drive.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80",
    upvotes: 18
  },
  {
    id: "issue-2",
    title: "Book Donation Request for Slum Library",
    residentName: "Ramesh Thorat",
    location: "Kurla West Station Road",
    coords: [19.0657, 72.8783],
    category: "Education",
    urgency: "Medium",
    status: "In Progress",
    date: "2026-07-22",
    description: "We are setting up a small free reading corner for children aged 6-14 in our locality. Need storybooks, notebooks, and pencils.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80",
    upvotes: 24
  }
];

export const initialPosts = [
  {
    id: "post-1",
    authorName: "Green Earth Alliance",
    authorRole: "NGO",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    timeAgo: "2 hours ago",
    content: "Huge shoutout to the 22 student volunteers from VJTI and IIT Bombay who helped us clear over 180kg of plastic from Mahim Beach this morning! You guys are true eco-warriors 🌊💚",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=700&auto=format&fit=crop&q=80",
    likes: 45,
    comments: [
      { id: "c1", author: "Aarav Sharma", text: "Proud to have contributed! Let's make it even bigger next week." },
      { id: "c2", author: "EduEmpower Society", text: "Inspiring work team!" }
    ]
  },
  {
    id: "post-2",
    authorName: "Aarav Sharma",
    authorRole: "Student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    timeAgo: "1 day ago",
    content: "Just unlocked my 'Tree Guardian' badge on CommunityLink after completing 3 environmental missions! 🌳✨ Grateful for the chance to give back.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&auto=format&fit=crop&q=80",
    likes: 32,
    comments: [
      { id: "c3", author: "Priya Patel", text: "Congrats Aarav! Super deserving!" }
    ]
  }
];

export const initialCertificates = [
  {
    id: "CERT-2026-8819",
    studentName: "Aarav Sharma",
    college: "VJTI Mumbai",
    missionTitle: "Tree Plantation & Bio-Diversity Restoration Drive",
    ngoName: "Green Earth Alliance",
    hoursLogged: 12,
    issueDate: "2026-07-20",
    qrCodeToken: "CL-VERIFY-8819-AARAV",
    aiSummary: "Demonstrated outstanding leadership and environmental stewardship by planting 15 native trees and guiding junior volunteers during the Powai Watershed Restoration Initiative."
  }
];
