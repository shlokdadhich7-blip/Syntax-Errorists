import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, LayoutDashboard, FileText, PieChart, Sparkles, LogOut, ShieldCheck, Languages, Globe, ClipboardCheck, Loader2, Tractor, BookOpen } from 'lucide-react';
import Dashboard from './components/Dashboard';
import LoanApplicationForm from './components/LoanApplicationForm';
import EligibilityEstimator from './components/EligibilityEstimator';
import EMICalculator from './components/EMICalculator';
import UserGuide from './components/UserGuide';

type Tab = 'dashboard' | 'apply' | 'eligibility' | 'repayment' | 'guide';

import { auth } from './lib/firebase';
import { dbService } from './lib/db';

const MOCK_USERS = [
  {
    userId: 'farmer_123',
    name: 'Ram Charan',
    landOwned: 8.5,
    annualIncome: 450000,
    existingLoans: 25000,
    creditScore: 742,
    outstandingAmount: 120000
  },
  {
    userId: 'farmer_456',
    name: 'Vijay Kumar',
    landOwned: 12.0,
    annualIncome: 650000,
    existingLoans: 0,
    creditScore: 810,
    outstandingAmount: 50000
  },
  {
    userId: 'farmer_789',
    name: 'Suresh Raina',
    landOwned: 4.2,
    annualIncome: 300000,
    existingLoans: 10000,
    creditScore: 685,
    outstandingAmount: 80000
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(MOCK_USERS[0]);
  const [activeLoan, setActiveLoan] = useState<any>(null);

  useEffect(() => {
    // Auth logic removed to fix admin-restricted-operation error in prototype
    // Rules have been updated to allow access via mock user IDs
    console.log("App Initialized in Prototype Mode");
  }, []);

  useEffect(() => {
    const fetchLoan = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const loan = await dbService.getActiveLoan(user.userId);
        setActiveLoan(loan);
      } catch (err) {
        console.error("Loan Fetch Failed:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLoan();
  }, [user]);

  const handleUserSwitch = (userId: string) => {
    const selectedUser = MOCK_USERS.find(u => u.userId === userId);
    if (selectedUser) {
      setUser(selectedUser);
      setActiveTab('dashboard'); // Redirect to dashboard on user switch for clarity
    }
  };

  const handleLoanSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      // Ensure numeric values are stored correctly so they display in records
      const cleanData = {
        ...formData,
        userId: user.userId,
        amount: Number(formData.amount),
        tenure: Number(formData.tenure),
        landSize: Number(formData.landSize),
        status: 'Submitted'
      };

      const data = await dbService.applyForLoan(cleanData);
      
      // Update local state immediately so dashboard reflects new data
      setActiveLoan(data);
      
      // Wait for 2 seconds to show the visual success state in the form component
      setTimeout(() => {
        setActiveTab('dashboard');
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("System issue: Database connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    { id: 'dashboard', label: lang === 'EN' ? 'Overview' : 'अवलोकन', icon: LayoutDashboard },
    { id: 'apply', label: lang === 'EN' ? 'Apply Now' : 'ऋण आवेदन', icon: FileText },
    { id: 'eligibility', label: lang === 'EN' ? 'AI Check' : 'एआई जांच', icon: Sparkles },
    { id: 'repayment', label: lang === 'EN' ? 'Repayment' : 'पुनर्भुगतान', icon: PieChart },
    { id: 'guide', label: lang === 'EN' ? 'User Guide' : 'उपयोगकर्ता निर्देश', icon: BookOpen },
  ];

  const quotes = [
    "The discovery of agriculture was the first big step toward a civilized life.",
    "Cultivators are the most valuable citizens. They are the most vigorous.",
    "To make agriculture sustainable, the grower has got to be able to make a profit.",
    "Agriculture is our wisest pursuit, contributing most to wealth and happiness."
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfcf6] font-sans text-slate-900 flex flex-col overflow-x-hidden">
      {/* Dynamic Top Bar */}
      <div className="bg-emerald-600 text-white py-2 px-8 text-center overflow-hidden h-10 flex items-center justify-center">
         <AnimatePresence mode="wait">
           <motion.p 
             key={quoteIndex}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="text-[10px] font-black uppercase tracking-[0.25em]"
           >
             {quotes[quoteIndex]}
           </motion.p>
         </AnimatePresence>
      </div>

      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 10 }}
            className="bg-slate-900 text-emerald-400 p-2.5 rounded-xl shadow-xl"
          >
            <Landmark size={26} strokeWidth={2.5} />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter uppercase leading-none">
              Kisan<span className="text-emerald-600">Kredit</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">Digital Agri-Lending</span>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-4 px-5 py-2.5 bg-slate-50 rounded-full border border-slate-100 group hover:border-emerald-200 transition-colors">
             <div className="flex flex-col text-right">
                <span className="text-[9px] font-black uppercase text-slate-400">Current Profile</span>
                <select 
                  value={user?.userId} 
                  onChange={(e) => handleUserSwitch(e.target.value)}
                  className="bg-transparent border-none text-[11px] font-black uppercase tracking-widest text-emerald-600 outline-none cursor-pointer appearance-none"
                >
                  {MOCK_USERS.map(u => (
                    <option key={u.userId} value={u.userId}>{u.name}</option>
                  ))}
                </select>
             </div>
             <div className="h-8 w-px bg-slate-200"></div>
             <motion.div 
               whileHover={{ scale: 1.1 }}
               className="h-9 w-9 rounded-full bg-slate-900 border-2 border-emerald-500 shadow-lg flex items-center justify-center text-emerald-400 font-black text-sm"
             >
               {user?.name?.[0]}
             </motion.div>
          </div>
          
          <button 
            onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
            className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center"
          >
            <Languages size={20} className="text-slate-600" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Modern Sidebar Rail */}
        <aside className="w-full md:w-72 bg-white border-r border-slate-200 p-8 flex flex-col gap-10 md:sticky md:top-[90px] md:h-[calc(100vh-130px)]">
          <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-4 md:pb-0 no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`flex items-center gap-5 px-6 py-4 rounded-2xl transition-all whitespace-nowrap group ${
                  activeTab === item.id 
                    ? 'bg-slate-900 text-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] scale-[1.02]' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className={`${activeTab === item.id ? 'text-emerald-400' : 'text-slate-300 group-hover:text-emerald-600'} transition-colors`}>
                  <item.icon size={22} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.15em]">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto hidden md:block">
            <div className="p-6 bg-slate-900 rounded-[2rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                  <Tractor size={60} className="text-white" />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">Support 24/7</p>
               <p className="text-xs font-bold text-white leading-relaxed mb-4">Dedicated desk for your livestock & harvest needs.</p>
               <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
                 Reach Expert
               </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-12 lg:p-16 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                {activeTab === 'dashboard' && (
                  <Dashboard 
                    user={user} 
                    activeLoan={activeLoan} 
                    onNavigate={(tab: Tab) => setActiveTab(tab)} 
                    onUserSwitch={handleUserSwitch}
                    users={MOCK_USERS}
                  />
                )}
                {activeTab === 'apply' && <LoanApplicationForm onSubmit={handleLoanSubmit} isLoading={isLoading} />}
                {activeTab === 'eligibility' && <EligibilityEstimator />}
                {activeTab === 'repayment' && (
                  <EMICalculator 
                    activeLoan={activeLoan} 
                    users={MOCK_USERS} 
                    currentUserId={user.userId} 
                    onUserSwitch={handleUserSwitch} 
                  />
                )}
                {activeTab === 'guide' && <UserGuide />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Branded Footer */}
      <footer className="bg-white border-t border-slate-200 px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
           <div className="flex items-center gap-2 mb-2">
             <Landmark size={18} className="text-emerald-600" />
             <span className="text-sm font-black uppercase tracking-tighter">KisanKredit</span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Harvesting trust since 2024</p>
        </div>
        
        <div className="flex gap-10 text-[11px] font-black uppercase tracking-widest text-slate-500">
          <a href="#" className="hover:text-emerald-600 transition-colors border-b border-transparent hover:border-emerald-600 pb-1">Safety</a>
          <a href="#" className="hover:text-emerald-600 transition-colors border-b border-transparent hover:border-emerald-600 pb-1">RBI Policy</a>
          <a href="#" className="hover:text-emerald-600 transition-colors border-b border-transparent hover:border-emerald-600 pb-1">Careers</a>
        </div>

        <div className="flex gap-4">
           {['FB', 'TW', 'IG'].map(s => (
             <div key={s} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-[9px] font-black text-slate-400 hover:text-emerald-600 hover:border-emerald-600 transition-all cursor-pointer">
               {s}
             </div>
           ))}
        </div>
      </footer>
    </div>
  );
}

