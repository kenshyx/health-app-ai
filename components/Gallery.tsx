import React from 'react';
import { ArtPiece } from '../types';
import { Calendar, Trash2, Maximize2, Layers } from 'lucide-react';

interface GalleryProps {
  items: ArtPiece[];
  onDelete: (id: string) => void;
  onSelect: (item: ArtPiece) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ items, onDelete, onSelect }) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-6">
          <Layers size={32} className="opacity-30" />
        </div>
        <h3 className="text-xl font-bold text-slate-300 mb-2">Your collection is empty</h3>
        <p className="max-w-xs text-sm leading-relaxed">Head back to the dashboard to generate your first Aura based on today's health data.</p>
      </div>
    );
  }

  return (
    <div className="pb-32 animate-fade-in">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Your Collection</h2>
          <p className="text-slate-400 text-sm mt-1">A visual history of your wellbeing</p>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
          {items.length} PIECES
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map((art) => (
          <div 
            key={art.id} 
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/50 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
          >
            <img 
              src={art.imageUrl} 
              alt="Generated Aura" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
              onClick={() => onSelect(art)}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-black uppercase tracking-wider mb-3">
                <Calendar size={12} className="text-indigo-400" />
                {art.timestamp.toLocaleDateString()}
              </div>
              
              <div className="flex justify-between items-center">
                 <button 
                  onClick={(e) => { e.stopPropagation(); onSelect(art); }}
                  className="p-2 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-colors"
                  title="View Details"
                >
                  <Maximize2 size={16} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(art.id); }}
                  className="p-2 bg-red-500/20 backdrop-blur-md rounded-xl text-red-400 hover:bg-red-500/40 transition-colors"
                  title="Delete Piece"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};