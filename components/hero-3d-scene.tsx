"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei"
import { useRef, Suspense, useMemo } from "react"
import type { Mesh, Group } from "three"
import * as THREE from "three"

function AnimatedLeaf({ position, rotation, scale, color, speed = 1 }: { 
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  color: string
  speed?: number
}) {
  const meshRef = useRef<Mesh>(null)
  const initialY = position[1]
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.2
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.4) * 0.15
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * speed) * 0.3
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale || 1}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.4}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          metalness={0.1}
          roughness={0.3}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

function GlowOrb({ position, scale, color, pulseSpeed = 1 }: { 
  position: [number, number, number]
  scale: number
  color: string
  pulseSpeed?: number
}) {
  const meshRef = useRef<Mesh>(null)
  const initialScale = scale

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.5
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.3) * 0.2
      const pulse = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.1
      meshRef.current.scale.setScalar(initialScale * pulse)
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        envMapIntensity={0.6}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.2}
        roughness={0.1}
        distort={0.3}
        speed={1.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

function TorusKnot({ position, scale, color }: {
  position: [number, number, number]
  scale: number
  color: string
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.3}
          speed={1}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  )
}

function Particles({ count = 100 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02
      const positions = mesh.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.002
      }
      mesh.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#70b62b"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingRing({ position, scale, color }: {
  position: [number, number, number]
  scale: number
  color: string
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  )
}

function LeafCluster() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main decorative orbs */}
      <GlowOrb position={[3, 0, -2]} scale={0.8} color="#70b62b" pulseSpeed={1.2} />
      <GlowOrb position={[-3.5, 1, -1]} scale={0.6} color="#066532" pulseSpeed={0.8} />
      <GlowOrb position={[2, -2, -3]} scale={0.5} color="#254633" pulseSpeed={1} />
      
      {/* Decorative torus knot */}
      <TorusKnot position={[-2, -1, -4]} scale={0.3} color="#70b62b" />
      
      {/* Floating rings */}
      <FloatingRing position={[4, 1, -3]} scale={0.5} color="#70b62b" />
      <FloatingRing position={[-4, -1.5, -2.5]} scale={0.4} color="#066532" />
      
      {/* Scattered leaves */}
      <AnimatedLeaf position={[4, 2, -1]} color="#70b62b" speed={1.2} scale={0.8} />
      <AnimatedLeaf position={[-4, -1, -2]} color="#066532" speed={0.8} scale={0.6} />
      <AnimatedLeaf position={[1, 3, -2]} color="#70b62b" speed={1} scale={0.5} />
      <AnimatedLeaf position={[-2, 2.5, -1]} color="#254633" speed={1.1} scale={0.7} />
      <AnimatedLeaf position={[3, -2.5, -1.5]} color="#066532" speed={0.9} scale={0.4} />
      <AnimatedLeaf position={[-3, -2, -2.5]} color="#70b62b" speed={1.3} scale={0.55} />
      <AnimatedLeaf position={[0, -3, -1]} color="#254633" speed={0.7} scale={0.45} />
      <AnimatedLeaf position={[5, 0.5, -2]} color="#70b62b" speed={1.1} scale={0.35} />
      <AnimatedLeaf position={[-5, 1, -1.5]} color="#066532" speed={0.85} scale={0.5} />
      <AnimatedLeaf position={[2, 1.5, -0.5]} color="#254633" speed={0.95} scale={0.4} />
      <AnimatedLeaf position={[-1, -1.5, -1]} color="#70b62b" speed={1.15} scale={0.5} />
    </group>
  )
}

function Scene() {
  return (
    <>
      <Environment preset="forest" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#f8f0da" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#70b62b" />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#066532" />
      
      <LeafCluster />
      <Particles count={150} />
    </>
  )
}

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
