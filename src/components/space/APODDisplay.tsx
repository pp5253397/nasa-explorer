
import React, { memo, useState } from 'react';
import { LoadingWrapper } from '../LoadingWrapper';
import type { APODData } from '../../types/space';

interface APODDisplayProps {
  apodData: APODData;
  loading?: boolean;
}

export const APODDisplay = memo<APODDisplayProps>(({ apodData, loading = false }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="absolute bottom-4 left-4 max-w-md">
      <LoadingWrapper 
        loading={loading}
        skeleton={
          <div className="bg-black/95 text-white p-4 rounded-xl backdrop-blur-md border border-blue-500/40 shadow-2xl">
            <div className="h-4 bg-gray-700 rounded mb-3 animate-pulse"></div>
            <div className="h-32 bg-gray-700 rounded mb-3 animate-pulse"></div>
            <div className="h-3 bg-gray-700 rounded mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse"></div>
          </div>
        }
      >
        <div className="bg-black/95 text-white p-4 rounded-xl backdrop-blur-md border border-blue-500/40 shadow-2xl">
          <h3 className="text-sm font-bold mb-3 text-blue-300">NASA Picture of the Day</h3>
          
          {apodData.url && apodData.media_type === 'image' && !imageError && (
            <div className="mb-3">
              <img 
                src={apodData.url} 
                alt={apodData.title}
                className="w-full h-32 object-cover rounded-lg border border-blue-500/40"
                onError={handleImageError}
                loading="lazy"
              />
            </div>
          )}
          
          <p className="text-sm font-semibold mb-2 text-white">{apodData.title}</p>
          {apodData.date && (
            <p className="text-xs text-gray-200 mb-2 font-medium">{apodData.date}</p>
          )}
          {apodData.explanation && (
            <p className="text-xs text-gray-100 line-clamp-3 leading-relaxed">
              {apodData.explanation.substring(0, 150)}...
            </p>
          )}
        </div>
      </LoadingWrapper>
    </div>
  );
});

APODDisplay.displayName = 'APODDisplay';
