import { Album } from "./albums";
import { spotifyRequest } from "./spotify";

export type Track = {
    id: string;
    name: string;
    album: Album;
    artists: {name: string, id: string}[];
    preview_url: string;
}

export type TopTrackResponse = {
    tracks: Track[];
}

export async function getArtistsTopTracks(id: string): Promise<Track[]> {
    const response = await spotifyRequest<TopTrackResponse>(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, "GET");

    console.log(response);

    return response.tracks;
}