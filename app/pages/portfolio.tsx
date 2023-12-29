export default function PortfolioSection() {
    const projectsList = [
        {
            "id": 1,
            "title": "1",
            "description": "description",
            "thumbnail": "",
            "website": ""
        },
        {
            "id": 2,
            "title": "1",
            "description": "description",
            "thumbnail": "",
            "website": ""
        },
    ]
    const projects = projectsList.map((project) => (
        <div key={project.id} className="border p-4 mb-4">
            <h1 className="text-2xl font-semibold">{project.title}</h1>
            <p className="text-gray-600">{project.description}</p>
            <img src={project.thumbnail} alt={`Thumbnail for ${project.title}`} className="mt-2" />
            {project.website && (
                <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 block">
                    Visit Website
                </a>
            )}
        </div>
    ));


    return (
        <section className="h-screen flex justify-center text-center">
            <div className="py-[40vh]">
                {projects}
            </div>
        </section>
    )
}