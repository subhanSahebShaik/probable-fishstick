import { useEffect, useState } from "react";
import { BASE } from "../api/threadApi";

export default function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        fetch(`${BASE}/auth/check/`, {
            credentials: "include",
        })
            .then((res) => setLoggedIn(res.status === 200))
            .catch(() => setLoggedIn(false));
    }, []);

    return loggedIn;
}
