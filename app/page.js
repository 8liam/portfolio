"use client";
import ThreeD from "./components/3d";
import Skills from "./components/skills";
import Journey from "./components/journey";
import Footer from "./components/footer";
import Technologies from "./components/technologies";
import Link from "next/link";
import Projects from "./components/projects";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import ScrollBounds from "./components/SmoothScroll";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";

function HomeContent() {
  const { isLoading } = useLoading();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (scrollPosition) => {
    const viewportHeight = window.innerHeight;
    setScrolled(scrollPosition > viewportHeight);
  };

  return (
    <ScrollBounds onScroll={handleScroll} lockScroll={isLoading}>
      <div
        className={`z-50 grid grid-cols-2 w-screen px-4 py-2 fixed transition-all duration-0 ${scrolled ? "bg-white/50 backdrop-blur-md border-b" : ""}`}
      >
        <div className="gap-2 flex font-medium text-sm lg:text-md">
          <span className="hover:tracking-wider duration-300">LIAM</span>
          <span className="pointer-events-none">/</span>
          <Link className="hover:tracking-wider duration-300" href={"#about"}>
            ABOUT
          </Link>
          <span className="pointer-events-none">/</span>
          <Link className="hover:tracking-wider duration-300" href={"#journey"}>
            JOURNEY
          </Link>
          <span className="pointer-events-none">/</span>
          <Link
            className="hover:tracking-wider duration-300"
            href={"#projects"}
          >
            PROJECTS
          </Link>
        </div>
        <div className="text-right text-sm lg:text-md">
          <Link className="hover:tracking-wider duration-300" href={"#contact"}>
            CONTACT
          </Link>
        </div>
      </div>

      <div className="h-[40vh] absolute inset-0 text-center flex flex-col justify-center items-center">
        <h1 className="md:text-7xl text-6xl font-bold font-sans z-10 text-black uppercase tracking-tight">
          Liam Grant
        </h1>
        <span id="software-title" className="z-10 font-pixel-circle font-bold">
          [SOFTWARE ENGINEER - GOLD COAST, AUSTRALIA]
        </span>
      </div>
      <div className="absolute inset-0 text-center flex flex-col items-center justify-end pb-24 h-[100vh] ">
        <div className=" md:hidden z-10 bg-black/1 backdrop-blur-xs rounded-2xl px-6 py-1 text-center flex flex-col items-center justify-center">
          <a href="#about">
            <ArrowDown className="z-10" />
          </a>
        </div>
      </div>
      <ThreeD />
      <Skills />
      <Technologies />
      <Journey />
      <Projects />
      <Footer />
    </ScrollBounds>
  );
}

export default function Home() {
  return (
    <LoadingProvider>
      <HomeContent />
    </LoadingProvider>
  );
}
