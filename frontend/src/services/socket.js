import { io } from "socket.io-client";

const socket = io(
    import.meta.env.BACKEND_SOCKET_URL,
    {
        withCredentials: true,
        autoConnect: false
    }
);

console.log("BACKEND_SOCKET_URL:", import.meta.env.BACKEND_SOCKET_URL);

export default socket;