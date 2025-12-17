import React from 'react';
import { HealthMetrics } from '../types';
import { Sliders } from 'lucide-react';

interface SettingsProps {
  metrics: HealthMetrics;
  onUpdateMetrics: (metrics: HealthMetrics) => void;
}

export const Settings: React.FC<SettingsProps> = ({ metrics, onUpdateMetrics }) => {
  
  const handleChange = (key: keyof HealthMetrics, value: number) => {
    onUpdateMetrics({
      ...metrics,
      [key]: value
    });
  };

  return (
    <div className="pb-24 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white">Configuration</h1>
        <p className="text-slate-400 text-sm">Simulate Health Data</p>
      </header>

      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 space-y-8">
        <div className="flex items-center gap-2 mb-4 text-indigo-400">
            <Sliders size={20} />
            <h3 className="font-semibold">Manual Overrides</h3>
        </div>
        
        {/* Sleep Slider */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-slate-300">Sleep Duration</label>
            <span className="text-sm font-bold text-violet-400">{metrics.sleepHours} hrs</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="12" 
            step="0.5" 
            value={metrics.sleepHours} 
            onChange={(e) => handleChange('sleepHours', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
          <p className="text-xs text-slate-500">Affects the mood and clarity of the generated art.</p>
        </div>

        {/* Steps Slider */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-slate-300">Daily Steps</label>
            <span className="text-sm font-bold text-emerald-400">{metrics.steps.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="25000" 
            step="100" 
            value={metrics.steps} 
            onChange={(e) => handleChange('steps', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <p className="text-xs text-slate-500">Influences dynamic movement and energy in the composition.</p>
        </div>

        {/* Stress Slider */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-slate-300">Stress Level (HRV Inv.)</label>
            <span className="text-sm font-bold text-rose-400">{metrics.stressLevel}/100</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="1" 
            value={metrics.stressLevel} 
            onChange={(e) => handleChange('stressLevel', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
           <div className="flex justify-between text-xs text-slate-500 px-1">
             <span>Calm</span>
             <span>High Stress</span>
           </div>
           <p className="text-xs text-slate-500 mt-1">Determines complexity, color intensity, and chaos.</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
        <p className="text-xs text-yellow-200/80">
          <strong>Note:</strong> In a real production app, this would connect to Apple HealthKit or Google Fit via a native bridge. Since this is a web demo, use these sliders to simulate different health states.
        </p>
      </div>
    </div>
  );
};
