import Link from 'next/link';

export default function ArtWall() {
return (
<div className="min-h-screen bg-gradient-to-tr from-black via-green-900 to-green-400 flex flex-col items-center justify-center">
<h2 className="text-4xl font-bold mb-4 text-green-200 drop-shadow-lg">🎨 Art Wall</h2>
<p className="mb-8 text-lg text-green-100">
Remix the world. Draw, drop images, or generate AI art. Every mark leaves an echo.
</p>
<div className="flex space-x-6">
<Link href="/" className="btn">⬅️ Back</Link>
<Link href="/portal/games" className="btn">Game Zone</Link>
<Link href="/portal/ai" className="btn">AI Hosts</Link>
</div>
{/* TODO: Drop in a live drawing canvas, image drop, and AI art generator */}
<div className="mt-12 p-6 bg-black bg-opacity-60 backdrop-blur rounded-lg border-2 border-green-400 shadow-xl">
<h3 className="text-2xl text-green-300 mb-2 font-mono">Collaborative Canvas 🖌️</h3>
<p className="text-green-200 italic">Nothing on the canvas—yet. Make the first move.</p>
</div>
</div>
);
}
