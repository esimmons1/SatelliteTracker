import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SatelliteInfo from './SatelliteInfo';

interface SatelliteProps {
  id: string;
  name: string;
  position: [number, number, number];
  color?: string;
  size?: number;
}

const Satellite: React.FC<SatelliteProps> = ({ 
  id, 
  name,
  position, 
  color = '#ff0000', 
  size = 0.03 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Add a subtle oscillation to make satellites more visible
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.scale.x = size * (1 + Math.sin(clock.getElapsedTime() * 2) * 0.1);
      meshRef.current.scale.y = size * (1 + Math.sin(clock.getElapsedTime() * 2) * 0.1);
      meshRef.current.scale.z = size * (1 + Math.sin(clock.getElapsedTime() * 2) * 0.1);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <SatelliteInfo id={id} name={name} position={position} />
    </group>
  );
};

const SatelliteOrbit: React.FC<{ position: [number, number, number], radius: number, color?: string }> = ({ 
  position, 
  radius, 
  color = '#ffffff' 
}) => {
  const curve = new THREE.EllipseCurve(
    0, 0,             // Center x, y
    radius, radius,   // xRadius, yRadius
    0, 2 * Math.PI,   // startAngle, endAngle
    false,            // clockwise
    0                 // rotation
  );
  
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  return (
    <group position={position}>
      <group rotation={[Math.PI/2, 0, 0]}>
        <line>
          <bufferGeometry attach="geometry" {...geometry} />
          <lineBasicMaterial attach="material" color={color} transparent opacity={0.3} />
        </line>
      </group>
    </group>
  );
};

interface SatelliteData {
  id: string;
  name: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
}

const SatelliteGroup: React.FC = () => {
  const [satellites, setSatellites] = React.useState<SatelliteData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    // For demo purposes, we'll use mock data since direct API integration
    // with SSCWeb would require server-side handling for CORS issues
    const fetchSatelliteData = async () => {
      try {
        // In a production app, this would be a real API call
        // const response = await axios.get('https://api.example.com/satellites');
        
        // Mock data for demonstration
        const mockSatellites: SatelliteData[] = [
          {
            id: 'iss',
            name: 'International Space Station',
            position: { x: 1.2, y: 0.3, z: 0.5 }
          },
          {
            id: 'hubble',
            name: 'Hubble Space Telescope',
            position: { x: -0.8, y: 0.7, z: 0.9 }
          },
          {
            id: 'terra',
            name: 'Terra',
            position: { x: 0.5, y: -1.1, z: 0.6 }
          },
          {
            id: 'aqua',
            name: 'Aqua',
            position: { x: -0.6, y: -0.5, z: 1.2 }
          },
          {
            id: 'aura',
            name: 'Aura',
            position: { x: 1.0, y: -0.2, z: -0.8 }
          },
          {
            id: 'tdrs',
            name: 'TDRS',
            position: { x: -1.1, y: 0.2, z: -0.7 }
          },
          {
            id: 'goes',
            name: 'GOES',
            position: { x: 0.7, y: 1.0, z: -0.4 }
          }
        ];
        
        setSatellites(mockSatellites);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching satellite data:', err);
        setError('Failed to load satellite data');
        setLoading(false);
      }
    };

    fetchSatelliteData();
    
    // Set up interval to refresh data every 30 seconds
    const intervalId = setInterval(fetchSatelliteData, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return null;
  if (error) return null;

  return (
    <group>
      {satellites.map((satellite) => (
        <React.Fragment key={satellite.id}>
          <Satellite 
            id={satellite.id}
            name={satellite.name}
            position={[satellite.position.x, satellite.position.y, satellite.position.z]}
            color={`hsl(${Math.random() * 360}, 100%, 75%)`}
          />
          <SatelliteOrbit 
            position={[0, 0, 0]} 
            radius={Math.sqrt(
              satellite.position.x * satellite.position.x + 
              satellite.position.y * satellite.position.y + 
              satellite.position.z * satellite.position.z
            )}
            color={`hsl(${Math.random() * 360}, 50%, 75%)`}
          />
        </React.Fragment>
      ))}
    </group>
  );
};

export default SatelliteGroup;
