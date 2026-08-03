import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  HeartHandshake, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Zap, 
  Bot, 
  Star, 
  TrendingUp, 
  FileText, 
  QrCode, 
  Globe, 
  ChevronRight,
  Lock,
  LogIn,
  UserPlus,
  Heart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Data Constants (Declared at module scope before component initialization)
const partners = [
  { name: "VJTI Mumbai", tag: "University Partner" },
  { name: "IIT Bombay Eco Club", tag: "Tech & Research" },
  { name: "UNICEF India", tag: "Global Youth Impact" },
  { name: "Teach for India", tag: "Education NGO" },
  { name: "Goonj Foundation", tag: "Relief NGO" },
  { name: "Rotary Youth Wing", tag: "Civic Network" }
];

const features = [
  {
    icon: Bot,
    title: "AI Mission Recommendations",
    description: "Smart match engine aligns student skills, availability, and location with high-impact community drives.",
    color: "#2563EB",
    bgLight: "#EFF6FF"
  },
  {
    icon: MapPin,
    title: "Nearby Hyperlocal Missions",
    description: "Interactive Leaflet & OpenStreetMap view discovers active cleanups, blood drives, and slum schools around you.",
    color: "#22C55E",
    bgLight: "#DCFCE7"
  },
  {
    icon: ShieldCheck,
    title: "Verified QR Certificates",
    description: "Automated, tamper-proof certificates with QR tokens accepted for college major projects & credits.",
    color: "#8B5CF6",
    bgLight: "#F3E8FF"
  },
  {
    icon: Award,
    title: "Gamified XP Leaderboard",
    description: "Earn experience points (XP), unlock 15+ badges like 'Tree Guardian', and climb college rankings.",
    color: "#F59E0B",
    bgLight: "#FEF3C7"
  },
  {
    icon: TrendingUp,
    title: "Volunteer Hours Tracker",
    description: "Real-time audit log of community service hours verified directly by authorized NGO administrators.",
    color: "#EF4444",
    bgLight: "#FEE2E2"
  },
  {
    icon: Users,
    title: "Resident Issue Reporting",
    description: "Local residents pin civic needs (garbage cleanup, book drives) for volunteer groups to adopt & resolve.",
    color: "#0EA5E9",
    bgLight: "#E0F2FE"
  }
];

const howItWorksSteps = [
  { step: "01", title: "Instant Registration", desc: "Sign up via Google or Firebase Auth in under 15 seconds." },
  { step: "02", title: "Complete Academic Profile", desc: "Select student, NGO, or resident role with college details." },
  { step: "03", title: "Discover AI Missions", desc: "Browse AI-curated missions nearby or filter by impact category." },
  { step: "04", title: "Volunteer & Serve", desc: "Join weekend drives, clean coastlines, or tutor children." },
  { step: "05", title: "Upload Photo Proof", desc: "Submit activity photo and notes for fast NGO verification." },
  { step: "06", title: "Earn Verified Certs", desc: "Download official QR-authenticated certificate & gain XP." },
  { step: "07", title: "Become Community Hero", desc: "Climb college leaderboards and unlock milestone badges." }
];

