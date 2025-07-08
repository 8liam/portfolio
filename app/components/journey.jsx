"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import journeyData from "../../data/journey.json";

export default function Journey() {
    const [activeExperience, setActiveExperience] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const currentExperience = journeyData.experiences[activeExperience];

    const handleExperienceChange = (newIndex) => {
        if (newIndex === activeExperience) return;

        setIsTransitioning(true);

        setTimeout(() => {
            setActiveExperience(newIndex);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 50);
        }, 150);
    };

    return (
        <section className="border-[#1C1C21] border-t ">
            <h2 className="p-4 text-3xl font-bold border-b">{journeyData.title}</h2>

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
                                    className={`rounded-sm transition-all duration-300 ${activeExperience === index
                                        ? 'opacity-100 scale-105'
                                        : 'opacity-60 hover:opacity-80 hover:scale-105'
                                        }`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="p-4 flex-1 min-h-[400px] flex flex-col overflow-hidden">
                        <div className={`transition-all duration-300 ease-in-out ${isTransitioning
                            ? 'opacity-0 transform translate-y-4'
                            : 'opacity-100 transform translate-y-0'
                            }`}>
                            <div className="mb-2">
                                <h4 className="font-sans font-semibold text-lg">{currentExperience.company}</h4>
                                <h5 className="text-gray-700">{currentExperience.position}</h5>
                                <p className="text-gray-900">{currentExperience.duration}</p>
                            </div>
                            <p className="mb-3">{currentExperience.description}</p>

                            {currentExperience.points && currentExperience.points.length > 0 && (
                                <div className="flex-1">
                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                        {currentExperience.points.map((point, index) => (
                                            <li key={index} className={`transition-all duration-300 ease-in-out ${isTransitioning
                                                ? 'opacity-0 transform translate-x-4'
                                                : 'opacity-100 transform translate-x-0'
                                                }`} style={{ transitionDelay: `${index * 50}ms` }}>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}