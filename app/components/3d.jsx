"use client"
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Sparkles, Lightformer, AsciiRenderer } from "@react-three/drei"
import { Environment } from "@react-three/drei";

import { Suspense, useEffect, useRef, useState } from 'react';
import Case from './3D/case';
import CanvasLoader from './CanvasLoader';
import { Leva, useControls } from 'leva';
import { useMediaQuery } from 'react-responsive';

function SafeAsciiRenderer({ characters, fgColor, bgColor, resolution, onReady }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
            if (onReady) onReady();
        }, 1000);
        return () => clearTimeout(timer);
    }, [onReady]);

    if (!mounted) return null;

    try {
        return (
            <AsciiRenderer
                characters={characters}
                fgColor={fgColor}
                bgColor={bgColor}
                resolution={resolution}
            />
        );
    } catch (error) {
        console.warn('AsciiRenderer failed to initialize:', error);
        if (onReady) onReady();
        return null;
    }
}

function SpinningCase(props) {
    const ref = useRef();
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.01; // Adjust speed as desired
        }
    });
    return (
        <group ref={ref} {...props}>
            <Case {...props} />
        </group>
    );
}

function RotatingCube() {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01
            meshRef.current.rotation.x += 0.01
        }
    })
    return (
        <mesh ref={meshRef}>
            <cylinderGeometry args={[1, 1, 1]} />
            <meshLambertMaterial color="#468585" emissive="#468585" />

            <Sparkles count={100} scale={1} size={6} speed={0.002} noise={0.2} color="orange" />
        </mesh>
    )
}
export default function ThreeD() {
    const [isCanvasReady, setIsCanvasReady] = useState(false);
    const [isAsciiReady, setIsAsciiReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const controls = useControls('3D Scene', {
        // ASCII Renderer
        asciiResolution: { value: 0.2, min: 0.05, max: 1, step: 0.05 },
        asciiCharacters: { value: ".:-+*=%@# " },
        asciiFgColor: { value: "black" },
        asciiBgColor: { value: "white" },

        // Camera
        cameraX: { value: 0, min: -200, max: 200 },
        cameraY: { value: -50, min: -200, max: 200 },
        cameraZ: { value: 0, min: -200, max: 200 },

        // Case
        caseScale: { value: 0.1, min: 0.01, max: 5, step: 0.01 },
        casePositionX: { value: 0, min: -50, max: 50 },
        casePositionY: { value: -10, min: -50, max: 50 },
        casePositionZ: { value: -100, min: -200, max: 200 },
        caseRotationX: { value: 0, min: 0, max: 360, step: 1 },
        caseRotationY: { value: 0, min: 0, max: 360, step: 1 },
        caseRotationZ: { value: 200, min: 0, max: 360, step: 1 },

        // Orbit Controls
        enableAutoRotate: { value: true },
        autoRotateSpeed: { value: 2, min: -10, max: 10, step: 0.1 },
        minPolarAngle: { value: Math.PI / 2.5, min: 0, max: Math.PI, step: 0.1 },
        maxPolarAngle: { value: Math.PI / 2.5, min: 0, max: Math.PI, step: 0.1 },
        minAzimuthAngle: { value: Math.PI / 2.5, min: 0, max: Math.PI, step: 0.1 },
        maxAzimuthAngle: { value: Math.PI / 2.5, min: 0, max: Math.PI, step: 0.1 },

        // Lighting
        ambientIntensity: { value: 2, min: 0, max: 10, step: 0.1 },
        directionalIntensity: { value: 0.5, min: 0, max: 5, step: 0.1 },
    });

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })

    useEffect(() => {
        // Delay ASCII renderer initialization to ensure canvas is ready
        const timer = setTimeout(() => {
            setIsCanvasReady(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isAsciiReady) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 0); // Small delay for smooth transition
            return () => clearTimeout(timer);
        }
    }, [isAsciiReady]);

    return (
        <div className="w-screen h-screen relative">
            <Leva />

            {/* Loading Overlay */}
            {isLoading && (
                <div className={`absolute inset-0 bg-white z-10 flex items-center justify-center transition-opacity duration-200 ${isAsciiReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}>
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600 font-medium">Entering Experience</p>
                    </div>
                </div>
            )}

            <Canvas className="w-full h-full absolute inset-0 select-none">
                <Suspense fallback={<CanvasLoader />}>
                    {isCanvasReady && (
                        <SafeAsciiRenderer
                            characters={controls.asciiCharacters}
                            fgColor="#838383"
                            bgColor={controls.asciiBgColor}
                            resolution={Math.max(0.05, Math.min(1, controls.asciiResolution))}
                            onReady={() => setIsAsciiReady(true)}
                        />
                    )}

                    <color attach="transparent" args={['transparent']} />

                    <PerspectiveCamera
                        makeDefault
                        position={[-48, 14, 20]}
                    />

                    {/* Hide original model while loading */}
                    <group visible={!isLoading}>
                        <Case
                            scale={0.05}
                            rotation={[
                                (8 * Math.PI) / 180,
                                (0 * Math.PI) / 180,
                                (64 * Math.PI) / 180
                            ]}
                            position={[13, 0, -12]}
                        />
                    </group>
                    <OrbitControls
                        enablePan={true}
                        enableZoom={false}
                        enableRotate={true}
                        autoRotate={true}
                        autoRotateSpeed={-0.2}
                        minPolarAngle={1.4}
                        maxPolarAngle={1.9}
                        minAzimuthAngle={1.3}
                        maxAzimuthAngle={1.9}
                    />
                    <ambientLight intensity={controls.ambientIntensity} />

                    {/* 6 Axes */}
                    <directionalLight position={[0, 0, 100]} intensity={controls.directionalIntensity} />
                    <directionalLight position={[0, 0, -100]} intensity={controls.directionalIntensity} />
                    <directionalLight position={[0, 100, 0]} intensity={controls.directionalIntensity} />
                    <directionalLight position={[0, -100, 0]} intensity={controls.directionalIntensity} />
                    <directionalLight position={[100, 0, 0]} intensity={controls.directionalIntensity} />
                    <directionalLight position={[-100, 0, 0]} intensity={controls.directionalIntensity} />
                    {/* 8 Diagonals */}
                    <directionalLight position={[100, 100, 100]} intensity={controls.directionalIntensity} />
                    <directionalLight position={[-100, 100, 100]} intensity={controls.directionalIntensity} />
                    <directionalLight position={[100, -100, 100]} intensity={controls.directionalIntensity} />
                    <directionalLight position={[-100, -100, 100]} intensity={controls.directionalIntensity} />
                    <directionalLight position={[100, 100, -100]} intensity={controls.directionalIntensity} />
                    <directionalLight position={[-100, 100, -100]} intensity={controls.directionalIntensity} />
                    <directionalLight position={[100, -100, -100]} intensity={controls.directionalIntensity} />
                    <directionalLight position={[-100, -100, -100]} intensity={controls.directionalIntensity} />

                </Suspense>

            </Canvas>
        </div>
    )
}