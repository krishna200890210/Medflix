/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  UploadCloud, 
  Sparkles, 
  Search, 
  Filter, 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle,
  FileCheck,
  Plus,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { HealthReport, FamilyMember } from '../types';

interface ReportsModuleProps {
  reports: HealthReport[];
  members: FamilyMember[];
  selectedReportId: string | null;
  onSelectReportId: (id: string | null) => void;
  onAddSimulatedReport: (newRep: HealthReport) => void;
}

export default function ReportsModule({ 
  reports, 
  members, 
  selectedReportId, 
  onSelectReportId,
  onAddSimulatedReport
}: ReportsModuleProps) {

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMember, setFilterMember] = useState('all');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const selectedReport = reports.find(r => r.id === selectedReportId);
  const reportMember = selectedReport ? members.find(m => m.id === selectedReport.memberId) : null;

  // Filtered reports
  const filteredReports = reports.filter(r => {
    const memberMatches = filterMember === 'all' || r.memberId === filterMember;
    const queryMatches = r.reportType.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         r.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         r.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    return memberMatches && queryMatches;
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateFileUpload(e.dataTransfer.files[0].name);
    }
  };

  const simulateFileUpload = (fileName: string) => {
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(null);
            // Append a beautiful new report based on files!
            const simulatedNew: HealthReport = {
              id: `rep-${Date.now()}`,
              memberId: 'ramesh', // default to Ramesh for sandbox
              hospitalName: 'Apollo Hospital Bangalore',
              date: new Date().toISOString().split('T')[0],
              reportType: 'Advanced Glycemic Checkup',
              fileName: fileName || 'uploaded_lab_sheet.pdf',
              keyFindings: [
                'Fasting sugar level stabilized at 118 mg/dL',
                'HbA1c verified at 7.3% (ongoing improvements)',
                'Urinary creatinine content regular'
              ],
              aiSummary: 'Uploaded PDF shows perfect glycemic compliance. Fasting elements have scaled down by 8% over the prior test cycle, verifying that the current Metformin morning schedule is working with no adverse renal stress identified.',
              riskIndicator: 'low',
              abnormalValues: [
                {
                  marker: 'HbA1c',
                  value: '7.3%',
                  referenceRange: '4.0% - 5.6%',
                  status: 'high',
                  description: 'Diabetic indicator, but showing consistent stepwise normalization.'
                }
              ],
              aiRecommendations: [
                'Continue standard Metformin morning and dinner routine.',
                'Ensure daily continuous walks are maintained.',
                'Recheck HbA1c in 90 days to verify stable metabolic target.'
              ]
            };
            onAddSimulatedReport(simulatedNew);
          }, 600);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  const triggerUploadInput = () => {
    simulateFileUpload('scanned_laboratory_finding.pdf');
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!selectedReport ? (
          /* STANDARD LAB REPORTS MAIN DIRECTORY */
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/30 p-5 rounded-2xl border border-white/5">
              <div className="space-y-1">
                <h2 className="font-display font-semibold text-xl text-white">AI Medical Report Vault</h2>
                <p className="text-xs text-slate-400">Drag & drop clinical sheets or health reports for automatic plain English translation.</p>
              </div>

              {/* Upload Drop Zone Sim */}
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerUploadInput}
                className={`w-full md:w-80 h-28 border border-dashed rounded-xl flex flex-col items-center justify-center p-4 transition-all cursor-pointer text-center select-none ${
                  dragActive 
                    ? 'border-cyan-400 bg-cyan-500/10' 
                    : 'border-white/10 bg-slate-950/40 hover:border-cyan-400/30'
                }`}
              >
                {uploadProgress !== null ? (
                  <div className="w-full space-y-2 px-4">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 block font-bold">Parsing Biomarkers... {uploadProgress}%</span>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <UploadCloud className="w-6 h-6 text-slate-400 mx-auto animate-bounce" />
                    <span className="text-xs font-semibold text-slate-300 block">Upload Lab Report PDF</span>
                    <span className="text-[10px] text-slate-500 font-mono">Simulate File Drop or Click</span>
                  </div>
                )}
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Query hospital, report type, diagnostic profiles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/60 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              <div className="flex gap-2">
                <div className="relative">
                  <Filter className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={filterMember}
                    onChange={(e) => setFilterMember(e.target.value)}
                    className="bg-slate-900/60 border border-white/10 rounded-xl py-2 pl-9 pr-8 text-xs text-slate-350 focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="all">All Profiles</option>
                    {members.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReports.map((rep) => {
                const member = members.find(m => m.id === rep.memberId);
                const colors = rep.riskIndicator === 'high' 
                  ? 'border-red-500/20 bg-red-950/10 text-red-400 font-bold' 
                  : rep.riskIndicator === 'medium'
                  ? 'border-amber-500/20 bg-amber-950/10 text-amber-300'
                  : 'border-emerald-500/20 bg-emerald-950/10 text-emerald-400';

                return (
                  <div
                    key={rep.id}
                    onClick={() => onSelectReportId(rep.id)}
                    className="bg-slate-900/50 border border-white/10 hover:border-cyan-400/40 rounded-2xl p-5 hover:translate-y-[-1px] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Top bar info */}
                      <div className="flex justify-between items-start">
                        <div className="flex gap-2.5 items-center">
                          {member && (
                            <img 
                              src={member.avatarUrl} 
                              alt={member.name} 
                              className="w-7 h-7 rounded-lg object-cover ring-2 ring-blue-500/10" 
                            />
                          )}
                          <div>
                            <span className="text-[10px] text-slate-400 block font-mono">{rep.date}</span>
                            <span className="text-xs font-bold text-slate-100 font-display block">{rep.reportType}</span>
                          </div>
                        </div>

                        <span className={`text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border ${colors}`}>
                          {rep.riskIndicator} Risk
                        </span>
                      </div>

                      {/* Findings Preview */}
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[9px] uppercase font-mono text-slate-500 block">Critical Findings isolated:</span>
                        <ul className="space-y-1 text-xs text-slate-300 leading-relaxed font-sans">
                          {rep.keyFindings.slice(0, 2).map((kf, i) => (
                            <li key={i} className="flex gap-2 items-start">
                              <span className="text-cyan-400 leading-none mt-1">•</span>
                              <span className="line-clamp-1">{kf}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-3 mt-4 flex justify-between items-center text-xs text-slate-500">
                      <span className="font-mono truncate max-w-[180px]">File: {rep.fileName}</span>
                      <span className="text-blue-400 font-bold flex items-center gap-0.5 hover:text-cyan-400">
                        View AI analysis <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                  </div>
                );
              })}

              {filteredReports.length === 0 && (
                <div className="col-span-2 bg-slate-900/30 border border-white/5 p-12 text-center text-slate-500 text-xs rounded-2xl">
                  No medical reports matching search queries identified.
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* REPORT DETAILS VIEW WITH SPLIT AI ANALYSIS COMPONENT */
          <motion.div 
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Nav Back Header */}
            <div className="flex justify-between items-center bg-slate-950/40 p-3 rounded-xl border border-white/5">
              <button
                onClick={() => onSelectReportId(null)}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Directory Directory
              </button>
              <span className="text-xs text-cyan-400 font-mono tracking-wider font-semibold">AI CO-PILOT ANALYSIS LIVE</span>
            </div>

            {/* Split Page Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT COLUMN: Structured Biochemical report view (Lab sheet replica) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white/95 border border-slate-300 rounded-2xl p-6 text-slate-900 font-mono shadow-xl relative overflow-hidden">
                  {/* Watermark print lines */}
                  <div className="absolute top-2 right-2 w-10 h-10 bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-300 rounded text-xl">
                    D
                  </div>

                  <div className="border-b border-slate-800 pb-4 mb-4 space-y-1">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">SECURE DIGITAL HEALTHCARE RECORD</h3>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600">
                      <div>Patient: <strong className="text-slate-900">{reportMember?.name}</strong></div>
                      <div>Date: <strong className="text-slate-900">{selectedReport.date}</strong></div>
                      <div>Source: <strong className="text-slate-900 truncate block">{selectedReport.hospitalName}</strong></div>
                      <div>Type: <strong className="text-slate-900">{selectedReport.reportType}</strong></div>
                    </div>
                  </div>

                  {/* Sample biological parameters sheet */}
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#001] border-b border-[#03a] pb-0.5 block">Biochemical Parameters list</span>
                    
                    <div className="space-y-2.5 text-xs text-slate-800">
                      <div className="flex justify-between pb-1 border-b border-dashed border-slate-300">
                        <span className="font-bold">HbA1c Glycemic binding</span>
                        <span>{reportMember?.id === 'ramesh' ? '7.4%' : reportMember?.id === 'sunita' ? '5.4%' : '5.2%'}</span>
                      </div>
                      <div className="flex justify-between pb-1 border-b border-dashed border-slate-300">
                        <span className="font-bold">Total Cholesterol Fat</span>
                        <span>{reportMember?.id === 'ramesh' ? '210 mg/dL' : '172 mg/dL'}</span>
                      </div>
                      <div className="flex justify-between pb-1 border-b border-dashed border-slate-300">
                        <span className="font-bold">Serum Creatinine Clearance</span>
                        <span>{reportMember?.id === 'ramesh' ? '1.31 mg/dL*' : '0.88 mg/dL'}</span>
                      </div>
                      <div className="flex justify-between pb-1 border-b border-dashed border-slate-300">
                        <span className="font-bold">TSH (Serum endocrine thyroid)</span>
                        <span>{reportMember?.id === 'sunita' ? '2.41 uIU/mL' : '1.8 uIU/mL'}</span>
                      </div>
                      <div className="flex justify-between pb-1 border-b border-dashed border-slate-300 text-red-700">
                        <span className="font-bold">25-Hydroxy Vitamin D*</span>
                        <span className="font-black">{reportMember?.id === 'sunita' ? '18.2 ng/mL' : '28.5 ng/mL'}</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 italic pt-6 leading-relaxed">
                      * Values tagged with asterisks imply deviation from standard optimal laboratory baseline coordinates. Confirm validation with reference physician.
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: AI Analysis dashboard (High contrast, modern) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* AI Summary in Play English */}
                <div className="bg-gradient-to-br from-[#0B1F3A] to-slate-900 border border-cyan-500/20 rounded-2xl p-6 space-y-3 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-[40px] pointer-events-none" />
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-display font-semibold text-sm text-cyan-300">Interpretation in Plain English</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed leading-normal font-sans">
                    {selectedReport.aiSummary}
                  </p>
                </div>

                {/* Isolated Deviations/Abnormal values */}
                <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="font-display font-semibold text-sm text-slate-200">Abnormal Markers Isolated</h3>
                  
                  <div className="space-y-3 text-xs">
                    {selectedReport.abnormalValues.map((av, index) => {
                      const colors = av.status === 'high' 
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-300' 
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-300';

                      return (
                        <div key={index} className={`p-3.5 rounded-xl border ${colors} space-y-1.5`}>
                          <div className="flex justify-between items-center">
                            <span className="font-bold font-display">{av.marker}: {av.value}</span>
                            <span className="text-[9px] uppercase font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                              Value is {av.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 font-sans">{av.description}</p>
                          <div className="text-[10px] text-slate-400 font-mono">
                            Standard reference index: {av.referenceRange}
                          </div>
                        </div>
                      );
                    })}

                    {selectedReport.abnormalValues.length === 0 && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl text-emerald-300 flex items-center gap-2 font-semibold">
                        <CheckCircle className="w-4 h-4" /> All parameters reside perfectly in safe laboratory domains.
                      </div>
                    )}
                  </div>
                </div>

                {/* AI clinical Recommendations */}
                <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-3">
                  <h3 className="font-display font-semibold text-sm text-slate-200">AI Care Actions & Advisories</h3>
                  
                  <ul className="space-y-2 text-xs">
                    {selectedReport.aiRecommendations.map((rec, idx) => (
                      <li key={idx} className="bg-white/5 border border-white/5 p-2.5 rounded-lg text-slate-350 flex items-start gap-2.5 leading-relaxed font-sans">
                        <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
