import React, { useState, useEffect } from 'react';
import { Network, Sparkles, Eye, Info, RefreshCw } from 'lucide-react';

export default function KnowledgeGraphView({ papers, gaps, onSelectPaper, onSelectGap }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'papers' | 'gaps'

  // Build graph nodes & edges dynamically from papers and gaps
  const paperNodes = papers.map((p, idx) => {
    // Distribute nodes visually in an aesthetic network layout
    const angle = (idx / papers.length) * 2 * Math.PI;
    const radius = 180;
    return {
      id: p.id,
      type: 'paper',
      label: p.title.length > 30 ? p.title.substring(0, 28) + '...' : p.title,
      fullTitle: p.title,
      authors: p.authors,
      year: p.year,
      citations: p.citations,
      data: p,
      x: 350 + radius * Math.cos(angle),
      y: 260 + radius * Math.sin(angle)
    };
  });

  const gapNodes = gaps.map((g, idx) => {
    const angle = (idx / (gaps.length || 1)) * 2 * Math.PI + Math.PI / 4;
    const radius = 90;
    return {
      id: g.id,
      type: 'gap',
      label: `GAP: ${g.title.length > 25 ? g.title.substring(0, 24) + '...' : g.title}`,
      fullTitle: g.title,
      category: g.category,
      severity: g.severity,
      data: g,
      x: 350 + radius * Math.cos(angle),
      y: 260 + radius * Math.sin(angle)
    };
  });

  const allNodes = filterType === 'papers' ? paperNodes : filterType === 'gaps' ? gapNodes : [...paperNodes, ...gapNodes];

  // Generate dynamic citation links & gap bridge links
  const edges = [];
  
  // Paper to paper connections based on shared year/keywords
  for (let i = 0; i < paperNodes.length; i++) {
    for (let j = i + 1; j < paperNodes.length; j++) {
      edges.push({
        id: `p-link-${i}-${j}`,
        source: paperNodes[i].id,
        target: paperNodes[j].id,
        type: 'citation',
        label: 'Shared Context'
      });
    }
  }

  // Gap to affected paper connections
  gapNodes.forEach(gNode => {
    const affected = gNode.data.affectedPapers || [];
    affected.forEach(pId => {
      if (papers.some(p => p.id === pId)) {
        edges.push({
          id: `gap-link-${gNode.id}-${pId}`,
          source: gNode.id,
          target: pId,
          type: 'gap-bridge',
          label: 'Exposes Gap'
        });
      }
    });
  });

  const getNodePos = (id) => {
    const node = [...paperNodes, ...gapNodes].find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 350, y: 260 };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel-yellow" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Network color="var(--primary-yellow)" size={22} />
              <span className="gold-badge">INTERACTIVE CITATION & GAP MAP</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800 }}>
              Literature Citation & Gap Network Topology
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Blue nodes represent published literature. Glowing Gold nodes mark <strong style={{ color: 'var(--primary-yellow-light)' }}>unexplored research gap bridges</strong> between papers.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>View Filter:</span>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '6px 12px' }}
            >
              <option value="all">Show All Nodes ({paperNodes.length + gapNodes.length})</option>
              <option value="papers">Only Papers ({paperNodes.length})</option>
              <option value="gaps">Only Research Gaps ({gapNodes.length})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Network Graph Canvas Box */}
      <div className="glass-panel" style={{ position: 'relative', height: '540px', overflow: 'hidden', borderRadius: 'var(--radius-lg)', background: '#080c16' }}>
        
        {/* SVG Network Renderer */}
        <svg width="100%" height="100%" viewBox="0 0 700 520" style={{ width: '100%', height: '100%' }}>
          
          {/* Defs for gradients & glows */}
          <defs>
            <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.5)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.4)" />
            </linearGradient>
          </defs>

          {/* Render Edges */}
          {edges.map(edge => {
            const p1 = getNodePos(edge.source);
            const p2 = getNodePos(edge.target);
            const isGapBridge = edge.type === 'gap-bridge';

            return (
              <g key={edge.id}>
                <line 
                  x1={p1.x} 
                  y1={p1.y} 
                  x2={p2.x} 
                  y2={p2.y} 
                  stroke={isGapBridge ? '#f59e0b' : 'rgba(255, 255, 255, 0.12)'} 
                  strokeWidth={isGapBridge ? 2.5 : 1}
                  strokeDasharray={isGapBridge ? '4 4' : 'none'}
                />
              </g>
            );
          })}

          {/* Render Nodes */}
          {allNodes.map(node => {
            const isPaper = node.type === 'paper';
            const isSelected = selectedNode && selectedNode.id === node.id;

            return (
              <g 
                key={node.id} 
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => {
                  setSelectedNode(node);
                  if (isPaper) onSelectPaper(node.data);
                  else if (onSelectGap) onSelectGap(node.data);
                }}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer halo glow for gaps */}
                {!isPaper && (
                  <circle 
                    r="24" 
                    fill="rgba(245, 158, 11, 0.2)" 
                    stroke="var(--primary-yellow)"
                    strokeWidth="1.5"
                    filter="url(#goldGlow)"
                  />
                )}

                {/* Main Node Circle */}
                <circle 
                  r={isPaper ? "18" : "16"} 
                  fill={isPaper ? (isSelected ? "#3b82f6" : "#1e293b") : (isSelected ? "#fef08a" : "#f59e0b")} 
                  stroke={isPaper ? "#60a5fa" : "#fbbf24"} 
                  strokeWidth={isSelected ? "3" : "2"}
                />

                {/* Node Symbol */}
                <text 
                  textAnchor="middle" 
                  dy="4" 
                  fontSize="10" 
                  fill={isPaper ? "#fff" : "#000"} 
                  fontWeight="bold"
                >
                  {isPaper ? "📄" : "⚡"}
                </text>

                {/* Text Label */}
                <text 
                  textAnchor="middle" 
                  dy="34" 
                  fontSize="10" 
                  fill={isPaper ? "#94a3b8" : "#fde047"}
                  fontWeight={isPaper ? "500" : "700"}
                  style={{ pointerEvents: 'none' }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}

        </svg>

        {/* Floating Node Info Box */}
        {selectedNode && (
          <div className="glass-panel-yellow" style={{ 
            position: 'absolute', 
            bottom: '20px', 
            right: '20px', 
            maxWidth: '340px', 
            padding: '16px',
            borderRadius: '12px' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <span className="gold-badge" style={{ fontSize: '0.65rem' }}>
                {selectedNode.type === 'paper' ? 'ACADEMIC PAPER NODE' : 'RESEARCH GAP BRIDGE'}
              </span>
              <button 
                onClick={() => setSelectedNode(null)} 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                ✕
              </button>
            </div>
            
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-yellow-light)', marginBottom: '4px' }}>
              {selectedNode.fullTitle}
            </h4>
            
            {selectedNode.type === 'paper' ? (
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {selectedNode.authors} ({selectedNode.year})
              </p>
            ) : (
              <p style={{ fontSize: '0.78rem', color: '#fca5a5' }}>
                {selectedNode.category} • Severity: {selectedNode.severity}
              </p>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
