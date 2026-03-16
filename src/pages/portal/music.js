import Link from 'next/link';

export default function MusicPortal() {
return (
<div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-cyan-900 flex flex-col items-center justify-center">
<h2 className="text-4xl font-bold mb-4 text-cyan-200 drop-shadow-lg">🎶 Music Portal</h2>
<p className="mb-8 text-lg text-cyan-100">Join jam sessions, experience AI remixing, or just chill with evolving sounds.</p>
<div className="flex space-x-6">
<Link href="/" className="btn">⬅️ Back</Link>
<Link href="/portal/ai" className="btn">Meet the AI Host</Link>
<Link href="/portal/games" className="btn">Game Zone</Link>
</div>
{/* TODO: Add audio input/mixer, live visualizer, music room list, and interactive collab features */}
<div className="mt-12 p-6 bg-black bg-opacity-60 backdrop-blur rounded-lg border-2 border-cyan-400 shadow-xl">
<h3 className="text-2xl text-cyan-300 mb-2 font-mono">Live Jam Wall 🌐</h3>
<p className="text-cyan-200 italic">No sessions yet. Be the first to start a jam, or import a track!</p>
</div>
</div>
);
}
