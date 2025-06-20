
import React, { Suspense, useState, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { SpaceScene } from './space/SpaceScene';
import { APODDisplay } from './space/APODDisplay';
import { AsteroidTooltip } from './AsteroidTooltip';
import { LoadingSpinner } from './LoadingSpinner';
import { SpaceControls } from './SpaceControls';
import { MiniMap } from './MiniMap';
import { ErrorBoundary } from './ErrorBoundary';
import { useSpaceData } from '../hooks/useSpaceData';
import type { AsteroidData } from '../types/space';

export const SpaceVisualization = memo(() => {
  const { apodData, loading } = useSpaceData();
  const [selectedAsteroid, setSelectedAsteroid] = useState<AsteroidData | null>(null);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {loading && <LoadingSpinner />}
      
      <ErrorBoundary>
        <SpaceControls />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <MiniMap />
      </ErrorBoundary>
      
      <ErrorBoundary
        fallback={
          <div className="w-full h-full bg-black flex items-center justify-center text-white">
            <p>Failed to load 3D scene</p>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 8, 20], fov: 65 }}
          style={{ background: 'radial-gradient(ellipse at center, #1e3c72 0%, #2a5298 30%, #000 80%)' }}
        >
          <Suspense fallback={null}>
            <SpaceScene onAsteroidSelect={setSelectedAsteroid} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
      
      {selectedAsteroid && (
        <ErrorBoundary>
          <AsteroidTooltip
            asteroid={selectedAsteroid}
            onClose={() => setSelectedAsteroid(null)}
          />
        </ErrorBoundary>
      )}
      
      {apodData && (
        <ErrorBoundary>
          <APODDisplay apodData={apodData} loading={loading} />
        </ErrorBoundary>
      )}
    </div>
  );
});

SpaceVisualization.displayName = 'SpaceVisualization';
