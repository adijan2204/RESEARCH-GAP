import React, { useState } from 'react';
import { X, Copy, Download, Check, Sparkles, FileText, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProposalModal({ isOpen, onClose, proposalText, gap }) {
  const [copied, setCopied] = useState(false);
  const [editedText, setEditedText] = useState(proposalText || '');

  React.useEffect(() => {
    setEditedText(proposalText || '');
    if (isOpen) {
      // Trigger golden celebration confetti on opening proposal
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#ffffff']
      });
    }
  }, [proposalText, isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(editedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([editedText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Research_Proposal_${gap?.title ? gap.title.substring(0, 20).replace(/\W+/g, "_") : "Outline"}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div className="glass-panel-yellow" style={{
        width: '100%',
        maxWidth: '860px',
        maxHeight: '90vh',
        padding: '30px',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 70px rgba(0,0,0,0.9), 0 0 40px rgba(245, 158, 11, 0.3)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--primary-yellow)', color: '#000', padding: '8px', borderRadius: '10px' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800 }}>
                Synthesized Research Proposal & Grant Outline
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Targeting Gap: <strong style={{ color: 'var(--primary-yellow-light)' }}>{gap?.title}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="btn-gold" onClick={handleCopy} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Markdown'}
            </button>
            <button className="btn-outline-gold" onClick={handleDownload} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              <Download size={16} /> Export (.md)
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}>
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Editable Proposal Markdown Textarea */}
        <div style={{ flex: 1, overflowY: 'auto', margin: '10px 0' }}>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            style={{
              width: '100%',
              minHeight: '480px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: '1.6',
              padding: '20px',
              background: '#070a12',
              color: '#f8fafc',
              border: '1px solid var(--yellow-border)',
              borderRadius: '12px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Footer info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>💡 Tip: You can edit the proposal above directly before exporting.</span>
          <span>GapLab AI Auto-Generated</span>
        </div>

      </div>
    </div>
  );
}
