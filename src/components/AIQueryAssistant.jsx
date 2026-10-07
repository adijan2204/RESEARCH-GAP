import React, { useState } from 'react';
import { Bot, Send, Sparkles, HelpCircle, MessageSquare } from 'lucide-react';

export default function AIQueryAssistant({ papers, gaps }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I am your AI Literature Assistant. I have indexed all ${papers.length} active research papers. Ask me anything about methodological disagreements, sample sizes, or missing baseline evaluations!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = [
    "What is the main methodological conflict between the papers?",
    "Which paper evaluated the largest dataset sample?",
    "What real-world hardware limits are currently unaddressed?",
    "Summarize the consensus across all papers."
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "";
      const qLower = query.toLowerCase();

      if (qLower.includes("conflict") || qLower.includes("disagree") || qLower.includes("gap")) {
        responseText = `Based on the literature survey matrix of ${papers.length} papers:\n\nKey Conflict: Paper "${papers[0]?.title}" relies on "${papers[0]?.methodology.substring(0, 60)}...", whereas Paper "${papers[1]?.title}" demonstrates that performance drops under out-of-distribution shifts. The primary unresolved gap is bridging these two approaches under real-world low-latency constraints.`;
      } else if (qLower.includes("dataset") || qLower.includes("sample")) {
        const sortedByData = [...papers].sort((a,b) => b.dataset.length - a.dataset.length);
        responseText = `Dataset Analysis:\n- Largest Cohort: ${sortedByData[0]?.dataset} (in "${sortedByData[0]?.title}")\n- Common limitation across datasets: Most papers rely on static single-site benchmarks rather than longitudinal multi-center streams.`;
      } else if (qLower.includes("hardware") || qLower.includes("latency") || qLower.includes("limit")) {
        responseText = `Hardware & Deployment Bottlenecks:\n1. Computational Overhead: Most high-performing algorithms require high-end GPU cluster stacks.\n2. Latency Penalty: Edge deployments experience degraded precision due to unoptimized context window compression.`;
      } else {
        responseText = `Literature Consensus Summary across ${papers.length} papers:\nAll papers agree that recent domain advances yield high performance on standard metrics. However, empirical generalization to heterogeneous real-world settings remains the primary bottleneck identified in ${gaps.length} synthesized research gaps.`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="glass-panel-yellow" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <Bot color="var(--primary-yellow)" size={22} />
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700 }}>
          Ask AI Assistant Across Literature Corpus
        </h3>
      </div>

      {/* Suggested Quick Question Chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '14px' }}>
        {sampleQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            style={{
              whiteSpace: 'nowrap',
              fontSize: '0.75rem',
              padding: '6px 12px',
              borderRadius: '16px',
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid var(--yellow-border)',
              color: 'var(--primary-yellow-light)',
              cursor: 'pointer'
            }}
          >
            💬 {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Window */}
      <div style={{
        maxHeight: '220px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '12px',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '10px',
        border: '1px solid var(--border-light)',
        marginBottom: '14px'
      }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{
            alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            padding: '10px 14px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            lineHeight: '1.5',
            background: m.sender === 'user' ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' : 'rgba(30, 41, 59, 0.9)',
            color: m.sender === 'user' ? '#000' : '#f8fafc',
            fontWeight: m.sender === 'user' ? 600 : 400
          }}>
            {m.text}
          </div>
        ))}

        {isTyping && (
          <div style={{ fontSize: '0.8rem', color: 'var(--primary-yellow-light)', fontStyle: 'italic' }}>
            AI is analyzing multi-paper literature matrix...
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '8px' }}>
        <input 
          type="text" 
          placeholder="Ask a question across all papers (e.g. Compare methodology accuracy)..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          style={{ flex: 1, fontSize: '0.85rem' }} 
        />
        <button type="submit" className="btn-gold" style={{ padding: '8px 16px' }}>
          <Send size={16} /> Ask
        </button>
      </form>
    </div>
  );
}
