export function login() {
    const loginWindow = window.open("http://localhost:3172/login", "_blank", "width=500,height=600,menubar=no");

    const interval = setInterval(async () => {
        if (loginWindow!.closed) {
            localStorage.setItem("token", await getAccessToken());
            
            console.log(localStorage.getItem("token"));

            clearInterval(interval);

            window.location.reload();
        }
    }, 100);
}

async function getAccessToken(): Promise<string> {
    const response = await fetch("http://localhost:3172/token", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    return data;
}

export async function refreshToken() {
    const response = await fetch("http://localhost:3172/refresh", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    console.log("refreshing token");

    console.log(response);

    const data = await response.json();

    return data;
}