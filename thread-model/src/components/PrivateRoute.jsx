import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BASE } from "../api/threadApi";
import LoadingSpinner from "./LoadingSpinner";

export default function PrivateRoute({ children }) {
    const [allowed, setAllowed] = useState(null);

    useEffect(() => {
        fetch(`${BASE}/auth/check/`, {
            credentials: "include",
        })
            .then((r) => setAllowed(r.status === 200))
            .catch(() => setAllowed(false));
    }, []);

    if (allowed === null) return <LoadingSpinner />;

    return allowed ? children : <Navigate to="/login" replace />;
}
