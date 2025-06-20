
import React from 'react';
import { Loader2, Satellite } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="relative">
          <Satellite className="w-16 h-16 mx-auto mb-4 text-blue-400 animate-pulse" />
          <Loader2 className="w-8 h-8 absolute top-8 left-1/2 transform -translate-x-1/2 animate-spin text-blue-300" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Loading Space Data</h2>
        <p className="text-gray-400 text-sm">Fetching astronomical data from NASA...</p>
        <div className="mt-4 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};
