import { FiGithub, FiGlobe } from "react-icons/fi";
import Link from "next/link";
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
export default function PortfolioSection() {
    const projectsList = [
        {
            "id": 1,
            "title": "FMLyrics",
            "description": "Displays the song lyrics of what you're listening to on Spotify or Soundcloud via the Last.fm API.",
            "thumbnail": "",
            "website": "https://fmlyrics.netlify.app/",
            "github": "https://github.com/8liam/FMLyrics"
        },
        {
            "id": 2,
            "title": "1",
            "description": "description",
            "website": "https://fmlyrics.netlify.app/",
            "github": "https://github.com/8liam/FMLyrics"
        },
    ]
    const projects = projectsList.map((project) => (
        <div key={project.id} className="border p-4 mb-4 rounded-lg bg-alternateprimary">
            <h1 className="text-2xl font-semibold">{project.title}</h1>
            <p className="text-gray-400">{project.description}<a></a>
            </p>
            {/*<img src={project.thumbnail} alt={`Thumbnail for ${project.title}`} className="mt-2" />
            */}
            <div className="justify-start text-left">
                {project.website && (
                    <div className="w-16 p-[2px] pb-1 text-center bg-primary rounded-full border-2 border-secondary" >
                        <Link
                            href={project.website}

                            className="text-blue-500 hover:text-secondary"
                            style={{ textDecoration: 'none' }}
                        >
                            <GitHubIcon />
                        </Link>
                        {project.website && (
                            <Link
                                href={project.website}

                                className="text-blue-500 hover:text-secondary ml-[3px]"
                                style={{ textDecoration: 'none' }}
                            >
                                <LanguageIcon fontSize="medium" />
                            </Link>
                        )}
                    </div>
                )}



            </div>
        </div>
    ));



    return (
        <section className="px-[20vw] h-screen justify-center text-center border-t-white border-t-[0.25px]">

            <h1 className="text-3xl font-mono py-[5vh]">Portfolio</h1>

            <div className="py-[5vh]">
                {projects}
            </div>
        </section>
    )
}