const leaderboardTop3 = [
  { rank: 1, name: "Aarav Sharma", college: "VJTI Mumbai", xp: 1480, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", medal: "🥇 Gold" },
  { rank: 2, name: "Priya Patel", college: "IIT Bombay", xp: 1250, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80", medal: "🥈 Silver" },
  { rank: 3, name: "Rohan Deshmukh", college: "SPIT Andheri", xp: 980, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80", medal: "🥉 Bronze" }
];

const testimonials = [
  {
    quote: "CommunityLink transformed how our college NSS unit operates. Logging service hours and getting verified QR certificates has never been this seamless!",
    author: "Ananya Kulkarni",
    role: "Student Volunteer, VJTI Mumbai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    type: "Student"
  },
  {
    quote: "Finding passionate college volunteers used to take weeks. With CommunityLink's NGO Portal, our mangrove cleanups fill up in 2 hours!",
    author: "Dr. Rajesh Varma",
    role: "Director, Green Horizon NGO",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    type: "NGO Lead"
  },
  {
    quote: "I reported a local park garbage issue on the Resident Portal. Within 3 days, 20 students arrived and cleaned the entire area. Truly inspiring!",
    author: "Sunita Deshpande",
    role: "Resident, Airoli Navi Mumbai",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    type: "Resident"
  }
];

const floatingGlassCards = [
  { title: "XP Earned", value: "+150 XP", icon: Sparkles, color: "#F59E0B", pos: { top: "5%", left: "-5%" }, delay: 0 },
  { title: "Certificate Ready", value: "Verified QR", icon: ShieldCheck, color: "#22C55E", pos: { top: "25%", right: "-8%" }, delay: 0.5 },
  { title: "Mission Completed", value: "Mangrove Cleanup", icon: CheckCircle2, color: "#2563EB", pos: { bottom: "35%", left: "-10%" }, delay: 1 },
  { title: "Nearby Mission", value: "0.8 km Away", icon: MapPin, color: "#EF4444", pos: { bottom: "10%", right: "-4%" }, delay: 1.5 },
  { title: "New Badge", value: "Tree Guardian 🌳", icon: Award, color: "#8B5CF6", pos: { top: "55%", left: "-6%" }, delay: 2 },
  { title: "Leader Rank", value: "#1 College Volunteer", icon: Star, color: "#0EA5E9", pos: { top: "-2%", right: "15%" }, delay: 2.5 }
];

export const PremiumLandingPage = ({ onGetStarted, onExploreMissions, onSelectTab }) => {
  const { openAuthModal } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Scroll listener for glassmorphism navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonial auto slide timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', position: 'relative' }}>
      
      {/* Background Subtle Gradient Blobs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(70px)'
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>


        {/* 2. HERO SECTION (SPLIT LAYOUT) */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem 6rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5rem', alignItems: 'center' }}>
            
            {/* LEFT COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '9999px', background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                <Globe size={15} /> 🌍 Empowering Communities & Students
              </div>

              {/* Large Heading */}
              <h1 style={{
                fontSize: 'clamp(2.8rem, 4.5vw, 4.2rem)',
                fontWeight: 900,
                lineHeight: 1.12,
                color: 'var(--text-main)',
                marginBottom: '1.25rem',
                letterSpacing: '-0.03em'
              }}>
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  Volunteer
                  <span style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: 0,
                    right: 0,
                    height: '6px',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, #2563EB 0%, #22C55E 100%)'
                  }} />
                </span> Today.<br />
                Build{' '}
                <span style={{
                  color: 'var(--secondary)'
                }}>
                  Tomorrow
                </span>.
              </h1>

              {/* Description */}
              <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '2.25rem', maxWidth: '580px' }}>
                CommunityLink connects students, NGOs, and local communities to create meaningful impact through volunteering, skill development, and AI-powered mission matching.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
                <button
                  onClick={() => openAuthModal('dashboard')}
                  className="btn btn-primary btn-lg"
                  style={{ fontWeight: 700 }}
                >
                  Get Started <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => onSelectTab && onSelectTab('explore')}
                  className="btn btn-secondary btn-lg"
                  style={{ fontWeight: 700 }}
                >
                  <Sparkles size={18} color="var(--primary)" /> Explore Missions
                </button>
              </div>

              {/* Stats - Space Grotesk Font */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                <div>
                  <div className="font-number" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>15K+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Volunteers</div>
                </div>
                <div>
                  <div className="font-number" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--secondary)' }}>500+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>NGOs</div>
                </div>
                <div>
                  <div className="font-number" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)' }}>1,200+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Missions</div>
                </div>
                <div>
                  <div className="font-number" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-purple)' }}>200K+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Service Hours</div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN - PREMIUM ILLUSTRATION & FLOATING GLASS CARDS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              {/* Central Illustration Container */}
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-neu-xl)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                background: '#FFFFFF'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80"
                  alt="Students & NGO Volunteers Community Drive"
                  style={{ width: '100%', height: '480px', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 50%, rgba(15, 23, 42, 0.5) 100%)'
                }} />
                
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', color: '#fff' }}>
                  <span className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
                    Verified Impact Drive
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>Mumbai Coastal Mangrove Restoration</h3>
                </div>
              </div>

              {/* 6 Floating Glassmorphism Cards */}
              {floatingGlassCards.map((card, idx) => {
                const CardIcon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: card.delay
                    }}
                    className="floating-glass"
                    style={{
                      position: 'absolute',
                      ...card.pos,
                      padding: '0.75rem 1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      zIndex: 10,
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: `${card.color}18`,
                      color: card.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CardIcon size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{card.title}</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>{card.value}</div>
                    </div>
                  </motion.div>
                );
              })}

            </motion.div>

          </div>
        </section>

        {/* 3. TRUST SECTION (ANIMATED LOGOS & PARTNERS) */}
        <section style={{ background: '#FFFFFF', padding: '3.5rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Trusted by Top Universities, Registered NGOs, & Civic Partners
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
              {partners.map((partner, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    padding: '0.85rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>{partner.name}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 600 }}>{partner.tag}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FEATURES GRID */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
            <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
              <Zap size={14} /> Built for Social Impact
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Everything You Need to Create & Scale Community Change
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              An all-in-one ecosystem connecting volunteers, non-profits, and residents with verified tracking and AI automation.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '2rem' }}>
            {features.map((feat, idx) => {
              const FeatIcon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="glass-card"
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      background: feat.bgLight,
                      color: feat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      <FeatIcon size={26} />
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.6rem' }}>{feat.title}</h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{feat.description}</p>
                  </div>

                  <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: feat.color, fontWeight: 700, fontSize: '0.85rem' }}>
                    Learn more <ChevronRight size={16} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 5. HOW IT WORKS TIMELINE */}
        <section style={{ background: '#FFFFFF', padding: '6rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
                <CheckCircle2 size={14} /> Step-by-Step Journey
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                How CommunityLink Works
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                From instant registration to earning recognized QR certificates and becoming a community hero.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {howItWorksSteps.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'var(--bg-primary)',
                    padding: '1.75rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    position: 'relative'
                  }}
                >
                  <span className="font-number" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)', opacity: 0.8, display: 'block', marginBottom: '0.5rem' }}>
                    {item.step}
                  </span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. IMPACT SECTION */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem' }}>
          <div className="glass-card" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: '#FFFFFF', padding: '4rem 3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
              <div>
                <span className="badge badge-amber" style={{ marginBottom: '1rem' }}>
                  <TrendingUp size={14} /> Proven Social Impact
                </span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem' }}>
                  Measurable Change Across Cities
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Our automated audit trail logs every volunteer hour, ensuring 100% transparency for colleges, NGOs, and municipal authorities.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <div className="font-number" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#38BDF8' }}>250,000+</div>
                    <div style={{ fontSize: '0.88rem', color: '#94A3B8' }}>Volunteer Hours Logged</div>
                  </div>
                  <div>
                    <div className="font-number" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4ADE80' }}>18,000+</div>
                    <div style={{ fontSize: '0.88rem', color: '#94A3B8' }}>Student Volunteers</div>
                  </div>
                  <div>
                    <div className="font-number" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FBBF24' }}>600+</div>
                    <div style={{ fontSize: '0.88rem', color: '#94A3B8' }}>Verified NGO Partners</div>
                  </div>
                  <div>
                    <div className="font-number" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#C084FC' }}>15,000+</div>
                    <div style={{ fontSize: '0.88rem', color: '#94A3B8' }}>Issued QR Certificates</div>
                  </div>
                </div>
              </div>

              {/* Visual Mockup Box */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>Quarterly Volunteer Growth</h4>
                  <span style={{ fontSize: '0.8rem', color: '#4ADE80', fontWeight: 700 }}>+42% YoY</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.4rem' }}>
                      <span>Q1 - Beach Cleanups & Oceans</span>
                      <span style={{ color: '#FFFFFF', fontWeight: 700 }}>78,000 hrs</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: '85%', height: '100%', background: '#38BDF8', borderRadius: '9999px' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.4rem' }}>
                      <span>Q2 - Slum Education & Mentorship</span>
                      <span style={{ color: '#FFFFFF', fontWeight: 700 }}>64,000 hrs</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: '70%', height: '100%', background: '#4ADE80', borderRadius: '9999px' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.4rem' }}>
                      <span>Q3 - Blood Drives & Health Camps</span>
                      <span style={{ color: '#FFFFFF', fontWeight: 700 }}>52,000 hrs</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: '58%', height: '100%', background: '#FBBF24', borderRadius: '9999px' }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. AI SECTION */}
        <section style={{ background: '#FFFFFF', padding: '6rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
              <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
                <Bot size={14} /> AI-Powered Recommendations
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Smart AI Mission Matching Engine
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                Gemini-assisted AI pairs student skills and location with high-urgency NGO requests.
              </p>
            </div>

            <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem', boxShadow: 'var(--shadow-neu-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--accent-purple-light)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>CommunityLink AI Assistant</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Analyzing 12 active missions near your location...</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-primary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>✨ AI Recommendation</span>
                  <h5 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.2rem 0' }}>Carter Road Mangrove Plantation Drive</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Match Score: 98% • Skill Alignment: Environmental Science & Team Leadership</p>
                </div>

                <div style={{ background: 'var(--bg-primary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--secondary)', fontWeight: 700, textTransform: 'uppercase' }}>✨ Hyperlocal Match</span>
                  <h5 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.2rem 0' }}>Dharavi STEM Book Donation Drive</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Match Score: 94% • Distance: 1.2 km from your college campus</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. LEADERBOARD PREVIEW */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
            <span className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>
              <Award size={14} /> Gamification & Recognition
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              College Volunteer Hall of Fame
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Top students earning XP, logging service hours, and leading community impact.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '2rem', alignItems: 'end' }}>
            {leaderboardTop3.map((vol) => (
              <div
                key={vol.rank}
                className="glass-card"
                style={{
                  textAlign: 'center',
                  padding: '2.25rem 1.5rem',
                  borderTop: vol.rank === 1 ? '4px solid #F59E0B' : '1px solid var(--border-color)'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  {vol.medal}
                </div>
                <img
                  src={vol.avatar}
                  alt={vol.name}
                  style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem auto', boxShadow: 'var(--shadow-neu-sm)' }}
                />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{vol.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{vol.college}</p>
                <span className="badge badge-amber" style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}>
                  {vol.xp} XP Earned
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 9. CERTIFICATES MOCKUP SECTION */}
        <section style={{ background: '#FFFFFF', padding: '6rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              
              <div>
                <span className="badge badge-purple" style={{ marginBottom: '1rem' }}>
                  <ShieldCheck size={14} /> Official Credentials
                </span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                  Automated, Tamper-Proof Certificates
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '2rem' }}>
                  Every approved volunteer mission automatically generates an official certificate stamped with a unique QR code token. Perfect for college major projects, resumes, and LinkedIn credentials.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', fontWeight: 600 }}>
                    <CheckCircle2 size={20} color="var(--secondary)" /> Verified by Authorized NGO Leaders
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', fontWeight: 600 }}>
                    <CheckCircle2 size={20} color="var(--secondary)" /> QR Code Instant Scanner Authentication
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', fontWeight: 600 }}>
                    <CheckCircle2 size={20} color="var(--secondary)" /> PDF Download & One-Click LinkedIn Share
                  </div>
                </div>
              </div>

              {/* Certificate Card Mockup */}
              <motion.div
                whileHover={{ rotateY: 5, rotateX: -5 }}
                className="glass-card"
                style={{
                  padding: '2.5rem',
                  border: '2px dashed var(--primary)',
                  textAlign: 'center',
                  background: 'var(--bg-primary)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <Award size={48} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>Certificate of Social Impact</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.4rem 0 1.25rem 0' }}>Awarded to Aarav Sharma for 16 Verified Service Hours</p>
                
                <div style={{ background: '#FFFFFF', padding: '0.85rem', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', boxShadow: 'var(--shadow-neu-sm)' }}>
                  <QrCode size={40} color="var(--text-main)" />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)' }}>Token: CERT-2026-8841</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--secondary)', fontWeight: 700 }}>✅ Authenticated on CommunityLink</div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 10. TESTIMONIALS CAROUSEL */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
              <Heart size={14} /> Community Stories
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Loved by Students, NGOs, & Residents
            </h2>
          </div>

          <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2.5rem', textAlign: 'center', position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <span className="badge badge-blue" style={{ marginBottom: '1rem' }}>
                  {testimonials[activeTestimonial].type}
                </span>

                <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.6, fontWeight: 500, marginBottom: '2rem', fontStyle: 'italic' }}>
                  "{testimonials[activeTestimonial].quote}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem' }}>
                  <img
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].author}
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{testimonials[activeTestimonial].author}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{testimonials[activeTestimonial].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Manual Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  style={{
                    width: idx === activeTestimonial ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '9999px',
                    background: idx === activeTestimonial ? 'var(--primary)' : '#CBD5E1',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 11. CTA SECTION */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem 6rem 1.5rem' }}>
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            color: '#FFFFFF',
            textAlign: 'center',
            padding: '5rem 2rem',
            borderRadius: 'var(--radius-xl)'
          }}>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: '1.25rem' }}>
              Ready to Make a Difference?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
              Join thousands of students and registered NGOs creating real social impact today.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => openAuthModal('dashboard')}
                className="btn btn-emerald btn-lg"
                style={{ fontWeight: 800, padding: '1.1rem 2.5rem' }}
              >
                Join CommunityLink Now <ArrowRight size={20} />
              </button>

              <button
                onClick={() => onSelectTab && onSelectTab('explore')}
                className="btn btn-secondary btn-lg"
                style={{ fontWeight: 700 }}
              >
                <Sparkles size={18} color="var(--primary)" /> Explore Missions
              </button>
            </div>
          </div>
        </section>

        {/* 12. FOOTER */}
        <footer style={{ background: '#FFFFFF', borderTop: '1px solid var(--border-color)', padding: '4rem 1.5rem 2rem 1.5rem' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            
            {/* Brand Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <img src="/logo.png" alt="Logo" style={{ height: '36px', width: 'auto', borderRadius: '10px' }} />
                <span style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>CommunityLink</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                AI-Powered Social Volunteering Platform connecting students, NGOs, and residents for verified community impact.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Platform</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <li><a onClick={() => onSelectTab && onSelectTab('explore')} style={{ cursor: 'pointer' }}>Explore Missions</a></li>
                <li><a onClick={() => onSelectTab && onSelectTab('map')} style={{ cursor: 'pointer' }}>Interactive Impact Map</a></li>
                <li><a onClick={() => onSelectTab && onSelectTab('leaderboard')} style={{ cursor: 'pointer' }}>XP Leaderboard</a></li>
                <li><a onClick={() => onSelectTab && onSelectTab('feed')} style={{ cursor: 'pointer' }}>Community Feed</a></li>
              </ul>
            </div>

            {/* Roles & Portals */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>User Portals</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <li><a onClick={() => openAuthModal('dashboard')} style={{ cursor: 'pointer' }}>Student Portal</a></li>
                <li><a onClick={() => openAuthModal('dashboard')} style={{ cursor: 'pointer' }}>NGO Organization Portal</a></li>
                <li><a onClick={() => openAuthModal('dashboard')} style={{ cursor: 'pointer' }}>Resident Request Portal</a></li>
                <li><a onClick={() => openAuthModal('dashboard')} style={{ cursor: 'pointer' }}>Admin Superuser Portal</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Stay Updated</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Subscribe for weekly volunteering drives near you.</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="email" placeholder="Enter your email" className="form-input" style={{ padding: '0.6rem 0.85rem', fontSize: '0.85rem' }} />
                <button className="btn btn-primary btn-sm">Subscribe</button>
              </div>
            </div>

          </div>

          <div style={{ maxWidth: '1280px', margin: '0 auto', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <div>© 2026 CommunityLink Platform. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a>Privacy Policy</a>
              <a>Terms of Service</a>
              <a>Contact Support</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};
