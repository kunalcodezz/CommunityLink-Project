import React, { useState } from 'react';
import { ShieldCheck, Award, QrCode, Printer, Download, X, Sparkles, CheckCircle2 } from 'lucide-react';

export const CertificateModal = ({ certificate, onClose }) => {
  const [showQrVerification, setShowQrVerification] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div 
        className="modal-content"
        style={{
          maxWidth: '800px',
          background: '#ffffff',
          color: '#0f172a',
          padding: '2.5rem',
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
          border: '12px solid #1e293b'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0f172a'
          }}
        >
          <X size={20} />
        </button>

        {/* Certificate Outer Border Frame */}
        <div style={{
          border: '3px double #2563eb',
          padding: '2rem',
          textAlign: 'center',
          position: 'relative',
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
        }}>

          {/* Certificate Header */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <Award size={36} color="#2563eb" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e3a8a', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              CommunityLink Platform
            </h2>
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', margin: '0.75rem 0', fontFamily: 'serif', letterSpacing: '0.02em' }}>
            Certificate of Social Service
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
            This is proudly awarded to
          </p>

          {/* Student Name */}
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb', margin: '1rem 0 0.2rem 0', borderBottom: '2px solid #e2e8f0', display: 'inline-block', paddingBottom: '0.2rem' }}>
            {certificate.studentName}
          </div>
          <p style={{ fontSize: '0.95rem', color: '#475569', fontWeight: 600, marginBottom: '1.5rem' }}>
            {certificate.college}
          </p>

          {/* Service Statement */}
          <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
            In recognition of outstanding dedication and completing <strong>{certificate.hoursLogged} Hours</strong> of community service for the initiative:
          </p>

          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', background: '#eff6ff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
            "{certificate.missionTitle}"
          </div>

          {/* AI Contribution Summary */}
          {certificate.aiSummary && (
            <div style={{
              background: '#f8fafc',
              borderLeft: '4px solid #8b5cf6',
              padding: '0.75rem 1rem',
              fontSize: '0.85rem',
              color: '#475569',
              textAlign: 'left',
              margin: '0 auto 1.5rem auto',
              maxWidth: '650px',
              borderRadius: '4px'
            }}>
              <strong style={{ color: '#7c3aed', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}>
                <Sparkles size={14} /> AI Verified Impact Contribution Summary:
              </strong>
              {certificate.aiSummary}
            </div>
          )}

          {/* Certificate Footer Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
            
            {/* NGO Signatory */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'cursive', fontSize: '1.1rem', color: '#1e293b', fontWeight: 700 }}>
                {certificate.ngoName}
              </div>
              <div style={{ borderTop: '1px dashed #94a3b8', width: '140px', margin: '0.4rem auto' }} />
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Authorized NGO Lead</div>
            </div>

            {/* QR Code Verification Scanner */}
            <div style={{ textAlign: 'center' }}>
              <div 
                onClick={() => setShowQrVerification(!showQrVerification)}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                }}
              >
                <QrCode size={48} color="#0f172a" />
                <div style={{ fontSize: '0.65rem', color: '#2563eb', fontWeight: 700, marginTop: '0.2rem' }}>Scan / Click to Verify</div>
              </div>
            </div>

            {/* Official Seal / ID */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>ID: {certificate.id}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Date: {certificate.issueDate}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', background: '#ecfdf5', color: '#059669', padding: '0.25rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, marginTop: '0.3rem' }}>
                <ShieldCheck size={12} /> Authenticated
              </div>
            </div>

          </div>

        </div>

        {/* QR Verification Info Drawer */}
        {showQrVerification && (
          <div style={{
            marginTop: '1rem',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '8px',
            padding: '0.85rem',
            fontSize: '0.82rem',
            color: '#065f46',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} /> Official Certificate Authenticity Token Verified
              </div>
              <p style={{ marginTop: '0.2rem' }}>Token: <code>{certificate.qrCodeToken}</code> • Validated on CommunityLink Registry.</p>
            </div>
            <button className="btn btn-sm btn-emerald" onClick={() => setShowQrVerification(false)}>
              OK
            </button>
          </div>
        )}

        {/* Actions Row */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Printer size={16} /> Print / Save PDF
          </button>
        </div>

      </div>
    </div>
  );
};
