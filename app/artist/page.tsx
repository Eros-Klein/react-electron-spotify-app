"use client";

import { useEffect, useState } from "react";
import { Artist, getArtist } from "../services/artists";
import { getArtistsTopTracks, Track } from "../services/songs";
import { Album, getArtistsAlbums } from "../services/albums";

export default function ArtistPage() {
    const [artistId, setArtistId] = useState<string | null>(null);
    const [artist, setArtist] = useState<Artist | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [artistsAlbums, setArtistsAlbums] = useState<Album[]>([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get("artistId");

        setArtistId(id);
    }, []);

    useEffect(() => {
        const fetchArtist = async () => {
            setLoading(true);
            const fetchedArtist = await getArtist(artistId ? artistId : "");
            const fetchedTopTracks = await getArtistsTopTracks(artistId ? artistId : "");
            const fetchedArtistsAlbums = await getArtistsAlbums(artistId ? artistId : "", 25, 0);
            setArtist(fetchedArtist);
            setTopTracks(fetchedTopTracks);
            setArtistsAlbums(fetchedArtistsAlbums);
            setLoading(false); 

            console.log(fetchedArtist);
            console.log(fetchedTopTracks);
            console.log(fetchedArtistsAlbums);
        };

        if (artistId) {
            fetchArtist();
        }
    }, [artistId]);

    if(!artistId) {
        return <div className="main flex flex-col items-center justify-start h-screen">
            <h1>Artist not found</h1>
        </div>;
    }

    return (<div className="main flex flex-col items-center justify-start h-screen">
            {loading ? (
                <h1>Loading...</h1>
            ) : artist ?(
                <div key={artist.name} className="flex flex-col items-center justify-start gap-3 w-full">
                    <div className="flex relative flex-col items-center gap-3 w-2/3">
                        <img src={artist.images[0].url} width={250} height={250} alt={artist.name} className="rounded-md z-10" />
                        <span style={{width: artist.popularity + "%", transform: "translateY(-50%)"}} className="absolute left-0 top-1/2 z-0 h-5 bg-accent rounded-full blur-lg border border-primary"></span>
                        <span style={{width: "100%", transform: "translateY(-50%)"}} className="absolute left-0 top-1/2 z-0 h-5 rounded-full blur-md border border-primary"></span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1">
                        <h1 className="text-4xl font-bold tracking-wider">{artist.name}</h1>
                        <p className="text-center opacity-75 text-lg font-semibold">{artist.genres.join(", ")}</p>
                        <p className="text-center text-sm opacity-50">{artist.followers.total} followers</p>
                    </div>
                    <div className="flex flex-row items-start justify-start w-5/6 pt-10 gap-10">
                        <div className="flex flex-col items-start justify-start w-1/3">
                            <h1 className="text-2xl font-bold">Latest Release</h1>
                            <span className="w-full h-0.5 bg-primary rounded-full"></span>
                            <div className="py-3 flex flex-row gap-4 select-none">
                                <img src={artistsAlbums[0].images[0].url} width={200} height={200} alt={artistsAlbums[0].name} className="rounded-lg border border-secondary cursor-pointer" />
                                <div className="flex flex-col gap-2 py-3">
                                    <p className="opacity-50 text-sm font-semibold">{artistsAlbums[0].release_date}</p>
                                    <p className="text-justify hover:underline cursor-pointer">{artistsAlbums[0].name}</p>
                                    <p className="opacity-50 text-sm">{artistsAlbums[0].total_tracks} Tracks</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-start w-2/3">
                            <h1 className="text-2xl font-bold">Top Tracks</h1>
                            <span className="w-full h-0.5 bg-primary rounded-full"></span>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: '10px', width: "100%"}}
                                className=" py-3">
                                {topTracks.slice(0, 9).map(track => (
                                    <div key={track.id} className="flex flex-row gap-3 hover:bg-white hover:bg-opacity-25 cursor-pointer select-none rounded-lg">
                                        <img src={track.album.images[0].url} width={50} height={50} alt={track.name} className="rounded-lg shadow-sm shadow-secondary" />
                                        <div className="flex flex-col gap-1 py-1">
                                            <p className="text-sm font-medium">{track.name.length > 30? track.name.substring(0, 25) + "...": track.name}</p>
                                            <p className="text-xs opacity-50">{track.album.name} • {track.album.release_date.substring(0,4)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ): ( <h1>Artist not found</h1> )}
        </div>
        )
}