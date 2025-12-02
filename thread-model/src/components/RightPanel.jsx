// RightPanel.jsx
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function RightPanel({ node, edge, onEditNode, onEditEdge }) {
    return (
        <Box
            sx={{
                width: { xs: "100%", md: 340 },
                height: "100vh",
                borderLeft: "1px solid rgba(100,255,218,0.15)",
                background: "rgba(10,25,47,0.55)",
                backdropFilter: "blur(14px)",
                boxShadow: "inset 0 0 18px rgba(0,0,0,0.35)",
                overflowY: "auto",
                p: 2,
            }}
        >
            <Card
                sx={{
                    background: "rgba(14,42,71,0.6)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(100,255,218,0.12)",
                    borderRadius: 3,
                    color: "#E6F1FF",
                }}
            >
                <CardContent>

                    {!node && !edge && (
                        <Typography sx={{ opacity: 0.7 }}>
                            No Selection
                        </Typography>
                    )}

                    {node && (
                        <>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {node.event_name}
                                </Typography>

                                <IconButton onClick={() => onEditNode(node)} sx={{ color: "#64FFDA" }}>
                                    <EditIcon />
                                </IconButton>
                            </Box>

                            <Typography><b>Type:</b> {node.event_type}</Typography>
                            <Typography><b>Amount:</b> ₹{node.amount}</Typography>
                            <Typography><b>Returnable:</b> {node.is_returnable ? "Yes" : "No"}</Typography>
                            <Typography><b>Status:</b> {node.return_status}</Typography>

                            {node.description && (
                                <Typography sx={{ mt: 2, whiteSpace: "pre-wrap" }}>
                                    <b>Description:</b>
                                    <br />
                                    {node.description}
                                </Typography>
                            )}
                        </>
                    )}

                    {edge && (
                        <>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Edge
                                </Typography>

                                <IconButton onClick={() => onEditEdge(edge)} sx={{ color: "#64FFDA" }}>
                                    <EditIcon />
                                </IconButton>
                            </Box>

                            <Typography><b>From:</b> {edge.source}</Typography>
                            <Typography><b>To:</b> {edge.target}</Typography>
                        </>
                    )}

                </CardContent>
            </Card>
        </Box>
    );
}
