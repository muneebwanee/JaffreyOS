import React, { useRef, useState, useEffect } from 'react';
import { MapPin, Lock, FileText, AlertTriangle, Fingerprint, Eye, Globe, Anchor, ChevronDown, User, Users, ShieldAlert, DollarSign, Book, Briefcase, Landmark } from 'lucide-react';

export const StoryApp: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [revealedNames, setRevealedNames] = useState<Record<string, boolean>>({});

  // Parallax / Scroll detection
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollTop;
    const windowHeight = scrollRef.current.clientHeight;
    const chapter = Math.floor(scrollPosition / (windowHeight * 0.6));
    setActiveChapter(chapter);
  };

  const toggleName = (id: string) => {
    setRevealedNames(prev => ({...prev, [id]: !prev[id]}));
  }

  return (
    <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full h-full bg-[#0a0a0a] text-gray-200 overflow-y-auto font-sans selection:bg-blue-500/30 scroll-smooth snap-y snap-mandatory md:snap-none"
    >
      {/* ---------------- HERO SECTION ---------------- */}
      <div className="min-h-screen relative flex flex-col items-center justify-center snap-start overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1596325066347-6b45398d5a77?q=80&w=2548&auto=format&fit=crop" 
                alt="Ocean" 
                className="w-full h-full object-cover opacity-40 grayscale-[50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a0a0a_100%)]"></div>
        </div>

        <div className="z-10 text-center px-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400 mb-6">
                <Globe size={12} />
                US Virgin Islands • 1998
            </div>
            
            <h1 className="text-6xl md:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 tracking-tighter drop-shadow-2xl mb-4">
                PARADISE
                <span className="block text-2xl md:text-4xl font-sans font-light text-gray-400 tracking-widest mt-2">LOST</span>
            </h1>
            
            <p className="max-w-xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed font-light mt-8 border-l-2 border-blue-500/50 pl-6 text-left">
                "From the outside, it looked like heaven. 75 acres of Caribbean greenery. A palace-like bungalow. But hidden inside was a dark truth."
            </p>
        </div>

        <div className="absolute bottom-10 animate-bounce opacity-50">
            <ChevronDown size={32} />
        </div>
      </div>

      {/* ---------------- CHAPTER 1: THE ORIGIN (New) ---------------- */}
      <div className="min-h-screen relative flex items-center justify-center py-24 px-6 snap-start bg-[#050505]">
         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
                 <div className="inline-flex items-center gap-2 text-yellow-500 font-mono text-xs tracking-widest uppercase mb-2">
                    <Briefcase size={14} /> The Beginning
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold font-serif text-white">The Math Teacher</h2>
                 <p className="text-gray-400 leading-relaxed text-lg">
                     1974. The Dalton School, Manhattan. A college dropout named Jeffrey Epstein is hired to teach calculus and physics. He is described by parents as charismatic, brilliant, and enigmatic.
                 </p>
                 <p className="text-gray-400 leading-relaxed">
                     By 1976, he is fired for "poor performance," though rumors swirl. But he doesn't fall. He ascends. A parent at the school, Ace Greenberg (CEO of Bear Stearns), hands him a golden ticket to Wall Street.
                 </p>
                 <div className="p-6 bg-white/5 border-l-2 border-yellow-500 rounded-r-xl">
                    <p className="text-xl font-serif italic text-white/90">"He had a way of making you feel like you were the only person in the room. That was his gift. And his weapon."</p>
                 </div>
            </div>
            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-full blur-3xl"></div>
                <div className="relative bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl group">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Jeffrey_Epstein_mugshot_2006.jpg/220px-Jeffrey_Epstein_mugshot_2006.jpg" 
                        alt="Young Epstein" 
                        className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity hover:opacity-80 transition-opacity duration-700"
                    />
                     <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                        <div className="font-mono text-xs text-yellow-500">ASSET #001</div>
                        <div className="text-white font-bold">The Golden Boy</div>
                     </div>
                </div>
            </div>
         </div>
      </div>

      {/* ---------------- CHAPTER 2: THE ISLAND ---------------- */}
      <div className="min-h-screen relative flex items-center justify-center py-24 px-6 snap-start bg-[#0a0a0a]">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Visual: The Map */}
            <div className="relative aspect-square md:aspect-[4/3] bg-[#111] rounded-2xl border border-white/5 overflow-hidden group shadow-2xl">
                <img 
                    src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop" 
                    alt="Island Aerial" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[20s] ease-linear"
                />
                
                {/* Map UI Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between items-start">
                        <div className="bg-black/60 backdrop-blur px-3 py-1 rounded text-xs font-mono text-blue-400">
                            COORD: 18.30° N, 64.83° W
                        </div>
                        <MapPin className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse" />
                    </div>
                    
                    {/* Interactive Hotspots (Pointer events enabled for these) */}
                    <div className="absolute top-[40%] left-[50%] pointer-events-auto group/spot">
                        <div className="w-4 h-4 bg-red-500/50 rounded-full animate-ping absolute"></div>
                        <div className="w-4 h-4 bg-red-500 rounded-full relative cursor-help border-2 border-white/50"></div>
                        <div className="absolute left-6 top-0 bg-black/80 backdrop-blur px-3 py-2 rounded border border-white/10 w-48 opacity-0 group-hover/spot:opacity-100 transition-opacity z-20">
                            <h4 className="text-white font-bold text-xs">Main Residence</h4>
                            <p className="text-[10px] text-gray-300">The center of operations. Staff reported seeing constant streams of young women.</p>
                        </div>
                    </div>

                    <div className="absolute top-[60%] left-[30%] pointer-events-auto group/spot">
                        <div className="w-4 h-4 bg-blue-500/50 rounded-full animate-ping absolute"></div>
                        <div className="w-4 h-4 bg-blue-500 rounded-full relative cursor-help border-2 border-white/50"></div>
                        <div className="absolute left-6 top-0 bg-black/80 backdrop-blur px-3 py-2 rounded border border-white/10 w-48 opacity-0 group-hover/spot:opacity-100 transition-opacity z-20">
                            <h4 className="text-white font-bold text-xs">The Temple</h4>
                            <p className="text-[10px] text-gray-300">A bizarre structure with a golden dome. Originally had a trident lock.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Narrative */}
            <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold font-serif text-white">Little St. James</h2>
                <div className="w-20 h-1 bg-blue-600"></div>
                <p className="text-lg text-gray-400 leading-relaxed">
                    In 1998, he bought the island for $7.95 million. Locals whispered a different name for it: <span className="text-red-400 font-medium">"Pedophile Island"</span>.
                </p>
                <p className="text-gray-500 leading-relaxed">
                    It was a fortress of solitude, but also a prison. Passports were confiscated. Boats were strictly controlled. Surveillance was everywhere.
                </p>
                <p className="text-gray-500 leading-relaxed">
                    "It was a perfect setup," one investigator noted. "International waters nearby, private customs clearance, and total isolation."
                </p>
                
                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">75</div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-500">Acres</div>
                    </div>
                    <div className="text-center border-l border-white/10">
                        <div className="text-3xl font-bold text-white mb-1">$8M</div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-500">Price</div>
                    </div>
                    <div className="text-center border-l border-white/10">
                        <div className="text-3xl font-bold text-red-500 mb-1">∞</div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-500">Secrets</div>
                    </div>
                </div>
            </div>
        </div>
      </div>

       {/* ---------------- CHAPTER 3: THE BLACK BOOK (New) ---------------- */}
       <div className="min-h-screen py-24 px-6 snap-start bg-[#080808] border-t border-white/5">
         <div className="max-w-4xl mx-auto">
             <div className="text-center mb-12">
                 <h2 className="text-sm font-mono text-white/50 tracking-[0.4em] uppercase mb-4">The Network</h2>
                 <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
                    <Book className="text-gray-600" /> The Little Black Book
                 </h3>
                 <p className="text-gray-400 max-w-2xl mx-auto">
                     A 92-page address book was leaked. It contained names of presidents, princes, and billionaires. Click to inspect the connections.
                 </p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                 {[
                     { name: "Prince Andrew", role: "Royal Family", detail: "Frequent guest. Accused by Virginia Giuffre." },
                     { name: "Bill Clinton", role: "Fmr. President", detail: "Flew on the 'Lolita Express' multiple times." },
                     { name: "Donald Trump", role: "Real Estate Tycoon", detail: "Found in address book. 'Terrific guy' quote." },
                     { name: "Les Wexner", role: "Retail Mogul", detail: "Epstein's primary patron. Gave him power of attorney." },
                     { name: "Kevin Spacey", role: "Actor", detail: "Passenger on the jet to Africa (2002)." },
                     { name: "Chris Tucker", role: "Comedian", detail: "Passenger on the Africa trip." },
                     { name: "Alan Dershowitz", role: "Lawyer", detail: "Defended Epstein in 2008 deal. Accused by Giuffre." },
                     { name: "Jes Staley", role: "CEO Barclays", detail: " exchanged 1,200 emails with Epstein." },
                     { name: "Bill Gates", role: "Tech Mogul", detail: "Met Epstein multiple times after 2011 conviction." }
                 ].map((person, idx) => (
                     <div 
                        key={idx}
                        onClick={() => toggleName(person.name)}
                        className={`
                            relative p-4 rounded-lg border cursor-pointer transition-all duration-300
                            ${revealedNames[person.name] 
                                ? 'bg-red-900/10 border-red-500/50' 
                                : 'bg-[#111] border-white/10 hover:border-white/30 hover:bg-[#1a1a1a]'
                            }
                        `}
                     >
                         <div className="flex justify-between items-start mb-2">
                             <div className="font-mono text-sm font-bold text-gray-200">{person.name}</div>
                             {revealedNames[person.name] ? <Eye size={14} className="text-red-400" /> : <Lock size={14} className="text-gray-600" />}
                         </div>
                         <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{person.role}</div>
                         
                         <div className={`text-xs text-gray-400 leading-snug overflow-hidden transition-all duration-500 ${revealedNames[person.name] ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                             <span className="text-red-400 font-bold">CONNECTION:</span> {person.detail}
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      </div>

      {/* ---------------- CHAPTER 4: THE PYRAMID ---------------- */}
      <div className="min-h-screen bg-[#050505] relative py-24 px-6 snap-start">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-sm font-mono text-red-500 tracking-[0.4em] uppercase mb-4">The Mechanism</h2>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">The Pyramid Scheme</h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    It wasn't just abuse; it was a business model. A meticulously organized system where victims became recruiters.
                </p>
            </div>

            {/* Diagram */}
            <div className="relative py-12 flex flex-col items-center">
                {/* Level 1: Epstein */}
                <div className="relative z-10 bg-white text-black px-8 py-4 rounded-lg shadow-[0_0_40px_rgba(255,255,255,0.1)] font-bold text-xl mb-12 border-4 border-transparent hover:border-red-500 transition-colors cursor-default">
                    Jeffrey Epstein
                    <div className="absolute -bottom-12 left-1/2 w-0.5 h-12 bg-gray-700"></div>
                </div>

                {/* Level 2: Recruiters */}
                <div className="flex gap-12 md:gap-24 mb-12 relative z-10">
                    <div className="group bg-[#1a1a1a] border border-white/10 px-6 py-3 rounded-md text-sm text-gray-300 relative hover:bg-red-900/20 hover:border-red-500/50 transition-all cursor-pointer">
                        Ghislaine Maxwell
                        <div className="absolute -bottom-12 left-1/2 w-px h-12 bg-gray-800"></div>
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-40 bg-black border border-white/20 p-2 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                            The "Madam". Procured girls and managed the household.
                        </div>
                    </div>
                    <div className="bg-[#1a1a1a] border border-white/10 px-6 py-3 rounded-md text-sm text-gray-300 relative">
                        Associates
                        <div className="absolute -bottom-12 left-1/2 w-px h-12 bg-gray-800"></div>
                    </div>
                </div>

                {/* Level 3: Victims */}
                <div className="flex flex-wrap justify-center gap-4 max-w-2xl relative z-10">
                    {[...Array(6)].map((_, i) => (
                         <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                             <div className="w-12 h-12 rounded-full bg-red-900/20 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                <User size={16} />
                             </div>
                             <div className="h-4 w-px bg-red-900/30"></div>
                             <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                                <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                             </div>
                         </div>
                    ))}
                </div>

                {/* Decorative Background Lines */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                     <svg className="w-full h-full">
                         <defs>
                             <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                             </pattern>
                         </defs>
                         <rect width="100%" height="100%" fill="url(#grid)" />
                     </svg>
                </div>
            </div>

            <div className="bg-[#111] border-l-4 border-red-500 p-6 mt-12 rounded-r-lg">
                <p className="text-gray-400 italic">
                    "I really wanted this job... look this is an opportunity of a lifetime. I've been on the streets. I'm vulnerable."
                </p>
                <div className="mt-4 text-xs font-mono text-gray-500 uppercase">— Anonymous Victim, Palm Beach Police Records</div>
            </div>
         </div>
      </div>

      {/* ---------------- CHAPTER 5: THE DEAL ---------------- */}
      <div className="min-h-screen bg-[#080808] py-24 px-6 snap-start relative overflow-hidden">
          {/* Background Glitch Text */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-[0.03] pointer-events-none select-none">
               {[...Array(20)].map((_, i) => (
                   <div key={i} className="whitespace-nowrap text-9xl font-bold text-white" style={{ transform: `translateX(-${i * 50}px)` }}>
                       NON-PROSECUTION AGREEMENT CONFIDENTIAL SEALED
                   </div>
               ))}
          </div>

          <div className="max-w-3xl mx-auto relative z-10 text-center space-y-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <ShieldAlert size={32} className="text-orange-500" />
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-white">The Sweetheart Deal</h2>
              
              <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                  <p>
                      <span className="text-white font-bold">2005.</span> Palm Beach Police identified 35 victims. The FBI launched "Operation Leap Year". A 53-page indictment. International sex trafficking charges.
                  </p>
                  <p>
                      It should have been life in prison. Instead, Miami US Attorney <span className="text-white font-bold underline decoration-orange-500">Alex Acosta</span> signed a secret non-prosecution agreement.
                  </p>
              </div>

              <div className="bg-[#111] border border-orange-500/20 p-8 rounded-lg text-left font-mono text-sm relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                  <div className="absolute top-0 right-0 bg-orange-500 text-black text-[10px] font-bold px-2 py-1">SEALED</div>
                  <p className="mb-4 text-gray-500">// THE VERDICT (2008)</p>
                  <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center gap-3">
                          <AlertTriangle size={14} className="text-orange-500" />
                          <span>Plead guilty to 2 minor state prostitution charges.</span>
                      </li>
                      <li className="flex items-center gap-3">
                          <AlertTriangle size={14} className="text-orange-500" />
                          <span>18 Months Sentence (served 13).</span>
                      </li>
                      <li className="flex items-center gap-3">
                          <AlertTriangle size={14} className="text-orange-500" />
                          <span>Work Release: 12 hours/day at his luxury office.</span>
                      </li>
                      <li className="flex items-center gap-3">
                          <AlertTriangle size={14} className="text-red-500" />
                          <span className="text-red-400">Immunity for all potential co-conspirators.</span>
                      </li>
                  </ul>
              </div>
          </div>
      </div>

      {/* ---------------- CHAPTER 6: THE FILES (2025) ---------------- */}
      <div className="min-h-screen py-24 px-6 snap-start bg-[#050505] border-t border-white/5">
          <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                   <div className="flex-1 space-y-8">
                       <div className="flex items-center gap-3">
                           <FileText size={24} className="text-blue-500" />
                           <h2 className="text-3xl font-bold text-white">The 2025 Release</h2>
                       </div>
                       
                       <p className="text-gray-400 leading-relaxed">
                           Fast forward to 2024. Donald Trump campaigns on releasing the "Epstein Files". <span className="italic">"I have no problem with it,"</span> he tells reporters.
                       </p>
                       
                       <p className="text-gray-400 leading-relaxed">
                           But in July 2025, the narrative shifts. "Boring," he calls it. "A Democrat hoax." Suspicion grows. Was he in the files?
                       </p>

                       <p className="text-gray-400 leading-relaxed">
                           November 19, 2025. Congress forces his hand. The files drop. Thousands of pages, heavily redacted with black marker. But the internet is watching.
                       </p>

                       <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                           <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Key Findings</h4>
                           <div className="space-y-2">
                               <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                                   <span className="text-gray-300">Trump Flights</span>
                                   <span className="font-mono text-red-400">8 Confirmed</span>
                               </div>
                               <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                                   <span className="text-gray-300">Clinton Mention</span>
                                   <span className="font-mono text-blue-400">Multiple</span>
                               </div>
                               <div className="flex justify-between text-sm pb-1">
                                   <span className="text-gray-300">Prince Andrew</span>
                                   <span className="font-mono text-yellow-400">Implicated</span>
                               </div>
                           </div>
                       </div>
                   </div>

                   {/* Visual: The Redacted Document */}
                   <div className="flex-1 w-full bg-white text-black p-8 rounded-sm shadow-2xl relative font-mono text-xs md:text-sm leading-loose rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="absolute top-4 right-4 border-2 border-red-600 text-red-600 font-bold px-2 py-1 transform -rotate-12 text-xs opacity-50">CONFIDENTIAL</div>
                        
                        <p className="mb-4"><strong>DATE:</strong> OCT 27, 2020</p>
                        <p className="mb-4"><strong>SUBJECT:</strong> WITNESS STATEMENT / LIMOUSINE DRIVER</p>
                        
                        <p>
                            Q: Regarding the passenger identified as <span className="bg-black text-black select-none hover:bg-transparent hover:text-red-600 transition-colors cursor-help">Donald Trump</span>. <br/>
                            A: Yes. In 1995, I was driving him to the airport. He was on the phone. I heard him say "<span className="bg-black text-black select-none hover:bg-transparent hover:text-red-600 transition-colors cursor-help">Jeffrey, Jeffrey</span>". <br/><br/>
                            
                            Q: Did he mention the girl?<br/>
                            A: He was laughing about <span className="bg-black text-black px-1">REDACTED REDACTED REDACTED REDACTED</span> young girls. <br/><br/>
                            
                            NOTE: Witness states that in 1999, a woman claimed she was <span className="bg-black text-black px-1">assaulted</span> by both men at a <span className="bg-black text-black px-1">location in New York</span>.
                        </p>
                        
                        <div className="mt-8 pt-4 border-t border-black">
                            <p className="text-[10px] text-gray-500">EXHIBIT 149-B // UNSEALED NOV 2025</p>
                        </div>
                   </div>
              </div>
          </div>
      </div>

      {/* ---------------- FOOTER ---------------- */}
      <div className="h-[50vh] flex flex-col items-center justify-center border-t border-white/10 bg-[#000] snap-start text-center px-6">
           <Fingerprint size={48} className="text-white/20 mb-6" />
           <h2 className="text-3xl font-bold text-white mb-4">The Truth is Still Redacted.</h2>
           <p className="text-gray-500 max-w-md mx-auto mb-8">
               Over 1 million documents remain sealed. The story is not over.
           </p>
           <div className="flex items-center gap-2 text-xs font-mono text-gray-700">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               System Online: JeffreyOS v1.0
           </div>
      </div>
    </div>
  );
};