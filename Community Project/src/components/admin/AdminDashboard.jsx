import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  Users, 
  HeartHandshake, 
  CheckCircle, 
  XCircle, 
  BarChart3, 
  TrendingUp, 
  Award,
  FileCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';

export const AdminDashboard = () => {
  const { missions, residentIssues, certificates } = useApp();

  // Recharts Seed Data
  const monthlyEngagementData = [
    { month: 'Mar', hours: 220, students: 85 },
    { month: 'Apr', hours: 340, students: 120 },
    { month: 'May', hours: 480, students: 190 },
    { month: 'Jun', hours: 620, students: 260 },
    { month: 'Jul', hours: 890, students: 340 }
  ];

  const categoryDistributionData = [
    { name: 'Environment', value: 40, color: '#10b981' },
    { name: 'Health', value: 25, color: '#f43f5e' },
    { name: 'Education', value: 20, color: '#3b82f6' },
    { name: 'Social Relief', value: 15, color: '#f59e0b' }
  ];

  const sampleNgoRequests = [
    { id: "ngo-req-1", name: "Youth for Climate Action", regNo: "MH-2025-1102", email: "yca.mumbai@org.in", status: "Pending Verification" },
    { id: "ngo-req-2", name: "Helping Hands Trust", regNo: "MH-2024-8831", email: "contact@helpinghands.org", status: "Pending Verification" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Admin Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)',
        borderLeft: '4px solid var(--accent-purple)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'var(--accent-purple)',
            color: '#fff',
            padding: '1rem',
            borderRadius: 'var(--radius-md)'
          }}>
            <ShieldAlert size={32} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Platform Administrator Portal</h2>
              <span className="badge badge-purple">System Superuser</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Monitor system growth, approve NGO registrations, review analytics, and moderate platform content.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid-4">
        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Total Registered Students</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>1,240</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>↑ +14% this month</div>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Verified Active NGOs</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>38</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>2 Pending Verification</div>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Official Certificates Issued</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{certificates.length + 420}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>100% QR Verified</div>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Total Service Hours Logged</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-purple)' }}>2,550 hrs</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>Across 12 Colleges</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid-2">
        
        {/* Volunteer Service Hours Growth */}
        <div className="glass-card">
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="var(--primary)" /> Monthly Volunteer Hours Growth
          </h4>
          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyEngagementData}>
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="hours" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="glass-card">
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={18} color="var(--accent-emerald)" /> Missions by Category Breakdown
          </h4>
          <div style={{ width: '100%', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* NGO Verification Management */}
      <div className="glass-card">
        <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileCheck size={20} color="var(--accent-purple)" /> Pending NGO Verification Approvals
        </h4>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.85rem' }}>Organization Name</th>
              <th style={{ padding: '0.85rem' }}>Registration RegNo</th>
              <th style={{ padding: '0.85rem' }}>Contact Email</th>
              <th style={{ padding: '0.85rem' }}>Status</th>
              <th style={{ padding: '0.85rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {sampleNgoRequests.map(ngo => (
              <tr key={ngo.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '0.85rem', fontWeight: 700 }}>{ngo.name}</td>
                <td style={{ padding: '0.85rem', color: 'var(--text-muted)' }}>{ngo.regNo}</td>
                <td style={{ padding: '0.85rem', color: 'var(--text-muted)' }}>{ngo.email}</td>
                <td style={{ padding: '0.85rem' }}>
                  <span className="badge badge-amber">{ngo.status}</span>
                </td>
                <td style={{ padding: '0.85rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-emerald btn-sm" onClick={() => alert(`Verified ${ngo.name}!`)}>
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
