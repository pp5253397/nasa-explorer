
import React, { memo, useCallback } from 'react';
import { X, Calendar, Zap, MapPin } from 'lucide-react';
import type { AsteroidData } from '../types/space';

interface AsteroidTooltipProps {
  asteroid: AsteroidData;
  onClose: () => void;
}

export const AsteroidTooltip = memo<AsteroidTooltipProps>(({ asteroid, onClose }) => {
  const formatNumber = useCallback((num: number) => {
    return new Intl.NumberFormat('en-US').format(Math.round(num));
  }, []);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="bg-gray-900/95 border border-blue-500/30 text-white p-6 rounded-xl backdrop-blur-md shadow-2xl max-w-sm w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-blue-300">{asteroid.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="text-blue-400" size={16} />
            <div>
              <p className="text-xs text-gray-400">Close Approach Date</p>
              <p className="text-sm font-medium text-white">{formatDate(asteroid.closeApproachDate)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Zap className="text-yellow-400" size={16} />
            <div>
              <p className="text-xs text-gray-400">Velocity</p>
              <p className="text-sm font-medium text-white">{formatNumber(asteroid.velocity)} km/h</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="text-green-400" size={16} />
            <div>
              <p className="text-xs text-gray-400">Distance from Earth</p>
              <p className="text-sm font-medium text-white">{formatNumber(asteroid.distance)} km</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${
              asteroid.asteroidType === 'metallic' ? 'bg-gray-400' :
              asteroid.asteroidType === 'icy' ? 'bg-blue-300' : 'bg-orange-400'
            }`} />
            <div>
              <p className="text-xs text-gray-400">Type</p>
              <p className="text-sm font-medium text-white capitalize">{asteroid.asteroidType}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            This Near Earth Object is being tracked by NASA's JPL.
          </p>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.asteroid.id === nextProps.asteroid.id;
});

AsteroidTooltip.displayName = 'AsteroidTooltip';
