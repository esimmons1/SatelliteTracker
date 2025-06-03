import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import Earth from './Earth';
import SatelliteGroup from './Satellites';

const Scene: React.FC = () => {
  return (
    <Canvas style={{ height: '100vh', background: '#000' }}>
      {/* Ambient light for general scene illumination */}
      <ambientLight intensity={0.2} />
      
      {/* Directional light to simulate sunlight */}
      <directionalLight 
        position={[5, 3, 5]} 
        intensity={1.5} 
        color="#ffffff" 
        castShadow
      />
      
      {/* Fill light from opposite side */}
      <directionalLight
        position={[-5, -3, -5]}
        intensity={0.2}
        color="#b0c4de"
      />
      
      {/* Earth component */}
      <Earth position={[0, 0, 0]} scale={1} rotationSpeed={0.0005} />
      
      {/* Satellite visualization */}
      <SatelliteGroup />
      
      {/* Background stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      
      {/* Environment map for reflections */}
      <Environment preset="night" />
      
      {/* Camera controls for user interaction */}
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.5}
        minDistance={1.5}
        maxDistance={10}
      />
    </Canvas>
  );
};

export default Scene;
