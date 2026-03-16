import { useState, useEffect } from "react";
import { usePortalSocket } from "../hooks/usePortalSocket";

export default function PortalChat({ portalId, user }) {
const { action, sendAction } = usePortalSocket(portalId, user);
const [input, setInput] = useState("");
const [messages, setMessages] = useState([]);

useEffect(() => {
if (action && action.type === "chat") {
setMessages((prev) => [...prev, { from: action.from, text: action.text }]);
}
}, [action]);

function handleSend() {
if (input.trim()) {
sendAction({ type: "chat", from: user.name, text: input });
setInput("");
}
}

return (
<div className="w-full p-4 mt-6 bg-black bg-opacity-60 rounded-lg shadow-lg">
<h4 className="text-lg font-bold text-blue-300 mb-2">Portal Chat 💬</h4>
<div className="h-32 overflow-y-auto bg-gray-900 bg-opacity-60 mb-2 p-2 rounded">
{messages.map((msg, idx) => (
<div key={idx} className="mb-1 text-blue-200">
<span className="font-bold">{msg.from}:</span> {msg.text}
</div>
))}
</div>
<div className="flex">
<input
className="flex-1 bg-gray-800 border border-blue-500 px-3 py-1 rounded text-blue-200 mr-2"
value={input}
placeholder="Chat with everyone in this portal…"
onChange={e => setInput(e.target.value)}
onKeyDown={e => e.key === "Enter" && handleSend()}
/>
<button className="btn" onClick={handleSend}>Send</button>
</div>
</div>
);
}
