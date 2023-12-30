import Image from 'next/image';
import qut from '../../public/qut.jpg';

export default function AboutSection() {
    const languagesList = [
        {
            "name": "TypeScript",
        },
        {
            "name": "Next.js",
        },
        {
            "name": "React",
        },
        {
            "name": "Tailwind",
        },
        {
            "name": "CSS",
        },
        {
            "name": "HTML",
        },
        {
            "name": "JavaScript",
        },
        {
            "name": "Docker",
        },
        {
            "name": "C#",
        },
        {
            "name": "Git",
        },
        {
            "name": "React Native",
        },
        {
            "name": "AWS",
        },

    ]
    const languages = languagesList.map((language) => (
        <div className="p-2 border-2 border-solid border-accent bg-lighterbg text-secondary rounded hover:bg-white hover:text-black hover:border-black ease-in-out duration-300">{language.name}</div>

    ));

    return (
        <section className="px-[20vw] py-[10vh] h-screen  bg-alternateprimary border-t-white border-t-[0.25px]">
            <div className="flex items-center justify-center">
                <div>
                    <h1 className="text-2xl font-mono pb-4 text-center">Education</h1>
                    <div className="flex flex-row border-1 border bg-primary border-white rounded-xl max-w-[80vw]">
                        <div>
                            <Image
                                src={qut}
                                alt="Queensland University of Technology"
                                width="140"
                                className="rounded-l-xl"
                            />
                        </div>
                        <div className='ml-1 p-2'>
                            <h1 className="text-xl font-bold">Queensland University of Technology</h1>
                            <p>Bachelor of Information Technology</p>
                            <ul>
                                <li className='before:text-accent before:content-[">"] text-secondary'>Major in Computer Science</li>
                                <li className='before:text-accent before:content-[">"] text-secondary'>Minor in IoT and Mobile Technologies</li>
                            </ul>
                            <p>Completed from 2021-2023</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-28'>
                <h1 className="text-2xl font-mono pt-4 text-center">Skills</h1>
                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-4 pt-4 text-center w-[40vw]">
                        {languages}
                    </div>
                </div>
            </div>


            {/*
    
    
                            */}



        </section>
    )
}