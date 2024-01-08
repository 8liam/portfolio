import NearMeIcon from "@mui/icons-material/NearMe";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import abstract_bg from "../../public/abstract-bg.png";
import SouthIcon from "@mui/icons-material/South";
import Image from "next/image";
export default function IntroSection() {
  return (
    <section className="h-screen flex justify-center text-center">
      <Image
        src={abstract_bg}
        alt="background"
        className="absolute h-[100vh] w-full blur-sm select-none opacity-50 aria-hidden z-0"
      />
      <div className="py-[40vh] z-50">
        <h1 className="text-secondary text-5xl font-semibold">Liam Grant</h1>
        <h2 className="text-secondary text-2xl font-light">
          Aspiring Full Stack Developer
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
