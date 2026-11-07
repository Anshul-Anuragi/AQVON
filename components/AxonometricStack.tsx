"use client";

import React, { useState } from "react";

interface LayerSpec {
  id: number;
  level: string;
  name: string;
  subtitle: string;
  stackTag: string;
  isFocal?: boolean;
  specs: { label: string; value: string }[];
  description: string;
  pillLabel: string;
}

const LAYERS: LayerSpec[] = [
  {
    id: 1,
    level: "LAYER 01 · FOUNDATION",
    name: "FastAPI + PyPDF Ingestion Engine",
    subtitle: "Multipart Upload · 20MB Validation · Page-Aware Chunking",
    stackTag: "FASTAPI · PYPDF · UVICORN · PYDANTIC V2",
    pillLabel: "L1: FastAPI/PyPDF",
    specs: [
      { label: "Chunk Strategy", value: "Recursive 512 tokens / 64 overlap" },
      { label: "Bounding Coordinates", value: "Page numbers + char start/end" },
      { label: "Auth Validation", value: "JWT Bearer + bcrypt hash checks" },
    ],
    description:
      "Asynchronous Python 3.12 backend processing multipart PDF uploads with PyPDF page-level metadata extraction and boundary-preserving semantic chunking.",
  },
  {
    id: 2,
    level: "LAYER 02 · RELATIONAL PERSISTENCE",
    name: "Neon Serverless PostgreSQL",
    subtitle: "SQLAlchemy ORM · Alembic Migrations · Users, Docs & Messages",
    stackTag: "NEON PG · SQLALCHEMY · ALEMBIC",
    pillLabel: "L2: Neon PG",
    specs: [
      { label: "State Tables", value: "Users, Documents, Conversations" },
      { label: "Security ACLs", value: "Cryptographic ownership verification" },
      { label: "Branching", value: "Instant copy-on-write dev databases" },
    ],
    description:
      "Serverless relational persistence for multi-tenant users, session message logs, document-level authorization graphs, and audit history.",
  },
  {
    id: 3,
    level: "LAYER 03 · FOCAL VECTOR ENGINE",
    name: "Pinecone Vector Retrieval + BAAI/bge-small",
    subtitle: "384-dim Dense Embeddings · Metadata & User Ownership Filter",
    stackTag: "PINECONE SERVERLESS · BAAI/BGE-SMALL-EN-V1.5",
    isFocal: true,
    pillLabel: "L3: Pinecone + BGE-Small",
    specs: [
      { label: "Vector Dimension", value: "384 (Normalized Dot-Product)" },
      { label: "Metadata Isolation", value: "tenant_id + user_id filter" },
      { label: "Index Latency", value: "<15ms p95 similarity lookup" },
    ],
    description:
      "Core focal retrieval layer. PyTorch SentenceTransformers generates compact 384-dimensional dense vectors. Pinecone executes sub-15ms similarity search strictly scoped by user ownership metadata.",
  },
  {
    id: 4,
    level: "LAYER 04 · ORCHESTRATION",
    name: "Google Gemini Context Engine",
    subtitle: "Conversational Query Rewriting + Grounded Answer Synthesis",
    stackTag: "GOOGLE-GENERATIVEAI · GEMINI 1.5",
    pillLabel: "L4: Gemini Rewrite",
    specs: [
      { label: "Query Rewriter", value: "Multi-turn context resolution" },
      { label: "Generation", value: "Strict zero-hallucination constraint" },
      { label: "Provenance", value: "Byte-offset verified" },
    ],
    description:
      "Google Gemini resolves ambiguous follow-up questions into fully contextualized search queries before retrieval, and synthesizes final answers strictly clamped to verified text.",
  },
  {
    id: 5,
    level: "LAYER 05 · PRESENTATION",
    name: "Next.js Client & Citation Inspector",
    subtitle: "Grounded Answer · Page & Span Badges",
    stackTag: "NEXT.JS 16 · REACT 19 · TAILWIND",
    pillLabel: "L5: Citation UI",
    specs: [
      { label: "Viewports", value: "Workbench & Wire Protocol" },
      { label: "Attribution", value: "Exact Character Spans" },
      { label: "Client SLA", value: "<40ms End-to-End" },
    ],
    description:
      "Interactive workspace presenting line-by-line grounded answers with direct hyperlinks to bounding box coordinates on original PDF pages.",
  },
];

