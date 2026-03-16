// Simple in-memory demo (for prod, use DB or Socket.IO)
let liveUsers = []; // [{ userId, name, portal, lastSeen }]

export default function handler(req, res) {
if (req.method === "GET") {
// Purge users inactive for >45s
const now = Date.now();
liveUsers = liveUsers.filter(user => now - user.lastSeen < 45000);
return res.status(200).json(liveUsers);
}
if (req.method === "POST") {
const { userId, name, portal } = req.body;
if (!userId || !name || !portal) return res.status(400).json({ error: "Missing data." });
const idx = liveUsers.findIndex(u => u.userId === userId);
const entry = { userId, name, portal, lastSeen: Date.now() };
if (idx > -1) {
liveUsers[idx] = entry;
} else {
liveUsers.push(entry);
}
return res.status(200).json(entry);
}
res.setHeader("Allow", ["GET", "POST"]);
res.status(405).end(`Method ${req.method} Not Allowed`);
}
