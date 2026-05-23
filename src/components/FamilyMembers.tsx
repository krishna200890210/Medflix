/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Activity, 
  Award, 
  ShieldAlert, 
  Sliders, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Briefcase, 
  Tag, 
  PieChart, 
  CheckCircle,
  FileText
} from 'lucide-react';
import { FamilyMember, Medication, HealthReport } from '../types';

interface FamilyMembersProps {
  members: FamilyMember[];
  medications: Medication[];
  reports: HealthReport[];
  selectedMemberId: string | null;
  onSelectMember: (id: string | null) => void;
}

export default function FamilyMembers({ 
  members, 
  medications, 
  reports, 
  selectedMemberId, 
  onSelectMember 
}: FamilyMembersProps) {

  // Find currently selected member if any
  const selectedMember = members.find(m => m.id === selectedMemberId);

  // Active member meds
  const activeMeds = medications.filter(med => med.memberId === selectedMemberId);

  // Active member reports
  const activeReports = reports.filter(rep => rep.memberId === selectedMemberId);

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!selectedMember ? (
          /* LIST VIEW */
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-display font-semibold text-xl text-white">Family Profiles Directory</h2>
              <p className="text-xs text-slate-400">Select any family profile to view full clinical conditions, prescription timings, and AI-summarized health scores.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((m) => {
                const memberMeds = medications.filter(med => med.memberId === m.id);
                const scoreColor = m.healthScore >= 80 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : m.healthScore >= 70 ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20';

                return (
                  <div 
                    key={m.id}
                    onClick={() => onSelectMember(m.id)}
                    className="bg-slate-900/60 border border-white/10 hover:border-cyan-400/55 rounded-2xl p-6 transition-all hover:translate-y-[-2px] cursor-pointer space-y-5 flex flex-col justify-between glass-panel"
                  >
                    <div className="space-y-4">
                      <div className="flex gap-4 items-center">
                        <img 
                          src={m.avatarUrl} 
                          alt={m.name} 
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-white/5" 
                        />
                        <div className="space-y-0.5">
                          <h3 className="font-display font-bold text-base text-slate-100">{m.name}</h3>
                          <span className="text-xs text-slate-400">{m.role} • Age {m.age}</span>
                        </div>
                      </div>

                      {/* Health score and badge */}
                      <div className="flex gap-3 items-center">
                        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${scoreColor}`}>
                          Index Score: {m.healthScore}
                        </span>
                        <span className="text-xs text-cyan-300 font-semibold">{m.status}</span>
                      </div>

                      {/* Active watch conditions */}
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[10px] uppercase text-slate-500 font-mono tracking-wider">Clinically Monitored:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {m.conditions.map((c, i) => (
                            <span key={i} className="text-[10px] bg-white/5 border border-white/5 text-slate-300 px-2 py-0.5 rounded-md">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-4 space-y-2 text-xs text-slate-400">
                      <div className="flex justify-between">
                        <span>Associated Prescriptions:</span>
                        <span className="text-slate-200 font-mono font-semibold">{memberMeds.length} items active</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Latest Diagnostic Load:</span>
                        <span className="text-slate-200 font-mono">{m.lastReportDate}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* DETAILED PATIENT snapshot */
          <div className="space-y-8">
            {/* Top Bar with Back Button */}
            <div className="flex justify-between items-center bg-slate-950/40 p-3 rounded-xl border border-white/5">
              <button
                onClick={() => onSelectMember(null)}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Return to directory
              </button>
              <div className="flex gap-2">
                <span className="text-xs text-slate-400">Active Profile View:</span>
                <span className="text-xs font-bold text-cyan-400">{selectedMember.name}</span>
              </div>
            </div>

            {/* Profile Summary Card (Main Details) */}
            <div className="bg-gradient-to-br from-[#0B1F3A] to-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
              <img 
                src={selectedMember.avatarUrl} 
                alt={selectedMember.name} 
                className="w-24 h-24 md:w-28 md:get-28 rounded-2xl object-cover ring-4 ring-blue-500/20 shadow-xl border border-white/10 shrink-0" 
              />
              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase bg-blue-500/10 border border-blue-400/20 text-blue-300 px-2.5 py-0.5 rounded-full tracking-wider inline-block">
                    {selectedMember.role}
                  </span>
                  <h1 className="font-display font-semibold text-2xl text-slate-100">{selectedMember.name}</h1>
                  <p className="text-xs text-emerald-400 font-medium italic">"{selectedMember.statusText}"</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-slate-300 bg-slate-950/40 border border-white/5 p-4 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Age Tracker</span>
                    <span className="font-bold text-white text-sm">{selectedMember.age} Years</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Blood Group</span>
                    <span className="font-bold text-white text-sm">{selectedMember.bloodGroup}</span>
                  </div>
                  {selectedMember.email && (
                    <div className="col-span-2 md:col-span-1">
                      <span className="text-[10px] text-slate-500 block uppercase">Email Coordinates</span>
                      <span className="text-white truncate block text-[11px]">{selectedMember.email}</span>
                    </div>
                  )}
                  {selectedMember.phone && (
                    <div className="col-span-2 md:col-span-1">
                      <span className="text-[10px] text-slate-500 block uppercase">Phone Contact</span>
                      <span className="text-white text-[11px]">{selectedMember.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sub content grids */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LEFT COLUMN: Clinical Conditions & General Info */}
              <div className="space-y-6">
                
                {/* Basic Demography */}
                <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="font-display font-bold text-sm text-slate-200">Vault Clinical Properties</h3>
                  
                  <div className="space-y-3 text-xs">
                    {selectedMember.occupation && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <Briefcase className="w-4 h-4 text-slate-500" />
                        <span>Profession: <strong>{selectedMember.occupation}</strong></span>
                      </div>
                    )}
                    {selectedMember.location && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span>HQ Location: <strong>{selectedMember.location}</strong></span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4 text-red-400" />
                      <span>SOS Contact: <strong>{selectedMember.emergencyContact}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Allergies Defense */}
                <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-3">
                  <h3 className="font-display font-bold text-sm text-slate-200 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400" /> Allergy Protective Wall
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMember.allergies.map((all, i) => (
                      <span key={i} className="text-xs bg-red-500/15 border border-red-500/20 text-red-300 px-2 py-1 rounded-lg font-bold font-mono">
                        {all}
                      </span>
                    ))}
                    {selectedMember.allergies.length === 0 && (
                      <span className="text-xs text-slate-500">None declared</span>
                    )}
                  </div>
                </div>

                {/* Mapped Chronic Diagnoses */}
                <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-3">
                  <h3 className="font-display font-bold text-sm text-slate-200">Active Clinic watchlists</h3>
                  <div className="space-y-2">
                    {selectedMember.conditions.map((cond, i) => (
                      <div key={i} className="bg-white/5 border border-white/5 p-2.5 rounded-lg text-xs font-semibold text-slate-200 flex justify-between items-center">
                        <span>{cond}</span>
                        <CheckCircle className="w-4 h-4 text-cyan-400" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT AND MIDDLE COLUMNS combined - Active Medications & Report summary */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* AI generated clinical evaluation details */}
                <div className="bg-gradient-to-br from-blue-950/20 to-slate-900 border border-blue-500/20 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-sm text-cyan-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> MedFlix AI Clinical Synthesis
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono">AUTONOMOUS GENERATION</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {selectedMember.id === 'ramesh' && (
                      "Ramesh exhibits a highly stable diabetic response on adjusted twice-daily Metformin 500mg, mapping your glycemic indices successfully downwards over 6 months from 8.1% to 7.4%. Total cholesterol reduction (210 mg/dL) shows strong feedback response to oral Rosuvastatin bedtime dosing. The primary critical safety observation is mild stage 2 renal impairment indicators (Serum Creatinine 1.31 mg/dL, GFR 58). Restrict extreme sodium intake and prevent hydration lags."
                    )}
                    {selectedMember.id === 'sunita' && (
                      "Sunita exhibits stable endocrine parameters under 75mcg Levothyroxine (TSH beautiful at 2.41). However, the major driver of her severe Osteoarthritis knee friction flares is a chronic, non-trivial Vitamin D deficit (18.2 ng/mL). She requires weekly 60,000 IU supplements to stabilize cellular skeletal calcium binding. Admin notice: levothyroxine absorption is reduced by concurrent calcium. Separate schedules by 4 hours."
                    )}
                    {selectedMember.id === 'rahul' && (
                      "Rahul demonstrates clean metabolic health (HbA1c 5.2%, kidney metrics robust). Borderline indoor screen eye strain and indoor posture require regular visual breaks (20-20-20 rule) and weekend Vitamin D3 boosters."
                    )}
                  </p>
                </div>

                {/* Active Prescriptions list */}
                <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="font-display font-semibold text-sm text-slate-200 flex items-center justify-between">
                    <span>Active Dosing Schedules</span>
                    <span className="text-xs font-mono font-normal text-slate-400">({activeMeds.length} Prescriptions)</span>
                  </h3>

                  <div className="space-y-3">
                    {activeMeds.map((med) => {
                      const refillPercent = (med.pillsRemaining / med.pillsTotal) * 100;
                      const barFill = refillPercent < 25 ? 'bg-rose-500' : 'bg-cyan-500';

                      return (
                        <div key={med.id} className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase font-mono bg-blue-500/10 border border-blue-400/20 text-blue-300 px-1.5 py-0.5 rounded inline-block">
                              Dosage: {med.dosage}
                            </span>
                            <h4 className="font-bold text-xs text-slate-200">{med.name}</h4>
                            <p className="text-[10px] text-slate-400">{med.frequency}</p>
                          </div>
                          
                          <div className="text-right space-y-1.5 w-full sm:w-28 text-xs font-mono shrink-0">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-slate-500">Inventory:</span>
                              <span className="text-slate-300 font-bold">{med.pillsRemaining} / {med.pillsTotal} Left</span>
                            </div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                              <div className={`h-full ${barFill} transition-all`} style={{ width: `${refillPercent}%` }} />
                            </div>
                            <span className="text-[9px] text-slate-500 block">Refill target: {med.refillDate}</span>
                          </div>
                        </div>
                      );
                    })}

                    {activeMeds.length === 0 && (
                      <div className="text-center py-6 text-slate-500 text-xs">
                        No active medication rosters mapped to this vault.
                      </div>
                    )}
                  </div>
                </div>

                {/* Associated Lab PDF index */}
                <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="font-display font-semibold text-sm text-slate-200">Associated Vault PDF Diagnostics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeReports.map((rep) => (
                      <div key={rep.id} className="bg-slate-950/40 p-3.5 rounded-xl border border-white/5 flex gap-3">
                        <FileText className="w-8 h-8 text-cyan-400 shrink-0 mt-0.5" />
                        <div className="space-y-1 truncate">
                          <span className="font-semibold text-xs text-slate-200 block truncate">{rep.reportType}</span>
                          <span className="text-[9px] text-slate-500 font-mono block">{rep.hospitalName} • {rep.date}</span>
                        </div>
                      </div>
                    ))}

                    {activeReports.length === 0 && (
                      <div className="col-span-2 text-center py-6 text-slate-500 text-xs">
                        No medical reports registered yet.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
