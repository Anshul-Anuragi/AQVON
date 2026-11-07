"use client";

import React, { useState } from "react";
import {
  Check,
  Copy,
  ShieldCheck,
  Server,
  Lock,
  FileCheck,
  KeyRound,
} from "lucide-react";

interface ApiEndpoint {
  id: string;
  method: "POST" | "GET" | "DELETE";
  path: string;
  description: string;
  status: string;
}

const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: "ask",
    method: "POST",
    path: "/chat/ask",
    description: "Sends question with selected_documents, returning grounded synthesis + character span offsets.",
    status: "200 OK",
  },
  {
    id: "upload",
    method: "POST",
    path: "/documents/upload",
    description: "Multipart/form-data ingestion for PDF/DOCX/MD with automatic semantic chunking.",
    status: "201 CREATED",
  },
  {
    id: "list",
    method: "GET",
    path: "/documents/",
    description: "Retrieves all indexed documents and vector status.",
    status: "200 OK",
  },
  {
    id: "delete",
    method: "DELETE",
    path: "/documents/{id}",
    description: "Purges document and removes vector embeddings.",
    status: "204 NO CONTENT",
  },
  {
    id: "login",
    method: "POST",
    path: "/users/login",
    description: "JWT Bearer authentication with document ACL scopes.",
    status: "200 OK",
  },
];

const CODE_EXAMPLES = {
  python: `import aqvon

client = aqvon.Client(
    api_key="aqv_live_...",
    base_url="https://api.aqvon.ai/v1"
)

# 1. Ask a question with line-by-line span verification
response = client.chat.ask(
    question="What are the compliance duties specified in the ethics handbook?",
    selected_documents=["doc-ethics-04"],
    strict_grounding=True
)

print("Answer:", response.answer)
for source in response.sources:
    print(f"[{source.page}] {source.title}: {source.matched_span}")`,

  typescript: `import { KnowviaClient } from "@aqvon/knowvia";

const knowvia = new KnowviaClient({ 
  apiKey: process.env.AQVON_API_KEY 
});

const { answer, sources, latencyMs } = await knowvia.chat.ask({
  conversationId: "conv-1",
  question: "Explain enterprise RAG with key components and benefits",
  selectedDocuments: ["doc-1", "doc-2"],
  embeddingModel: "BAAI/bge-small-en-v1.5",
  vectorDb: "pinecone",
  llm: "google-generativeai"
});

console.log(\`Answer (\${latencyMs}ms):\`, answer);`,

  curl: `curl -X POST "https://api.aqvon.ai/v1/chat/ask" \\
  -H "Authorization: Bearer aqv_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "conversation_id": "conv-1",
    "question": "What is the policy on conflicts of interest?",
    "selected_documents": ["doc-1"]
  }'`,
};

type LanguageTab = "python" | "typescript" | "curl";

