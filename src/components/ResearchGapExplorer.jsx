import React, { useState } from 'react';
import { Compass, AlertCircle, Sparkles, Filter, ChevronRight, BookOpen, Wrench, Database, Users, Cpu, FileText, ArrowUpRight } from 'lucide-react';
import { RESEARCH_GAP_TAXONOMY } from '../data/sampleDatasets';

export default function ResearchGapExplorer({ 
  gaps, 
  papers, 
  onGenerateProposal, 
  onSelectPaper 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [activeGapId, setActiveGapId] = useState(gaps[0]?.id || null);

  const filteredGaps = gaps.filter(g => {
    const matchCategory = selectedCategory === 'all' || g.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchSeverity = selectedSeverity === 'all' || g.severity.toLowerCase() === selectedSeverity.toLowerCase();
    return matchCategory && matchSeverity;
  });

  const activeGap = gaps.find(g => g.id === activeGapId) || filteredGaps[0] || gaps[0];

  const getCategoryIcon = (catName) => {
    const lower = (catName || '').toLowerCase();
    if (lower.includes('method')) return <Wrench size={16} color="#F59E0B" />;
    if (lower.includes('data') || lower.includes('empirical')) return <Database size={16} color="#3B82F6" />;
    if (lower.includes('theory') || lower.includes('concept')) return <BookOpen size={16} color="#8B5CF6" />;
    if (lower.includes('pop') || lower.includes('geo')) return <Users size={16} color="#10B981" />;
    return <Cpu size={16} color="#EC4899" />;
  };

  const getSeverityBadgeClass = (severity) => {
    const s = (severity || '').toLowerCase();
    if (s === 'critical') return 'badge-critical';
    if (s === 'moderate') return 'badge-moderate';
    return 'badge-horizon';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel-yellow" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Compass color="var(--primary-yellow)" size={24} />
              <span className="gold-badge">AI MULTI-PAPER SYNTHESIS</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800 }}>
              Identified Research Gaps & Unexplored Horizons
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Cross-analyzing {papers.length} literature papers revealed <strong style={{ color: 'var(--primary-yellow-light)' }}>{gaps.length} critical research gaps</strong> ready for novel dissertation or paper publication.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {activeGap && (
              <button 
                className="btn-gold" 
                onClick={() => onGenerateProposal(activeGap)}
                style={{ padding: '12px 24px', fontSize: '0.9rem' }}
              >
                <Sparkles size={18} /> Construct Novel Proposal for Selected Gap
              </button>
            )}
          </div>
        </div>

        {/* Taxonomy Categories Filter Row */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
          <button 
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: selectedCategory === 'all' ? '1px solid var(--primary-yellow)' : '1px solid var(--border-light)',
              background: selectedCategory === 'all' ? 'var(--primary-yellow)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedCategory === 'all' ? '#000' : 'var(--text-main)',
              cursor: 'pointer'
            }}
          >
            All Gap Types ({gaps.length})
          </button>
          
          {RESEARCH_GAP_TAXONOMY.map(t => (
            <button 
              key={t.key}
              onClick={() => setSelectedCategory(t.key)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: selectedCategory === t.key ? `1px solid ${t.color}` : '1px solid var(--border-light)',
                background: selectedCategory === t.key ? `${t.color}22` : 'rgba(15, 23, 42, 0.6)',
                color: selectedCategory === t.key ? t.color : 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Layout: Left List of Gaps | Right Detailed Gap Analysis */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(420px, 1.3fr)', gap: '20px' }}>
        
        {/* LEFT COLUMN: Gaps List Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Detected Gap Inventory ({filteredGaps.length})</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-yellow-light)' }}>Click gap to inspect</span>
          </h3>

          {filteredGaps.map(gap => {
            const isSelected = activeGap && activeGap.id === gap.id;
            return (
              <div 
                key={gap.id}
                className={`glass-panel ${isSelected ? 'glass-panel-yellow' : ''}`}
                onClick={() => setActiveGapId(gap.id)}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  borderLeft: isSelected ? '4px solid var(--primary-yellow)' : '1px solid var(--border-light)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span className={`gold-badge ${getSeverityBadgeClass(gap.severity)}`}>
                    {gap.severity} Severity
                  </span>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-yellow-light)' }}>
                    Impact: {gap.impactScore}/100
                  </div>
                </div>

                <h4 style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: '0.95rem', 
                  fontWeight: 700, 
                  color: isSelected ? 'var(--primary-yellow-light)' : 'var(--text-main)',
                  marginBottom: '8px',
                  lineHeight: '1.3' 
                }}>
                  {gap.title}
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {getCategoryIcon(gap.category)}
                  <span>{gap.category}</span>
                  <span>•</span>
                  <span>{gap.affectedPapers ? gap.affectedPapers.length : 0} Papers Involved</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Active Selected Gap Deep-Dive */}
        {activeGap ? (
          <div className="glass-panel-yellow" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', height: 'fit-content' }}>
            
            {/* Header badges */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {getCategoryIcon(activeGap.category)}
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-yellow-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {activeGap.category}
                </span>
              </div>
              
              <span className={`gold-badge ${getSeverityBadgeClass(activeGap.severity)}`}>
                {activeGap.severity} Severity Gap
              </span>
            </div>

            {/* Gap Title */}
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '16px', lineHeight: '1.3' }}>
              {activeGap.title}
            </h3>

            {/* Impact Score Visual Bar */}
            <div style={{ marginBottom: '20px', background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Gap Academic Impact & Publication Score:</span>
                <span style={{ color: 'var(--primary-yellow-light)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  {activeGap.impactScore} / 100
                </span>
              </div>
              <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${activeGap.impactScore}%`, 
                  background: 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)' 
                }} />
              </div>
            </div>

            {/* Detailed Description */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Conflict & Synthesis Breakdown:
              </h4>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-main)', lineHeight: '1.6', background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                {activeGap.description}
              </p>
            </div>

            {/* Affected Literature Papers */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Literature Papers Exposing this Gap:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {papers.filter(p => activeGap.affectedPapers && activeGap.affectedPapers.includes(p.id)).map(paper => (
                  <div 
                    key={paper.id}
                    onClick={() => onSelectPaper(paper)}
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(30, 41, 59, 0.6)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        📄 {paper.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {paper.authors} ({paper.year})
                      </div>
                    </div>
                    <ArrowUpRight size={16} color="var(--primary-yellow)" />
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Novel Research Direction */}
            <div style={{ marginBottom: '24px', background: 'rgba(245, 158, 11, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid var(--yellow-border)' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--primary-yellow-light)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} /> Recommended Novel Research Direction:
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#fef08a', lineHeight: '1.5' }}>
                {activeGap.suggestedResearch}
              </p>
            </div>

            {/* Action CTA Button */}
            <button 
              className="btn-gold" 
              onClick={() => onGenerateProposal(activeGap)}
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem' }}
            >
              <Sparkles size={18} /> Generate Grant / Research Proposal Outline
            </button>

          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Select a research gap from the left list to inspect detailed findings.
          </div>
        )}

      </div>

    </div>
  );
}
