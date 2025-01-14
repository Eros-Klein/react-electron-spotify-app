"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { login } from "./services/auth";


export default function Auth() {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {   
    if(localStorage.getItem("token")) {
      router.push("/home");
    }
    const updateMousePosition = (event: MouseEvent): void => {
        setPosition(
          { 
            x: event.clientX, 
            y: event.clientY
          });
      };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen justify-evenly items-center overflow-hidden">
        <div id="cursor-tracer" style={{top: position.y, left: position.x}} className="absolute w-24 h-24 top-0 left-0 bg-accent pointer-events-none rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10">
        </div>
        <h1 className="text-4xl font-bold tracking-wider">Welcome to Spoitify!</h1>
        <Image src="/icon.svg" width={300} height={300} alt="Spotify Logo" className="w-1/3 h-1/3 select-none" />
        <button onClick={login} className="bg-primary text-background px-5 py-3 shadow-lg shadow-gray-900 rounded-md transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary tracking-wider">Get Started</button>
    </div>
  );
}
