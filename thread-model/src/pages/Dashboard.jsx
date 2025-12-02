// Dashboard.jsx
import { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    CircularProgress,
} from "@mui/material";
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
} from "recharts";

import { getThreadNodes, getThreadEdges } from "../api/threadApi";

const COLORS = ["#64FFDA", "#FF6F61", "#38E6B8", "#F9A825", "#A277FF"];

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
            <Box
                sx={{
                    p: 3,
                    display: "flex",
                    height: "80vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress sx={{ color: "#64FFDA" }} />
            </Box>
        );
    }

    // ───────────────────────────────────────────────
    // DATA PROCESSING
    // ───────────────────────────────────────────────
    const totalCredit = nodes
        .filter(n => n.event_type === "CREDIT")
        .reduce((s, n) => s + Number(n.amount), 0);

    const totalDebit = nodes
        .filter(n => n.event_type === "DEBIT")
        .reduce((s, n) => s + Number(n.amount), 0);

    const creditVsDebitData = [
        { name: "Credits", value: totalCredit },
        { name: "Debits", value: totalDebit },
    ];

    const monthMap = {};
    nodes.forEach(n => {
        const mon = new Date(n.timestamp).toLocaleString("default", { month: "short" });
        if (!monthMap[mon]) monthMap[mon] = { month: mon, credit: 0, debit: 0 };

        if (n.event_type === "CREDIT")
            monthMap[mon].credit += Number(n.amount);
        else
            monthMap[mon].debit += Number(n.amount);
    });

    const monthlyTrendData = Object.values(monthMap);

    const returnMap = { PENDING: 0, PARTIAL: 0, CLEARED: 0 };
    nodes.forEach(n => {
        if (n.is_returnable) {
            returnMap[n.return_status] += Number(n.return_amount);
        }
    });

    const returnableData = Object.keys(returnMap).map(key => ({
        name: key,
        value: returnMap[key],
    }));

    const stats = {
        nodes: nodes.length,
        edges: edges.length,
        ratio: edges.length ? (edges.length / nodes.length).toFixed(2) : 0,
    };

    // ───────────────────────────────────────────────
    // UI
    // ───────────────────────────────────────────────
    const card = {
        p: 3,
        borderRadius: 3,
        background: "rgba(14,42,71,0.55)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(100,255,218,0.12)",
        boxShadow: "0 0 12px rgba(0,0,0,0.25)",
    };

    // Chart widths
    const chartWidth = windowWidth * 0.40;

    return (
        <Box sx={{ width: "100%", color: "#E6F1FF", p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                Dashboard Overview
            </Typography>

            <Grid container spacing={3} padding={3} justifyContent="space-evenly">

                {/* Credit vs Debit */}
                <Grid item xs={12} md={4}>
                    <Paper sx={card}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Credits vs Debits
                        </Typography>

                        <Box sx={{ height: 250, width: chartWidth }}>
                            <PieChart width="100%" height={250}>
                                <Pie
                                    data={creditVsDebitData}
                                    cx="50%"
                                    cy="50%"
                                    label
                                    innerRadius={50}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {creditVsDebitData.map((entry, i) => (
                                        <Cell key={i} fill={COLORS[i]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </Box>
                        <Typography sx={{ mt: 1 }}>
                            <b>Total Credit:</b> ₹{totalCredit}
                        </Typography>
                        <Typography>
                            <b>Total Debit:</b> ₹{totalDebit}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Monthly Trend */}
                <Grid item xs={12} md={8}>
                    <Paper sx={card}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Monthly Trend
                        </Typography>

                        <Box sx={{ height: 300, width: chartWidth }}>
                            <LineChart width="100%" height={300} data={monthlyTrendData}>
                                <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="month" stroke="#A8B2D1" />
                                <YAxis stroke="#A8B2D1" />
                                <Tooltip />
                                <Line dataKey="credit" stroke="#64FFDA" strokeWidth={2} />
                                <Line dataKey="debit" stroke="#FF6F61" strokeWidth={2} />
                            </LineChart>
                        </Box>
                    </Paper>
                </Grid>

                {/* Returnable */}
                <Grid item xs={12} md={6}>
                    <Paper sx={card}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Returnable Money
                        </Typography>
                        <Box sx={{ height: 300, width: chartWidth }}>
                            <BarChart width="100%" height={300} data={returnableData}>
                                <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#A8B2D1" />
                                <YAxis stroke="#A8B2D1" />
                                <Tooltip />
                                <Bar dataKey="value" fill="#A277FF" radius={[5, 5, 0, 0]} />
                            </BarChart>
                        </Box>
                    </Paper>
                </Grid>

                {/* Graph Stats */}
                <Grid item xs={12} md={6}>
                    <Paper sx={card}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Graph Insights
                        </Typography>

                        <Paper elevation={3} sx={card} style={{ width: chartWidth, height: 300 }}>
                            <Typography>Total Nodes: {stats.nodes}</Typography>
                            <Typography>Total Edges: {stats.edges}</Typography>
                            <Typography>Average Connections: {stats.ratio}</Typography>
                        </Paper>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    );
}
