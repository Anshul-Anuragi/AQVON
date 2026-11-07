"use client";

import React, { useState } from "react";
import {
  FileText,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ComparisonRow {
  capability: string;
  rationale: string;
  aqvon: {
    highlight: string;
    detail: string;
    badge?: string;
  };
  consumerNotebook: {
    highlight: string;
    detail: string;
  };
  naiveRag: {
    highlight: string;
    detail: string;
  };
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    capability: "Inference Runtime & Deployment",
    rationale: "Where enterprise documents, vector embeddings, and memory traces reside.",
    aqvon: {
      highlight: "FastAPI Async + Neon Serverless PG + Pinecone",
      detail: "Asynchronous Uvicorn engine with SQLAlchemy ORM, Alembic migrations, Pinecone tenant metadata isolation, and zero third-party training retention.",
      badge: "Enterprise Sovereign",
    },
    consumerNotebook: {
      highlight: "Public Multi-Tenant Cloud",
      detail: "Consumer terms of service with opaque multi-tenant data residency and shared inference pools.",
    },
    naiveRag: {
      highlight: "Unverified DIY Scripts",
      detail: "Depends on custom configuration; typically sends raw document tokens to public third-party LLM endpoints.",
    },
  },
  {
    capability: "Retrieval Engine & Ranking",
    rationale: "How relevant passages are located within high-density unstructured corpora.",
    aqvon: {
      highlight: "BAAI/bge-small-en-v1.5 + Pinecone Serverless",
      detail: "Pinecone + Neon PostgreSQL with strict document-level user ACLs and Gemini conversational query rewriting. BAAI/bge-small-en-v1.5 provides 384-dim dense embeddings with metadata filtering.",
      badge: "Pinecone + Neon PG",
    },
    consumerNotebook: {
      highlight: "Single-Pass Dense Vector Only",
      detail: "Single dense vector embedding lookup. Frequently misses alphanumeric IDs, error codes, and exact tabular coordinates.",
    },
    naiveRag: {
      highlight: "Naive Cosine Similarity Top-K",
      detail: "Single vector similarity without cross-encoder reranking; high risk of out-of-distribution context dilution.",
    },
  },
  {
    capability: "Grounding & Citation Precision",
    rationale: "How claims are verified and audited prior to releasing tokens to the client application.",
    aqvon: {
      highlight: "Byte-Offset Span Verification & PyPDF Bounding Metadata",
      detail: "Every generation assertion is clamped to verified character start/end offsets (char_start, char_end) linked to original PyPDF page coordinates.",
      badge: "Zero-Drift Bound",
    },
    consumerNotebook: {
      highlight: "Broad Document / Note Attribution",
      detail: "Coarse document-level or note-level reference tags without cryptographic token-level provenance.",
    },
    naiveRag: {
      highlight: "Unchecked Generative Prompting",
      detail: "Relies entirely on LLM system prompt instructions ('only answer from context'); high hallucination drift.",
    },
  },
  {
    capability: "Document Access Control (RBAC)",
    rationale: "Multi-tenant tenant isolation and document-level authorization boundaries.",
    aqvon: {
      highlight: "Pinecone Metadata Namespaces + Neon PG User ACLs",
      detail: "Knowvia uses Pinecone + Neon PostgreSQL with strict document-level user ACLs and Gemini conversational query rewriting. JWT Bearer auth (python-jose) asserts ownership before queries hit the index.",
      badge: "Strict Isolation",
    },
    consumerNotebook: {
      highlight: "Workspace-Level Sharing Only",
      detail: "Binary access per notebook: users either have full access to every source in the notebook or no access.",
    },
    naiveRag: {
      highlight: "No Inherent Authorization",
      detail: "None by default; developers must manually implement document filtering in custom vector store wrappers.",
    },
  },
  {
    capability: "Developer API & Integrations",
    rationale: "Extensibility into existing microservices and enterprise pipelines.",
    aqvon: {
      highlight: "FastAPI REST API + Python & TypeScript SDKs",
      detail: "Asynchronous endpoints (POST /chat/ask, POST /documents/upload) with full Pydantic v2 schemas, reproducible cURL, and Google Gemini context rewriting.",
      badge: "Production Ready",
    },
    consumerNotebook: {
      highlight: "Proprietary Web Client Only",
      detail: "Closed consumer browser interface with no programmable microservice API or CI/CD ingestion triggers.",
    },
    naiveRag: {
      highlight: "DIY Python Script Wrappers",
      detail: "Requires building custom FastAPI or Flask servers with manual connection pooling and error retry logic.",
    },
  },
];

