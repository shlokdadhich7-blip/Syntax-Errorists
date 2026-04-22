import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calculator, Landmark, AlertCircle, Loader2, ArrowRight, Fingerprint, Target } from 'lucide-react';
import { estimateEligibility, EligibilityResult } from '../services/aiService';

export default function EligibilityEstimator() {
  const [inputs, setInputs] = useState({
    landOwned: '',
    annualIncome: '',
    existingLoans: ''
  });
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEstimate = async () => {
    setIsLoading(true);
    try {
      const res = await estimateEligibility(
        parseFloat(inputs.landOwned),
        parseFloat(inputs.annualIncome),
        parseFloat(inputs.existingLoans || "0")
      );
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (e: string) => {
    if (e === 'High') return 'text-emerald-400 border-emerald-400';
    if (e === 'Medium') return 'text-amber-400 border-amber-400';
    return 'text-rose-400 border-rose-400';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Left Pane: The Technical Instrument */}
      <div className="lg:col-span-5 bg-white p-12 rounded-[3rem] border border-slate-200/60 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Calculator size={100} />
        </div>
        
        <div className="relative z-10 space-y-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900">Analysis <br /><span className="text-emerald-600">Module</span></h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">Provide farm metrics for appraisal. <br /> / मूल्यांकन के लिए कृषि विवरण प्रदान करें।</p>
          </div>
          
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3 group-focus-within:text-emerald-600 transition-colors">Land Capital / भूमि (Acres)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={inputs.landOwned} 
                  onChange={e => setInputs({...inputs, landOwned: e.target.value})}
                  className="w-full pb-3 bg-transparent border-b-2 border-slate-100 focus:border-emerald-500 outline-none transition-all text-2xl font-black text-slate-900 placeholder:text-slate-200" 
                  placeholder="0.00" 
                />
              </div>
            </div>

            <div className="group">
               <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3 group-focus-within:text-emerald-600 transition-colors">Annual Revenue / वार्षिक आय (₹)</label>
               <input 
                 type="number" 
                 value={inputs.annualIncome} 
                 onChange={e => setInputs({...inputs, annualIncome: e.target.value})}
                 className="w-full pb-3 bg-transparent border-b-2 border-slate-100 focus:border-emerald-500 outline-none transition-all text-2xl font-black text-slate-900 placeholder:text-slate-200" 
                 placeholder="0.00" 
               />
            </div>

            <div className="group">
               <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3 group-focus-within:text-emerald-600 transition-colors">Existing Loans / बकाया ऋण (₹)</label>
               <input 
                 type="number" 
                 value={inputs.existingLoans} 
                 onChange={e => setInputs({...inputs, existingLoans: e.target.value})}
                 className="w-full pb-3 bg-transparent border-b-2 border-slate-100 focus:border-emerald-500 outline-none transition-all text-2xl font-black text-slate-900 placeholder:text-slate-200" 
                 placeholder="0.00" 
               />
            </div>
            
            <button 
              onClick={handleEstimate}
              disabled={isLoading || !inputs.landOwned || !inputs.annualIncome}
              className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-emerald-600 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-slate-200 disabled:opacity-30 group"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Fingerprint size={18} className="group-hover:scale-110 transition-transform" />}
              {isLoading ? 'Decrypting Eligibility...' : 'Execute AI Appraisal / एआई जांच करें'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Pane: The Resulting Insight */}
      <div className="lg:col-span-7 h-full flex flex-col justify-center">
        {!result ? (
          <div className="space-y-12 p-12">
             <div className="h-0.5 w-24 bg-slate-200"></div>
             <p className="editorial-title text-5xl md:text-7xl text-slate-300">
               Secure your <br />
               <span className="italic text-slate-200 underline decoration-slate-100 underline-offset-8">potential</span> <br />
               today.
             </p>
             <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <Target size={16} />
                <span>Waiting for system input synchronization...</span>
             </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="w-full space-y-12 p-6 lg:p-12"
          >
            <div className="space-y-6">
               <div className={`inline-flex px-5 py-2 rounded-full border-2 font-black text-[10px] uppercase tracking-[0.3em] ${getStatusColor(result.eligibility)} shadow-lg shadow-black/5`}>
                 {result.eligibility} Probability Rating
               </div>
               <h3 className="editorial-title text-7xl md:text-9xl text-slate-900">
                 Market <br />
                 <span className="text-emerald-600">Credit.</span>
               </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
               <div className="md:col-span-7 bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl text-white">
                  <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.3em] mb-4">Max Suggested Limit</p>
                  <p className="text-6xl font-black text-white tracking-tighter">₹{result.estimatedAmount.toLocaleString()}</p>
                  <div className="mt-8 flex items-center gap-2">
                     <div className="h-1 flex-1 bg-emerald-500 rounded-full"></div>
                     <div className="h-1 flex-1 bg-slate-700 rounded-full"></div>
                     <div className="h-1 flex-1 bg-slate-700 rounded-full"></div>
                  </div>
               </div>
               
               <div className="md:col-span-5 p-4">
                  <div className="flex items-center gap-3 mb-4 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em]">
                    <Sparkles size={16} />
                    Insight
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed italic">
                    "{result.explanation}"
                  </p>
                  <button 
                    onClick={() => window.scrollTo(0, 0)}
                    className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-1"
                  >
                    Apply Now <ArrowRight size={12} />
                  </button>
               </div>
            </div>
            
            <div className="flex items-center gap-4 p-5 bg-[#fdfcf6] border border-slate-200 rounded-2xl">
               <AlertCircle size={20} className="text-slate-400 shrink-0" />
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] leading-relaxed">
                 AI estimations are generated based on mathematical models and current market liquidity. Final disbursement depends on manual field verification by a bank officer.
               </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
