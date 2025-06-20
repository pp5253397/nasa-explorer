
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CometTrail = ({ position }: { position: [number, number, number] }) => {
  const trailRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  
  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = Math.random() * -5;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (trailRef.current && materialRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Animate opacity for twinkling effect
      materialRef.current.opacity = 0.3 + Math.sin(time * 3) * 0.2;
      
      // Move the trail
      trailRef.current.position.x = Math.cos(time * 0.3) * 15;
      trailRef.current.position.z = Math.sin(time * 0.3) * 15;
      trailRef.current.position.y = 3 + Math.sin(time * 0.5) * 2;
    }
  });

  return (
    <points ref={trailRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color="#87CEEB"
        size={0.05}
        transparent
        opacity={0.5}
      />
    </points>
  );
};
