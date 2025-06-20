
import React, { useRef, useState, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { AsteroidData } from '../../types/space';

interface AsteroidProps {
  asteroid: AsteroidData;
  onClick: (asteroid: AsteroidData) => void;
  isHovered: boolean;
  onHover: (asteroid: AsteroidData | null) => void;
}

export const Asteroid = memo<AsteroidProps>(({ 
  asteroid, 
  onClick, 
  isHovered, 
  onHover 
}) => {
  const asteroidRef = useRef<THREE.Mesh>(null);
  const [time, setTime] = useState(0);

  // Different colors and shapes based on asteroid type
  const getAsteroidAppearance = () => {
    switch (asteroid.asteroidType) {
      case 'metallic':
        return { color: '#C0C0C0', geometry: 'dodecahedron', emissive: '#404040' };
      case 'icy':
        return { color: '#87CEEB', geometry: 'icosahedron', emissive: '#87CEEB' };
      default:
        return { color: '#8b7355', geometry: 'dodecahedron', emissive: '#000000' };
    }
  };

  const appearance = getAsteroidAppearance();

  useFrame((state, delta) => {
    setTime(time + delta);
    
    if (asteroidRef.current) {
      // Enhanced orbital motion with slight variations
      const x = Math.cos(time * asteroid.orbitSpeed) * asteroid.orbitRadius;
      const z = Math.sin(time * asteroid.orbitSpeed) * asteroid.orbitRadius;
      const y = Math.sin(time * asteroid.orbitSpeed * 0.5) * 0.5;
      
      asteroidRef.current.position.set(x, y, z);
      asteroidRef.current.rotation.x += 0.01;
      asteroidRef.current.rotation.y += 0.02;
      asteroidRef.current.rotation.z += 0.005;
    }
  });

  return (
    <group>
      <mesh
        ref={asteroidRef}
        onClick={() => onClick(asteroid)}
        onPointerOver={() => onHover(asteroid)}
        onPointerOut={() => onHover(null)}
      >
        {appearance.geometry === 'icosahedron' ? (
          <icosahedronGeometry args={[0.1 + Math.random() * 0.1]} />
        ) : (
          <dodecahedronGeometry args={[0.1 + Math.random() * 0.1]} />
        )}
        <meshPhongMaterial 
          color={isHovered ? "#ff6b6b" : appearance.color}
          emissive={appearance.emissive}
          emissiveIntensity={isHovered ? 0.3 : 0.1}
          transparent={true}
          opacity={isHovered ? 1 : 0.8}
        />
      </mesh>
      
      {isHovered && (
        <Billboard position={[0, 0.3, 0]}>
          <Html>
            <div className="bg-black/95 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap border border-white/30 shadow-xl backdrop-blur-sm">
              <span className="font-semibold text-blue-300">{asteroid.name}</span>
              <span className="text-gray-100 ml-1">({asteroid.asteroidType})</span>
            </div>
          </Html>
        </Billboard>
      )}
    </group>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for performance optimization
  return (
    prevProps.asteroid.id === nextProps.asteroid.id &&
    prevProps.isHovered === nextProps.isHovered
  );
});

Asteroid.displayName = 'Asteroid';
