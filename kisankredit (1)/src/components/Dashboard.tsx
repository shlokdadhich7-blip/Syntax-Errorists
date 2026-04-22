import React from 'react';
import { motion } from 'motion/react';
import { Landmark, TrendingUp, Sparkles, FileText, LayoutDashboard, CheckCircle2, Wallet, Tractor, ChevronRight, ClipboardCheck, ArrowUpRight, Target, Users } from 'lucide-react';

interface DashboardProps {
  user: any;
  activeLoan?: any;
  onNavigate: (tab: any) => void;
  onUserSwitch?: (userId: string) => void;
  users?: any[];
}

export default function Dashboard({ user, activeLoan, onNavigate, onUserSwitch, users }: DashboardProps) {
  const activeLoanStatusIndex = activeLoan 
    ? ['Submitted', 'Verification', 'Inspection', 'Approval', 'Disbursement'].indexOf(activeLoan.status) 
    : -1;

  const steps = [
    { title: 'AI Analysis', icon: Sparkles, desc: 'Calculate potential harvest credit.', link: 'eligibility', color: 'bg-emerald-500', shadow: 'shadow-emerald-200' },
    { title: 'Apply Now', icon: FileText, desc: 'Simple 4-step digital application.', link: 'apply', color: 'bg-slate-900', shadow: 'shadow-slate-200' },
    { title: 'EMI Planner', icon: Target, desc: 'Analyze your repayment windows.', link: 'repayment', color: 'bg-emerald-600', shadow: 'shadow-emerald-200' },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Editorial Hero Section */}
      <section className="relative group">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div className="space-y-8">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Operational Dashboard</span>
            </motion.div>
            
            <h1 className="editorial-title text-6xl md:text-8xl lg:text-[9vw] text-slate-900 leading-tight">
              Grow Your <br />
              <span className="text-emerald-600">Wealth</span> &<br />
              Future.
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">अपनी धन और भविष्य को बढ़ाएं</p>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm">
              Securing the future of Indian agriculture through instant, AI-driven credit lines and transparent financial growth.
              <br />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest mt-2 block">तत्काल एआई-आधारित क्रेडिट लाइनों के साथ कृषि भविष्य को सुरक्षित करना।</span>
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => onNavigate('apply')}
                className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200"
              >
                Start New Request / नया आवेदन शुरू करें <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-100/50 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      </section>

      {/* User Switcher / Profile Hub - Prominent in Overview */}
      <section className="bento-card bg-slate-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-1/4 -translate-y-1/4 rotate-12">
            <Landmark size={300} />
         </div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
               <div className="h-20 w-20 rounded-[1.5rem] bg-emerald-500 flex items-center justify-center text-slate-900 text-3xl font-black shadow-2xl shadow-emerald-500/20">
                  {user?.name?.[0]}
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-1">Authenticated Member</p>
                  <h3 className="text-4xl font-black tracking-tighter uppercase">{user?.name}</h3>
               </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 w-full text-center md:text-right mb-2">Switch Active Profile</span>
               {users?.map((u) => (
                 <button
                   key={u.userId}
                   onClick={() => onUserSwitch?.(u.userId)}
                   className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                     user?.userId === u.userId 
                      ? 'bg-white text-slate-900 border-white shadow-lg' 
                      : 'border-slate-700 text-slate-400 hover:border-slate-500'
                   }`}
                 >
                   {u.name}
                 </button>
               ))}
            </div>
         </div>
      </section>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         <div className="bento-card group">
            <div className="flex justify-between items-start mb-10">
               <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                  <TrendingUp size={24} />
               </div>
               <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded">High Integrity</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Credit Score / क्रेडिट स्कोर</p>
            <h4 className="text-5xl font-black tracking-tighter text-slate-900">{user?.creditScore || 742}</h4>
         </div>

         <div className="bento-card group">
            <div className="flex justify-between items-start mb-10">
               <div className="p-3 bg-slate-50 rounded-xl text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
                  <Tractor size={24} />
               </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Land Assets / भूमि संपत्ति</p>
            <h4 className="text-5xl font-black tracking-tighter text-slate-900">{(activeLoan?.landSize || user?.landOwned || 8.5)} <span className="text-xl text-slate-300">Acres</span></h4>
         </div>

         <div className="bento-card lg:col-span-2 relative overflow-hidden bg-[#f3f4f6]">
            <div className="absolute bottom-0 right-0 p-8 opacity-5">
               <Wallet size={120} />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Verified Annual Revenue</p>
              <h4 className="text-5xl font-black tracking-tighter text-slate-900">₹{(user?.annualIncome || 450000).toLocaleString()}</h4>
              <p className="mt-4 text-xs font-bold text-slate-500 max-w-[200px]">Audited via AI soil analysis and past harvest cycles.</p>
            </div>
         </div>
      </div>

      {/* Guided Steps section */}
      <section>
        <div className="flex items-center gap-6 mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">Growth Roadmap / विकास रूपरेखा</h2>
            <div className="flex-1 h-px bg-slate-200"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: 'AI Analysis', hindi: 'एआई विश्लेषण', icon: Sparkles, desc: 'Calculate potential harvest credit.', link: 'eligibility', color: 'bg-emerald-500', shadow: 'shadow-emerald-200' },
             { title: 'Apply Now', hindi: 'ऋण आवेदन', icon: FileText, desc: 'Simple 4-step digital application.', link: 'apply', color: 'bg-slate-900', shadow: 'shadow-slate-200' },
             { title: 'EMI Planner', hindi: 'भुगतान योजना', icon: Target, desc: 'Analyze your repayment windows.', link: 'repayment', color: 'bg-emerald-600', shadow: 'shadow-emerald-200' },
           ].map((step, i) => (
             <motion.div 
               key={i}
               whileHover={{ y: -5 }}
               onClick={() => onNavigate(step.link)}
               className="bento-card cursor-pointer group"
             >
                <div className={`${step.color} ${step.shadow} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:rotate-12 transition-transform`}>
                   <step.icon size={28} strokeWidth={2.5} />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-1">{step.title}</h4>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-4">{step.hindi}</p>
                <p className="text-sm text-slate-500 font-medium mb-12">{step.desc}</p>
                <div className="flex items-center gap-2 text-slate-900">
                   <span className="text-[10px] font-black uppercase tracking-widest">Execute / शुरू करें</span>
                   <ChevronRight size={16} />
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Active Tracking - Detailed */}
      {activeLoan && (
        <section className="bento-card p-0 overflow-hidden bg-white">
           <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 bg-slate-900 p-12 text-white flex flex-col justify-between">
                 <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live Tracking</span>
                    </div>
                    <h3 className="text-5xl font-black uppercase tracking-tighter leading-none mb-6">Loan In<br />Progress</h3>
                    <p className="text-xs text-slate-400 font-medium">Tracking ID: <span className="text-white">{activeLoan.id}</span></p>
                 </div>
                 
                 <div className="mt-20">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Requested Credit</p>
                    <p className="text-6xl font-black text-emerald-500 tracking-tighter">₹{(Number(activeLoan.amount) || 0).toLocaleString()}</p>
                 </div>
              </div>
              
              <div className="lg:col-span-7 p-12">
                 <div className="space-y-12">
                    <div className="flex justify-between items-end">
                       <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Validation Pipeline</h4>
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Stage {activeLoanStatusIndex + 1} of 5</span>
                    </div>

                    <div className="space-y-8">
                       {['Submitted', 'Verification', 'Inspection', 'Approval', 'Disbursement'].map((s, i) => (
                         <div key={i} className="flex items-center gap-6">
                            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${
                              i <= activeLoanStatusIndex ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-200 text-slate-200'
                            }`}>
                               {i < activeLoanStatusIndex ? <CheckCircle2 size={16} /> : <span className="text-[10px] font-black">{i + 1}</span>}
                            </div>
                            <div className="flex-1">
                               <div className="flex justify-between items-center mb-1">
                                  <p className={`text-xs font-black uppercase tracking-widest ${i <= activeLoanStatusIndex ? 'text-slate-900' : 'text-slate-300'}`}>{s}</p>
                                  {i === activeLoanStatusIndex && <span className="text-[9px] font-black text-emerald-600 uppercase animate-pulse tracking-widest">Active Now</span>}
                               </div>
                               <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: i < activeLoanStatusIndex ? '100%' : i === activeLoanStatusIndex ? '60%' : '0%' }}
                                    className={`h-full ${i <= activeLoanStatusIndex ? 'bg-emerald-600' : 'bg-transparent'}`}
                                  ></motion.div>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="p-6 bg-slate-50 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-emerald-50 transition-colors">
                       <div className="flex items-center gap-4">
                          <Sparkles size={20} className="text-emerald-600" />
                          <p className="text-[10px] font-black uppercase tracking-widest">Field officer on the way</p>
                       </div>
                       <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
                    </div>
                 </div>
              </div>
           </div>
        </section>
      )}
    </div>
  );
}
