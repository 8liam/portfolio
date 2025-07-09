"use client"
import Image from "next/image";
import { useState, useRef } from "react";
import languagesData from "../../data/languages.json";

export default function Technologies() {
    
    
    const languages = languagesData.languages;
    const [scrollSpeed, setScrollSpeed] = useState(25); // Default scroll speed in seconds
    const scrollerRef = useRef(null);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (scrollerRef.current) {
            timeoutRef.current = setTimeout(() => {
                scrollerRef.current.classList.add('paused');
            }, 150); // 150ms delay
        }
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (scrollerRef.current) {
            scrollerRef.current.classList.remove('paused');
        }
    };

    
    return (
        <section className="border-[#1C1C21] border-t ">
            <div className="border-b border-[#1C1C21]">
                <h2 className="p-4 text-3xl font-bold  flex items-center gap-2 border-[#1C1C21] ">{languagesData.title}</h2>
            </div>
            <div className="bg-white ">
                <div 
                    className="scroller-container overflow-hidden"
                    // Optionally adjust speed based on number of items or user preference
                    style={{ '--scroll-speed': `${scrollSpeed}s` }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div ref={scrollerRef} className="scroller-inner flex will-change-transform animate-scroll">
                        {languages.map((language, index) => (
                            <div
                                key={index}
                                className={`flex-shrink-0 border-r border-b transition-colors duration-200 `}
                            >   
                                
                                <Image
                                    src={language.logo}
                                    width={250}
                                    height={125}
                                    alt={language.logoAlt}
                                    title={language.name}
                                    loading="lazy"
                                    className={`w-full h-full object-contain hover:scale-105 transition-all duration-300 select-none`}
                                />
                            </div>
                        ))}
                        {/* Duplicate the content for seamless looping */}
                        {languages.map((language, index) => (
                            <div
                                key={`duplicate-${index}`} // Unique key for duplicated items
                                className={`flex-shrink-0 border-r border-b transition-colors duration-200 `}
                                
                            >
                                <Image
                                    src={language.logo}
                                    width={250}
                                    height={125}
                                    alt={language.logoAlt}
                                    title={language.name}
                                    loading="lazy"
                                    className={`w-full h-full object-contain hover:scale-105 transition-all duration-300 select-none`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}