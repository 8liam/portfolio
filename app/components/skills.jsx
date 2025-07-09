"use client"
import { Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Skills(projects) {
    const [showTooltip, setShowTooltip] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText("liamgrantdev@gmail.com");
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 2000);
        } catch (err) {
            console.error('Failed to copy email: ', err);
        }
    };
    return (
        <section className="border-t border-[#1C1C21]" id="about">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 ">

                <div className=" bg-white border-r border-b lg:border-b-0 border-[#1C1C21]  p-4 row-span-1 lg:row-span-2 space-y-1" >
                    <Image src={"/full-stack.png"} width={1000} height={500} alt="Australia Map" className="w-full object-contain select-none" />
                    <h4 className="font-sans font-semibold text-lg">Full-Stack Developer</h4>
                    <p className="font-sans">I'm a full-stack developer with a focus on speed, security, maintainability and modern architecture. </p>
                    <div className="py-4">
                        <div className="relative">
                            <button
                                onClick={copyEmail}
                                className="border border-[#1C1C21] w-full py-2 cursor-pointer flex flex-row justify-center items-center gap-4 font-mono hover:bg-gray-50 transition-colors"
                            >
                                liamgrantdev@gmail.com<Copy width={16} height={16} />
                            </button>
                            {showTooltip && (
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                                    Email copied to clipboard!
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                <div className=" bg-white border-r border-b border-[#1C1C21]  p-4 space-y-1 ">
                    <Image src={"/learning.png"} width={1000} height={500} alt="Learning image" className="w-full object-contain select-none" />
                    <h4 className="font-sans font-semibold text-lg">Continuous Learning</h4>
                    <p className="font-sans">I'm always exploring new technologies and methodologies to enhance my development workflow.</p>
                </div>
                <div className=" bg-white border-b border-r border-[#1C1C21] p-4 space-y-1">
                    <Image src={"/australia.png"} width={1000} height={500} alt="Australia Map" className="w-full object-contain select-none" />
                    <h4 className="font-sans font-semibold text-lg">Based in Australia</h4>
                    <p className="font-sans">I'm based in the Gold Coast in Queensland, but am open to remote work Australia-wide. </p>
                </div>

                <div className=" bg-white  border-[#1C1C21]  p-4 lg:col-span-2 space-y-1">
                    <Image src={"/knowledge-in-best-practices.png"} width={2000} height={500} alt="Australia Map" className="w-full object-contain select-none" />
                    <h4 className="font-sans font-semibold text-lg">Knowledge in Best Practices</h4>
                    <p className="font-sans">
                        I follow industry best practices by writing clean, maintainable, and well-documented code. I use Git for version control and prioritize performance, accessibility, SEO, and security to deliver high-quality, reliable software.
                    </p>
                </div>
            </div>
        </section >
    )
}