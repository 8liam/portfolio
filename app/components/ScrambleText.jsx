"use client"
import { useEffect, useRef } from "react";

export default function ScrambleText({ text = "", duration = 0.6, as = "span", className = "" }) {
    const elementRef = useRef(null);
    const rafIdRef = useRef(null);
    const previousTextRef = useRef("");

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const from = previousTextRef.current ?? "";
        const to = String(text ?? "");

        if (from === to) {
            element.textContent = to;
            return;
        }

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};:,.<>?";
        const maxLen = Math.max(from.length, to.length);
        const revealThresholds = Array.from({ length: maxLen }, () => Math.random());

        let startTime = 0;

        const step = (time) => {
            if (!startTime) startTime = time;
            const elapsed = (time - startTime) / (duration * 1000);
            const t = Math.min(Math.max(elapsed, 0), 1);

            let output = "";
            for (let i = 0; i < maxLen; i++) {
                const targetChar = to[i] || "";
                if (t >= revealThresholds[i]) {
                    output += targetChar;
                } else {
                    output += characters[(Math.random() * characters.length) | 0];
                }
            }

            element.textContent = output;

            if (t < 1) {
                rafIdRef.current = requestAnimationFrame(step);
            } else {
                element.textContent = to;
                previousTextRef.current = to;
            }
        };

        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(step);

        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
    }, [text, duration]);

    const Tag = as;
    return <Tag ref={elementRef} className={className} aria-label={text}>{text}</Tag>;
}


