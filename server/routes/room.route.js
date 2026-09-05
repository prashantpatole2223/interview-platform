import express from "express";


import {
    createRoom,
    joinRoom,
    leaveRoom,
    roomDetails,
    getMyRooms
} from "../controllers/room.controller.js";


import {
    authMiddleware
} from "../middleware/auth.middleware.js";


const roomRouter =
    express.Router();


/*
 * Every room endpoint requires
 * authentication.
 */
roomRouter.use(
    authMiddleware
);


/*
 * Create room
 */
roomRouter.post(
    "/create",
    createRoom
);


/*
 * Join room
 */
roomRouter.post(
    "/join",
    joinRoom
);


/*
 * Leave room
 */
roomRouter.post(
    "/leave",
    leaveRoom
);


/*
 * IMPORTANT:
 *
 * /my-rooms MUST come before
 * /:roomCode
 *
 * Otherwise Express could
 * interpret "my-rooms" as
 * a roomCode.
 */
roomRouter.get(
    "/my-rooms",
    getMyRooms
);


/*
 * Room details
 */
roomRouter.get(
    "/:roomCode",
    roomDetails
);


export default roomRouter;