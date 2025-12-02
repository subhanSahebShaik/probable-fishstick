import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#64FFDA", // aqua glow
        },
        secondary: {
            main: "#1EB980", // seaweed green
        },
        background: {
            default: "#0A192F",   // deep navy
            paper: "#0E2A47",     // medium ocean
        },
        text: {
            primary: "#E6F1FF",
            secondary: "#A8B2D1",
        },
        error: {
            main: "#FF6F61", // coral debit red
        },
        success: {
            main: "#38E6B8", // aqua-green
        },
    },

    typography: {
        fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    },

    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: "rgba(14, 42, 71, 0.75)",
                    backdropFilter: "blur(12px)",
                    borderRadius: 14,
                    border: "1px solid rgba(100, 255, 218, 0.1)",
                    boxShadow: "0 0 22px rgba(0,0,0,0.45)",
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    margin: "8px",
                    width: "100%",
                    maxWidth: "550px",
                },
            },
        },
    }
});

export default theme;
