import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AQVON — Applied AI Research & Knowvia Enterprise Intelligence",
  description:
    "Official research lab and parent company of Knowvia AI. Building deterministic, span-verified enterprise retrieval architectures.",
  keywords: [
    "AQVON",
    "Knowvia",
    "Knowvia AI",
    "Deterministic Retrieval",
    "Enterprise RAG",
    "Span-Level Verification",
    "Applied AI Research",
  ],
  authors: [{ name: "AQVON Research Labs" }],
  icons: {
    icon: "/aqvon-logo.svg",
    shortcut: "/aqvon-logo.svg",
    apple: "/aqvon-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[var(--bg-canvas)] text-[var(--ink-body)] font-sans selection:bg-[var(--ink-primary)] selection:text-[var(--bg-canvas)]"
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
