
import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

export const MiniMap = () => {
  return (
    <div className="absolute bottom-4 right-4 w-48 h-48 bg-black/90 border border-blue-500/30 rounded-lg overflow-hidden shadow-xl">
      <div className="text-white text-xs p-2 border-b border-blue-500/30 bg-gray-900/80">
        Solar System Map
      </div>
      <Canvas
        camera={{ position: [0, 50, 0], fov: 60 }}
        style={{ width: '100%', height: 'calc(100% - 32px)' }}
      >
        <ambientLight intensity={0.5} />
        
        {/* Sun at center */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
        
        {/* Earth */}
        <mesh position={[3, 0, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial color="#4A90E2" />
        </mesh>
        
        {/* Jupiter */}
        <mesh position={[8, 0, 0]}>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshBasicMaterial color="#D2691E" />
        </mesh>
        
        {/* Saturn */}
        <mesh position={[12, 0, 0]}>
          <sphereGeometry args={[0.35, 8, 8]} />
          <meshBasicMaterial color="#FAD5A5" />
        </mesh>
        
        {/* Orbital paths */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.9, 3.1, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[7.9, 8.1, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[11.9, 12.1, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </Canvas>
    </div>
  );
};
