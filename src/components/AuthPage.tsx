/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Heart, 
  UploadCloud,
  Check, 
  ShieldAlert, 
  FileText, 
  Sparkles,
  Award,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthPageProps {
  onLoginSuccess: (role: 'admin' | 'caregiver' | 'doctor') => void;
  onBack: () => void;
}

export default function AuthPage({ onLoginSuccess, onBack }: AuthPageProps) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  // Signup flow fields
  const [signupStep, setSignupStep] = useState(1);
  const [adminName, setAdminName] = useState('Rahul Sharma');
  const [adminEmail, setAdminEmail] = useState('rahul@medflix.demo');
  const [familyMembers, setFamilyMembers] = useState([
    { name: 'Ramesh Sharma', relationship: 'Father', age: 67 },
    { name: 'Sunita Sharma', relationship: 'Mother', age: 63 }
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRel, setNewMemberRel] = useState('Spouse');
  const [newMemberAge, setNewMemberAge] = useState(30);

  const [selectedConditions, setSelectedConditions] = useState<string[]>([
    'Diabetes', 'Hypertension', 'Thyroid'
  ]);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    const lowerUser = username.toLowerCase().trim();
    const lowerPass = password.toLowerCase().trim();

    if (lowerUser === 'user' && lowerPass === 'user') {
      onLoginSuccess('admin');
    } else if (lowerUser === 'caregiver' && lowerPass === 'caregiver') {
      onLoginSuccess('caregiver');
    } else if (lowerUser === 'doctor' && lowerPass === 'doctor') {
      onLoginSuccess('doctor');
    } else {
      setErrorText('Invalid credentials. Try: user / user or caregiver / caregiver');
    }
  };

  const autofill = (type: 'user' | 'caregiver') => {
    setUsername(type);
    setPassword(type);
  };

  const addFamilyMember = () => {
    if (!newMemberName.trim()) return;
    setFamilyMembers([
      ...familyMembers,
      { name: newMemberName, relationship: newMemberRel, age: Number(newMemberAge) }
    ]);
    setNewMemberName('');
  };

  const toggleCondition = (cond: string) => {
    if (selectedConditions.includes(cond)) {
      setSelectedConditions(selectedConditions.filter(c => c !== cond));
    } else {
      setSelectedConditions([...selectedConditions, cond]);
    }
  };

  const handleSignupComplete = () => {
    // Automatically log them in as an admin after finishing onboarding
    onLoginSuccess('admin');
  };

  return (
    <div className="min-h-screen bg-[#0B1F3A] flex flex-col md:flex-row text-white font-sans relative overflow-hidden">
      {/* Visual background glow elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand & Left Info bar on larger screens */}
      <div className="hidden md:flex flex-col justify-between w-[40%] bg-gradient-to-br from-[#0B1F3A] via-[#0D2B52] to-[#07162b] p-12 border-r border-white/10 relative">
        <div className="space-y-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-display font-black text-xl tracking-tight text-white shadow-lg">
              M
            </div>
            <span className="font-display font-medium text-2xl tracking-normal">
              Med<span className="font-black text-blue-400">Flix</span>
            </span>
          </div>
          <p className="text-sm text-slate-300">The premier secure family health operating system.</p>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-400/20 px-2 py-0.5 rounded-full inline-block">
              Medical Security
            </span>
            <h2 className="font-display font-bold text-2xl text-slate-100">Care and safety synced across generations.</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maintain reports, trace continuous biomarker graphs, and protect elderly parents from drug interaction conflicts with automatic rules alerts.
            </p>
          </div>

          <div className="bg-slate-950/40 p-5 rounded-xl border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Sandbox Test Accounts Available:</h4>
            <div className="space-y-2 text-xs">
              <div 
                onClick={() => autofill('user')}
                className="flex items-center justify-between bg-white/5 p-2 rounded-lg border border-white/5 hover:bg-blue-600/20 transition-all cursor-pointer"
              >
                <span className="text-slate-300">Family Admin:</span>
                <span className="font-mono text-cyan-300 font-bold">user</span>
              </div>
              <div 
                onClick={() => autofill('caregiver')}
                className="flex items-center justify-between bg-white/5 p-2 rounded-lg border border-white/5 hover:bg-blue-600/20 transition-all cursor-pointer"
              >
                <span className="text-slate-300">Caregiver (Read-only):</span>
                <span className="font-mono text-cyan-300 font-bold">caregiver</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 font-mono">
          SECURE ENCRYPTED AES-256 SESSION
        </div>
      </div>

      {/* Interactive Main Viewport */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-lg">
          {isLoginView ? (
            /* LOGIN VIEW */
            <div className="space-y-8">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex justify-center md:justify-start">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold mb-4">
                    <Award className="w-3.5 h-3.5" /> HIPAA Compliance Standard
                  </span>
                </div>
                <h1 className="font-display font-bold text-3xl">Access Your Medical Vault</h1>
                <p className="text-sm text-slate-400">
                  Welcome to MedFlix. Sign in to review analytics, timeline indices, and medication profiles.
                </p>
              </div>

              {errorText && (
                <div className="bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl flex items-center gap-3 text-sm text-rose-300">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>{errorText}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. user"
                      required
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-cyan-400 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Password</label>
                    <span className="text-[11px] text-cyan-400 hover:underline cursor-pointer">Forgot?</span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="e.g. user"
                      required
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-cyan-400 transition-all font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98"
                  id="btn-login-submit"
                >
                  Sign In <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              {/* Mobile quick credentials */}
              <div className="md:hidden bg-slate-950/30 p-4 rounded-xl border border-white/5 space-y-2">
                <div className="text-xs text-slate-400 font-semibold mb-2">Tap to Auto-fill Demo Account:</div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => autofill('user')} 
                    className="flex-1 bg-white/5 border border-white/5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer font-mono"
                  >
                    user (Admin)
                  </button>
                  <button 
                    onClick={() => autofill('caregiver')} 
                    className="flex-1 bg-white/5 border border-white/5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer font-mono"
                  >
                    caregiver (Read)
                  </button>
                </div>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-xs text-slate-500 uppercase tracking-widest font-mono">OR</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* Demo Sign Up Switch */}
              <div className="space-y-4">
                <button
                  onClick={() => setIsLoginView(false)}
                  className="w-full border border-white/10 hover:bg-white/5 text-slate-300 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Create New Family Vault <Plus className="w-4 h-4 text-cyan-400" />
                </button>

                <div className="text-center">
                  <button onClick={onBack} className="text-xs text-slate-400 hover:text-white transition-all">
                    ← Back to Landing Page
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* SIGNUP FLOW (MULTI-STEP ONBOARDING) */
            <div className="space-y-6">
              {/* Header with step indicator */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                  <span>FAMILY REGISTRATION WIZARD</span>
                  <span className="text-cyan-400">Step {signupStep} of 5</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300" 
                    style={{ width: `${signupStep * 20}%` }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {signupStep === 1 && (
                  /* STEP 1: Admin Create */
                  <motion.div 
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <h2 className="font-display font-semibold text-2xl text-slate-100">Create Admin Profile</h2>
                      <p className="text-xs text-slate-400">The Family Admin upload files, updates medications, and manages security permissions.</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Full Name</label>
                        <input
                          type="text"
                          value={adminName}
                          onChange={(e) => setAdminName(e.target.value)}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Email Coordinates</label>
                        <input
                          type="email"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Stewardship Location</label>
                        <input
                          type="text"
                          defaultValue="Bangalore, India"
                          className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-2.5 px-3 text-sm text-slate-400 focus:outline-none"
                          disabled
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {signupStep === 2 && (
                  /* STEP 2: Add Members */
                  <motion.div 
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <h2 className="font-display font-semibold text-2xl text-slate-100 font-display">Add Your Family Core</h2>
                      <p className="text-xs text-slate-400">Map senior parents, children or dependents so timing conflicts can be computed.</p>
                    </div>

                    <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 space-y-2">
                      <span className="text-[10px] text-slate-400 font-mono">Added Members ({familyMembers.length})</span>
                      <div className="space-y-2 max-h-24 overflow-y-auto">
                        {familyMembers.map((fm, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs bg-white/5 px-2.5 py-1.5 rounded border border-white/5">
                            <span className="font-bold">{fm.name}</span>
                            <span className="text-slate-400 font-mono">{fm.relationship} ({fm.age}y/o)</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2">
                      <span className="text-[10px] font-bold tracking-wider text-slate-300 block font-mono">Quick Append Member</span>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Name"
                          value={newMemberName}
                          onChange={(e) => setNewMemberName(e.target.value)}
                          className="bg-slate-950/60 border border-white/10 rounded-lg p-2 text-xs focus:outline-none focus:border-cyan-400"
                        />
                        <select
                          value={newMemberRel}
                          onChange={(e) => setNewMemberRel(e.target.value)}
                          className="bg-slate-950/60 border border-white/10 rounded-lg p-2 text-xs text-slate-300 focus:outline-none"
                        >
                          <option>Spouse</option>
                          <option>Father</option>
                          <option>Mother</option>
                          <option>Child</option>
                        </select>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-[11px] text-slate-300 font-mono">Age:</span>
                        <input
                          type="number"
                          value={newMemberAge}
                          onChange={(e) => setNewMemberAge(Number(e.target.value))}
                          className="bg-slate-950/60 border border-white/10 rounded-lg p-1.5 text-xs text-center w-16 text-white font-mono"
                        />
                        <button
                          type="button"
                          onClick={addFamilyMember}
                          className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold py-1.5 rounded-lg cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Append Member
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {signupStep === 3 && (
                  /* STEP 3: Enter conditions */
                  <motion.div 
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <h2 className="font-display font-semibold text-2xl text-slate-100 font-display">Target Chronic Conditions</h2>
                      <p className="text-xs text-slate-400">Identifying medical watchlists helps customize notifications and clinic routines.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        'Diabetes', 'Hypertension', 'Thyroid', 'Osteoarthritis',
                        'High Cholesterol', 'Kidney Strain', 'Allergy Defense', 'Cardiac Care'
                      ].map((item, idx) => {
                        const active = selectedConditions.includes(item);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => toggleCondition(item)}
                            className={`p-3 rounded-xl border font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                              active
                                ? 'bg-blue-600/20 text-cyan-200 border-cyan-400/50'
                                : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                            }`}
                          >
                            <span>{item}</span>
                            {active && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {signupStep === 4 && (
                  /* STEP 4: Report simulation */
                  <motion.div 
                    key="step-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <h2 className="font-display font-semibold text-2xl text-slate-100 font-display">Upload First Medical PDF</h2>
                      <p className="text-xs text-slate-400">Seed the sandbox by simulating a lab upload. The AI parser will start reading variables immediately.</p>
                    </div>

                    <div className="border border-dashed border-white/20 hover:border-cyan-400/50 rounded-2xl p-8 bg-slate-950/40 text-center transition-all cursor-pointer space-y-3 relative overflow-hidden group">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 mx-auto group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      </div>

                      {uploadedFile ? (
                        <div className="space-y-1">
                          <span className="text-xs font-mono text-emerald-400 font-bold block">✓ {uploadedFile} Ready</span>
                          <span className="text-[10px] text-slate-400">Click to replace test file</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="text-xs font-semibold text-slate-300 block">Drag & drop lab PDF here</span>
                          <span className="text-[10px] text-slate-500">Supports hospital lists, scan report, fast sugars</span>
                        </div>
                      )}

                      {/* Quick options */}
                      <div className="flex justify-center gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedFile('apollo_diabetes_may2026.pdf');
                          }}
                          className="bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-[10px] text-slate-300 font-mono border border-white/5 active:scale-95"
                        >
                          + Use Sample Apollo PDF
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl flex items-start gap-2.5 text-xs text-slate-300">
                      <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span>AI: The engine can parse complex, tabular biochemical pages into human-readable indices.</span>
                    </div>
                  </motion.div>
                )}

                {signupStep === 5 && (
                  /* STEP 5: Congratulations */
                  <motion.div 
                    key="step-5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 mx-auto text-2xl animate-bounce">
                      ✓
                    </div>
                    <div className="space-y-2">
                      <h2 className="font-display font-semibold text-2xl text-slate-100 font-display">Sandbox Encryption Complete</h2>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                        Your secure MedFlix portal is generated. You have admin control synced with parents Ramesh & Sunita.
                      </p>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 space-y-2 text-xs text-left">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Family Admin:</span>
                        <span className="text-white font-bold">{adminName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Mapped Members:</span>
                        <span className="text-white font-mono">{familyMembers.length + 1} profiles live</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Security:</span>
                        <span className="text-emerald-400 font-mono font-bold">AES-256 Onboarded</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation button panel for Signup Flow */}
              <div className="flex justify-between items-center pt-4">
                {signupStep > 1 ? (
                  <button
                    onClick={() => setSignupStep(signupStep - 1)}
                    className="text-xs text-slate-400 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                ) : (
                  <button
                    onClick={() => setIsLoginView(true)}
                    className="text-xs text-slate-400 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Login View
                  </button>
                )}

                {signupStep < 5 ? (
                  <button
                    type="button"
                    onClick={() => setSignupStep(signupStep + 1)}
                    className="bg-blue-600 hover:bg-blue-500 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSignupComplete}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer hover:shadow-emerald-500/10"
                    id="btn-signup-complete"
                  >
                    Assemble Dashboard Core
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
