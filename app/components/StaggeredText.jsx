"use client";
import { useEffect, useRef } from "react";
import { gsap } from 'gsap';

export default function StaggeredText({ children, className = "" }) {
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;

        const animatedText = textRef.current;
        const originalText = animatedText.textContent;

        // Clear and split text
        animatedText.innerHTML = '';
        originalText.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            animatedText.appendChild(span);
        });

        const spans = Array.from(animatedText.children);

        // Simple intersection observer approach
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(spans, {
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: "power2.out"
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(animatedText);

        return () => {
            observer.disconnect();
        };
    }, [children]);

    return (
        <span ref={textRef} className={className}>
            {children}
        </span>
    );
} 