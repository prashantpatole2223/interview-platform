import { io } from "socket.io-client";

const socket = io(
    import.meta.env.VITE_BACKEND_SOCKET_URL,
    {
        withCredentials: true,
        autoConnect: false
    }
);

console.log("VITE_BACKEND_SOCKET_URL:", import.meta.env.VITE_BACKEND_SOCKET_URL);

export default socket;