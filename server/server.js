import mongoose from "mongoose";
import "dotenv/config";
import app from "./app.js";

import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./socket.js";

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB is connected"))
.catch((err) => console.log(err));

const PORT = 8084;

/*
   Create normal HTTP server manually
*/
const server = createServer(app);

/*
   Attach Socket.IO
*/
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

/*
   Socket connection
*/
initializeSocket(io);

/*
   Start server
*/
server.listen(PORT, () => {
    console.log("server started on", PORT);
});