import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { KnowviaWorkbench } from "@/components/KnowviaWorkbench";
import { PipelineArchitecture } from "@/components/PipelineArchitecture";
import { ResearchBenchmarks } from "@/components/ResearchBenchmarks";
import { DeveloperSecurity } from "@/components/DeveloperSecurity";
import { BlueprintFooter } from "@/components/BlueprintFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--ink-body)] selection:bg-[var(--ink-primary)] selection:text-[var(--bg-canvas)] transition-colors">
      {/* Top Telemetry + Main Navigation Bar */}
      <Navbar />

      {/* Main Blueprint Editorial Content */}
      <main className="flex-1">
        {/* Split-Column Blueprint Hero Section */}
        <HeroSection />

        {/* FIG_01: Flagship Product — Knowvia AI Workbench & Span Inspector */}
        <KnowviaWorkbench />

        {/* FIG_02: 5-Stage Deterministic Pipeline Architecture & Fault Simulator */}
        <PipelineArchitecture />

        {/* FIG_03: Research, Benchmarks Matrix & Reference Architecture */}
        <ResearchBenchmarks />

        {/* FIG_04: Developer SDK, Enterprise Security & Isolation Spec */}
        <DeveloperSecurity />
      </main>

      {/* Archival Blueprint Footer & Sitemap */}
      <BlueprintFooter />
    </div>
  );
}
