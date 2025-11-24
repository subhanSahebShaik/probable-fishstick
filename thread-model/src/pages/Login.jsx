import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE } from "../api/threadApi";

import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert
} from "@mui/material";

export default function Login() {
    const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function login() {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${BASE}/auth/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (data.access) {
                localStorage.setItem("access", data.access);
                localStorage.setItem("refresh", data.refresh);
                navigate("/flow");
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
                minHeight: "calc(100vh - 60px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f4f6f8",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    width: 350,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUser(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={login}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : "Login"}
                </Button>
            </Paper>
        </Box>
    );
}
