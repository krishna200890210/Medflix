/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Users, 
  TrendingUp, 
  FileText, 
  Brain, 
  ArrowRight, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUpRight, 
  Bot, 
  Heart,
  Terminal,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
}

export default function LandingPage({ onStart, onLogin }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<'hba1c' | 'chol' | 'bp'>('hba1c');
  const [chatType, setChatType] = useState<number>(0);

  // Timeline showcase data
  const trends = {
    hba1c: [
      { label: 'Jun 25', ramesh: 8.3, target: 5.6 },
      { label: 'Aug 25', ramesh: 8.1, target: 5.6 },
      { label: 'Oct 25', ramesh: 7.9, target: 5.6 },
      { label: 'Dec 25', ramesh: 7.8, target: 5.6 },
      { label: 'Feb 26', ramesh: 7.6, target: 5.6 },
      { label: 'May 26', ramesh: 7.4, target: 5.6 },
    ],
    chol: [
      { label: 'Jun 25', ramesh: 250, target: 200 },
      { label: 'Aug 25', ramesh: 245, target: 200 },
      { label: 'Oct 25', ramesh: 238, target: 200 },
      { label: 'Dec 25', ramesh: 228, target: 200 },
      { label: 'Feb 26', ramesh: 220, target: 200 },
      { label: 'May 26', ramesh: 210, target: 200 },
    ],
    bp: [
      { label: 'Jun 25', ramesh: 144, target: 120 },
      { label: 'Aug 25', ramesh: 142, target: 120 },
      { label: 'Oct 25', ramesh: 140, target: 120 },
      { label: 'Dec 25', ramesh: 139, target: 120 },
      { label: 'Feb 26', ramesh: 138, target: 120 },
      { label: 'May 26', ramesh: 135, target: 120 },
    ],
  };

  const currentTrend = trends[activeTab];
  const maxVal = Math.max(...currentTrend.map(d => Math.max(d.ramesh, d.target))) * 1.1;

  const chatShowcases = [
    {
      q: "Compare Ramesh's last two reports.",
      a: "Analyzing Apollo May 2026 vs Manipal Feb 2026 for Ramesh Sharma:\n\n• **HbA1c** dropped from 7.6% to **7.4%** (8.6% relative improvement!)\n• **Creatinine** rose from 1.30 to **1.31 mg/dL** (Keep an eye on his Hydration)\n• **Blood Pressure** improved from 138/88 to **135/90 mmHg**.\n\n*Overall response to revised Metformin frequency is highly nominal.*",
    },
    {
      q: "Is there any danger with Sunita's therapies?",
      a: "🔴 **Alert**: Active Drug Absorption Overlap detected.\n\nSunita is taking morning **Levothyroxine (Synthroid) 75mcg** alongside the newly added strong **Calcium Supplements**.\n\n• *Mechanism*: Calcium carbonate binds to thyroxine in the gastric tract, cutting absorption by 30-45%.\n• *Action*: Distribute ingestion. Give Calcium strictly in afternoon lunch.",
    },
    {
      q: "What abnormal markers remain unresolved?",
      a: "Here are the key out-of-bounds biomarkers across your family:\n\n1. **Sunita Sharma**: Severe Vitamin D deficiency (18.2 ng/mL - highly critical for her Osteoarthritis pain level)\n2. **Ramesh Sharma**: Serum Creatinine borderline elevated at 1.31 mg/dL (eGFR 58 ml/min, indicates Stage 2 CKD strain)",
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B1F3A] text-white overflow-x-hidden font-sans">
      {/* Background radial soft lights */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-[10%] w-[500px] h-[500px] bg-gradient-to-r from-cyan-600/10 to-blue-500/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 glass-panel-dark">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-display font-black text-xl tracking-tight text-white shadow-lg neon-glow-cyan">
              M
            </div>
            <span className="font-display font-medium text-2xl tracking-normal bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
              Med<span className="font-black text-blue-400">Flix</span>
            </span>
            <span className="text-[10px] font-mono uppercase bg-blue-500/20 border border-blue-400/30 text-blue-300 px-2 py-0.5 rounded-full tracking-wider">
              AI Health OS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-cyan-400 transition-colors">Patient Timelines</a>
            <a href="#ai-brain" className="hover:text-cyan-400 transition-colors">AI Intelligence</a>
            <a href="#family" className="hover:text-cyan-400 transition-colors">Family Portal</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onLogin} 
              className="text-sm font-semibold hover:text-cyan-400 transition-colors cursor-pointer px-4 py-2"
              id="btn-nav-login"
            >
              Sign In
            </button>
            <button 
              onClick={onStart} 
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer neon-glow-blue flex items-center gap-2"
              id="btn-nav-cta"
            >
              Launch Platform <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Next-Generation Healthcare Management
          </div>
          
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
            All Your Family’s Medical History.<br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200 bg-clip-text text-transparent font-black">
              One Smart Dashboard.
            </span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
            MedFlix transforms complex health reports, clinical scans, and daily prescription schedules into a unified family operating system. Clear, insightful, and safe.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-cyan-500/10 transition-all active:scale-98 flex items-center justify-center gap-3 cursor-pointer"
              id="hero-cta-start"
            >
              Start Free Platform <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onLogin}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
              id="hero-cta-demo"
            >
              <FileText className="w-5 h-5 text-cyan-400" /> Upload First Report
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 border-t border-white/10 pt-8 mt-12 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> AES-256 Medical Security
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Stripe-Inspired Design
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" /> Multi-Generational Profiles
            </div>
          </div>
        </div>

        {/* HERO Visual Panel Simulation */}
        <div className="flex-1 w-full max-w-xl lg:max-w-none">
          <div className="relative border border-white/15 rounded-2xl bg-slate-900/80 p-6 shadow-2xl overflow-hidden glass-panel-dark">
            {/* Top decorative bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400 ml-2 font-mono">medflix-v1.0-live</span>
              </div>
              <span className="text-xs bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 rounded px-2 py-0.5 font-mono">
                System OK
              </span>
            </div>

            {/* Dashboard Mock Grid Inside Hero Panel */}
            <div className="space-y-4">
              {/* Family Avatar Select Row */}
              <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-semibold font-display">Active Family Core:</span>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 bg-blue-600/20 border border-blue-400/40 px-2 py-1 rounded-lg text-[10px] font-semibold">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Ramesh (Father)
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-[10px] text-slate-400">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Sunita (Mother)
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-[10px] text-slate-400">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Rahul (Admin)
                  </div>
                </div>
              </div>

              {/* Biomarker Trend Widget mock */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span className="font-semibold font-display">Ramesh Sharma: HbA1c Trend</span>
                  </div>
                  <span className="text-emerald-400 font-mono font-bold">-8.6% (Improved)</span>
                </div>
                {/* Micro Mini line graph */}
                <div className="h-16 flex items-end justify-between font-mono text-[9px] text-slate-400 px-2 pt-2 border-b border-white/10">
                  <div className="flex flex-col items-center gap-1"><span>8.3%</span><div className="w-4 bg-red-400/70 h-10 rounded-t" /><span>Jan</span></div>
                  <div className="flex flex-col items-center gap-1"><span>8.1%</span><div className="w-4 bg-orange-400/70 h-9 rounded-t" /><span>Feb</span></div>
                  <div className="flex flex-col items-center gap-1"><span>7.8%</span><div className="w-4 bg-orange-400/50 h-8 rounded-t" /><span>Mar</span></div>
                  <div className="flex flex-col items-center gap-1"><span>7.6%</span><div className="w-4 bg-blue-500/50 h-7 rounded-t" /><span>Apr</span></div>
                  <div className="flex flex-col items-center gap-1"><span>7.4%</span><div className="w-4 bg-emerald-500/90 h-6.5 rounded-t" /><span>May</span></div>
                </div>
                <div className="text-[11px] text-slate-300 italic flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span>AI: Hemoglobin binding stabilized at 7.4. Kidneys clearance requires close watch.</span>
                </div>
              </div>

              {/* Security overlap mock */}
              <div className="bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs">
                  <h4 className="font-bold text-rose-300 font-display">Drug Co-Ingestion Conflict Flagged</h4>
                  <p className="text-slate-300">Levothyroxine absorption reduced 45% by Sunita’s daily post-breakfast Calcium supplement.</p>
                </div>
              </div>

              {/* Tiny Metrics */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/5 border border-white/5 p-2 rounded-xl">
                  <div className="text-[10px] text-slate-400">Total Active Meds</div>
                  <div className="text-sm font-bold font-mono text-cyan-300">7 Prescriptions</div>
                </div>
                <div className="bg-white/5 border border-white/5 p-2 rounded-xl">
                  <div className="text-[10px] text-slate-400">Next Doctor Check</div>
                  <div className="text-xs font-semibold text-white truncate">Cardiology (Tomorrow)</div>
                </div>
                <div className="bg-white/5 border border-white/5 p-2 rounded-xl">
                  <div className="text-[10px] text-slate-400">AI Score Avg</div>
                  <div className="text-sm font-bold font-mono text-emerald-400">78 / 100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES / FEATURES SECTION */}
      <section id="features" className="bg-[#07162b] py-24 px-6 border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-display font-bold text-3xl sm:text-4xl">
              Engineered for Families who Value Safety
            </h2>
            <p className="text-slate-300 text-base md:text-lg">
              We took inspiration from high-fidelity finance applications and enterprise networks to design a health dashboard containing surgical precision and elegant safety guards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feat 1 */}
            <div className="bg-slate-900/50 border border-white/10 p-8 rounded-2xl hover:border-cyan-400/40 transition-all hover:translate-y-[-4px] relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 group-hover:bg-cyan-400 transition-colors" />
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 mb-6 font-bold">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-white">AI Report Analyzer</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Upload scans, blood test PDFs, and lab spreadsheets. Our model splits technical biomarkers and builds simple summaries in plain-English.
              </p>
            </div>

            {/* Feat 2 */}
            <div className="bg-slate-900/50 border border-white/10 p-8 rounded-2xl hover:border-cyan-400/40 transition-all hover:translate-y-[-4px] relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 group-hover:bg-cyan-300 transition-colors" />
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-white">Biomarker Longitudinal Records</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Connects isolated test scores into standard longitudinal trajectory graphs. Review cholesterol, sugar and renal health metrics over years.
              </p>
            </div>

            {/* Feat 3 */}
            <div className="bg-slate-900/50 border border-white/10 p-8 rounded-2xl hover:border-cyan-400/40 transition-all hover:translate-y-[-4px] relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-400 group-hover:bg-rose-400 transition-colors" />
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-400/20 flex items-center justify-center text-red-400 mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-white">Medication Safety Engine</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Cross-references active drugs against potential risk thresholds. Immediate notifications for timing block overlap, duplication, and kidney clearances.
              </p>
            </div>

            {/* Feat 4 */}
            <div className="bg-slate-900/50 border border-white/10 p-8 rounded-2xl hover:border-cyan-400/40 transition-all hover:translate-y-[-4px] relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 group-hover:bg-emerald-300 transition-colors" />
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-white">Multi-Generational Profiles</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Organize parents, spouses, and children in separate vaults. Perfect for children keeping trace of parents living thousands of miles away.
              </p>
            </div>

            {/* Feat 5 */}
            <div className="bg-slate-900/50 border border-white/10 p-8 rounded-2xl hover:border-cyan-400/40 transition-all hover:translate-y-[-4px] relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 group-hover:bg-indigo-300 transition-colors" />
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 mb-6">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-white">Interactive Medical Chat</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Connect your medical vault to our clinical-grade conversational helper. Ask what changed recently, compile graphs, or review technical details.
              </p>
            </div>

            {/* Feat 6 */}
            <div className="bg-slate-900/50 border border-white/10 p-8 rounded-2xl hover:border-cyan-400/40 transition-all hover:translate-y-[-4px] relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 group-hover:bg-amber-300 transition-colors" />
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-white">Refills & Smart Reminders</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Tracks remaining pill inventory, alerts automatically when critical medications are ending, and schedule automatic refills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HEALTH TIMELINE SHOWCASE SECTION */}
      <section id="showcase" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> High-Contrast Analytics
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Understand Trends, Instead of Isolated Anomalies
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              A single elevated sugar test can trigger panic. Our engine aggregates multiple historical laboratory results over time to give clinics and families the authentic directional picture.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActiveTab('hba1c')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-display cursor-pointer transition-all border ${
                  activeTab === 'hba1c'
                    ? 'bg-blue-600 text-white border-blue-400'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                }`}
              >
                HbA1c Glycemic Trend (Ramesh)
              </button>
              <button
                onClick={() => setActiveTab('chol')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-display cursor-pointer transition-all border ${
                  activeTab === 'chol'
                    ? 'bg-blue-600 text-white border-blue-400'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                }`}
              >
                Serum Cholesterol (Ramesh)
              </button>
              <button
                onClick={() => setActiveTab('bp')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-display cursor-pointer transition-all border ${
                  activeTab === 'bp'
                    ? 'bg-blue-600 text-white border-blue-400'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                }`}
              >
                Systolic BP Watch (Ramesh)
              </button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl">
            <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 glass-panel-dark relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-xs uppercase text-slate-500 font-mono tracking-wider">Visual Tracer</span>
                  <h4 className="font-bold text-slate-200 font-display">
                    {activeTab === 'hba1c' && 'Glycemic Trend Index (%)'}
                    {activeTab === 'chol' && 'Total Cholesterol Index (mg/dL)'}
                    {activeTab === 'bp' && 'BP Systolic Level (mmHg)'}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-mono">Reference Safe Range</span>
                  <div className="text-xs font-bold text-emerald-400 font-mono">
                    {activeTab === 'hba1c' && '< 5.7% (optimal)'}
                    {activeTab === 'chol' && '< 200 mg/dL'}
                    {activeTab === 'bp' && '90 - 120 mmHg'}
                  </div>
                </div>
              </div>

              {/* Render dynamic interactive SVG graph */}
              <div className="relative h-60 w-full">
                <svg className="w-full h-full" viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid lines */}
                  <line x1="10%" y1="20" x2="95%" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="10%" y1="80" x2="95%" y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="10%" y1="140" x2="95%" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="10%" y1="200" x2="95%" y2="200" stroke="rgba(255,255,255,0.08)" />

                  {/* Target reference safe background zone */}
                  <rect x="50" y={activeTab === 'hba1c' ? '180' : activeTab === 'chol' ? '150' : '160'} width="420" height="40" fill="rgba(34, 197, 94, 0.04)" />
                  <line x1="50" y1={activeTab === 'hba1c' ? '180' : activeTab === 'chol' ? '150' : '160'} x2="470" y2={activeTab === 'hba1c' ? '180' : activeTab === 'chol' ? '150' : '160'} stroke="rgba(34, 197, 94, 0.2)" strokeDasharray="3 3" />

                  {/* Path */}
                  <path
                    d={
                      activeTab === 'hba1c'
                        ? "M 50 40 L 130 55 L 210 75 L 290 85 L 370 110 L 450 130"
                        : activeTab === 'chol'
                        ? "M 50 30 L 130 45 L 210 65 L 290 90 L 370 120 L 450 150"
                        : "M 50 35 L 130 50 L 210 65 L 290 75 L 370 85 L 450 110"
                    }
                    stroke="url(#graphGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Area fill */}
                  <path
                    d={
                      activeTab === 'hba1c'
                        ? "M 50 40 L 130 55 L 210 75 L 290 85 L 370 110 L 450 130 L 450 200 L 50 200 Z"
                        : activeTab === 'chol'
                        ? "M 50 30 L 130 45 L 210 65 L 290 90 L 370 120 L 450 150 L 450 200 L 50 200 Z"
                        : "M 50 35 L 130 50 L 210 65 L 290 75 L 370 85 L 450 110 L 450 200 L 50 200 Z"
                    }
                    fill="url(#areaGrad)"
                  />

                  {/* Dots & Labels */}
                  {currentTrend.map((d, idx) => {
                    const x = 50 + idx * 80;
                    // map values to y ranges roughly
                    let y = 0;
                    if (activeTab === 'hba1c') y = 40 + idx * 18;
                    else if (activeTab === 'chol') y = 30 + idx * 24;
                    else y = 35 + idx * 15;

                    return (
                      <g key={idx}>
                        <circle cx={x} cy={y} r="5" fill="#22D3EE" stroke="#0B1F3A" strokeWidth="2" />
                        <text x={x} y={y - 12} fill="#A5F3FC" fontSize="9" fontFamily="monospace" textAnchor="middle">
                          {d.ramesh}
                        </text>
                        <text x={x} y="220" fill="#94A3B8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
                          {d.label}
                        </text>
                      </g>
                    );
                  })}

                  <defs>
                    <linearGradient id="graphGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#22D3EE" />
                    </linearGradient>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#0B1F3A" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 mt-4 text-xs flex items-center justify-between text-slate-300">
                <span>Clinician Opinion:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Direct positive response to Metformin
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI CHAT INTERACTION SHOWCASE SECTION */}
      <section id="ai-brain" className="bg-[#07162b] py-24 px-6 border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full max-w-xl order-2 lg:order-1">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 glass-panel-dark">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400">
                  <Bot className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 font-display">MedFlix Clinical Copilot</h4>
                  <p className="text-[10px] text-slate-400 font-mono">MODEL: GEMINI-3.5-DIAGNOS-SECURE</p>
                </div>
              </div>

              {/* Selection query blocks */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {chatShowcases.map((cs, index) => (
                  <button
                    key={index}
                    onClick={() => setChatType(index)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                      chatType === index
                        ? 'bg-blue-600/20 text-cyan-300 border-cyan-400/50'
                        : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    Query #{index + 1}
                  </button>
                ))}
              </div>

              {/* Chat Screen Simulator */}
              <div className="space-y-4 font-sans max-h-80 overflow-y-auto">
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-xl rounded-tr-none px-4 py-3 text-xs font-semibold max-w-[85%]">
                    {chatShowcases[chatType].q}
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-400/20 flex items-center justify-center text-cyan-300 font-black text-xs shrink-0 self-start">
                    AI
                  </div>
                  <div className="bg-slate-950/80 border border-white/5 rounded-xl rounded-tl-none px-4 py-3 text-xs text-slate-300 max-w-[85%] whitespace-pre-wrap leading-relaxed">
                    {chatShowcases[chatType].a}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
              <Bot className="w-3.5 h-3.5" /> Interactive Med Chat
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight">
              A Clinically-Informed Assistive Care Core
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              Say goodbye to frantic web-searches regarding clinical jargon. MedFlix is contextually loaded with your entire family’s historical tests, alerts, and active drugs, helping you make sense of terminology in seconds.
            </p>
            <ul className="space-y-3 pt-2 text-sm text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Translates lab anomalies to human, safe jargon.
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Fully cross-references previous blood panels automatically.
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Secure local processing – never sells details.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAMILY SAFETY PORTAL MODEL */}
      <section id="family" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-[80px]" />

          <div className="flex-1 space-y-6">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              The Family Safety Administrator Model
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              Senior family members shouldn't have to carry the load of managing complex drug timing intervals, doctor reviews, and prescription refills. 
            </p>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              MedFlix appoints a **Family Admin** (you) who can upload reports on behalf of members, receive automated drug timing clash warnings, update active chemical dosage changes, and maintain high safety parity.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80" alt="Rahul" className="w-10 h-10 rounded-full border-2 border-slate-900 ring-2 ring-blue-500" />
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80" alt="Ramesh" className="w-10 h-10 rounded-full border-2 border-slate-900 ring-2 ring-cyan-400" />
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80" alt="Sunita" className="w-10 h-10 rounded-full border-2 border-slate-900 ring-2 ring-emerald-400" />
              </div>
              <span className="text-xs text-slate-300 font-semibold font-display">Rahul Sharma has full platform stewardship</span>
            </div>
          </div>

          <div className="w-full lg:w-fit shrink-0 bg-slate-950/40 p-6 rounded-2xl border border-white/5 space-y-4 max-w-sm">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Test Admin Login Available</span>
              <h4 className="font-bold text-slate-200 font-display">Simulated Sandbox Sandbox</h4>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5 flex justify-between font-mono">
                <span className="text-slate-400">Username:</span>
                <span className="text-white font-bold">user</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5 flex justify-between font-mono">
                <span className="text-slate-400">Password:</span>
                <span className="text-white font-bold">user</span>
              </div>
            </div>
            <button
              onClick={onLogin}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold py-3 rounded-xl transition-all cursor-pointer text-center block"
            >
              Sign In Sandbox Core
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold text-white">M</div>
              <span className="font-display font-bold text-xl">Med<span className="text-blue-400">Flix</span></span>
            </div>
            <p className="text-xs text-slate-400">
              © 2026 MedFlix Platforms Inc. For presentation and sandbox testing limits.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="hover:text-cyan-400 transition-colors pointer-events-none">Privacy Vault Standards</span>
            <span className="hover:text-cyan-400 transition-colors pointer-events-none">AI Guideline Safety</span>
            <span className="hover:text-cyan-400 transition-colors pointer-events-none">Terms of Sandbox Use</span>
            <span className="text-slate-500">Bangalore, Tech Innovation Hub</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
