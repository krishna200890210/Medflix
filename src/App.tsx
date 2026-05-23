/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  FileSpreadsheet, 
  LineChart, 
  Heart, 
  Calendar, 
  Bell, 
  Bot, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  Eye,
  Lock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// Models & data
import { 
  familyMembers as initialMembers, 
  medications as initialMeds, 
  drugInteractions as initialInteractions, 
  healthReports as initialReports, 
  biomarkers as initialBiomarkers, 
  appointments as initialAppts, 
  timelineEvents as initialTimeline, 
  healthAlerts as initialAlerts 
} from './data';
import { 
  FamilyMember, 
  Medication, 
  DrugInteraction, 
  HealthReport, 
  BiomarkerData, 
  Appointment, 
  TimelineEvent, 
  HealthAlert, 
  ChatMessage 
} from './types';

// Structured widgets components
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import FamilyDashboard from './components/FamilyDashboard';
import FamilyMembers from './components/FamilyMembers';
import ReportsModule from './components/ReportsModule';
import AnalyticsModule from './components/AnalyticsModule';
import MedicationsModule from './components/MedicationsModule';
import AiAssistant from './components/AiAssistant';
import SettingsModule from './components/SettingsModule';

export default function App() {
  // Navigation Flow State
  const [viewState, setViewState] = useState<'landing' | 'auth' | 'platform'>('landing');
  const [currentRole, setCurrentRole] = useState<'admin' | 'caregiver' | 'doctor'>('admin');
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Core Database States (Simulated local stores)
  const [members, setMembers] = useState<FamilyMember[]>(initialMembers);
  const [meds, setMeds] = useState<Medication[]>(initialMeds);
  const [alerts, setAlerts] = useState<HealthAlert[]>(initialAlerts);
  const [reports, setReports] = useState<HealthReport[]>(initialReports);
  const [biomarkers, setBiomarkers] = useState<BiomarkerData[]>(initialBiomarkers);
  const [appts, setAppts] = useState<Appointment[]>(initialAppts);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(initialTimeline);

  // Drilldown states
  const [selectedFamilyMemberId, setSelectedFamilyMemberId] = useState<string | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  // Conversational Assistant History
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am MedFlix Clinical Copilot. I have mapped your family health folders for Ramesh Sharma (Father) and Sunita Sharma (Mother).\n\nAsk me details like:\n• What changed in Mom's thyroid recently?\n• Show Father's cholesterol trends.\n• What drugs is Dad currently taking?",
      timestamp: '15:00',
    }
  ]);

  // Sidebar List
  const tabs = [
    { id: 'Overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'Family Members', label: 'Family Vaults', icon: Users },
    { id: 'Reports', label: 'Reports Analyzer', icon: FileSpreadsheet },
    { id: 'Analytics', label: 'Biomarker Trends', icon: LineChart },
    { id: 'Medications', label: 'Medications & Safety', icon: Heart },
    { id: 'Calendar', label: 'Clinic Appointments', icon: Calendar },
    { id: 'AI Assistant', label: 'Clinical Assistant', icon: Bot },
    { id: 'Notifications', label: 'Safety Notifications', icon: Bell },
    { id: 'Settings', label: 'Steward Preferences', icon: Settings },
  ];

  // Refill medication simulation handler
  const handleRefillMed = (id: string) => {
    setMeds(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          pillsRemaining: m.pillsTotal,
          refillDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };
      }
      return m;
    }));

    // Trigger confirmation notification
    const alertId = `al-refill-${Date.now()}`;
    const targetMed = meds.find(m => m.id === id);
    const targetMemberName = members.find(m => m.id === targetMed?.memberId)?.name || 'Member';
    
    const refillAlert: HealthAlert = {
      id: alertId,
      memberId: targetMed?.memberId || 'ramesh',
      type: 'info',
      category: 'trend',
      title: `✓ Ready Refill Complete for ${targetMemberName}`,
      description: `Stock level of ${targetMed?.name || 'Medication'} is restored to maximum total container units of ${targetMed?.pillsTotal || 60}. Next scheduled refill is updated to ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}.`,
      date: new Date().toISOString().split('T')[0],
      acknowledged: false
    };

    setAlerts(prev => [refillAlert, ...prev]);
  };

  // Acknowledge clinical observation alert handler
  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, acknowledged: true };
      }
      return a;
    }));
  };

  // Create appointment handler
  const handleAddAppt = (newAppt: Appointment) => {
    setAppts(prev => [newAppt, ...prev]);
    
    // Add event to timeline!
    const newTimelineEvent: TimelineEvent = {
      id: `time-${Date.now()}`,
      memberId: newAppt.memberId,
      date: newAppt.date,
      type: 'hospital_visit',
      title: `Consultation Booked: ${newAppt.doctorName}`,
      description: `Upcoming appointment scheduled at ${newAppt.hospital} for ${newAppt.time} with specialty ${newAppt.specialty}.`
    };
    setTimeline(prev => [newTimelineEvent, ...prev]);
  };

  // Add simulated report uploaded handler
  const handleAddSimulatedReport = (newRep: HealthReport) => {
    setReports(prev => [newRep, ...prev]);
    setSelectedReportId(newRep.id); // auto drill down to show beautiful split analysis immediately!
    
    // Highlight trend update alerts
    const alertId = `al-report-${Date.now()}`;
    const newAlert: HealthAlert = {
      id: alertId,
      memberId: newRep.memberId,
      type: 'info',
      category: 'trend',
      title: '✓ Scanned Lab Sheet Synthesized Successfully',
      description: `AI Co-pilot parsed ${newRep.fileName} with metabolic parameters indexed. Normal and abnormal values have been connected to history trends.`,
      date: new Date().toISOString().split('T')[0],
      acknowledged: false
    };
    setAlerts(prev => [newAlert, ...prev]);

    // Timeline event
    const newTimelineEvent: TimelineEvent = {
      id: `time-${Date.now()}`,
      memberId: newRep.memberId,
      date: newRep.date,
      type: 'report',
      title: newRep.reportType,
      description: `AI Model completed visual scanning and semantic analysis of uploaded diagnostic file: ${newRep.fileName}.`
    };
    setTimeline(prev => [newTimelineEvent, ...prev]);
  };

  // Conversational Assistant message handler (Clinical prompt-matcher simulator)
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory(prev => [...prev, userMsg]);

    // Simulate AI thinking and reply based on clinical data keywords
    setTimeout(() => {
      const query = text.toLowerCase();
      let replyText = '';
      let suggestions: string[] = [];
      let graphDataObj: any = undefined;

      if (query.includes('mom') || query.includes('sunita') || query.includes('mother')) {
        replyText = "Analyzing profiles and medical folders for **Sunita Sharma (Mother)**:\n\n• **Hypothyroidism**: Beautifully regulated. Her TSH level stands highly stable at **2.41 mIU/L** (perfect endocrine reference target).\n• **Osteoarthritis & Knee Pain**: Heavy wear is present on right joint space scanned at Fortis. The root underlying factor for active inflammation is a severe **Vitamin D Deficiency (18.2 ng/mL)**.\n\n*Action advised*: Make sure her Levothyroxine is taken empty-stomach in early mornings, and delay Calcium supplements strictly to lunch to avoid binding absorption reduction.";
        suggestions = ["Show her Vitamin D values", "What medications are active?"];
      } else if (query.includes('dad') || query.includes('ramesh') || query.includes('father')) {
        replyText = "Analyzing profiles and medical folders for **Ramesh Sharma (Father)**:\n\n• **HbA1c Mean Glycemia**: Touch down to a safer **7.4%** (down from 8.1% six months ago) validating strong response to adjusted twice-daily Metformin.\n• **Cholesterol levels**: Improved to **210 mg/dL** (14% relative decrease) since bedtime Rosuvastatin introduction.\n• **Renal watch**: Border elevated Serum Creatinine (**1.31 mg/dL**) with reduced eGFR of **58** indicates Stage 2 renal filtration stress.\n\n*Action advised*: Check fast glucose trends twice-weekly and restrict manual salt ingestion to under 2g.";
        suggestions = ["Compare last 2 reports", "Show dad's sugar trends"];
        graphDataObj = {
          title: "Ramesh Sharma Cholesterol Trend",
          markerType: "CholesterolCheck",
          memberId: "ramesh"
        };
      } else if (query.includes('sugar') || query.includes('glucose') || query.includes('hba1c') || query.includes('diabetes')) {
        replyText = "Here are the glycemic coordinates tracked for **Ramesh Sharma** across past quarterly checks:\n\n• Dec 2025: **7.8%** (Adherence watching)\n• Feb 2026: **7.6%** (Dosing stabilization)\n• May 2026: **7.4%** (Latest Apollo Hospital result - clinical improvement limit reached!)\n\n*Sugar trends denote standard step-down trajectory, signifying positive feedback with current Metformin Hydrocloride twice-daily schedules.*";
        graphDataObj = {
          title: "HbA1c Trajectory",
          markerType: "HbA1c",
          memberId: "ramesh"
        };
        suggestions = ["Compare last 2 reports", "Summarize all active family risks"];
      } else if (query.includes('medication') || query.includes('medicine') || query.includes('active') || query.includes('drugs')) {
        replyText = "Here is the master list of active daily prescriptions across your family core:\n\n**Ramesh Sharma (Father)**:\n1. *Metformin Hydrochloride 500mg* (Twice daily with breakfast & dinner - 12 tablets remaining)\n2. *Amlodipine Besylate 5mg* (Once daily morning - 24 tablets left)\n3. *Rosuvastatin Besylate 10mg* (Once bedtime - 5 left, refill needed by May 28!)\n\n**Sunita Sharma (Mother)**:\n4. *Levothyroxine Sodium 75mcg* (Once daily empty-stomach - 45 left)\n5. *Calcium + Vit D3* (Once daily with lunch - 18 remaining)\n6. *Tramadol Hydrochloride 50mg* (As needed for joint flares - 10 left)";
        suggestions = ["Review absorption timing conflict", "Trigger Rosuvastatin Refill"];
      } else if (query.includes('abnormal') || query.includes('findings') || query.includes('risk') || query.includes('danger')) {
        replyText = "🔴 **Live Clinical Risks & Abnormalities Isolated**:\n\n1. **Timing conflict (Sunita)**: Co-ingestion ofmorning Thyroxine and lunch/breakfast Calcium binds Thyroxine clearing effectiveness. Liquid delay of 4 hours is advised.\n2. **Critical Deficit (Sunita)**: Severe Vitamin D deficiency (18.2 ng/mL) directly exacerbrating joint arthritis wear.\n3. **Renal Strain (Ramesh)**: Creatinine at 1.31 and eGFR 58 mapping Stage 2 CKD profile. Restrict NSAID painkillers and sodium.";
        suggestions = ["Show her Vitamin D values", "Review absorption timing conflict"];
      } else {
        replyText = "I have scanned your family folders. I see Ramesh's HbA1c (7.4%) and Cholesterol (210) are improving, but his Renal coordinates (eGFR 58) are borderline. Sunita's thyroid is stable (TSH 2.41), but her Vitamin D is severely depressed (18.2).\n\nDo you want me to outline active conditions, compare diagnostic cards, or explain chemical timings?";
        suggestions = ["What changed in mom’s reports recently?", "Compare Ramesh’s last 2 reports"];
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions,
        graphData: graphDataObj
      };

      setChatHistory(prev => [...prev, aiMsg]);
    }, 1000);
  };

  // Switch role handler (sandbox testing)
  const handleSwitchRole = (role: 'admin' | 'caregiver' | 'doctor') => {
    setCurrentRole(role);
  };

  return (
    <div className="min-h-screen bg-[#07162b] text-white">
      
      {/* 1. LANDING PAGE SECTOR */}
      {viewState === 'landing' && (
        <LandingPage 
          onStart={() => setViewState('auth')} 
          onLogin={() => setViewState('auth')} 
        />
      )}

      {/* 2. AUTH SECTOR */}
      {viewState === 'auth' && (
        <AuthPage 
          onLoginSuccess={(role) => {
            setCurrentRole(role);
            setViewState('platform');
            setActiveTab('Overview');
          }}
          onBack={() => setViewState('landing')}
        />
      )}

      {/* 3. CORE LOGGED-IN PLATFORM HUD */}
      {viewState === 'platform' && (
        <div className="min-h-screen flex flex-col md:flex-row relative">
          
          {/* LEFT SIDEBAR FOR DESKTOP */}
          <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-[#0B1F3A]/95 p-5 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0 md:static ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="space-y-6">
              {/* Brand Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div 
                  className="flex items-center gap-2.5 cursor-pointer"
                  onClick={() => setViewState('landing')}
                >
                  <div className="w-8.5 h-8.5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-display font-black text-base text-white shadow">
                    M
                  </div>
                  <span className="font-display font-medium text-lg leading-none tracking-normal">
                    Med<span className="font-black text-blue-400">Flix</span>
                  </span>
                </div>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Active Role Identifier Indicator */}
              <div className="bg-slate-950/40 border border-white/5 p-3 rounded-xl flex items-center justify-between">
                <div className="space-y-0.5 truncate">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Registered Role</span>
                  <span className="text-xs font-bold text-slate-200 capitalize block truncate">{currentRole === 'admin' ? 'Family Admin' : currentRole === 'caregiver' ? 'Caregiver Support' : 'Doctor Specialist'}</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0 ml-1" />
              </div>

              {/* TAB LIST SECTOR */}
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const IconComp = tab.icon;
                  const active = activeTab === tab.id;

                  // Read-only logic guard for Simulating Roles (Caregivers see view-only directories)
                  if (currentRole === 'caregiver' && (tab.id === 'Settings')) {
                    return null; // hide editing/administration settings for base caregiver simulation
                  }

                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setSelectedFamilyMemberId(null);
                        setSelectedReportId(null);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left font-display font-medium text-xs px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-3 ${
                        active 
                          ? 'bg-blue-600 border border-blue-400/30 text-white shadow-lg shadow-blue-500/5 font-bold' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                      <span>{tab.label}</span>

                      {/* Small badge indicators */}
                      {tab.id === 'Notifications' && alerts.filter(a => !a.acknowledged).length > 0 && (
                        <span className="ml-auto w-4.5 h-4.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-full flex items-center justify-center text-[9px] font-mono font-bold">
                          {alerts.filter(a => !a.acknowledged).length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Logout footer */}
            <div className="border-t border-white/5 pt-4 space-y-4">
              <div className="flex gap-2.5 items-center">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&h=40&q=80" 
                  alt="Rahul" 
                  className="w-8.5 h-8.5 rounded-lg object-cover ring-2 ring-blue-500/20" 
                />
                <div className="truncate text-xs space-y-0.2 select-none">
                  <span className="font-bold text-slate-200 block truncate">Rahul Sharma</span>
                  <span className="text-[10px] text-slate-500 block truncate">rahul@medflix.demo</span>
                </div>
              </div>
              
              <button
                onClick={() => setViewState('landing')}
                className="w-full bg-white/5 hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/20 hover:text-rose-400 text-slate-400 text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
              >
                <LogOut className="w-3.5 h-3.5" /> Close Session
              </button>
            </div>
          </aside>

          {/* MAIN PLATFORM WORKSPACE CONTAINER */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#07162b] relative">
            
            {/* Header top navigator */}
            <header className="sticky top-0 z-30 h-16 border-b border-white/10 bg-[#07162b]/80 backdrop-blur-md px-6 flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden text-slate-400 hover:text-white cursor-pointer"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="hidden md:flex gap-1.5 text-xs text-slate-400 font-mono">
                  <span>HIPPA Portal Vault:</span>
                  <span className="text-cyan-400 font-bold uppercase">Rahul-Family-Main</span>
                </div>
              </div>

              {/* Action buttons list */}
              <div className="flex items-center gap-4">
                
                {/* Active user status metrics pill */}
                <div className="hidden lg:flex items-center gap-1.5 bg-slate-950/40 border border-white/5 rounded-full py-1 pl-1.5 pr-2.5 text-[11px] font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-400">Sandbox:</span>
                  <span className="text-emerald-400 font-bold capitalize">{currentRole}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button 
                      onClick={() => setActiveTab('Notifications')}
                      className="w-9.5 h-9.5 bg-slate-900 border border-white/10 hover:border-cyan-400/30 rounded-full flex items-center justify-center text-slate-350 hover:text-white transition-all cursor-pointer relative"
                    >
                      <Bell className="w-4 h-4" />
                      {alerts.filter(a => !a.acknowledged).length > 0 && (
                        <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-[#07162b] rounded-full animate-ping" />
                      )}
                    </button>
                  </div>

                  <button 
                    onClick={() => {
                      setActiveTab('AI Assistant');
                      handleSendMessage('Summarize all active family risks');
                    }}
                    className="bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-semibold px-4.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" /> Care AI Call
                  </button>
                </div>
              </div>
            </header>

            {/* TAB SCREENS CONDITIONAL VIEWPORT CONTAINER */}
            <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto pb-16">
              
              {activeTab === 'Overview' && (
                <FamilyDashboard 
                  members={members} 
                  alerts={alerts} 
                  meds={meds}
                  reports={reports}
                  onSelectMember={(id) => {
                    setSelectedFamilyMemberId(id);
                    setActiveTab('Family Members'); // switch tabs smoothly!
                  }}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
              )}

              {activeTab === 'Family Members' && (
                <FamilyMembers 
                  members={members}
                  medications={meds}
                  reports={reports}
                  selectedMemberId={selectedFamilyMemberId}
                  onSelectMember={setSelectedFamilyMemberId}
                />
              )}

              {activeTab === 'Reports' && (
                <ReportsModule 
                  reports={reports}
                  members={members}
                  selectedReportId={selectedReportId}
                  onSelectReportId={setSelectedReportId}
                  onAddSimulatedReport={handleAddSimulatedReport}
                />
              )}

              {activeTab === 'Analytics' && (
                <AnalyticsModule 
                  biomarkers={biomarkers}
                  timelineEvents={timeline}
                  reports={reports}
                  members={members}
                />
              )}

              {activeTab === 'Medications' && (
                <MedicationsModule 
                  medications={meds}
                  interactions={initialInteractions}
                  appointments={appts}
                  alerts={alerts}
                  onRefillMedication={handleRefillMed}
                  onAcknowledgeAlert={handleAcknowledgeAlert}
                  onAddAppointment={(appt) => {
                    handleAddAppt(appt);
                  }}
                />
              )}

              {activeTab === 'Calendar' && (
                <MedicationsModule 
                  medications={meds}
                  interactions={initialInteractions}
                  appointments={appts}
                  alerts={alerts}
                  onRefillMedication={handleRefillMed}
                  onAcknowledgeAlert={handleAcknowledgeAlert}
                  onAddAppointment={(appt) => {
                    handleAddAppt(appt);
                  }}
                />
              )}

              {activeTab === 'AI Assistant' && (
                <AiAssistant 
                  chatHistory={chatHistory}
                  onSendMessage={handleSendMessage}
                  onClearHistory={() => setChatHistory([
                    {
                      id: 'welcome',
                      sender: 'ai',
                      text: "Session cleared. What would you like to request regarding your family biomarkers or timelines?",
                      timestamp: '15:10'
                    }
                  ])}
                />
              )}

              {activeTab === 'Notifications' && (
                <MedicationsModule 
                  medications={meds}
                  interactions={initialInteractions}
                  appointments={appts}
                  alerts={alerts}
                  onRefillMedication={handleRefillMed}
                  onAcknowledgeAlert={handleAcknowledgeAlert}
                  onAddAppointment={(appt) => {
                    handleAddAppt(appt);
                  }}
                />
              )}

              {activeTab === 'Settings' && (
                <SettingsModule 
                  currentRole={currentRole}
                  onSwitchRole={handleSwitchRole}
                />
              )}

            </main>
          </div>

        </div>
      )}

    </div>
  );
}
