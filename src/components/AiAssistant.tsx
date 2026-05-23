/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  HelpCircle, 
  Search, 
  Clock, 
  Brain, 
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Activity,
  ArrowRight
} from 'lucide-react';
import { ChatMessage } from '../types';

interface AiAssistantProps {
  chatHistory: ChatMessage[];
  onSendMessage: (text: string) => void;
  onClearHistory: () => void;
}

export default function AiAssistant({ 
  chatHistory, 
  onSendMessage, 
  onClearHistory 
}: AiAssistantProps) {

  const [inputVal, setInputVal] = useState('');

  const sampleTriggers = [
    "What changed in mom’s reports recently?",
    "Show dad’s sugar trends",
    "Compare Ramesh’s last 2 reports",
    "What medications are active?",
    "Summarize all active family risks"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    onSendMessage(inputVal);
    setInputVal('');
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/30 p-5 rounded-2xl border border-white/5">
        <div className="space-y-1">
          <h2 className="font-display font-semibold text-xl text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-400" /> Clinical Intelligence Copilot
          </h2>
          <p className="text-xs text-slate-400">Ask conversational details regarding your family medical binders, graphs, or drug targets.</p>
        </div>

        <button
          onClick={onClearHistory}
          className="bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all text-xs font-bold px-3 py-1.5 rounded-xl border border-white/5 cursor-pointer"
        >
          Reset Session History
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* CHAT INTERACTIVE CORE SCREEN PANEL (8 Columns) */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-white/10 rounded-2xl p-5 flex flex-col justify-between h-[520px] glass-panel-dark relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-[80px]" />
          
          {/* Scrollable messages container */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4 scrollbar">
            {chatHistory.map((msg) => {
              const isAi = msg.sender === 'ai';

              return (
                <div key={msg.id} className={`flex gap-3.5 ${isAi ? 'justify-start' : 'justify-end'}`}>
                  {isAi && (
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center font-black text-xs shrink-0 self-start animate-pulse">
                      AI
                    </div>
                  )}

                  <div className={`space-y-2 max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                    isAi 
                      ? 'bg-slate-950/80 border border-white/5 text-slate-350 rounded-tl-none font-sans' 
                      : 'bg-blue-600 border border-blue-400/30 text-white rounded-tr-none font-semibold'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    
                    {/* Render embedded mini charts inside AI replies if present! */}
                    {isAi && msg.graphData && (
                      <div className="bg-slate-900/40 p-3 rounded-lg border border-white/5 space-y-2 mt-3 text-[10px] font-mono">
                        <div className="flex justify-between font-bold text-cyan-300">
                          <span>{msg.graphData.title} Tracker (mg/dL)</span>
                          <span className="text-emerald-400 font-mono">-14% (Improving)</span>
                        </div>
                        {/* Interactive mini SVG inside assistant reply */}
                        <div className="h-14 flex items-end justify-between px-2 pt-1 border-b border-white/5">
                          <div className="flex flex-col items-center"><span>250</span><div className="w-2 bg-red-400 h-10 rounded-t" /><span>Jan</span></div>
                          <div className="flex flex-col items-center"><span>245</span><div className="w-2 bg-red-400 h-9.5 rounded-t" /><span>Feb</span></div>
                          <div className="flex flex-col items-center"><span>238</span><div className="w-2 bg-orange-400 h-8 rounded-t" /><span>Mar</span></div>
                          <div className="flex flex-col items-center"><span>220</span><div className="w-2 bg-emerald-400 h-7 rounded-t" /><span>Apr</span></div>
                          <div className="flex flex-col items-center"><span>210</span><div className="w-2 bg-emerald-400 h-6 rounded-t" /><span>May</span></div>
                        </div>
                      </div>
                    )}

                    {/* Render fast inline suggestion chips if present */}
                    {isAi && msg.suggestions && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {msg.suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => onSendMessage(s)}
                            className="bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all px-2.5 py-1 rounded text-[10px] border border-white/10 font-bold cursor-pointer"
                          >
                            {s} →
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form and Input deck */}
          <form onSubmit={handleSubmit} className="border-t border-white/10 pt-4 flex gap-3 relative z-10">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Query chemical targets, scan reports or chronos timeline indices..."
              className="flex-1 bg-slate-950/70 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all font-mono"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white p-3.5 rounded-xl transition-all shadow-md cursor-pointer shrink-0 active:scale-95 flex items-center justify-center"
              id="ai-submit-button"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* SAMPLE QUICK TRIGGERS PANEL (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-cyan-400 animate-pulse" />
              <h3 className="font-display font-semibold text-sm text-slate-100">Sandbox Quick Prompts</h3>
            </div>
            <p className="text-xs text-slate-400">Tap any pre-engineered diagnostic prompt to observe sandbox semantic parsing models.</p>

            <div className="space-y-2.5">
              {sampleTriggers.map((trig) => (
                <button
                  key={trig}
                  onClick={() => onSendMessage(trig)}
                  className="w-full text-left bg-slate-950/40 hover:bg-blue-600/10 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl text-xs text-slate-300 hover:text-cyan-300 transition-all cursor-pointer font-sans block group"
                >
                  <div className="flex gap-2 items-center justify-between">
                    <span className="truncate pr-1 block">{trig}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Guidelines info */}
          <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-3">
            <h4 className="font-display font-semibold text-xs text-slate-200">Stewardship Core Notice</h4>
            <p className="text-[11px] text-slate-400 leading-normal leading-relaxed">
              MedFlix Co-pilot parses medical documents under complete local clinical guidelines. All indices derived from blood panels require final approval from licensed doctors.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
