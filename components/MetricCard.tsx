import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  color: string;
  status: string;
  description: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  color,
  status,
  description
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/10 rounded-full -mr-10 -mt-10 blur-2xl transition-all group-hover:bg-${color}-500/20`}></div>
      
      <div className="flex justify-between items-start z-10">
        <div className={`p-2 rounded-xl bg-${color}-500/20 text-${color}-400`}>
          <Icon size={20} />
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600">
          {status}
        </span>
      </div>

      <div className="z-10">
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-bold text-white">{value}</span>
          <span className="text-sm text-slate-500">{unit}</span>
        </div>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
