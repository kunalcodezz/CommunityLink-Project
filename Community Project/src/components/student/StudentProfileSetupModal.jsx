import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  User, 
  Building2, 
  CheckCircle, 
  Sparkles, 
  X,
  ArrowRight
} from 'lucide-react';

export const StudentProfileSetupModal = ({ isOpen, onClose }) => {
  const { studentProfile, updateStudentProfile } = useApp();

  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [college, setCollege] = useState('');
  const [education, setEducation] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (studentProfile) {
      setFullName(studentProfile.name || '');
      setDob(studentProfile.dob || '');
      setCollege(studentProfile.college || '');
      setEducation(studentProfile.education || 'B.Tech / B.E.');
    }
  }, [studentProfile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudentProfile({
      name: fullName.trim(),
      dob,
      college: college.trim(),
      education,
      isSetupComplete: true
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '540px', padding: '2rem', position: 'relative' }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-flex',
            padding: '0.85rem',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
            color: 'var(--primary)',
            marginBottom: '0.85rem',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
          }}>
            <GraduationCap size={32} />
          </div>

          <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>
            <Sparkles size={13} /> Student Registration Details
          </span>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.35rem' }}>
            Complete Your Student Profile
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
            Please enter your academic information for verified certificate issuance and social impact tracking.
          </p>
        </div>

        {/* Profile Details Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>
              Full Name (As on Certificate) *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                placeholder="e.g. Aarav Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            </div>
          </div>

          {/* Date of Birth (DOB) */}
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>
              Date of Birth (DOB) *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Calendar size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            </div>
          </div>

          {/* College Name */}
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>
              College / University Name *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                placeholder="e.g. VJTI Mumbai / IIT Bombay"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Building2 size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            </div>
          </div>

          {/* Education Level / Course */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>
              Education Degree / Level *
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="form-select"
                style={{ paddingLeft: '2.5rem' }}
              >
                <option value="B.Tech / B.E.">B.Tech / B.E. (Engineering)</option>
                <option value="B.Sc / B.C.A.">B.Sc / B.C.A. (Science & IT)</option>
                <option value="B.A. / B.Com">B.A. / B.Com (Arts & Commerce)</option>
                <option value="Post Graduate (M.Tech / M.B.A. / M.Sc)">Post Graduate (M.Tech / M.B.A. / M.Sc)</option>
                <option value="High School / Diploma">High School / Diploma</option>
                <option value="Other Degree">Other Degree</option>
              </select>
              <BookOpen size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', fontWeight: 700 }}
          >
            {isSaved ? (
              <>
                <CheckCircle size={18} /> Student Info Saved!
              </>
            ) : (
              <>
                Save & Access Student Portal <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
