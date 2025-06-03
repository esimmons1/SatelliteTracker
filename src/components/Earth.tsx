import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface EarthProps {
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
}

const Earth: React.FC<EarthProps> = ({ 
  position = [0, 0, 0], 
  scale = 1,
  rotationSpeed = 0.001
}) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  
  // Load Earth textures
  const [
    earthMap,
    earthNormalMap,
    earthCloudsMap
  ] = useTexture([
    '/textures/earth_daymap.jpg',
    '/textures/earth_normal_map.jpg',
    '/textures/earth_clouds.png'
  ]);

  // Rotate the Earth on each frame
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += rotationSpeed;
    }
    
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += rotationSpeed * 0.8; // Clouds rotate slightly slower for realism
    }
    
    if (atmosphereRef.current) {
      // Ensure atmosphere follows Earth but doesn't rotate
      atmosphereRef.current.position.copy(earthRef.current?.position || new THREE.Vector3());
    }
  });

  return (
    <group position={position as [number, number, number]}>
      {/* Earth sphere with enhanced materials */}
      <mesh ref={earthRef} scale={scale} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={earthMap}
          normalMap={earthNormalMap}
          normalScale={[0.05, 0.05]}
          roughness={0.7}
          metalness={0.1}
          envMapIntensity={0.4}
        />
      </mesh>
      
      {/* Atmosphere glow effect */}
      <mesh ref={atmosphereRef} scale={scale * 1.025}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#88ccff"
          transparent={true}
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={scale * 1.01}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={earthCloudsMap}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
};

export default Earth;
