import { useState } from "react";
import { usePortalSocket } from "../hooks/usePortalSocket";

export default function OpenMicQueue({ portalId, user }) {
const { sendAction, action } = usePortalSocket(portalId, user);
const [input, setInput] = useState("");
const [queue, setQueue] = useState([]);

function submit() {
if (!input.trim()) return;
const entry = { user: user.name, text: input };
sendAction({ type: "mic-submit", entry });
setInput("");
setQueue((q) => [...q, entry]);
}

// Listen for new submissions from the portal
if (action && action.type === "mic-submit" && !queue.some(e => e.text === action.entry.text && e.user === action.entry.user)) {
setQueue((q) => [...q, action.entry]);
}

return (
<div className="w-full mt-4 p-4 bg-gradient-to-br from-lime-900 to-black rounded-lg border-2 border-lime-400">
<h3 className="text-xl font-bold text-lime-300 mb-2">AI Open Mic 🎤</h3>
<div className="flex mb-2">
<input
className="flex-1 bg-gray-900 border border-lime-700 px-3 py-1 rounded text-lime-200 mr-2"
value={input}
placeholder="Drop a bar, idea, or theme…"
onChange={e => setInput(e.target.value)}
onKeyDown={e => e.key === "Enter" && submit()}
/>
<button className="btn" onClick={submit}>Queue It</button>
</div>
<div className="text-lime-100 mb-1">Next Up:</div>
<ol className="list-decimal ml-4">
{queue.map((q, i) => (
<li key={i}>
<span className="font-bold">{q.user}:</span> <span className="italic">{q.text}</span>
</li>
))}
</ol>
</div>
);
}
