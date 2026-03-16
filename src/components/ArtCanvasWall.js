import { usePortalSocket } from "../hooks/usePortalSocket";

export default function ArtCanvasWall({ portalId, user }) {
const { users, action, sendAction } = usePortalSocket(portalId, user);

// Placeholder for future: pixels, drawing, or image drops
return (
<div className="w-full p-4 bg-black bg-opacity-70 rounded-lg shadow-xl">
<h3 className="text-xl font-bold mb-2 text-green-400">Collaborative Canvas 🖌️</h3>
<div className="mb-2 text-green-200">
<span className="font-mono">Online:</span>
{users.length === 0 ? (
<span> None.</span>
) : (
users.map(u => (
<span key={u} className="ml-2 bg-green-900 px-2 py-1 rounded text-green-100">{u}</span>
))
)}
</div>
<div className="mt-4 italic text-green-300">
Collaborative canvas coming soon… (Drop in live drawing, AI art, or remix tools here!)
</div>
</div>
);
}
