export async function apiFetch(url, options = {}) {
    return fetch(url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    }).then(async (r) => {
        if (r.status === 401) {
            // try refresh
            await fetch(`${BASE}/auth/refresh/`, {
                method: "POST",
                credentials: "include",
            });

            // retry original request
            return fetch(url, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...(options.headers || {})
                },
                ...options
            }).then((x) => x.json());
        }
        return r.json();
    });
}
