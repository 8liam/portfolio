"use client"
import { useEffect, useRef } from 'react';

export default function ScrollBounds({ children, onScroll, lockScroll = false }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (onScroll) onScroll(container.scrollTop);
        };

        const handleWheel = (e) => {
            if (lockScroll) e.preventDefault();
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('scroll', handleScroll);
            container.removeEventListener('wheel', handleWheel);
        };
    }, [onScroll, lockScroll]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 overflow-y-auto overflow-x-hidden"
            style={{ scrollBehavior: 'smooth' }}
        >
            {children}
        </div>
    );
}
