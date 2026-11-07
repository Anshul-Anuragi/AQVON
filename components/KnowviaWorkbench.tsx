"use client";

import React, { useState } from "react";
import {
  Search,
  Database,
  Binary,
  Layers,
  Cpu,
  Workflow,
  GitMerge,
  Filter,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  FileText,
  Zap,
  Code,
  Sliders,
  ShieldCheck,
  Lock,
} from "lucide-react";

interface SourceItem {
  id: string;
  name: string;
  page: string;
  size: string;
  verified: boolean;
  tag: string;
}

interface ComponentRow {
  name: string;
  description: string;
  icon: React.ElementType;
}

interface BenefitCard {
  title: string;
  subtitle: string;
}

interface ExtractedSpan {
  sourceId: string;
  sourceDoc: string;
  page: string;
  beforeHighlight: string;
  highlight1: string;
  middleText: string;
  highlight2: string;
  afterHighlight: string;
}

interface ScenarioData {
  id: string;
  tagNumber: string;
  query: string;
  rawQuery?: string;
  rewrittenQuery?: string;
  filterSpec?: string;
  model: string;
  mode: string;
  sourcesCountText: string;
  confidence: string;
  latency: string;
  sources: SourceItem[];
  components: ComponentRow[];
  benefits: BenefitCard[];
  summary: string;
  extractedSpans: ExtractedSpan[];
  requestPayload: object;
  responsePayload: object;
}

