import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { AppType } from '../types';
import { Database, Folder, ChevronRight, ShieldAlert, ExternalLink, File, Home, Shield, FileText, ArrowLeft, ChevronLeft } from 'lucide-react';

// Define the structure of our file system
type FileSystemItem = {
  id: string;
  label: string;
  type: 'folder' | 'file' | 'link';
  icon?: any;
  color?: string;
  contentId?: string; // For mapping to specific views
  url?: string;
};

export const FinderWindow: React.FC = () => {
  const { setApp } = useData();
  // Initial path: Home / Users / Jeffrey / DOJ Disclosures
  const [currentPath, setCurrentPath] = useState<string[]>(['Home', 'Users', 'Jeffrey']);

  const navigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(prev => prev.slice(0, prev.length - 1));
    }
  };

  const navigateTo = (index: number) => {
    setCurrentPath(prev => prev.slice(0, index + 1));
  };

  const enterFolder = (folderName: string) => {
    setCurrentPath(prev => [...prev, folderName]);
  };

  const sidebarItems = [
    { id: 'DOJ Disclosures', icon: Folder, label: 'DOJ Disclosures' },
    { id: 'FBI Records', icon: Shield, label: 'FBI Records' },
  ];

  // Data mapping for specific folders
  const dojDataSets = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    url: `https://www.justice.gov/epstein/doj-disclosures/data-set-${i + 1}-files`
  }));

  const fbiRecords = [
    ...Array.from({ length: 21 }, (_, i) => {
        const num = (i + 1).toString().padStart(2, '0');
        return {
            id: i + 1,
            label: `Jeffrey Epstein Part ${i + 1}`,
            url: `https://vault.fbi.gov/jeffrey-epstein/Jeffrey%20Epstein%20Part%20${num}/view#document/p1`
        };
    }),
    {
        id: 22,
        label: 'Jeffrey Epstein Part 22 (Final)',
        url: 'https://vault.fbi.gov/jeffrey-epstein/Jeffrey%20Epstein%20Part%2022%20%28Final%29/view#document/p1'
    }
  ];

  // Helper to determine what to render based on current path tip
  const currentFolder = currentPath[currentPath.length - 1];

  // Render the specific views
  const renderContent = () => {
    switch (currentFolder) {
      case 'DOJ Disclosures':
        return (
          <div className="animate-in fade-in zoom-in-95 duration-300">
             {/* Header Section */}
             <div className="flex flex-col items-center text-center mb-10 pt-4">
                 <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-500/5 rounded-[22px] flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-500/20 shadow-xl shadow-blue-500/5">
                     <Folder size={40} className="text-blue-500 dark:text-blue-400 drop-shadow-sm" strokeWidth={1.5} />
                 </div>

                 <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white tracking-tight mb-3">
                     DOJ Disclosures & Estate Documents
                 </h1>
                 
                 <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300 text-xs font-medium tracking-wide border border-blue-100 dark:border-blue-500/20">
                     Epstein Files Transparency Act (H.R.4405)
                 </div>
             </div>

             {/* Quick Access Card */}
             <div className="mb-8">
                 <div 
                     onClick={() => setApp(AppType.GDRIVE_BACKUP)}
                     className="group cursor-pointer bg-white dark:bg-[#252527] border border-gray-200 dark:border-white/10 rounded-2xl p-5 flex items-center gap-5 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                 >
                     <div className="w-14 h-14 bg-[#F8F9FA] dark:bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/5 group-hover:scale-105 transition-transform">
                         <Database className="text-[#1967D2] dark:text-blue-400 w-7 h-7" strokeWidth={1.5} />
                     </div>
                     <div className="flex-1 min-w-0">
                         <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">Primary Repository</h3>
                         <p className="text-sm text-gray-500 font-normal truncate">Access original documents via Google Drive</p>
                     </div>
                     <div className="px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-full text-sm font-medium text-gray-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all">
                         Open
                     </div>
                 </div>
             </div>

             {/* Privacy Notice */}
             <div className="mb-10">
                 <div className="bg-[#FFF8F6] dark:bg-[#332B25] border border-[#FFDCC3] dark:border-[#5C3D2E] rounded-2xl p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                     
                     <div className="flex items-start gap-4 relative z-10">
                         <div className="p-2.5 bg-orange-100 dark:bg-orange-500/20 rounded-xl shrink-0">
                             <ShieldAlert className="text-orange-600 dark:text-orange-400" size={24} strokeWidth={2} />
                         </div>
                         <div className="space-y-3">
                             <h3 className="font-semibold text-orange-900 dark:text-orange-100 text-base">Privacy Notice</h3>
                             <div className="text-sm leading-relaxed text-orange-900/80 dark:text-orange-100/70 space-y-3 font-normal">
                                 <p>In view of the Congressional deadline, all reasonable efforts have been made to review and redact personal information pertaining to victims.</p>
                                 <p className="text-orange-800/60 dark:text-orange-200/50 text-xs mt-2 border-t border-orange-200/50 dark:border-orange-500/20 pt-3">
                                     Redactions of victim names and other identifying information have been applied.
                                 </p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Data Sets Grid */}
             <div>
                 <div className="flex items-center justify-between mb-4 px-1">
                     <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Public Data Sets</h3>
                     <span className="text-xs text-gray-400 font-medium">{dojDataSets.length} Items</span>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                     {dojDataSets.map((ds) => (
                         <a 
                             key={ds.id}
                             href={ds.url}
                             target="_blank"
                             rel="noreferrer"
                             className="group flex items-center gap-3 p-3.5 bg-gray-50 dark:bg-[#252527] border border-gray-200 dark:border-white/5 rounded-xl hover:bg-white dark:hover:bg-[#2C2C2E] hover:border-blue-500/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                         >
                             <div className="w-10 h-10 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                                 <File className="text-gray-400 group-hover:text-blue-500 transition-colors" size={20} strokeWidth={1.5} />
                             </div>
                             <div className="flex-1 min-w-0">
                                 <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Data Set {ds.id}</div>
                                 <div className="text-[11px] text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 flex items-center gap-1 mt-0.5">
                                     View Files <ExternalLink size={9} className="opacity-50" />
                                 </div>
                             </div>
                         </a>
                     ))}
                 </div>
             </div>
          </div>
        );
      
      case 'FBI Records':
        return (
          <div className="animate-in fade-in zoom-in-95 duration-300">
               {/* FBI Header Section */}
               <div className="flex flex-col items-center text-center mb-10 pt-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0a1f44] to-[#1e3a8a] dark:from-[#0f172a] dark:to-[#1e3a8a] rounded-[22px] flex items-center justify-center mb-6 border border-blue-900/10 dark:border-blue-500/20 shadow-xl shadow-blue-900/10">
                      <Shield size={40} className="text-white drop-shadow-sm" strokeWidth={1.5} />
                  </div>

                  <h1 className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight mb-3">
                      FBI Records: The Vault
                  </h1>
                  
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-300 text-xs font-medium tracking-wide border border-blue-100 dark:border-blue-500/20">
                      Jeffrey Epstein Investigations
                  </div>
              </div>

               {/* FBI Grid */}
               <div>
                  <div className="flex items-center justify-between mb-4 px-1">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Case Files</h3>
                      <span className="text-xs text-gray-400 font-medium">{fbiRecords.length} Files</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {fbiRecords.map((rec) => (
                          <a 
                              key={rec.id}
                              href={rec.url}
                              target="_blank"
                              rel="noreferrer"
                              className="group flex items-center gap-3 p-3.5 bg-gray-50 dark:bg-[#252527] border border-gray-200 dark:border-white/5 rounded-xl hover:bg-white dark:hover:bg-[#2C2C2E] hover:border-blue-800/30 dark:hover:border-blue-500/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                          >
                              <div className="w-10 h-10 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                                  <FileText className="text-gray-400 group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors" size={20} strokeWidth={1.5} />
                              </div>
                              <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">{rec.label}</div>
                                  <div className="text-[11px] text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 flex items-center gap-1 mt-0.5">
                                      View Document <ExternalLink size={9} className="opacity-50" />
                                  </div>
                              </div>
                          </a>
                      ))}
                  </div>
              </div>
          </div>
        );

      // Generic Folder View
      default:
        let contents: FileSystemItem[] = [];
        
        if (currentFolder === 'Jeffrey') {
          contents = [
            { id: 'DOJ Disclosures', label: 'DOJ Disclosures', type: 'folder', icon: Folder, color: 'text-[#007AFF]' },
            { id: 'FBI Records', label: 'FBI Records', type: 'folder', icon: Shield, color: 'text-[#007AFF]' },
          ];
        } else if (currentFolder === 'Users') {
          contents = [
             { id: 'Jeffrey', label: 'Jeffrey', type: 'folder', icon: Folder, color: 'text-[#007AFF]' }
          ];
        } else if (currentFolder === 'Home') {
          contents = [
             { id: 'Users', label: 'Users', type: 'folder', icon: Folder, color: 'text-[#007AFF]' }
          ];
        }

        return (
          <div className="animate-in fade-in zoom-in-95 duration-300 w-full h-full">
             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 p-4">
                {contents.map((item) => (
                   <div 
                      key={item.id}
                      onClick={() => enterFolder(item.id)}
                      className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-all duration-200 active:scale-95 active:opacity-80"
                   >
                      <item.icon 
                        size={60} 
                        className={`${item.color} drop-shadow-sm group-hover:scale-105 transition-transform duration-300`} 
                        strokeWidth={1} 
                      />
                      <span className="text-[13px] font-medium text-center text-gray-700 dark:text-gray-200 leading-tight px-1 break-words w-full line-clamp-2">
                        {item.label}
                      </span>
                   </div>
                ))}
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full w-full bg-[#F5F5F7] dark:bg-[#1E1E1E] text-black dark:text-white font-sans selection:bg-blue-500/30">
        {/* Sidebar (Desktop Only) */}
        <div className="w-56 bg-[#F5F5F7]/80 dark:bg-[#2C2C2E]/80 backdrop-blur-xl border-r border-gray-200 dark:border-white/10 p-3 flex flex-col gap-1 hidden md:flex shrink-0">
            <div className="px-2 py-2 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Locations</div>
            
            {/* Hardcoded sidebar shortcuts for common destinations */}
            {sidebarItems.map((item) => {
              const isActive = currentFolder === item.id;
              return (
                <div 
                    key={item.id} 
                    onClick={() => {
                       // Reset path to this location
                       setCurrentPath(['Home', 'Users', 'Jeffrey', item.id]);
                    }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-gray-300/50 dark:bg-white/10' : 'hover:bg-gray-200/50 dark:hover:bg-white/5'}`}
                >
                    <item.icon size={16} className={isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500'} strokeWidth={2} />
                    <span className={`text-[13px] tracking-tight ${isActive ? 'font-medium text-black dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>{item.label}</span>
                </div>
              );
            })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#1C1C1E]">
            {/* Breadcrumb / Path Bar */}
            <div className="h-10 border-b border-gray-200 dark:border-white/10 flex items-center px-2 md:px-4 gap-1 text-[13px] text-gray-500 font-medium bg-[#F5F5F7] dark:bg-[#1C1C1E] sticky top-0 z-10 overflow-x-auto scrollbar-hide">
                 {/* Back button for mobile */}
                 <button 
                   onClick={navigateUp}
                   disabled={currentPath.length <= 1}
                   className="md:hidden mr-2 p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-md disabled:opacity-30"
                 >
                    <ChevronLeft size={18} />
                 </button>

                 {currentPath.map((folder, index) => {
                    const isLast = index === currentPath.length - 1;
                    const Icon = index === 0 ? Home : null;
                    
                    return (
                      <React.Fragment key={folder}>
                          {index > 0 && <ChevronRight size={12} className="opacity-40 shrink-0" />}
                          <div 
                            onClick={() => navigateTo(index)}
                            className={`
                                flex items-center gap-1.5 px-1.5 py-1 rounded-md cursor-pointer whitespace-nowrap transition-colors
                                ${isLast 
                                    ? 'text-black dark:text-white font-semibold cursor-default' 
                                    : 'hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400'
                                }
                            `}
                          >
                             {Icon && <Icon size={14} className="mb-0.5" />}
                             <span>{folder}</span>
                          </div>
                      </React.Fragment>
                    );
                 })}
            </div>

            {/* Folder Contents */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-4 md:p-12">
                    {renderContent()}
                    <div className="h-12"></div> {/* Bottom Spacer */}
                </div>
            </div>
        </div>
    </div>
  );
};