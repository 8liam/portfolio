import { NextResponse } from "next/server";

export type Project = {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  techstack: string[];
  website: string; // Changed from empty array to string array
};

const projects = [
  {
    id: 1,
    title: "FMLyrics",
    imageUrl: "/projects/fmlyrics.png",
    description:
      "Displays the song lyrics of what you're listening to on Spotify or Soundcloud via the Last.fm API.",
    techstack: ["React", "TypeScript", "Node"],
    website: "https://fmlyrics.netlify.app",
  },
  {
    id: 2,
    title: "liamgrant.com",
    imageUrl: "/projects/portfolio.png",
    description:
      "A hub to show off my personal projects. You're using it right now!",
    techstack: ["Next", "TypeScript", "Tailwind"],
    website: "https://liamgrant.com",
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const project = projects.find((project) => project.id === Number(id));

    // Return the extracted data as JSON
    return NextResponse.json(project);
  } catch (error: any) {
    // Handle any errors that occur during the API call
    return new Response(error.message, { status: 500 });
  }
}
