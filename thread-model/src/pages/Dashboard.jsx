import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Dashboard() {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Dashboard
            </Typography>
            <Typography>
                This page will show your statistics and financial thread insights soon.
            </Typography>
        </Box>
    );
}
