import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

import { logout } from "../api/threadApi";

export default function NavBar({ openAddNode, openAddEdge }) {
    const location = useLocation();
    const navigate = useNavigate();

    const onFlowPage = location.pathname === "/flow";

    function handleLogout() {
        logout();
        navigate("/login");
    }

    const loggedIn = !!localStorage.getItem("access");

    return (
        <AppBar position="static" color="primary" sx={{ height: "60px" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                {/* Clickable Avatar Logo */}
                <Box
                    component={Link}
                    to="/"
                    sx={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: "white",
                            color: "primary.main",
                            fontWeight: 700,
                            width: 40,
                            height: 40,
                            fontSize: "1.3rem",
                            boxShadow: 1,
                        }}
                    >
                        S
                    </Avatar>
                </Box>

                {/* Navigation Buttons */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button color="inherit" component={Link} to="/">Dashboard</Button>
                    <Button color="inherit" component={Link} to="/flow">Thread Flow</Button>

                    {onFlowPage && (
                        <>
                            <Button variant="outlined" color="inherit" onClick={openAddNode}>
                                Add Node
                            </Button>
                            <Button variant="outlined" color="inherit" onClick={openAddEdge}>
                                Add Edge
                            </Button>
                        </>
                    )}

                    {/* Logout Icon (only when logged in) */}
                    {loggedIn && (
                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
