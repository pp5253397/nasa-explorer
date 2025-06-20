
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export const Earth: React.FC = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // Enhanced realistic Earth texture with detailed continents and oceans
  const earthTexture = useLoader(TextureLoader, 'data:image/svg+xml;base64,' + btoa(`
    <svg width="2048" height="1024" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="deepOcean" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stop-color="#1e3a8a"/>
          <stop offset="40%" stop-color="#1e40af"/>
          <stop offset="70%" stop-color="#1d4ed8"/>
          <stop offset="100%" stop-color="#1e3a8a"/>
        </radialGradient>
        <linearGradient id="landMass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#22c55e"/>
          <stop offset="25%" stop-color="#16a34a"/>
          <stop offset="50%" stop-color="#15803d"/>
          <stop offset="75%" stop-color="#166534"/>
          <stop offset="100%" stop-color="#14532d"/>
        </linearGradient>
        <linearGradient id="desert" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#eab308"/>
          <stop offset="50%" stop-color="#ca8a04"/>
          <stop offset="100%" stop-color="#a16207"/>
        </linearGradient>
        <linearGradient id="mountain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#78716c"/>
          <stop offset="50%" stop-color="#57534e"/>
          <stop offset="100%" stop-color="#292524"/>
        </linearGradient>
      </defs>
      
      <!-- Ocean base -->
      <rect width="2048" height="1024" fill="url(#deepOcean)"/>
      
      <!-- Africa and Madagascar -->
      <path d="M1100,300 Q1200,280 1280,320 Q1340,380 1320,480 Q1300,580 1260,640 Q1200,680 1140,660 Q1080,620 1060,560 Q1040,480 1080,400 Q1100,350 1100,300" fill="url(#landMass)"/>
      <ellipse cx="1340" cy="580" rx="25" ry="60" fill="url(#landMass)"/>
      
      <!-- Europe -->
      <path d="M1080,200 Q1140,180 1200,200 Q1240,240 1220,280 Q1180,300 1140,290 Q1100,270 1080,240 Q1070,220 1080,200" fill="url(#landMass)"/>
      
      <!-- Asia -->
      <path d="M1240,160 Q1400,140 1600,180 Q1700,220 1720,300 Q1740,380 1700,420 Q1640,450 1580,430 Q1520,400 1480,360 Q1440,320 1420,280 Q1400,240 1420,200 Q1440,180 1480,170 Q1520,165 1560,170 Q1600,175 1640,185 Q1680,195 1720,210" fill="url(#landMass)"/>
      
      <!-- India -->
      <path d="M1480,380 Q1520,360 1560,380 Q1580,420 1570,460 Q1550,480 1520,470 Q1490,450 1480,420 Q1475,400 1480,380" fill="url(#landMass)"/>
      
      <!-- North America -->
      <path d="M300,200 Q500,160 600,220 Q650,280 620,360 Q580,420 520,440 Q460,450 400,430 Q340,400 320,360 Q300,320 290,280 Q285,240 300,200" fill="url(#landMass)"/>
      
      <!-- Greenland -->
      <ellipse cx="800" cy="120" rx="80" ry="40" fill="#f8fafc"/>
      
      <!-- South America -->
      <path d="M480,480 Q540,460 580,500 Q600,560 590,640 Q580,720 560,780 Q540,820 520,840 Q500,850 480,840 Q460,820 450,780 Q440,740 445,700 Q450,660 460,620 Q470,580 480,540 Q485,510 480,480" fill="url(#landMass)"/>
      
      <!-- Australia -->
      <ellipse cx="1680" cy="700" rx="120" ry="50" fill="url(#landMass)"/>
      
      <!-- Antarctica -->
      <rect x="0" y="900" width="2048" height="124" fill="#f8fafc"/>
      
      <!-- Arctic ice cap -->
      <ellipse cx="1024" cy="50" rx="400" ry="50" fill="#f8fafc" opacity="0.9"/>
      
      <!-- Sahara Desert -->
      <ellipse cx="1150" cy="350" rx="150" ry="40" fill="url(#desert)" opacity="0.8"/>
      
      <!-- Himalayas -->
      <path d="M1500,320 Q1550,310 1600,320 Q1620,330 1600,340 Q1550,350 1500,340 Q1480,330 1500,320" fill="url(#mountain)"/>
      
      <!-- Andes Mountains -->
      <path d="M520,500 Q530,580 525,660 Q520,740 515,820" stroke="url(#mountain)" stroke-width="8" fill="none"/>
      
      <!-- Rocky Mountains -->
      <path d="M400,250 Q420,300 415,350 Q410,400 405,450" stroke="url(#mountain)" stroke-width="6" fill="none"/>
      
      <!-- Cloud formations patterns for realism -->
      <ellipse cx="600" cy="250" rx="80" ry="20" fill="#ffffff" opacity="0.1"/>
      <ellipse cx="1200" cy="400" rx="100" ry="25" fill="#ffffff" opacity="0.1"/>
      <ellipse cx="1500" cy="600" rx="90" ry="30" fill="#ffffff" opacity="0.1"/>
    </svg>
  `));

  // Enhanced cloud texture with more realistic patterns
  const cloudTexture = useLoader(TextureLoader, 'data:image/svg+xml;base64,' + btoa(`
    <svg width="2048" height="1024" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="cloudBlur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
        </filter>
        <filter id="stormBlur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
        </filter>
      </defs>
      <rect width="2048" height="1024" fill="transparent"/>
      
      <!-- Major cloud systems -->
      <!-- Equatorial cloud band -->
      <ellipse cx="300" cy="512" rx="200" ry="30" fill="white" opacity="0.7" filter="url(#cloudBlur)"/>
      <ellipse cx="800" cy="520" rx="250" ry="35" fill="white" opacity="0.6" filter="url(#cloudBlur)"/>
      <ellipse cx="1300" cy="515" rx="180" ry="25" fill="white" opacity="0.8" filter="url(#cloudBlur)"/>
      <ellipse cx="1700" cy="510" rx="220" ry="40" fill="white" opacity="0.5" filter="url(#cloudBlur)"/>
      
      <!-- Northern hemisphere weather systems -->
      <ellipse cx="400" cy="300" rx="120" ry="60" fill="white" opacity="0.6" filter="url(#cloudBlur)"/>
      <ellipse cx="900" cy="250" rx="150" ry="70" fill="white" opacity="0.7" filter="url(#cloudBlur)"/>
      <ellipse cx="1400" cy="280" rx="100" ry="50" fill="white" opacity="0.5" filter="url(#cloudBlur)"/>
      
      <!-- Southern hemisphere weather -->
      <ellipse cx="500" cy="700" rx="130" ry="55" fill="white" opacity="0.6" filter="url(#cloudBlur)"/>
      <ellipse cx="1100" cy="750" rx="140" ry="45" fill="white" opacity="0.7" filter="url(#cloudBlur)"/>
      <ellipse cx="1600" cy="720" rx="110" ry="60" fill="white" opacity="0.5" filter="url(#cloudBlur)"/>
      
      <!-- Hurricane/typhoon systems -->
      <circle cx="600" cy="400" r="80" fill="white" opacity="0.8" filter="url(#stormBlur)"/>
      <circle cx="1500" cy="350" r="70" fill="white" opacity="0.9" filter="url(#stormBlur)"/>
      
      <!-- Scattered clouds -->
      <ellipse cx="200" cy="200" rx="60" ry="20" fill="white" opacity="0.4" filter="url(#cloudBlur)"/>
      <ellipse cx="750" cy="150" rx="70" ry="25" fill="white" opacity="0.5" filter="url(#cloudBlur)"/>
      <ellipse cx="1200" cy="180" rx="50" ry="18" fill="white" opacity="0.6" filter="url(#cloudBlur)"/>
      <ellipse cx="1800" cy="220" rx="80" ry="30" fill="white" opacity="0.4" filter="url(#cloudBlur)"/>
      
      <ellipse cx="350" cy="800" rx="90" ry="35" fill="white" opacity="0.5" filter="url(#cloudBlur)"/>
      <ellipse cx="950" cy="850" rx="75" ry="28" fill="white" opacity="0.6" filter="url(#cloudBlur)"/>
      <ellipse cx="1450" cy="820" rx="85" ry="32" fill="white" opacity="0.4" filter="url(#cloudBlur)"/>
    </svg>
  `));

  // Normal map for realistic terrain relief
  const normalTexture = useLoader(TextureLoader, 'data:image/svg+xml;base64,' + btoa(`
    <svg width="1024" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="emboss">
          <feConvolveMatrix kernelMatrix="1 1 1 1 -8 1 1 1 1"/>
        </filter>
      </defs>
      <rect width="1024" height="512" fill="#8080ff"/>
      <!-- Mountain ranges for bump mapping -->
      <ellipse cx="250" cy="200" rx="80" ry="30" fill="#9090ff" filter="url(#emboss)"/>
      <ellipse cx="550" cy="250" rx="120" ry="25" fill="#7070ff" filter="url(#emboss)"/>
      <ellipse cx="750" cy="160" rx="100" ry="35" fill="#6060ff" filter="url(#emboss)"/>
      <!-- Ocean trenches -->
      <ellipse cx="400" cy="400" rx="150" ry="40" fill="#4040ff" filter="url(#emboss)"/>
    </svg>
  `));

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002; // Slower, more realistic rotation
    }
    
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.003; // Clouds move slightly faster
    }
    
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001;
      const pulse = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.05 + 0.15;
      (atmosphereRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }

    if (glowRef.current) {
      const glowPulse = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1 + 0.3;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowPulse;
    }
  });

  return (
    <group>
      {/* Earth surface with enhanced realistic textures */}
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshPhongMaterial 
          map={earthTexture}
          normalMap={normalTexture}
          normalScale={new THREE.Vector2(0.2, 0.2)}
          shininess={30}
          specular={new THREE.Color(0x222222)}
          transparent={false}
        />
      </mesh>
      
      {/* Enhanced cloud layer */}
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.005, 64, 64]} />
        <meshLambertMaterial 
          map={cloudTexture}
          transparent 
          opacity={0.4}
          depthWrite={false}
          alphaTest={0.1}
        />
      </mesh>
      
      {/* Atmospheric glow */}
      <mesh ref={atmosphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.12, 32, 32]} />
        <meshBasicMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Outer atmospheric glow */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.25, 32, 32]} />
        <meshBasicMaterial 
          color="#4a90e2"
          transparent 
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Night side city lights */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.001, 64, 64]} />
        <meshBasicMaterial 
          color="#ffd700"
          transparent 
          opacity={0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
