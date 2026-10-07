// Pre-loaded realistic domain datasets for Research Gap Finder & Literature Survey

export const SAMPLE_DATASETS = [
  {
    id: 'ai-healthcare',
    title: 'AI in Medical Diagnostics & Clinical Multimodal LLMs',
    field: 'Computer Science & Healthcare',
    description: '5 high-impact papers investigating vision transformers, federated learning, and multimodal EHR integration in disease detection.',
    papers: [
      {
        id: 'p1',
        title: 'Multimodal Vision Transformers for Early Oncology Detection in Dense Mammography',
        authors: 'Chen, L., Vasquez, R., & Patel, K.',
        year: 2024,
        journal: 'IEEE Transactions on Medical Imaging',
        citations: 142,
        methodology: '3D Swin-Transformer with Cross-Attention Fusion on 100k Mammograms',
        dataset: 'Brest-AI-100K (Single-site Academic Hospital)',
        metrics: 'AUC-ROC: 0.942, Sensitivity: 91.4%, Specificity: 88.7%',
        limitations: 'Evaluated exclusively on single-vendor imaging hardware; degraded performance on dense tissue classes by 14%. High computational overhead (8x A100 GPUs).',
        assumptions: 'Assumes uniform image pre-processing and zero patient motion artifacts during 3D scan.',
        keyFindings: 'Cross-attention between visual feature maps and clinical risk metadata improves early detection by 6.8%.',
        futureDirections: 'Multi-institutional validation across diverse scanner hardware and lighter deployment models.'
      },
      {
        id: 'p2',
        title: 'Privacy-Preserving Federated Learning for Distributed EHR Diagnostic Reasoning',
        authors: 'Okoro, E., Miller, S., & Zhang, W.',
        year: 2023,
        journal: 'Nature Digital Medicine',
        citations: 289,
        methodology: 'Differential Privacy (ε=1.5, δ=1e-5) with Federated Averaging across 12 clinical nodes',
        dataset: 'MIMIC-IV & eICU Collaborative Research Database (N=48,000)',
        metrics: 'F1-Score: 0.865, Privacy Leakage Rate: < 0.01%',
        limitations: 'Significant accuracy drop (9.2%) under non-IID (heterogeneous) patient demographic distributions across rural vs urban nodes.',
        assumptions: 'Assumes all participating hospital servers have synchronous network bandwidth and standardized HL7 FHIR formats.',
        keyFindings: 'Differential privacy guarantees can be preserved without catastrophic model degradation if noise injection is adaptive.',
        futureDirections: 'Asynchronous updates for low-bandwidth rural clinical centers.'
      },
      {
        id: 'p3',
        title: 'Zero-Shot Clinical Reasoning with 70B Multimodal LLMs: Benchmarks & Failures',
        authors: 'Gomez-Perez, M., & Thorne, H.',
        year: 2025,
        journal: 'Lancet Digital Health',
        citations: 95,
        methodology: 'Chain-of-Thought prompting on Llama-3-70B fine-tuned on PubMed central open access',
        dataset: 'MedQA & PubMedQA Benchmark Suite (12,500 clinical cases)',
        metrics: 'Accuracy: 81.3%, Hallucination Frequency: 11.2%',
        limitations: 'Generates plausible-sounding but clinically dangerous drug interaction recommendations in rare comorbid conditions (11.2% hallucination rate).',
        assumptions: 'Assumes test queries conform to standardized USMLE exam formatting.',
        keyFindings: 'Model demonstrates high diagnostic accuracy for textbook conditions but struggles with rare disease co-manifestations.',
        futureDirections: 'Retrieval-Augmented Generation (RAG) backed by live FDA drug interaction databases.'
      },
      {
        id: 'p4',
        title: 'Longitudinal Patient Trajectory Prediction via Graph Neural Temporal Networks',
        authors: 'Al-Hassan, Y., Gupta, A., & O\'Connor, E.',
        year: 2024,
        journal: 'Journal of Biomedical Informatics',
        citations: 118,
        methodology: 'Temporal Graph Convolutional Networks (T-GCN) with attention-weighted edge transitions',
        dataset: 'UK Biobank EHR Cohort (N=15,000 longitudinal subjects, 10-year period)',
        metrics: 'Precision@K=5: 0.792, MAE for Readmission Prediction: 4.2 days',
        limitations: 'Struggles with missing temporal timestamps in sparse outpatient records; requires dense multi-year visit history.',
        assumptions: 'Assumes clinical disease progression is Markovian across 6-month epoch windows.',
        keyFindings: 'Graph edge embeddings capture hidden comorbidity cascades prior to symptomatic diagnosis.',
        futureDirections: 'Handling highly irregular, asynchronous temporal clinical telemetry data.'
      },
      {
        id: 'p5',
        title: 'Explainable AI in Clinical Radiology: Radiologist Trust & Diagnostic Drift',
        authors: 'Kim, H., Schmidt, U., & Rossi, G.',
        year: 2023,
        journal: 'Artificial Intelligence in Medicine',
        citations: 310,
        methodology: 'Human-in-the-loop RCT with 45 Board-Certified Radiologists using Grad-CAM heatmaps',
        dataset: 'Radiology Trust Assessment Protocol (N=450 case reviews)',
        metrics: 'Diagnostic speedup: +18%, Automation Bias Rate: 23.4%',
        limitations: 'Radiologists frequently over-relied on misleading saliency maps in atypical presentations (automation bias).',
        assumptions: 'Assumes visual heatmaps directly translate to causal diagnostic intent.',
        keyFindings: 'Visual explanation heatmaps increase user confidence but do not prevent diagnostic misinterpretation when confidence scores are uncalibrated.',
        futureDirections: 'Uncertainty-aware natural language explanations rather than crude pixel heatmaps.'
      }
    ],
    synthesizedGaps: [
      {
        id: 'gap-1',
        title: 'Non-IID Cross-Institutional Generalization & Hardware Bias',
        category: 'Methodological & Generalization Gap',
        severity: 'Critical',
        impactScore: 94,
        affectedPapers: ['p1', 'p2'],
        description: 'Existing vision transformers (P1) are validated on single-vendor hardware while federated models (P2) experience a 9.2% accuracy drop under non-IID demographic distributions. There is a lack of unified domain-adaptation frameworks that handle both hardware vendor bias and demographic variation concurrently.',
        suggestedResearch: 'Develop hardware-agnostic domain adaptation layers combined with heterogeneous federated learning protocols for cross-scanner mammography.'
      },
      {
        id: 'gap-2',
        title: 'Uncalibrated Clinical Trust & Rare Comorbidity Hallucinations',
        category: 'Safety & Human-AI Interaction Gap',
        severity: 'Critical',
        impactScore: 91,
        affectedPapers: ['p3', 'p5'],
        description: 'Multimodal LLMs (P3) hallucinate dangerous prescriptions in 11.2% of complex cases, while explainability studies (P5) reveal that radiologists exhibit automation bias when viewing uncalibrated AI outputs. No current framework integrates uncertainty quantification directly into clinician workflow UI.',
        suggestedResearch: 'Design Conformal Prediction uncertainty bounds coupled with live FDA RAG grounding to suppress clinical hallucinations and measure clinician reliance.'
      },
      {
        id: 'gap-3',
        title: 'Handling Sparse Asynchronous Telemetry in Longitudinal Graph Predictions',
        category: 'Empirical & Data Structure Gap',
        severity: 'Moderate',
        impactScore: 82,
        affectedPapers: ['p4', 'p2'],
        description: 'Temporal GCNs (P4) require dense longitudinal visits, making them unsuited for real-world fragmented EHRs across outpatient clinics. Privacy protocols (P2) further hinder cross-clinic data imputation.',
        suggestedResearch: 'Formulate Continuous-Time Neural Ordinary Differential Equations (Neural ODEs) over federated privacy-preserved graph topologies.'
      }
    ]
  },
  {
    id: 'battery-tech',
    title: 'Solid-State Lithium Batteries & Thermal Safety',
    field: 'Materials Science & Energy Storage',
    description: 'Key research papers addressing interfacial impedance, dendrite suppression, and commercial manufacturing limits.',
    papers: [
      {
        id: 'p10',
        title: 'In-Situ Operando Characterization of Lithium Dendrite Nucleation in Solid Garnet Electrolytes',
        authors: 'Takahashi, M., Weber, J., & Li, X.',
        year: 2024,
        journal: 'Nature Energy',
        citations: 215,
        methodology: 'Synchrotron X-ray computed tomography during 5C fast charging at ambient temperatures',
        dataset: 'LLZO Garnet Solid Electrolyte Micro-pellets (N=80 samples)',
        metrics: 'Critical Current Density (CCD): 3.2 mA/cm² at 60°C',
        limitations: 'Tests conducted under unphysically high stack pressures (5 MPa), which is non-scalable for automotive battery packs.',
        assumptions: 'Assumes planar electrolyte interfaces without grain boundary defects.',
        keyFindings: 'Dendrite propagation occurs along grain boundaries even in high shear modulus ceramics when current density exceeds threshold.',
        futureDirections: 'Engineered single-crystal solid electrolytes to eliminate grain boundaries.'
      },
      {
        id: 'p11',
        title: 'Self-Healing Polymer Composite Interlayers for Low-Pressure Solid-State Batteries',
        authors: 'Dubois, A., Sterling, K., & Park, J.',
        year: 2023,
        journal: 'Advanced Energy Materials',
        citations: 180,
        methodology: 'Dynamic covalent disulfide chemistry in composite poly(ethylene oxide) matrix',
        dataset: 'Lithium symmetric cells operated at 0.1 MPa stack pressure',
        metrics: 'Capacity retention: 89.2% after 500 cycles at 1C',
        limitations: 'Severely limited ionic conductivity at room temperature (< 25°C), requiring external heating to 55°C.',
        assumptions: 'Assumes stable interfacial contact across operating temperature swings.',
        keyFindings: 'Elastic self-healing polymers prevent mechanical void formation at the anode interface.',
        futureDirections: 'Room-temperature ionic liquid plasticizers with high electrochemical stability windows.'
      },
      {
        id: 'p12',
        title: 'Ultrafast Thermal Runaway Kinetics in Commercial-Scale Solid-State Cells',
        authors: 'Bauer, F., & Robinson, C.',
        year: 2025,
        journal: 'ACS Energy Letters',
        citations: 76,
        methodology: 'Accelerating Rate Calorimetry (ARC) and Gas Chromatography Mass Spectrometry (GC-MS)',
        dataset: 'Ah-scale pouch solid-state cells with NMC-811 cathodes',
        metrics: 'Peak thermal runaway temperature: 740°C, Off-gas velocity: 12 L/Ah',
        limitations: 'Lack of operando temperature spatial mapping inside multi-layer stack cells during internal shorting.',
        assumptions: 'Assumes uniform heat dispersion across solid electrolyte separator layer.',
        keyFindings: 'Solid-state batteries produce toxic flammable gas species upon mechanical penetration despite eliminating liquid solvents.',
        futureDirections: 'In-situ thermal barrier coatings and non-toxic gas absorbents.'
      },
      {
        id: 'p13',
        title: 'Roll-to-Roll Dry Electrode Processing for Ceramic-Polymer Hybrid Solid Electrolytes',
        authors: 'Nakamura, S., & Miller, H.',
        year: 2024,
        journal: 'Journal of Power Sources',
        citations: 134,
        methodology: 'FEP binder dry powder jetting and thermal calendering',
        dataset: '100m continuous R2R pilot manufacturing trial',
        metrics: 'Electrolyte thickness: 18 μm, Production speed: 12 m/min',
        limitations: 'High pinhole defect rate (4.2%) in thin-film coatings under high-speed R2R speeds.',
        assumptions: 'Assumes uniform shear stress distribution during dry calendering stage.',
        keyFindings: 'Dry electrode processing reduces solvent recovery energy consumption by 78%.',
        futureDirections: 'Real-time optical inline defect detection and automated micro-repair nozzles.'
      }
    ],
    synthesizedGaps: [
      {
        id: 'gap-10',
        title: 'High Stack Pressure Dependency vs Room-Temperature Conductivity Paradox',
        category: 'Methodological & Practical Trade-off Gap',
        severity: 'Critical',
        impactScore: 96,
        affectedPapers: ['p10', 'p11'],
        description: 'Ceramic electrolytes (P10) deliver high current densities but demand unviable commercial stack pressure (5 MPa). Polymer interlayers (P11) solve pressure demands but fail at room temperature (<25°C). A major gap exists in room-temperature low-pressure hybrid solid electrolyte interfaces.',
        suggestedResearch: 'Formulate ionic liquid-grafted MOF ceramic nanocomposites that maintain 10^-3 S/cm conductivity at 20°C under 0.2 MPa stack pressure.'
      },
      {
        id: 'gap-11',
        title: 'Operando Thermal Runaway Dynamics in Roll-to-Roll Scale Cells',
        category: 'Empirical & Safety Gap',
        severity: 'Moderate',
        impactScore: 88,
        affectedPapers: ['p12', 'p13'],
        description: 'Thermal safety studies (P12) highlight toxic off-gassing, but fail to account for manufacturing micro-defects identified in pilot roll-to-roll production (P13).',
        suggestedResearch: 'Integrate fiber-optic Bragg grating sensors into dry-processed multi-layer solid-state battery pouch cells during R2R assembly.'
      }
    ]
  },
  {
    id: 'rag-llm',
    title: 'Graph-RAG & Context Hallucination Suppression in LLMs',
    field: 'Natural Language Processing & AI Architectures',
    description: 'Cutting-edge NLP papers addressing long-context retrieval, dense graph alignment, and self-corrective RAG engines.',
    papers: [
      {
        id: 'p20',
        title: 'GraphRAG: Knowledge Graph-Augmented Generation for Complex Multi-Hop Reasoning',
        authors: 'Edge, D., Trinh, H., & Cheng, X.',
        year: 2024,
        journal: 'ACL 2024 (Main Conference)',
        citations: 420,
        methodology: 'Hierarchical Community Detection (Leiden algorithm) + LLM Summarization over Entity-Relation Graphs',
        dataset: 'HotpotQA, MuSiQue, and Enterprise Knowledge Repositories (10M tokens)',
        metrics: 'Multi-hop accuracy: +28% vs Naive Vector RAG, Retrieval latency: 1.8s',
        limitations: 'Prohibitive index construction cost ($45 per 1M tokens) and slow query-time graph traversal.',
        assumptions: 'Assumes domain corpus contains explicit named entities with high relational density.',
        keyFindings: 'Entity-relationship graph structures synthesize global corpus summaries significantly better than chunk-based vector search.',
        futureDirections: 'Incremental real-time knowledge graph updates without full re-indexing.'
      },
      {
        id: 'p21',
        title: 'Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection Tokens',
        authors: 'Asai, A., Sewon, M., & Hajishirzi, H.',
        year: 2024,
        journal: 'ICLR 2024 (Oral)',
        citations: 680,
        methodology: 'Fine-tuning Llama-2 with special control tokens [Retrieve], [IsRel], [IsSup], [IsUse]',
        dataset: 'PopQA, TriviaQA, and ALCE Benchmarks',
        metrics: 'Factuality score: 87.4%, Context compression ratio: 4:1',
        limitations: 'High inference latency (2.4x slowdown) due to repeated reflection token decoding passes.',
        assumptions: 'Assumes critique tokens accurately correlate with ground-truth hallucination probability.',
        keyFindings: 'Adaptive retrieval triggered only when needed dramatically outperforms constant chunk retrieval.',
        futureDirections: 'Speculative decoding strategies for critique token acceleration.'
      },
      {
        id: 'p22',
        title: 'Lost in the Middle: How Language Models Use Long Context Windows',
        authors: 'Liu, N. F., Lin, K., & Hewitt, J.',
        year: 2024,
        journal: 'Transactions of the ACL',
        citations: 920,
        methodology: 'Synthetic needle-in-a-haystack analysis across 16k to 128k context windows',
        dataset: 'Multi-document QA with controlled information placement',
        metrics: 'Middle context retrieval degradation: up to 42% drop in accuracy',
        limitations: 'Tested primarily on single-turn extraction queries; multi-turn reasoning dynamics were unexamined.',
        assumptions: 'Assumes attention weight attenuation directly explains middle-context retrieval failure.',
        keyFindings: 'LLM performance is highest when relevant information is at the very beginning or end of input prompt.',
        futureDirections: 'Position-aware context re-ordering and semantic dynamic attention scaling.'
      },
      {
        id: 'p23',
        title: 'Sub-Vector Semantic Quantization for Low-Latency 1M Chunk Vector Search',
        authors: 'Srivastava, P., & Andersen, M.',
        year: 2025,
        journal: 'EMNLP 2025',
        citations: 88,
        methodology: 'Product Quantization with Anisotropic Loss Optimization (PQ-ALO)',
        dataset: 'MS-MARCO & BioASQ (10 Million Vector Embeddings)',
        metrics: 'Query Latency: 1.2ms (10x faster), Memory reduction: 8x',
        limitations: 'Precision drop of 5.4% on fine-grained technical/legal terminology queries.',
        assumptions: 'Assumes embedding space is isotropic in quantized subspaces.',
        keyFindings: 'Anisotropic quantization preserves vector dot-product ranking while compressing 768-dim embeddings to 32 bytes.',
        futureDirections: 'Domain-adaptive codebook training for specialized medical/legal embedding spaces.'
      }
    ],
    synthesizedGaps: [
      {
        id: 'gap-20',
        title: 'High Latency & High Cost of Knowledge Graph RAG vs Quantized Vector Search',
        category: 'Architectural & Efficiency Trade-off Gap',
        severity: 'Critical',
        impactScore: 95,
        affectedPapers: ['p20', 'p23', 'p21'],
        description: 'GraphRAG (P20) delivers high multi-hop reasoning but suffers from $45/1M token indexing costs and high latency, while sub-vector quantization (P23) achieves 1.2ms search at the expense of fine-grained entity relationship precision. Self-RAG (P21) adds another 2.4x latency penalty. There is no hybrid architecture bridging low-latency quantized vectors with light graph topology.',
        suggestedResearch: 'Propose Quantized Dynamic Subgraph Indexing (QD-RAG) using sparse topological embeddings for sub-10ms multi-hop reasoning.'
      },
      {
        id: 'gap-21',
        title: 'Middle Context Degradation in Graph-Extracted Document Prompts',
        category: 'Empirical Context Attention Gap',
        severity: 'Moderate',
        impactScore: 89,
        affectedPapers: ['p22', 'p20'],
        description: 'While GraphRAG (P20) feeds community summaries into context, "Lost in the Middle" (P22) proves models drop up to 42% of facts placed in the middle of long contexts. Graph-RAG prompts currently lack context-position optimization.',
        suggestedResearch: 'Formulate U-Shaped Graph Summary Prompting (USGP) that dynamically sorts graph triples based on attention sensitivity curves.'
      }
    ]
  }
];

