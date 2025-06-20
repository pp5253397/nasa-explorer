
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export const Saturn = () => {
  const saturnRef = useRef<THREE.Group>(null);
  
  const saturnTexture = useLoader(TextureLoader, 'data:image/svg+xml;base64,' + btoa(`
    <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="saturn" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FAD5A5"/>
          <stop offset="50%" stop-color="#FFCC99"/>
          <stop offset="100%" stop-color="#DEB887"/>
        </linearGradient>
      </defs>
      <rect width="256" height="256" fill="url(#saturn)"/>
      <ellipse cx="128" cy="80" rx="200" ry="20" fill="#D2B48C" opacity="0.3"/>
      <ellipse cx="128" cy="120" rx="200" ry="15" fill="#CD853F" opacity="0.3"/>
      <ellipse cx="128" cy="180" rx="200" ry="25" fill="#DEB887" opacity="0.3"/>
    </svg>
  `));

  useFrame((state) => {
    if (saturnRef.current) {
      saturnRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={saturnRef} position={[25, 5, 30]}>
      {/* Saturn planet */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshPhongMaterial map={saturnTexture} />
      </mesh>
      
      {/* Saturn's rings */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[2, 3, 32]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[3.2, 3.8, 32]} />
        <meshBasicMaterial color="#CD853F" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
