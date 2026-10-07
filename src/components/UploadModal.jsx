import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, Sparkles, AlertCircle, Database } from 'lucide-react';
import { parsePaperFromFile } from '../utils/paperAnalyzer';

export default function UploadModal({ isOpen, onClose, onAddPapers, datasets, onLoadDataset }) {
  const [activeTab, setActiveTab] = useState('file'); // 'file' | 'text' | 'preset'
  const [dragActive, setDragActive] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [pasteTitle, setPasteTitle] = useState('');
  const [parsing, setParsing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [parseStatus, setParseStatus] = useState('');

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFiles = (files) => {
    if (!files || files.length === 0) return;
    setParsing(true);
    setParseProgress(15);
    setParseStatus('Extracting raw text streams & metadata structure...');

    setTimeout(() => {
      setParseProgress(55);
      setParseStatus('Running AI NLP entity extraction & section classification...');
    }, 600);

    setTimeout(() => {
      setParseProgress(85);
      setParseStatus('Mapping methodological dimensions & limitation vectors...');
    }, 1200);

    setTimeout(() => {
      const parsedList = [];
      let count = 0;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (evt) => {
          const content = evt.target.result || '';
          const paperObj = parsePaperFromFile(content, file.name);
          parsedList.push(paperObj);
          count++;
          if (count === files.length) {
            setParsing(false);
            setParseProgress(100);
            onAddPapers(parsedList);
            onClose();
          }
        };
        reader.readAsText(file);
      }
    }, 1800);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const handlePasteSubmit = (e) => {
    e.preventDefault();
    if (!pasteText.trim()) return;

    setParsing(true);
    setParseProgress(30);
    setParseStatus('Parsing pasted manuscript text & citations...');

    setTimeout(() => {
      setParseProgress(90);
      setParseStatus('Structuring findings & limitations...');
    }, 800);

    setTimeout(() => {
      const paperObj = parsePaperFromFile(pasteText, pasteTitle || 'User Uploaded Research Paper');
      setParsing(false);
      onAddPapers([paperObj]);
      setPasteText('');
      setPasteTitle('');
      onClose();
    }, 1400);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel-yellow" style={{
        width: '100%',
        maxWidth: '680px',
        padding: '28px',
        borderRadius: 'var(--radius-xl)',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(245, 158, 11, 0.2)'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UploadCloud color="var(--primary-yellow)" size={26} />
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700 }}>
                Upload Research Papers
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Ingest multiple papers to automatically derive literature surveys & pinpoint research gaps
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
          <button 
            onClick={() => setActiveTab('file')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'file' ? 'var(--primary-yellow)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'file' ? '#000' : 'var(--text-main)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            📁 File Drag & Drop (PDF/TXT)
          </button>
          
          <button 
            onClick={() => setActiveTab('text')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'text' ? 'var(--primary-yellow)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'text' ? '#000' : 'var(--text-main)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            📝 Paste Text / Abstract / DOI
          </button>

          <button 
            onClick={() => setActiveTab('preset')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'preset' ? 'var(--primary-yellow)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'preset' ? '#000' : 'var(--text-main)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            🧪 Benchmark Datasets
          </button>
        </div>

        {/* Parsing Progress Bar Overlay */}
        {parsing && (
          <div style={{ margin: '20px 0', padding: '16px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', border: '1px solid var(--primary-yellow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 600, color: 'var(--primary-yellow-light)' }}>
              <span>{parseStatus}</span>
              <span>{parseProgress}%</span>
            </div>
            <div style={{ height: '8px', width: '100%', background: 'rgba(0,0,0,0.4)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${parseProgress}%`, 
                background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
                transition: 'width 0.4s ease' 
              }} />
            </div>
          </div>
        )}

        {/* TAB 1: FILE DROP */}
        {activeTab === 'file' && !parsing && (
          <div>
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                border: dragActive ? '2px dashed var(--primary-yellow)' : '2px dashed rgba(245, 158, 11, 0.4)',
                borderRadius: '16px',
                padding: '40px 20px',
                textAlign: 'center',
                background: dragActive ? 'rgba(245, 158, 11, 0.12)' : 'rgba(15, 23, 42, 0.5)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <UploadCloud size={48} color="var(--primary-yellow)" style={{ marginBottom: '12px', filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))' }} />
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '6px' }}>
                Drag & Drop Multiple Research Papers Here
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                Supports PDF manuscripts, TXT extracts, Markdown, JSON metadata, or BibTeX references.
              </p>
              
              <label className="btn-gold" style={{ cursor: 'pointer' }}>
                Browse Local Files
                <input 
                  type="file" 
                  multiple 
                  accept=".txt,.pdf,.md,.json,.bib" 
                  style={{ display: 'none' }} 
                  onChange={handleFileSelect} 
                />
              </label>
            </div>
          </div>
        )}

        {/* TAB 2: PASTE TEXT */}
        {activeTab === 'text' && !parsing && (
          <form onSubmit={handlePasteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Paper Title (Optional)
              </label>
              <input 
                type="text" 
                placeholder="e.g. Robust Federated Learning for Clinical Diagnostics"
                value={pasteTitle}
                onChange={(e) => setPasteTitle(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Paste Full Text, Abstract, Methodology, or Limitations Section
              </label>
              <textarea 
                rows={6}
                placeholder="Paste the abstract, methodology, dataset details, or paper conclusions here..."
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                style={{ width: '100%', resize: 'vertical' }}
                required
              />
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
              <Sparkles size={16} /> Analyze & Add Paper
            </button>
          </form>
        )}

        {/* TAB 3: PRESET DATASETS */}
        {activeTab === 'preset' && !parsing && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Select a curated domain dataset with real academic literature & pre-synthesized gaps:
            </p>
            {datasets.map(d => (
              <div 
                key={d.id} 
                className="glass-panel"
                style={{ 
                  padding: '14px 18px', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  borderColor: 'rgba(245, 158, 11, 0.2)'
                }}
                onClick={() => {
                  onLoadDataset(d.id);
                  onClose();
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-yellow-light)', fontWeight: 700 }}>
                    🔬 {d.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {d.description}
                  </p>
                  <span className="gold-badge" style={{ marginTop: '8px' }}>
                    {d.papers.length} Curated Papers • {d.synthesizedGaps.length} Key Gaps
                  </span>
                </div>
                <button className="btn-outline-gold" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                  Load Set
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
