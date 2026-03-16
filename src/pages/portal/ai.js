import Link from 'next/link';

export default function AIHosts() {
return (
<div className="min-h-screen bg-gradient-to-tl from-black via-fuchsia-950 to-pink-600 flex flex-col items-center justify-center">
<h2 className="text-4xl font-bold mb-4 text-pink-200 drop-shadow-lg">🤖 AI Hosts & Possessions</h2>
<p className="mb-8 text-lg text-pink-100">
Step into the world of live AI hosts: narrators, remixers, meta-trolls, and unpredictable guides. Become one or let them play you.
</p>
<div className="flex space-x-6">
<Link href="/" className="btn">⬅️ Back</Link>
<Link href="/portal/art" className="btn">Art Wall</Link>
<Link href="/portal/music" className="btn">Music Portal</Link>
</div>
{/* TODO: Integrate live AI chat, “possess host” button, AI mood wall */}
<div className="mt-12 p-6 bg-black bg-opacity-60 backdrop-blur rounded-lg border-2 border-pink-400 shadow-xl">
<h3 className="text-2xl text-pink-300 mb-2 font-mono">Host Roster 🤹</h3>
<ul className="space-y-2 text-pink-200">
<li>SmokeStream (trickster DJ, chaos enabler)</li>
<li>Visage (visual remix monster)</li>
<li>Oracle (hyper-creepy narrator/guide)</li>
<li className="italic">Your name here?</li>
</ul>
</div>
</div>
);
}
