import React from 'react';
import { ArtPiece } from '../types';
import { X, Share2, Info } from 'lucide-react';

interface ArtModalProps {
  art: ArtPiece | null;
  onClose: () => void;
}

export const ArtModal: React.FC<ArtModalProps> = ({ art, onClose }) => {
  if (!art) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 z-50"
      >
        <X size={24} />
      </button>

      <div className="w-full max-w-lg flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-violet-900/20 border border-slate-800">
           <img src={art.imageUrl} alt="Full Aura" className="w-full h-auto object-cover" />
           <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-20">
             <div className="flex justify-between items-end">
               <div>
                 <p className="text-slate-400 text-xs font-mono mb-1">{art.timestamp.toLocaleDateString()} • {art.timestamp.toLocaleTimeString()}</p>
                 <h2 className="text-white text-xl font-bold">Daily Aura</h2>
               </div>
               <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30" title="Share (Mock)">
                 <Share2 size={20} />
               </button>
             </div>
           </div>
        </div>

        {/* Stats Snapshot */}
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center gap-2 mb-3 text-slate-400">
             <Info size={16} />
             <span className="text-xs uppercase tracking-wider font-semibold">Source Metrics</span>
          </div>
          <div className="flex justify-between divide-x divide-slate-800">
             <div className="px-2 text-center flex-1">
               <span className="block text-lg font-bold text-violet-400">{art.metricsSnapshot.sleepHours}h</span>
               <span className="text-[10px] text-slate-500 uppercase">Sleep</span>
             </div>
             <div className="px-2 text-center flex-1">
               <span className="block text-lg font-bold text-emerald-400">{(art.metricsSnapshot.steps / 1000).toFixed(1)}k</span>
               <span className="text-[10px] text-slate-500 uppercase">Steps</span>
             </div>
             <div className="px-2 text-center flex-1">
               <span className="block text-lg font-bold text-rose-400">{art.metricsSnapshot.stressLevel}</span>
               <span className="text-[10px] text-slate-500 uppercase">Stress</span>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <p className="text-xs text-slate-500 font-mono break-words">
              <span className="text-slate-300 font-semibold block mb-1">Prompt Used:</span>
              {art.promptUsed}
            </p>
        </div>
      </div>
    </div>
  );
};
