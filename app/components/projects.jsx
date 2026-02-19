"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import projectData from "../../data/projects.json";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StaggeredText from "./StaggeredText";

// Alternating - Side-by-side alternating layout

export default function Projects() {
  const [preloadedImages, setPreloadedImages] = useState({});
  const [hoveredImage, setHoveredImage] = useState(null);

  useEffect(() => {
    const preloadImages = async () => {
      const imageMap = {};
      await Promise.all(
        projectData.projects.map(async (project) => {
          const img = new window.Image();
          img.src = project.image;
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
          imageMap[project.id] = true;
        })
      );
      setPreloadedImages(imageMap);
    };
    preloadImages();
  }, []);

  return (
    <section className="border-[#1C1C21] border-b">
      <h2 className="p-4 text-3xl font-bold border-b font-pixel-circle uppercase">
        <StaggeredText>Projects</StaggeredText>
      </h2>

      <div className="bg-white border-[#1C1C21]">
        {projectData.projects.map((project, index) => (
          <div
            key={project.id}
            className={`grid grid-cols-1 lg:grid-cols-2 ${
              index === projectData.projects.length - 1 ? "" : "border-b border-[#1C1C21]"
            }`}
          >
            {/* Image Side */}
            <div
              className="relative aspect-video lg:aspect-auto lg:h-[400px] p-4 border-b border-[#1C1C21] lg:border-b-0"
              onMouseEnter={() => setHoveredImage(project.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="relative w-full h-full overflow-hidden rounded-sm bg-white">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    hoveredImage === project.id ? "scale-105" : ""
                  }`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {!preloadedImages[project.id] && (
                  <div className="absolute inset-0 bg-white" />
                )}
              </div>
            </div>

            {/* Content Side */}
            <div className="flex flex-col lg:border-l border-[#1C1C21]">
              {/* Logo and Name - same row */}
              <div className="grid grid-cols-[auto_1fr] border-b border-[#1C1C21]">
                <div className="border-r border-[#1C1C21] p-4">
                  <Image
                    src={project.logo}
                    alt={project.logoAlt}
                    width={60}
                    height={60}
                    className="rounded-sm"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-pixel-circle font-semibold text-2xl uppercase text-black">
                    {project.name}
                  </h3>
                  <p className="font-pixel-circle text-sm text-black uppercase mt-1">
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Languages - inline with / separator */}
              <div className="border-b border-[#1C1C21] p-4">
                {project.languages.map((language, i) => (
                  <span key={`${language}-${i}`}>
                    <span className="font-pixel-circle font-semibold text-xl uppercase text-black">
                      {language}
                    </span>
                    {i !== project.languages.length - 1 ? (
                      <span className="font-pixel-circle text-xl uppercase text-black">
                        {" / "}
                      </span>
                    ) : null}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="border-b border-[#1C1C21] p-4 flex-1">
                <p className="font-sans text-black">{project.description}</p>
              </div>

              {/* Links - grid layout */}
              <div
                className={`grid ${
                  project.url && project.githubURL
                    ? "grid-cols-1 lg:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    className={`p-4 border-[#1C1C21] flex flex-row gap-2 font-pixel-circle font-semibold justify-center items-center text-black ${
                      project.url && project.githubURL ? "lg:border-r" : ""
                    }`}
                  >
                    {project.urlTitle}
                    <ArrowUpRight width={20} height={20} />
                  </Link>
                )}
                {project.githubURL && (
                  <Link
                    href={project.githubURL}
                    target="_blank"
                    className="p-4 border-[#1C1C21] flex flex-row gap-2 font-pixel-circle font-semibold justify-center items-center text-black"
                  >
                    {project.githubURLTitle}
                    <ArrowUpRight width={20} height={20} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