export function DeveloperSecurity() {
  const [activeTab, setActiveTab] = useState<LanguageTab>("python");
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>("ask");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleCopy = (code: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(code);
      }
    } catch {
      // fallback
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="security" className="w-full">
      <div className="max-w-7xl mx-auto border-x border-b border-[var(--border-grid)] bg-[var(--bg-canvas)] transition-colors">
        
        {/* ========================================================= */}
        {/* A. SECTION HEADER SPEC BAR                                */}
        {/* ========================================================= */}
        <div className="border-b border-[var(--border-grid)] bg-[var(--bg-surface)] px-4 sm:px-6 py-2.5 flex flex-wrap justify-between items-center font-mono text-[11px] text-[var(--ink-muted)] gap-2 transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[var(--accent-signal)]" />
            <span className="font-semibold text-[var(--ink-primary)] uppercase tracking-wider">
              {"04 // DEVELOPER INTEGRATION & ENTERPRISE SECURITY"}
            </span>
          </div>
          <div className="text-[10px] sm:text-[11px] tracking-wide">
            {"SDK: "}
            <span className="text-[var(--ink-primary)] font-medium">PYTHON · TYPESCRIPT · REST API</span>
            {" · ENCRYPTION: "}
            <span className="text-[var(--ink-primary)] font-medium">AES-256-GCM</span>
            {" · PRIVACY: "}
            <span className="text-[var(--accent-emerald)] font-medium">ZERO DATA RETENTION</span>
          </div>
        </div>

        {/* Editorial Title Block */}
        <div className="p-6 sm:p-10 lg:p-12 border-b border-[var(--border-grid)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-end bg-[var(--bg-canvas)] transition-colors">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-[var(--accent-signal)] uppercase tracking-widest font-medium">
                FIG_04 · PROGRAMMATIC RUNTIME & ISOLATION SPEC
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--ink-primary)] tracking-normal leading-[1.15]">
              Four lines of code to connect{" "}<span className="italic font-normal text-[var(--accent-editorial)]">every private document.</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[var(--ink-body)] mt-4 max-w-2xl leading-relaxed">
              Zero vendor lock-in. Query your indexed knowledge bases through standard asynchronous
              FastAPI endpoints or native client libraries with built-in byte-offset span verification.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-surface)] border border-[var(--border-grid)] font-mono text-[11px] text-[var(--ink-primary)] uppercase">
              <span className="w-1.5 h-1.5 bg-[var(--accent-signal)]" />
              <span>FASTAPI SWAGGER 0.1.0 COMPLIANT</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-surface)] border border-[var(--border-grid)] font-mono text-[11px] text-[var(--accent-emerald)] uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
              <span>SOC2 TYPE II · HIPAA AUDIT READY</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* B. DEVELOPER MULTI-LANGUAGE INTEGRATION TERMINAL          */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-[var(--border-grid)]">
          
          {/* Left Column: Feature Capabilities & Endpoints (5 cols) */}
          <div className="lg:col-span-5 p-6 lg:p-8 bg-[var(--bg-canvas)] border-b lg:border-b-0 lg:border-r border-[var(--border-grid)] font-mono text-xs flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[var(--border-grid)] text-[var(--ink-primary)]">
                <Server className="w-3.5 h-3.5 text-[var(--accent-signal)]" strokeWidth={1.5} />
                <span className="font-bold text-xs uppercase tracking-wider">
                  VERIFIED FASTAPI RUNTIME ENDPOINTS
                </span>
              </div>

              {/* Endpoint interactive list */}
              <div className="space-y-2 mb-6">
                {API_ENDPOINTS.map((ep) => {
                  const isSelected = selectedEndpointId === ep.id;
                  return (
                    <button
                      key={ep.id}
                      onClick={() => setSelectedEndpointId(ep.id)}
                      className={`w-full text-left p-3 border transition-all rounded-none flex flex-col gap-1 ${
                        isSelected
                          ? "bg-[var(--bg-card)] text-[var(--ink-primary)] border-2 border-[var(--accent-primary)] shadow-sm"
                          : "bg-[var(--bg-surface)] text-[var(--ink-body)] border border-[var(--border-grid)] hover:border-[var(--ink-primary)]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-1.5 py-0.2 text-[9px] font-bold border uppercase ${
                              ep.method === "POST"
                                ? "border-blue-500/50 text-blue-400 bg-blue-950/40"
                                : ep.method === "GET"
                                ? "border-emerald-500/50 text-emerald-400 bg-emerald-950/40"
                                : "border-rose-500/50 text-rose-400 bg-rose-950/40"
                            }`}
                          >
                            {ep.method}
                          </span>
                          <span className="font-bold text-xs">{ep.path}</span>
                        </div>
                        <span
                          className={`text-[9px] ${
                            isSelected ? "text-[var(--accent-emerald)]" : "text-[var(--ink-muted)]"
                          }`}
                        >
                          {ep.status}
                        </span>
                      </div>
                      <p
                        className={`font-sans text-[11px] leading-relaxed mt-1 ${
                          isSelected ? "opacity-90" : "text-[var(--ink-muted)]"
                        }`}
                      >
                        {ep.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick benchmark callout */}
            <div className="pt-4 border-t border-[var(--border-grid)] text-[11px] text-[var(--ink-muted)] leading-relaxed">
              <span className="text-[var(--ink-primary)] font-bold">BENCHMARK SLA:</span> P95 async response time under 34ms when running in the same VPC cluster.
            </div>
          </div>

          {/* Right Column: Interactive Multi-Language Code Block (7 cols) */}
          <div className="lg:col-span-7 bg-[#0B0F19] text-slate-100 p-6 lg:p-8 flex flex-col justify-between">
            <div>
              {/* Header row with language tabs */}
              <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-slate-800 gap-3 text-xs font-mono">
                <div className="flex items-center gap-1">
                  {(["python", "typescript", "curl"] as LanguageTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 border transition-colors uppercase text-[11px] ${
                        activeTab === tab
                          ? "bg-[#1E293B] text-white border-blue-500 font-semibold"
                          : "bg-transparent text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      {tab === "python"
                        ? "Python SDK"
                        : tab === "typescript"
                        ? "TypeScript / Next.js"
                        : "cURL (FastAPI)"}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleCopy(CODE_EXAMPLES[activeTab])}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors text-[10px]"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code display */}
              <pre className="text-xs leading-relaxed text-slate-200 overflow-x-auto p-2 font-mono scrollbar-thin">
                <code>{CODE_EXAMPLES[activeTab]}</code>
              </pre>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>ENDPOINT: https://api.aqvon.ai/v1</span>
              <span>AUTH: BEARER JWT (HS256 / RS256)</span>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* C. ENTERPRISE SECURITY & ISOLATION 4-CARD GRID            */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-[var(--border-grid)] font-mono text-xs">
          
          {/* Card 1: Runtime */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-[var(--border-grid)] bg-[var(--bg-canvas)] flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] text-[var(--ink-muted)] uppercase mb-2">
                <span>SEC_01 // RUNTIME</span>
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-signal)]" strokeWidth={1.5} />
              </div>
              <h3 className="font-sans font-semibold text-sm text-[var(--ink-primary)] mb-2">
                Private VPC & Air-Gapped
              </h3>
              <p className="font-sans text-xs text-[var(--ink-body)] leading-relaxed">
                Run within your own AWS, GCP, Azure VPC, or on-prem Kubernetes cluster. Zero telemetry or training on customer data.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-grid)] text-[10px] text-[var(--ink-muted)]">
              STATUS: ZERO OUTBOUND EGRESS
            </div>
          </div>

          {/* Card 2: Access */}
          <div className="p-6 border-b md:border-b-0 lg:border-r border-[var(--border-grid)] bg-[var(--bg-canvas)] flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] text-[var(--ink-muted)] uppercase mb-2">
                <span>SEC_02 // ACCESS</span>
                <Lock className="w-3.5 h-3.5 text-[var(--accent-signal)]" strokeWidth={1.5} />
              </div>
              <h3 className="font-sans font-semibold text-sm text-[var(--ink-primary)] mb-2">
                Document-Level RBAC & ACLs
              </h3>
              <p className="font-sans text-xs text-[var(--ink-body)] leading-relaxed">
                Granular document and department access filters applied directly at the vector query layer before semantic matching.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-grid)] text-[10px] text-[var(--ink-muted)]">
              AUTH: CRYPTOGRAPHIC JWT TOKENS
            </div>
          </div>

          {/* Card 3: Grounding */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-[var(--border-grid)] bg-[var(--bg-canvas)] flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] text-[var(--ink-muted)] uppercase mb-2">
                <span>SEC_03 // GROUNDING</span>
                <FileCheck className="w-3.5 h-3.5 text-[var(--accent-emerald)]" strokeWidth={1.5} />
              </div>
              <h3 className="font-sans font-semibold text-sm text-[var(--ink-primary)] mb-2">
                Cryptographic Citation Audit
              </h3>
              <p className="font-sans text-xs text-[var(--ink-body)] leading-relaxed">
                Every generated token is verified against raw byte offsets from the ingested PDF. Failed verifications fail closed.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-grid)] text-[10px] text-[var(--accent-emerald)]">
              DRIFT BOUND: 0.00% VERIFIED
            </div>
          </div>

          {/* Card 4: Compliance */}
          <div className="p-6 bg-[var(--bg-canvas)] flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] text-[var(--ink-muted)] uppercase mb-2">
                <span>SEC_04 // COMPLIANCE</span>
                <KeyRound className="w-3.5 h-3.5 text-[var(--accent-signal)]" strokeWidth={1.5} />
              </div>
              <h3 className="font-sans font-semibold text-sm text-[var(--ink-primary)] mb-2">
                SOC2 Type II & HIPAA Ready
              </h3>
              <p className="font-sans text-xs text-[var(--ink-body)] leading-relaxed">
                Formally audited data handling with automated PII masking, tenant namespace isolation, and AES-256 GCM encryption.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-grid)] text-[10px] text-[var(--ink-muted)]">
              AUDIT: RFC-3161 TIMESTAMPS
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
