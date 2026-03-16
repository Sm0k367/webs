import { useRef, useEffect, useState } from "react";
import { usePortalSocket } from "../hooks/usePortalSocket";

// Utility to serialize strokes (could be improved)
function drawLine(ctx, { x0, y0, x1, y1, color, width }) {
ctx.strokeStyle = color || "#00FF88";
ctx.lineWidth = width || 3;
ctx.beginPath();
ctx.moveTo(x0, y0);
ctx.lineTo(x1, y1);
ctx.stroke();
ctx.closePath();
}

const CANVAS_W = 490, CANVAS_H = 340;

export default function CollaborativeDraw({ portalId, user }) {
const { sendAction, action } = usePortalSocket(portalId, user);
const [drawing, setDrawing] = useState(false);
const [last, setLast] = useState(null);
const canvasRef = useRef();

// Handle incoming strokes
useEffect(() => {
if (action && action.type === 'stroke') {
const ctx = canvasRef.current.getContext("2d");
drawLine(ctx, action.stroke);
}
}, [action]);

// Mouse draw logic
function handleDown(e) {
setDrawing(true);
const rect = canvasRef.current.getBoundingClientRect();
setLast({ x: e.clientX - rect.left, y: e.clientY - rect.top });
}
function handleMove(e) {
if (!drawing || !last) return;
const rect = canvasRef.current.getBoundingClientRect();
const x = e.clientX - rect.left, y = e.clientY - rect.top;
const stroke = { x0: last.x, y0: last.y, x1: x, y1: y, color: "#00FF88", width: 3 };
sendAction({ type: "stroke", stroke });
drawLine(canvasRef.current.getContext("2d"), stroke);
setLast({ x, y });
}
function handleUp() {
setDrawing(false);
setLast(null);
}

return (
<div className="flex flex-col items-center mb-3">
<canvas
ref={canvasRef}
width={CANVAS_W}
height={CANVAS_H}
style={{ background: "#181a1b", border: '2px solid #0f0', borderRadius: 9 }}
onMouseDown={handleDown}
onMouseMove={handleMove}
onMouseUp={handleUp}
onMouseLeave={handleUp}
/>
<div className="mt-1 text-green-400 font-mono text-sm">Draw here—everyone sees your strokes live.</div>
</div>
);
}
