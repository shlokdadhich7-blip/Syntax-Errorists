import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Wallet, CheckCircle2, Clock, IndianRupee } from 'lucide-react';

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
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <Wallet size={20} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter">EMI Planner</h3>
            </div>
            {activeLoan && (
              <div className="px-2 py-1 bg-emerald-500 text-white text-[8px] font-black uppercase rounded-md tracking-tighter animate-pulse">
                Sync Active
              </div>
            )}
          </div>
          
          <div className="space-y-8">
            {activeLoan && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Repayment Profile</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-slate-900">{activeLoan.fullName}</p>
                  <p className="text-[9px] font-medium text-slate-500">Loan ID: {activeLoan.id?.substring(0,8)}</p>
                </div>
              </div>
            )}
            
            {onUserSwitch && users && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-[9px] font-black uppercase text-emerald-700 mb-2">Switch Repayment Profile</p>
                <select 
                  value={currentUserId}
                  onChange={(e) => onUserSwitch(e.target.value)}
                  className="w-full bg-white p-2 rounded-xl border border-emerald-200 text-[10px] font-bold uppercase outline-none"
                >
                  {users.map(u => (
                    <option key={u.userId} value={u.userId}>{u.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <div className="flex justify-between mb-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Principal Amount</label>
                <span className="font-bold text-slate-900 font-display">₹{loanAmount.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="10000" max="500000" step="5000"
                value={loanAmount} onChange={e => setLoanAmount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tenure (Months)</label>
                <span className="font-bold text-slate-900 font-display">{tenure} Months</span>
              </div>
              <input 
                type="range" min="6" max="60" step="6"
                value={tenure} onChange={e => setTenure(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div className="pt-6 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 mb-2 font-black uppercase tracking-widest">Monthly Installment</p>
              <p className="text-5xl font-black text-emerald-600 tracking-tighter">₹{emiPerMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">At {rate}% p.a. ROI</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white relative z-10">
            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Calendar className="text-slate-900" size={20} strokeWidth={2.5} />
              Schedule
            </h3>
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
              <span className="flex items-center gap-1.5 text-emerald-600"><CheckCircle2 size={14} /> Completed</span>
              <span className="flex items-center gap-1.5 text-slate-400"><Clock size={14} /> Upcoming</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[9px] font-black tracking-[0.2em] border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4 text-left">Period</th>
                  <th className="px-8 py-4 text-left">Principal</th>
                  <th className="px-8 py-4 text-left">Interest</th>
                  <th className="px-8 py-4 text-left font-display text-slate-900">Total Due</th>
                  <th className="px-8 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedule.slice(0, 10).map((item) => (
                  <tr key={item.month} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5 font-black text-slate-900 text-xs">MONTH {item.month < 10 ? `0${item.month}` : item.month}</td>
                    <td className="px-8 py-5 text-slate-500 font-medium font-mono text-[11px]">₹{item.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    <td className="px-8 py-5 text-slate-400 serif-italic text-xs">₹{item.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    <td className="px-8 py-5 font-black text-slate-900">₹{item.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => togglePaid(item.month)}
                          className={`min-w-[80px] py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                            item.status === 'Paid' 
                              ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white'
                          }`}
                        >
                          {item.status}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400 px-8">
            <p>Overall Progress</p>
            <div className="flex items-center gap-4">
               <span>{Math.round((schedule.filter(s => s.status === 'Paid').length / tenure) * 100)}% Recovered</span>
               <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-emerald-600 transition-all duration-1000" 
                   style={{ width: `${(schedule.filter(s => s.status === 'Paid').length / tenure) * 100}%` }}
                 ></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

