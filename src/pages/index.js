import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
return (
<>
<Head>
<title>Neural Nexus</title>
<meta name="description" content="A living world of AI, music, games, art, and meta-hacking." />
</Head>
<main className="min-h-screen bg-black text-lime-300 flex flex-col items-center justify-center">
<h1 className="text-5xl font-black drop-shadow">Neural Nexus</h1>
<p className="mt-6 text-2xl">Where worlds collide: jump into music, games, art, and AI chaos.</p>
<div className="mt-10 space-x-4">
<Link href="/portal/music" className="btn">Music Portal</Link>
<Link href="/portal/games" className="btn">Game Zone</Link>
<Link href="/portal/ai" className="btn">AI Hosts</Link>
<Link href="/portal/art" className="btn">Art Wall</Link>
</div>
<p className="mt-20 italic text-lg text-lime-400">Live, create, remix. <span className="animate-pulse">∞</span></p>
</main>
</>
);
}
