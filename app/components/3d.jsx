"use client"
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, AsciiRenderer } from "@react-three/drei"

import { Suspense, useEffect, useRef, useState } from 'react';
import Grid from './3D/grid';
import CanvasLoader from './CanvasLoader';


function SafeAsciiRenderer({ characters, fgColor, bgColor, resolution, onReady }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Original code had a 1000ms timeout here. Removed for faster loading.
        setMounted(true);
        if (onReady) onReady();
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
export default function ThreeD() {
    const [isCanvasReady, setIsCanvasReady] = useState(false);
    const [isAsciiReady, setIsAsciiReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    

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
                            characters={".:-+*=%@# "}
                            fgColor={"#000000"}
                            bgColor={"#FFFFFF"}
                            resolution={Math.max(0.05, Math.min(1, 0.2))}
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
                        <Grid
                            scale={0.05}
                            rotation={[
                                (8 * Math.PI) / 180,
                                (0 * Math.PI) / 180,
                                (64 * Math.PI) / 180
                            ]}
                            position={[18, -11, 3]}
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
                    <ambientLight intensity={2} />

                    {/* 6 Axes */}
                    <directionalLight position={[0, 0, 100]} intensity={0.5} />
                    <directionalLight position={[0, 0, -100]} intensity={0.5} />
                    <directionalLight position={[0, 100, 0]} intensity={0.5} />
                    <directionalLight position={[0, -100, 0]} intensity={0.5} />
                    <directionalLight position={[100, 0, 0]} intensity={0.5} />
                    <directionalLight position={[-100, 0, 0]} intensity={0.5} />
                    {/* 8 Diagonals */}
                    <directionalLight position={[100, 100, 100]} intensity={0.5} />
                    <directionalLight position={[-100, 100, 100]} intensity={0.5} />
                    <directionalLight position={[100, -100, 100]} intensity={0.5} />
                    <directionalLight position={[-100, -100, 100]} intensity={0.5} />
                    <directionalLight position={[100, 100, -100]} intensity={0.5} />
                    <directionalLight position={[-100, 100, -100]} intensity={0.5} />
                    <directionalLight position={[100, -100, -100]} intensity={0.5} />
                    <directionalLight position={[-100, -100, -100]} intensity={0.5} />

                </Suspense>

            </Canvas>
        </div>
    )
}