import { spotifyRequest } from "./spotify";

type AlbumResponse = {
    items: {
        added_at: string;
        album: Album;
    }[];
}

type ArtistAlbumsResponse = {
    items: Album[];
}

export type Album = {
    id: string;
    name: string;
    images: {url: string}[];
    artists: {name: string, id:string}[];
    release_date: string;
    total_tracks: number;
}

export async function getAlbums(limit: number, offset: number): Promise<Album[]> {
    const response = await spotifyRequest<AlbumResponse>(`https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}&market=ES`, "GET");

    console.log(response);

    return response.items.map(item => item.album);
}

export async function getArtistsAlbums(id: string, limit: number, offset: number): Promise<Album[]> {
    const response = await spotifyRequest<ArtistAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}/albums?market=ES&limit=${limit}&offset=${offset}`, "GET");

    console.log(response);

    return response.items;
    
}