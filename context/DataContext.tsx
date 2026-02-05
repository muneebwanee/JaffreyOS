import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AppType, Thread, Email, Message } from '../types';
import { generateInitialData } from '../services/data';

interface DataContextType {
  currentUser: User;
  activeApp: AppType | null;
  isMinimized: boolean;
  isMaximized: boolean;
  setApp: (app: AppType | null) => void;
  toggleMinimize: () => void;
  toggleMaximize: () => void;
  closeApp: () => void;
  
  users: Record<string, User>;
  threads: Record<string, Thread>;
  emails: Email[];
  sendMessage: (threadId: string, text: string) => void;
  sendEmailReply: (emailId: string, text: string) => Promise<void>;
  markEmailRead: (emailId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};

const STORAGE_KEY = 'jeffreyos_data_v3';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeApp, setActiveApp] = useState<AppType | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Data State
  const [users, setUsers] = useState<Record<string, User>>({});
  const [threads, setThreads] = useState<Record<string, Thread>>({});
  const [emails, setEmails] = useState<Email[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const currentUser: User = {
    id: 'jeffrey',
    name: 'Jeffrey Epstein',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Jeffrey_Epstein_mug_shot.jpg',
    email: 'jeffrey@epstein.world',
  };

  // Load from Storage or Init
  useEffect(() => {
    const loadData = async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUsers(parsed.users || {});
          setThreads(parsed.threads || {});
          setEmails(parsed.emails || []);
          setIsInitialized(true);
          return;
        } catch (e) {
          console.error("Failed to parse stored data", e);
        }
      }

      // Fallback to generation if no storage or error
      const data = await generateInitialData();
      
      const userMap: Record<string, User> = {};
      data.users.forEach(u => { userMap[u.id] = u; });
      setUsers(userMap);

      const processedEmails: Email[] = data.emails.map((e: any, i: number) => ({
        id: `e${i}`,
        senderId: e.senderId,
        subject: e.subject,
        body: e.body,
        timestamp: Date.now() - (e.timeOffsetMinutes * 60 * 1000),
        isRead: e.isRead
      }));
      setEmails(processedEmails);

      const processedThreads: Record<string, Thread> = {};
      data.messages.forEach((m: any, i: number) => {
        const threadId = `t${i}`;
        const msgs: Message[] = m.history.map((h: any, hi: number) => ({
           id: `m${i}-${hi}`,
           text: h.text,
           isMe: h.isMe,
           timestamp: Date.now() - (h.timeOffsetMinutes * 60 * 1000)
        })).sort((a: any, b: any) => a.timestamp - b.timestamp);

        processedThreads[threadId] = {
           id: threadId,
           participantId: m.participantId,
           messages: msgs,
           updatedAt: msgs.length > 0 ? msgs[msgs.length - 1].timestamp : Date.now(),
           unreadCount: 0, 
           lastMessagePreview: msgs.length > 0 ? msgs[msgs.length - 1].text : ''
        };
      });
      setThreads(processedThreads);
      setIsInitialized(true);
    };
    loadData();
  }, []);

  // Listen for storage changes (Realtime Sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          // Only update if we have valid data, to prevent clearing state on error
          if (parsed && parsed.users) {
              setUsers(parsed.users);
              setThreads(parsed.threads);
              setEmails(parsed.emails);
          }
        } catch (err) {
          console.error("Failed to sync data from storage event", err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Persist Data
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ users, threads, emails }));
    }
  }, [users, threads, emails, isInitialized]);

  const setApp = (app: AppType | null) => {
    if (app === activeApp && isMinimized) {
      setIsMinimized(false);
    } else if (app !== activeApp) {
      setActiveApp(app);
      setIsMinimized(false);
      setIsMaximized(false);
    }
  };

  const toggleMinimize = () => setIsMinimized(prev => !prev);
  const toggleMaximize = () => setIsMaximized(prev => !prev);
  const closeApp = () => {
    setActiveApp(null);
    setIsMinimized(false);
    setIsMaximized(false);
  };

  const sendMessage = async (threadId: string, text: string) => {
    const timestamp = Date.now();
    setThreads(prev => {
        const thread = prev[threadId];
        if (!thread) return prev;
        
        const currentMessages = [...thread.messages];
        const newMessage: Message = {
            id: `new-${timestamp}`,
            text,
            isMe: true,
            timestamp
        };
        currentMessages.push(newMessage);
        return {
            ...prev,
            [threadId]: {
                ...thread,
                messages: currentMessages,
                updatedAt: newMessage.timestamp,
                lastMessagePreview: text
            }
        };
    });
  };

  const sendEmailReply = async (emailId: string, text: string) => {
     console.log("Email reply sent:", text);
  };

  const markEmailRead = (id: string) => {
      setEmails(prev => prev.map(e => e.id === id ? { ...e, isRead: true } : e));
  };

  return (
    <DataContext.Provider value={{ 
      currentUser, 
      activeApp, 
      isMinimized, 
      isMaximized, 
      setApp, 
      toggleMinimize, 
      toggleMaximize, 
      closeApp,
      users,
      threads,
      emails,
      sendMessage,
      sendEmailReply,
      markEmailRead
    }}>
      {children}
    </DataContext.Provider>
  );
};
