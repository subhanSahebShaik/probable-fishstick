import { getBezierPath } from "reactflow";

export default function ThreadEdge(props) {
    const {
        id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition = "bottom",
        targetPosition = "top",
        markerEnd,
        style = {}
    } = props;

    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <g className="react-flow__edge-path" style={{ pointerEvents: "stroke" }}>
            <path
                id={id}
                d={edgePath}
                stroke="#64FFDA"
                strokeWidth={2.4}
                fill="none"
                strokeLinecap="round"
                filter="drop-shadow(0px 0px 4px rgba(100,255,218,0.8))"
                markerEnd={markerEnd}
                style={{ cursor: "pointer", ...style }}
            />
        </g>
    );
}
