import { useState } from "react";

const HOSTS = [
{ name: "SmokeStream", desc: "Trickster DJ, chaos enabler 🎧🔥" },
{ name: "Visage", desc: "Visual remix monster 👾🦾" },
{ name: "Oracle", desc: "Creepy guide to the meta-layer 👁️" },
];

export default function AIHostChat({ user }) {
const [host, setHost] = useState(HOSTS[0].name);
const [input, setInput] = useState("");
const [history, setHistory] = useState([]);
const [loading, setLoading] = useState(false);

async function sendMessage() {
if (!input.trim()) return;
setHistory((h) => [...h, { role: "user", content: input, name: user.name }]);
setLoading(true);

try {
const res = await fetch("/api/ai", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ prompt: input, host }),
});
const data = await res.json();
setHistory((h) => [
...h,
{ role: "ai", content: data.reply || "🦾 *AI glitch—try again!*", name: host },
]);
} finally {
setLoading(false);
setInput("");
}
}

return (
<div className="w-full mt-5 p-4 rounded-lg border-2 border-pink-400 bg-black bg-opacity-80 shadow-xl">
<h3 className="text-xl font-bold mb-2 text-pink-300">Talk to an AI Host 🤖</h3>
<div className="flex gap-2 mb-2">
{HOSTS.map((h) => (
<button
key={h.name}
className={`px-3 py-1 text-pink-200 rounded font-mono ${
host === h.name ? "bg-pink-700 font-bold" : "bg-gray-800"
}`}
onClick={() => setHost(h.name)}
>
{h.desc}
</button>
))}
</div>
<div className="mb-2 h-32 overflow-y-auto bg-black bg-opacity-40 p-2 rounded text-pink-200">
{history.map((msg, i) => (
<div key={i}>
<span className={`font-bold ${msg.role === "ai" ? "text-pink-300" : "text-lime-400"}`}>
{msg.name}:
</span>{" "}
{msg.content}
</div>
))}
{loading && <div className="italic text-pink-400">AI is thinking...</div>}
</div>
<div className="flex">
<input
className="flex-1 bg-gray-800 border border-pink-500 px-3 py-1 rounded text-pink-200 mr-2"
value={input}
placeholder="Say something to the host…"
onChange={(e) => setInput(e.target.value)}
onKeyDown={e => e.key === "Enter" && sendMessage()}
disabled={loading}
/>
<button className="btn" onClick={sendMessage} disabled={loading}>
Send
</button>
</div>
</div>
);
}
