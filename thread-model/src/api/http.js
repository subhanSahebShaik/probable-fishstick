export async function apiFetch(url, options = {}) {
    return fetch(url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    }).then(r => r.json());
}
