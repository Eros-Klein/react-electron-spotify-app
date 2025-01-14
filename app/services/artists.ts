import { spotifyRequest } from "./spotify";

export type Artist = {
    images: {url: string}[];
    name: string;
    genres: string[];
    popularity: number;
    followers: {total: number};
}

export async function getArtist(id: string): Promise<Artist> {
    const response = await spotifyRequest<Artist>(`https://api.spotify.com/v1/artists/${id}`, "GET");

    return response;
}