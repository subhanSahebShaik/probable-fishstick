import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Handle, Position } from "reactflow";

export default function ThreadNodeComponent({ data }) {
    const isCredit = data.event_type === "CREDIT";

    return (
        <Box
            sx={{
                width: 240,
                padding: 1.5,
                borderRadius: 2,
                border: "1px solid #444",
                backgroundColor: isCredit ? "#d2ffe0" : "#ffe0e0",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                cursor: "pointer",
            }}
        >
            <Handle type="target" position={Position.Top} style={{ background: "#333" }} />
            <Handle type="source" position={Position.Bottom} style={{ background: "#333" }} />

            {/* Event Name */}
            <Typography
                variant="subtitle1"
                fontWeight="600"
                sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
            >
                {data.event_name}
            </Typography>

            {/* Amount */}
            <Typography variant="body1" sx={{ fontWeight: 500, fontSize: "0.9rem" }}>
                ₹ {data.amount}
            </Typography>

            {/* Balance */}
            <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontSize: "0.85rem", color: "#333" }}
            >
                Balance: ₹ {Number(data.balance || 0).toFixed(2)}
            </Typography>

            {/* Timestamp */}
            <Typography variant="caption" sx={{ fontSize: "0.75rem", color: "#888" }}>
                {new Date(data.timestamp).toLocaleString()}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {data.return_status !== "NONE" && (
                    <Chip
                        size="small"
                        variant="outlined"
                        label={data.return_status}
                        color={
                            data.return_status === "CLEARED"
                                ? "success"
                                : data.return_status === "PARTIAL"
                                    ? "warning"
                                    : "error"
                        }
                    />
                )}
            </Box>
        </Box>
    );
}