const SCENARIOS: ScenarioData[] = [
  {
    id: "01",
    tagNumber: "01",
    query: "Explain enterprise RAG with key components and benefits",
    model: "Google Gemini",
    mode: "RAG (Document Search)",
    sourcesCountText: "2 sources found",
    confidence: "99.4% Precision",
    latency: "38ms",
    sources: [
      {
        id: "s1",
        name: "Qs in hinglish.pdf",
        page: "Page 3",
        size: "2.4 KB",
        verified: true,
        tag: "PDF_INGEST",
      },
      {
        id: "s2",
        name: "DX_GATE2027_Syllabus.pdf",
        page: "Page 12",
        size: "1.5 MB",
        verified: true,
        tag: "CURRICULUM_V2",
      },
    ],
    components: [
      {
        name: "Data Ingestion (PyPDF)",
        description:
          "Enterprise documents and PDFs parsed via PyPDF with exact page-level bounding metadata.",
        icon: Database,
      },
      {
        name: "Embedding (BAAI/bge-small-en-v1.5)",
        description:
          "Dense 384-dimensional vectorization via Sentence Transformers & PyTorch for semantic retrieval.",
        icon: Binary,
      },
      {
        name: "Vector DB (Pinecone Serverless)",
        description:
          "Stores embeddings with metadata namespaces and tenant/user ownership filtering.",
        icon: Layers,
      },
      {
        name: "Relational DB (Neon PostgreSQL)",
        description:
          "Neon Serverless PostgreSQL with SQLAlchemy ORM and Alembic migrations for users, docs, and chat sessions.",
        icon: Search,
      },
      {
        name: "LLM (Google Gemini)",
        description:
          "google-generativeai engine with conversational context rewriting and deterministic synthesis.",
        icon: Cpu,
      },
      {
        name: "FastAPI Backend & Security",
        description:
          "FastAPI async runtime, JWT Bearer auth (python-jose), bcrypt hashing, and strict document ACL checks.",
        icon: Workflow,
      },
    ],
    benefits: [
      {
        title: "Higher Accuracy",
        subtitle: "Grounded responses from your own data",
      },
      {
        title: "Up-to-date Information",
        subtitle: "Always reflects latest indexed enterprise docs",
      },
      {
        title: "Data Privacy & Security",
        subtitle: "JWT auth, tenant namespaces & Neon PG ACLs",
      },
      {
        title: "Sub-40ms Productivity",
        subtitle: "Async FastAPI + Pinecone Serverless latency",
      },
    ],
    summary:
      "Enterprise Retrieval-Augmented Generation (RAG) grounds machine intelligence in proprietary enterprise data. By combining BAAI/bge-small-en-v1.5 dense vectorization with Pinecone metadata filtering and Google Gemini context synthesis, it provides deterministic answers with span-level citations, eliminating hallucinations while guaranteeing tenant-isolated access control.",
    extractedSpans: [
      {
        sourceId: "s1",
        sourceDoc: "Qs in hinglish.pdf",
        page: "Page 3",
        beforeHighlight: "Knowvia's multi-layered retrieval engine establishes ",
        highlight1: "deterministic span-level attribution",
        middleText:
          " by anchoring every generated token directly to verifiable passages in ",
        highlight2: "enterprise-isolated vector chunks",
        afterHighlight:
          ", eliminating stochastic hallucination drift across internal enterprise knowledge bases.",
      },
      {
        sourceId: "s2",
        sourceDoc: "DX_GATE2027_Syllabus.pdf",
        page: "Page 12",
        beforeHighlight:
          "Enterprise RAG architectures require strict separation of concerns: ",
        highlight1: "asynchronous orchestration pipelines",
        middleText:
          " must isolate retrieval and generation phases while enforcing ",
        highlight2: "document-level RBAC filters",
        afterHighlight:
          " prior to LLM synthesis to prevent unauthorized privilege escalation.",
      },
    ],
    requestPayload: {
      conversation_id: "conv-8f92a",
      question: "Explain enterprise RAG with key components and benefits",
      selected_documents: ["doc-hinglish-03", "doc-gate2027-12"],
      retrieval_config: {
        embedding_model: "BAAI/bge-small-en-v1.5",
        vector_db: "pinecone",
        relational_db: "neon_postgresql",
        llm_engine: "google-generativeai",
        strict_span_grounding: true,
        max_tokens: 1024,
        temperature: 0.0,
      },
    },
    responsePayload: {
      status: "grounded",
      latency_ms: 38.4,
      confidence_score: 0.994,
      answer_spans: [
        {
          span_id: "spn_88291",
          doc_id: "doc-hinglish-03",
          page: 3,
          char_start: 48,
          char_end: 85,
          text: "deterministic span-level attribution",
          verified_confidence: 0.998,
        },
        {
          span_id: "spn_88292",
          doc_id: "doc-hinglish-03",
          page: 3,
          char_start: 142,
          char_end: 178,
          text: "enterprise-isolated vector chunks",
          verified_confidence: 0.991,
        },
      ],
      grounded_metrics: {
        precision: 0.994,
        latency_ms: 38,
        zero_drift: true,
        isolation: "TENANT_PINECONE_NEON",
      },
    },
  },
  {
    id: "02",
    tagNumber: "02",
    query: "What about carry-forward rules?",
    rawQuery: "What about carry-forward rules?",
    rewrittenQuery: "What are the annual leave carry-forward rules and limits in HR policy?",
    filterSpec: '{"user_id": "usr_9f82", "document_id": "doc-leave-01"}',
    model: "Google Gemini",
    mode: "Conversational RAG & Query Rewriting",
    sourcesCountText: "1 source found",
    confidence: "99.2% Precision",
    latency: "31ms",
    sources: [
      {
        id: "s1",
        name: "Enterprise_HR_Policy_2026.pdf",
        page: "Page 8 · Section 3.4",
        size: "1.2 MB",
        verified: true,
        tag: "HR_POLICY",
      },
    ],
    components: [
      {
        name: "Conversational Query Rewriting",
        description:
          "Google Gemini rewrites ambiguous conversational follow-ups into standalone semantic search queries using previous chat turns.",
        icon: Sparkles,
      },
      {
        name: "BAAI/bge-small-en-v1.5 Embedding",
        description:
          "Sentence Transformers encodes the rewritten query into 384-dimensional dense vectors for vector retrieval.",
        icon: Binary,
      },
      {
        name: "Pinecone Filtered Retrieval",
        description:
          "Hits Pinecone index with strict metadata filter: user_id='usr_9f82' and document_id='doc-leave-01'.",
        icon: Filter,
      },
      {
        name: "Neon PostgreSQL State Store",
        description:
          "Stores message history, JWT authenticated session states, and document ACLs via SQLAlchemy ORM.",
        icon: Database,
      },
      {
        name: "Google Gemini Generation",
        description:
          "Generates grounded response clamped strictly to page 8 of HR Policy with exact line-by-line span citations.",
        icon: Cpu,
      },
    ],
    benefits: [
      {
        title: "Multi-Turn Precision",
        subtitle: "Gemini eliminates ambiguous pronoun & context drift",
      },
      {
        title: "Tenant Ownership",
        subtitle: "Pinecone metadata filter guarantees zero data crossover",
      },
      {
        title: "Fast Execution",
        subtitle: "Sub-35ms end-to-end rewrite and retrieval loop",
      },
      {
        title: "Exact Page Bounding",
        subtitle: "PyPDF metadata guarantees verified page attribution",
      },
    ],
    summary:
      "Under Section 3.4 of the Enterprise HR Policy, employees may carry forward a maximum of 8 unused annual leave days into the subsequent calendar year, provided all carry-forward requests are utilized before the March 31st deadline.",
    extractedSpans: [
      {
        sourceId: "s1",
        sourceDoc: "Enterprise_HR_Policy_2026.pdf",
        page: "Page 8 · Section 3.4",
        beforeHighlight:
          "Annual leave entitlement guidelines state that employees can carry forward a ",
        highlight1: "maximum of 8 unused annual leave days into the next calendar year",
        middleText:
          ", provided all carry-forward requests are submitted and ",
        highlight2: "utilized prior to March 31st expiration cutoff",
        afterHighlight:
          ", at which point unutilized balances will lapse automatically.",
      },
    ],
    requestPayload: {
      conversation_id: "conv-3a19b",
      raw_query: "What about carry-forward rules?",
      rewritten_query: "What are the annual leave carry-forward rules and limits in HR policy?",
      selected_documents: ["doc-leave-01"],
      retrieval_config: {
        embedding_model: "BAAI/bge-small-en-v1.5",
        vector_db: "pinecone",
        relational_db: "neon_postgresql",
        llm_engine: "google-generativeai",
        filter: {
          user_id: "usr_9f82",
          document_id: "doc-leave-01",
        },
        strict_span_grounding: true,
        max_tokens: 512,
      },
    },
    responsePayload: {
      status: "grounded",
      latency_ms: 31.2,
      confidence_score: 0.992,
      query_rewriting: {
        raw_input: "What about carry-forward rules?",
        rewritten: "What are the annual leave carry-forward rules and limits in HR policy?",
        engine: "google-generativeai (gemini)",
      },
      pinecone_query: {
        namespace: "tenant_usr_9f82",
        filter: {
          user_id: "usr_9f82",
          document_id: "doc-leave-01",
        },
        top_k: 5,
      },
      answer_spans: [
        {
          span_id: "spn_7718",
          doc_id: "doc-leave-01",
          page: 8,
          char_start: 112,
          char_end: 182,
          text: "maximum of 8 unused annual leave days into the next calendar year",
          verified_confidence: 0.995,
        },
        {
          span_id: "spn_7719",
          doc_id: "doc-leave-01",
          page: 8,
          char_start: 228,
          char_end: 275,
          text: "utilized prior to March 31st expiration cutoff",
          verified_confidence: 0.991,
        },
      ],
      grounded_metrics: {
        precision: 0.992,
        latency_ms: 31,
        zero_drift: true,
        isolation: "TENANT_PINECONE_NEON",
      },
    },
  },
  {
    id: "03",
    tagNumber: "03",
    query:
      "How does BAAI/bge-small-en-v1.5 with Pinecone metadata filtering eliminate hallucinations?",
    model: "Google Gemini",
    mode: "Architecture Deep-Dive",
    sourcesCountText: "2 sources found",
    confidence: "98.8% Confidence",
    latency: "36ms",
    sources: [
      {
        id: "s1",
        name: "AQVON_Retrieval_Spec.pdf",
        page: "Page 7",
        size: "820 KB",
        verified: true,
        tag: "RESEARCH",
      },
      {
        id: "s2",
        name: "FastAPI_Neon_Pipeline.md",
        page: "Section 3",
        size: "410 KB",
        verified: true,
        tag: "BACKEND_SPEC",
      },
    ],
    components: [
      {
        name: "BAAI/bge-small-en-v1.5 Vectorization",
        description:
          "Sentence Transformers encodes extracted PyPDF chunks into 384-dimensional dense vectors with normalized dot-product metrics.",
        icon: Binary,
      },
      {
        name: "Pinecone Namespaced Metadata Filtering",
        description:
          "Enforces tenant, user, and document ownership filters at the index level, preventing cross-tenant information disclosure.",
        icon: GitMerge,
      },
      {
        name: "Neon PostgreSQL ACL Validation",
        description:
          "Validates JWT Bearer claims against Neon Serverless PostgreSQL relations before vector queries execute.",
        icon: Filter,
      },
      {
        name: "Gemini Span Verification & Bounding",
        description:
          "Maps generated response tokens directly to source PyPDF page-level byte offsets, failing requests if ungrounded.",
        icon: CheckCircle2,
      },
    ],
    benefits: [
      {
        title: "Zero Hallucination",
        subtitle: "Deterministic span verification rejects ungrounded claims",
      },
      {
        title: "Metadata Filtering",
        subtitle: "Pinecone user_id and doc_id filters prevent data leaks",
      },
      {
        title: "Sub-40ms P95",
        subtitle: "BAAI/bge-small embeddings provide ultra-fast vector math",
      },
      {
        title: "Relational Audit",
        subtitle: "Neon PostgreSQL tracks every query and retrieval trace",
      },
    ],
    summary:
      "Knowvia eliminates hallucinations through an end-to-end verified pipeline: PyPDF extracts document chunks with exact page bounding, BAAI/bge-small-en-v1.5 generates 384-dim dense vectors, Pinecone executes metadata-filtered similarity queries, and Google Gemini synthesizes answers with strict line-by-line span attribution.",
    extractedSpans: [
      {
        sourceId: "s1",
        sourceDoc: "AQVON_Retrieval_Spec.pdf",
        page: "Page 7",
        beforeHighlight:
          "Hallucination elimination is achieved by coupling ",
        highlight1: "BAAI/bge-small-en-v1.5 embeddings with Pinecone metadata filtering",
        middleText: " to enforce tenant-isolated candidate retrieval into the ",
        highlight2: "Gemini line-by-line span verification generator",
        afterHighlight:
          ", ensuring no ungrounded semantic drift bypasses the validation gate.",
      },
      {
        sourceId: "s2",
        sourceDoc: "FastAPI_Neon_Pipeline.md",
        page: "Section 3",
        beforeHighlight: "The FastAPI asynchronous handler invokes ",
        highlight1: "token-level span provenance assertions",
        middleText:
          " across all synthesized tokens before responding, guaranteeing that ",
        highlight2: "zero ungrounded generative claims",
        afterHighlight: " reach the client application layer.",
      },
    ],
    requestPayload: {
      conversation_id: "conv-91f0c",
      question:
        "How does BAAI/bge-small-en-v1.5 with Pinecone metadata filtering eliminate hallucinations?",
      selected_documents: ["doc-retrieval-07", "doc-fastapi-03"],
      retrieval_config: {
        embedding_model: "BAAI/bge-small-en-v1.5",
        vector_db: "pinecone",
        relational_db: "neon_postgresql",
        llm_engine: "google-generativeai",
        strict_span_grounding: true,
      },
    },
    responsePayload: {
      status: "grounded",
      latency_ms: 36.2,
      confidence_score: 0.988,
      answer_spans: [
        {
          span_id: "spn_9921",
          doc_id: "doc-retrieval-07",
          page: 7,
          char_start: 54,
          char_end: 118,
          text: "BAAI/bge-small-en-v1.5 embeddings with Pinecone metadata filtering",
          verified_confidence: 0.995,
        },
        {
          span_id: "spn_9922",
          doc_id: "doc-retrieval-07",
          page: 7,
          char_start: 160,
          char_end: 208,
          text: "Gemini line-by-line span verification generator",
          verified_confidence: 0.989,
        },
      ],
      grounded_metrics: {
        precision: 0.988,
        latency_ms: 36,
        zero_drift: true,
        isolation: "TENANT_PINECONE_NEON",
      },
    },
  },
];

