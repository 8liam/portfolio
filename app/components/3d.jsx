"use client"
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, AsciiRenderer } from "@react-three/drei"
import { Suspense, useEffect, useRef, useState } from 'react';
import Grid from './3D/grid';
import CanvasLoader from './CanvasLoader';
import { useLoading } from '../contexts/LoadingContext';

function MouseOrbitControls({ mouse }) {
    const controlsRef = useRef();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    useFrame(() => {
        if (!controlsRef.current) return;

        if (isMobile) {
            controlsRef.current.autoRotate = true;
            controlsRef.current.autoRotateSpeed = -0.2;
        } else if (mouse.current) {
            controlsRef.current.autoRotate = false;
            controlsRef.current.setAzimuthalAngle(1.6 + mouse.current.x * 0.3);
            controlsRef.current.setPolarAngle(1.65 + mouse.current.y * 0.3);
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

export default function ThreeD() {
    const { isLoading, setIsLoading } = useLoading();
    const [isCanvasReady, setIsCanvasReady] = useState(false);
    const [textFaded, setTextFaded] = useState(false);
    const [bgFaded, setBgFaded] = useState(false);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setIsCanvasReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isCanvasReady) return;
        const t1 = setTimeout(() => setTextFaded(true), 100);
        const t2 = setTimeout(() => setIsLoading(false), 500);
        const t3 = setTimeout(() => setBgFaded(true), 800);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [isCanvasReady]);

    return (
        <div className="w-screen h-screen relative">
            <div className={`absolute inset-0 bg-white z-10 transition-opacity duration-700 ease-out ${bgFaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />
            <div className={`absolute bottom-0 left-0 right-0 z-10 p-8 transition-opacity duration-500 ease-out ${textFaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <p className="text-black uppercase font-bold lg:text-8xl text-4xl text-left">Entering Experience</p>
            </div>

            <Canvas className="w-full h-full absolute inset-0 select-none">
                <Suspense fallback={<CanvasLoader />}>
                    {isCanvasReady && (
                        <AsciiRenderer
                            characters={".:-+*=%@# "}
                            fgColor={"#000000"}
                            bgColor={"#FFFFFF"}
                            resolution={0.2}
                        />
                    )}
                    <color attach="transparent" args={['transparent']} />
                    <PerspectiveCamera makeDefault position={[-48, 14, 20]} />
                    <group visible={!isLoading}>
                        <Grid
                            scale={0.05}
                            rotation={[(8 * Math.PI) / 180, 0, (64 * Math.PI) / 180]}
                            position={[18, -11, 3]}
                        />
                    </group>
                    <MouseOrbitControls mouse={mouse} />
                    <ambientLight intensity={2} />
                    <directionalLight position={[100, 100, 100]} intensity={0.5} />
                    <directionalLight position={[-100, -100, -100]} intensity={0.5} />
                </Suspense>
            </Canvas>
        </div>
    );
}
