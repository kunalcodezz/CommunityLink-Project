import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AiAssistant = () => {
  const { missions, currentUserRole } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello! I am your CommunityLink AI Assistant 🤖. How can I help you today? You can ask me about nearby missions, how to earn XP badges, certificate downloads, or reporting local issues.`
    }
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    "Recommend nearby environmental missions",
    "How do I earn the 'Tree Guardian' badge?",
    "How does certificate QR verification work?",
    "How can residents report garbage/sanitation issues?"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // User Message
    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Process AI Response logic
    setTimeout(() => {
      let responseText = "";
      const lower = query.toLowerCase();

      if (lower.includes('nearby') || lower.includes('recommend') || lower.includes('mission')) {
        const topMissions = missions.slice(0, 2);
        responseText = `✨ Based on active opportunities in Mumbai & Navi Mumbai:\n1. **${topMissions[0].title}** (${topMissions[0].category}) - ${topMissions[0].time}. Reward: +${topMissions[0].xpReward} XP.\n2. **${topMissions[1].title}** (${topMissions[1].category}) - ${topMissions[1].time}. Reward: +${topMissions[1].xpReward} XP. Click 'Explore Missions' to join!`;
      } else if (lower.includes('badge') || lower.includes('xp') || lower.includes('tree guardian')) {
        responseText = `🏆 **Gamification Rules**:\n- Complete environmental missions to unlock **Tree Guardian** (3 drives required).\n- Blood donation drives grant **Blood Donation Hero** (+200 XP).\n- Log 25+ hours to earn **Community Champion**!\nEach approved mission automatically updates your XP score & leaderboard rank.`;
      } else if (lower.includes('certificate') || lower.includes('qr') || lower.includes('download')) {
        responseText = `📜 **Certificates** are automatically generated once an NGO approves your uploaded proof of completion. Each certificate includes a unique Certificate ID, volunteer hours, and an interactive QR code scanner token for official college verification!`;
      } else if (lower.includes('resident') || lower.includes('garbage') || lower.includes('report') || lower.includes('issue')) {
        responseText = `🏡 **Community Issue Reporting**:\nSwitch your role to **Resident View**, click 'Report Community Issue', upload a photo, and set the location pin. Nearby NGOs and student volunteer groups can accept and resolve the issue!`;
      } else {
        responseText = `I'd be happy to help with that! CommunityLink connects students with verified NGOs. You can browse active missions, upload completion proofs, track your XP levels, or view live impact on our Interactive Map. What specific area would you like to explore?`;
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: responseText }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 999,
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50px',
            padding: '0.85rem 1.4rem',
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.45)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontWeight: 700,
            fontSize: '0.95rem',
            transition: 'transform 0.2s ease'
          }}
          className="pulse-glow"
        >
          <Bot size={22} />
          <span>Ask AI Assistant</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          width: '380px',
          height: '520px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
            padding: '1rem',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Bot size={22} />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>CommunityLink AI</h4>
                <p style={{ fontSize: '0.7rem', opacity: 0.9 }}>Powered by Smart Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            {messages.map(m => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.sender === 'user' ? 'var(--primary)' : 'var(--bg-card)',
                  color: m.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                  padding: '0.75rem 1rem',
                  borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line'
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.4rem', overflowX: 'auto', background: 'rgba(0,0,0,0.1)' }}>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                style={{
                  whiteSpace: 'nowrap',
                  fontSize: '0.72rem',
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  cursor: 'pointer'
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div style={{
            padding: '0.75rem 1rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <input
              type="text"
              placeholder="Ask AI anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="form-input"
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            />
            <button
              onClick={() => handleSend()}
              className="btn btn-primary btn-sm"
              style={{ padding: '0.55rem' }}
            >
              <Send size={16} />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
