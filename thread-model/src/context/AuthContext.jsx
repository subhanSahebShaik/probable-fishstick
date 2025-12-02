// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { BASE } from "../api/threadApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(null);

    // initial check
    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch(`${BASE}/auth/check/`, { credentials: "include" });
                setLoggedIn(res.status === 200);
            } catch {
                setLoggedIn(false);
            }
        }
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
