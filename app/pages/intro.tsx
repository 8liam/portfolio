"use client"
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import abstract_bg from '../../public/abstract-bg.png';
import Image from 'next/image';
export default function IntroSection() {

    return (
        <section className="h-screen flex justify-center text-center">
            <Image
                src={abstract_bg}
                alt="background"
                className="absolute h-[100vh] w-full blur-xl opacity-30 aria-hidden"
            />
            <div className="py-[40vh] z-50">

                <h1 className="text-secondary text-3xl font-mono">Liam Grant</h1>
                <h2 className="text-secondary text-xl font-light">Aspiring Full Stack Developer</h2>

                <p className="text-secondary">
                    <FaLocationDot className="inline text-blue-400" /> Brisbane, Australia
                </p>
            </div>
        </section>
    );
}
