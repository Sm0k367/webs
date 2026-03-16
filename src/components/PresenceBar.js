export default function PresenceBar({ users = [], color = "lime" }) {
return (
<div className={`flex items-center gap-2 mb-4`}>
<span className={`font-mono text-${color}-300`}>Online:</span>
{users.length === 0 ? (
<span className={`text-${color}-200`}>No one yet</span>
) : (
users.map((u, i) => (
<span
key={i}
className={`bg-${color}-900 px-2 py-1 rounded text-${color}-100 shadow`}
title={typeof u === 'string' ? u : u.name}
>
{typeof u === 'string' ? u : u.name}
</span>
))
)}
</div>
);
}
