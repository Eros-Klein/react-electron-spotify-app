export async function spotifyRequest<T>(url: string, method:'POST'|'GET'|'PUT'|'DELETE'|'PATCH', body?: unknown): Promise<T> {
    const token = localStorage.getItem("token");

    console.log(token);

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(body),
    });

    return (await response.json()) as T;
}