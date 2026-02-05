import React, { useEffect, useState } from 'react';
import { PageType, AppType } from '../types';
import { 
    Info, FileText, Shield, Heart, Github, Sun, Moon, 
    Mail, Image, Cloud, Plane, Monitor, ShoppingCart, 
    Cpu, Music, MessageCircle, Users, Hash, Search, 
    Globe, BookOpen, Code, Compass, Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPage: (page: PageType) => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({ isOpen, onClose, onOpenPage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { setApp } = useData();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isOpen) {
      setIsVisible(true);
    } else {
      timeoutId = setTimeout(() => setIsVisible(false), 400);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  const systemApps = [
    { page: PageType.ABOUT, icon: Info, bg: 'bg-blue-500', label: 'About' },
    { page: PageType.TOS, icon: FileText, bg: 'bg-gray-500', label: 'TOS' },
    { page: PageType.PRIVACY, icon: Shield, bg: 'bg-green-500', label: 'Privacy' },
    { page: PageType.DONATE, icon: Heart, bg: 'bg-pink-500', label: 'Donate' },
    { type: 'dev', icon: Code, bg: 'bg-zinc-800', label: 'Developer', action: () => window.open('https://github.com/muneebwanee', '_blank') },
    { type: 'theme', icon: isDarkMode ? Moon : Sun, bg: isDarkMode ? 'bg-indigo-500' : 'bg-orange-500', label: isDarkMode ? 'Dark' : 'Light', action: toggleTheme },
  ];

  const apps = [
    { type: AppType.JEMINI, icon: Sparkles, color: 'linear-gradient(to bottom, #4E7BEE, #9B72CB)', label: 'Jemini' },
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

  if (!isOpen && !isVisible) return null;

  return (
    <>
        <div 
            className={`fixed inset-0 z-[99] bg-black/30 backdrop-blur-[6px] transition-opacity duration-400 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={onClose}
        ></div>

        <div 
            className={`
                fixed z-[100] overflow-y-auto hide-scrollbar
                
                /* Mobile Positioning */
                top-14 left-4 right-4 w-auto bottom-8
                
                /* Desktop Positioning */
                md:top-12 md:right-4 md:left-auto md:w-[360px] md:bottom-auto md:max-h-[85vh]
                
                bg-white/80 dark:bg-[#000000]/70 backdrop-blur-[60px] saturate-[180%]
                rounded-[36px]
                border border-white/40 dark:border-white/10 
                shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)]
                
                transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)
                origin-top md:origin-top-right
                
                p-6 text-black dark:text-white
                ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-95 pointer-events-none'}
            `}
        >
            <div className="flex flex-col gap-8">
                
                {/* System Toggles Grid */}
                <div>
                    <div className="px-2 text-[11px] font-bold text-gray-500/80 uppercase tracking-widest mb-4">System</div>
                    <div className="grid grid-cols-3 gap-3">
                        {systemApps.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    if (item.action) item.action();
                                    else if (item.page) onOpenPage(item.page);
                                }}
                                className={`
                                    h-24 rounded-[24px] flex flex-col items-center justify-center gap-2
                                    bg-white/50 dark:bg-[#1C1C1E]/50 active:scale-95 transition-all duration-300
                                    group hover:bg-white/70 dark:hover:bg-[#3A3A3C] ring-1 ring-black/5 dark:ring-white/10
                                `}
                            >
                                <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon size={16} fill={item.bg === 'bg-pink-500' ? 'currentColor' : 'none'} />
                                </div>
                                <span className="text-[11px] font-medium opacity-80">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-400/10 mx-2"></div>
                
                {/* Apps Grid - Clean Icon Style */}
                <div>
                    <div className="px-2 text-[11px] font-bold text-gray-500/80 uppercase tracking-widest mb-4">Applications</div>
                    <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                        {apps.map((app) => (
                            <button
                                key={app.type}
                                onClick={() => { setApp(app.type); onClose(); }}
                                className="flex flex-col items-center justify-start gap-2.5 active:scale-90 transition-all duration-300 group"
                            >
                                <div 
                                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 relative" 
                                    style={{ background: app.color }}
                                >
                                    <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <app.icon className="text-white w-7 h-7 drop-shadow-sm" strokeWidth={2} />
                                </div>
                                <span className="text-[10px] font-medium opacity-80 truncate w-full text-center px-1 tracking-tight">{app.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};