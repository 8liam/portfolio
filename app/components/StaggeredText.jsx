"use client";
import { useEffect, useRef } from "react";

export default function StaggeredText({ children, className = "" }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        const spans = Array.from(ref.current.children);
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                spans.forEach((span, i) => {
                    span.style.transitionDelay = `${i * 0.08}s`;
                    span.style.opacity = "1";
                });
                observer.disconnect();
            },
            { threshold: 0.5 }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <span ref={ref} className={className}>
            {String(children).split("").map((char, i) => (
                <span key={i} style={{ opacity: 0, display: "inline-block", transition: "opacity 0.6s ease" }}>
                    {char === " " ? " " : char}
                </span>
            ))}
        </span>
    );
}
