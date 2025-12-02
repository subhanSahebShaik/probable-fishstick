import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Avatar,
    IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../api/threadApi";
import useAuthStatus from "../hooks/useAuthStatus";

export default function NavBar({ openAddNode, openAddEdge }) {
    const location = useLocation();
    const navigate = useNavigate();
    const loggedIn = useAuthStatus();
    const path = location.pathname;

    const isDashboard = path === "/";
    const isFlow = path === "/flow";
    const isLogin = path === "/login";

    function handleLogout() {
        logout();
        navigate("/login");
    }

    // Avoid flicker before backend returns auth status
    if (loggedIn === null) return null;

    return (
        <AppBar
            position="sticky"
            sx={{
                background: "rgba(10, 25, 47, 0.55)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 18px rgba(0,0,0,0.4)",
                borderBottom: "1px solid rgba(100,255,218,0.12)",
                height: 64,
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                {/* LOGO */}
                <Box
                    component={loggedIn ? Link : "div"}
                    to="/"
                    sx={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        cursor: loggedIn ? "pointer" : "default",
                        userSelect: "none",
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: "#64FFDA",
                            color: "#0A192F",
                            fontWeight: 800,
                            width: 42,
                            height: 42,
                            fontSize: "1.2rem",
                            boxShadow: "0 0 10px rgba(100,255,218,0.6)",
                        }}
                    >
                        S
                    </Avatar>

                    {!isLogin && loggedIn && (
                        <Box
                            sx={{
                                fontSize: "1.2rem",
                                fontWeight: 600,
                                color: "#E6F1FF",
                            }}
                        >
                            probable-fishstick
                        </Box>
                    )}
                </Box>

                {/* NAV BUTTONS */}
                {!loggedIn || isLogin ? null : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {!isDashboard && (
                            <Button
                                component={Link}
                                to="/"
                                sx={{
                                    color: "#E6F1FF",
                                    "&:hover": { color: "#64FFDA" },
                                }}
                            >
                                Dashboard
                            </Button>
                        )}

                        {!isFlow && (
                            <Button
                                component={Link}
                                to="/flow"
                                sx={{
                                    color: "#E6F1FF",
                                    "&:hover": { color: "#64FFDA" },
                                }}
                            >
                                Thread Flow
                            </Button>
                        )}

                        {/* Flow Tools */}
                        {isFlow && (
                            <>
                                <Button
                                    variant="outlined"
                                    onClick={openAddNode}
                                    sx={{
                                        borderColor: "rgba(100,255,218,0.5)",
                                        color: "#64FFDA",
                                        "&:hover": {
                                            borderColor: "#64FFDA",
                                            background: "rgba(100,255,218,0.08)",
                                        },
                                    }}
                                >
                                    Add Node
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={openAddEdge}
                                    sx={{
                                        borderColor: "rgba(100,255,218,0.5)",
                                        color: "#64FFDA",
                                        "&:hover": {
                                            borderColor: "#64FFDA",
                                            background: "rgba(100,255,218,0.08)",
                                        },
                                    }}
                                >
                                    Add Edge
                                </Button>
                            </>
                        )}

                        {/* LOGOUT */}
                        <IconButton
                            onClick={handleLogout}
                            sx={{
                                color: "#FF6F61",
                                "&:hover": {
                                    color: "#E76A55",
                                    transform: "scale(1.1)",
                                },
                                transition: "0.2s",
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}
