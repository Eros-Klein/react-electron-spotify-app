"use client";

import Image from 'next/image'

import {useRouter} from 'next/navigation'

export default function NaviagtionBar() {
    const router = useRouter();

    return (
        <div className="side-bar sidebar flex flex-col items-center justify-start gap-5 p-3 top-5 bottom-0 left-0">
            <button><Image src={"home.svg"} alt="Home" width={400} height={400}></Image></button>
            <button onClick={() => router.push('/home')}><Image src={"library.svg"} alt="Library" width={400} height={400}></Image></button>
        </div>
    )
}