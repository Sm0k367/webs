import Link from 'next/link';
import PresenceBar from '../../components/PresenceBar';
import { usePortalSocket } from '../../hooks/usePortalSocket';

// TEMP: Hardcoded user for demo
const demoUser = { name: "DemoUser", id: "demo1" };

export default function GameZone() {
const { users } = usePortalSocket("games", demoUser);

return (
<div className="min-h-screen bg-gradient-to-tr from-black via-yellow-900 to-yellow-400 flex flex-col items-center justify-center">
<h2 className="text-4xl font-bold mb-4 text-yellow-200 drop-shadow-lg">🎮 Game Zone</h2>
<p className="mb-8 text-lg text-yellow-100">Launch games, play for high scores, or invent wild rules for the AI to remix on the fly.</p>
<div className="flex space-x-6">
<Link href="/" className="btn">⬅️ Back</Link>
<Link href="/portal/music" className="btn">Music Portal</Link>
<Link href="/portal/ai" className="btn">AI Hosts</Link>
</div>
<div className="mt-12 w-full max-w-xl">
<PresenceBar users={users} color="yellow" />
<div className="p-6 bg-black bg-opacity-60 backdrop-blur rounded-lg border-2 border-yellow-400 shadow-xl">
<h3 className="text-2xl text-yellow-300 mb-2 font-mono">Arcade Lobby 🕹️</h3>
<p className="text-yellow-200 italic">Games are spawning soon. Submit your own or challenge the AI!</p>
</div>
</div>
</div>
);
}
