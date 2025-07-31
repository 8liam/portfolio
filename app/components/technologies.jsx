"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import languagesData from "../../data/languages.json"; // Adjust path as needed

export default function Technologies() {
    const languages = languagesData.languages;
    // Keeping scroll speed fixed is often fine for a consistent set of items.
    const [scrollSpeed, setScrollSpeed] = useState(25); // Default scroll speed in seconds
    const scrollerRef = useRef(null);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (scrollerRef.current) {
            timeoutRef.current = setTimeout(() => {
                scrollerRef.current.classList.add("paused");
            }, 150); // 150ms delay before pausing for smoother UX
        }
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (scrollerRef.current) {
            scrollerRef.current.classList.remove("paused");
        }
    };

    return (
        <section className="border-[#1C1C21] border-t">
            <div className="border-b border-[#1C1C21]">
                <h2 className="p-4 text-3xl font-bold flex items-center gap-2 border-[#1C1C21] uppercase">
                    {languagesData.title}
                </h2>
            </div>
            <div className="bg-white">
                <div
                    className="scroller-container overflow-hidden"
                    style={{ "--scroll-speed": `${scrollSpeed}s` }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                // Consider an aria-label if this scrolling section provides
                // unique navigation or is a core interactive element.
                // E.g., aria-label="Scrolling list of technologies"
                >
                    {/*
                        The 'scroller-inner' class and 'will-change-transform'
                        should be applied to the UL to maintain semantic structure
                        and animation performance.
                    */}
                    <ul
                        ref={scrollerRef}
                        className="scroller-inner flex will-change-transform animate-scroll list-none p-0 m-0"
                    >
                        {/* Original content */}
                        {languages.map((language, index) => (
                            <li
                                key={index}
                                className="flex-shrink-0 border-r border-b transition-colors duration-200 w-[250px]" // Explicit width for consistent item size
                            >
                                <Image
                                    src={language.logo}
                                    width={250}
                                    height={125}
                                    alt={language.logoAlt}
                                    title={language.name}
                                    loading="lazy"
                                    className="w-full h-full object-contain hover:scale-105 transition-all duration-300 select-none grayscale-0 hover:grayscale-100"
                                />
                            </li>
                        ))}
                        {/* Duplicate content for seamless looping */}
                        {languages.map((language, index) => (
                            <li
                                key={`duplicate-${index}`} // Unique key for duplicated items
                                className="flex-shrink-0 border-r border-b transition-colors duration-200 w-[250px]" // Explicit width
                                aria-hidden="true" // Hide from screen readers
                            >
                                <Image
                                    src={language.logo}
                                    width={250}
                                    height={125}
                                    alt={language.logoAlt}
                                    title={language.name}
                                    loading="lazy"
                                    className="w-full h-full object-contain hover:scale-105 transition-all duration-300 select-none"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}