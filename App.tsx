import React, { useState, useEffect } from 'react';
import { AppView, HealthMetrics, ArtPiece } from './types';
import { Dashboard } from './components/Dashboard';
import { Gallery } from './components/Gallery';
import { Settings } from './components/Settings';
import { Navigation } from './components/Navigation';
import { ArtModal } from './components/ArtModal';
import { generateHealthArt } from './services/geminiService';

// Mock Data Generator
const generateMockMetrics = (): HealthMetrics => ({
  sleepHours: Number((Math.random() * 5 + 4).toFixed(1)), // 4-9 hours
  steps: Math.floor(Math.random() * 12000 + 2000), // 2000-14000 steps
  stressLevel: Math.floor(Math.random() * 60 + 20), // 20-80 stress
  lastUpdated: new Date()
});

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [metrics, setMetrics] = useState<HealthMetrics>(generateMockMetrics());
  const [gallery, setGallery] = useState<ArtPiece[]>([]);
  const [selectedArt, setSelectedArt] = useState<ArtPiece | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const savedGallery = localStorage.getItem('aura_gallery');
    if (savedGallery) {
      try {
        const parsed = JSON.parse(savedGallery);
        // Fix date strings back to Date objects
        const hydrated = parsed.map((p: any) => ({
          ...p,
          timestamp: new Date(p.timestamp),
          metricsSnapshot: { ...p.metricsSnapshot, lastUpdated: new Date(p.metricsSnapshot.lastUpdated) }
        }));
        setGallery(hydrated);
      } catch (e) {
        console.error("Failed to load gallery", e);
      }
    }
  }, []);

  // Save to local storage on update
  useEffect(() => {
    localStorage.setItem('aura_gallery', JSON.stringify(gallery));
  }, [gallery]);

  const handleRefreshMetrics = () => {
    setMetrics(generateMockMetrics());
  };

  const handleGenerateArt = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setError(null);

    try {
      const { imageUrl, prompt } = await generateHealthArt(metrics);
      
      const newPiece: ArtPiece = {
        id: crypto.randomUUID(),
        imageUrl,
        timestamp: new Date(),
        metricsSnapshot: { ...metrics },
        promptUsed: prompt
      };

      setGallery(prev => [newPiece, ...prev]);
      setSelectedArt(newPiece); // Open modal immediately
    } catch (err: any) {
      setError(err.message || "Failed to generate art. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteArt = (id: string) => {
    setGallery(prev => prev.filter(p => p.id !== id));
  };

  const renderView = () => {
    switch (view) {
      case AppView.DASHBOARD:
        return (
          <Dashboard 
            metrics={metrics} 
            onRefreshData={handleRefreshMetrics} 
            onGenerate={handleGenerateArt}
            isGenerating={isGenerating}
          />
        );
      case AppView.GALLERY:
        return (
          <Gallery 
            items={gallery} 
            onDelete={handleDeleteArt} 
            onSelect={setSelectedArt} 
          />
        );
      case AppView.SETTINGS:
        return (
          <Settings 
            metrics={metrics} 
            onUpdateMetrics={setMetrics} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Ambient background glow - expanded for wide screens */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-violet-600/5 rounded-full blur-[100px]"></div>
      </div>

      <main className="max-w-6xl mx-auto min-h-screen relative z-10 p-6 md:p-10 lg:p-16">
        {renderView()}

        {error && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6">
            <div className="bg-red-500/90 text-white text-sm p-4 rounded-xl shadow-xl backdrop-blur-md flex justify-between items-center animate-in slide-in-from-top duration-300">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-4 bg-white/20 p-1 rounded-full hover:bg-white/30 transition-colors">✕</button>
            </div>
          </div>
        )}
      </main>

      <Navigation currentView={view} onChangeView={setView} />
      
      <ArtModal art={selectedArt} onClose={() => setSelectedArt(null)} />
    </div>
  );
};

export default App;