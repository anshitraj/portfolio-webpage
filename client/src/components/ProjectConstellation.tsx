import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Text, Line, OrbitControls, Sphere } from '@react-three/drei';
import { useLocation } from 'wouter';
import { projects } from '@/content/projects';
import * as THREE from 'three';

function Node({ position, title, slug, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      const scale = hovered ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.2, 32, 32]}
        onClick={(e) => {
          e.stopPropagation();
          onClick(slug);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <meshStandardMaterial 
          color={hovered ? "#00FFFF" : "#8A2BE2"} 
          emissive={hovered ? "#00FFFF" : "#8A2BE2"}
          emissiveIntensity={hovered ? 2 : 0.5}
          toneMapped={false}
        />
      </Sphere>
      <Text
        position={[0, -0.4, 0]}
        fontSize={0.2}
        color={hovered ? "#FFFFFF" : "#AAAAAA"}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
    </group>
  );
}

function Connections({ points }: { points: [number, number, number][] }) {
  // Simple logic to connect nodes
  const lines = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      // Connect if close enough to form a web, for 5 points just connect all or a path
      lines.push(
        <Line 
          key={`${i}-${j}`} 
          points={[points[i], points[j]]} 
          color="#ffffff" 
          opacity={0.1} 
          transparent 
          lineWidth={1} 
        />
      );
    }
  }
  return <>{lines}</>;
}

export default function ProjectConstellation() {
  const [, setLocation] = useLocation();
  const points = projects.map(p => p.position);

  return (
    <div className="w-full h-[600px] glass-panel rounded-2xl overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 text-xs font-mono text-muted-foreground bg-zinc-200/70 dark:bg-black/50 px-2 py-1 rounded border border-zinc-200/80 dark:border-white/10">
        INTERACTIVE_MAP: DRAG TO ROTATE, CLICK TO ACCESS
      </div>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <Connections points={points} />
        
        {projects.map((p) => (
          <Node 
            key={p.slug} 
            position={p.position} 
            title={p.title} 
            slug={p.slug}
            onClick={(slug: string) => setLocation(`/projects/${slug}`)} 
          />
        ))}
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
