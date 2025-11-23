import React, { useState, useEffect } from "react";
import ThreadGraph from "../graph/ThreadGraph";
import AddNodeModal from "../components/AddNodeModal";
import AddEdgeModal from "../components/AddEdgeModal";
import EditNodeModal from "../components/EditNodeModal";
import EditEdgeModal from "../components/EditEdgeModal";
import RightPanel from "../components/RightPanel";
import { getThreadNodes } from "../api/threadApi";
import Box from "@mui/material/Box";

export default function ThreadFlow({ openNodeModalRef, openEdgeModalRef }) {
    const [showNodeModal, setShowNodeModal] = useState(false);
    const [showEdgeModal, setShowEdgeModal] = useState(false);
    const [editNode, setEditNode] = useState(null);
    const [editEdge, setEditEdge] = useState(null);

    const [nodes, setNodes] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedEdge, setSelectedEdge] = useState(null);

    async function refresh() {
        const n = await getThreadNodes();
        setNodes(n);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        refresh();

        openNodeModalRef.current = () => setShowNodeModal(true);
        openEdgeModalRef.current = () => setShowEdgeModal(true);

    }, []);

    return (
        <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
            {/* Graph */}
            <Box sx={{ flex: 1 }}>
                <ThreadGraph
                    refresh={refresh}
                    onSelectNode={(node) => {
                        setSelectedEdge(null);
                        setSelectedNode(node.data);
                    }}
                    onSelectEdge={(edge) => {
                        setSelectedNode(null);
                        setSelectedEdge(edge);
                    }}
                />
            </Box>

            {/* Right Panel */}
            <RightPanel
                node={selectedNode}
                edge={selectedEdge}
                onEditNode={(n) => setEditNode(n)}
                onEditEdge={(e) => setEditEdge(e)}
            />

            {/* Modals */}
            <AddNodeModal open={showNodeModal} close={() => setShowNodeModal(false)} refresh={refresh} />
            <AddEdgeModal open={showEdgeModal} close={() => setShowEdgeModal(false)} refresh={refresh} nodes={nodes} />

            {editNode && (
                <EditNodeModal
                    node={editNode}
                    close={() => setEditNode(null)}
                    refresh={refresh}
                />
            )}

            {editEdge && (
                <EditEdgeModal
                    edge={editEdge}
                    nodes={nodes}
                    close={() => setEditEdge(null)}
                    refresh={refresh}
                />
            )}
        </Box>
    );
}
