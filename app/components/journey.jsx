"use client";
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
    tl.to(target, { opacity: 0, duration: 0.2 })
      .add(() => setActiveExperience(newIndex))
      .fromTo(
        target,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, immediateRender: false },
        "+=0.05",
      )
      .add(() => setIsAnimating(false));
  };

  return (
    <section className="border-[#1C1C21] border-b">
      <h2 className="p-4 text-3xl font-bold border-b font-pixel-circle uppercase">
        <StaggeredText>{journeyData.title}</StaggeredText>
      </h2>

      <div className="bg-white border-[#1C1C21]">
        <div className="flex flex-col md:flex-row">
          {/* Compact Sidebar */}
          <div className="md:w-1/3 md:border-r border-[#1C1C21]">
            {journeyData.experiences.map((experience, index) => (
              <div
                key={experience.id}
                className="p-4 border-b border-[#1C1C21] cursor-pointer transition-colors duration-200 flex items-center gap-3"
                onClick={() => handleExperienceChange(index)}
              >
                <Image
                  src={experience.logo}
                  alt={experience.logoAlt}
                  width={40}
                  height={40}
                  className={`rounded-sm transition-all duration-200 select-none ${
                    activeExperience === index
                      ? "opacity-100 scale-105"
                      : "opacity-60"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-pixel-circle font-semibold text-sm uppercase text-black truncate">
                    {experience.company}
                  </p>
                  <p className="font-pixel-circle text-xs text-black uppercase truncate">
                    {experience.position}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Content Area - Clean Flow */}
          <div className="flex-1 min-h-[400px] flex flex-col">
            {/* Header - Logo, Company, Position, Duration */}
            <div className="grid grid-cols-[auto_1fr] border-b border-[#1C1C21]">
              <div className="border-r border-[#1C1C21] p-4">
                <Image
                  src={currentExperience.logo}
                  alt={currentExperience.logoAlt}
                  width={60}
                  height={60}
                  className="rounded-sm"
                />
              </div>
              <div className="min-w-0 flex-1 p-4">
                <ScrambleText
                  as="h4"
                  className="font-pixel-circle font-semibold text-2xl text-black"
                  text={currentExperience.company}
                />
                <ScrambleText
                  as="h5"
                  className="font-pixel-circle font-semibold text-sm text-black uppercase mt-1"
                  text={currentExperience.position}
                />
              </div>
            </div>
            <div className="p-4 border-b border-[#1C1C21]">
              <ScrambleText
                as="p"
                className="font-pixel-circle font-semibold text-lg text-black uppercase "
                text={currentExperience.duration}
              />
            </div>

            <div ref={contentRef} className="p-4">
              {/* Description - Just text */}
              {currentExperience.description && (
                <p className="font-sans text-black mb-6">
                  {currentExperience.description}
                </p>
              )}

              {/* Points - Clean list */}
              {currentExperience.points &&
                currentExperience.points.length > 0 && (
                  <div>
                    {currentExperience.points.map((point, index) => (
                      <div key={index} className="flex items-start gap-3 mb-2">
                        <span className="font-pixel-circle text-xs text-black font-bold">
                          •
                        </span>
                        <p className="font-sans text-black text-sm">{point}</p>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
