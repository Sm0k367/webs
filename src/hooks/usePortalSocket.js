import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export function usePortalSocket(portalId, user) {
const [users, setUsers] = useState([]);
const [action, setAction] = useState(null);
const socketRef = useRef(null);

useEffect(() => {
const socket = io(process.env.NEXT_PUBLIC_WS_URL, { transports: ['websocket'] });
socketRef.current = socket;

socket.emit("join-portal", { portalId, user });

socket.on("portal-users", setUsers);
socket.on("portal-action", setAction);

return () => {
socket.disconnect();
};
}, [portalId, user]);

// Fire a custom action to rest of the portal
function sendAction(payload) {
socketRef.current?.emit("portal-action", { portalId, action: payload });
}

return { users, action, sendAction };
}
