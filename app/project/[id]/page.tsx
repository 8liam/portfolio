"use client";
import Image from "next/image";
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";
import * as reactSpring from "@react-spring/three";
import * as drei from "@react-three/drei";
import * as fiber from "@react-three/fiber";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import { languagesList } from "@/app/pages/about";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import { projectsList } from "@/app/pages/portfolio";
import { AuroraBackgroundProvider } from "@nauverse/react-aurora-background";

export default async function ProjectPage({ params }: any) {
  const project = projectsList.find(
    (project) => project.id === parseInt(params.id)
  );
  const projectLanguages = project
    ? languagesList.filter((language) =>
      project.techstack.includes(language.name)
    )
    : [];

  const languageStack = projectLanguages.map((language) => (
    <div className="group p-2 flex flex-col items-center justify-center  text-secondary md:rounded ease-in-out duration-300">
      <div className="mb-2">{language?.icon}</div>{" "}
      {/* Added mb-2 for spacing between icon and text */}
      <div className="text-md font-medium">{language.name}</div>
    </div>
  ));

  if (!project) {
    return <div>Project not found</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">

      <div id="project" className="xl:px-[10vw] lg:px-[2vw]  text-center z-50 w-full h-80vh ">
        <div className="rounded-xl bg-black/50 shadow-xl ring-1 ring-white/10">
          <div className="text-left p-4">
            <p>
              <Link href="/">
                <ArrowBackIosIcon />
              </Link>
            </p>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-semibold text-center">
              {project?.title}
            </h1>
            <div className="justify-center flex py-2">
              <Image
                src={project?.imageUrl ?? "https://liamgrant.com"}
                width={640}
                height={360}
                alt={project?.title ?? "FMLyrics"}
              />
            </div>
            <p className="font-light text-stone-150">{project?.description}</p>

            <h1 className="text-xl font-light text-center">Built With</h1>
            <div
              className="grid grid-cols-3 
                  rounded mx-20"
            >
              {languageStack}
            </div>
          </div>
          <div className="grid grid-cols-2 pb-8 text-white">
            <div className="p-4 ">
              <Link
                href={project?.website ?? "https://liamgrant.com"}
                target="_blank"
                className="bg-purple-400/5  p-4 rounded-xl shadow-xl ring-1 ring-black/10 backdrop-blur-3xl hover:text-black hover:bg-white/100 duration-300"
              >
                <span className="pr-1">
                  <LanguageIcon />
                </span>{" "}
                View Website
              </Link>
            </div>
            <div className="p-4">
              <Link
                href={project?.github ?? "https://github.com/8liam"}
                target="_blank"
                className="bg-purple-400/5 p-4 rounded-xl shadow-xl ring-1 ring-black/10 backdrop-blur-3xl hover:text-black hover:bg-white/100 duration-300"
              >
                <span className="pr-1">
                  <GitHubIcon />
                </span>{" "}
                View on Github
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
