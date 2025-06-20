
import React, { useState, memo, useCallback } from 'react';
import { RefreshCw, Info, Globe, Zap, BarChart3, Sparkles } from 'lucide-react';
import { useSpaceData } from '../hooks/useSpaceData';
import { DataAnalysisPanel } from './DataAnalysisPanel';
import { AISpaceIdentifier } from './AISpaceIdentifier';
import { toast } from 'sonner';

export const SpaceControls = memo(() => {
  const { refetchData, loading } = useSpaceData();
  const [showDataAnalysis, setShowDataAnalysis] = useState(false);
  const [showAIIdentifier, setShowAIIdentifier] = useState(false);

  const handleRefresh = useCallback(async () => {
    toast.info("Refreshing space data...");
    await refetchData();
    toast.success("Space data updated!");
  }, [refetchData]);

  const showControls = useCallback(() => {
    toast.info("Use mouse to orbit around Earth, scroll to zoom, and click asteroids for details!");
  }, []);

  const handleShowDataAnalysis = useCallback(() => {
    setShowDataAnalysis(true);
  }, []);

  const handleCloseDataAnalysis = useCallback(() => {
    setShowDataAnalysis(false);
  }, []);

  const handleShowAIIdentifier = useCallback(() => {
    setShowAIIdentifier(true);
  }, []);

  const handleCloseAIIdentifier = useCallback(() => {
    setShowAIIdentifier(false);
  }, []);

  return (
    <>
      <div className="absolute top-4 right-4 z-40 flex flex-col gap-2">
        <div className="group relative">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="bg-black/95 hover:bg-black text-white p-3 rounded-lg backdrop-blur-sm border border-blue-500/40 transition-all duration-200 hover:border-blue-400/60 disabled:opacity-50 shadow-lg"
            title="Refresh space data"
          >
            <RefreshCw className={`w-5 h-5 text-white ${loading ? 'animate-spin' : ''}`} />
          </button>
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white text-black px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border">
            Refresh space data
          </div>
        </div>
        
        <div className="group relative">
          <button
            onClick={handleShowAIIdentifier}
            className="bg-black/95 hover:bg-black text-white p-3 rounded-lg backdrop-blur-sm border border-purple-500/40 transition-all duration-200 hover:border-purple-400/60 shadow-lg"
            title="AI Space Identifier"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
          </button>
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white text-black px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border">
            AI Space Identifier
          </div>
        </div>
        
        <div className="group relative">
          <button
            onClick={handleShowDataAnalysis}
            className="bg-black/95 hover:bg-black text-white p-3 rounded-lg backdrop-blur-sm border border-blue-500/40 transition-all duration-200 hover:border-blue-400/60 shadow-lg"
            title="Data Analysis"
          >
            <BarChart3 className="w-5 h-5 text-white" />
          </button>
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white text-black px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border">
            Data Analysis
          </div>
        </div>
        
        <div className="group relative">
          <button
            onClick={showControls}
            className="bg-black/95 hover:bg-black text-white p-3 rounded-lg backdrop-blur-sm border border-blue-500/40 transition-all duration-200 hover:border-blue-400/60 shadow-lg"
            title="Show controls"
          >
            <Info className="w-5 h-5 text-white" />
          </button>
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white text-black px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border">
            Show controls
          </div>
        </div>
        
        <div className="bg-black/95 text-white p-3 rounded-lg backdrop-blur-sm border border-blue-500/40 shadow-lg">
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-white font-semibold">Earth</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-semibold">Asteroids</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-white font-semibold">AI Powered</span>
            </div>
          </div>
        </div>
      </div>

      {showDataAnalysis && (
        <DataAnalysisPanel onClose={handleCloseDataAnalysis} />
      )}

      {showAIIdentifier && (
        <AISpaceIdentifier onClose={handleCloseAIIdentifier} />
      )}
    </>
  );
});

SpaceControls.displayName = 'SpaceControls';
