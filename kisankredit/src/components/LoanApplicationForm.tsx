import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, MapPin, Landmark, ClipboardCheck, ArrowRight, ArrowLeft, Loader2, Tractor, CheckCircle2 } from 'lucide-react';

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
    { title: 'Personal', icon: User },
    { title: 'Farm', icon: MapPin },
    { title: 'Loan', icon: Landmark },
    { title: 'Review', icon: ClipboardCheck },
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
          className="flex flex-col items-center justify-center py-10 text-center"
        >
          <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-emerald-200">
             <CheckCircle2 size={48} className="animate-pulse" />
          </div>
          <h4 className="text-4xl font-black uppercase tracking-tighter">Application Confirmed</h4>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2 mb-6">Secured in Digital Ledger</p>
          <div className="flex items-center gap-3 text-emerald-600 font-bold">
             <Loader2 size={16} className="animate-spin" />
             <span className="text-xs uppercase tracking-widest">Redirecting to Live Tracker...</span>
          </div>
        </motion.div>
      );
    }

    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100">
               <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-800">
                  <User size={32} />
               </div>
               <div>
                  <h4 className="text-xl font-black uppercase tracking-tighter">Your Identity</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aadhar name & mobile for verification</p>
               </div>
            </div>
            <div className="grid gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Full Name (As per Aadhar)</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold" placeholder="Enter your full name" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold" placeholder="Enter 10 digit number" />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="flex items-center gap-5 p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
               <div className="p-4 bg-white rounded-2xl shadow-sm text-emerald-600">
                  <Tractor size={32} />
               </div>
               <div>
                  <h4 className="text-xl font-black uppercase tracking-tighter">Farm Valuation</h4>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Details of your agricultural assets</p>
               </div>
            </div>
            <div className="grid gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Land Size (Acres)</label>
                <input type="number" name="landSize" value={formData.landSize} onChange={handleChange} className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold" placeholder="e.g. 5" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Primary Crop Type</label>
                <select name="cropType" value={formData.cropType} onChange={handleChange} className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold">
                  <option value="">Select Crop / फसल चुनें</option>
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
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="flex items-center gap-5 p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
               <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-600">
                  <Landmark size={32} />
               </div>
               <div>
                  <h4 className="text-xl font-black uppercase tracking-tighter">Loan Request</h4>
                  <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Amount and purpose of funding</p>
               </div>
            </div>
            <div className="grid gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Requested Amount (₹)</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full p-4 bg-slate-900 border-2 border-slate-800 rounded-2xl focus:border-indigo-500 outline-none transition-all font-black text-2xl text-white tracking-tighter" placeholder="e.g. 50000" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Tenure (Months)</label>
                <select name="tenure" value={formData.tenure} onChange={handleChange} className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all font-bold">
                  <option value="6">6 Months / महिने</option>
                  <option value="12">12 Months / महिने</option>
                  <option value="24">24 Months / महिने</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-center pt-4">
            <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-200 animate-bounce">
               <ClipboardCheck size={48} />
            </div>
            <div>
               <h4 className="text-3xl font-black uppercase tracking-tighter">Confirm Profile</h4>
               <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto mt-2">Check details before final submission to digital records.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-4 shadow-inner">
               <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-[10px] font-black uppercase text-slate-400">Farmer</span>
                  <span className="text-sm font-black">{formData.fullName || 'Not set'}</span>
               </div>
               <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-[10px] font-black uppercase text-slate-400">Amount</span>
                  <span className="text-xl font-black text-emerald-600 tracking-tighter">₹{Number(formData.amount || 0).toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-slate-400">Asset</span>
                  <span className="text-sm font-black italic">{formData.landSize || 0} Acres</span>
               </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-slate-900 p-10 text-white relative">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Apply for<br />Disbursement</h2>
            <p className="text-slate-400 mt-4 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Farmer Credit Line v2.4</p>
          </div>
          <div className="bg-emerald-600 p-3 rounded-2xl shadow-xl shadow-emerald-500/20">
            <Landmark size={32} />
          </div>
        </div>
        
        {/* Progress Tracker */}
        <div className="flex justify-between mt-12 relative">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2"></div>
          <div 
            className="absolute top-5 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 transition-all duration-500"
            style={{ width: `${(step - 1) * 33.33}%` }}
          ></div>
          {steps.map((s, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${i + 1 < step ? 'bg-emerald-600 border-emerald-600 text-white' : i + 1 === step ? 'bg-white border-emerald-600 text-emerald-600 shadow-xl' : 'bg-slate-800 border-slate-800 text-slate-600'}`}>
                {i + 1 < step ? <ClipboardCheck size={18} /> : <s.icon size={18} />}
              </div>
              <span className={`text-[9px] mt-3 font-black uppercase tracking-[0.1em] ${i + 1 <= step ? 'text-white' : 'text-slate-600'}`}>{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-10">
        <div className="min-h-[350px]">
          {renderStep()}
        </div>

        {!isSuccess && (
          <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-100">
            <button
              onClick={prevStep}
              disabled={step === 1 || isLoading}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${step === 1 ? 'text-slate-300' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            
            {step < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-3 px-10 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200"
              >
                Next Phase
                <ArrowRight size={16} />
              </button>
            ) : (
              !isSuccess && (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center gap-3 px-10 py-3 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 disabled:bg-emerald-300"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Submit Final'}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

