import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function RightPanel({ node, edge, onEditNode, onEditEdge }) {
    return (
        <Box sx={{ width: 320, borderLeft: "1px solid #ccc", background: "#fafafa" }}>
            <Card sx={{ m: 2 }}>
                <CardContent>
                    {!node && !edge && <Typography>No Selection</Typography>}

                    {node && (
                        <>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">{node.event_name}</Typography>
                                <IconButton onClick={() => onEditNode(node)}>
                                    <EditIcon />
                                </IconButton>
                            </Box>

                            <Typography><b>Type:</b> {node.event_type}</Typography>
                            <Typography><b>Amount:</b> ₹{node.amount}</Typography>
                            <Typography><b>Returnable:</b> {node.is_returnable ? "Yes" : "No"}</Typography>
                            <Typography><b>Status:</b> {node.return_status}</Typography>

                            {node.description && (
                                <Typography sx={{ mt: 2 }}>
                                    <b>Description:</b>
                                    <br />
                                    {node.description}
                                </Typography>
                            )}
                        </>
                    )}

                    {edge && (
                        <>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">Edge</Typography>
                                <IconButton onClick={() => onEditEdge(edge)}>
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
