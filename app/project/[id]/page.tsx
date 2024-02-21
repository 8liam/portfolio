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
    <>
      <section className="h-screen flex justify-center  bg-black">
        <ShaderGradientCanvas
          importedfiber={{ ...fiber, ...drei, ...reactSpring }}
          style={{
            position: "absolute",
            top: 0,
            pointerEvents: "none",
            height: "100vh",
          }}
        >
          <ShaderGradient
            control="query"
            urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=0.5&cAzimuthAngle=180&cDistance=3.9&cPolarAngle=115&cameraZoom=1&color1=%230062ff&color2=%23FE8989&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=off&lightType=3d&pixelDensity=1&positionX=-0.5&positionY=0.1&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=235&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=2.4&uTime=0.2&wireframe=false"
          />
        </ShaderGradientCanvas>
        <div className="xl:px-[10vw] lg:px-[2vw]  text-center z-50 w-full h-80vh ">
          <div className="bg-alternateprimary mt-8  rounded-xl backdrop-blur-xl bg-black/0 shadow-xl ring-1 ring-black/10">
            <div className="text-left p-4">
              <p>
                <Link href="/">
                  <ArrowBackIosIcon />
                </Link>
              </p>
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl font-semibold text-center">
                {project.title}
              </h1>
              <div className="justify-center flex py-2">
                <Image
                  src={project.imageUrl}
                  width={640}
                  height={360}
                  alt={project.title}
                />
              </div>
              <p className="font-light text-stone-150">{project.description}</p>

              <h1 className="text-xl font-light text-center">Built With</h1>
              <div
                className="grid grid-cols-3 
              rounded mx-20 shadow-sm"
              >
                {languageStack}
              </div>
            </div>
            <div className="grid grid-cols-2 px-80 pb-8 text-white">
              <div className="p-4 ">
                <Link
                  href={project.website}
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
                  href={project.github}
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
      </section>
    </>
  );
}
