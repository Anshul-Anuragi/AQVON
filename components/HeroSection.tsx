"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  ArrowRight,
  ArrowUpRight,
  FileText,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { AxonometricStack } from "./AxonometricStack";

interface QueryTrace {
  id: string;
  pillLabel: string;
  queryText: string;
  card1: {
    sources: { name: string; page: string; tag: string }[];
    chunkSize: string;
    namespace: string;
  };
  card2: {
    model: string;
    mode: string;
    recallScore: string;
    latency: string;
    strategy: string;
  };
  card3: {
    beforeHighlight: string;
    highlight1: string;
    middleText: string;
    highlight2: string;
    afterHighlight: string;
    sourceDoc: string;
    page: string;
  };
  metrics: {
    hallucinationRate: string;
    sourcesVerified: string;
    isolation: string;
  };
}

const TRACE_PRESETS: QueryTrace[] = [
  {
    id: "01",
    pillLabel: "01. Enterprise RAG Architecture",
    queryText: "How does Knowvia enforce span-level deterministic attribution in enterprise RAG pipelines?",
    card1: {
      sources: [
        { name: "Qs in hinglish.pdf", page: "Page 3", tag: "PDF_INGEST" },
        { name: "DX_GATE2027_Syllabus.pdf", page: "Page 12", tag: "PDF_INGEST" },
      ],
      chunkSize: "512 tokens · 64 overlap",
      namespace: "ns_corp_production_v2",
    },
    card2: {
      model: "Google Gemini",
      mode: "RAG (Document Search)",
      recallScore: "0.964",
      latency: "34ms",
      strategy: "Pinecone Metadata Filter + Gemini Rewriter",
    },
    card3: {
      beforeHighlight: "Knowvia's multi-layered retrieval engine establishes ",
      highlight1: "deterministic span-level attribution",
      middleText: " by anchoring every generated token directly to verifiable passages in ",
      highlight2: "enterprise-isolated vector chunks",
      afterHighlight: ", eliminating stochastic hallucination drift.",
      sourceDoc: "Qs in hinglish.pdf",
      page: "Page 3",
    },
    metrics: {
      hallucinationRate: "0.0%",
      sourcesVerified: "2/2",
      isolation: "PRIVATE VPC",
    },
  },
  {
    id: "02",
    pillLabel: "02. CPU Scheduling Policy",
    queryText: "What are the latency guarantees of EDF preemptive priority task queues under kernel load?",
    card1: {
      sources: [
        { name: "OS_Kernel_Schedules_v4.pdf", page: "Page 87", tag: "SYS_SPEC" },
        { name: "POSIX_RT_Spec_Draft.pdf", page: "Page 14", tag: "STANDARDS" },
      ],
      chunkSize: "256 tokens · 32 overlap",
      namespace: "ns_kernel_rt_v1",
    },
    card2: {
      model: "Google Gemini",
      mode: "RAG (Document Search)",
      recallScore: "0.982",
      latency: "29ms",
      strategy: "Pinecone Tenant Partition + Gemini Rewriter",
    },
    card3: {
      beforeHighlight: "Under hard real-time scheduling constraints, the scheduler executes ",
      highlight1: "Earliest Deadline First (EDF) preemptive bounds",
      middleText: " to guarantee worst-case latency compliance across ",
      highlight2: "isolated priority task queues",
      afterHighlight: " without kernel lock contention.",
      sourceDoc: "OS_Kernel_Schedules_v4.pdf",
      page: "Page 87",
    },
    metrics: {
      hallucinationRate: "0.0%",
      sourcesVerified: "2/2",
      isolation: "PRIVATE VPC",
    },
  },
  {
    id: "03",
    pillLabel: "03. Distributed Indexing",
    queryText: "How does consistent hashing with virtual nodes mitigate shard skew in 128-node clusters?",
    card1: {
      sources: [
        { name: "Shard_Rebalancing_Paper_v2.pdf", page: "Page 9", tag: "RESEARCH" },
        { name: "VectorStore_Cluster_Topology.pdf", page: "Page 4", tag: "INFRA" },
      ],
      chunkSize: "1024 tokens · 128 overlap",
      namespace: "ns_distributed_v3",
    },
    card2: {
      model: "Google Gemini",
      mode: "RAG (Document Search)",
      recallScore: "0.957",
      latency: "38ms",
      strategy: "Pinecone Top-K + Neon PG Session Context",
    },
    card3: {
      beforeHighlight: "Distributed vector sharding implements ",
      highlight1: "consistent hashing ring partitioning with virtual nodes",
      middleText: ", mitigating cold-replica skew and maintaining sub-40ms P95 queries across ",
      highlight2: "128-way redundant partition replicas",
      afterHighlight: " without re-indexing penalties.",
      sourceDoc: "Shard_Rebalancing_Paper_v2.pdf",
      page: "Page 9",
    },
    metrics: {
      hallucinationRate: "0.0%",
      sourcesVerified: "2/2",
      isolation: "PRIVATE VPC",
    },
  },
];

