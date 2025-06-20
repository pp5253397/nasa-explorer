
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SpaceStation = () => {
  const stationRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (stationRef.current) {
      const time = state.clock.getElapsedTime();
      // Station orbits Earth at a different speed and distance
      stationRef.current.position.x = Math.cos(time * 0.8) * 8;
      stationRef.current.position.z = Math.sin(time * 0.8) * 8;
      stationRef.current.position.y = Math.sin(time * 0.2) * 1;
      
      // Slow rotation
      stationRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={stationRef}>
      {/* Main station body */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 1, 8]} />
        <meshPhongMaterial color="#silver" />
      </mesh>
      
      {/* Solar panels */}
      <mesh position={[1, 0, 0]}>
        <boxGeometry args={[0.8, 0.05, 1.5]} />
        <meshPhongMaterial color="#1a1a3a" emissive="#000033" />
      </mesh>
      <mesh position={[-1, 0, 0]}>
        <boxGeometry args={[0.8, 0.05, 1.5]} />
        <meshPhongMaterial color="#1a1a3a" emissive="#000033" />
      </mesh>
      
      {/* Communication dish */}
      <mesh position={[0, 0.7, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <coneGeometry args={[0.2, 0.3, 8]} />
        <meshPhongMaterial color="#white" />
      </mesh>
    </group>
  );
};
