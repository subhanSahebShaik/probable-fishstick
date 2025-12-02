// ThreadNode.jsx
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Handle, Position } from "reactflow";

export default function ThreadNodeComponent({ data }) {
    const isCredit = data.event_type === "CREDIT";

    const bg = isCredit
        ? "linear-gradient(135deg, #0E5035 0%, #38E6B8 100%)"
        : "linear-gradient(135deg, #501A1A 0%, #FF6F61 100%)";

    return (
        <Box
            sx={{
                width: 240,
                p: 2,
                borderRadius: 3,
                background: bg,
                color: "white",
                boxShadow: "0 0 15px rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.15)",
            }}
        >
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />

            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 700,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }}
            >
                {data.event_name}
            </Typography>

            <Typography sx={{ mt: 0.5, fontWeight: 500 }}>
                ₹ {data.amount}
            </Typography>

            <Typography sx={{ mt: 0.5, fontSize: "0.8rem" }}>
                Balance: ₹ {Number(data.balance || 0).toFixed(2)}
            </Typography>

            <Typography sx={{ opacity: 0.8, fontSize: "0.7rem", mt: 1 }}>
                {new Date(data.timestamp).toLocaleString()}
            </Typography>

            {data.return_status !== "NONE" && (
                <Chip
                    size="small"
                    label={data.return_status}
                    sx={{
                        mt: 1,
                        background: "rgba(255,255,255,0.2)",
                        color: "white",
                        border: "1px solid rgba(255,255,255,0.4)",
                    }}
                />
            )}
        </Box>
    );
}
