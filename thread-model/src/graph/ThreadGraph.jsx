// ThreadGraph.jsx
import React, { useEffect, useState } from "react";
import ReactFlow, {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";

import { getThreadNodes, getThreadEdges } from "../api/threadApi";
import ThreadNodeComponent from "./ThreadNode";
import ThreadEdge from "./ThreadEdge";

const nodeTypes = { threadNode: ThreadNodeComponent };
const edgeTypes = { threadEdge: ThreadEdge };

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export default function ThreadGraph({ onSelectNode, onSelectEdge }) {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    async function load() {
        const n = await getThreadNodes();
        const e = await getThreadEdges();

        const nodeWidth = 240;
        const nodeHeight = 130;

        dagreGraph.setGraph({
            rankdir: "TB",
            nodesep: 60,
            ranksep: 100,
            marginx: 30,
            marginy: 30,
        });

        n.forEach(node =>
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
        );

        e.forEach(edge =>
            dagreGraph.setEdge(edge.from_node, edge.to_node)
        );

        dagre.layout(dagreGraph);

        const flowNodes = n.map(node => {
            const pos = dagreGraph.node(node.id);
            return {
                id: node.id,
                type: "threadNode",
                position: { x: pos.x, y: pos.y },
                data: node,
            };
        });

        const flowEdges = e.map(edge => ({
            id: edge.id,
            source: edge.from_node,
            target: edge.to_node,
            type: "threadEdge",
            markerEnd: "url(#arrowhead)",
        }));

        setNodes(flowNodes);
        setEdges(flowEdges);
    }

    useEffect(() => { load(); }, []);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={{ type: "threadEdge", }}
            onNodeClick={(evt, node) => onSelectNode(node)}
            onEdgeClick={(evt, edge) => onSelectEdge(edge)}
            fitView
        >
            <Background variant={BackgroundVariant.Cross} gap={45} size={3} />

            <MiniMap
                nodeColor={(node) =>
                    node.data.event_type === "CREDIT"
                        ? "#38E6B8"
                        : "#FF6F61"
                }
                style={{ background: "#0A192F" }}
            />

            <Controls />
        </ReactFlow>
    );
}
