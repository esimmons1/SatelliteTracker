import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';

interface SatelliteInfoProps {
  id: string;
  name: string;
  position: [number, number, number];
}

const SatelliteInfo: React.FC<SatelliteInfoProps> = ({ id, name, position }) => {
  const { camera } = useThree();
  const [visible, setVisible] = useState(false);
  
  // Show info panel when satellite is clicked
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(!visible);
  };
  
  // Hide info panel when clicking elsewhere
  useEffect(() => {
    const handleGlobalClick = () => {
      setVisible(false);
    };
    
    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <group position={position}>
      {/* Clickable hotspot */}
      <mesh onClick={handleClick}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      {/* Info panel */}
      {visible && (
        <Html
          position={[0, 0.1, 0]}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '8px',
            borderRadius: '4px',
            color: 'white',
            width: '150px',
            fontSize: '12px',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
          distanceFactor={10}
          occlude
        >
          <div>
            <h3 style={{ margin: '0 0 5px 0' }}>{name}</h3>
            <p style={{ margin: '0' }}>ID: {id}</p>
            <p style={{ margin: '5px 0 0 0' }}>
              Position:<br />
              X: {position[0].toFixed(2)}<br />
              Y: {position[1].toFixed(2)}<br />
              Z: {position[2].toFixed(2)}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
};

export default SatelliteInfo;
