// Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE } from "../api/threadApi";
import { useAuth } from "../context/AuthContext";

import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert,
} from "@mui/material";

export default function Login() {
    const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { setLoggedIn } = useAuth();
    const navigate = useNavigate();

    async function login() {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${BASE}/auth/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            if (res.status === 200) {
                setLoggedIn(true);
                navigate("/");
            } else {
                setError("Invalid username or password");
            }
        } catch {
            setError("Network error. Please try again.");
        }
        setLoading(false);
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(180deg, #0A192F 0%, #0E2A47 100%)",
            }}
        >
            <Paper
                component="form"             // <-- make Paper a form
                onSubmit={(e) => {
                    e.preventDefault();      // prevent full page reload
                    login();                 // call your login function
                }}
                sx={{
                    p: 4,
                    width: 340,
                    borderRadius: 3,
                    background: "rgba(14,42,71,0.7)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(100,255,218,0.15)",
                    color: "#E6F1FF",
                }}
            >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                    Welcome Back
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUser(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{
                        py: 1.4,
                        fontWeight: 600,
                        background: "#64FFDA",
                        color: "#0A192F",
                        "&:hover": { background: "#38E6B8" },
                    }}
                    onClick={login}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={22} /> : "Login"}
                </Button>
            </Paper>
        </Box>
    );
}
