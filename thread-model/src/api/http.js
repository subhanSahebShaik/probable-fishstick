import { BASE } from "./threadApi";

export async function apiFetch(url, options = {}) {
    const finalOptions = {
        ...options,
        credentials: "include",   // send cookies always
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    };

    let res = await fetch(url, finalOptions);

    // token expired → try refresh
    if (res.status === 401) {
        const refresh = await fetch(`${BASE}/auth/refresh/`, {
            method: "POST",
            credentials: "include",
        });

        if (refresh.status !== 200) {
            // refresh failed → logout
            return { authError: true };
        }

        // retry original request
        res = await fetch(url, finalOptions);
    }

    return res.json();
}
