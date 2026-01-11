
import React, { useState } from 'react';
import { Era } from '../types';
import { geminiService } from '../services/geminiService';

interface ResultViewProps {
  imageUrl: string;
  era: Era;
  onRestart: () => void;
  onImageUpdated: (newUrl: string) => void;
}

const ResultView: React.FC<ResultViewProps> = ({ imageUrl, era, onRestart, onImageUpdated }) => {
  const [refineText, setRefineText] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refineText.trim() || isRefining) return;

    setIsRefining(true);
    setError(null);
    try {
      const updatedImage = await geminiService.refineImage(imageUrl, refineText);
      onImageUpdated(updatedImage);
      setRefineText('');
    } catch (err) {
      console.error(err);
      setError("Failed to refine image. Please try again.");
    } finally {
      setIsRefining(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `chronos-traveler-${era.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in zoom-in-95 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-header font-bold">The Traveler Returned</h2>
        <p className="text-white/60">You as seen in the {era.name}</p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-900 rounded-[32px] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-black rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
          <img 
            src={imageUrl} 
            alt="Synthesized Time Travel Portrait" 
            className={`w-full h-auto object-cover ${isRefining ? 'opacity-50 animate-pulse' : ''}`}
          />
          {isRefining && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-amber-400 font-header tracking-widest text-sm">REWRITING HISTORY...</span>
                </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <form onSubmit={handleRefine} className="space-y-3">
          <div className="relative">
            <input 
              type="text" 
              value={refineText}
              onChange={(e) => setRefineText(e.target.value)}
              placeholder="Refine with AI: 'Add a retro filter', 'Make it cinematic'..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-24 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-white placeholder:text-white/30"
              disabled={isRefining}
            />
            <button 
              type="submit"
              disabled={!refineText.trim() || isRefining}
              className="absolute right-2 top-2 bottom-2 px-4 bg-amber-500 hover:bg-amber-400 disabled:bg-white/10 disabled:text-white/30 text-black font-bold rounded-xl transition-all"
            >
              {isRefining ? '...' : 'APPLY'}
            </button>
          </div>
          {error && <p className="text-xs text-red-400 pl-2">{error}</p>}
        </form>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={downloadImage}
            className="py-4 glass border border-white/10 hover:bg-white/5 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            SAVOR MOMENT
          </button>
          <button 
            onClick={onRestart}
            className="py-4 glass border border-white/10 hover:bg-white/5 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            TRAVEL AGAIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
