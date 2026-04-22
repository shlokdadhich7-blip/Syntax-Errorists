import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Wallet, CheckCircle2, Clock, IndianRupee, PieChart, Info, ArrowRight, Users } from 'lucide-react';

interface EMICalculatorProps {
  activeLoan?: any;
  onUserSwitch?: (userId: string) => void;
  users?: any[];
  currentUserId?: string;
}

export default function EMICalculator({ activeLoan, onUserSwitch, users, currentUserId }: EMICalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [tenure, setTenure] = useState(12);
  const [rate, setRate] = useState(10.5); // Default 10.5%
  const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
    if (activeLoan) {
      setLoanAmount(Number(activeLoan.amount) || 100000);
      setTenure(Number(activeLoan.tenure) || 12);
    }
  }, [activeLoan]);

  const calculateEMI = () => {
    const p = loanAmount;
    const r = rate / 12 / 100;
    const n = tenure;
    
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    const newSchedule = [];
    let balance = p;
    for (let i = 1; i <= n; i++) {
        const interest = balance * r;
        const principal = emi - interest;
        balance -= principal;
        newSchedule.push({
            month: i,
            amount: emi,
            principal: principal,
            interest: interest,
            balance: Math.max(0, balance),
            status: i < 3 ? 'Paid' : 'Pending', // Mocking some paid months
            dueDate: new Date(new Date().setMonth(new Date().getMonth() + i))
        });
    }
    setSchedule(newSchedule);
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, tenure, rate]);

  const togglePaid = (month: number) => {
    setSchedule(s => s.map(item => 
      item.month === month ? { ...item, status: item.status === 'Paid' ? 'Pending' : 'Paid' } : item
    ));
  };

  const emiPerMonth = schedule[0]?.amount || 0;

  return (
    <div className="space-y-12 pb-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
           <h2 className="editorial-title text-7xl text-slate-900 leading-[0.9]">Repayment <br /><span className="text-emerald-600">Planner.</span></h2>
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Projection Terminal v1.0.4</p>
        </div>
        
        {activeLoan && (
          <div className="flex items-center gap-6 p-6 bg-white border border-slate-200 rounded-[2rem] shadow-xl">
             <div className="flex items-center gap-4 border-r border-slate-100 pr-6">
                <div className="h-12 w-12 rounded-xl bg-slate-900 border border-emerald-500 shadow-lg flex items-center justify-center text-emerald-400">
                   {activeLoan.fullName[0]}
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Live Linked Profile</p>
                   <p className="text-sm font-black italic">{activeLoan.fullName}</p>
                </div>
             </div>
             <div className="flex flex-col">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Active ID</p>
                <p className="text-sm font-mono font-bold text-emerald-600 uppercase">#{activeLoan.id?.substring(0,8)}</p>
             </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Input Console */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bento-card bg-slate-900 text-white space-y-10">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Parameter Input</span>
              <PieChart size={20} className="text-slate-700" />
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Liquidity Adjustment</p>
                   <p className="text-3xl font-black tracking-tighter text-white font-mono">₹{loanAmount.toLocaleString()}</p>
                </div>
                <input 
                  type="range" min="10000" max="500000" step="5000"
                  value={loanAmount} onChange={e => setLoanAmount(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Amortization Span</p>
                   <p className="text-3xl font-black tracking-tighter text-white font-mono">{tenure} Mo</p>
                </div>
                <input 
                  type="range" min="6" max="60" step="1"
                  value={tenure} onChange={e => setTenure(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>

            <div className="pt-10 border-t border-slate-800 flex justify-between items-center">
               <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Equated Installment</p>
                  <p className="text-5xl font-black text-emerald-500 tracking-tighter font-mono">₹{emiPerMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
               </div>
               <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl">
                  <ArrowRight size={24} className="text-emerald-500" />
               </div>
            </div>
          </div>

          {/* User Switcher Internal */}
          {onUserSwitch && users && (
            <div className="bento-card bg-emerald-50 border-emerald-100 flex flex-col gap-6">
               <div className="flex items-center gap-3">
                  <span className="p-2 bg-emerald-600 text-white rounded-lg"><Users size={16} /></span>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">Projected Profiles</p>
               </div>
               <div className="space-y-2">
                  {users.map(u => (
                    <button
                      key={u.userId}
                      onClick={() => onUserSwitch(u.userId)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        currentUserId === u.userId 
                        ? 'bg-white shadow-xl shadow-emerald-500/10 border-2 border-emerald-500 scale-[1.02]' 
                        : 'bg-emerald-100/40 text-emerald-800 hover:bg-white border-2 border-transparent'
                      }`}
                    >
                      <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">{u.name}</p>
                      <p className="text-[8px] font-bold opacity-40 uppercase tracking-tighter">Harvest Capacity: {u.landOwned} Acres</p>
                    </button>
                  ))}
               </div>
            </div>
          )}
        </div>

        {/* Right: Data Ledger */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bento-card p-0 overflow-hidden bg-white">
              <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-1">Amortization Ledger</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Computed via KisanKredit Risk Engine</p>
                 </div>
                 <div className="flex gap-10">
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Paid Capital</p>
                       <p className="text-xl font-black text-emerald-600 tracking-tighter font-mono leading-none">₹{(schedule.filter(s => s.status === 'Paid').length * emiPerMonth).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    </div>
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Pending Risk</p>
                       <p className="text-xl font-black text-slate-900 tracking-tighter font-mono leading-none">₹{(schedule.filter(s => s.status === 'Pending').length * emiPerMonth).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    </div>
                 </div>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full border-collapse">
                   <thead className="bg-slate-50/50 border-b border-slate-100">
                      <tr>
                        <th className="px-10 py-5 text-left text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">Cycle</th>
                        <th className="px-10 py-5 text-left text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">Principal Contribution</th>
                        <th className="px-10 py-5 text-left text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">Interest Accrual</th>
                        <th className="px-10 py-5 text-right text-[9px] font-black uppercase tracking-[0.25em] text-slate-900">Total Obligation</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50 bg-white">
                      {schedule.slice(0, 10).map((item) => (
                        <tr key={item.month} onClick={() => togglePaid(item.month)} className="cursor-pointer group hover:bg-slate-50 transition-colors">
                           <td className="px-10 py-6">
                              <div className="flex items-center gap-4">
                                 <div className={`w-3 h-3 rounded-full ${item.status === 'Paid' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-200'} transition-all`}></div>
                                 <span className="text-xs font-black uppercase tracking-widest text-slate-900">MONTH {item.month < 10 ? `0${item.month}` : item.month}</span>
                              </div>
                           </td>
                           <td className="px-10 py-6">
                              <p className="text-xs font-bold text-slate-500 font-mono">₹{item.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                           </td>
                           <td className="px-10 py-6 italic font-serif text-[11px] text-slate-300">
                              ₹{item.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                           </td>
                           <td className="px-10 py-6 text-right">
                              <p className="text-sm font-black text-slate-900 font-mono">₹{item.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
              </div>

              <div className="p-10 bg-[#fdfcf6] border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="flex items-center gap-6">
                    <div className="h-14 w-14 bg-white border border-slate-200 rounded-[1.25rem] flex items-center justify-center text-emerald-600 shadow-sm">
                       <PieChart size={24} />
                    </div>
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">System Audit Progress</p>
                       <p className="text-xs font-black uppercase tracking-widest text-slate-900">
                          {schedule.filter(s => s.status === 'Paid').length} Cycles Cleared <span className="text-emerald-600">({Math.round((schedule.filter(s => s.status === 'Paid').length / tenure) * 100)}%)</span>
                       </p>
                    </div>
                 </div>
                 
                 <div className="w-full md:w-64">
                    <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${(schedule.filter(s => s.status === 'Paid').length / tenure) * 100}%` }}
                         className="h-full bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                       ></motion.div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-4 text-slate-400 p-8 border border-slate-200 rounded-[2rem] border-dashed">
              <Info size={20} className="shrink-0" />
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] leading-relaxed">
                The calculated values above are representative based on standard amortisation tables. The first disbursement cycle may include nominal processing fees not visualised here.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
