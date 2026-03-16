import { useState } from "react";
import { usePortalSocket } from "../hooks/usePortalSocket";

export default function OpenMicQueue({ portalId, user }) {
const { sendAction, action } = usePortalSocket(portalId, user);
const [input, setInput] = useState("");
const [queue, setQueue] = useState([]);
const [judges, setJudges] = useState({});

async function judge(entry, idx) {
// Call your API to judge: /api/ai with a special Open Mic system prompt
const res = await fetch("/api/ai", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
prompt: `You are an AI Open Mic judge. Rate or riff on this performance: ${entry.text}`,
host: "SmokeStream" // or let users choose
}),
});
const data = await res.json();
setJudges((prev) => ({ ...prev, [idx]: data.reply || "AI glitched out." }));
}

function submit() {
if (!input.trim()) return;
const entry = { user: user.name, text: input };
sendAction({ type: "mic-submit", entry });
setInput("");
setQueue((q) => [...q, entry]);
// Trigger AI judging by default
judge(entry, queue.length);
}

// Listen for new submissions from the portal
if (
action &&
action.type === "mic-submit" &&
!queue.some(e => e.text === action.entry.text && e.user === action.entry.user)
) {
setQueue((q) => {
judge(action.entry, q.length);
return [...q, action.entry];
});
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
<div className="text-lime-200 text-sm mt-1 pl-3 border-l-2 border-lime-300">
{judges[i] ? <span>🎤 <b>AI Judge:</b> {judges[i]}</span> : <span className="italic text-lime-500">Judging…</span>}
</div>
</li>
))}
</ol>
</div>
);
}
