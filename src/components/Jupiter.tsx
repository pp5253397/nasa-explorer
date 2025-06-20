
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export const Jupiter = () => {
  const jupiterRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  // Jupiter texture with the Great Red Spot
  const jupiterTexture = useLoader(TextureLoader, 'data:image/svg+xml;base64,' + btoa(`
    <svg width="1024" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bands" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#D2691E"/>
          <stop offset="20%" stop-color="#CD853F"/>
          <stop offset="40%" stop-color="#F4A460"/>
          <stop offset="60%" stop-color="#DEB887"/>
          <stop offset="80%" stop-color="#D2691E"/>
          <stop offset="100%" stop-color="#8B4513"/>
        </linearGradient>
      </defs>
      <rect width="1024" height="512" fill="url(#bands)"/>
      
      <!-- Atmospheric bands -->
      <rect x="0" y="80" width="1024" height="20" fill="#CD853F" opacity="0.8"/>
      <rect x="0" y="160" width="1024" height="25" fill="#DEB887" opacity="0.7"/>
      <rect x="0" y="280" width="1024" height="30" fill="#F4A460" opacity="0.6"/>
      <rect x="0" y="380" width="1024" height="20" fill="#CD853F" opacity="0.8"/>
      
      <!-- Great Red Spot -->
      <ellipse cx="300" cy="280" rx="80" ry="45" fill="#B22222" opacity="0.9"/>
      <ellipse cx="300" cy="280" rx="60" ry="30" fill="#DC143C" opacity="0.7"/>
      
      <!-- Storm systems -->
      <ellipse cx="600" cy="150" rx="30" ry="20" fill="#8B0000" opacity="0.6"/>
      <ellipse cx="800" cy="350" rx="25" ry="15" fill="#8B0000" opacity="0.5"/>
    </svg>
  `));

  useFrame((state) => {
    if (jupiterRef.current) {
      const time = state.clock.getElapsedTime();
      // Jupiter orbits much slower and farther from Earth
      jupiterRef.current.position.x = Math.cos(time * 0.1) * 35;
      jupiterRef.current.position.z = Math.sin(time * 0.1) * 35;
      jupiterRef.current.position.y = Math.sin(time * 0.05) * 2;
      
      // Jupiter rotates faster than Earth
      jupiterRef.current.rotation.y += 0.02;
    }
    
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.015;
    }
  });

  return (
    <group>
      <mesh ref={jupiterRef}>
        <sphereGeometry args={[4, 64, 64]} />
        <meshPhongMaterial 
          map={jupiterTexture}
          shininess={30}
        />
      </mesh>
      
      {/* Atmospheric effects */}
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[4.1, 32, 32]} />
        <meshBasicMaterial 
          color="#FFA500"
          transparent 
          opacity={0.2}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