// SVG layout constants — 2:1 isometric rhombus planes
const CX = 190;   // horizontal center of the planes within 600-wide viewBox
const W = 260;    // plane width
const H = 64;     // plane height (2:1 aspect ratio)
const GAP = 72;   // vertical gap between plane centers

function getPlaneY(id: number): number {
  // L5 at top (y=48), L1 at bottom (y=48 + 4*GAP = 336)
  return 48 + (5 - id) * GAP;
}

export function AxonometricStack() {
  const [activeLayerId, setActiveLayerId] = useState<number>(3);

  const currentLayer = LAYERS.find((l) => l.id === activeLayerId) || LAYERS[2];

  return (
    <div className="w-full flex flex-col font-mono text-xs">
      {/* ── TOP HEADER ── */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-[var(--border-grid)] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[var(--accent-primary)]" />
          <span className="font-semibold text-[var(--ink-primary)] uppercase tracking-wider text-[11px]">
            FIG. 01 · EXPLODED AXONOMETRIC ARCHITECTURE
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--ink-muted)]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
          <span>5 LAYERS · 1 FOCAL RETRIEVAL ENGINE</span>
        </div>
      </div>

      {/* ── MIDDLE: FULL-WIDTH SVG ISOMETRIC DIAGRAM ── */}
      <div className="relative bg-[var(--bg-surface)] border border-[var(--border-grid)] overflow-hidden">
        {/* Blueprint crosshair markers */}
        <div className="absolute top-2 left-2 text-[var(--border-grid)] text-[9px] pointer-events-none select-none">
          +AXIS_Z
        </div>
        <div className="absolute top-2 right-2 text-[var(--border-grid)] text-[9px] pointer-events-none select-none">
          2:1_ISOMETRIC
        </div>
        <div className="absolute bottom-2 left-2 text-[var(--border-grid)] text-[9px] pointer-events-none select-none">
          FIG_01
        </div>

        <svg
          viewBox="0 0 580 380"
          className="w-full h-auto select-none"
          style={{ display: "block" }}
        >
          {/* Central vertical axis connector line passing through all 5 layers */}
          <line
            x1={CX}
            y1={24}
            x2={CX}
            y2={getPlaneY(1) + H / 2 + 18}
            stroke="var(--accent-primary)"
            strokeDasharray="4 4"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />

          {/* Left vertical alignment guide */}
          <line
            x1={CX - W / 2}
            y1={getPlaneY(5)}
            x2={CX - W / 2}
            y2={getPlaneY(1)}
            stroke="var(--border-grid)"
            strokeDasharray="3 3"
            strokeWidth="0.8"
            strokeOpacity="0.35"
          />

          {/* Right vertical alignment guide */}
          <line
            x1={CX + W / 2}
            y1={getPlaneY(5)}
            x2={CX + W / 2}
            y2={getPlaneY(1)}
            stroke="var(--border-grid)"
            strokeDasharray="3 3"
            strokeWidth="0.8"
            strokeOpacity="0.35"
          />

          {/* Render 5 razor-sharp 2:1 architectural rhombus planes (from bottom L1 to top L5) */}
          {[1, 2, 3, 4, 5].map((id) => {
            const layer = LAYERS.find((l) => l.id === id)!;
            const cy = getPlaneY(id);
            const isActive = activeLayerId === id;
            const isFocal = !!layer.isFocal;

            const polygonPoints = `${CX},${cy - H / 2} ${CX + W / 2},${cy} ${CX},${cy + H / 2} ${CX - W / 2},${cy}`;

            return (
              <g
                key={id}
                onClick={() => setActiveLayerId(id)}
                className="cursor-pointer group"
                style={{ transition: "all 0.15s ease" }}
              >
                {/* 1. Base Glass Rhombus Surface */}
                <polygon
                  points={polygonPoints}
                  fill={
                    isFocal
                      ? "rgba(37, 99, 235, 0.14)"
                      : isActive
                      ? "var(--bg-card)"
                      : "var(--bg-canvas)"
                  }
                  stroke={
                    isFocal
                      ? "var(--accent-primary)"
                      : isActive
                      ? "var(--accent-primary)"
                      : "var(--ink-primary)"
                  }
                  strokeWidth={isFocal ? "2.5" : isActive ? "2" : "1.5"}
                  strokeOpacity={isFocal ? "1" : isActive ? "0.9" : "0.35"}
                />

                {/* 2. Internal Subtle Grid Cross-Lines */}
                <line
                  x1={CX}
                  y1={cy - H / 2}
                  x2={CX}
                  y2={cy + H / 2}
                  stroke={isFocal ? "var(--accent-primary)" : "var(--ink-primary)"}
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  strokeOpacity={isFocal ? "0.35" : "0.12"}
                />
                <line
                  x1={CX - W / 2}
                  y1={cy}
                  x2={CX + W / 2}
                  y2={cy}
                  stroke={isFocal ? "var(--accent-primary)" : "var(--ink-primary)"}
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  strokeOpacity={isFocal ? "0.35" : "0.12"}
                />

                {/* 3. Center Node Anchor */}
                <circle
                  cx={CX}
                  cy={cy}
                  r={isFocal ? 4.5 : 3}
                  fill={isFocal ? "var(--accent-primary)" : isActive ? "var(--ink-primary)" : "var(--ink-muted)"}
                />
                {isFocal && (
                  <circle
                    cx={CX}
                    cy={cy}
                    r={9}
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth="1"
                    strokeOpacity="0.6"
                  />
                )}

                {/* 4. High-Contrast Layer Number Badge on Left */}
                <rect
                  x={CX - W / 2 - 38}
                  y={cy - 9}
                  width={28}
                  height={18}
                  fill="var(--bg-card)"
                  stroke={isFocal || isActive ? "var(--accent-primary)" : "var(--border-grid)"}
                  strokeWidth={isFocal || isActive ? "1.5" : "1"}
                  rx={2}
                />
                <text
                  x={CX - W / 2 - 24}
                  y={cy + 3.5}
                  textAnchor="middle"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fontSize="8.5"
                  fontWeight="bold"
                  fill={isFocal || isActive ? "var(--accent-primary)" : "var(--ink-primary)"}
                >
                  L{id}
                </text>

                {/* 5. Horizontal Leader Line to Right Label */}
                <polyline
                  points={`${CX + W / 2} ${cy}, ${CX + W / 2 + 18} ${cy}, ${CX + W / 2 + 28} ${cy}`}
                  fill="none"
                  stroke={isFocal || isActive ? "var(--accent-primary)" : "var(--border-grid)"}
                  strokeWidth={isFocal || isActive ? "1.5" : "1"}
                  strokeOpacity={isFocal || isActive ? "1" : "0.6"}
                />

                {/* 6. High-Contrast Layer Title on Right */}
                <text
                  x={CX + W / 2 + 34}
                  y={cy - 4}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fontSize="9.5"
                  fontWeight={isFocal || isActive ? "700" : "500"}
                  fill={isFocal ? "var(--accent-primary)" : isActive ? "var(--ink-primary)" : "var(--ink-primary)"}
                  className="select-none uppercase"
                >
                  L{id} · {layer.name.split(" ")[0]} {isFocal ? "★ FOCAL" : ""}
                </text>
                <text
                  x={CX + W / 2 + 34}
                  y={cy + 9}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fontSize="8"
                  fill={isFocal ? "var(--accent-primary)" : "var(--ink-muted)"}
                  className="select-none"
                  opacity={isFocal ? "1" : "0.85"}
                >
                  {id === 1
                    ? "FastAPI + PyPDF Ingest"
                    : id === 2
                    ? "Neon PostgreSQL Store"
                    : id === 3
                    ? "Pinecone + BGE-Small (384d)"
                    : id === 4
                    ? "Gemini Context Rewriting"
                    : "Next.js Span Inspector"}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="px-4 pb-3 text-[10px] text-[var(--ink-muted)] flex items-center justify-between">
          <span>[CLICK ANY LAYER TO INSPECT METRICS]</span>
          <span className="text-[var(--accent-primary)] font-medium">L-03 IS FOCAL RETRIEVER</span>
        </div>
      </div>

      {/* ── BOTTOM: LAYER SELECTOR PILLS + ACTIVE SPEC CARD ── */}
      <div className="mt-4">
        {/* 5 clickable layer pills */}
        <div className="grid grid-cols-5 gap-1.5 mb-4">
          {LAYERS.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLayerId(l.id)}
              className={`p-2 text-center border text-[10px] uppercase tracking-wide transition-colors ${
                activeLayerId === l.id
                  ? "bg-[var(--bg-card)] text-[var(--ink-primary)] border-2 border-[var(--accent-primary)] font-bold shadow-xs"
                  : l.isFocal
                  ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 hover:bg-[var(--accent-primary)]/20"
                  : "bg-[var(--bg-surface)] text-[var(--ink-muted)] border border-[var(--border-grid)] hover:text-[var(--ink-primary)]"
              }`}
            >
              <span className="block font-bold mb-0.5">L{l.id}{l.isFocal ? " ★" : ""}</span>
              <span className="block text-[8px] leading-tight opacity-80 truncate">
                {l.id === 1 ? "FastAPI" : l.id === 2 ? "Neon PG" : l.id === 3 ? "Pinecone" : l.id === 4 ? "Gemini" : "Next.js"}
              </span>
            </button>
          ))}
        </div>

        {/* Active layer detail card — full width */}
        <div className={`p-4 border ${currentLayer.isFocal ? "border-[var(--accent-primary)]/50 bg-[var(--accent-primary)]/5" : "border-[var(--border-grid)] bg-[var(--bg-card)]"}`}>
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-grid)]">
            <span className="text-[10px] text-[var(--ink-muted)] uppercase tracking-wider font-semibold">
              {currentLayer.level}
            </span>
            {currentLayer.isFocal ? (
              <span className="text-[9px] px-1.5 py-0.5 bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 font-bold uppercase">
                ★ FOCAL ENGINE
              </span>
            ) : (
              <span className="text-[9px] px-1.5 py-0.5 bg-[var(--bg-surface)] text-[var(--ink-muted)] border border-[var(--border-grid)] uppercase">
                LAYER 0{currentLayer.id}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className={`font-serif text-lg text-[var(--ink-primary)] tracking-normal leading-tight mb-1 ${currentLayer.isFocal ? "text-[var(--accent-primary)]" : ""}`}>
                {currentLayer.name}
              </h3>
              <div className={`font-mono text-[11px] mb-2 ${currentLayer.isFocal ? "text-[var(--accent-primary)]" : "text-[var(--ink-muted)]"}`}>
                {currentLayer.subtitle}
              </div>
              <p className="font-sans text-[11px] text-[var(--ink-body)] leading-relaxed">
                {currentLayer.description}
              </p>
            </div>

            <div className="space-y-1.5">
              {currentLayer.specs.map((sp, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-[11px] bg-[var(--bg-surface)] px-2.5 py-1.5 border border-[var(--border-grid)]"
                >
                  <span className="text-[var(--ink-muted)] uppercase text-[10px]">{sp.label}</span>
                  <span className={`font-semibold ${currentLayer.isFocal ? "text-[var(--accent-primary)]" : "text-[var(--ink-primary)]"}`}>
                    {sp.value}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between text-[10px] text-[var(--ink-muted)] pt-1.5 border-t border-[var(--border-grid)]">
                <span>TECH STACK:</span>
                <span className="font-bold text-[var(--ink-primary)] text-right max-w-[60%] truncate">
                  {currentLayer.stackTag}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom caption stamp */}
      <div className="mt-3 pt-2 border-t border-[var(--border-grid)] flex flex-wrap items-center justify-between text-[10px] text-[var(--ink-muted)] gap-2">
        <span>FIG. 01 · EXPLODED AXONOMETRIC · 5 LAYERS · 1 FOCAL ENGINE</span>
        <span>VERTICAL PROJECTION: 2:1 ISOMETRIC · SPAN ATTRIBUTION</span>
      </div>
    </div>
  );
}
