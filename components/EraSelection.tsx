
import React from 'react';
import { ERAS } from '../constants';
import { Era } from '../types';

interface EraSelectionProps {
  onSelect: (era: Era) => void;
}

const EraSelection: React.FC<EraSelectionProps> = ({ onSelect }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-header font-bold gradient-text">Choose Your Destination</h2>
        <p className="text-white/60">Where in time shall we project your likeness?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ERAS.map((era) => (
          <button
            key={era.id}
            onClick={() => onSelect(era)}
            className="group relative h-80 rounded-3xl overflow-hidden glass border border-white/5 hover:border-amber-500/50 transition-all text-left shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1"
          >
            <img 
              src={era.thumbnail} 
              alt={era.name} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 space-y-2">
              <h3 className="text-2xl font-header font-bold text-white group-hover:text-amber-400 transition-colors">{era.name}</h3>
              <p className="text-sm text-white/70 line-clamp-2">{era.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EraSelection;
