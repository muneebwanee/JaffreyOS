import React, { useState, useEffect } from 'react';
import { ChevronRight, Compass, Mail, MessageCircle } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check local storage for onboarding status
    const hasSeenOnboarding = localStorage.getItem('jeffreyos_onboarding_completed_v1');
    if (!hasSeenOnboarding) {
      // Small delay for initial load aesthetics
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('jeffreyos_onboarding_completed_v1', 'true');
  };

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
        setStep(prev => prev + 1);
        setIsAnimating(false);
    }, 200);
  };

  const steps = [
    {
      title: "Welcome to JeffreyOS",
      description: "A high-fidelity operating system simulation running entirely in your browser. Experience the digital world of Jeffrey.",
      icon: (
        <div className="relative group">
            <div className="w-20 h-20 bg-gradient-to-b from-blue-600 to-blue-700 rounded-[22px] shadow-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent"></div>
                <span className="text-white text-5xl font-medium tracking-tighter drop-shadow-md z-10">J</span>
            </div>
            <div className="absolute -inset-4 bg-blue-500/30 blur-xl rounded-full -z-10 animate-pulse"></div>
        </div>
      )
    },
    {
      title: "Navigation & Apps",
      description: "Launch applications from the Dock at the bottom. Finder shows backup material.",
      icon: (
        <div className="flex gap-4 items-end p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
             <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#00C7BE] to-[#007AFF] flex items-center justify-center shadow-lg transform translate-y-2">
                <Compass className="text-white w-6 h-6" />
             </div>
             <div className="w-14 h-14 rounded-2xl bg-[#007AFF] flex items-center justify-center shadow-2xl z-10">
                <Mail className="text-white w-7 h-7" />
             </div>
             <div className="w-12 h-12 rounded-xl bg-[#34C759] flex items-center justify-center shadow-lg transform translate-y-2">
                <MessageCircle className="text-white w-6 h-6" />
             </div>
        </div>
      )
    },
    {
      title: "Window Controls",
      description: "Use the traffic lights to manage your workspace. Red to close, Yellow to refresh, and Green to maximize or restore.",
      content: (
        <div className="flex flex-col gap-3 p-6 bg-[#2C2C2E] rounded-xl border border-white/10 shadow-xl w-64 transform rotate-1 hover:rotate-0 transition-transform duration-500">
             <div className="flex gap-2 mb-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] shadow-sm"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#FEBC2E] shadow-sm"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#28C840] shadow-sm"></div>
             </div>
             <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
             <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
             <div className="h-2 w-5/6 bg-white/10 rounded-full mt-2"></div>
        </div>
      )
    },
    {
      title: "Control Center",
      description: "Access system settings, themes, and more by clicking the battery/time indicator in the top right corner.",
      icon: (
        <div className="flex items-center gap-3 px-5 py-3 bg-white/10 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
            <span className="text-sm font-semibold text-white">100%</span>
            <div className="relative w-[24px] h-[12px] border-[1.5px] border-white/90 rounded-[3px] p-[1px]">
                <div className="w-full h-full bg-white/90 rounded-[1px]"></div>
                <div className="absolute -right-[3.5px] top-1/2 -translate-y-1/2 w-[2px] h-[4px] bg-white/90 rounded-r-[1px]"></div>
            </div>
        </div>
      )
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-500 p-4">
        <div className="w-full max-w-[400px] bg-[#1c1c1e] border border-white/10 rounded-[36px] shadow-2xl relative overflow-hidden flex flex-col">
            
            {/* Aesthetic Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#1c1c1e] to-[#1c1c1e] animate-pulse"></div>
            </div>

            <div className="relative z-10 flex flex-col p-8 h-full min-h-[460px]">
                {/* Header / Skip */}
                <div className="flex justify-between items-center mb-8">
                     <div className="flex gap-1.5">
                        {steps.map((_, i) => (
                            <div 
                                key={i} 
                                className={`h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${i === step ? 'w-8 bg-blue-500' : 'w-2 bg-white/10'}`}
                            ></div>
                        ))}
                     </div>
                     <button 
                        onClick={handleClose}
                        className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
                     >
                        Skip
                     </button>
                </div>

                {/* Content */}
                <div className={`flex-1 flex flex-col items-center text-center justify-center transition-all duration-300 transform ${isAnimating ? 'opacity-0 scale-95 translate-x-4' : 'opacity-100 scale-100 translate-x-0'}`}>
                    <div className="h-40 flex items-center justify-center mb-6 w-full">
                        {steps[step].icon || steps[step].content}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">{steps[step].title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
                        {steps[step].description}
                    </p>
                </div>

                {/* Footer Buttons */}
                <div className="mt-8 flex items-center justify-center">
                    {step < steps.length - 1 ? (
                        <button 
                            onClick={handleNext}
                            className="w-full py-4 bg-white text-black rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10"
                        >
                            Continue <ChevronRight size={16} className="opacity-80" />
                        </button>
                    ) : (
                        <button 
                            onClick={handleClose}
                            className="w-full py-4 bg-[#007AFF] text-white rounded-2xl font-bold text-sm hover:bg-[#0071eb] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30"
                        >
                            Get Started
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};