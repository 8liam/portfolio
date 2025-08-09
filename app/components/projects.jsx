"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import projectData from "../../data/projects.json";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StaggeredText from "./StaggeredText";

export default function Projects() {
    const [activeProject, setActiveProject] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const currentProject = projectData.projects[activeProject];

    const handleProjectChange = (newIndex) => {
        if (newIndex === activeProject) return;

        setIsTransitioning(true);

        setTimeout(() => {
            setActiveProject(newIndex);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 50);
        }, 100);
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
                        <div className={`transition-all duration-300 ease-in-out ${isTransitioning
                            ? 'opacity-0 transform translate-y-4'
                            : 'opacity-100 transform translate-y-0'
                            }`}>
                            <div className="grid lg:grid-cols-3 grid-cols-1">
                                <div className="p-4 border-[#1C1C21] lg:border-r border-b lg:border-b-0">
                                    <h4 className="font-sans font-semibold text-2xl uppercase">{currentProject.name}</h4>
                                </div>

                                <div className="p-4 border-[#1C1C21]  lg:col-span-2 self-center">
                                    {currentProject.languages.map((language, index) => (

                                        <span key={index} className="font-mono text-xl uppercase ">{language}{index !== currentProject.languages.length - 1 ? " / " : ""}</span>
                                    ))}



                                </div>
                            </div>
                            <div className="border-[#1C1C21] border-t " >
                                <div className="grid lg:grid-cols-2 grid-cols-1 max-h-[1020px]">
                                    <div className="border-[#1C1C21] lg:border-r overflow-auto order-2 lg:order-1 flex flex-col">
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
                                    <div className="p-4 select-none order-1 lg:order-2">
                                        <Image
                                            src={currentProject.image}
                                            width={1680}
                                            height={1020}
                                            alt={currentProject.imageAlt}
                                            className={`rounded-md transition-all duration-300 ease-in-out ${isTransitioning
                                                ? 'opacity-0 transform translate-y-4'
                                                : 'opacity-100 transofmr translate-y-0'
                                                }`}
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