interface Publication {
  id: string;
  label: string;
  title: string;
  authors: string;
  abstract: string;
  actionText: string;
  bibtex: string;
  downloadUrl?: string;
}

const PUBLICATIONS: Publication[] = [
  {
    id: "pub-01",
    label: "TECH REPORT · AQV-2026.04",
    title: "Deterministic Span-Grounded Generation with BAAI/bge-small-en-v1.5 and Pinecone",
    authors: "Anshul Sharma, AQVON Applied Knowledge Group",
    abstract:
      "An empirical evaluation of BAAI/bge-small-en-v1.5 embeddings, Pinecone metadata namespaces, and token verification to eliminate unanchored generative claims in enterprise document search.",
    actionText: "Read Technical Paper →",
    bibtex: `@article{sharma2026deterministic,
  title={Deterministic Span-Grounded Generation with BAAI/bge-small-en-v1.5 and Pinecone},
  author={Sharma, Anshul and AQVON Applied Knowledge Group},
  journal={AQVON Technical Report Series},
  volume={AQV-2026.04},
  year={2026}
}`,
  },
  {
    id: "pub-02",
    label: "RESEARCH WHITE PAPER · AQV-2026.08",
    title: "Sub-40ms Multi-Tenant Retrieval with Neon PostgreSQL and Pinecone Vector Indices",
    authors: "AQVON Systems Engineering",
    abstract:
      "Designing high-throughput asynchronous FastAPI microservices with SQLAlchemy ORM and Alembic migrations, achieving sub-40ms roundtrip without leaking cross-tenant document embeddings.",
    actionText: "Download RFC Spec →",
    bibtex: `@techreport{aqvon2026sub40ms,
  title={Sub-40ms Multi-Tenant Retrieval with Neon PostgreSQL and Pinecone Vector Indices},
  author={AQVON Systems Engineering},
  institution={AQVON Applied AI Research},
  number={AQV-2026.08},
  year={2026}
}`,
  },
  {
    id: "pub-03",
    label: "REFERENCE ARCHITECTURE · AQV-2026.10",
    title: "Conversational Query Rewriting Precision in Multi-Turn Enterprise RAG via Google Gemini",
    authors: "AQVON Evaluation Labs",
    abstract:
      "A comparative audit of conversational context rewriting against raw multi-turn follow-ups under high-density financial, technical, and regulatory compliance corpora.",
    actionText: "View Eval Scripts ↗",
    bibtex: `@inproceedings{aqvon2026rewriting,
  title={Conversational Query Rewriting Precision in Multi-Turn Enterprise RAG via Google Gemini},
  author={AQVON Evaluation Labs},
  booktitle={Proceedings of Empirical AI Systems Conference},
  year={2026}
}`,
  },
];

