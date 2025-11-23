import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";
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
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/flow"
          element={
            <ThreadFlow
              openNodeModalRef={openAddNodeRef}
              openEdgeModalRef={openAddEdgeRef}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
