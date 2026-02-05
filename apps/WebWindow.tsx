import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface WebWindowProps {
  url: string;
  title: string;
}

export const WebWindow: React.FC<WebWindowProps> = ({ url, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-[#1E1E1E] relative">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 z-0 bg-white dark:bg-[#1E1E1E]">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-blue-500" />
            <span className="text-sm font-medium tracking-wide">Loading {title}...</span>
        </div>
      )}
      
      {/* Iframe Content */}
      <iframe 
        src={url} 
        className={`w-full h-full border-none z-10 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; camera; microphone"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
      />
    </div>
  );
};