export function ResearchBenchmarks() {
  const [activeBibtexId, setActiveBibtexId] = useState<string | null>(null);
  const [copiedBibtex, setCopiedBibtex] = useState<boolean>(false);

  const handleCopyBibtex = (bibtex: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(bibtex);
      }
    } catch {
      // fallback
    }
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  return (
    <section id="research" className="w-full">
      <div className="max-w-7xl mx-auto border-x border-b border-[var(--border-grid)] bg-[var(--bg-canvas)] transition-colors">
        
        {/* ========================================================= */}
        {/* A. SECTION HEADER SPEC BAR                                */}
        {/* ========================================================= */}
        <div className="border-b border-[var(--border-grid)] bg-[var(--bg-surface)] px-4 sm:px-6 py-2.5 flex flex-wrap justify-between items-center font-mono text-[11px] text-[var(--ink-muted)] gap-2 transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[var(--accent-signal)]" />
            <span className="font-semibold text-[var(--ink-primary)] uppercase tracking-wider">
              {"03 / RESEARCH // EMPIRICAL BENCHMARKS & REFERENCE ARCHITECTURE"}
            </span>
          </div>
          <div className="text-[10px] sm:text-[11px] tracking-wide">
            {"EVAL SUITE: "}
            <span className="text-[var(--ink-primary)] font-medium">RAG-TRUTH-V2</span>
            {" · HARNESS: "}
            <span className="text-[var(--ink-primary)] font-medium">PUBLIC SCRIPTS</span>
            {" · AUDIT: "}
            <span className="text-[var(--accent-emerald)] font-medium">RFC-3161 TIMESTAMPS</span>
          </div>
        </div>

        {/* Editorial Title Block */}
        <div className="p-6 sm:p-10 lg:p-12 border-b border-[var(--border-grid)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-end bg-[var(--bg-canvas)] transition-colors">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-[var(--accent-signal)] uppercase tracking-widest font-medium">
                FIG_03 · EMPIRICAL VERIFICATION & BENCHMARKS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--ink-primary)] tracking-normal leading-[1.15]">
              Every other retrieval design{" "}<span className="italic font-normal text-[var(--accent-editorial)]">asks you to give something up.</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[var(--ink-body)] mt-4 max-w-2xl leading-relaxed">
              Incumbents publish non-reproducible accuracy claims on internal test suites.
              AQVON publishes the eval harness, token splits, and raw latency traces so your security
              and engineering teams can rerun them on your own internal documents.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-surface)] border border-[var(--border-grid)] font-mono text-[11px] text-[var(--ink-primary)] uppercase">
              <span className="w-1.5 h-1.5 bg-[var(--accent-signal)]" />
              <span>BENCHMARK DATASET: 250K ENTERPRISE TOKENS</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-surface)] border border-[var(--border-grid)] font-mono text-[11px] text-[var(--accent-emerald)] uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
              <span>P95 INFERENCE: 34MS (FASTAPI ASYNC)</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* B. THE ARCHITECTURAL COMPARISON MATRIX                    */}
        {/* ========================================================= */}
        <div className="border-b border-[var(--border-grid)] overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-[var(--border-grid)] bg-[var(--bg-surface)] font-mono text-[11px] uppercase tracking-wider text-[var(--ink-muted)]">
                <th className="p-4 sm:p-5 w-[28%] font-semibold border-r border-[var(--border-grid)]">
                  ARCHITECTURAL CAPABILITY
                </th>
                <th className="p-4 sm:p-5 w-[28%] font-semibold border-r border-[var(--border-grid)] bg-[var(--bg-surface)] text-[var(--ink-primary)]">
                  <div className="flex items-center justify-between">
                    <span>AQVON / KNOWVIA AI</span>
                    <span className="text-[9px] bg-[var(--accent-emerald)] text-white px-1.5 py-0.5 rounded-none font-bold">
                      PRODUCTION READY
                    </span>
                  </div>
                </th>
                <th className="p-4 sm:p-5 w-[22%] font-semibold border-r border-[var(--border-grid)]">
                  CONSUMER NOTEBOOK AI
                </th>
                <th className="p-4 sm:p-5 w-[22%] font-semibold">
                  NAIVE VECTOR RAG
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-grid)] text-xs font-sans">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-[var(--bg-surface)]/50 transition-colors">
                  
                  {/* Column 1: Capability */}
                  <td className="p-4 sm:p-5 border-r border-[var(--border-grid)] align-top bg-[var(--bg-canvas)]">
                    <div className="font-semibold text-sm text-[var(--ink-primary)] mb-1">
                      {row.capability}
                    </div>
                    <div className="text-[11px] text-[var(--ink-muted)] italic font-mono leading-relaxed">
                      {row.rationale}
                    </div>
                  </td>

                  {/* Column 2: AQVON / Knowvia AI (Highlighted) */}
                  <td className="p-4 sm:p-5 border-r border-[var(--border-grid)] align-top bg-[var(--bg-surface)]">
                    <div className="flex items-start gap-1.5 mb-1.5">
                      <span className="text-[var(--accent-emerald)] font-bold text-sm leading-none mt-0.5">✓</span>
                      <span className="font-semibold text-xs text-[var(--ink-primary)]">
                        {row.aqvon.highlight}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--ink-body)] leading-relaxed">
                      {row.aqvon.detail}
                    </p>
                    {row.aqvon.badge && (
                      <span className="inline-block mt-2 font-mono text-[9px] uppercase tracking-wider text-[var(--accent-signal)] bg-[var(--accent-signal)]/10 border border-[var(--accent-signal)]/25 px-1.5 py-0.5 font-semibold">
                        {row.aqvon.badge}
                      </span>
                    )}
                  </td>

                  {/* Column 3: Consumer Notebook AI */}
                  <td className="p-4 sm:p-5 border-r border-[var(--border-grid)] align-top bg-[var(--bg-canvas)] text-[var(--ink-body)]">
                    <div className="font-medium text-xs text-[var(--ink-primary)] mb-1">
                      {row.consumerNotebook.highlight}
                    </div>
                    <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">
                      {row.consumerNotebook.detail}
                    </p>
                  </td>

                  {/* Column 4: Naive Vector RAG */}
                  <td className="p-4 sm:p-5 align-top bg-[var(--bg-canvas)] text-[var(--ink-body)]">
                    <div className="font-medium text-xs text-[var(--ink-primary)] mb-1">
                      {row.naiveRag.highlight}
                    </div>
                    <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">
                      {row.naiveRag.detail}
                    </p>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ========================================================= */}
        {/* C. EMPIRICAL METRICS STRIP                                */}
        {/* ========================================================= */}
        <div className="bg-[var(--bg-surface)] border-b border-[var(--border-grid)] p-6 lg:p-8 transition-colors">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[var(--ink-primary)]" />
            <span>EMPIRICAL AUDIT RESULTS // 250,000 TOKEN HARNESS BENCHMARK</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Card 1: BAAI/bge-small Retrieval Accuracy */}
            <div className="p-4 bg-[var(--bg-canvas)] border border-[var(--border-grid)]">
              <div className="font-mono text-3xl font-bold text-[var(--ink-primary)] mb-1">
                99.4%
              </div>
              <div className="font-mono text-xs font-semibold text-[var(--ink-primary)] uppercase mb-1">
                BAAI/BGE-SMALL RETRIEVAL ACCURACY
              </div>
              <p className="font-sans text-[11px] text-[var(--ink-muted)] leading-snug">
                384-dim dense vectors with +21.3% precision over baseline models on technical documentation.
              </p>
            </div>

            {/* Card 2: Neon PG + Pinecone Roundtrip */}
            <div className="p-4 bg-[var(--bg-canvas)] border border-[var(--border-grid)]">
              <div className="font-mono text-3xl font-bold text-[var(--accent-signal)] mb-1">
                34ms
              </div>
              <div className="font-mono text-xs font-semibold text-[var(--accent-signal)] uppercase mb-1">
                NEON PG + PINECONE SUB-40MS ROUNDTRIP
              </div>
              <p className="font-sans text-[11px] text-[var(--ink-muted)] leading-snug">
                Sub-40ms P95 latency across tenant-filtered vector similarity and relational session queries.
              </p>
            </div>

            {/* Card 3: Query Rewriting Precision */}
            <div className="p-4 bg-[var(--bg-canvas)] border border-[var(--border-grid)]">
              <div className="font-mono text-3xl font-bold text-[var(--ink-primary)] mb-1">
                99.2%
              </div>
              <div className="font-mono text-xs font-semibold text-[var(--ink-primary)] uppercase mb-1">
                CONVERSATIONAL QUERY REWRITING PRECISION
              </div>
              <p className="font-sans text-[11px] text-[var(--ink-muted)] leading-snug">
                Google Gemini context rewriter resolves multi-turn ambiguous pronouns before hitting the index.
              </p>
            </div>

            {/* Card 4: Hallucination Rate */}
            <div className="p-4 bg-[var(--bg-canvas)] border border-[var(--border-grid)]">
              <div className="font-mono text-3xl font-bold text-[var(--accent-emerald)] mb-1">
                0.0%
              </div>
              <div className="font-mono text-xs font-semibold text-[var(--accent-emerald)] uppercase mb-1">
                SPAN HALLUCINATION RATE
              </div>
              <p className="font-sans text-[11px] text-[var(--ink-muted)] leading-snug">
                Zero generative claims released without verified PyPDF page-level byte-span anchoring.
              </p>
            </div>

            {/* Card 5: Isolation */}
            <div className="p-4 bg-[var(--bg-canvas)] border border-[var(--border-grid)]">
              <div className="font-mono text-3xl font-bold text-[var(--ink-primary)] mb-1">
                100%
              </div>
              <div className="font-mono text-xs font-semibold text-[var(--ink-primary)] uppercase mb-1">
                DOCUMENT-LEVEL TENANT ISOLATION
              </div>
              <p className="font-sans text-[11px] text-[var(--ink-muted)] leading-snug">
                Pinecone metadata filters + Neon PG SQLAlchemy ACLs ensure zero cross-tenant data leakage.
              </p>
            </div>

            {/* Card 6: Vector Compaction */}
            <div className="p-4 bg-[var(--bg-canvas)] border border-[var(--border-grid)]">
              <div className="font-mono text-3xl font-bold text-[var(--accent-signal)] mb-1">
                384-DIM
              </div>
              <div className="font-mono text-xs font-semibold text-[var(--accent-signal)] uppercase mb-1">
                VECTOR COMPACTION EFFICIENCY
              </div>
              <p className="font-sans text-[11px] text-[var(--ink-muted)] leading-snug">
                Sentence Transformers inference with sub-10ms dot-product calculations and low memory overhead.
              </p>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* D. AQVON APPLIED RESEARCH PUBLICATIONS GRID              */}
        {/* ========================================================= */}
        <div className="p-6 lg:p-8 bg-[var(--bg-canvas)] transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-[var(--border-grid)]">
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--ink-primary)] font-semibold flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[var(--accent-signal)]" strokeWidth={1.5} />
              <span>APPLIED RESEARCH PUBLICATIONS & EVALUATION SPECIFICATIONS</span>
            </div>
            <div className="font-mono text-[11px] text-[var(--ink-muted)]">
              AQVON PREPRINT REPOSITORY · OPEN ACCESS
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PUBLICATIONS.map((pub) => {
              const isBibtexOpen = activeBibtexId === pub.id;
              return (
                <div
                  key={pub.id}
                  className="p-5 border border-[var(--border-grid)] bg-[var(--bg-canvas)] hover:border-[var(--ink-primary)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-[var(--accent-signal)] uppercase mb-2">
                      <span className="font-semibold">{pub.label}</span>
                      <span className="text-[var(--ink-muted)]">PDF</span>
                    </div>

                    <h3 className="font-sans font-semibold text-base text-[var(--ink-primary)] leading-snug mb-2">
                      {pub.title}
                    </h3>

                    <div className="font-mono text-[10px] text-[var(--ink-muted)] mb-3">
                      {pub.authors}
                    </div>

                    <p className="font-sans text-xs text-[var(--ink-body)] leading-relaxed mb-4">
                      {pub.abstract}
                    </p>
                  </div>

                  <div>
                    {/* Action & BibTeX Drawer Toggle */}
                    <div className="pt-3 border-t border-[var(--border-grid)] flex items-center justify-between text-xs font-mono">
                      <button
                        onClick={() =>
                          setActiveBibtexId(isBibtexOpen ? null : pub.id)
                        }
                        className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] flex items-center gap-1 uppercase text-[10px]"
                      >
                        <span>{isBibtexOpen ? "Hide BibTeX" : "Cite [BibTeX]"}</span>
                        {isBibtexOpen ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>

                      <a
                        href="#contact"
                        className="text-[var(--ink-primary)] hover:text-[var(--accent-signal)] font-semibold flex items-center gap-1 transition-colors uppercase text-[11px]"
                      >
                        <span>{pub.actionText}</span>
                      </a>
                    </div>

                    {/* Expandable BibTeX Box */}
                    {isBibtexOpen && (
                      <div className="mt-3 p-3 bg-[#0B0F19] border border-slate-800 text-[10px] font-mono text-slate-300 relative">
                        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-[9px] text-slate-400">
                          <span>BIBTEX CITATION</span>
                          <button
                            onClick={() => handleCopyBibtex(pub.bibtex)}
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                          >
                            {copiedBibtex ? (
                              <>
                                <Check className="w-2.5 h-2.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-2.5 h-2.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="overflow-x-auto leading-relaxed text-slate-300 scrollbar-thin">
                          <code>{pub.bibtex}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
