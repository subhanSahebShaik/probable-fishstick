import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function NavBar({ openAddNode, openAddEdge }) {
    const location = useLocation();

    const onFlowPage = location.pathname === "/flow";

    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Thread Model
                </Typography>

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
                </Box>
            </Toolbar>
        </AppBar>
    );
}