const CLI_SNIPPETS = {
  curl: `curl -X POST https://api.aqvon.ai/v1/knowvia/retrieve -H "X-Aqvon-Embedding: BAAI/bge-small-en-v1.5"`,
  python: `from aqvon import KnowviaClient\n\nclient = KnowviaClient(api_key="aqv_live_...", embedding="BAAI/bge-small-en-v1.5")\nresponse = client.retrieve(query="span-level attribution", vector_db="pinecone")`,
  typescript: `import { Aqvon } from "@aqvon/sdk";\n\nconst knowvia = new Aqvon({ embedding: "BAAI/bge-small-en-v1.5", vectorDb: "pinecone" });\nconst trace = await knowvia.retrieve({ query: "span-level attribution" });`,
};

type CliTab = "curl" | "typescript" | "python";

export function HeroSection() {
  const [selectedTraceId, setSelectedTraceId] = useState<string>("01");
  const [activeCliTab, setActiveCliTab] = useState<CliTab>("curl");
  const [copied, setCopied] = useState<boolean>(false);
  const [rightView, setRightView] = useState<"axonometric" | "trace">("axonometric");

  const activeTrace = TRACE_PRESETS.find((t) => t.id === selectedTraceId) || TRACE_PRESETS[0];

  const handleCopy = async (text: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else if (typeof document !== "undefined") {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    } catch {
      // Fallback in case clipboard permissions are blocked
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full">
      {/* 12-Column Blueprint Grid Container */}
      <div className="max-w-7xl mx-auto border-x border-b border-[var(--border-grid)] grid grid-cols-1 lg:grid-cols-2 bg-[var(--bg-canvas)] transition-colors">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: Editorial Lab Manifesto & Spec-Sheet Actions */}
        {/* ========================================================= */}
        <div className="lg:col-span-1 p-6 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[var(--border-grid)] flex flex-col justify-between relative bg-[var(--bg-canvas)] transition-colors">
          
          {/* Subtle Blueprint Crosshair Markers */}
          <div className="absolute top-3 left-3 text-[var(--border-grid)] font-mono text-[9px] pointer-events-none select-none">
            +00.00
          </div>
          <div className="absolute top-3 right-3 text-[var(--border-grid)] font-mono text-[9px] pointer-events-none select-none">
            +07.00
          </div>

          <div>
            {/* Top Metadata Tag */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-[var(--accent-signal)]" />
              <span className="font-mono text-xs text-[var(--accent-signal)] uppercase tracking-widest font-medium">
                FIG_00 · DETERMINISTIC ENTERPRISE INTELLIGENCE
              </span>
            </div>

            {/* Main Editorial H1 Heading ("One Accent, Not Six") */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[64px] text-[var(--ink-primary)] tracking-normal leading-[1.15] mb-6">
              Researching the architecture of{" "}
              <span className="italic font-normal text-[var(--accent-editorial)]">
                verifiable machine knowledge.
              </span>
            </h1>

            {/* Lead Body Paragraph */}
            <p className="font-sans text-base sm:text-lg text-[var(--ink-body)] leading-relaxed max-w-2xl mb-8">
              AQVON is an applied AI research lab building deterministic retrieval systems.
              We replace probabilistic guesswork with span-level citation grounding,
              hybrid vector orchestration, and zero-leakage enterprise infrastructure.
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {/* Primary Flagship Action */}
              <a
                href="https://knowvia.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--accent-primary)] text-white px-6 py-3.5 font-mono text-xs uppercase tracking-wider hover:bg-[var(--accent-primary)]/90 transition-colors rounded-none border border-[var(--accent-primary)] flex items-center gap-2.5 font-medium group focus:outline-none"
              >
                <span>Launch Knowvia AI</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
              </a>

              {/* Secondary Spec Action */}
              <a
                href="#specification"
                className="bg-[var(--bg-canvas)] text-[var(--ink-primary)] border border-[var(--border-grid)] px-6 py-3.5 font-mono text-xs uppercase tracking-wider hover:bg-[var(--bg-surface)] transition-colors rounded-none flex items-center gap-2.5 font-medium focus:outline-none"
              >
                <span>Read Technical Spec</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>

            {/* 3-Point Editorial Manifesto Strip ("diagramdesign.dev" Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mb-8 border-t border-[var(--border-grid)] text-xs font-sans">
              <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-grid)] transition-colors">
                <span className="font-mono text-[10px] text-[var(--accent-signal)] uppercase font-semibold block mb-1">
                  01. Grounded, not guessed.
                </span>
                <p className="text-[var(--ink-body)] leading-relaxed text-[11px]">
                  Color points at the single document span that answers the query, nothing else.
                </p>
              </div>

              <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-grid)] transition-colors">
                <span className="font-mono text-[10px] text-[var(--accent-signal)] uppercase font-semibold block mb-1">
                  02. Dual-store discipline.
                </span>
                <p className="text-[var(--ink-body)] leading-relaxed text-[11px]">
                  Relational records and ownership live in <strong className="text-[var(--ink-primary)]">Neon PostgreSQL</strong>; 384-dim semantic vectors live in <strong className="text-[var(--ink-primary)]">Pinecone</strong>.
                </p>
              </div>

              <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-grid)] transition-colors">
                <span className="font-mono text-[10px] text-[var(--accent-signal)] uppercase font-semibold block mb-1">
                  03. Structure you can audit.
                </span>
                <p className="text-[var(--ink-body)] leading-relaxed text-[11px]">
                  Every response verifies user ownership, rewrites follow-up context via <strong className="text-[var(--ink-primary)]">Google Gemini</strong>, and cites exact PDF pages.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Interactive CLI / API Switcher Strip */}
          <div className="border-t border-[var(--border-grid)] pt-6 mt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[var(--accent-signal)]" strokeWidth={1.5} />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-primary)] font-medium">
                  DEVELOPER RUNTIME INTERFACE
                </span>
              </div>

              {/* Protocol Tabs */}
              <div className="flex items-center gap-1 font-mono text-[10px] uppercase">
                {(["curl", "typescript", "python"] as CliTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCliTab(tab)}
                    className={`px-2 py-0.5 border text-center transition-colors ${
                      activeCliTab === tab
                        ? "bg-[var(--bg-card)] text-[var(--ink-primary)] border-2 border-[var(--accent-primary)] font-semibold"
                        : "bg-[var(--bg-surface)] text-[var(--ink-muted)] border border-[var(--border-grid)] hover:text-[var(--ink-primary)]"
                    }`}
                  >
                    {tab === "curl" ? "cURL" : tab === "typescript" ? "TS SDK" : "Python"}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Box */}
            <div className="bg-[#0D1117] text-slate-100 border border-slate-800 p-3.5 font-mono text-[11px] sm:text-xs flex items-center justify-between gap-3 overflow-hidden rounded-none shadow-none">
              <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none">
                <span className="text-[var(--accent-signal)] select-none">$</span>
                <code className="text-slate-200 whitespace-nowrap">
                  {CLI_SNIPPETS[activeCliTab].split("\n")[0]}
                </code>
              </div>

              <button
                onClick={() => handleCopy(CLI_SNIPPETS[activeCliTab])}
                className="shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors focus:outline-none"
                title="Copy Command"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[var(--accent-emerald)]" strokeWidth={2} />
                    <span className="text-[var(--accent-emerald)]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" strokeWidth={1.5} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between mt-2 font-mono text-[10px] text-[var(--ink-muted)]">
              <span>PROTOCOL: FASTAPI ASYNC / REST</span>
              <span>INDEX: PINECONE · BAAI/BGE-SMALL-EN-V1.5</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Live Telemetry & Axonometric 3D Diagram     */}
        {/* ========================================================= */}
        <div className="lg:col-span-1 bg-[var(--bg-surface)] p-4 sm:p-6 lg:p-8 flex flex-col justify-between font-mono text-xs relative transition-colors">
          
          {/* Subtle Blueprint Crosshair Markers */}
          <div className="absolute top-3 right-3 text-[var(--border-grid)] font-mono text-[9px] pointer-events-none select-none">
            +12.00
          </div>

          <div>
            {/* Title Bar with View Mode Switcher */}
            <div className="border-b border-[var(--border-grid)] pb-3 mb-5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--ink-primary)]" />
                <span className="text-[11px] font-semibold text-[var(--ink-primary)] uppercase tracking-wider">
                  {rightView === "axonometric" ? "FIG. 01 // AXONOMETRIC STACK" : "LIVE TELEMETRY // RETRIEVAL TRACE"}
                </span>
              </div>

              {/* View Selector Tabs */}
              <div className="inline-flex items-center border border-[var(--border-grid)] bg-[var(--bg-canvas)] p-0.5">
                <button
                  onClick={() => setRightView("axonometric")}
                  className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider transition-colors ${
                    rightView === "axonometric"
                      ? "bg-[var(--bg-card)] text-[var(--ink-primary)] border border-[var(--accent-primary)] font-semibold shadow-xs"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                  }`}
                >
                  3D Stack
                </button>
                <button
                  onClick={() => setRightView("trace")}
                  className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider transition-colors ${
                    rightView === "trace"
                      ? "bg-[var(--bg-card)] text-[var(--ink-primary)] border border-[var(--accent-primary)] font-semibold shadow-xs"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                  }`}
                >
                  Live Trace
                </button>
              </div>
            </div>

            {/* Content View 1: Axonometric 3D Stack */}
            {rightView === "axonometric" ? (
              <div className="space-y-4">
                <AxonometricStack />
              </div>
            ) : (
              /* Content View 2: Live Retrieval Trace */
              <div>
                {/* Interactive Query Selector Pills */}
                <div className="mb-5 space-y-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--ink-muted)] mb-1.5 flex items-center justify-between">
                    <span>SELECT TRACE QUERY:</span>
                    <span className="text-[9px] text-[var(--accent-signal)]">INTERACTIVE</span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    {TRACE_PRESETS.map((preset) => {
                      const isSelected = preset.id === selectedTraceId;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => setSelectedTraceId(preset.id)}
                          className={`text-left px-3 py-2 text-[11px] border transition-all flex items-center justify-between rounded-none ${
                            isSelected
                              ? "bg-[var(--bg-card)] text-[var(--ink-primary)] border-2 border-[var(--accent-primary)] shadow-xs"
                              : "bg-[var(--bg-canvas)] text-[var(--ink-body)] border border-[var(--border-grid)] hover:border-[var(--ink-primary)]"
                          }`}
                        >
                          <span className="truncate pr-2 font-mono font-medium">{preset.pillLabel}</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 border uppercase font-semibold ${
                              isSelected
                                ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white"
                                : "border-[var(--border-grid)] text-[var(--ink-muted)] bg-[var(--bg-surface)]"
                            }`}
                          >
                            {isSelected ? "ACTIVE" : "SELECT"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* The 3 Connected Spec Cards (Vertical Pipeline) */}
                <div className="space-y-0 relative">
                  
                  {/* CARD 01: Multi-Source Ingestion & Storage */}
                  <div className="bg-[var(--bg-canvas)] border border-[var(--border-grid)] p-3.5 relative">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-grid)] text-[10px] uppercase text-[var(--ink-muted)]">
                      <span className="font-semibold text-[var(--ink-primary)]">01 // INGESTION & STORAGE LAYER</span>
                      <span className="text-[9px] text-[var(--accent-emerald)] bg-[var(--accent-emerald)]/10 px-1 border border-[var(--accent-emerald)]/30 font-semibold">PARSED</span>
                    </div>

                    <div className="space-y-1.5 mb-2.5">
                      {activeTrace.card1.sources.map((src, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-[11px] bg-[var(--bg-surface)] px-2 py-1 border border-[var(--border-grid)]"
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <FileText className="w-3 h-3 text-[var(--ink-muted)] shrink-0" strokeWidth={1.5} />
                            <span className="truncate text-[var(--ink-primary)]">{src.name}</span>
                          </div>
                          <span className="text-[10px] text-[var(--ink-muted)] shrink-0 font-medium">{src.page}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-[var(--ink-muted)] border-t border-[var(--border-grid)] pt-2 mb-2">
                      <div>
                        <span className="block text-[9px] uppercase text-[var(--ink-muted)]">EMBEDDING</span>
                        <span className="text-[var(--ink-primary)] font-medium truncate block">BAAI/bge-small-en-v1.5 (384-dim)</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase text-[var(--ink-muted)]">RELATIONAL DB</span>
                        <span className="text-[var(--ink-primary)] font-medium truncate block">Neon PostgreSQL</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-[var(--ink-muted)] border-t border-[var(--border-grid)] pt-1.5">
                      <div>
                        <span className="block text-[9px] uppercase text-[var(--ink-muted)]">CHUNK RESOLUTION</span>
                        <span className="text-[var(--ink-primary)] font-medium">{activeTrace.card1.chunkSize}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase text-[var(--ink-muted)]">VECTOR NAMESPACE</span>
                        <span className="text-[var(--ink-primary)] font-medium truncate block">{activeTrace.card1.namespace}</span>
                      </div>
                    </div>
                  </div>

                  {/* Vertical Pipeline Connector 1 -> 2 */}
                  <div className="h-4 flex items-center justify-center">
                    <div className="w-[1px] h-full bg-[var(--accent-signal)]" />
                  </div>

                  {/* CARD 02: Hybrid Retriever & Orchestration */}
                  <div className="bg-[var(--bg-canvas)] border border-[var(--accent-signal)] p-3.5 relative">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--accent-signal)]/25 text-[10px] uppercase">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[var(--accent-signal)]" />
                        <span className="font-semibold text-[var(--accent-signal)]">02 // RETRIEVER & REWRITING ENGINE</span>
                      </div>
                      <span className="text-[9px] text-[var(--accent-signal)] bg-[var(--accent-signal)]/10 px-1 border border-[var(--accent-signal)]/30 font-semibold">
                        PIPELINE CORE
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-[var(--ink-muted)] mb-2">
                      <div>
                        <span className="block text-[9px] uppercase text-[var(--ink-muted)]">GENERATOR & REWRITER</span>
                        <span className="text-[var(--ink-primary)] font-semibold">Google Gemini</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase text-[var(--ink-muted)]">VECTOR DB</span>
                        <span className="text-[var(--ink-primary)] font-semibold">Pinecone Serverless</span>
                      </div>
                    </div>

                    <div className="bg-[var(--bg-surface)] p-2 border border-[var(--border-grid)] mb-2 text-[10px] text-[var(--ink-body)]">
                      <span className="text-[var(--ink-muted)] block text-[9px] uppercase">ORCHESTRATION STRATEGY</span>
                      <span className="text-[var(--ink-primary)] font-medium">{activeTrace.card2.strategy}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-[var(--border-grid)] pt-2">
                      <div>
                        <span className="block text-[9px] uppercase text-[var(--ink-muted)]">RECALL SCORE</span>
                        <span className="text-[var(--accent-signal)] font-bold text-xs">{activeTrace.card2.recallScore}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase text-[var(--ink-muted)]">RETRIEVAL LATENCY</span>
                        <span className="text-[var(--accent-emerald)] font-bold text-xs">{activeTrace.card2.latency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Vertical Pipeline Connector 2 -> 3 */}
                  <div className="h-4 flex items-center justify-center">
                    <div className="w-[1px] h-full bg-[var(--accent-signal)]" />
                  </div>

                  {/* CARD 03: Extracted Context & Span Audit */}
                  <div className="bg-[var(--bg-canvas)] border border-[var(--border-grid)] p-3.5 relative">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-grid)] text-[10px] uppercase text-[var(--ink-muted)]">
                      <span className="font-semibold text-[var(--ink-primary)]">03 // EXTRACTED CONTEXT & SPAN AUDIT</span>
                      <span className="text-[9px] text-[var(--accent-emerald)] bg-[var(--accent-emerald)]/10 px-1 border border-[var(--accent-emerald)]/30 font-semibold">VERIFIED</span>
                    </div>

                    {/* Dark-Mode Mini Preview Box */}
                    <div className="bg-[#0B0F19] text-slate-200 p-3.5 border border-slate-800 rounded-none font-mono">
                      <div className="flex items-center justify-between text-[9px] text-slate-400 pb-2 mb-2 border-b border-slate-800">
                        <span className="uppercase tracking-wider font-semibold text-slate-300">
                          TEXT USED FOR THIS ANSWER
                        </span>
                        <span className="text-[#059669] flex items-center gap-1 font-semibold">
                          <ShieldCheck className="w-3 h-3 text-[#059669]" strokeWidth={1.5} />
                          CONFIDENCE: 99.8%
                        </span>
                      </div>

                      <p className="text-[11px] leading-relaxed text-slate-300 mb-3">
                        &ldquo;{activeTrace.card3.beforeHighlight}
                        <span className="bg-blue-500/25 text-blue-300 px-1 border-b border-blue-400 font-semibold">
                          {activeTrace.card3.highlight1}
                        </span>
                        {activeTrace.card3.middleText}
                        <span className="bg-blue-500/25 text-blue-300 px-1 border-b border-blue-400 font-semibold">
                          {activeTrace.card3.highlight2}
                        </span>
                        {activeTrace.card3.afterHighlight}&rdquo;
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <button className="inline-flex items-center gap-1.5 text-[10px] bg-slate-900/90 text-emerald-400 hover:text-emerald-300 border border-slate-700/80 px-2 py-1 transition-colors">
                          <span>📄 Source: {activeTrace.card3.sourceDoc} ({activeTrace.card3.page})</span>
                          <span className="text-[#059669] font-bold">· Verified</span>
                        </button>
                        <span className="text-[9px] text-slate-500 uppercase">SHA256: 9f8a...e10d</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Spec Footer: 3-Column Mini Metric Bar */}
                <div className="border-t border-[var(--border-grid)] pt-4 mt-6 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-[var(--bg-canvas)] border border-[var(--border-grid)]">
                    <span className="block text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
                      HALLUCINATION RATE
                    </span>
                    <span className="text-xs font-bold text-[var(--accent-emerald)]">
                      {activeTrace.metrics.hallucinationRate}
                    </span>
                  </div>

                  <div className="p-2 bg-[var(--bg-canvas)] border border-[var(--border-grid)]">
                    <span className="block text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
                      SOURCES VERIFIED
                    </span>
                    <span className="text-xs font-bold text-[var(--ink-primary)]">
                      {activeTrace.metrics.sourcesVerified}
                    </span>
                  </div>

                  <div className="p-2 bg-[var(--bg-canvas)] border border-[var(--border-grid)]">
                    <span className="block text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
                      ISOLATION
                    </span>
                    <span className="text-xs font-bold text-[var(--accent-signal)]">
                      {activeTrace.metrics.isolation}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
