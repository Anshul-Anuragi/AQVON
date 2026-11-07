import React from "react";
import { AqvonLogo } from "./AqvonLogo";
import { ArrowUpRight } from "lucide-react";

export function BlueprintFooter() {
  const sitemap = [
    {
      title: "PLATFORM",
      links: [
        { label: "Knowvia AI Workspace", href: "https://knowvia.ai" },
        { label: "BAAI/bge-small + Pinecone", href: "#architecture" },
        { label: "FastAPI Async Runtime", href: "#architecture" },
        { label: "Vector Admin Console", href: "https://knowvia.ai" },
        { label: "Pricing & VPC Plans", href: "#security" },
      ],
    },
    {
      title: "DEVELOPERS & DOCS",
      links: [
        { label: "FastAPI OpenAPI Specs", href: "#security" },
        { label: "Python SDK Client", href: "#security" },
        { label: "TypeScript / Next.js SDK", href: "#security" },
        { label: "Interactive Swagger (/docs)", href: "#security" },
        { label: "Evaluation Benchmark Scripts", href: "#research" },
      ],
    },
    {
      title: "RESEARCH & LABS",
      links: [
        { label: "AQVON Applied Group", href: "#research" },
        { label: "Span Grounding Paper (AQV-04)", href: "#research" },
        { label: "Neon PG + Pinecone Spec (AQV-08)", href: "#research" },
        { label: "Reference Architectures", href: "#research" },
        { label: "Zero-Hallucination Guardrails", href: "#architecture" },
      ],
    },
    {
      title: "COMPANY & SECURITY",
      links: [
        { label: "About AQVON Inc.", href: "/" },
        { label: "SOC2 Type II Trust Center", href: "#security" },
        { label: "HIPAA Architecture Guide", href: "#security" },
        { label: "Responsible AI Disclosure", href: "/" },
        { label: "Contact Research Team", href: "#contact" },
      ],
    },
  ];

  return (
    <footer className="w-full">
      <div className="max-w-7xl mx-auto border-x border-b border-[var(--border-grid)] bg-[var(--bg-canvas)] transition-colors">
        
        {/* ========================================================= */}
        {/* A. FINAL ACTION CALLOUT STRIP                             */}
        {/* ========================================================= */}
        <div className="p-8 sm:p-10 lg:p-14 bg-[var(--bg-canvas)] border-b border-[var(--border-grid)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-colors">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ink-primary)] tracking-normal leading-[1.15]">
              Ready to replace hallucinations with{" "}<span className="italic font-normal text-[var(--accent-editorial)]">verified machine knowledge?</span>
            </h2>
            <p className="font-sans text-sm text-[var(--ink-body)] mt-2 max-w-2xl leading-relaxed">
              Test your complex internal documents inside the Knowvia workspace or deploy the API inside your VPC today.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-wrap items-center gap-3 lg:justify-end">
            <a
              href="https://knowvia.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90 px-5 py-3 text-xs font-mono uppercase tracking-wider flex items-center gap-2 border border-[var(--accent-primary)] rounded-none transition-colors"
            >
              <span>Launch Knowvia Workspace</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#security"
              className="border border-[var(--border-grid)] bg-[var(--bg-canvas)] text-[var(--ink-primary)] hover:bg-[var(--bg-surface)] px-5 py-3 text-xs font-mono uppercase tracking-wider rounded-none transition-colors"
            >
              Read API Docs
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* B. ARCHITECTURAL SITEMAP GRID                             */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 p-8 lg:p-12 bg-[var(--bg-surface)] border-b border-[var(--border-grid)] font-mono text-xs gap-8 transition-colors">
          {sitemap.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <div className="font-bold text-[var(--ink-primary)] tracking-wider text-[11px] pb-1 border-b border-[var(--border-grid)]">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] transition-colors text-[11px] block leading-relaxed"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* C. THE TECHNICAL COLOPHON & SYSTEM TELEMETRY STRIP        */}
        {/* ========================================================= */}
        <div className="px-6 py-6 bg-[var(--bg-canvas)] flex flex-wrap justify-between items-center font-mono text-[11px] text-[var(--ink-muted)] gap-4 transition-colors">
          <div className="flex items-center gap-4">
            <AqvonLogo showBadge={false} />
            <span>© 2026 AQVON Applied Knowledge Technologies Inc. All rights reserved.</span>
          </div>

          <div className="hidden lg:block text-[var(--ink-muted)] text-[10px]">
            STACK: NEXT.JS 16 · FASTAPI · NEON POSTGRESQL · PINECONE · BAAI/BGE-SMALL · GOOGLE GEMINI
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[var(--accent-emerald)] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
              <span>ALL SYSTEMS OPERATIONAL</span>
            </span>
            <span className="text-[var(--border-grid)]">·</span>
            <span className="px-1.5 py-0.5 bg-[var(--bg-surface)] border border-[var(--border-grid)] text-[var(--ink-primary)] font-bold text-[9px] uppercase tracking-wider">
              Sheet 1 of 1
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
