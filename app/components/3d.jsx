"use client"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, AsciiRenderer } from "@react-three/drei"

import { Suspense, useEffect, useRef, useState } from 'react';
import Grid from './3D/grid';
import CanvasLoader from './CanvasLoader';
import { useLoading } from '../contexts/LoadingContext';


function MouseOrbitControls({ mouse }) {
    const controlsRef = useRef();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile device
        setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    useFrame(() => {
        if (!controlsRef.current) return;

        if (isMobile) {
            // Auto-rotate on mobile
            controlsRef.current.autoRotate = true;
            controlsRef.current.autoRotateSpeed = -0.2;
        } else if (mouse.current) {
            // Mouse control on desktop
            controlsRef.current.autoRotate = false;
            const baseAzimuth = 1.6;
            const basePolar = 1.65;
            const maxOffset = 0.3;

            controlsRef.current.setAzimuthalAngle(baseAzimuth + mouse.current.x * maxOffset);
            controlsRef.current.setPolarAngle(basePolar + mouse.current.y * maxOffset);
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={false}
            enableRotate={!isMobile}
            minPolarAngle={1.4}
            maxPolarAngle={1.9}
            minAzimuthAngle={1.3}
            maxAzimuthAngle={1.9}
        />
    );
}

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
    const { isLoading, setIsLoading } = useLoading();
    const [isCanvasReady, setIsCanvasReady] = useState(false);
    const [isAsciiReady, setIsAsciiReady] = useState(false);
    const [textFaded, setTextFaded] = useState(false);
    const [bgFaded, setBgFaded] = useState(false);
    const mouse = useRef({ x: 0, y: 0 });
    const autoRotateAngle = useRef(0);

    useEffect(() => {
        const handleMouseMove = (event) => {
            // Normalize mouse position to [-1, 1] range
            mouse.current = {
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1
            };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);



    useEffect(() => {
        // Delay ASCII renderer initialization to ensure canvas is ready
        const timer = setTimeout(() => {
            setIsCanvasReady(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isAsciiReady) {
            // First fade out the text
            const textTimer = setTimeout(() => {
                setTextFaded(true);
            }, 100);

            // Then show the 3D model
            const modelTimer = setTimeout(() => {
                setIsLoading(false);
            }, 500);

            // Finally fade out the background after model is visible
            const bgTimer = setTimeout(() => {
                setBgFaded(true);
            }, 800);

            return () => {
                clearTimeout(textTimer);
                clearTimeout(modelTimer);
                clearTimeout(bgTimer);
            };
        }
    }, [isAsciiReady]);

    return (
        <div className="w-screen h-screen relative">

            {/* Loading Overlay */}
            <>
                {/* Background - fades last after model is visible */}
                <div className={`absolute inset-0 bg-white z-10 flex items-center justify-center transition-opacity duration-700 ease-out ${bgFaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}>

                </div>

                {/* Text - fades first */}
                <div className={`absolute bottom-0 left-0 right-0 z-10 p-8 transition-opacity duration-500 ease-out ${textFaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}>
                    <p className="text-black uppercase font-bold lg:text-8xl text-4xl text-left">Entering Experience</p>
                </div>
            </>

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
                    <MouseOrbitControls mouse={mouse} />
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