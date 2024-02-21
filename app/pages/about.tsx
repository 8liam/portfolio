import Image from "next/image";
import qut from "../../public/qut.jpg";

import {
  GitOriginal,
  TypescriptOriginal,
  ReactOriginal,
  DockerOriginal,
  Html5PlainWordmark,
  Css3Original,
  TailwindcssPlain,
  NextjsOriginal,
  JavascriptOriginal,
  NodejsPlain,
  FigmaOriginal,
  /* import other icons here */
} from "devicons-react";
export const languagesList = [
  {
    name: "TypeScript",
    icon: (
      <TypescriptOriginal
        className="group-hover:scale-75 duration-300"
        size="50"
      />
    ),
  },
  {
    name: "Next",
    icon: (
      <NextjsOriginal
        className="invert group-hover:scale-75 group-hover:invert-0 duration-300"
        size="50"
      />
    ),
  },
  {
    name: "React",
    icon: (
      <ReactOriginal className="group-hover:scale-75 duration-300" size="50" />
    ),
  },
  {
    name: "React Native",
    icon: (
      <ReactOriginal className="group-hover:scale-75 duration-300" size="50" />
    ),
  },
  {
    name: "Tailwind",
    icon: (
      <TailwindcssPlain
        className="group-hover:scale-75 duration-300"
        size="50"
      />
    ),
  },
  {
    name: "JavaScript",
    icon: (
      <JavascriptOriginal
        className="group-hover:scale-75 duration-300"
        size="50"
      />
    ),
  },
  {
    name: "CSS",
    icon: (
      <Css3Original className="group-hover:scale-75 duration-300" size="50" />
    ),
  },
  {
    name: "HTML",
    icon: (
      <Html5PlainWordmark
        className="group-hover:scale-75 duration-300"
        size="50"
      />
    ),
  },
  {
    name: "Docker",
    icon: (
      <DockerOriginal className="group-hover:scale-75 duration-300" size="50" />
    ),
  },
  {
    name: "Git",
    icon: (
      <GitOriginal className="group-hover:scale-75 duration-300" size="50" />
    ),
  },

  {
    name: "Node",
    icon: (
      <NodejsPlain className="group-hover:scale-75 duration-300" size="50" />
    ),
  },
  {
    name: "Figma",
    icon: (
      <FigmaOriginal className="group-hover:scale-75 duration-300" size="50" />
    ),
  },
];

export default function AboutSection() {
  const languages = languagesList.map((language) => (
    <div
      className="group p-2 flex flex-col items-center justify-center border-2 border-solid border-accent bg-primary text-secondary md:rounded  hover:bg-white hover:text-black hover:border-black ease-in-out duration-300"
      key={language.name}
    >
      <div className="mb-2">{language?.icon}</div>{" "}
      {/* Added mb-2 for spacing between icon and text */}
      <div className="text-md font-medium">{language.name}</div>
    </div>
  ));

  return (
    <section
      id="about"
      className="xl:px-[10vw] lg:px-[2vw] py-[2.5vh] min-h-screen bg-gradient-to-b from-alternateprimary to-primary border-t-white border-t-[0.25px]"
    >
      <div>
        <h1 className="text-5xl font-semibold text-center my-4">About Me</h1>
        <div className="flex items-center justify-center my-4 mx-[10vw]">
          <p className="w-2/3 text-center text-pretty">
            I'm a Brisbane-based software developer, holding a Bachelor's degree
            in Information Technology from QUT. My passion lies in the future of
            web technology. Ready to shape the digital landscape
            post-graduation.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <a
            href="#projects"
            className="lg:w-1/5 sm:w-2/5 mx-auto my-2 text-center p-2 border-2 border-solid border-accent bg-primary text-secondary rounded-full hover:bg-white hover:text-black hover:border-black ease-in-out duration-300"
          >
            Check out My Projects
          </a>
        </div>
      </div>
      <div className="md:py-8 sm:py-8">
        <h1 className="text-5xl font-semibold text-center my-2">
          Technologies{" "}
        </h1>
        <div className="lg:flex items-center justify-center ">
          <div className="sm:max-lg:w-[100vw] grid md:grid-cols-3 gap-2 pt-2 text-center sm:w-[40vw] xl:w-[30vw] 2xl:w-[25vw]  grid-cols-2 select-none my-4">
            {languages}
          </div>
        </div>
      </div>
    </section>
  );
}
