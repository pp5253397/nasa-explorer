
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export const Moon = () => {
  const moonRef = useRef<THREE.Mesh>(null);
  
  // Create a simple moon texture
  const moonTexture = useLoader(TextureLoader, 'data:image/svg+xml;base64,' + btoa(`
    <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="moon" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#E8E8E8"/>
          <stop offset="50%" stop-color="#C0C0C0"/>
          <stop offset="100%" stop-color="#808080"/>
        </radialGradient>
      </defs>
      <rect width="256" height="256" fill="url(#moon)"/>
      <circle cx="80" cy="100" r="8" fill="#A0A0A0"/>
      <circle cx="150" cy="80" r="12" fill="#A0A0A0"/>
      <circle cx="200" cy="150" r="6" fill="#A0A0A0"/>
      <circle cx="120" cy="180" r="10" fill="#A0A0A0"/>
    </svg>
  `));

  useFrame((state) => {
    if (moonRef.current) {
      // Moon orbits Earth
      const time = state.clock.getElapsedTime();
      moonRef.current.position.x = Math.cos(time * 0.5) * 6;
      moonRef.current.position.z = Math.sin(time * 0.5) * 6;
      moonRef.current.position.y = Math.sin(time * 0.3) * 0.5;
      
      // Moon rotates slowly
      moonRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhongMaterial map={moonTexture} />
    </mesh>
  );
};
