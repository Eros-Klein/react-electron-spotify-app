"use client";

import { useEffect, useState } from "react";
import { Album, getAlbums } from "../services/albums";

export default function Home() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAlbums = async () => {
            setAlbums(await getAlbums(5, 0));
            setLoading(false);
        };

        fetchAlbums();
    }, []);

    return <div className="main flex flex-col items-center justify-center h-screen">
        {loading ? (<h1>Loading...</h1>): (
            <div className="flex flex-row flex-wrap gap-4">
                {albums.map(album => (
                    <div key={album.id} className="flex flex-col items-center">
                        <img src={album.images[0].url} width={200} height={200} alt={album.name} />
                        <h1 className="text-center">{album.name}</h1>
                        <p className="text-center">{album.artists.map(artist => artist.name).join(", ")}</p>
                    </div>
                ))}
            </div>
        )}
    </div>;
}