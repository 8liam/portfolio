"use client"
import Image from "next/image";
import { useState, useRef } from "react";
import projectData from "../../data/projects.json";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StaggeredText from "./StaggeredText";
import ScrambleText from "./ScrambleText";
import { gsap } from "gsap";

export default function Projects() {
    const [activeProject, setActiveProject] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const currentProject = projectData.projects[activeProject];

    const topRef = useRef(null);    // title + technologies row
    const leftRef = useRef(null);   // description/features/links column
    const rightRef = useRef(null);  // image column

    const handleProjectChange = (newIndex) => {
        if (newIndex === activeProject || isAnimating) return;
        setIsAnimating(true);

        const items = [leftRef.current, rightRef.current].filter(Boolean);

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.to(items, { opacity: 0, duration: 0.35, stagger: 0.06 })
            .add(() => setActiveProject(newIndex))
            .fromTo(items, { opacity: 0 }, { opacity: 1, duration: 0.35, stagger: 0.06, immediateRender: false }, "+=0.05")
            .add(() => setIsAnimating(false));
    };

    return (
        <section className="border-[#1C1C21] border-b" id="projects">
            <h2 className="p-4 text-3xl font-bold border-b uppercase">
                <StaggeredText>{projectData.title}</StaggeredText>
            </h2>

            <div className="bg-white  border-[#1C1C21] min-h-[400px]">
                <div className="flex h-full">
                    {/* Navigation Sidebar */}
                    <div className="border-r border-[#1C1C21]">
                        {projectData.projects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`border-b p-4 cursor-pointer transition-colors duration-200 ${activeProject === index
                                    ? 'bg-gray-100'
                                    : 'hover:bg-gray-50'
                                    }`}
                                onClick={() => handleProjectChange(index)}
                            >
                                <Image
                                    src={project.logo}
                                    width={75}
                                    height={75}
                                    alt={project.logoAlt}
                                    className={`rounded-sm transition-all duration-300 select-none ${activeProject === index
                                        ? 'opacity-100 scale-105'
                                        : 'opacity-60 hover:opacity-80 hover:scale-105'
                                        }`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className=" flex-1 min-h-[400px] flex flex-col overflow-hidden">
                        <div>
                            <div ref={topRef} className="grid lg:grid-cols-3 grid-cols-1">
                                <div className="p-4 border-[#1C1C21] lg:border-r border-b lg:border-b-0">
                                    <ScrambleText as="h4" className="font-sans font-semibold text-2xl uppercase" text={currentProject.name} />
                                </div>

                                <div className="p-4 border-[#1C1C21]  lg:col-span-2 self-center">
                                    {currentProject.languages.map((language, index) => (
                                        <span key={`${language}-${index}`}>
                                            <ScrambleText className="font-mono text-xl uppercase " text={language} />
                                            {index !== currentProject.languages.length - 1 ? <span className="font-mono text-xl uppercase "> {" / "} </span> : null}
                                        </span>
                                    ))}



                                </div>
                            </div>
                            <div className="border-[#1C1C21] border-t " >
                                <div className="grid lg:grid-cols-2 grid-cols-1 max-h-[1020px]">
                                    <div ref={leftRef} className="border-[#1C1C21] lg:border-r overflow-auto order-2 lg:order-1 flex flex-col">
                                        <div className="flex-1">
                                            <p className="p-4">{currentProject.description}</p>

                                            {currentProject.features && currentProject.features.length > 0 && (
                                                <div className="">
                                                    <p className="text-xl font-normal p-4 border-[#1C1C21] border-t">Features</p>
                                                    <div className="grid-cols-1 lg:grid-cols-2 grid border-[#1C1C21] border-b">
                                                        {currentProject.features.map((feature, index) => (
                                                            <div key={index} className={`p-4 border-[#1C1C21] border-t ${index % 2 == 0 ? 'border-r' : ''} ${currentProject.features.length % 2 !== 0 && index === currentProject.features.length - 2 ? 'border-b' : ''}`}>{feature}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 border-[#1C1C21]  text-center mt-auto">
                                            {currentProject.url && (
                                                <Link href={currentProject.url} target="_blank">
                                                    <div className="p-4 border-[#1C1C21] border-t lg:border-r  lg:border-b-0 flex flex-row gap-2 justify-center items-center">
                                                        {currentProject.urlTitle} <ArrowUpRight width={20} height={20} />
                                                    </div>
                                                </Link>
                                            )}
                                            {currentProject.githubURL && (
                                                <Link href={currentProject.githubURL} target="_blank">
                                                    <div className="p-4 border-[#1C1C21] border-t  flex flex-row gap-2 justify-center items-center">
                                                        {currentProject.githubURLTitle} <ArrowUpRight width={20} height={20} />
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    <div ref={rightRef} className="p-4 select-none order-1 lg:order-2">
                                        <Image
                                            src={currentProject.image}
                                            width={1680}
                                            height={1020}
                                            alt={currentProject.imageAlt}
                                            className={`rounded-md`}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}