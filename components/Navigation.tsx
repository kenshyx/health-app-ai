import React from 'react';
import { AppView } from '../types';
import { Home, Grid, Settings as SettingsIcon } from 'lucide-react';

interface NavigationProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: AppView.DASHBOARD, icon: Home, label: 'Today' },
    { id: AppView.GALLERY, icon: Grid, label: 'Gallery' },
    { id: AppView.SETTINGS, icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-2xl border-t border-slate-800/50 pb-safe pt-2 px-6 z-40">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto md:h-20">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 group ${
                isActive ? 'text-indigo-400 scale-110' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} className="transition-transform group-hover:-translate-y-0.5" />
              <span className={`text-[10px] font-semibold tracking-wide uppercase ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};