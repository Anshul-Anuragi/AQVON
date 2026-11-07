"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AqvonLogo } from "./AqvonLogo";
import { Menu, X, Terminal, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { label: "01 / Knowvia", href: "#knowvia" },
    { label: "02 / Architecture", href: "#architecture" },
    { label: "03 / Research", href: "#research" },
    { label: "04 / Security", href: "#security" },
  ];

  return (
    <header className="w-full">
      {/* A. Top System Telemetry Bar */}
      <div className="w-full bg-[var(--bg-surface)] border-b border-[var(--border-grid)] font-mono text-[11px] uppercase tracking-wider text-[var(--ink-muted)] transition-colors">
        <div className="max-w-7xl mx-auto border-x border-[var(--border-grid)] px-4 sm:px-6 py-1.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[var(--ink-muted)] inline-block" />
            <span>{"SYS_AQVON // APPLIED KNOWLEDGE LABS · IND-01"}</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-emerald)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-emerald)]"></span>
            </span>
            <span className="truncate">
              KNOWVIA ENGINE v2.4 · PINECONE + NEON PG · BAAI/BGE-SMALL · GEMINI QUERY REWRITE
            </span>
          </div>
        </div>
      </div>

      {/* B. Main Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[var(--bg-canvas)]/95 backdrop-blur-md border-b border-[var(--border-grid)] transition-colors">
        <div className="max-w-7xl mx-auto border-x border-[var(--border-grid)] px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <AqvonLogo />
          </Link>

          {/* Center: Monospace Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--ink-primary)] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Actions, Theme Switcher & Primary CTA */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-6">
            {/* Theme Toggle: Segmented Dark | Light */}
            <div className="inline-flex items-center border border-[var(--border-grid)] bg-[var(--bg-surface)] p-0.5 rounded-none">
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  theme === "dark"
                    ? "bg-[var(--bg-card)] text-[var(--ink-primary)] border border-[var(--accent-primary)] font-semibold shadow-xs"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                }`}
                aria-label="Switch to Dark Blueprint"
              >
                <Moon className="w-2.5 h-2.5" />
                <span>Dark</span>
              </button>
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  theme === "light"
                    ? "bg-[var(--bg-card)] text-[var(--ink-primary)] border border-[var(--accent-primary)] font-semibold shadow-xs"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                }`}
                aria-label="Switch to Light Paper"
              >
                <Sun className="w-2.5 h-2.5" />
                <span>Light</span>
              </button>
            </div>

            <a
              href="#security"
              className="font-mono text-xs uppercase tracking-wider text-[var(--ink-muted)] hover:text-[var(--ink-primary)] transition-colors flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-[var(--ink-muted)]" strokeWidth={1.5} />
              <span>Documentation</span>
            </a>

            <a
              href="https://knowvia.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90 transition-colors px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center gap-2 border border-[var(--accent-primary)] rounded-none group focus:outline-none"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
              <span>Try Knowvia ↗</span>
            </a>
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="md:hidden flex items-center gap-2">
            <div className="inline-flex items-center border border-[var(--border-grid)] bg-[var(--bg-surface)] p-0.5">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 text-[var(--ink-primary)]"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[var(--border-grid)] bg-[var(--bg-surface)] text-[var(--ink-primary)] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Menu className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[var(--bg-canvas)] border-b border-[var(--border-grid)] border-x max-w-7xl mx-auto px-6 py-6 font-mono text-xs uppercase tracking-wider space-y-4">
            <div className="flex flex-col space-y-3 pb-4 border-b border-[var(--border-grid)]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] py-1"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#security"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)] py-1 flex items-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Documentation</span>
              </a>
            </div>

            <div className="pt-2">
              <a
                href="https://knowvia.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90 transition-colors px-4 py-3 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border border-[var(--accent-primary)] rounded-none"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
                <span>Try Knowvia ↗</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* C. diagramdesign.dev 3-Cell Sub-Header Spec Strip */}
      <div className="w-full bg-[var(--bg-surface)] border-b border-[var(--border-grid)] transition-colors">
        <div className="max-w-7xl mx-auto border-x border-[var(--border-grid)] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-grid)] font-mono text-xs">
          {/* Col 1 */}
          <div className="px-6 py-2.5 flex items-center justify-between sm:justify-start gap-2.5">
            <span className="text-[var(--ink-muted)] uppercase text-[10px] tracking-wider shrink-0">
              Architecture
            </span>
            <span className="text-[var(--border-grid)] hidden sm:inline">·</span>
            <span className="text-[var(--ink-primary)] font-medium truncate">
              Conversational RAG + Query Rewriting
            </span>
          </div>

          {/* Col 2 */}
          <div className="px-6 py-2.5 flex items-center justify-between sm:justify-start gap-2.5">
            <span className="text-[var(--ink-muted)] uppercase text-[10px] tracking-wider shrink-0">
              Runtime Stack
            </span>
            <span className="text-[var(--border-grid)] hidden sm:inline">·</span>
            <span className="text-[var(--ink-primary)] font-medium truncate">
              FastAPI · BAAI/bge-small · Pinecone · Neon PG
            </span>
          </div>

          {/* Col 3 */}
          <div className="px-6 py-2.5 flex items-center justify-between sm:justify-start gap-2.5">
            <span className="text-[var(--ink-muted)] uppercase text-[10px] tracking-wider shrink-0">
              Output Guarantee
            </span>
            <span className="text-[var(--border-grid)] hidden sm:inline">·</span>
            <span className="text-[var(--accent-emerald)] font-medium truncate">
              Page-Verified Citations + Ownership ACLs
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
