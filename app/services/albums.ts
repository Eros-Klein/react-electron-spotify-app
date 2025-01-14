import { spotifyRequest } from "./spotify";

type AlbumResponse = {
    items: {
        added_at: string;
        album: Album;
    }[];
}

export type Album = {
    id: string;
    name: string;
    images: {url: string}[];
    artists: {name: string}[];
}

export async function getAlbums(limit: number, offset: number): Promise<Album[]> {
    const response = await spotifyRequest<AlbumResponse>(`https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}&market=ES`, "GET");

    console.log(response);

    return response.items.map(item => item.album);
}