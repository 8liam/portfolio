import Image from "next/image";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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
        className="invert group-hover:scale-75 group-hover:invert duration-300"
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

const copyEmail = () => {
  navigator.clipboard.writeText("liamgrantdev@gmail.com");
};

export default function AboutSection() {
  const languages = languagesList.map((language) => (
    <div
      className="group p-2 flex flex-col items-center justify-center border-2 border-solid border-accent bg-primary text-secondary md:rounded hover:border-white hover:rounded-xl ease-in-out duration-300"
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
      className="xl:px-[20vw] lg:px-[15vw] md:px-[5vw] px-[2vw] min-h-screen  bg-primary border-t-blue-800/25 border-t-[0.25px]"
    >
      <div className="mx-[9vw] space-y-4">
        <h1 className="text-5xl font-semibold text-center my-2 pt-[2.5vh]">
          About Me
        </h1>
        <div className="text-center">
          <div>
            <p className="text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Based in Brisbane, I'm a software engineer committed to developing
              experiences that solve real-world problems. My passions range from
              strategic design and planning to acquiring knowledge in the latest
              technologies.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <a
            href="#projects"
            className="lg:w-1/5 sm:w-2/5 mx-auto text-center p-2 border-2 border-solid border-accent bg-primary text-secondary rounded-3xl hover:border-white  ease-in-out duration-300 hover:rounded-xl"
          >
            View Projects
          </a>
        </div>

        <div className="text-center justify-center">
          <p className="text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            ...and don't be afraid to reach out to my email
          </p>
          <div className="flex items-center justify-center">
            <div className="flex justify-between font-mono p-2 ">
              <a
                className="text-white hover:text-accent duration-300"
                href="mailto:liamgrantdev@gmail.com?subject=Message from your Website."
              >
                liamgrantdev@gmail.com
              </a>
              <p className="ml-2">
                <a className=" hover:text-accent duration-300 hover:cursor-pointer">
                  <ContentCopyIcon fontSize="inherit" onClick={copyEmail} />
                </a>
              </p>
            </div>
          </div>
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
