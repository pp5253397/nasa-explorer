
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PulsarProps {
  position: [number, number, number];
}

export const Pulsar: React.FC<PulsarProps> = ({ position }) => {
  const pulsarRef = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (pulsarRef.current) {
      // Pulsing effect
      const pulse = Math.sin(time * 10) * 0.5 + 1;
      pulsarRef.current.scale.setScalar(pulse);
      
      // Color intensity change
      const material = pulsarRef.current.material as THREE.MeshBasicMaterial;
      material.color.setHex(pulse > 1.2 ? 0x00FFFF : 0x0088AA);
    }
    
    if (beamRef.current) {
      beamRef.current.rotation.z += 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={pulsarRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial 
          color="#00FFFF"
        />
      </mesh>
      
      {/* Pulsar beam */}
      <mesh ref={beamRef}>
        <cylinderGeometry args={[0.05, 0.05, 10, 8]} />
        <meshBasicMaterial 
          color="#00FFFF"
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};
