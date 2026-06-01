"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, ContactShadows, RoundedBox, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------
   PLACEHOLDER ROBOT
   Procedurally built from primitives so the hero is alive before the
   real GLB lands. Drop `public/assets/models/hero-robot.glb` and swap
   <PlaceholderRobot/> for a <Gltf/> — lighting & rig stay identical.
------------------------------------------------------------------- */

function PlaceholderRobot() {
  const group = useRef<THREE.Group>(null);
  const visor = useRef<THREE.MeshStandardMaterial>(null);
  const pointer = useThree((s) => s.pointer);

  // Materials created once — not every render/frame.
  const body = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e9edff",
        metalness: 0.65,
        roughness: 0.3,
      }),
    []
  );
  const dark = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0c1226",
        metalness: 0.6,
        roughness: 0.35,
      }),
    []
  );

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    // Mouse parallax — head tracks the cursor subtly.
    g.rotation.y += (pointer.x * 0.5 - g.rotation.y) * 0.06;
    g.rotation.x += (-pointer.y * 0.25 - g.rotation.x) * 0.06;
    if (visor.current) {
      const pulse = (Math.sin(state.clock.elapsedTime * 2) + 1) / 2;
      visor.current.emissiveIntensity = 1.6 + pulse * 1.4;
    }
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* Head */}
      <RoundedBox args={[1.7, 1.35, 1.5]} radius={0.28} smoothness={6} position={[0, 1.1, 0]} material={body} castShadow />
      {/* Visor */}
      <RoundedBox args={[1.45, 0.5, 0.2]} radius={0.18} smoothness={6} position={[0, 1.15, 0.72]}>
        <meshStandardMaterial
          ref={visor}
          color="#2f6bff"
          emissive="#2f6bff"
          emissiveIntensity={2}
          metalness={0.4}
          roughness={0.15}
          toneMapped={false}
        />
      </RoundedBox>
      {/* Antenna */}
      <mesh position={[0, 2, 0]} material={dark}>
        <cylinderGeometry args={[0.035, 0.035, 0.5, 16]} />
      </mesh>
      <mesh position={[0, 2.28, 0]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color="#ff5100" emissive="#ff5100" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.35, 0]} material={dark}>
        <cylinderGeometry args={[0.35, 0.4, 0.4, 24]} />
      </mesh>
      {/* Torso */}
      <RoundedBox args={[2.1, 1.3, 1.3]} radius={0.25} smoothness={6} position={[0, -0.55, 0]} material={body} castShadow />
      {/* Chest core */}
      <mesh position={[0, -0.45, 0.7]}>
        <torusGeometry args={[0.26, 0.07, 20, 40]} />
        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={2.2} toneMapped={false} />
      </mesh>
      {/* Shoulders */}
      {[-1.25, 1.25].map((x) => (
        <mesh key={x} position={[x, -0.35, 0]} material={dark}>
          <sphereGeometry args={[0.32, 24, 24]} />
        </mesh>
      ))}
    </group>
  );
}

function Rig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x += (Math.sin(t * 0.15) * 0.4 - state.camera.position.x) * 0.02;
    state.camera.lookAt(0, 0.2, 0);
  });
  return null;
}

/** Local studio environment for reflections — NO network fetch. */
function StudioEnv() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#05060c"]} />
      <Lightformer intensity={2} position={[0, 4, 2]} scale={[6, 6, 1]} color="#ffffff" />
      <Lightformer intensity={3} position={[-5, 1, 1]} scale={[3, 6, 1]} color="#2f6bff" />
      <Lightformer intensity={2.4} position={[5, -1, 1]} scale={[3, 4, 1]} color="#ff5100" />
      <Lightformer intensity={1.6} position={[0, 2, -5]} scale={[5, 5, 1]} color="#facc15" />
    </Environment>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#05060c"]} />
      <fog attach="fog" args={["#05060c", 7, 18]} />

      <ambientLight intensity={0.5} />
      <spotLight position={[5, 8, 5]} angle={0.4} penumbra={1} intensity={120} color="#ffffff" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-6, 2, 2]} intensity={90} color="#2f6bff" />
      <pointLight position={[6, -1, 4]} intensity={55} color="#ff5100" />
      <pointLight position={[0, 4, -6]} intensity={45} color="#facc15" />

      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <PlaceholderRobot />
      </Float>

      <ContactShadows position={[0, -2.1, 0]} opacity={0.5} scale={12} blur={2.4} far={4} color="#000814" />
      <StudioEnv />
      <Rig />
    </>
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 7], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.1;
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
