import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";

// Auth utilities
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ThreadFlow from "./pages/ThreadFlow";

// Components
import NavBar from "./components/NavBar";

// Theme
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme/DeepOcean";

import { AuthProvider } from "./context/AuthContext";

/**
 * App Component
 * -------------
 * Root of the entire application.
 * - Wraps everything inside the Deep Ocean theme
 * - Controls global navigation
 * - Manages modal-opening references for ThreadFlow
 * - Applies authentication protection via PrivateRoute
 */

export default function App() {
  // These refs are passed to NavBar so its buttons can trigger modals inside ThreadFlow
  const openAddNodeRef = useRef(null);
  const openAddEdgeRef = useRef(null);

  return (
    <ThemeProvider theme={theme}>
      {/* Applies global dark theme, resets CSS, and activates Deep Ocean colors */}
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          {/* Top Navigation Bar (conditionally shows buttons based on path) */}
          <NavBar
            openAddNode={() => openAddNodeRef.current?.()}
            openAddEdge={() => openAddEdgeRef.current?.()}
          />

          {/* Main Application Routing */}
          <Routes>

            {/* Login Page (public) */}
            <Route path="/login" element={<Login />} />

            {/* Dashboard (protected) */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Thread Flow Visualization (protected) */}
            <Route
              path="/flow"
              element={
                <PrivateRoute>
                  <ThreadFlow
                    openNodeModalRef={openAddNodeRef}
                    openEdgeModalRef={openAddEdgeRef}
                  />
                </PrivateRoute>
              }
            />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
