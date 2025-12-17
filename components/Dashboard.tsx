import React, { useState, useEffect } from 'react';
import { HealthMetrics, InsightData } from '../types';
import { MetricCard } from './MetricCard';
import { HealthInsights } from './HealthInsights';
import { fetchHealthInsights } from '../services/geminiService';
import { Moon, Footprints, HeartPulse, RefreshCw, Smartphone } from 'lucide-react';

interface DashboardProps {
  metrics: HealthMetrics;
  onRefreshData: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ metrics, onRefreshData, onGenerate, isGenerating }) => {
  const [insights, setInsights] = useState<InsightData | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  
  // Helper to determine status based on values
  const getSleepStatus = (h: number) => h < 6 ? 'Low' : h < 8 ? 'Good' : 'Optimal';
  const getStepStatus = (s: number) => s < 5000 ? 'Sedentary' : s < 10000 ? 'Active' : 'High';
  const getStressStatus = (s: number) => s < 30 ? 'Relaxed' : s < 70 ? 'Moderate' : 'High';

  const handleFetchInsights = async () => {
    setLoadingInsights(true);
    try {
      const data = await fetchHealthInsights(metrics);
      setInsights(data);
    } catch (e) {
      console.error("Failed to load insights", e);
    } finally {
      setLoadingInsights(false);
    }
  };

  // Fetch insights when metrics change significantly, or at least once on mount if we have metrics
  useEffect(() => {
    // Only fetch if we don't have insights yet, or if this is a fresh load
    if (!insights) {
      handleFetchInsights();
    }
  }, [metrics]);

  return (
    <div className="flex flex-col gap-6 pb-24 animate-fade-in">
      <header className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Your Aura</h1>
          <p className="text-slate-400 text-sm">Today's Biometrics</p>
        </div>
        <button 
          onClick={() => { onRefreshData(); setInsights(null); }}
          className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
          title="Sync Data"
        >
          <RefreshCw size={18} />
        </button>
      </header>

      {/* Simulated Connection Banner */}
      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 flex items-center gap-3">
        <Smartphone size={16} className="text-indigo-400" />
        <span className="text-xs text-indigo-200">Synced with HealthKit (Simulated)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard 
          title="Sleep Restoration"
          value={metrics.sleepHours}
          unit="hrs"
          icon={Moon}
          color="violet"
          status={getSleepStatus(metrics.sleepHours)}
          description="Total time spent in bed with tracked sleep cycles."
        />
        <MetricCard 
          title="Activity Level"
          value={metrics.steps.toLocaleString()}
          unit="steps"
          icon={Footprints}
          color="emerald"
          status={getStepStatus(metrics.steps)}
          description="Walking and running distance converted to steps."
        />
        <MetricCard 
          title="Stress Load"
          value={metrics.stressLevel}
          unit="/ 100"
          icon={HeartPulse}
          color="rose"
          status={getStressStatus(metrics.stressLevel)}
          description="Based on Heart Rate Variability (HRV) and resting heart rate."
        />
      </div>

      <div className="mt-2">
         <h2 className="text-lg font-semibold text-white mb-3 px-1">Daily Insights</h2>
         <HealthInsights 
            data={insights} 
            isLoading={loadingInsights} 
            onRefresh={handleFetchInsights} 
         />
      </div>

      <div className="mt-8 border-t border-slate-800 pt-8">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50"></div>
           <div className="relative z-10 flex flex-col items-center gap-4">
             <h2 className="text-xl font-semibold text-white">Visualise Your State</h2>
             <p className="text-sm text-slate-400 max-w-xs mx-auto">
               Generate a unique piece of abstract art based on your current physical and mental metrics using Gemini.
             </p>
             <button
              onClick={onGenerate}
              disabled={isGenerating}
              className={`
                px-8 py-3 rounded-full font-semibold text-white shadow-lg shadow-purple-900/20
                flex items-center gap-2 transition-all transform active:scale-95
                ${isGenerating 
                  ? 'bg-slate-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500'}
              `}
             >
               {isGenerating ? (
                 <>
                   <RefreshCw className="animate-spin" size={18} />
                   Dreaming...
                 </>
               ) : (
                 <>
                   <span className="text-lg">✨</span> Generate Aura
                 </>
               )}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};