import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <div className="flex justify-center bottom-0">
      <div className="xl:w-4/5 border-t py-4 border-white flex justify-between sm:w-full sm:mx-4">
        <div>
          <p>liamgrantdev@gmail.com</p>
        </div>
        <div>
          <a
            className="text-secondary hover:text-accent duration-300 ease-in-out"
            href="https://github.com/8liam"
            target="_blank"
          >
            <GitHubIcon />
          </a>
          <a
            className="text-secondary hover:text-accent duration-300 ease-in-out ml-2"
            href="https://linkedin.com/in/liamgrant1903"
            target="_blank"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
