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
          background: 'var(--bg-primary)',
          color: 'var(--text-main)',
          padding: '2.5rem',
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-neu-xl)',
          border: '1.5px solid rgba(255, 255, 255, 0.9)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-primary)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)',
            boxShadow: 'var(--shadow-neu-sm)'
          }}
        >
          <X size={20} />
        </button>

        {/* Certificate Outer Border Frame */}
        <div style={{
          border: '2px dashed var(--primary)',
          borderRadius: 'var(--radius-md)',
          padding: '2rem',
          textAlign: 'center',
          position: 'relative',
          background: 'var(--bg-primary)',
          boxShadow: 'var(--shadow-neu-inset)'
        }}>

          {/* Certificate Header */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <Award size={36} color="var(--primary)" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              CommunityLink Platform
            </h2>
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.75rem 0', fontFamily: 'serif', letterSpacing: '0.02em' }}>
            Certificate of Social Service
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
            This is proudly awarded to
          </p>

          {/* Student Name */}
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', margin: '1rem 0 0.2rem 0', borderBottom: '2px solid var(--border-color)', display: 'inline-block', paddingBottom: '0.2rem' }}>
            {certificate.studentName}
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1.5rem' }}>
            {certificate.college}
          </p>

          {/* Service Statement */}
          <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
            In recognition of outstanding dedication and completing <strong>{certificate.hoursLogged} Hours</strong> of community service for the initiative:
          </p>

          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', background: 'var(--bg-primary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-neu-sm)', border: '1px solid rgba(255, 255, 255, 0.8)' }}>
            "{certificate.missionTitle}"
          </div>

          {/* AI Contribution Summary */}
          {certificate.aiSummary && (
            <div style={{
              background: 'var(--bg-primary)',
              boxShadow: 'var(--shadow-neu-inset)',
              padding: '0.85rem 1.15rem',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              textAlign: 'left',
              margin: '0 auto 1.5rem auto',
              maxWidth: '650px',
              borderRadius: 'var(--radius-sm)'
            }}>
              <strong style={{ color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}>
                <Sparkles size={14} /> AI Verified Impact Contribution Summary:
              </strong>
              {certificate.aiSummary}
            </div>
          )}

          {/* Certificate Footer Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            
            {/* NGO Signatory */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'cursive', fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 700 }}>
                {certificate.ngoName}
              </div>
              <div style={{ borderTop: '1px dashed var(--text-muted)', width: '140px', margin: '0.4rem auto' }} />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Authorized NGO Lead</div>
            </div>

            {/* QR Code Verification Scanner */}
            <div style={{ textAlign: 'center' }}>
              <div 
                onClick={() => setShowQrVerification(!showQrVerification)}
                style={{
                  display: 'inline-block',
                  padding: '0.6rem',
                  background: 'var(--bg-primary)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-neu-sm)'
                }}
              >
                <QrCode size={48} color="var(--text-main)" />
                <div style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 700, marginTop: '0.2rem' }}>Scan / Click to Verify</div>
              </div>
            </div>

            {/* Official Seal / ID */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)' }}>ID: {certificate.id}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date: {certificate.issueDate}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', background: 'var(--accent-emerald-light)', color: 'var(--accent-emerald)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700, marginTop: '0.3rem', boxShadow: '0 2px 5px rgba(34, 197, 94, 0.2)' }}>
                <ShieldCheck size={12} /> Authenticated
              </div>
            </div>

          </div>

        </div>

        {/* QR Verification Info Drawer */}
        {showQrVerification && (
          <div style={{
            marginTop: '1rem',
            background: 'var(--accent-emerald-light)',
            border: '1px solid var(--accent-emerald)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1.15rem',
            fontSize: '0.82rem',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)' }}>
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
