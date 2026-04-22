import React from 'react';
import { motion } from 'motion/react';
import { Landmark, TrendingUp, Sparkles, FileText, LayoutDashboard, CheckCircle2, Wallet, Tractor, ChevronRight, ClipboardCheck } from 'lucide-react';

interface DashboardProps {
  user: any;
  activeLoan?: any;
  onNavigate: (tab: any) => void;
}

export default function Dashboard({ user, activeLoan, onNavigate }: DashboardProps) {
  const stats = [
    { title: 'Credit Score', value: user?.creditScore || 742, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', sub: 'High Eligibility' },
    { title: 'Active Debt', value: `₹${(user?.outstandingAmount || 120000).toLocaleString()}`, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50', sub: 'Calculated Risk' },
  ];

  const activeLoanStatusIndex = activeLoan 
    ? ['Submitted', 'Verification', 'Inspection', 'Approval', 'Disbursement'].indexOf(activeLoan.status) 
    : -1;

  const steps = [
    { title: 'AI Analysis', icon: Sparkles, desc: 'Analyze your land and income power.', link: 'eligibility', color: 'bg-indigo-600' },
    { title: 'Apply Loan', icon: FileText, desc: 'Complete our secure 4-step form.', link: 'apply', color: 'bg-emerald-600' },
    { title: 'Track Status', icon: LayoutDashboard, desc: 'Monitor your application live.', link: 'dashboard', color: 'bg-slate-900' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Welcome Section - Eye Catching Visual */}
      <section className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 md:p-14 text-white shadow-2xl border-b-8 border-emerald-500">
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-0.5 w-12 bg-emerald-500"></div>
            <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.4em]">Farmer Empowerment Portal</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase"
          >
            Grow Your <br />
            <span className="text-emerald-500 italic font-serif lowercase tracking-normal">harvest</span> fast.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-slate-400 text-base md:text-lg leading-relaxed max-w-md font-medium"
          >
            Digital credit facilities tailored for the Indian farmer. Secure, fast, and transparent.
          </motion.p>
        </div>

        {/* Abstract Architectural Visual */}
        <div className="absolute right-[-5%] bottom-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-10 rotate-12 hidden lg:block">
           <Tractor size={400} strokeWidth={0.5} />
        </div>
      </section>

      {/* The 3-Step Guided Journey */}
      <section>
        <div className="flex items-center gap-6 mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">Step-by-Step Guide</h2>
          <div className="flex-1 h-0.5 bg-slate-100"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              onClick={() => onNavigate(step.link)}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-emerald-500 transition-all group relative overflow-hidden cursor-pointer"
            >
              <div className={`${step.color} w-16 h-16 rounded-2xl text-white flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform`}>
                <step.icon size={32} strokeWidth={2.5} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Phase 0{idx + 1}</p>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-3">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{step.desc}</p>
              
              <div className="absolute top-8 right-8 text-slate-100 group-hover:text-emerald-500 transition-colors opacity-0 group-hover:opacity-100">
                <TrendingUp size={48} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Stats and Active Loan Tracking */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Your Credit Integrity</p>
              <div className="relative w-40 h-40 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset={440 - (440 * (user?.creditScore || 742) / 900)} className="text-emerald-500 transition-all duration-1000" />
                 </svg>
                 <span className="absolute text-5xl font-black text-slate-900 tracking-tighter">{user?.creditScore || 742}</span>
              </div>
              <p className="mt-6 text-[10px] font-black uppercase bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full tracking-widest">Excellent Score</p>
           </div>
           
           <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-8">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assets Summary</h4>
               <Tractor size={20} className="text-slate-200" />
             </div>
             <div className="space-y-6">
                <div>
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Land Valuation</p>
                   <p className="text-3xl font-black text-slate-900 leading-tight underline decoration-emerald-500 decoration-2 underline-offset-4">{(activeLoan?.landSize || user?.landOwned || 8.5)} Acres</p>
                </div>
                <div>
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Verified Income</p>
                   <p className="text-3xl font-black text-slate-900 leading-tight">₹{(user?.annualIncome || 450000).toLocaleString()}</p>
                </div>
             </div>
           </div>
        </div>

        <div className="lg:col-span-8">
           <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm h-full overflow-hidden flex flex-col">
              {!activeLoan ? (
                <div className="flex-1 flex flex-col items-center justify-center p-20 text-center bg-slate-50/30">
                  <div className="w-24 h-24 rounded-full bg-white border border-slate-100 shadow-lg flex items-center justify-center text-slate-300 mb-8">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Start Your First Loan</h3>
                  <p className="text-slate-500 mt-3 text-sm font-medium max-w-sm mx-auto">No active applications found. Use the "Apply Now" tab to submit your first farm credit request.</p>
                  <button 
                    onClick={() => onNavigate('apply')}
                    className="mt-8 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 hover:scale-105 transition-transform"
                  >
                    Get Started Now
                  </button>
                </div>
              ) : (
                <div className="p-12 h-full flex flex-col">
                   <div className="flex justify-between items-start mb-16">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></div>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Application Tracked In Real-Time</span>
                        </div>
                        <h3 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2">Live Status</h3>
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Submission ID: {activeLoan.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Funds</p>
                        <p className="text-5xl font-black text-emerald-600 tracking-tighter">₹{(Number(activeLoan.amount) || 0).toLocaleString()}</p>
                      </div>
                   </div>

                   <div className="relative pt-8 pb-16 flex-grow">
                      <div className="absolute top-[3.75rem] left-0 w-full h-[6px] bg-slate-100 rounded-full"></div>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(activeLoanStatusIndex / 4) * 100}%` }}
                        className="absolute top-[3.75rem] left-0 h-[6px] bg-emerald-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      ></motion.div>
                      
                      <div className="flex justify-between relative px-2">
                        {['Submitted', 'Verification', 'Inspection', 'Approval', 'Disbursement'].map((s, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className={`w-14 h-14 rounded-full border-[6px] transition-all duration-500 flex items-center justify-center bg-white relative ${i <= activeLoanStatusIndex ? 'border-emerald-500 shadow-xl shadow-emerald-100' : 'border-slate-50 text-slate-200'}`}>
                              {i < activeLoanStatusIndex ? <CheckCircle2 size={24} className="text-emerald-500" /> : i === activeLoanStatusIndex ? <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-200" /> : <div className="w-3 h-3 bg-slate-100 rounded-full" />}
                            </div>
                            <span className={`mt-6 text-[10px] font-black uppercase tracking-widest text-center max-w-[90px] leading-tight ${i <= activeLoanStatusIndex ? 'text-slate-900 border-b-2 border-emerald-500 pb-1' : 'text-slate-300'}`}>{s}</span>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div className="mt-auto p-8 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-600">
                            <Sparkles size={32} />
                         </div>
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Recent Insight</p>
                            <p className="text-sm font-bold text-slate-800 uppercase italic">"Field verification scheduled for next Monday at your local plot."</p>
                         </div>
                      </div>
                      <ChevronRight size={24} className="text-slate-300" />
                   </div>
                </div>
              )}
           </div>
        </div>
      </section>
    </div>
  );
}


