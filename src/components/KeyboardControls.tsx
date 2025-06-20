
import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { toast } from 'sonner';

export const KeyboardControls = () => {
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const speed = 2;
      
      switch (event.key.toLowerCase()) {
        case 'w':
          camera.position.z -= speed;
          break;
        case 's':
          camera.position.z += speed;
          break;
        case 'a':
          camera.position.x -= speed;
          break;
        case 'd':
          camera.position.x += speed;
          break;
        case 'q':
          camera.position.y += speed;
          break;
        case 'e':
          camera.position.y -= speed;
          break;
        case 'r':
          // Reset camera position
          camera.position.set(0, 8, 20);
          toast.info("Camera position reset!");
          break;
        case 'h':
          toast.info("Controls: W/A/S/D to move, Q/E for up/down, R to reset, H for help");
          break;
      }
      
      // Prevent camera from going too close to origin
      const distance = camera.position.length();
      if (distance < 3) {
        camera.position.normalize().multiplyScalar(3);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [camera]);

  return null;
};
