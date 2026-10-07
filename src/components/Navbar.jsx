import React from 'react';
import { Sparkles, Upload, Database, Layers, Network, FileText, RefreshCw, Compass } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  paperCount, 
  onOpenUpload, 
  selectedDataset, 
  onSelectDatasetChange, 
  datasets,
  onReset
}) {
  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', position: 'sticky', top: 0, zIndex: 100, padding: '12px 24px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)'
          }}>
            <Sparkles size={24} color="#000" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                GAP<span className="yellow-gradient-text">LAB</span> AI
              </h1>
              <span className="gold-badge" style={{ fontSize: '0.65rem' }}>PRO MATRIX v2.5</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Multi-Paper Literature Survey & Research Gap Discovery Engine
            </p>
          </div>
        </div>

        {/* Dataset Quick Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Database size={14} color="var(--primary-yellow)" /> Benchmark Domain:
          </span>
          <select 
            value={selectedDataset} 
            onChange={(e) => onSelectDatasetChange(e.target.value)}
            style={{ 
              fontSize: '0.85rem', 
              padding: '6px 12px', 
              background: 'rgba(15, 23, 42, 0.9)', 
              borderColor: 'var(--yellow-border)',
              color: 'var(--primary-yellow-light)' 
            }}
          >
            <option value="custom">📁 Upload Custom Papers ({paperCount} active)</option>
            {datasets.map(d => (
              <option key={d.id} value={d.id}>🔬 {d.title} ({d.papers.length} papers)</option>
            ))}
          </select>
        </div>

        {/* Tab Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(11, 15, 25, 0.6)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
          <button 
            className={`btn-dark ${activeTab === 'matrix' ? 'pulse-yellow' : ''}`}
            onClick={() => setActiveTab('matrix')}
            style={{ 
              background: activeTab === 'matrix' ? 'var(--primary-yellow)' : 'transparent',
              color: activeTab === 'matrix' ? '#000' : 'var(--text-main)',
              fontWeight: activeTab === 'matrix' ? 700 : 500,
              border: 'none',
              borderRadius: '8px'
            }}
          >
            <Layers size={16} /> Literature Survey Matrix
          </button>
          
          <button 
            className={`btn-dark ${activeTab === 'gaps' ? 'pulse-yellow' : ''}`}
            onClick={() => setActiveTab('gaps')}
            style={{ 
              background: activeTab === 'gaps' ? 'var(--primary-yellow)' : 'transparent',
              color: activeTab === 'gaps' ? '#000' : 'var(--text-main)',
              fontWeight: activeTab === 'gaps' ? 700 : 500,
              border: 'none',
              borderRadius: '8px',
              position: 'relative'
            }}
          >
            <Compass size={16} /> Research Gap Discovery
            <span style={{ 
              background: activeTab === 'gaps' ? '#000' : 'var(--primary-yellow)',
              color: activeTab === 'gaps' ? 'var(--primary-yellow-light)' : '#000',
              padding: '1px 6px',
              borderRadius: '10px',
              fontSize: '0.7rem',
              fontWeight: 800,
              marginLeft: '4px'
            }}>
              GAP
            </span>
          </button>

          <button 
            className="btn-dark"
            onClick={() => setActiveTab('graph')}
            style={{ 
              background: activeTab === 'graph' ? 'var(--primary-yellow)' : 'transparent',
              color: activeTab === 'graph' ? '#000' : 'var(--text-main)',
              fontWeight: activeTab === 'graph' ? 700 : 500,
              border: 'none',
              borderRadius: '8px'
            }}
          >
            <Network size={16} /> Knowledge Citation Graph
          </button>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn-gold" onClick={onOpenUpload}>
            <Upload size={16} /> Upload Papers
          </button>
          
          <button className="btn-dark" title="Reset workspace" onClick={onReset}>
            <RefreshCw size={14} />
          </button>
        </div>

      </div>
    </header>
  );
}
