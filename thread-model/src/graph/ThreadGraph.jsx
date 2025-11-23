import React, { useEffect, useState } from "react";
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap } from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import { getThreadNodes, getThreadEdges } from "../api/threadApi";
import ThreadNodeComponent from "./ThreadNode";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeTypes = {
    threadNode: ThreadNodeComponent,
};

export default function ThreadGraph({ onSelectNode, onSelectEdge }) {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    async function load() {
        const n = await getThreadNodes();
        const e = await getThreadEdges();

        const nodeWidth = 240;
        const nodeHeight = 110;

        dagreGraph.setGraph({ rankdir: "TB", nodesep: 50, ranksep: 80 });

        n.forEach(node => {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        });

        e.forEach(edge => {
            dagreGraph.setEdge(edge.from_node, edge.to_node);
        });

        dagre.layout(dagreGraph);

        const flowNodes = n.map(node => {
            const { x, y } = dagreGraph.node(node.id);
            return {
                id: node.id,
                position: { x, y },
                data: node,
                type: "threadNode",
            };
        });

        const flowEdges = e.map(edge => ({
            id: edge.id,
            source: edge.from_node,
            target: edge.to_node,
            animated: true,
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
            onNodeClick={(evt, node) => onSelectNode(node)}
            onEdgeClick={(evt, edge) => onSelectEdge(edge)}
            fitView
        >
            <Background variant={BackgroundVariant.Cross} gap={25} size={3} />
            <MiniMap />
            <Controls />
        </ReactFlow>
    );
}
