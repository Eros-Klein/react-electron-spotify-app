"use client";

import { useEffect, useState } from "react";
import { Album, getAlbums } from "../services/albums";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    function goToArtist(artistId: string) {
        router.push(`/artist?artistId=${artistId}`);
    }

    useEffect(() => {
        const fetchAlbums = async () => {
            setAlbums(await getAlbums(25, 0));
            setLoading(false);
        };

        fetchAlbums();
    }, []);

    return <div className="main flex flex-col items-center justify-start h-screen">
        {loading ? (<h1>Loading...</h1>): (
            <div className="flex flex-row justify-center items-center w-full">
                <div className="flex flex-row flex-wrap gap-4 w-fit justify-center items-start mb-10">
                    {albums.map(album => (
                        <div key={album.id} className="flex flex-col items-center gap-3 cursor-pointer">
                            <div>
                                <img src={album.images[0].url} width={200} height={200} alt={album.name} className="rounded-md" />
                            </div>
                            <div>
                                <h1 className="text-center">{album.name.length > 25? album.name.substring(0, 22) + "...": album.name}</h1>
                                <div className="flex flex-row gap-1 w-full flex-wrap justify-center items-center">
                                    {album.artists.map(artist => (
                                        <p onClick={() => goToArtist(artist.id)} key={artist.name} className="text-center opacity-50 hover:underline">{artist.name}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>;
}