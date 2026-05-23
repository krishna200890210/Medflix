/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  HelpCircle, 
  Trash2, 
  Plus, 
  Database, 
  Sparkles, 
  Stethoscope,
  Bell,
  CheckCircle,
  Clock4,
  RefreshCw
} from 'lucide-react';
import { Medication, DrugInteraction, Appointment, HealthAlert } from '../types';

interface MedicationsModuleProps {
  medications: Medication[];
  interactions: DrugInteraction[];
  appointments: Appointment[];
  alerts: HealthAlert[];
  onRefillMedication: (id: string) => void;
  onAcknowledgeAlert: (id: string) => void;
  onAddAppointment: (appt: Appointment) => void;
}

export default function MedicationsModule({
  medications,
  interactions,
  appointments,
  alerts,
  onRefillMedication,
  onAcknowledgeAlert,
  onAddAppointment
}: MedicationsModuleProps) {

  const [activeSubTab, setActiveSubTab] = useState<'meds' | 'appts' | 'notifs'>('meds');
  
  // Appointment form state simulation
  const [showAddAppt, setShowAddAppt] = useState(false);
  const [docName, setDocName] = useState('Dr. Amit Verma');
  const [specialty, setSpecialty] = useState('General Physician');
  const [hospital, setHospital] = useState('Manipal Clinic Bangalore');
  const [apptDate, setApptDate] = useState('29 May 2026');
  const [apptTime, setApptTime] = useState('10:00 AM');
  const [apptNotes, setApptNotes] = useState('General follow-up regarding metabolic parameters.');

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppt: Appointment = {
      id: `appt-${Date.now()}`,
      memberId: 'ramesh',
      doctorName: docName,
      specialty,
      hospital,
      date: apptDate,
      time: apptTime,
      status: 'upcoming',
      notes: apptNotes
    };
    onAddAppointment(newAppt);
    setShowAddAppt(false);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Sub tabs header selection */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/30 p-5 rounded-2xl border border-white/5">
        <div className="space-y-1">
          <h2 className="font-display font-semibold text-xl text-white">Active Care & Rimes Directory</h2>
          <p className="text-xs text-slate-400">Manage daily drug schedules, drug interactions warnings, and doctor calendars.</p>
        </div>

        <div className="bg-slate-950/40 p-1 rounded-xl border border-white/5 flex text-xs">
          <button
            onClick={() => setActiveSubTab('meds')}
            className={`px-4 py-2 rounded-lg font-bold font-display cursor-pointer transition-all ${
              activeSubTab === 'meds' ? 'bg-blue-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            Medication Vault ({medications.length})
          </button>
          <button
            onClick={() => setActiveSubTab('appts')}
            className={`px-4 py-2 rounded-lg font-bold font-display cursor-pointer transition-all ${
              activeSubTab === 'appts' ? 'bg-blue-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            Clinic Visits ({appointments.filter(a => a.status === 'upcoming').length})
          </button>
          <button
            onClick={() => setActiveSubTab('notifs')}
            className={`px-4 py-2 rounded-lg font-bold font-display cursor-pointer transition-all ${
              activeSubTab === 'notifs' ? 'bg-blue-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            Safety Logs & Alerts ({alerts.filter(a => !a.acknowledged).length})
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {activeSubTab === 'meds' && (
          /* TAB 1: MEDS & INTERACTION WARNING WORKSPACE */
          <motion.div 
            key="meds"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* LEFT COLUMN: ACTIVE MEDS INVENTORY */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-semibold text-base text-slate-100">Prescribed Daily Timings</h3>
                <span className="text-xs text-slate-500 font-mono">ENCRYPTED AT REST</span>
              </div>

              <div className="space-y-4">
                {medications.map((med) => {
                  const percentLeft = (med.pillsRemaining / med.pillsTotal) * 100;
                  const isLow = med.pillsRemaining <= 12;

                  return (
                    <div key={med.id} className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 hover:border-cyan-400/25 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div className="space-y-2">
                        <div className="flex gap-2 items-center flex-wrap">
                          <span className="text-[9px] uppercase font-bold font-mono px-2 py-0.5 rounded bg-blue-500/10 border border-blue-400/20 text-blue-300">
                            {med.dosage}
                          </span>
                          <span className="text-[10px] text-slate-500 capitalize font-mono">Regimen started: {med.startDate}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-100 font-display">{med.name}</h4>
                          <p className="text-xs text-slate-300 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-500" /> {med.frequency}
                          </p>
                        </div>
                      </div>

                      {/* Stock controller and Refill Trigger button */}
                      <div className="space-y-2 w-full sm:w-36 text-xs text-right shrink-0">
                        <div className="flex justify-between font-mono text-[10px]">
                          <span className="text-slate-500">Pills Counter:</span>
                          <span className={`font-bold ${isLow ? 'text-rose-400' : 'text-slate-300'}`}>
                            {med.pillsRemaining} / {med.pillsTotal} Left
                          </span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all ${isLow ? 'bg-red-500' : 'bg-cyan-500'}`} 
                            style={{ width: `${percentLeft}%` }}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center gap-2 pt-1">
                          <span className="text-[9px] text-slate-500 text-left truncate font-mono">Refill: {med.refillDate}</span>
                          <button
                            onClick={() => onRefillMedication(med.id)}
                            className="bg-cyan-400/10 hover:bg-cyan-400 text-cyan-300 border border-cyan-400/20 px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer font-display active:scale-95 flex items-center gap-1"
                          >
                            <RefreshCw className="w-2.5 h-2.5" /> Refill (60)
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: DRUG INTERACTION CO-PILOT (4 Columns) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-500 animate-pulse" />
                  <h3 className="font-display font-semibold text-sm text-slate-100">Interaction Engine Findings</h3>
                </div>

                <div className="space-y-4">
                  {interactions.map((it) => (
                    <div key={it.id} className="bg-slate-950/40 p-4 border border-white/5 rounded-xl space-y-2.5">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className={`px-1.5 py-0.5 rounded border ${
                          it.severity === 'severe' 
                            ? 'bg-red-500/10 text-red-400 border-red-500/20 font-bold' 
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {it.severity} conflict
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-200 leading-snug">{it.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-normal">{it.description}</p>
                      
                      <div className="text-[10px] text-cyan-400 font-semibold bg-cyan-500/5 px-2.5 py-1.5 rounded border border-cyan-400/10">
                        Involved chemicals: {it.drugsInvolved.join(' + ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* General Care suggestions */}
              <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-3">
                <h4 className="font-display font-semibold text-xs text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Retest Retesters
                </h4>
                <div className="space-y-2 text-xs text-slate-400 leading-normal">
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>HbA1c Glucose control test:</strong> Retest advised in 45 days.</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Vitamin D supplement cycle:</strong> Review serum load in 60 days.</span>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {activeSubTab === 'appts' && (
          /* TAB 2: APPOINTMENTS TRACKER & CALENDAR LOGS */
          <motion.div 
            key="appts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-display font-semibold text-base text-slate-100 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" /> Upcoming Consul Routings
              </h3>
              <button
                onClick={() => setShowAddAppt(!showAddAppt)}
                className="bg-blue-600 hover:bg-blue-500 text-xs font-bold px-3 py-2 rounded-xl text-white transition-all cursor-pointer inline-flex items-center gap-1 shadow-md"
              >
                <Plus className="w-3.5 h-3.5" /> File Appointment
              </button>
            </div>

            {/* Quick simulation modal form inside flow */}
            {showAddAppt && (
              <motion.form 
                onSubmit={handleCreateAppointment}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-900 border border-white/10 p-5 rounded-2xl space-y-4"
              >
                <span className="text-[10px] uppercase font-mono text-cyan-400 block font-bold">Appointment Scheduling sandbox</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400 block">Doctor Name</label>
                    <input 
                      type="text" 
                      value={docName} 
                      onChange={(e) => setDocName(e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400 block">Specialty</label>
                    <input 
                      type="text" 
                      value={specialty} 
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400 block">Clinic/Hospital</label>
                    <input 
                      type="text" 
                      value={hospital} 
                      onChange={(e) => setHospital(e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-slate-400 block">Date</label>
                      <input 
                        type="text" 
                        value={apptDate} 
                        onChange={(e) => setApptDate(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-lg p-2.5 text-white font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-slate-400 block">Time</label>
                      <input 
                        type="text" 
                        value={apptTime} 
                        onChange={(e) => setApptTime(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-lg p-2.5 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="text-[10px] font-bold uppercase text-slate-400 block">Consultation targets & notes</label>
                  <textarea 
                    value={apptNotes}
                    onChange={(e) => setApptNotes(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-lg p-2.5 text-white resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 text-xs">
                  <button 
                    type="button" 
                    onClick={() => setShowAddAppt(false)}
                    className="bg-white/5 border border-white/5 px-4 py-2 rounded-lg text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white font-bold px-5 py-2 rounded-lg cursor-pointer"
                  >
                    File Visit
                  </button>
                </div>
              </motion.form>
            )}

            {/* Render appt cards */}
            <div className="space-y-4">
              {appointments.map((appt) => {
                const isPast = appt.status === 'past';

                return (
                  <div 
                    key={appt.id} 
                    className={`p-5 rounded-2xl border ${
                      isPast 
                        ? 'bg-slate-900/20 border-white/5 opacity-60' 
                        : 'bg-slate-900/40 border-white/10 hover:border-cyan-400/20'
                    } flex flex-col sm:flex-row justify-between gap-4`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 shrink-0">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-sm text-slate-150 font-display">{appt.doctorName}</h4>
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400">
                            {appt.specialty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-350">{appt.hospital}</p>
                        {appt.notes && (
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-2 italic bg-slate-950/30 border border-white/5 p-2 rounded-lg">
                            Notes: {appt.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-left sm:text-right text-xs shrink-0 self-start sm:self-auto space-y-1">
                      <div className="font-mono text-cyan-300 font-bold">{appt.date}</div>
                      <div className="text-slate-400 flex items-center sm:justify-end gap-1">
                        <Clock4 className="w-3.5 h-3.5 text-slate-500" /> {appt.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeSubTab === 'notifs' && (
          /* TAB 3: SAFETY NOTIFICATIONS & ALERTS INDEX */
          <motion.div 
            key="notifs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-base text-slate-100 flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" /> Safety Core Notifications
              </h3>
              <p className="text-xs text-slate-400">Reviews and interactions logs generated by the AI Safety Module rules database.</p>
            </div>

            <div className="space-y-4">
              {alerts.map((a) => {
                const bg = a.acknowledged 
                  ? 'bg-slate-900/10 border-white/5 opacity-60' 
                  : a.type === 'critical'
                  ? 'bg-red-500/5 border-red-500/15'
                  : 'bg-amber-500/5 border-amber-500/15';

                const textHead = a.type === 'critical' ? 'text-red-300 font-display' : 'text-amber-300 font-display';

                return (
                  <div key={a.id} className={`p-4 border rounded-2xl ${bg} flex gap-4 transition-all hover:bg-white/5`}>
                    <div className="shrink-0 mt-0.5">
                      {a.type === 'critical' ? (
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                          !
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                          ⚠
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1 text-xs">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <span className="text-[9px] font-mono uppercase bg-white/5 text-slate-400 px-1.5 py-0.5 rounded border border-white/5">
                          {a.category.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">{a.date}</span>
                      </div>
                      
                      <h4 className={`font-bold text-xs ${textHead}`}>{a.title}</h4>
                      <p className="text-slate-300 leading-relaxed font-sans">{a.description}</p>

                      {!a.acknowledged && (
                        <div className="pt-2 text-right">
                          <button
                            onClick={() => onAcknowledgeAlert(a.id)}
                            className="bg-white/5 border border-white/5 hover:bg-blue-600/20 text-slate-300 hover:text-cyan-300 text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                          >
                            ✓ Acknowledge Observation
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
