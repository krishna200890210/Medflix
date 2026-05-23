/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Clock, 
  ShieldAlert, 
  Activity, 
  Award, 
  HelpCircle, 
  Sparkles, 
  FileText, 
  CheckCircle,
  Stethoscope,
  Info
} from 'lucide-react';
import { BiomarkerData, TimelineEvent, HealthReport, FamilyMember } from '../types';

interface AnalyticsModuleProps {
  biomarkers: BiomarkerData[];
  timelineEvents: TimelineEvent[];
  reports: HealthReport[];
  members: FamilyMember[];
}

export default function AnalyticsModule({ 
  biomarkers, 
  timelineEvents, 
  reports, 
  members 
}: AnalyticsModuleProps) {

  const [activeMember, setActiveMember] = useState<'ramesh' | 'sunita'>('ramesh');
  const [activeMarker, setActiveMarker] = useState<string>('HbA1c');
  const [hoveredPoint, setHoveredPoint] = useState<{ idx: number; val: number; date: string } | null>(null);
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState<TimelineEvent | null>(null);

  // Mapped markers for each active tracking patient
  const markerOptionsMapping = {
    ramesh: ['HbA1c', 'Cholesterol', 'BP (Systolic)', 'Serum Creatinine'],
    sunita: ['TSH (Thyroid)', 'Vitamin D']
  };

  // Find dynamic biomarker tracking records
  const currentBiomarkerData = biomarkers.find(
    b => b.memberId === activeMember && b.marker.toLowerCase().startsWith(activeMarker.toLowerCase().slice(0, 4))
  );

  const history = currentBiomarkerData?.history || [];

  // Comparison metrics for report engine
  const monthlyComparisons = [
    { name: 'HbA1c Mean Glycemia', improvement: true, change: '-8.6%', desc: 'Ramesh Sharma: 8.1% → 7.4% (Quarterly target achieved)' },
    { name: 'Total Cholesterol', improvement: true, change: '-14.2%', desc: 'Ramesh Sharma: 245 → 210 mg/dL (Statins active)' },
    { name: 'Vitamin D Ingestion', improvement: false, change: '-4.2%', desc: 'Sunita Sharma: 19 → 18.2 ng/mL (Severe deficit remains)' },
    { name: 'TSH Endocrine Thyroid', improvement: true, change: '-4.0%', desc: 'Sunita Sharma: 2.5 → 2.41 mIU/L (High stability)' }
  ];

  return (
    <div className="space-y-8">
      {/* Header Select Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/30 p-5 rounded-2xl border border-white/5">
        <div className="space-y-1">
          <h2 className="font-display font-semibold text-xl text-white">Biomarker Analytics Engine</h2>
          <p className="text-xs text-slate-400">Longitudinal tracing models aggregating multiple historic laboratory sheets.</p>
        </div>

        <div className="bg-slate-950/40 p-1 rounded-xl border border-white/5 flex">
          <button
            onClick={() => {
              setActiveMember('ramesh');
              setActiveMarker('HbA1c');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-display cursor-pointer transition-all ${
              activeMember === 'ramesh' ? 'bg-blue-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            Ramesh (Father)
          </button>
          <button
            onClick={() => {
              setActiveMember('sunita');
              setActiveMarker('TSH (Thyroid)');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-display cursor-pointer transition-all ${
              activeMember === 'sunita' ? 'bg-blue-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            Sunita (Mother)
          </button>
        </div>
      </div>

      {/* Primary Analytics Graph Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* GRAPH VIEW PORT (7 Columns) */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-white/10 rounded-2xl p-6 glass-panel-dark space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2.5">
              {markerOptionsMapping[activeMember].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setActiveMarker(opt)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-display transition-all border cursor-pointer ${
                    activeMarker === opt
                      ? 'bg-blue-600 text-white border-blue-400'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Current Level</span>
              <span className="text-xl font-bold text-cyan-400 font-mono tracking-tight">
                {history.length > 0 ? history[history.length - 1].value : '--'} 
                {activeMarker === 'HbA1c' ? '%' : activeMarker.includes('Cholesterol') || activeMarker.includes('Creatinine') ? ' mg/dL' : activeMarker.includes('TSH') ? ' mIU/L' : ' ng/mL'}
              </span>
            </div>
          </div>

          {/* Interactive SVG Tracing Chart */}
          <div className="relative h-64 bg-slate-950/20 border border-white/5 p-4 rounded-xl flex items-center justify-center">
            {history.length > 0 ? (
              <svg className="w-full h-full" viewBox="0 0 560 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal reference lines */}
                <line x1="10%" y1="10" x2="95%" y2="10" stroke="rgba(255,255,255,0.02)" strokeDasharray="3 3" />
                <line x1="10%" y1="60" x2="95%" y2="60" stroke="rgba(255,255,255,0.02)" strokeDasharray="3 3" />
                <line x1="10%" y1="110" x2="95%" y2="110" stroke="rgba(255,255,255,0.02)" strokeDasharray="3 3" />
                <line x1="10%" y1="160" x2="95%" y2="160" stroke="rgba(255,255,255,0.05)" />

                {/* Drawn path */}
                <path
                  d={
                    activeMarker === 'HbA1c'
                      ? "M 56 120 L 149 111 L 242 101 L 335 96 L 428 87 L 521 78.5"
                      : activeMarker === 'Cholesterol'
                      ? "M 56 140 L 149 135 L 242 128 L 335 119 L 428 111 L 521 101.5"
                      : activeMarker.includes('BP')
                      ? "M 56 130 L 149 122 L 242 114 L 335 110 L 428 106 L 521 94.5"
                      : activeMarker.includes('Serum')
                      ? "M 56 110 L 149 105 L 242 90 L 335 81 L 428 75 L 521 72.5"
                      : activeMarker.includes('TSH')
                      ? "M 56 150 L 149 122 L 242 94 L 335 82 L 428 73 L 521 70.0"
                      : "M 56 130 L 149 120 L 242 145 L 335 160 L 428 178 L 521 185.0" // Vitamin D
                  }
                  stroke="url(#analyticGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Connected Area gradient */}
                <path
                  d={
                    activeMarker === 'HbA1c'
                      ? "M 56 120 L 149 111 L 242 101 L 335 96 L 428 87 L 521 78.5 L 521 160 L 56 160 Z"
                      : activeMarker === 'Cholesterol'
                      ? "M 56 140 L 149 135 L 242 128 L 335 119 L 428 111 L 521 101.5 L 521 160 L 56 160 Z"
                      : activeMarker.includes('BP')
                      ? "M 56 130 L 149 122 L 242 114 L 335 110 L 428 106 L 521 94.5 L 521 160 L 56 160 Z"
                      : activeMarker.includes('Serum')
                      ? "M 56 110 L 149 105 L 242 90 L 335 81 L 428 75 L 521 72.5 L 521 160 L 56 160 Z"
                      : activeMarker.includes('TSH')
                      ? "M 56 150 L 149 122 L 242 94 L 335 82 L 428 73 L 521 70.0 L 521 160 L 56 160 Z"
                      : "M 56 130 L 149 120 L 242 145 L 335 160 L 428 178 L 521 185.0 L 521 160 L 56 160 Z"
                  }
                  fill="url(#analyticArea)"
                />

                {/* Interaction nodes logic */}
                {history.map((pt, idx) => {
                  const x = 56 + idx * 93;
                  let y = 0;
                  if (activeMarker === 'HbA1c') y = 120 - idx * 8.3;
                  else if (activeMarker === 'Cholesterol') y = 140 - idx * 7.7;
                  else if (activeMarker.includes('BP')) y = 130 - idx * 7.1;
                  else if (activeMarker.includes('Serum')) y = 110 - idx * 7.5;
                  else if (activeMarker.includes('TSH')) y = 150 - idx * 16.0;
                  else y = 130 + idx * 11.0; // Vitamin D dropping

                  return (
                    <g 
                      key={idx}
                      onMouseEnter={() => setHoveredPoint({ idx, val: pt.value, date: pt.date })}
                      onMouseLeave={() => setHoveredPoint(null)}
                      className="cursor-pointer group"
                    >
                      <circle cx={x} cy={y} r="6" fill="#22D3EE" stroke="#0B1F3A" strokeWidth="2" className="transition-all scale-100 group-hover:scale-130" />
                      <circle cx={x} cy={y} r="12" fill="rgba(34, 211, 238, 0.15)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <text x={x} y={y - 14} fill="#A5F3FC" fontSize="10" fontFamily="monospace" textAnchor="middle" className="font-semibold select-none">
                        {pt.value}
                      </text>
                      <text x={x} y="180" fill="#94A3B8" fontSize="9" textAnchor="middle" className="select-none">
                        {pt.date}
                      </text>
                    </g>
                  );
                })}

                <defs>
                  <linearGradient id="analyticGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                  <linearGradient id="analyticArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#0B1F3A" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            ) : (
              <span className="text-xs text-slate-500">No telemetry indicators loaded.</span>
            )}

            {/* Simulated Live Tooltip bubble */}
            {hoveredPoint && (
              <div className="absolute top-2 left-2 bg-slate-950/95 border border-cyan-500/30 rounded px-2.5 py-1 text-[10px] text-slate-200 font-mono shadow-md">
                Ref Date: <strong>{hoveredPoint.date}</strong> | Telemetry: <strong className="text-cyan-400">{hoveredPoint.val}</strong>
              </div>
            )}
          </div>

          <div className="bg-slate-950/40 p-3.5 rounded-xl border border-white/5 text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-cyan-400" /> AI Trajectory Analysis
            </span>
            <span className="font-medium text-emerald-400 font-display">
              {activeMarker === 'HbA1c' && '✓ Constant step-down values indicate high dietary glucose discipline.'}
              {activeMarker === 'Cholesterol' && '✓ Statins are blocking lipid synthesis in accordance with plan.'}
              {activeMarker.includes('BP') && '✓ Hypertension watch is verified inside standard clinical ranges.'}
              {activeMarker.includes('Serum') && '⚠ Micro-impairments in GFR. Protect from dehydration.'}
              {activeMarker.includes('TSH') && '✓ Endocrine thyroid load is fully stabilized under 75mcg.'}
              {activeMarker.includes('Vitamin') && '⚠ High osteo-pain correlates with severe active Vitamin D drops (18.2).'}
            </span>
          </div>
        </div>

        {/* RISK ESTIMATION & PREFICTION CARD (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-4">
            <h3 className="font-display font-semibold text-sm text-slate-200">AI Risk Projections</h3>
            
            <div className="space-y-4 text-xs font-sans">
              
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-300">Glycemic Diabetes Risk</span>
                  <span className="text-emerald-400 font-mono font-bold">-12.5% Down (Safer)</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[60%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-300">Hypertension Cardiopulmonary Watch</span>
                  <span className="text-slate-400 font-mono font-bold">Stable (135/90)</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-[45%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-300">Renal Clearance Filtration Load</span>
                  <span className="text-amber-400 font-mono font-bold">Medium (eGFR 58)</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[70%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-rose-300">Vitamin D deficiency (Sunita)</span>
                  <span className="text-rose-400 font-mono font-bold">Critical (18.2)</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 w-[85%]" />
                </div>
              </div>

            </div>
          </div>

          {/* Quick comparison log */}
          <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-3.5">
            <h3 className="font-display font-semibold text-sm text-slate-200">Biomarker delta tracker</h3>

            <div className="space-y-2.5 text-xs">
              {monthlyComparisons.map((item, index) => (
                <div key={index} className="bg-white/5 p-2.5 border border-white/5 rounded-lg flex items-start gap-2.5">
                  {item.improvement ? (
                    <TrendingDown className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5 truncate">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-semibold text-slate-200">{item.name}</span>
                      <span className={`text-[10px] font-mono font-bold whitespace-nowrap pl-2 ${item.improvement ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {item.change}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* HORIZONTAL HEALTH TIMELINE SYSTEM */}
      <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 glass-panel-dark space-y-6">
        <div className="space-y-1">
          <h3 className="font-display font-semibold text-sm text-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" /> Longitudinal Family Health Timeline
          </h3>
          <p className="text-xs text-slate-400">Click any chronic milestone node to review diagnostics or medical context references.</p>
        </div>

        {/* Timeline Horizontal Line Nodes */}
        <div className="relative pt-6 pb-2">
          {/* Main Connector line */}
          <div className="absolute top-[48px] left-[5%] right-[5%] h-0.5 bg-white/10" />

          <div className="flex justify-between items-start overflow-x-auto pb-4 gap-4 px-2">
            {timelineEvents.map((evt) => {
              const active = selectedTimelineEvent?.id === evt.id;
              let dotBg = 'bg-blue-500';
              if (evt.type === 'alert') dotBg = 'bg-red-500';
              else if (evt.type === 'medication_change') dotBg = 'bg-amber-500';
              else if (evt.type === 'report') dotBg = 'bg-emerald-500';

              return (
                <div 
                  key={evt.id}
                  onClick={() => setSelectedTimelineEvent(evt)}
                  className="flex flex-col items-center text-center shrink-0 w-32 cursor-pointer group"
                >
                  <span className="text-[9px] font-mono text-slate-500 mb-2">{evt.date}</span>
                  
                  {/* Outer glow rings */}
                  <div className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center bg-slate-950 border border-white/20 group-hover:border-cyan-400 transition-colors">
                    <div className={`w-2.5 h-2.5 rounded-full ${dotBg} transition-transform ${active ? 'scale-125' : 'group-hover:scale-110'}`} />
                  </div>

                  <span className={`text-[11px] font-bold mt-3 font-display leading-tight truncate w-full ${active ? 'text-cyan-400 underline font-black' : 'text-slate-300 group-hover:text-white'}`}>
                    {evt.title}
                  </span>
                  <span className="text-[9px] text-slate-500 capitalize">{evt.type.replace('_', ' ')}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Timeline Node Expanded Detail drawer */}
        <AnimatePresence mode="wait">
          {selectedTimelineEvent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-slate-950/70 p-4 rounded-xl border border-cyan-500/15 flex gap-4 text-xs font-sans"
            >
              <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h4 className="font-bold text-slate-200">Expanded Detail: {selectedTimelineEvent.title}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{selectedTimelineEvent.date}</span>
                </div>
                <p className="text-slate-300 leading-normal">
                  {selectedTimelineEvent.description}
                </p>
                <div className="flex gap-4 text-[10px] pt-1">
                  <span className="text-slate-500">Member ID: <strong className="text-slate-300 uppercase">{selectedTimelineEvent.memberId}</strong></span>
                  <span className="text-slate-500">Category Tag: <strong className="text-slate-300 capitalize">{selectedTimelineEvent.type.replace('_', ' ')}</strong></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
