import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, User, Sparkles, FileText, PieChart, CheckCircle2, ArrowRight, Smartphone, Info } from 'lucide-react';

export default function UserGuide() {
  const steps = [
    {
      title: "Step 1: Check Overview",
      hindi: "चरण 1: अवलोकन देखें",
      desc: "Switch between profiles and see your current loan status at a glance.",
      hdesc: "प्रोफ़ाइल बदलें और एक नज़र में अपनी वर्तमान ऋण स्थिति देखें।",
      icon: User,
      color: "bg-blue-500"
    },
    {
      title: "Step 2: AI Eligibility Check",
      hindi: "चरण 2: एआई पात्रता जांच",
      desc: "Use our smart calculator to see how much loan you can potentially get based on your farm size.",
      hdesc: "यह देखने के लिए कि आपको अपने खेत के आकार के आधार पर कितना ऋण मिल सकता है, हमारे स्मार्ट कैलकुलेटर का उपयोग करें।",
      icon: Sparkles,
      color: "bg-emerald-500"
    },
    {
      title: "Step 3: Submit Application",
      hindi: "चरण 3: आवेदन जमा करें",
      desc: "Fill out the simple 4-step form to register your farm and request capital.",
      hdesc: "अपने खेत को पंजीकृत करने और पूंजी का अनुरोध करने के लिए 4-चरणीय फॉर्म भरें।",
      icon: FileText,
      color: "bg-amber-500"
    },
    {
      title: "Step 4: Plan Repayment",
      hindi: "चरण 4: पुनर्भुगतान योजना",
      desc: "Use the EMI tracker to see your monthly installments and track your payment history.",
      hdesc: "अपनी मासिक किश्तों को देखने और अपने भुगतान इतिहास को ट्रैक करने के लिए ईएमआई ट्रैकर का उपयोग करें।",
      icon: PieChart,
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-50 rounded-full border border-emerald-100 text-emerald-600">
           <BookOpen size={18} />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Help & Support Terminal</span>
        </div>
        <h2 className="editorial-title text-7xl md:text-8xl text-slate-900">
          User <br />
          <span className="text-emerald-600 italic underline decoration-emerald-100 decoration-8 underline-offset-8">Guide.</span>
        </h2>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em]">उपयोगकर्ता निर्देशिका</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bento-card group hover:border-emerald-200 transition-all p-10 bg-white shadow-2xl shadow-slate-200/50"
          >
            <div className={`w-14 h-14 ${step.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl rotate-3 group-hover:rotate-0 transition-transform`}>
              <step.icon size={28} />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 leading-none mb-1">{step.title}</h3>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{step.hindi}</p>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-500 leading-relaxed italic">"{step.desc}"</p>
                <p className="text-xs font-bold text-slate-300 leading-relaxed uppercase tracking-wider">{step.hdesc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bento-card bg-slate-900 text-white p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12">
           <Smartphone size={200} />
        </div>
        
        <div className="flex-1 space-y-6 relative z-10">
          <div className="flex items-center gap-4 text-emerald-400">
             <Info size={24} />
             <p className="text-[10px] font-black uppercase tracking-[0.3em]">Mobile Friendly</p>
          </div>
          <h4 className="text-4xl font-black uppercase tracking-tighter">Everything in your <span className="text-emerald-500 underline decoration-slate-700 underline-offset-8">pocket.</span></h4>
          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-lg">
            KisanKredit is designed specifically for high precision agricultural financial management. 
            All data is secured and accessible from any device. 
            <br /><br />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest italic">किसी भी सहायता के लिए हमारे हेल्पलाइन नंबर पर संपर्क करें।</span>
          </p>
        </div>
        
        <div className="w-full md:w-auto relative z-10">
           <button className="w-full md:w-auto px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-emerald-500 hover:text-white transition-all shadow-2xl shadow-emerald-950">
              Video Tutorial <ArrowRight size={16} />
           </button>
        </div>
      </div>
      
      <div className="text-center pt-10">
         <div className="inline-flex items-center gap-3 text-slate-400">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Verified Secure Protocol v.2.4</span>
         </div>
      </div>
    </div>
  );
}
