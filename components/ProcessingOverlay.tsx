
import React, { useState, useEffect } from 'react';

interface ProcessingOverlayProps {
  title: string;
  subtitle: string;
}

const MESSAGES = [
  "Aligning chronal particles...",
  "Calibrating temporal distortion...",
  "Analyzing facial geometry for likeness...",
  "Synthesizing era-appropriate artifacts...",
  "Folding the fabric of reality...",
  "Almost there, traveler..."
];

const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ title, subtitle }) => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl">
      <div className="text-center space-y-8 max-w-md px-6">
        <div className="relative inline-block">
          {/* Animated rings */}
          <div className="w-32 h-32 border-4 border-amber-500/20 rounded-full animate-[spin_3s_linear_infinite]"></div>
          <div className="absolute inset-0 border-t-4 border-amber-500 rounded-full animate-[spin_1.5s_linear_infinite]"></div>
          <div className="absolute inset-4 border-r-4 border-amber-300 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-header font-bold text-white tracking-widest">{title}</h2>
          <p className="text-amber-500/80 font-medium animate-pulse">{MESSAGES[msgIndex]}</p>
          <p className="text-white/40 text-sm italic">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingOverlay;
