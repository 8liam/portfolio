"use client";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import { useState, useEffect } from "react";
export const projectsList = [
  {
    id: 1,
    title: "FMLyrics",
    imageUrl: "/projects/fmlyrics.png",
    description:
      "Displays the song lyrics of what you're listening to on Spotify or Soundcloud via the Last.fm API.",
    techstack: ["React", "TypeScript", "Node"],
    website: "https://fmlyrics.netlify.app",
    github: "https://github.com/8liam/fmlyrics",
  },
  {
    id: 2,
    title: "liamgrant.com",
    imageUrl: "/projects/portfolio.png",
    description:
      "A hub to show off my personal projects. You're using it right now!",
    techstack: ["Next", "TypeScript", "Tailwind"],
    website: "https://liamgrant.com",
    github: "https://github.com/8liam/portfolio",
  },
  {
    id: 3,
    title: "Customdle",
    imageUrl: "/projects/customdle.png",
    description: "A Wordle Clone to challenge your friends with custom words!",
    techstack: ["Next", "TypeScript", "Tailwind"],
    website: "https://customdle.vercel.app",
    github: "https://github.com/8liam/custom-wordle",
  },
];

export default function PortfolioSection() {
  const [hydrationLoad, setHydrationLoad] = useState(true);

  useEffect(() => {
    setHydrationLoad(false);
  }, []);
  const projects = projectsList.map((project) => (
    <Link
      key={project.id}
      href={`/project/${project.id}`}
      className="border p-4 rounded-lg bg-alternateprimary hover:bg-white group  duration-300 ease-in-out"
    >
      <h1 className="text-2xl font-semibold group-hover:text-black duration-300">
        {project.title}
      </h1>
      <div className="h-32">
        <p className="text-gray-400 text-center group-hover:text-gray-800 duration-300">
          {project.description}
        </p>
      </div>
      {/*<img src={project.thumbnail} alt={`Thumbnail for ${project.title}`} className="mt-2" />
       */}

      <div className="p-4 ">
        {project.techstack.map((language) => (
          <div
            key={language}
            className="mx-1 bg-alternateprimary text-secondary p-2 text-sm border-2 border-accent rounded-full inline py-2 "
          >
            {language}
          </div>
        ))}
      </div>
    </Link>
  ));
  if (hydrationLoad === false) {
    return (
      <section
        id="projects"
        className="xl:px-[10vw] lg:px-[2vw] justify-center text-center border-t-white border-t-[0.25px]"
      >
        <h1 className="text-5xl font-semibold pt-[5vh] text-center">
          Portfolio
        </h1>

        <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 py-[5vh] gap-4">
          {projects}
        </div>
      </section>
    );
  }
}
