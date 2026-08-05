export const initialMissions = [];

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
  }
];

export const initialCertificates = [];
