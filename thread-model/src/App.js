import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import ThreadFlow from "./pages/ThreadFlow";

export default function App() {
  const openAddNodeRef = useRef(null);
  const openAddEdgeRef = useRef(null);

  return (
    <BrowserRouter>
      <NavBar
        openAddNode={() => openAddNodeRef.current?.()}
        openAddEdge={() => openAddEdgeRef.current?.()}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
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
  );
}
