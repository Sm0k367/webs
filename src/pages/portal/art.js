import Link from 'next/link';
import CollaborativeDraw from '../../components/CollaborativeDraw';

export default function ArtWall({ user }) {
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
<div className="mt-12 w-full max-w-xl">
<CollaborativeDraw portalId="art" user={user} />
</div>
</div>
);
}
