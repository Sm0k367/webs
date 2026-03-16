import { useState, useEffect } from "react";

const randomAdjectives = [
"Savage", "Neon", "Unknown", "Dream", "Quantum", "Noisy", "Shadow", "Laser", "Echo", "Hype"
];
const randomNouns = [
"Tiger", "Phantom", "Bit", "Vortex", "Ninja", "Vision", "Pixel", "Synth", "Meme", "Wolf"
];
const avatars = [
"🦾", "🧠", "🦊", "🐉", "🐍", "👾", "🎧", "🚀", "🦄", "🔥"
];

function randomName() {
return (
randomAdjectives[Math.floor(Math.random() * randomAdjectives.length)] +
avatars[Math.floor(Math.random() * avatars.length)] +
randomNouns[Math.floor(Math.random() * randomNouns.length)]
);
}

function randomAvatar() {
return avatars[Math.floor(Math.random() * avatars.length)];
}

export default function QuickLogin({ onLogin }) {
const [username, setUsername] = useState("");
const [avatar, setAvatar] = useState("");

useEffect(() => {
setUsername(randomName());
setAvatar(randomAvatar());
}, []);

function handleLogin(e) {
e.preventDefault();
if (onLogin) onLogin({ name: username, avatar, id: username.toLowerCase().replace(/[^a-z0-9]/g, '') });
}

return (
<form
onSubmit={handleLogin}
className="max-w-xs mx-auto bg-gray-900 border-2 border-lime-400 rounded-xl p-6 flex flex-col items-center"
>
<div className="text-5xl mb-2">{avatar}</div>
<label className="text-lime-300 font-mono mb-1">Nickname</label>
<input
className="mb-2 text-center px-2 py-1 rounded border border-lime-400 bg-gray-800 text-lime-200"
value={username}
onChange={e => setUsername(e.target.value)}
autoFocus
maxLength={18}
/>
<label className="text-lime-300 font-mono mb-1">Avatar</label>
<div className="mb-4 flex gap-2">
{avatars.map((a) => (
<button
type="button"
key={a}
onClick={() => setAvatar(a)}
className={`text-2xl px-2 py-1 rounded ${avatar === a ? "bg-lime-500" : "bg-gray-800"}`}
>
{a}
</button>
))}
</div>
<button className="btn w-full" type="submit">Enter Nexus</button>
</form>
);
}
