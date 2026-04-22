import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, LayoutDashboard, FileText, PieChart, Sparkles, LogOut, ShieldCheck, Languages, Globe, ClipboardCheck, Loader2 } from 'lucide-react';
import Dashboard from './components/Dashboard';
import LoanApplicationForm from './components/LoanApplicationForm';
import EligibilityEstimator from './components/EligibilityEstimator';
import EMICalculator from './components/EMICalculator';

type Tab = 'dashboard' | 'apply' | 'eligibility' | 'repayment';

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
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white p-2 rounded-lg shadow-lg shadow-emerald-100">
            <Landmark size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-tight uppercase text-slate-900">
            Kisan<span className="text-emerald-600">Kredit</span>
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
             <span className="text-[9px] font-black uppercase text-slate-400">Switch User:</span>
             <select 
               value={user?.userId} 
               onChange={(e) => handleUserSwitch(e.target.value)}
               className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-emerald-600 outline-none cursor-pointer"
             >
               {MOCK_USERS.map(u => (
                 <option key={u.userId} value={u.userId}>{u.name}</option>
               ))}
             </select>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Farmer Profile</p>
            <p className="font-bold flex items-center gap-2">
              {user?.name} <span className="text-emerald-600 ml-1">• Premium</span>
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-100 border-2 border-emerald-500 shadow-inner flex items-center justify-center text-emerald-600 font-black">
            {user?.name?.[0]}
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Navigation Rail */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-8 md:sticky md:top-20 md:h-[calc(100vh-80px)]">
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all whitespace-nowrap ${
                  activeTab === item.id 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon size={20} className={activeTab === item.id ? 'text-emerald-400' : ''} />
                <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto hidden md:flex flex-col gap-4">
             <button 
               onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
               className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-emerald-600 transition-colors"
             >
               <Globe size={18} />
               <span className="text-[10px] font-black uppercase tracking-widest">
                 {lang === 'EN' ? 'Hindi / हिंदी' : 'English / अंग्रेजी'}
               </span>
             </button>
             <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
               <p className="text-[9px] font-black uppercase tracking-tighter text-emerald-700 mb-1">Market status</p>
               <p className="text-xs font-bold text-slate-800">Agri-Credit is High</p>
               <div className="w-full h-1 bg-emerald-200 rounded-full mt-2 overflow-hidden">
                 <div className="h-full bg-emerald-600 w-3/4"></div>
               </div>
             </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {activeTab === 'dashboard' && (
                  <Dashboard 
                    user={user} 
                    activeLoan={activeLoan} 
                    onNavigate={(tab: Tab) => setActiveTab(tab)} 
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
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Footer Bar */}
      <footer className="bg-white border-t border-slate-200 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">© 2024 KisanKredit FinTech Solution</p>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <a href="#" className="hover:text-emerald-600 transition-colors">Support</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Compliance</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Transparency</a>
        </div>
      </footer>
    </div>
  );
}

