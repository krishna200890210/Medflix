/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sliders, 
  User, 
  Bell, 
  Lock, 
  Share2, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  Smartphone,
  CheckCircle,
  Users
} from 'lucide-react';

interface SettingsModuleProps {
  currentRole: 'admin' | 'caregiver' | 'doctor';
  onSwitchRole: (role: 'admin' | 'caregiver' | 'doctor') => void;
}

export default function SettingsModule({ currentRole, onSwitchRole }: SettingsModuleProps) {
  const [useWhatsApp, setUseWhatsApp] = useState(true);
  const [useSms, setUseSms] = useState(false);
  const [usePush, setUsePush] = useState(true);
  const [summaryStyle, setSummaryStyle] = useState<'plain' | 'academic' | 'simple'>('plain');
  const [lang, setLang] = useState('English');

  const [simName, setSimName] = useState('Rahul Sharma');
  const [simEmail, setSimEmail] = useState('rahul@medflix.demo');
  const [simPhone, setSimPhone] = useState('+91 98765 43210');

  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg('✓ System preference parameters synced successfully.');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 font-sans">
      
      <div className="space-y-1">
        <h2 className="font-display font-semibold text-xl text-white">MedFlix Preference Parameters</h2>
        <p className="text-xs text-slate-400">Manage HIPAA vault properties, push notifications, and AI summary configurations.</p>
      </div>

      {savedMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl text-xs text-emerald-300 font-semibold shadow flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{savedMsg}</span>
        </div>
      )}

      {/* Role Simulator Selector widget */}
      <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-4">
        <h3 className="font-display font-semibold text-sm text-slate-100 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-400" /> Active Role Simulator
        </h3>
        <p className="text-xs text-slate-400">
          MedFlix adapts viewing permissions relative to active credential types. Test permission flows below:
        </p>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'admin', label: 'Family Admin', desc: 'Full write/edit control' },
            { id: 'caregiver', label: 'Caregiver Support', desc: 'View-only access' },
            { id: 'doctor', label: 'Doctor Review', desc: 'Clinical sheets & graphs review' }
          ].map((roleOpt) => {
            const active = currentRole === roleOpt.id;
            return (
              <button
                key={roleOpt.id}
                onClick={() => onSwitchRole(roleOpt.id as any)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                  active 
                    ? 'bg-blue-600/20 border-cyan-400/50 text-cyan-200' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <span className="text-xs font-bold block">{roleOpt.label}</span>
                <span className="text-[10px] text-slate-400 block leading-tight">{roleOpt.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Card */}
        <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-4">
          <h3 className="font-display font-semibold text-sm text-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" /> Account Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400 block">Steward Name</label>
              <input 
                type="text" 
                value={simName} 
                onChange={(e) => setSimName(e.target.value)}
                className="w-full bg-slate-950/60 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400 block">Dermal Email</label>
              <input 
                type="email" 
                value={simEmail} 
                onChange={(e) => setSimEmail(e.target.value)}
                className="w-full bg-slate-950/60 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400 block">SMS phone</label>
              <input 
                type="text" 
                value={simPhone} 
                onChange={(e) => setSimPhone(e.target.value)}
                className="w-full bg-slate-950/60 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Notifications Checkbox */}
        <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-4">
          <h3 className="font-display font-semibold text-sm text-slate-100 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-400" /> Notification Channels & Timing Triggers
          </h3>

          <div className="space-y-3.5 text-xs text-slate-300">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={useWhatsApp}
                onChange={() => setUseWhatsApp(!useWhatsApp)}
                className="w-4 h-4 rounded bg-slate-950 border-white/10 text-blue-600 focus:ring-0 cursor-pointer"
              />
              <div className="space-y-0.5">
                <span className="font-bold text-slate-200">Emit warnings to WhatsApp</span>
                <p className="text-[11px] text-slate-400 leading-none">Instant timing conflict warnings and refill messages pushed to active chat.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={usePush}
                onChange={() => setUsePush(!usePush)}
                className="w-4 h-4 rounded bg-slate-950 border-white/10 text-blue-600 focus:ring-0 cursor-pointer"
              />
              <div className="space-y-0.5">
                <span className="font-bold text-slate-200">Device Push Notifications</span>
                <p className="text-[11px] text-slate-400 leading-none">Standard real-time browser alerts when biomarkers cross critical domains.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={useSms}
                onChange={() => setUseSms(!useSms)}
                className="w-4 h-4 rounded bg-slate-950 border-white/10 text-blue-600 focus:ring-0 cursor-pointer"
              />
              <div className="space-y-0.5">
                <span className="font-bold text-slate-200">SMS SOS Fallbacks</span>
                <p className="text-[11px] text-slate-400 leading-none">Automatic text alerts to registered emergency contacts during a critical medication gap.</p>
              </div>
            </label>
          </div>
        </div>

        {/* AI summary styling */}
        <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-4">
          <h3 className="font-display font-semibold text-sm text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" /> AI Modeling Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400 block">Interpretation Tone Style</label>
              <select
                value={summaryStyle}
                onChange={(e) => setSummaryStyle(e.target.value as any)}
                className="w-full bg-slate-950/60 border border-white/10 rounded-lg p-2.5 text-slate-300 focus:outline-none"
              >
                <option value="plain">Plain Human English (Recommended)</option>
                <option value="academic">Advanced Academic (Technical references listed)</option>
                <option value="simple">Super Simple (For quickly updating family elders)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400 block">System Language</label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full bg-slate-950/60 border border-white/10 rounded-lg p-2.5 text-slate-300 focus:outline-none"
              >
                <option>English</option>
                <option>Hindi (हिंदी)</option>
                <option>Kannada (ಕನ್ನಡ)</option>
                <option>Spanish (Español)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3 rounded-xl shadow transition-all cursor-pointer active:scale-95"
            id="settings-save-button"
          >
            Store Preference Parameters
          </button>
        </div>

      </form>
    </div>
  );
}
