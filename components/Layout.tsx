
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white flex flex-col overflow-hidden">
      {/* Background blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-amber-500/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full"></div>
      </div>

      <header className="px-6 py-4 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-header text-xl tracking-widest font-bold gradient-text">CHRONOS BOOTH</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 relative">
        {children}
      </main>

      <footer className="py-4 text-center text-xs text-white/30 border-t border-white/5">
        Powered by Gemini 2.5 Flash Image & Gemini 3 Pro
      </footer>
    </div>
  );
};

export default Layout;
