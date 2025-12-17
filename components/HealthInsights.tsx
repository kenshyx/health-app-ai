import React from 'react';
import { InsightData } from '../types';
import { Lightbulb, Utensils, Clock, Flame, ChevronRight, Sparkles } from 'lucide-react';

interface HealthInsightsProps {
  data: InsightData | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export const HealthInsights: React.FC<HealthInsightsProps> = ({ data, isLoading, onRefresh }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
        <div className="h-48 bg-slate-800/50 rounded-2xl border border-slate-700"></div>
        <div className="h-48 bg-slate-800/50 rounded-2xl border border-slate-700"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <button 
        onClick={onRefresh}
        className="w-full py-10 rounded-2xl border-2 border-dashed border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 hover:border-slate-600 transition-all flex flex-col items-center gap-3"
      >
        <Sparkles size={32} className="text-indigo-400" />
        <span className="text-base font-medium tracking-tight">Generate Personalized AI Insights & Recipe</span>
        <span className="text-xs text-slate-500">Based on your current biometrics</span>
      </button>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in items-start">
      {/* Tips Section */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 h-full">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <Lightbulb className="text-amber-400" size={20} />
          </div>
          <h3 className="font-bold text-lg text-slate-100">Personalized Tips</h3>
        </div>
        <ul className="space-y-4">
          {data.tips.map((tip, idx) => (
            <li key={idx} className="flex gap-4 text-sm md:text-base text-slate-300 leading-relaxed">
              <span className="mt-2 min-w-[8px] h-[8px] rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Recipe Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl h-full">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Utensils size={180} />
        </div>
        
        <div className="p-6 relative z-10">
          <div className="flex items-center gap-2 mb-3 text-emerald-400">
            <Utensils size={18} />
            <span className="text-xs font-black uppercase tracking-widest">Recipe of the Day</span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">{data.recipe.name}</h3>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">{data.recipe.description}</p>
          
          <div className="flex gap-4 mb-8 text-xs font-semibold">
            <div className="flex items-center gap-1.5 bg-slate-700/40 px-3 py-1.5 rounded-full border border-slate-600/30 text-slate-200">
              <Clock size={14} className="text-emerald-400" /> {data.recipe.prepTime}
            </div>
            <div className="flex items-center gap-1.5 bg-slate-700/40 px-3 py-1.5 rounded-full border border-slate-600/30 text-slate-200">
              <Flame size={14} className="text-orange-400" /> {data.recipe.calories} kcal
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Ingredients</h4>
              <div className="flex flex-wrap gap-2">
                {data.recipe.ingredients.map((ing, i) => (
                  <span key={i} className="text-xs bg-slate-950/40 border border-slate-700/50 px-2.5 py-1.5 rounded-lg text-slate-300">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
            
            <details className="group">
              <summary className="flex items-center gap-2 text-sm font-bold text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors list-none">
                View Preparation Steps
                <ChevronRight size={18} className="transition-transform group-open:rotate-90" />
              </summary>
              <div className="mt-4 pl-4 border-l-2 border-indigo-500/30 space-y-3">
                {data.recipe.instructions.map((step, i) => (
                  <div key={i} className="text-sm text-slate-300 leading-relaxed flex gap-3">
                    <span className="text-indigo-500 font-black font-mono shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};