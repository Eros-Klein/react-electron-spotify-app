import { refreshToken } from "./auth";

export async function spotifyRequest<T>(url: string, method:'POST'|'GET'|'PUT'|'DELETE'|'PATCH', body?: unknown): Promise<T> {
    const token = localStorage.getItem("token");

    console.log("Hallo");

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (response.status === 401) {
        localStorage.setItem("token", await refreshToken());
        return spotifyRequest(url, method, body);
    }

    return (await response.json()) as T;
}