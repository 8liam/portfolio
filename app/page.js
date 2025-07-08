import ThreeD from "./components/3d";
import Skills from "./components/skills";
import Journey from "./components/journey";
import Footer from "./components/footer";
import Technologies from "./components/technologies";

export default function Home() {
  return (
    <>

      <div className="grid grid-cols-2 w-screen px-4 pt-2  fixed z-10 ">
        <div className="gap-2 flex font-medium">
          <span className="hover:tracking-wider duration-300">LIAM</span>
          <span className="pointer-events-none">/</span>
          <span className="hover:tracking-wider duration-300">ABOUT</span>
          <span className="pointer-events-none">/</span>
          <span className="hover:tracking-wider duration-300">JOURNEY</span>
        </div>
        <div className="text-right">
          <span className="hover:tracking-wider duration-300">CONTACT</span>
        </div>
      </div>

      <div className="h-[40vh] absolute inset-0 text-center flex flex-col justify-center items-center">
        <h1 className="text-4xl font-semibold z-10 text-black font-mono uppercase tracking-tight ">
          Liam Grant
        </h1>
        <span className="z-10 font-mono">[SOFTWARE ENGINEER]</span>
      </div>
      <ThreeD />
      <Skills />
      <Technologies />
      {/* <Journey /> */}
      <Footer />
    </>





  );
}
