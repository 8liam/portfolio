"use client"
import { useEffect, useRef } from 'react';

export default function ScrollBounds({ children, onScroll, lockScroll = false }) {
    const containerRef = useRef(null);
    const maxScrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateMaxScroll = () => {
            maxScrollRef.current = Math.max(0, container.scrollHeight - container.clientHeight);
        };

        const handleScroll = () => {
            const scrollTop = container.scrollTop;

            // Prevent scrolling beyond bounds
            if (scrollTop < 0) {
                container.scrollTop = 0;
                return;
            }

            if (scrollTop > maxScrollRef.current) {
                container.scrollTop = maxScrollRef.current;
                return;
            }

            // Call scroll callback for effects like navigation background
            if (onScroll) {
                onScroll(scrollTop);
            }
        };

        const handleWheel = (e) => {
            // Prevent all scrolling when locked
            if (lockScroll) {
                e.preventDefault();
                return;
            }

            const scrollTop = container.scrollTop;
            const delta = e.deltaY;

            // Prevent scrolling beyond top
            if (scrollTop <= 0 && delta < 0) {
                e.preventDefault();
                return;
            }

            // Prevent scrolling beyond bottom
            if (scrollTop >= maxScrollRef.current && delta > 0) {
                e.preventDefault();
                return;
            }
        };

        // Initialize
        updateMaxScroll();

        // Event listeners
        container.addEventListener('scroll', handleScroll, { passive: true });
        container.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('resize', updateMaxScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
            container.removeEventListener('wheel', handleWheel);
            window.removeEventListener('resize', updateMaxScroll);
        };
    }, [onScroll]);

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