import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, CircularProgress } from "@mui/material";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { getThreadNodes, getThreadEdges } from "../api/threadApi";

const COLORS = ["#1976d2", "#d32f2f", "#388e3c", "#f9a825", "#6a1b9a"];

// Hook to track window size
function useWindowSize() {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    useEffect(() => {
        const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return size;
}

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const { width: windowWidth } = useWindowSize();

    useEffect(() => {
        async function load() {
            const n = await getThreadNodes();
            const e = await getThreadEdges();
            setNodes(n);
            setEdges(e);
            setLoading(false);
        }
        load();
    }, []);

    if (loading) {
        return (
            <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    // ----------------------------- DATA PROCESSING -----------------------------
    // 1. Credits vs Debits
    const totalCredit = nodes.filter(n => n.event_type === "CREDIT").reduce((sum, n) => sum + Number(n.amount), 0);
    const totalDebit = nodes.filter(n => n.event_type === "DEBIT").reduce((sum, n) => sum + Number(n.amount), 0);
    const creditVsDebitData = [{ name: "Credits", value: totalCredit }, { name: "Debits", value: totalDebit }];

    // 2. Monthly Trend
    const monthMap = {};
    nodes.forEach(n => {
        const month = new Date(n.timestamp).toLocaleString("default", { month: "short" });
        if (!monthMap[month]) monthMap[month] = { month, credit: 0, debit: 0 };
        n.event_type === "CREDIT" ? monthMap[month].credit += Number(n.amount) : monthMap[month].debit += Number(n.amount);
    });
    const monthlyTrendData = Object.values(monthMap);

    // 3. Returnable Money
    const returnStatusMap = { PENDING: 0, PARTIAL: 0, CLEARED: 0 };
    nodes.forEach(n => {
        if (n.is_returnable) returnStatusMap[n.return_status] += Number(n.return_amount);
    });
    const returnableData = Object.keys(returnStatusMap).map(key => ({ name: key, value: returnStatusMap[key] }));

    // 4. Graph stats
    const graphStats = {
        totalNodes: nodes.length,
        totalEdges: edges.length,
        avgConnections: edges.length ? (edges.length / nodes.length).toFixed(2) : 0,
    };

    // ----------------------------- UI LAYOUT -----------------------------
    const cardStyle = {
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
    };

    // Chart widths
    const chartWidth = windowWidth * 0.40;

    return (
        <Box sx={{ width: "100%" }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, padding: 3 }}>Dashboard Overview</Typography>

            <Grid container spacing={3} padding={3} justifyContent="space-evenly">

                {/* Credits vs Debits */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} sx={cardStyle}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Credits vs Debits</Typography>
                        <Box sx={{ height: 250, width: chartWidth }}>
                            <PieChart width="100%" height={250}>
                                <Pie
                                    data={creditVsDebitData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                    dataKey="value"
                                >
                                    {creditVsDebitData.map((entry, index) => <Cell key={index} fill={COLORS[index]} />)}
                                </Pie>
                            </PieChart>
                        </Box>
                        <Typography><strong>Total Credit:</strong> ₹{totalCredit}</Typography>
                        <Typography><strong>Total Debit:</strong> ₹{totalDebit}</Typography>
                    </Paper>
                </Grid>

                {/* Monthly Trend */}
                <Grid item xs={12} sm={6} md={8}>
                    <Paper elevation={3} sx={cardStyle}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Monthly Financial Trend</Typography>
                        <Box sx={{ height: 300, width: chartWidth }}>
                            <LineChart width="100%" height={300} data={monthlyTrendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="credit" stroke="#1976d2" strokeWidth={2} />
                                <Line type="monotone" dataKey="debit" stroke="#d32f2f" strokeWidth={2} />
                            </LineChart>
                        </Box>
                    </Paper>
                </Grid>

                {/* Returnable Money */}
                <Grid item xs={12} sm={6} md={6}>
                    <Paper elevation={3} sx={cardStyle}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Returnable Money Overview</Typography>
                        <Box sx={{ height: 300, width: chartWidth }}>
                            <BarChart width="100%" height={300} data={returnableData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#6a1b9a" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </Box>
                    </Paper>
                </Grid>

                {/* Graph Stats */}
                <Grid item xs={12} sm={6} md={6}>
                    <Paper elevation={3} sx={cardStyle} style={{ width: chartWidth }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Graph Structure Insights</Typography>
                        <Typography>Total Nodes: {graphStats.totalNodes}</Typography>
                        <Typography>Total Edges: {graphStats.totalEdges}</Typography>
                        <Typography>Avg. Connections per Node: {graphStats.avgConnections}</Typography>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    );
}
