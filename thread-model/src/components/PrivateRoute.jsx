import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BASE } from "../api/threadApi";
import { CircularProgress, Box } from "@mui/material";

export default function PrivateRoute({ children }) {
    const [allowed, setAllowed] = useState(null);

    useEffect(() => {
        fetch(`${BASE}/auth/check/`, {
            credentials: "include",
        })
            .then((r) => setAllowed(r.status === 200))
            .catch(() => setAllowed(false));
    }, []);

    if (allowed === null) return
    <Box
        sx={{
            p: 3,
            display: "flex",
            height: "80vh",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <CircularProgress sx={{ color: "#64FFDA" }} />
    </Box>;

    return allowed ? children : <Navigate to="/login" replace />;
}
