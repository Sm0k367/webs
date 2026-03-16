const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3001;
const httpServer = createServer();
const io = new Server(httpServer, {
cors: { origin: "*" }
});

let portals = {}; // { portalId: { users: [userId], state: {...} } }

io.on("connection", (socket) => {
let currentPortal = null;
let userId = null;

socket.on("join-portal", ({ portalId, user }) => {
if (currentPortal) socket.leave(currentPortal);
currentPortal = portalId;
userId = user?.id || socket.id;
socket.join(currentPortal);

if (!portals[currentPortal]) portals[currentPortal] = { users: [], state: {} };
if (!portals[currentPortal].users.includes(userId)) portals[currentPortal].users.push(userId);

io.to(currentPortal).emit("portal-users", portals[currentPortal].users);
});

socket.on("portal-action", ({ portalId, action }) => {
if (!portals[portalId]) portals[portalId] = { users: [], state: {} };
// Optionally update shared state, then…
io.to(portalId).emit("portal-action", action);
});

socket.on("disconnect", () => {
if (currentPortal && userId && portals[currentPortal]) {
portals[currentPortal].users = portals[currentPortal].users.filter(u => u !== userId);
io.to(currentPortal).emit("portal-users", portals[currentPortal].users);
}
});
});

httpServer.listen(PORT, () => {
console.log(`🔌 Neural Nexus Socket.IO server running on :${PORT}`);
});
