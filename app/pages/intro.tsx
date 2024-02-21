"use client";
import NearMeIcon from "@mui/icons-material/NearMe";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SouthIcon from "@mui/icons-material/South";
import Image from "next/image";
import React from "react";
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";

export default function IntroSection() {
  return (
    <section
      className="h-screen flex justify-center text-center"
      style={{
        backdropFilter: "blur(20px)",
        transition: "backdrop-filter 1.5s",
      }}
    >
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          top: 0,
          pointerEvents: "none",
          height: "100vh",
        }}
      >
        <ShaderGradient
          control="query"
          urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=0.8&cAzimuthAngle=0&cDistance=3.6&cPolarAngle=115&cameraZoom=1&color1=%235606FF&color2=%23020031&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=on&lightType=3d&pixelDensity=1&positionX=-0.5&positionY=0.1&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=235&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.1&uFrequency=5.5&uSpeed=0.3&uStrength=2.5&uTime=0.2&wireframe=false"
        />
      </ShaderGradientCanvas>
      <div className="py-[40vh] z-50">
        <h1 className="text-secondary text-5xl font-semibold animate-gradient">
          Liam Grant
        </h1>
        <h2 className="text-secondary text-2xl font-light">
          Aspiring <span className="text-2xl font-bold">Full Stack</span>{" "}
          Developer
        </h2>
        <h2 className="text-xl">
          <NearMeIcon fontSize="small" className="animate-pulse" /> Brisbane,
          Australia
        </h2>
        <div className="my-2 py-2 text-white backdrop-blur-md bg-blue-800/0 rounded-full shadow-xl ring-1 ring-black/10 w-[50%] flex justify-center items-center mx-auto">
          <a
            href="https://www.linkedin.com/in/liamgrant1903/"
            target="_blank"
            className="mx-2 hover:text-accent duration-300"
          >
            <LinkedInIcon fontSize="large" />
          </a>
          <a
            href="https://www.github.com/8liam/"
            target="_blank"
            className="mx-2 hover:text-accent duration-300"
          >
            <GitHubIcon fontSize="large" />
          </a>
        </div>
        <div className="mt-40">
          <a href="#about">
            <SouthIcon
              className="text-white animate-bounce hover:text-accent duration-300"
              fontSize="medium"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
