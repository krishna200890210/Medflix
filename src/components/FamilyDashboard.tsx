/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  ShieldAlert, 
  Bot, 
  Sparkles, 
  Calendar, 
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  AlertOctagon,
  FileSpreadsheet
} from 'lucide-react';
import { FamilyMember, HealthAlert, Medication, HealthReport } from '../types';

interface FamilyDashboardProps {
  members: FamilyMember[];
  alerts: HealthAlert[];
  meds: Medication[];
  reports: HealthReport[];
  onSelectMember: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export default function FamilyDashboard({ 
  members, 
  alerts, 
  meds, 
  reports, 
  onSelectMember, 
  onNavigateTab 
}: FamilyDashboardProps) {

  // Active unacknowledged high/medium severity alerts
  const activeAlerts = alerts.filter(a => !a.acknowledged);

  return (
    <div className="space-y-8">
      {/* Alert Header Box if critical alerts exist */}
      {activeAlerts.length > 0 && (
        <div className="bg-gradient-to-r from-red-950/40 to-[#0B1F3A] border border-red-500/20 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-400/20 flex items-center justify-center text-red-400 shrink-0">
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-base text-red-200">Active Family Safety Warnings ({activeAlerts.length})</h3>
              <p className="text-xs text-slate-300">
                The Medication Risk Engine has isolated timings and deficiency warnings which require family attention.
              </p>
            </div>
          </div>
          <button 
            onClick={() => onNavigateTab('Notifications')}
            className="text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap self-end md:self-auto"
          >
            Review Safety center →
          </button>
        </div>
      )}

      {/* Hero Welcome Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/30 border border-white/5 rounded-2xl p-6 glass-panel">
        <div className="space-y-1">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Active Stewardship Module</span>
          <h1 className="font-display font-semibold text-2xl text-slate-100">Welcome back, Rahul Sharma</h1>
          <p className="text-xs text-slate-400">Managing health coordinates for Ramesh Sharma (Father) and Sunita Sharma (Mother).</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigateTab('Reports')}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" /> Upload New Report
          </button>
          <button 
            onClick={() => onNavigateTab('AI Assistant')}
            className="bg-slate-950/50 hover:bg-slate-950 text-slate-300 border border-white/10 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-cyan-400 animate-bounce" /> Brain Companion
          </button>
        </div>
      </div>

      {/* Main Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Family Members Overview cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center pb-2">
            <h2 className="font-display font-semibold text-lg text-slate-200 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" /> Active Family Vaults
            </h2>
            <button 
              onClick={() => onNavigateTab('Family Members')}
              className="text-xs text-cyan-400 hover:underline cursor-pointer font-medium"
            >
              Manage Vaults →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((m) => {
              const scoreColor = m.healthScore >= 80 ? 'text-emerald-400 border-emerald-500/20' : m.healthScore >= 70 ? 'text-cyan-400 border-cyan-500/20' : 'text-amber-400 border-amber-500/20';
              const isRamesh = m.id === 'ramesh';
              const isSunita = m.id === 'sunita';

              return (
                <div 
                  key={m.id}
                  onClick={() => onSelectMember(m.id)}
                  className="bg-slate-900/60 border border-white/10 hover:border-cyan-400/40 rounded-2xl p-4 transition-all hover:translate-y-[-2px] cursor-pointer space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <img 
                        src={m.avatarUrl} 
                        alt={m.name} 
                        className="w-11 h-11 rounded-xl object-cover ring-2 ring-blue-500/20" 
                      />
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${scoreColor}`}>
                        Score {m.healthScore}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="font-display font-semibold text-sm text-slate-100">{m.name}</h4>
                      <p className="text-[10px] text-slate-400">{m.role} • Age {m.age}</p>
                    </div>

                    {/* Conditions preview */}
                    <div className="flex flex-wrap gap-1">
                      {m.conditions.slice(0, 2).map((c, i) => (
                        <span key={i} className="text-[9px] bg-white/5 border border-white/5 text-slate-300 px-1.5 py-0.5 rounded">
                          {c}
                        </span>
                      ))}
                      {m.conditions.length > 2 && (
                        <span className="text-[9px] text-slate-400 font-mono">+{m.conditions.length - 2}</span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-3 mt-2 text-[10px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Last Upload:</span>
                      <span className="text-slate-300 font-mono">{m.lastReportDate}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Status:</span>
                      <span className="font-semibold text-cyan-400">{m.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Insights & Trajectory Panel */}
          <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-4 glass-panel-dark">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-widest font-bold">Dynamic AI Health Summary</span>
              <span className="text-[10px] text-slate-500 font-mono">UPDATED 4H AGO</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <div className="text-xs space-y-1">
                  <span className="font-bold text-slate-200">Ramesh Sharma Cholesterol Reduction:</span>
                  <p className="text-slate-400">
                    Lipid clearance fell 14% to 210 mg/dL under 10mg Rosuvastatin morning routine. LDL remains slightly border-high (122).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <div className="text-xs space-y-1">
                  <span className="font-bold text-slate-200">Ramesh Sharma Glycemic Balance Index:</span>
                  <p className="text-slate-400">
                    HbA1c declined successfully to 7.4% from 8.1%. Food spikes have flattened since Metformin twice-daily dosage stabilization.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                <div className="text-xs space-y-1">
                  <span className="font-bold text-slate-200">Sunita Sharma Osteoarthritis Knee Strain:</span>
                  <p className="text-slate-400">
                    Knee joint space inflammation is active. Highly correlates with a severe Vitamin D deficit (18.2 ng/mL). Starting weekly booster immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Critical Alerts & Schedules */}
        <div className="space-y-6">
          <div className="pb-2">
            <h2 className="font-display font-semibold text-lg text-slate-200 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> Critical Safety Observations
            </h2>
          </div>

          <div className="space-y-4">
            {activeAlerts.slice(0, 3).map((a) => {
              const border = a.type === 'critical' ? 'border-red-500/20 bg-red-950/10' : 'border-amber-500/20 bg-amber-950/10';
              const text = a.type === 'critical' ? 'text-red-300' : 'text-amber-300';
              const badge = a.type === 'critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30';

              return (
                <div key={a.id} className={`p-4 rounded-xl border ${border} space-y-2`}>
                  <div className="flex justify-between items-start">
                    <span className={`text-[9px] font-mono uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${badge}`}>
                      {a.category.replace('_', ' ')}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">{a.date}</span>
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold font-display ${text}`}>{a.title}</h4>
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-normal">
                      {a.description}
                    </p>
                  </div>
                  <div className="text-[10px] text-cyan-400 font-semibold cursor-pointer select-none hover:underline flex items-center gap-1 pt-1" onClick={() => onNavigateTab('Notifications')}>
                    Review interaction warnings <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}

            {activeAlerts.length === 0 && (
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 text-center text-slate-500 text-xs">
                No outstanding clinical safety flags. Good job!
              </div>
            )}
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-5 space-y-4 glass-panel-dark">
            <h3 className="font-display font-bold text-sm text-slate-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" /> Upcoming Care Schedule
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3 bg-white/5 border border-white/5 p-2.5 rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/20 flex flex-col items-center justify-center text-blue-400 text-[10px] shrink-0 font-mono">
                  <span className="font-bold text-xs">24</span>
                  <span>May</span>
                </div>
                <div className="space-y-0.5 truncate">
                  <span className="font-bold text-slate-200 block truncate">Dr. Srinivas (Cardio)</span>
                  <p className="text-[10px] text-slate-400 truncate">Ramesh • 11:30 AM • Fortis</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 border border-white/5 p-2.5 rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/25 flex flex-col items-center justify-center text-cyan-400 text-[10px] shrink-0 font-mono">
                  <span className="font-bold text-xs">28</span>
                  <span>May</span>
                </div>
                <div className="space-y-0.5 truncate">
                  <span className="font-bold text-slate-200 block truncate">Refill: Rosuvastatin</span>
                  <p className="text-[10px] text-slate-400 truncate">Ramesh • Bedtime tablet (5 left)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 border border-white/5 p-2.5 rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/20 flex flex-col items-center justify-center text-blue-400 text-[10px] shrink-0 font-mono">
                  <span className="font-bold text-xs">02</span>
                  <span>Jun</span>
                </div>
                <div className="space-y-0.5 truncate">
                  <span className="font-bold text-slate-200 block truncate">Dr. Leela Rao (Thyroid)</span>
                  <p className="text-[10px] text-slate-400 truncate">Sunita • 04:00 PM • Manipal</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => onNavigateTab('Appointments')}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold py-2 rounded-xl transition-all cursor-pointer text-center"
            >
              Full Calendar Calendar
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
