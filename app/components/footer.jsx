import Link from "next/link";
export default function Footer() {
    return (
        <div className="min-h-[10vh] grid grid-cols-1 md:grid-cols-3 border-b ">
            <div className="border-b md:border-r md:border-b-0  border-[#1C1C21] p-4 space-y-2 flex flex-col uppercase">
                <h6 className="font-semibold">LIAM GRANT</h6>
                <Link href="https://github.com/8liam/" className="font-normal" target="_blank">Github</Link>
                <Link href="https://www.linkedin.com/in/liamgrant1903/" className="font-normal" target="_blank">LinkedIn</Link>
            </div>
            <div className="border-b md:border-r md:border-b-0 border-[#1C1C21] p-4" id="contact">
                <h6 className="font-semibold">GET IN TOUCH</h6>

                <Link href="mailto:liamgrantdev@gmail.com" className="font-normal" target="_blank">liamgrantdev@gmail.com</Link>

            </div>
            <div className="p-4">
                <h6 className="font-semibold">SOFTWARE ENGINEER</h6>
            </div>
        </div>
    )
}