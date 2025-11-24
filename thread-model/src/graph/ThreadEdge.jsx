import { getBezierPath } from "reactflow";

export default function ThreadEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
}) {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <path
                id={id}
                d={edgePath}
                stroke="#333"
                strokeWidth={2}
                fill="none"
            />
        </>
    );
}
