import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calculator, Landmark, AlertCircle, Loader2 } from 'lucide-react';
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
    if (e === 'High') return 'text-green-600 bg-green-50';
    if (e === 'Medium') return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-100">
            <Calculator size={20} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">AI Analysis</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 font-display">Total Land Owned (Acres)</label>
            <input 
              type="number" 
              value={inputs.landOwned} 
              onChange={e => setInputs({...inputs, landOwned: e.target.value})}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold" 
              placeholder="e.g. 10" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 font-display">Annual Farm Income (₹)</label>
            <input 
              type="number" 
              value={inputs.annualIncome} 
              onChange={e => setInputs({...inputs, annualIncome: e.target.value})}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold" 
              placeholder="e.g. 300000" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 font-display">Existing Loans/Debt (₹)</label>
            <input 
              type="number" 
              value={inputs.existingLoans} 
              onChange={e => setInputs({...inputs, existingLoans: e.target.value})}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold" 
              placeholder="e.g. 50000" 
            />
          </div>
          
          <button 
            onClick={handleEstimate}
            disabled={isLoading || !inputs.landOwned || !inputs.annualIncome}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 disabled:opacity-50 mt-6"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {isLoading ? 'Processing...' : 'Run Eligibility Check'}
          </button>
        </div>
      </div>

      <div className="bg-emerald-600 p-8 rounded-3xl shadow-sm text-white min-h-[400px] flex flex-col">
        {!result ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 opacity-60">
            <Landmark size={80} strokeWidth={1} />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em]">Ready for Analysis</p>
              <p className="text-xs text-emerald-100 max-w-xs mx-auto mt-2">Submit your farm data on the left to receive an AI-powered credit limit estimation.</p>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full flex flex-col">
            <div className={`self-start px-5 py-1.5 rounded-full font-black text-xs uppercase tracking-widest mb-8 ${getStatusColor(result.eligibility)}`}>
              {result.eligibility} Risk Asset
            </div>
            
            <div className="mb-10">
              <p className="text-[10px] text-emerald-200 font-bold uppercase tracking-widest mb-1">Max Suggested Disbursement</p>
              <p className="text-6xl font-black text-white tracking-tighter">₹{result.estimatedAmount.toLocaleString()}</p>
            </div>
            
            <div className="bg-emerald-700/40 p-6 rounded-2xl flex-grow border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-3 text-emerald-200 text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={14} />
                AI Commentary
              </div>
              <p className="text-white text-lg serif-italic leading-snug">
                "{result.explanation}"
              </p>
            </div>
            
            <div className="mt-8 flex items-center gap-3 text-[10px] text-emerald-100 font-bold uppercase tracking-widest opacity-70">
              <AlertCircle size={14} />
              Subject to institutional verification
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

