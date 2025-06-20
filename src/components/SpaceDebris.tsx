
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SpaceDebris = () => {
  const debrisRef = useRef<THREE.InstancedMesh>(null);
  
  const debrisCount = 200;
  
  const { positions, speeds, sizes } = useMemo(() => {
    const positions = new Float32Array(debrisCount * 3);
    const speeds = new Float32Array(debrisCount);
    const sizes = new Float32Array(debrisCount);
    
    for (let i = 0; i < debrisCount; i++) {
      // Random positions in a sphere around Earth
      const radius = 15 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      speeds[i] = 0.1 + Math.random() * 0.3;
      sizes[i] = 0.02 + Math.random() * 0.08;
    }
    
    return { positions, speeds, sizes };
  }, []);

  useFrame((state) => {
    if (!debrisRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < debrisCount; i++) {
      const matrix = new THREE.Matrix4();
      
      // Orbital motion
      const angle = time * speeds[i] + i;
      const radius = Math.sqrt(
        positions[i * 3] ** 2 + 
        positions[i * 3 + 1] ** 2 + 
        positions[i * 3 + 2] ** 2
      );
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = positions[i * 3 + 1] + Math.sin(time + i) * 0.5;
      
      matrix.makeTranslation(x, y, z);
      matrix.scale(new THREE.Vector3(sizes[i], sizes[i], sizes[i]));
      
      debrisRef.current.setMatrixAt(i, matrix);
    }
    
    debrisRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={debrisRef} args={[undefined, undefined, debrisCount]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#666666" />
    </instancedMesh>
  );
};
