import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from '../context/DataContext';
import { Dock } from '../components/Dock';
import { WebWindow } from './WebWindow';
import { StoryApp } from './StoryApp';
import { FinderWindow } from './FinderWindow';
import { MessagesApp } from './Messages/MessagesApp';
import { MailApp } from './Mail/MailApp';
import { ControlCenter } from '../components/ControlCenter';
import { PageViewer } from '../components/PageViewer';
import { OnboardingModal } from '../components/OnboardingModal';
import { AppType, PageType } from '../types';
import { format } from 'date-fns';
import { X, RotateCw, Maximize2 } from 'lucide-react';

const OSContent: React.FC = () => {
  const { activeApp, isMinimized, isMaximized, toggleMinimize, toggleMaximize, closeApp, currentUser } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [activePage, setActivePage] = useState<PageType | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Reset refresh key when app changes
  useEffect(() => {
    setRefreshKey(0);
  }, [activeApp]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleCopy = () => {
      navigator.clipboard.writeText('36QW21MQQxUK7ohBQnvP5itipe4bFx91Bo');
  };

  const getGreeting = () => {
    const hour = currentDate.getHours();
    // 5 AM to 11:59 AM -> Morning
    if (hour >= 5 && hour < 12) return 'Good Morning,';
    // 12 PM to 5:59 PM -> Afternoon
    if (hour >= 12 && hour < 18) return 'Good Afternoon,';
    // 6 PM to 4:59 AM -> Evening (handles the late night "why does it show morning" case)
    return 'Good Evening,';
  };

  const getAppConfig = (type: AppType) => {
      switch(type) {
          case AppType.JMAIL: return { component: <MailApp />, title: 'Jmail' };
          case AppType.JMESSAGES: return { component: <MessagesApp />, title: 'JMessages' };
          case AppType.JPHOTOS: return { url: 'https://www.jmail.world/photos', title: 'JPhotos' };
          case AppType.JDRIVE: return { url: 'https://www.jmail.world/drive/new-only', title: 'JDrive' };
          case AppType.JFLIGHTS: return { url: 'https://www.jmail.world/flights', title: 'JFlights' };
          case AppType.JVR: return { url: 'https://www.jmail.world/vr', title: 'JVR' };
          case AppType.JAMAZON: return { url: 'https://www.jmail.world/jamazon', title: 'JAmazon' };
          case AppType.JOTIFY: return { url: 'https://www.jmail.world/jotify', title: 'Jotify' };
          case AppType.JACEBOOK: return { url: 'https://www.jmail.world/jacebook', title: 'Jacebook' };
          case AppType.TOPICS: return { url: 'https://epstein.media/topics', title: 'Topics' };
          case AppType.FIND_PEOPLE: return { url: 'https://epstein.media/people', title: 'Find People' };
          case AppType.SEARCH: return { url: 'https://epsteinify.com', title: 'Search' };
          case AppType.STORY: return { internal: true, title: 'Story' };
          case AppType.FINDER: return { internal: true, title: 'Finder' };
          case AppType.DROPBOX: return { url: 'https://www.dropbox.com/scl/fo/9bq6uj0pnycpa4gxqiuzs/ABBA-BoYUAT7627MBeLiVYg?rlkey=3s6ggcjihou9nt8srsn2qt1n7&e=1&st=4aejaath&dl=0', title: 'Dropbox' };
          case AppType.GDRIVE_BACKUP: return { url: 'https://drive.google.com/drive/folders/1hTNH5woIRio578onLGElkTWofUSWRoH_?usp=sharing', title: 'Drive Backup' };
          default: return null;
      }
  }

  const currentAppConfig = activeApp ? getAppConfig(activeApp) : null;

  const getWindowStyle = () => {
      if (isMaximized) {
          return {
              top: '36px', 
              left: '0', 
              right: '0', 
              bottom: '0', 
              borderRadius: '0px',
              transform: 'none'
          };
      }

      if (isMobile) {
          return {
              top: '44px', 
              left: '0px', 
              right: '0px', 
              bottom: '96px',
              borderRadius: '24px',
              border: 'none',
              transform: 'none'
          };
      }

      return {
          top: '10%', 
          left: '15%', 
          right: '15%', 
          bottom: '18%',
          borderRadius: '16px',
          transform: 'none'
      };
  };

  const windowStyle = getWindowStyle();

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black text-white select-none font-sans antialiased cursor-default">
      <OnboardingModal />

      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
            transform: 'scale(1.02)' 
        }} 
      />
      
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
      />

      <div className="absolute top-[18%] left-[6%] z-10 pointer-events-none select-none animate-in fade-in duration-1000 slide-in-from-left-4">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-[200] text-white tracking-tighter drop-shadow-lg opacity-95 leading-none">
            {getGreeting()}
        </h1>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter drop-shadow-xl mt-2 leading-none">
            {currentUser.name}
        </h1>
        <div className="mt-6 flex items-center gap-3">
             <div className="h-[1px] w-12 bg-white/50"></div>
             <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide">
                {format(currentDate, 'EEEE, MMMM do')}
            </p>
        </div>
      </div>

      {/* iPadOS Style Header */}
      <div className="absolute top-0 w-full h-8 z-[100] flex justify-between items-center px-4 text-sm font-medium text-white select-none">
         <div className="flex items-center gap-4 pl-2">
             <span className="font-semibold tracking-wide text-[13px]">{format(currentDate, 'h:mm a')}</span>
             <span className="opacity-80 text-[13px] hidden sm:block">{format(currentDate, 'EEE MMM d')}</span>
         </div>
         
         <div 
            className={`flex items-center gap-2.5 pr-2 cursor-pointer h-full hover:bg-white/10 rounded-full px-2 transition-colors active:bg-white/20 ${isControlCenterOpen ? 'bg-white/20' : ''}`}
            onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
         >
            <div className="relative w-[24px] h-[11.5px] border-[1.5px] border-white/90 rounded-[3px] flex items-center p-[1px]">
                <div className="w-full h-full bg-white/90 rounded-[1px]"></div>
                <div className="absolute -right-[3.5px] top-1/2 -translate-y-1/2 w-[2px] h-[4px] bg-white/90 rounded-r-[1px] opacity-80"></div>
            </div>
         </div>
      </div>

      <ControlCenter 
        isOpen={isControlCenterOpen} 
        onClose={() => setIsControlCenterOpen(false)} 
        onOpenPage={(page) => {
            setActivePage(page);
            setIsControlCenterOpen(false);
        }}
      />

      {activePage && (
        <PageViewer 
            page={activePage} 
            onClose={() => setActivePage(null)} 
        />
      )}

      {activeApp && currentAppConfig && (
        <div 
            className={`
                absolute transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
                flex flex-col bg-white dark:bg-[#1E1E1E] shadow-2xl overflow-hidden
                ${isMinimized 
                    ? 'opacity-0 scale-[0.4] translate-y-[400px] blur-sm pointer-events-none' 
                    : 'opacity-100 scale-100 blur-0'
                }
            `}
            style={{
                ...windowStyle,
                zIndex: 50,
                boxShadow: isMobile ? 'none' : '0 40px 80px -20px rgba(0, 0, 0, 0.6)'
            }}
        >
            {(!('component' in currentAppConfig)) && (
                <div className="h-10 bg-[#F5F5F5] dark:bg-[#2C2C2E] flex items-center px-4 justify-between select-none border-b border-gray-200 dark:border-black/20 shrink-0">
                    <div className="flex gap-2 group p-1">
                        <button onClick={closeApp} className="w-4 h-4 rounded-full bg-[#FF5F57] border border-[#E0443E]/50 flex items-center justify-center hover:brightness-90 transition-all group-hover:scale-105 active:scale-95 shadow-sm">
                            <X size={10} className="text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                        </button>
                        <button onClick={handleRefresh} className="w-4 h-4 rounded-full bg-[#FEBC2E] border border-[#D89E24]/50 flex items-center justify-center hover:brightness-90 transition-all group-hover:scale-105 active:scale-95 shadow-sm">
                            <RotateCw size={10} className="text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                        </button>
                        <button onClick={toggleMaximize} className="w-4 h-4 rounded-full bg-[#28C840] border border-[#1AAB29]/50 flex items-center justify-center hover:brightness-90 transition-all group-hover:scale-105 active:scale-95 shadow-sm">
                            <Maximize2 size={8} className="text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                        </button>
                    </div>
                    <span className="font-semibold text-xs text-black/80 dark:text-gray-200/90 tracking-wide">{currentAppConfig.title}</span>
                    <div className="w-16"></div>
                </div>
            )}

            <div key={refreshKey} className="flex-1 overflow-hidden relative bg-white dark:bg-black w-full">
                {'component' in currentAppConfig && currentAppConfig.component ? (
                    currentAppConfig.component
                ) : 'internal' in currentAppConfig && currentAppConfig.internal ? (
                    activeApp === AppType.STORY ? <StoryApp /> :
                    activeApp === AppType.FINDER ? <FinderWindow /> : null
                ) : (
                    <WebWindow url={currentAppConfig.url!} title={currentAppConfig.title} />
                )}
            </div>
        </div>
      )}

      {!isMaximized && <Dock />}
    </div>
  );
};

const App = () => {
  return (
    <DataProvider>
      <OSContent />
    </DataProvider>
  );
};

export default App;