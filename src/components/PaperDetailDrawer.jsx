import React from 'react';
import { X, BookOpen, Quote, Calendar, Award, AlertTriangle, HelpCircle, FileText, CheckCircle } from 'lucide-react';

export default function PaperDetailDrawer({ paper, onClose, onGenerateProposal }) {
  if (!paper) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: '520px',
      backgroundColor: 'rgba(11, 15, 25, 0.96)',
      backdropFilter: 'blur(16px)',
      borderLeft: '1px solid var(--yellow-border)',
      boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)',
      zIndex: 1050,
      padding: '28px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span className="gold-badge" style={{ fontSize: '0.7rem' }}>
          PAPER DEEP BREAKDOWN
        </span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={22} />
        </button>
      </div>

      {/* Title & Metadata */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '8px', lineHeight: '1.3' }}>
          {paper.title}
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--primary-yellow-light)', fontWeight: 600 }}>
          {paper.authors}
        </p>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px' }}>
            📅 Published {paper.year}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px' }}>
            🏛️ {paper.journal}
          </span>
          {paper.citations && (
            <span style={{ fontSize: '0.75rem', color: '#93c5fd', background: 'rgba(59, 130, 246, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
              ⭐ {paper.citations} Citations
            </span>
          )}
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--border-light)' }} />

      {/* Abstract / Summary */}
      <div>
        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.6px', marginBottom: '6px' }}>
          Core Overview & Objectives
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
          {paper.keyFindings}
        </p>
      </div>

      {/* Methodology & Architecture */}
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary-yellow-light)', letterSpacing: '0.6px', marginBottom: '6px' }}>
          ⚙️ Methodology & Model Architecture
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
          {paper.methodology}
        </p>
      </div>

      {/* Dataset & Evaluation Metrics */}
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#60a5fa', letterSpacing: '0.6px', marginBottom: '6px' }}>
          📊 Dataset Cohort & Evaluation Metrics
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
          Cohort: {paper.dataset}
        </p>
        <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-yellow-light)', background: 'rgba(245, 158, 11, 0.1)', padding: '6px 10px', borderRadius: '6px' }}>
          {paper.metrics}
        </div>
      </div>

      {/* Limitations & Assumed Hypotheses */}
      <div style={{ background: 'rgba(239, 68, 68, 0.06)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#fca5a5', letterSpacing: '0.6px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertTriangle size={15} /> Stated Limitations & Unresolved Challenges
        </h4>
        <p style={{ fontSize: '0.85rem', color: '#fca5a5', lineHeight: '1.5' }}>
          {paper.limitations}
        </p>
      </div>

      {/* Future Directions */}
      {paper.futureDirections && (
        <div style={{ background: 'rgba(16, 185, 129, 0.06)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#6ee7b7', letterSpacing: '0.6px', marginBottom: '6px' }}>
            🚀 Author's Future Research Horizon
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#6ee7b7' }}>
            {paper.futureDirections}
          </p>
        </div>
      )}

      {/* Citation snippet */}
      <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
          Formatted APA Citation
        </h4>
        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
          {paper.authors} ({paper.year}). {paper.title}. <em>{paper.journal}</em>.
        </div>
      </div>

    </div>
  );
}