export const RESEARCH_GAP_TAXONOMY = [
  {
    key: 'methodological',
    name: 'Methodological Gap',
    icon: 'Wrench',
    color: '#F59E0B',
    description: 'A conflict or limitation in research design, algorithm scalability, validation protocols, or measurement tools.'
  },
  {
    key: 'empirical',
    name: 'Empirical & Data Gap',
    icon: 'Database',
    color: '#3B82F6',
    description: 'Missing empirical evidence, unexamined dataset distributions, small sample size, or lack of longitudinal real-world data.'
  },
  {
    key: 'theoretical',
    name: 'Theoretical & Conceptual Gap',
    icon: 'BookOpen',
    color: '#8B5CF6',
    description: 'Untested underlying hypotheses, conflicting theoretical paradigms, or missing conceptual frameworks bridging disciplines.'
  },
  {
    key: 'population',
    name: 'Population & Geographic Gap',
    icon: 'Users',
    color: '#10B981',
    description: 'Research conducted on narrow demographics, single geographic regions, or non-representative cohorts.'
  },
  {
    key: 'practical',
    name: 'Practical & Implementation Gap',
    icon: 'Cpu',
    color: '#EC4899',
    description: 'High computational cost, non-scalable manufacturing limits, or high latency preventing real-world deployment.'
  }
];
