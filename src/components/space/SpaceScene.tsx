
import React, { useState, useEffect } from 'react';
import { Stars, OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import { Earth } from './Earth';
import { Asteroid } from './Asteroid';
import { Moon } from '../Moon';
import { SpaceStation } from '../SpaceStation';
import { Saturn } from '../Saturn';
import { CometTrail } from '../CometTrail';
import { Jupiter } from '../Jupiter';
import { SpaceDebris } from '../SpaceDebris';
import { Pulsar } from '../Pulsar';
import { KeyboardControls } from '../KeyboardControls';
import { useSpaceData } from '../../hooks/useSpaceData';
import { toast } from 'sonner';
import type { AsteroidData } from '../../types/space';

interface SpaceSceneProps {
  onAsteroidSelect: (asteroid: AsteroidData | null) => void;
}

export const SpaceScene: React.FC<SpaceSceneProps> = ({ onAsteroidSelect }) => {
  const { neoData, error } = useSpaceData();
  const [hoveredAsteroid, setHoveredAsteroid] = useState<AsteroidData | null>(null);
  const [asteroids, setAsteroids] = useState<AsteroidData[]>([]);

  useEffect(() => {
    if (neoData) {
      const asteroidTypes: Array<'rocky' | 'metallic' | 'icy'> = ['rocky', 'metallic', 'icy'];
      
      // Convert NEO data to enhanced asteroid objects
      const asteroidList: AsteroidData[] = neoData.slice(0, 20).map((neo, index) => ({
        id: neo.id || `asteroid-${index}`,
        name: neo.name || `Asteroid ${index + 1}`,
        closeApproachDate: neo.closeApproachDate || new Date().toISOString(),
        velocity: neo.velocity || Math.random() * 50000 + 10000,
        distance: neo.distance || Math.random() * 1000000 + 100000,
        position: new Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 20
        ),
        orbitRadius: 4 + Math.random() * 12,
        orbitSpeed: 0.1 + Math.random() * 0.4,
        asteroidType: asteroidTypes[Math.floor(Math.random() * asteroidTypes.length)]
      }));
      setAsteroids(asteroidList);
    }
  }, [neoData]);

  useEffect(() => {
    // Show keyboard controls on mount
    toast.info("New features added! Press H for keyboard controls");
  }, []);

  if (error) {
    toast.error("Failed to load space data");
  }

  return (
    <>
      {/* Enhanced space background */}
      <Stars radius={400} depth={80} count={30000} factor={10} />
      
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.9} color="#4A90E2" />
      <pointLight position={[0, 15, 0]} intensity={0.6} color="#FFD700" />
      <pointLight position={[50, 0, 50]} intensity={0.4} color="#FF6B6B" />
      
      {/* Celestial bodies */}
      <Earth />
      <Moon />
      <SpaceStation />
      <Saturn />
      <Jupiter />
      
      {/* Space debris field */}
      <SpaceDebris />
      
      {/* Pulsars in the distance */}
      <Pulsar position={[100, 20, 100]} />
      <Pulsar position={[-120, -30, 150]} />
      <Pulsar position={[80, 40, -200]} />
      
      {/* Comet trails */}
      <CometTrail position={[0, 0, 0]} />
      
      {/* Enhanced asteroids */}
      {asteroids.map((asteroid) => (
        <Asteroid
          key={asteroid.id}
          asteroid={asteroid}
          onClick={onAsteroidSelect}
          isHovered={hoveredAsteroid?.id === asteroid.id}
          onHover={setHoveredAsteroid}
        />
      ))}
      
      {/* Keyboard controls */}
      <KeyboardControls />
      
      {/* Enhanced camera controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={0.8}
        panSpeed={0.7}
        rotateSpeed={0.5}
        minDistance={3}
        maxDistance={150}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />
    </>
  );
};
