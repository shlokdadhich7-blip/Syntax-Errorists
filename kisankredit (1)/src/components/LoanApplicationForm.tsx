import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, MapPin, Landmark, ClipboardCheck, ArrowRight, ArrowLeft, Loader2, Tractor, CheckCircle2, ShieldCheck, Banknote } from 'lucide-react';

interface LoanFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function LoanApplicationForm({ onSubmit, isLoading }: LoanFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: '',
    phone: '',
    address: '',
    // Step 2: Farm
    landSize: '',
    cropType: '',
    location: '',
    // Step 3: Loan
    amount: '',
    purpose: '',
    tenure: '12'
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const steps = [
    { title: 'Identity', icon: User },
    { title: 'Assets', icon: MapPin },
    { title: 'Capital', icon: Landmark },
    { title: 'Verify', icon: ShieldCheck },
  ];

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      await onSubmit(formData);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  const renderStep = () => {
    if (isSuccess) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-28 h-28 bg-emerald-600 text-white rounded-[2.5rem] flex items-center justify-center mb-10 shadow-3xl shadow-emerald-200 rotate-12">
             <CheckCircle2 size={56} />
          </div>
          <h4 className="editorial-title text-6xl text-slate-900 mb-4">Confirmed.</h4>
          <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.4em] max-w-xs leading-loose">
            Your application header is now secured in the KisanKredit immutable digital ledger.
          </p>
          <div className="mt-12 flex items-center gap-4 text-emerald-600 font-black px-6 py-3 bg-emerald-50 rounded-full">
             <Loader2 size={18} className="animate-spin" />
             <span className="text-[10px] uppercase tracking-[0.2em]">Redirecting to Real-time Hub...</span>
          </div>
        </motion.div>
      );
    }

    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
            <div className="space-y-4">
               <h4 className="editorial-title text-7xl text-slate-900">Identity.</h4>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Phase 01: Personal Verification Registry</p>
            </div>
            
            <div className="grid gap-10">
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-4 group-focus-within:text-emerald-600 transition-colors">Applicant Name / आवेदक का नाम (via Aadhar)</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  className="w-full pb-4 bg-transparent border-b-2 border-slate-100 focus:border-emerald-600 outline-none transition-all font-black text-2xl text-slate-900 placeholder:text-slate-100" 
                  placeholder="Legal Name / कानूनी नाम" 
                />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-4 group-focus-within:text-emerald-600 transition-colors">Digital Contact / मोबाइल नंबर</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="w-full pb-4 bg-transparent border-b-2 border-slate-100 focus:border-emerald-600 outline-none transition-all font-black text-2xl text-slate-900 placeholder:text-slate-100" 
                  placeholder="+91 00000 00000" 
                />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
            <div className="space-y-4">
               <h4 className="editorial-title text-7xl text-slate-900">Assets.</h4>
               <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.3em]">Phase 02: Agricultural Portfolio Registry</p>
            </div>

            <div className="grid gap-10">
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-4 group-focus-within:text-emerald-600 transition-colors">Total Plot Capital / कुल भूमि (Acres)</label>
                <input 
                  type="number" 
                  name="landSize" 
                  value={formData.landSize} 
                  onChange={handleChange} 
                  className="w-full pb-4 bg-transparent border-b-2 border-slate-100 focus:border-emerald-600 outline-none transition-all font-black text-2xl text-slate-900 placeholder:text-slate-100" 
                  placeholder="0.00" 
                />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-4 group-focus-within:text-emerald-600 transition-colors">Primary Harvest / मुख्य फसल</label>
                <select 
                  name="cropType" 
                  value={formData.cropType} 
                  onChange={handleChange} 
                  className="w-full pb-4 bg-transparent border-b-2 border-slate-100 focus:border-emerald-600 outline-none transition-all font-black text-2xl text-slate-900 appearance-none cursor-pointer"
                >
                  <option value="">Select Category / श्रेणी चुनें</option>
                  <option value="Wheat">Wheat / गेहूं</option>
                  <option value="Rice">Rice / धान</option>
                  <option value="Sugarcane">Sugarcane / गन्ना</option>
                  <option value="Cotton">Cotton / कपास</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
            <div className="space-y-4">
               <h4 className="editorial-title text-7xl text-slate-900">Capital.</h4>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Phase 03: Liquidity Deployment Details</p>
            </div>

            <div className="grid gap-10">
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-4 group-focus-within:text-emerald-600 transition-colors">Target Disbursement / ऋण राशि (₹)</label>
                <input 
                  type="number" 
                  name="amount" 
                  value={formData.amount} 
                  onChange={handleChange} 
                  className="w-full pb-4 bg-transparent border-b-2 border-slate-100 focus:border-emerald-600 outline-none transition-all font-black text-4xl text-emerald-600 tracking-tighter placeholder:text-emerald-50" 
                  placeholder="0.00" 
                />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-4 group-focus-within:text-emerald-600 transition-colors">Amortization / भुगतान अवधि</label>
                <div className="grid grid-cols-3 gap-4">
                   {['6', '12', '24'].map(m => (
                     <button
                       key={m}
                       onClick={() => setFormData({...formData, tenure: m})}
                       className={`py-6 rounded-2xl font-black text-xs uppercase transition-all ${
                         formData.tenure === m ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-400 border border-slate-100'
                       }`}
                     >
                       {m} Months <br /> / महीने
                     </button>
                   ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
            <div className="space-y-4">
               <h4 className="editorial-title text-7xl text-slate-900 text-center">Verify.</h4>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] text-center">Phase 04: Final Metadata Review</p>
            </div>

            <div className="bento-card bg-[#fdfcf6] border-slate-200/40 p-12 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                  <Banknote size={150} />
               </div>
               
               <div className="space-y-10 relative z-10">
                  <div className="flex justify-between items-end border-b border-slate-200 pb-6">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Farmer / किसान</span>
                     <span className="text-xl font-black italic">{formData.fullName || '—'}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-slate-200 pb-6">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Net Credit / कुल राशि</span>
                     <span className="text-4xl font-black tracking-tighter text-emerald-600">₹{Number(formData.amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Harvest / फसल</span>
                     <span className="text-xl font-black">{formData.landSize || 0} Acres ({formData.cropType || 'Mix'})</span>
                  </div>
               </div>
            </div>
            
            <p className="text-[9px] text-center font-black uppercase tracking-[0.2em] text-slate-300 px-12 italic">
               By proceeding, you authorize digital field verification. <br />
               आगे बढ़कर, आप डिजिटल सत्यापन को अधिकृत करते हैं।
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Progress Rail */}
        <div className="lg:col-span-3 lg:pt-12">
           {!isSuccess && (
             <div className="space-y-10">
                {steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                       i + 1 < step ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 
                       i + 1 === step ? 'bg-white border-slate-900 text-slate-900 shadow-xl' : 
                       'bg-white border-slate-100 text-slate-300'
                     }`}>
                        <s.icon size={20} strokeWidth={2.5} />
                     </div>
                     <div className="hidden lg:block">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${i + 1 <= step ? 'text-slate-900' : 'text-slate-300'}`}>{s.title}</p>
                     </div>
                  </div>
                ))}
             </div>
           )}
        </div>

        {/* Form Container */}
        <div className="lg:col-span-9">
          <div className="bento-card border-none shadow-3xl bg-white p-12 min-h-[600px] flex flex-col">
            <div className="flex-1">
              {renderStep()}
            </div>

            {!isSuccess && (
              <div className="flex items-center justify-between mt-12 pt-12 border-t border-slate-50">
                <button
                  onClick={prevStep}
                  disabled={step === 1 || isLoading}
                  className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    step === 1 ? 'opacity-0 cursor-default' : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                  Backward
                </button>
                
                {step < 4 ? (
                  <button
                    onClick={nextStep}
                    className="group flex items-center gap-5 px-12 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.25em] hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-200"
                  >
                    Advance Step
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="group flex items-center gap-5 px-12 py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.25em] hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-200 disabled:bg-emerald-200"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                    {isLoading ? 'Decrypting Final Metadata...' : 'Commit Application'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
