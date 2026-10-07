import React, { useState } from 'react';
import { Search, Filter, Download, ExternalLink, Quote, Eye, Trash2, CheckCircle2, HelpCircle, Layers, Sparkles, AlertTriangle } from 'lucide-react';

export default function LiteratureSurveyMatrix({ 
  papers, 
  onSelectPaper, 
  onDeletePaper, 
  onExportMatrix,
  onGenerateProposalFromPaper
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const filteredPapers = papers.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.methodology.toLowerCase().includes(searchTerm.toLowerCase());
    const matchYear = filterYear === 'all' || p.year.toString() === filterYear;
    return matchSearch && matchYear;
  });

  const copyCitation = (paper) => {
    const citation = `${paper.authors} (${paper.year}). ${paper.title}. ${paper.journal || 'Academic Proceedings'}.`;
    navigator.clipboard.writeText(citation);
    setCopiedId(paper.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const years = Array.from(new Set(papers.map(p => p.year))).sort((a,b) => b - a);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Controls & Summary Banner */}
      <div className="glass-panel-yellow" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers color="var(--primary-yellow)" size={22} />
              Literature Survey Comparative Matrix
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Side-by-side synthesized comparison of methodology, dataset cohorts, metrics, and limitations across {papers.length} literature sources.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn-outline-gold" onClick={onExportMatrix}>
              <Download size={16} /> Export Survey Table (MD/CSV)
            </button>
          </div>

        </div>

        {/* Filter Controls Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '16px', flexWrap: 'wrap' }}>
          
          <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search methodology, author, title, or dataset..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', paddingLeft: '36px', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="var(--primary-yellow)" />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Year Filter:</span>
            <select 
              value={filterYear} 
              onChange={(e) => setFilterYear(e.target.value)}
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            >
              <option value="all">All Years ({papers.length})</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Main Comparative Matrix Table */}
      <div className="matrix-table-container glass-panel">
        <table className="matrix-table">
          <thead>
            <tr>
              <th style={{ minWidth: '220px' }}>Paper & Authors</th>
              <th style={{ minWidth: '200px' }}>Methodology & Architecture</th>
              <th style={{ minWidth: '180px' }}>Dataset & Cohort</th>
              <th style={{ minWidth: '150px' }}>Key Metrics</th>
              <th style={{ minWidth: '220px' }}>Key Findings</th>
              <th style={{ minWidth: '240px', color: '#fca5a5' }}>Stated Limitations & Gaps</th>
              <th style={{ minWidth: '110px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPapers.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No papers match the current search filter. Try clearing your filter or uploading new papers.
                </td>
              </tr>
            ) : (
              filteredPapers.map((paper) => (
                <tr key={paper.id}>
                  
                  {/* Title & Author */}
                  <td>
                    <div 
                      style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem', cursor: 'pointer', marginBottom: '4px' }}
                      onClick={() => onSelectPaper(paper)}
                    >
                      {paper.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      {paper.authors}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span className="gold-badge" style={{ fontSize: '0.65rem' }}>
                        📅 {paper.year}
                      </span>
                      {paper.citations && (
                        <span style={{ fontSize: '0.7rem', color: '#93c5fd', background: 'rgba(59, 130, 246, 0.15)', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                          {paper.citations} citations
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Methodology */}
                  <td>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                      {paper.methodology}
                    </div>
                  </td>

                  {/* Dataset */}
                  <td>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {paper.dataset}
                    </div>
                  </td>

                  {/* Metrics */}
                  <td>
                    <div style={{ 
                      fontSize: '0.78rem', 
                      fontFamily: 'var(--font-mono)', 
                      color: 'var(--primary-yellow-light)',
                      background: 'rgba(245, 158, 11, 0.08)',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(245, 158, 11, 0.2)'
                    }}>
                      {paper.metrics}
                    </div>
                  </td>

                  {/* Findings */}
                  <td>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                      {paper.keyFindings}
                    </div>
                  </td>

                  {/* Limitations */}
                  <td style={{ background: 'rgba(239, 68, 68, 0.03)' }}>
                    <div style={{ display: 'flex', gap: '6px', color: '#fca5a5', fontSize: '0.8rem', lineHeight: '1.4' }}>
                      <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        {paper.limitations}
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                      <button 
                        className="btn-dark" 
                        title="View detailed paper breakdown" 
                        onClick={() => onSelectPaper(paper)}
                        style={{ padding: '6px' }}
                      >
                        <Eye size={14} color="var(--primary-yellow)" />
                      </button>
                      <button 
                        className="btn-dark" 
                        title="Copy citation string" 
                        onClick={() => copyCitation(paper)}
                        style={{ padding: '6px' }}
                      >
                        <Quote size={14} color={copiedId === paper.id ? '#10b981' : 'var(--text-muted)'} />
                      </button>
                      {onDeletePaper && (
                        <button 
                          className="btn-dark" 
                          title="Remove paper" 
                          onClick={() => onDeletePaper(paper.id)}
                          style={{ padding: '6px' }}
                        >
                          <Trash2 size={14} color="#ef4444" />
                        </button>
                      )}
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
