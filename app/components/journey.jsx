"use client"
import Image from "next/image";
import { useState, useRef } from "react";
import journeyData from "../../data/journey.json";
import StaggeredText from "./StaggeredText";
import ScrambleText from "./ScrambleText";
import { gsap } from "gsap";

export default function Journey() {
    const [activeExperience, setActiveExperience] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const currentExperience = journeyData.experiences[activeExperience];
    const contentRef = useRef(null);

    const handleExperienceChange = (newIndex) => {
        if (newIndex === activeExperience || isAnimating) return;
        setIsAnimating(true);

        const target = contentRef.current ? [contentRef.current] : [];
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.to(target, { opacity: 0, duration: 0.3 })
            .add(() => setActiveExperience(newIndex))
            .fromTo(target, { opacity: 0 }, { opacity: 1, duration: 0.35, immediateRender: false }, "+=0.05")
            .add(() => setIsAnimating(false));
    };

    return (
        <section className="border-[#1C1C21] border-b" id="journey">
            <h2 className="p-4 text-3xl font-bold border-b uppercase">
                <StaggeredText>{journeyData.title}</StaggeredText>
            </h2>

            <div className="bg-white  border-[#1C1C21] min-h-[400px]">
                <div className="flex h-full">
                    {/* Navigation Sidebar */}
                    <div className="border-r border-[#1C1C21]">
                        {journeyData.experiences.map((experience, index) => (
                            <div
                                key={experience.id}
                                className={`border-b p-4 cursor-pointer transition-colors duration-200 ${activeExperience === index
                                    ? 'bg-gray-100'
                                    : 'hover:bg-gray-50'
                                    }`}
                                onClick={() => handleExperienceChange(index)}
                            >
                                <Image
                                    src={experience.logo}
                                    width={75}
                                    height={75}
                                    alt={experience.logoAlt}
                                    className={`rounded-sm transition-all duration-300 select-none ${activeExperience === index
                                        ? 'opacity-100 scale-105'
                                        : 'opacity-60 hover:opacity-80 hover:scale-105'
                                        }`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 min-h-[400px] flex flex-col overflow-hidden">
                        <div>
                            <div className="grid grid-cols-12">
                                <div className="lg:col-span-4 col-span-12 p-4 border-[#1C1C21] border-b lg:border-r">
                                    <ScrambleText as="h4" className="font-sans font-semibold text-2xl" text={currentExperience.company} />
                                </div>
                                <div className="lg:col-span-4 col-span-12 p-4 border-[#1C1C21] border-b lg:border-r ">
                                    <ScrambleText as="h5" className="font-sans font-semibold text-2xl uppercase lg:text-center" text={currentExperience.position} />
                                </div>
                                <div className="lg:col-span-4 col-span-12 p-4 border-[#1C1C21] border-b ">
                                    <ScrambleText as="p" className="font-sans font-normal text-2xl lg:text-right uppercase" text={currentExperience.duration} />
                                </div>
                            </div>
                            <div ref={contentRef}>
                                {currentExperience.description && (
                                    <p className="p-4">{currentExperience.description}</p>
                                )}

                                {currentExperience.points && currentExperience.points.length > 0 && (
                                    <div className="flex-1 p-4">
                                        <div className="space-y-1 px-4 ">
                                            {currentExperience.points.map((point, index) => (
                                                <p key={index} className={`before:content-['-'] before:inline-block before:w-[1em] before:-ml-[1em] before:text-gray-500 before:mr-1`}>
                                                    {point}
                                                </p>
                                            ))}

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}