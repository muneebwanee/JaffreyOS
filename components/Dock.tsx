import React from 'react';
import { AppType } from '../types';
import { 
  Mail, Image, Cloud, Plane, Monitor, ShoppingCart, 
  Cpu, Music, MessageCircle, Users, Hash, Search, 
  Globe, BookOpen, Compass, Sparkles 
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const Dock: React.FC = () => {
  const { setApp, activeApp, isMinimized } = useData();

  const apps = [
    { type: AppType.JMAIL, icon: Mail, color: '#007AFF', label: 'Jmail' },
    { type: AppType.JMESSAGES, icon: MessageCircle, color: '#34C759', label: 'JMessages' },
    { type: AppType.JPHOTOS, icon: Image, color: 'linear-gradient(to bottom, #FFD60A, #FF9F0A)', label: 'JPhotos' },
    { type: AppType.JDRIVE, icon: Cloud, color: '#32ADE6', label: 'JDrive' },
    { type: AppType.JFLIGHTS, icon: Plane, color: '#FF9500', label: 'JFlights' },
    { type: AppType.JVR, icon: Monitor, color: '#AF52DE', label: 'JVR' },
    { type: AppType.JAMAZON, icon: ShoppingCart, color: '#FF2D55', label: 'JAmazon' },
    { type: AppType.JOTIFY, icon: Music, color: '#1DB954', label: 'Jotify' },
    { type: AppType.JACEBOOK, icon: Users, color: '#1877F2', label: 'Jacebook' },
    { type: AppType.TOPICS, icon: Hash, color: '#5856D6', label: 'Topics' },
    { type: AppType.FIND_PEOPLE, icon: Search, color: '#FF3B30', label: 'Find People' },
    { type: AppType.SEARCH, icon: Globe, color: '#00C7BE', label: 'Search' },
    { type: AppType.FINDER, icon: Compass, color: 'linear-gradient(to bottom, #00C7BE, #007AFF)', label: 'Finder' },
    { type: AppType.STORY, icon: BookOpen, color: '#8E8E93', label: 'Story' }
  ];

  const isJeminiActive = activeApp === AppType.JEMINI;
  const isJeminiMinimized = isJeminiActive && isMinimized;

  return (
    <div className="fixed bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-[90] flex justify-center w-auto w-full max-w-full md:w-auto">
      <div className="flex items-end gap-2 md:gap-3 bg-white/20 dark:bg-black/20 backdrop-blur-[50px] saturate-[150%] px-3 py-3 md:px-6 md:py-4 rounded-[24px] md:rounded-[32px] border border-white/10 dark:border-white/5 shadow-2xl overflow-x-auto max-w-[90vw] md:max-w-[95vw] transition-all hover:scale-[1.01] hover:bg-white/30 dark:hover:bg-black/30 scrollbar-hide">
        
        {/* Jemini is always first */}
        <div className="flex flex-col items-center gap-1 group relative min-w-[48px] md:min-w-[60px]">
             <div className="relative">
                <button 
                    onClick={() => setApp(AppType.JEMINI)} 
                    className={`
                        w-[42px] h-[42px] md:w-[52px] md:h-[52px] bg-gradient-to-br from-[#4E7BEE] to-[#9B72CB] rounded-[12px] md:rounded-[16px] flex items-center justify-center shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.3,0,0,1)] active:scale-95 group-hover:-translate-y-2 z-10 relative
                        ${isJeminiMinimized ? 'opacity-70 grayscale-[0.5]' : 'opacity-100'}
                    `}
                >
                    <Sparkles className="text-white w-5 h-5 md:w-7 md:h-7 drop-shadow-md" />
                </button>
                {/* Dot Indicator */}
                <div className={`w-1 h-1 rounded-full bg-white shadow-[0_0_4px_white] transition-opacity duration-300 absolute -bottom-1.5 md:-bottom-2 left-1/2 -translate-x-1/2 ${isJeminiActive ? 'opacity-100' : 'opacity-0'}`}></div>
             </div>
             <span className="hidden md:block text-[11px] text-white font-medium tracking-wide opacity-90 drop-shadow-md">Jemini</span>
        </div>

        <div className="w-[1px] h-10 md:h-14 bg-white/20 dark:bg-white/10 mx-0.5 self-center"></div>

        {apps.map((app) => {
            const isActive = activeApp === app.type;
            const isMin = isActive && isMinimized;
            
            return (
                <div key={app.type} className="flex flex-col items-center gap-1 group relative min-w-[48px] md:min-w-[60px]">
                    <div className="relative">
                        <button
                            onClick={() => setApp(app.type)}
                            className={`
                                relative flex items-center justify-center w-[42px] h-[42px] md:w-[52px] md:h-[52px] rounded-[12px] md:rounded-[16px]
                                transition-all duration-300 ease-[cubic-bezier(0.3,0,0,1)]
                                ${isMin ? 'opacity-70 grayscale-[0.5]' : 'opacity-100'}
                                active:scale-90 group-hover:-translate-y-2 z-10
                            `}
                            style={{ 
                                background: app.color,
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                            }}
                            title={app.label}
                        >
                            <app.icon className="text-white w-5 h-5 md:w-7 md:h-7 drop-shadow-md" strokeWidth={2} />
                        </button>
                        {/* Dot Indicator */}
                        <div className={`w-1 h-1 rounded-full bg-white shadow-[0_0_4px_white] transition-opacity duration-300 absolute -bottom-1.5 md:-bottom-2 left-1/2 -translate-x-1/2 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    </div>
                    <span className="hidden md:block text-[11px] text-white font-medium tracking-wide opacity-90 drop-shadow-md whitespace-nowrap">{app.label}</span>
                </div>
            );
        })}
      </div>
    </div>
  );
};