import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UploadModal from './components/UploadModal';
import LiteratureSurveyMatrix from './components/LiteratureSurveyMatrix';
import ResearchGapExplorer from './components/ResearchGapExplorer';
import KnowledgeGraphView from './components/KnowledgeGraphView';
import ProposalModal from './components/ProposalModal';
import PaperDetailDrawer from './components/PaperDetailDrawer';
import AIQueryAssistant from './components/AIQueryAssistant';

import { SAMPLE_DATASETS } from './data/sampleDatasets';
import { synthesizeResearchGaps, generateResearchProposal } from './utils/paperAnalyzer';
import { Sparkles, Layers, Compass, Network, FileText, Database, Plus, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('gaps'); // 'matrix' | 'gaps' | 'graph'
  const [selectedDatasetId, setSelectedDatasetId] = useState('ai-healthcare');
  
  // Active papers and gaps state
  const currentPreset = SAMPLE_DATASETS.find(d => d.id === selectedDatasetId) || SAMPLE_DATASETS[0];
  const [papers, setPapers] = useState(currentPreset.papers);
  const [gaps, setGaps] = useState(currentPreset.synthesizedGaps);

  // Modals & Drawers state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedGap, setSelectedGap] = useState(null);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [proposalText, setProposalText] = useState('');

  // Handle switching datasets
  const handleDatasetChange = (datasetId) => {
    setSelectedDatasetId(datasetId);
    if (datasetId === 'custom') return;
    const targetSet = SAMPLE_DATASETS.find(d => d.id === datasetId);
    if (targetSet) {
      setPapers(targetSet.papers);
      setGaps(targetSet.synthesizedGaps);
    }
  };

  // Handle custom uploaded papers
  const handleAddPapers = (newPapers) => {
    const updatedPapers = [...newPapers, ...papers];
    setPapers(updatedPapers);
    setSelectedDatasetId('custom');
    
    // Dynamically synthesize new research gaps across custom papers!
    const dynamicGaps = synthesizeResearchGaps(updatedPapers);
    setGaps(dynamicGaps);
    setActiveTab('gaps');
  };

  // Delete paper
  const handleDeletePaper = (paperId) => {
    const remaining = papers.filter(p => p.id !== paperId);
    setPapers(remaining);
    if (remaining.length >= 2) {
      const reSynthesized = synthesizeResearchGaps(remaining);
      setGaps(reSynthesized);
    } else {
      setGaps([]);
    }
  };

  // Handle Proposal Generation
  const handleGenerateProposal = (gap) => {
    setSelectedGap(gap);
    const proposalMd = generateResearchProposal(gap, papers);
    setProposalText(proposalMd);
    setProposalModalOpen(true);
  };

  // Export Matrix Table as Markdown file
  const handleExportMatrix = () => {
    let md = `# LITERATURE SURVEY COMPARATIVE MATRIX\n`;
    md += `**Generated via GapLab AI Engine**\n`;
    md += `**Total Papers Analyzed:** ${papers.length}\n\n`;
    md += `| Paper & Authors | Year | Methodology | Dataset Cohort | Key Metrics | Limitations & Gaps |\n`;
    md += `|---|---|---|---|---|---|\n`;

    papers.forEach(p => {
      md += `| **${p.title}**<br>_${p.authors}_ | ${p.year} | ${p.methodology} | ${p.dataset} | ${p.metrics} | ${p.limitations} |\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Literature_Survey_Matrix_${Date.now()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset workspace
  const handleReset = () => {
    const defaultSet = SAMPLE_DATASETS[0];
    setSelectedDatasetId(defaultSet.id);
    setPapers(defaultSet.papers);
    setGaps(defaultSet.synthesizedGaps);
    setActiveTab('gaps');
  };

  return (
    <div className="bg-grid" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header Bar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        paperCount={papers.length}
        onOpenUpload={() => setIsUploadOpen(true)}
        selectedDataset={selectedDatasetId}
        onSelectDatasetChange={handleDatasetChange}
        datasets={SAMPLE_DATASETS}
        onReset={handleReset}
      />

      {/* Main Workspace Container */}
      <main style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', padding: '24px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Quick Stats & Active Domain Pill Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="gold-badge" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
              🔬 {papers.length} Papers Ingested
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>|</span>
            <span style={{ fontSize: '0.8rem', color: '#fca5a5', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              ⚡ {gaps.length} Synthesized Gaps Identified
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className="btn-outline-gold" style={{ fontSize: '0.8rem', padding: '6px 14px' }} onClick={() => setIsUploadOpen(true)}>
              <Plus size={14} /> Add Papers to Corpus
            </button>
          </div>

        </div>

        {/* TAB CONTENTS */}
        {activeTab === 'gaps' && (
          <ResearchGapExplorer 
            gaps={gaps}
            papers={papers}
            onGenerateProposal={handleGenerateProposal}
            onSelectPaper={setSelectedPaper}
          />
        )}

        {activeTab === 'matrix' && (
          <LiteratureSurveyMatrix 
            papers={papers}
            onSelectPaper={setSelectedPaper}
            onDeletePaper={handleDeletePaper}
            onExportMatrix={handleExportMatrix}
            onGenerateProposalFromPaper={(paper) => {
              const gap = gaps[0];
              if (gap) handleGenerateProposal(gap);
            }}
          />
        )}

        {activeTab === 'graph' && (
          <KnowledgeGraphView 
            papers={papers}
            gaps={gaps}
            onSelectPaper={setSelectedPaper}
            onSelectGap={(gap) => handleGenerateProposal(gap)}
          />
        )}

        {/* AI Query Assistant Chat Bar */}
        <AIQueryAssistant papers={papers} gaps={gaps} />

      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-light)', padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <strong>GapLab AI</strong> — Next-Generation Literature Survey & Research Gap Discovery System
          </div>
          <div style={{ color: 'var(--primary-yellow-light)', fontWeight: 600 }}>
            ⚡ Electric Gold Theme • High-Precision Multi-Paper Synthesis
          </div>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      <UploadModal 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddPapers={handleAddPapers}
        datasets={SAMPLE_DATASETS}
        onLoadDataset={handleDatasetChange}
      />

      <ProposalModal 
        isOpen={proposalModalOpen}
        onClose={() => setProposalModalOpen(false)}
        proposalText={proposalText}
        gap={selectedGap}
      />

      <PaperDetailDrawer 
        paper={selectedPaper}
        onClose={() => setSelectedPaper(null)}
        onGenerateProposal={() => {
          if (gaps[0]) handleGenerateProposal(gaps[0]);
        }}
      />

    </div>
  );
}
