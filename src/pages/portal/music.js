import Link from 'next/link';
import LiveJamWall from '../../components/LiveJamWall';
import PortalChat from '../../components/PortalChat';

export default function MusicPortal({ user }) {
return (
<div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-cyan-900 flex flex-col items-center justify-center">
<h2 className="text-4xl font-bold mb-4 text-cyan-200 drop-shadow-lg">🎶 Music Portal</h2>
<p className="mb-8 text-lg text-cyan-100">Join jam sessions, experience AI remixing, or just chill with evolving sounds.</p>
<div className="flex space-x-6">
<Link href="/" className="btn">⬅️ Back</Link>
<Link href="/portal/ai" className="btn">Meet the AI Host</Link>
<Link href="/portal/games" className="btn">Game Zone</Link>
</div>
<div className="mt-12 w-full max-w-xl">
<LiveJamWall portalId="music" user={user} />
<PortalChat portalId="music" user={user} />
</div>
</div>
);
}
