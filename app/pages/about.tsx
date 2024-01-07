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

export default function AboutSection() {
  const languagesList = [
    {
      name: "TypeScript",
      icon: <TypescriptOriginal size="50" />,
    },
    {
      name: "Next.js",
      icon: (
        <NextjsOriginal
          className="invert group-hover:invert-0 duration-300"
          size="50"
        />
      ),
    },
    {
      name: "React",
      icon: <ReactOriginal size="50" />,
    },
    {
      name: "React Native",
      icon: <ReactOriginal size="50" />,
    },
    {
      name: "Tailwind",
      icon: <TailwindcssPlain size="50" />,
    },
    {
      name: "JavaScript",
      icon: <JavascriptOriginal size="50" />,
    },
    {
      name: "CSS",
      icon: <Css3Original size="50" />,
    },
    {
      name: "HTML",
      icon: <Html5PlainWordmark size="50" />,
    },
    {
      name: "Docker",
      icon: <DockerOriginal size="50" />,
    },
    {
      name: "Git",
      icon: <GitOriginal size="50" />,
    },

    {
      name: "Node",
      icon: <NodejsPlain size="50" />,
    },
    {
      name: "Figma",
      icon: <FigmaOriginal size="50" />,
    },
  ];
  const languages = languagesList.map((language) => (
    <div className="group p-2 flex flex-col items-center justify-center border-2 border-solid border-accent bg-primary text-secondary md:rounded  hover:bg-white hover:text-black hover:border-black ease-in-out duration-300">
      <div className="mb-2">{language?.icon}</div>{" "}
      {/* Added mb-2 for spacing between icon and text */}
      <div className="text-md font-medium">{language.name}</div>
    </div>
  ));

  return (
    <section
      id="about"
      className="xl:px-[10vw] lg:px-[2vw] py-[2.5vh] min-h-screen   bg-gradient-to-b from-alternateprimary to-primary border-t-white border-t-[0.25px]"
    >
      <div>
        <h1 className="text-3xl font-semibold text-center">About Me</h1>
        <p>
          I'm a software developer based in Brisbane, Australia who recently
          graduated from QUT with a Bachelor of Information Technology. I have a
          passionate interest in the future of web technology. I am currently
          working on my own projects.
        </p>
        <a href="#projects">
          <div className="lg:w-1/5 sm:w-2/5 mx-auto my-4 text-center p-2 border-2 border-solid border-accent bg-primary text-secondary rounded-full hover:bg-white hover:text-black hover:border-black ease-in-out duration-300">
            Check out My Projects
          </div>
        </a>
      </div>
      <div className="md:py-8 sm:py-8">
        <h1 className="text-3xl font-semibold text-center">
          Some Tech I Have Been Working With
        </h1>
        <div className="lg:flex items-center justify-center">
          <div className="sm:max-lg:w-[100vw] grid md:grid-cols-3 gap-2 pt-2 text-center sm:w-[40vw] xl:w-[30vw] 2xl:w-[20vw]  grid-cols-2 ">
            {languages}
          </div>
        </div>
      </div>
    </section>
  );
}