export function KnowviaWorkbench() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("01");
  const [viewMode, setViewMode] = useState<"workspace" | "protocol">("workspace");
  const [focusedSourceId, setFocusedSourceId] = useState<string | null>(null);
  const [highlightRightPanel, setHighlightRightPanel] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const scenario =
    SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  const handleCopyText = (text: string, key: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      }
    } catch {
      // fallback
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleFlashContext = () => {
    setHighlightRightPanel(true);
    setTimeout(() => setHighlightRightPanel(false), 1200);
  };

  // Filter extracted spans if user has clicked a specific source card
  const displayedSpans = focusedSourceId
    ? scenario.extractedSpans.filter((s) => s.sourceId === focusedSourceId)
    : scenario.extractedSpans;

  return (
    <section id="knowvia" className="w-full">
      {/* Outer 7XL Frame sitting flush with exposed 1px hairline grid */}
      <div className="max-w-7xl mx-auto border-x border-b border-[var(--border-grid)] bg-[var(--bg-canvas)] transition-colors">
        
        {/* ========================================================= */}
        {/* A. SECTION HEADER STRIP (Blueprint Spec Bar)              */}
        {/* ========================================================= */}
        <div className="border-b border-[var(--border-grid)] bg-[var(--bg-surface)] px-4 sm:px-6 py-2.5 flex flex-wrap justify-between items-center font-mono text-[11px] text-[var(--ink-muted)] gap-2 transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[var(--accent-signal)]" />
            <span className="font-semibold text-[var(--ink-primary)] uppercase tracking-wider">
              {"01 / FLAGSHIP SYSTEM // KNOWVIA ENTERPRISE RAG"}
            </span>
          </div>
          <div className="text-[10px] sm:text-[11px] tracking-wide">
            ENGINE: <span className="text-[var(--ink-primary)] font-medium">FASTAPI ASYNC</span> · INDEX:{" "}
            <span className="text-[var(--ink-primary)] font-medium">PINECONE + NEON PG</span> · EMBEDDING:{" "}
            <span className="text-[var(--accent-signal)] font-medium">BAAI/BGE-SMALL-EN-V1.5</span>
          </div>
        </div>

        {/* Editorial Title Block */}
        <div className="p-6 sm:p-10 lg:p-12 border-b border-[var(--border-grid)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-end bg-[var(--bg-canvas)] transition-colors">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-[var(--accent-signal)] uppercase tracking-widest font-medium">
                FIG_01 · INTERACTIVE WORKSPACE & CITATION SPAN INSPECTOR
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--ink-primary)] tracking-normal leading-[1.15]">
              Every generated claim, anchored to an{" "}
              <span className="italic font-normal text-[var(--accent-editorial)]">auditable character span.</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[var(--ink-body)] mt-3 max-w-3xl leading-relaxed">
              Explore the live Knowvia AI workbench below. Click between real indexed scenarios,
              inspect the structured synthesis, and audit the exact character-level spans highlighted
              in the original PDF documents.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
              ENGINEERING VIEWPORT:
            </span>
            <div className="inline-flex border border-[var(--border-grid)] bg-[var(--bg-canvas)] p-0.5">
              <button
                onClick={() => setViewMode("workspace")}
                className={`px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  viewMode === "workspace"
                    ? "bg-[var(--bg-card)] text-[var(--ink-primary)] border border-[var(--accent-primary)] font-semibold shadow-xs"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                }`}
              >
                [01] WORKSPACE INSPECTOR
              </button>
              <button
                onClick={() => setViewMode("protocol")}
                className={`px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  viewMode === "protocol"
                    ? "bg-[var(--bg-card)] text-[var(--ink-primary)] border border-[var(--accent-primary)] font-semibold shadow-xs"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                }`}
              >
                [02] FASTAPI WIRE PROTOCOL
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* B. INTERACTIVE QUERY & PRESET CONTROL BAR                 */}
        {/* ========================================================= */}
        <div className="bg-[var(--bg-surface)] border-b border-[var(--border-grid)] px-4 sm:px-6 py-4 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[var(--accent-signal)]" strokeWidth={1.5} />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--ink-primary)] font-semibold">
                ACTIVE SCENARIO SELECTOR
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px] text-[var(--ink-muted)]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[var(--accent-emerald)] rounded-full animate-pulse" />
                <span>ACTIVE MODEL: <strong className="text-[var(--ink-primary)]">{scenario.model}</strong></span>
              </div>
              <div className="hidden md:inline">
                LATENCY: <strong className="text-[var(--accent-emerald)]">{scenario.latency}</strong>
              </div>
            </div>
          </div>

          {/* 3 Clickable Scenario Pills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {SCENARIOS.map((sc) => {
              const isActive = sc.id === selectedScenarioId;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    setSelectedScenarioId(sc.id);
                    setFocusedSourceId(null);
                  }}
                  className={`text-left p-3 border transition-all rounded-none flex flex-col justify-between ${
                    isActive
                      ? "bg-[var(--bg-card)] text-[var(--ink-primary)] border-2 border-[var(--accent-primary)] shadow-sm"
                      : "bg-[var(--bg-canvas)] text-[var(--ink-body)] border border-[var(--border-grid)] hover:border-[var(--ink-primary)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`font-mono text-[10px] uppercase px-1.5 py-0.5 border font-semibold ${
                        isActive
                          ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white"
                          : "border-[var(--border-grid)] text-[var(--ink-muted)] bg-[var(--bg-surface)]"
                      }`}
                    >
                      SCENARIO {sc.tagNumber}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-semibold ${
                        isActive ? "text-[var(--accent-emerald)]" : "text-[var(--ink-muted)]"
                      }`}
                    >
                      {sc.confidence}
                    </span>
                  </div>
                  <div className="font-sans text-xs font-medium line-clamp-2">
                    &ldquo;{sc.query}&rdquo;
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* C. MODE 1: THE KNOWVIA 3-PANE DARK WORKBENCH              */}
        {/* ========================================================= */}
        {viewMode === "workspace" ? (
          <div className="bg-[#0B0F19] text-slate-100 font-sans">
            
            {/* Top Workbench Chrome Bar */}
            <div className="border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 bg-[#070A12] font-mono text-xs">
              {/* Left Brand & Mode Badges */}
              <div className="flex items-center flex-wrap gap-2.5">
                <div className="flex items-center gap-2 pr-2 border-r border-slate-800">
                  <div className="w-5 h-5 bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
                    K
                  </div>
                  <span className="font-semibold text-white tracking-wide">
                    Knowvia <span className="text-slate-400 font-normal">{"// Enterprise Intelligence"}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#13192B] text-blue-300 border border-blue-900/60 px-2 py-0.5 text-[10px] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span>{scenario.mode}</span>
                </div>

                <div className="hidden sm:flex items-center gap-1 bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 text-[10px]">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  <span>{scenario.model}</span>
                </div>

                <div className="hidden md:flex items-center gap-1 bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 text-[10px]">
                  <Binary className="w-2.5 h-2.5 text-blue-400" />
                  <span>bge-small-en-v1.5</span>
                </div>
              </div>

              {/* Right Sources & External Link */}
              <div className="flex items-center gap-4 text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5">
                  <FileText className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
                  <span>{scenario.sourcesCountText}</span>
                </div>

                <a
                  href="https://knowvia.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors font-mono"
                >
                  <span>Try Full Workspace</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Current Query Bar / Query Rewriting Inspector */}
            {scenario.rawQuery && scenario.rewrittenQuery ? (
              <div className="px-4 sm:px-6 py-3 bg-[#090D17] border-b border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-semibold">
                      STEP 1: RAW USER FOLLOW-UP
                    </span>
                    <span className="text-slate-300">&ldquo;{scenario.rawQuery}&rdquo;</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Gemini Conversational Context Rewriter</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono bg-[#111827]/80 p-2 border border-blue-900/50">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-semibold">
                      STEP 2: GEMINI REWRITTEN QUERY
                    </span>
                    <span className="text-white font-medium">&ldquo;{scenario.rewrittenQuery}&rdquo;</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                    <span className="text-slate-400">PINECONE FILTER:</span>
                    <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 border border-emerald-800/60">
                      {scenario.filterSpec}
                    </code>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-4 sm:px-6 py-2.5 bg-[#090D17] border-b border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 font-mono text-xs text-slate-300 truncate">
                  <Search className="w-3.5 h-3.5 text-blue-400 shrink-0" strokeWidth={1.5} />
                  <span className="text-slate-500 mr-2">QUERY:</span>
                  <span className="text-white font-medium">&ldquo;{scenario.query}&rdquo;</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-slate-400">
                  <span className="text-emerald-400">PINECONE FILTER:</span>
                  <code className="text-slate-300 bg-slate-900 px-1.5 py-0.5 border border-slate-800">
                    tenant_production
                  </code>
                </div>
              </div>
            )}

            {/* Main Split Grid: 3 panes */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">

              {/* --------------------------------------------------- */}
              {/* PANE 1 — Left App Sidebar                           */}
              {/* --------------------------------------------------- */}
              <div className="hidden lg:flex lg:col-span-2 bg-[#070A12] border-r border-slate-800/80 flex-col justify-between p-4">
                {/* Top Brand */}
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-bold text-sm rounded-md shrink-0">
                      K
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xs">Knowvia</div>
                      <div className="text-slate-500 text-[9px] font-mono">Enterprise Intelligence</div>
                    </div>
                  </div>

                  {/* Primary Active Nav — Chat */}
                  <div className="bg-[#2563EB] text-white px-3 py-2 rounded-md text-xs font-medium flex items-center gap-2 mb-1">
                    <span>💬</span>
                    <span>Chat</span>
                  </div>

                  {/* Secondary Nav */}
                  <div className="space-y-1 mt-2 text-slate-400 text-xs">
                    <div className="px-3 py-2 hover:text-slate-200 flex items-center gap-2 cursor-pointer">
                      <span>🗄️</span>
                      <span>Knowledge Base</span>
                    </div>
                    <div className="px-3 py-2 hover:text-slate-200 flex items-center gap-2 cursor-pointer">
                      <span>📄</span>
                      <span>Sources</span>
                    </div>
                    <div className="px-3 py-2 hover:text-slate-200 flex items-center gap-2 cursor-pointer">
                      <span>⚙️</span>
                      <span>Settings</span>
                    </div>
                  </div>

                  {/* Recent Conversations */}
                  <div className="mt-5">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono mb-2">Recent</div>
                    <div className="space-y-1.5">
                      {/* Active item */}
                      <button
                        onClick={() => { setSelectedScenarioId("01"); setFocusedSourceId(null); }}
                        className={`w-full text-left px-2.5 py-2 rounded text-[11px] transition-colors ${selectedScenarioId === "01" ? "bg-blue-950/50 border border-blue-500/30 text-blue-200" : "text-slate-400 hover:text-slate-200"}`}
                      >
                        <div className="truncate">Explain enterprise rag...</div>
                        <div className="text-[9px] text-slate-500 mt-0.5">2m ago</div>
                      </button>
                      <button
                        onClick={() => { setSelectedScenarioId("02"); setFocusedSourceId(null); }}
                        className={`w-full text-left px-2.5 py-2 rounded text-[11px] transition-colors ${selectedScenarioId === "02" ? "bg-blue-950/50 border border-blue-500/30 text-blue-200" : "text-slate-400 hover:text-slate-200"}`}
                      >
                        <div className="truncate">Annual leave & carry-forward...</div>
                        <div className="text-[9px] text-slate-500 mt-0.5">12m ago</div>
                      </button>
                      <button
                        onClick={() => { setSelectedScenarioId("03"); setFocusedSourceId(null); }}
                        className={`w-full text-left px-2.5 py-2 rounded text-[11px] transition-colors ${selectedScenarioId === "03" ? "bg-blue-950/50 border border-blue-500/30 text-blue-200" : "text-slate-400 hover:text-slate-200"}`}
                      >
                        <div className="truncate">Ethics Section 4.2 audit...</div>
                        <div className="text-[9px] text-slate-500 mt-0.5">1h ago</div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom User Profile */}
                <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-[10px] text-slate-200 font-bold shrink-0">
                    AS
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-200">Anshul Sharma</div>
                    <div className="text-[9px] text-blue-400 font-mono">PRO</div>
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------- */}
              {/* PANE 2 — Center Chat & Structured Synthesis         */}
              {/* --------------------------------------------------- */}
              <div className="lg:col-span-6 p-5 sm:p-6 bg-[#0B0F19] border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between">
                <div>
                  {/* Mode + Model pills */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <div className="flex items-center gap-1.5 bg-[#13192B] text-blue-300 border border-blue-800 px-2 py-1 text-[10px] font-mono uppercase rounded-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      <span>{scenario.mode}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-900 text-slate-300 border border-slate-800 px-2 py-1 text-[10px] font-mono rounded-sm">
                      <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                      <span>{scenario.model}</span>
                    </div>
                  </div>

                  {/* User query bubble */}
                  <div className="flex justify-end mb-4">
                    <div className="bg-blue-600/20 border border-blue-500/30 text-blue-100 text-xs font-sans px-4 py-2.5 rounded-tl-lg rounded-bl-lg rounded-br-lg max-w-[85%]">
                      &ldquo;{scenario.query}&rdquo;
                    </div>
                  </div>

                  {/* Gemini rewrite trace — show if it exists */}
                  {scenario.rawQuery && scenario.rewrittenQuery && (
                    <div className="mb-4 px-3 py-2 bg-[#111827]/80 border border-blue-900/50 font-mono text-[10px]">
                      <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                        <Sparkles className="w-3 h-3" />
                        <span className="font-semibold">✦ GEMINI REWRITE</span>
                      </div>
                      <div className="text-slate-400">Raw: <span className="text-slate-300">&ldquo;{scenario.rawQuery}&rdquo;</span></div>
                      <div className="text-blue-300 mt-0.5">→ Standalone: <span className="text-white font-medium">&ldquo;{scenario.rewrittenQuery}&rdquo;</span></div>
                      <div className="text-emerald-400 mt-0.5">↳ Pinecone 384-dim Search · {scenario.filterSpec}</div>
                    </div>
                  )}

                  {/* Synthesis Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-0.5 bg-blue-950/80 text-blue-400 border border-blue-800 text-[10px] font-mono uppercase tracking-wider font-semibold">
                        KEY COMPONENTS
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        CONFIDENCE: <strong className="text-emerald-400">{scenario.confidence}</strong>
                      </span>
                    </div>
                    <button
                      onClick={handleFlashContext}
                      className="px-2.5 py-1 text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors focus:outline-none"
                    >
                      <Search className="w-3 h-3 text-blue-400" />
                      <span>View context</span>
                    </button>
                  </div>

                  {/* Component Rows */}
                  <div className="space-y-2 mb-4">
                    {scenario.components.map((comp, idx) => {
                      const IconComponent = comp.icon;
                      return (
                        <div
                          key={idx}
                          className="p-3 bg-[#0E1322] border border-slate-800/90 flex flex-col sm:flex-row sm:items-start gap-3 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center gap-2 sm:w-52 shrink-0">
                            <div className="w-6 h-6 bg-[#162038] border border-slate-700 text-blue-400 flex items-center justify-center shrink-0">
                              <IconComponent className="w-3.5 h-3.5" strokeWidth={1.5} />
                            </div>
                            <span className="font-semibold text-xs text-slate-100 font-sans">
                              {comp.name}
                            </span>
                          </div>
                          <p className="font-sans text-xs text-slate-300 leading-relaxed flex-1">
                            {comp.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Benefits 4-Card Row */}
                  <div className="border-t border-slate-800 pt-4">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>ENTERPRISE GUARANTEES</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {scenario.benefits.map((b, idx) => {
                        const iconConfigs = [
                          {
                            bg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                            icon: ShieldCheck,
                          },
                          {
                            bg: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                            icon: Sparkles,
                          },
                          {
                            bg: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
                            icon: Lock,
                          },
                          {
                            bg: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                            icon: Zap,
                          },
                        ];
                        const cfg = iconConfigs[idx % 4];
                        const Icon = cfg.icon;
                        return (
                          <div
                            key={idx}
                            className="bg-[#111624] border border-slate-800/90 rounded-lg p-4 hover:border-slate-700 transition-colors"
                          >
                            <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${cfg.bg}`}>
                              <Icon className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                            <div className="text-white font-semibold text-xs mt-3 mb-1 font-sans">{b.title}</div>
                            <div className="text-slate-400 text-[11px] leading-relaxed font-sans">{b.subtitle}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Prompt Bar */}
                <div className="mt-4 border-t border-slate-800 pt-4">
                  <div className="flex items-center gap-2 bg-[#0E1322] border border-slate-700 px-4 py-2.5 mb-2">
                    <span className="text-slate-500 text-xs flex-1 font-sans">+ Ask anything about your enterprise data...</span>
                    <div className="w-7 h-7 bg-[#2563EB] rounded-full flex items-center justify-center shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {["Summarize", "Find in documents", "Compare", "Generate report"].map((chip) => (
                      <button
                        key={chip}
                        className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-slate-400 text-[11px] font-mono hover:text-slate-200 hover:border-slate-500 transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------- */}
              {/* PANE 3 — Right Sources & Span Inspector             */}
              {/* --------------------------------------------------- */}
              <div
                className={`lg:col-span-4 bg-[#080B14] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                  highlightRightPanel
                    ? "ring-2 ring-blue-500 bg-[#0E1529]"
                    : "border-t lg:border-t-0"
                }`}
              >
                <div>
                  {/* Top Block: Sources (N) */}
                  <div className="pb-3 mb-4 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300 uppercase tracking-wider font-semibold">
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span>SOURCES ({scenario.sources.length})</span>
                    </div>
                    {focusedSourceId && (
                      <button
                        onClick={() => setFocusedSourceId(null)}
                        className="text-[10px] text-blue-400 hover:underline"
                      >
                        Reset Filter
                      </button>
                    )}
                  </div>

                  {/* Sources List */}
                  <div className="space-y-2 mb-6">
                    {scenario.sources.map((src) => {
                      const isFocused = focusedSourceId === src.id;
                      return (
                        <button
                          key={src.id}
                          onClick={() =>
                            setFocusedSourceId(isFocused ? null : src.id)
                          }
                          className={`w-full text-left p-2.5 border transition-all flex items-center justify-between ${
                            isFocused
                              ? "bg-[#131D33] border-blue-500 text-white"
                              : "bg-[#0E1322] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#111728]"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.5} />
                            <div className="truncate">
                              <div className="font-sans text-xs font-medium text-slate-100 truncate">
                                {src.name}
                              </div>
                              <div className="font-mono text-[10px] text-slate-400">
                                {src.page} · {src.size}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 pl-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span className="font-mono text-[9px] text-emerald-400 uppercase font-medium">
                              VERIFIED
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Block: Extracted Context // Text used for this answer */}
                  <div className="pb-3 mb-3 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-300 uppercase tracking-wider font-semibold text-[11px]">
                      {"EXTRACTED CONTEXT // SPAN AUDIT"}
                    </span>
                    <span className="text-[9px] text-slate-500">
                      CHAR-LEVEL
                    </span>
                  </div>

                  <div className="space-y-3">
                    {displayedSpans.map((spn, idx) => (
                      <div
                        key={idx}
                        className="bg-[#111625] border border-slate-800 p-3.5 font-sans text-xs leading-relaxed text-slate-300"
                      >
                        <div className="font-mono text-[10px] text-slate-400 uppercase pb-2 mb-2 border-b border-slate-800 flex items-center justify-between">
                          <span>TEXT USED FOR THIS ANSWER</span>
                          <span className="text-blue-400 font-semibold">ATTRIBUTED</span>
                        </div>

                        {/* Paragraph with Translucent Royal Blue Span Highlights */}
                        <p className="text-[11px] leading-relaxed text-slate-300 mb-2.5">
                          &ldquo;{spn.beforeHighlight}
                          <mark className="bg-blue-500/25 text-blue-200 px-1 py-0.5 border-b border-blue-400 font-medium">
                            {spn.highlight1}
                          </mark>
                          {spn.middleText}
                          <mark className="bg-blue-500/25 text-blue-200 px-1 py-0.5 border-b border-blue-400 font-medium">
                            {spn.highlight2}
                          </mark>
                          {spn.afterHighlight}&rdquo;
                        </p>

                        {/* Clickable Source Pill */}
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-mono text-[10px]">
                          <span className="text-emerald-400">
                            📄 Source: {spn.sourceDoc} ({spn.page})
                          </span>
                          <span className="text-slate-500 text-[9px]">
                            SHA256: 7d4a...b81e
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inspector Footer Bar */}
                <div className="mt-6 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>GROUNDING DRIFT: 0.00%</span>
                  <span>ACL: TENANT_ISOLATED</span>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* D. MODE 2: FASTAPI WIRE PROTOCOL VIEW                     */
          /* ========================================================= */
          <div className="bg-[#0B0F19] text-slate-100 p-6 lg:p-8 font-mono text-xs">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-white uppercase tracking-wider">
                  {"FASTAPI ASYNC WIRE PROTOCOL // REPRODUCIBLE ENDPOINT"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="px-2 py-0.5 bg-[#162038] text-blue-300 border border-slate-700">
                  POST /chat/ask
                </span>
                <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                  HTTP/2 200 OK
                </span>
                <span>LATENCY: {scenario.latency}</span>
              </div>
            </div>

            {/* Split Code Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column: Request Payload */}
              <div className="bg-[#070A12] border border-slate-800 p-4">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[11px]">
                  <span className="text-blue-400 font-semibold">
                    REQUEST PAYLOAD · POST /chat/ask
                  </span>
                  <button
                    onClick={() =>
                      handleCopyText(
                        JSON.stringify(scenario.requestPayload, null, 2),
                        "req"
                      )
                    }
                    className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white"
                  >
                    {copiedKey === "req" ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[11px] text-slate-300 overflow-x-auto leading-relaxed scrollbar-thin">
                  <code>{JSON.stringify(scenario.requestPayload, null, 2)}</code>
                </pre>
              </div>

              {/* Right Column: Response Payload */}
              <div className="bg-[#070A12] border border-slate-800 p-4">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[11px]">
                  <span className="text-emerald-400 font-semibold">
                    RESPONSE PAYLOAD · 200 OK · SPAN-VERIFIED
                  </span>
                  <button
                    onClick={() =>
                      handleCopyText(
                        JSON.stringify(scenario.responsePayload, null, 2),
                        "res"
                      )
                    }
                    className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white"
                  >
                    {copiedKey === "res" ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[11px] text-emerald-300/90 overflow-x-auto leading-relaxed scrollbar-thin">
                  <code>{JSON.stringify(scenario.responsePayload, null, 2)}</code>
                </pre>
              </div>

            </div>

            {/* Quick cURL Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px]">
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-blue-400">$</span>
                <code className="text-slate-300">
                  curl -X POST https://api.aqvon.ai/v1/chat/ask -H &quot;Authorization: Bearer aqv_live_...&quot; -d &apos;{JSON.stringify(scenario.requestPayload)}&apos;
                </code>
              </div>
              <button
                onClick={() =>
                  handleCopyText(
                    `curl -X POST https://api.aqvon.ai/v1/chat/ask -H "Authorization: Bearer aqv_live_..." -d '${JSON.stringify(scenario.requestPayload)}'`,
                    "curl"
                  )
                }
                className="shrink-0 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === "curl" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied cURL</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy cURL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
