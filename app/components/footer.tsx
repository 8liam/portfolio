import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
export default function Footer() {
  return (
    <div className="flex justify-center bottom-0">
      <div className="xl:w-4/5 border-t py-4 border-white flex justify-between max-xl:w-[90vw] sm:mx-4">
        <div className="select-all">
          <p>liamgrantdev@gmail.com</p>
        </div>
        <div>
          <Link
            className="text-secondary hover:text-accent duration-300 ease-in-out"
            href="https://github.com/8liam"
            target="_blank"
          >
            <GitHubIcon />
          </Link>
          <Link
            className="text-secondary hover:text-accent duration-300 ease-in-out ml-2"
            href="https://linkedin.com/in/liamgrant1903"
            target="_blank"
          >
            <LinkedInIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
