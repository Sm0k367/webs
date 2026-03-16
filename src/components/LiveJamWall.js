import { useState } from "react";
import { usePortalSocket } from "../hooks/usePortalSocket";

export default function LiveJamWall({ portalId, user }) {
const { users, action, sendAction } = usePortalSocket(portalId, user);
const [message, setMessage] = useState("");

function handleJamShout() {
if (message.trim()) {
sendAction({ type: "shout", from: user.name, text: message });
setMessage("");
}
}

return (
<div className="w-full p-4 bg-black bg-opacity-70 rounded-lg shadow-xl">
<h3 className="text-xl font-bold mb-2 text-lime-400">Live Jam Wall 🌐</h3>
<div className="mb-2 text-lime-200">
<span className="font-mono">Online:</span>
{users.length === 0 ? (
<span> None.</span>
) : (
users.map(u => (
<span key={u} className="ml-2 bg-lime-900 px-2 py-1 rounded text-lime-100">{u}</span>
))
)}
</div>
<div className="mt-3">
<input
className="bg-gray-900 border border-lime-700 px-3 py-1 mr-2 rounded text-lime-200"
value={message}
placeholder="Send a jam shout…"
onChange={e => setMessage(e.target.value)}
onKeyDown={e => e.key === "Enter" && handleJamShout()}
/>
<button className="btn" onClick={handleJamShout}>Shout</button>
</div>
{/* Listen for jam shouts */}
{action && action.type === "shout" && (
<div className="mt-4 text-lime-300 font-mono animate-pulse">
{action.from}: {action.text}
</div>
)}
</div>
);
}
