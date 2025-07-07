export default function Skills(projects) {
    return (
        <section className="border-t border-[#1C1C21]">
            <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-2 ">

                <div className=" bg-white border-r  border-[#1C1C21]  p-4 lg:row-span-2">
                    <h4 className="font-sans font-semibold text-lg">Full-Stack Developer</h4>
                    <p className="font-sans">Next.js, Tailwind CSS, Node.js — with a focus on speed, maintainability and modern architecture. </p>
                </div>


                <div className=" bg-white border-r border-b border-[#1C1C21]  p-4">
                    <h4 className="font-sans font-semibold text-lg">Continuous Learning</h4>
                    <p className="font-sans">Always exploring new technologies and methodologies to enhance my development workflow.</p>
                </div>
                <div className=" bg-white border-b border-r border-[#1C1C21]  p-4">
                    <h4 className="font-sans font-semibold text-lg">Based in Australia</h4>
                    <p className="font-sans">I'm based in the Gold Coast in Queensland </p>
                </div>

                <div className=" bg-white  border-[#1C1C21]  p-4 lg:col-span-2">
                    <h4>Bottom Right</h4>
                    <p>2 columns wide</p>
                </div>
            </div>
        </section>
    )
}