import crypto from "crypto";

import Room from "../models/rooms.js";


/*
 * CREATE ROOM
 */
export const createRoomService = async (
    user
) => {

    const roomCode =
        crypto
            .randomBytes(3)
            .toString("hex")
            .toUpperCase();


    await Room.create({

        roomCode,

        createdBy:
            user.id,

        participants: [
            {
                userId:
                    user.id,

                role:
                    "interviewer"
            }
        ],

        participantHistory: [
            {
                userId:
                    user.id,

                role:
                    "interviewer"
            }
        ],

        status:
            "waiting"
    });


    return roomCode;
};


/*
 * JOIN ROOM
 */
export const joinRoomService = async (
    userInfo,
    roomCode
) => {

    const room =
        await Room.findOne({
            roomCode
        });


    if (!room) {

        const err =
            new Error(
                "room not found"
            );

        err.statusCode =
            404;

        throw err;
    }


    if (
        room.status ===
        "ended"
    ) {

        const err =
            new Error(
                "room is ended"
            );

        err.statusCode =
            403;

        throw err;
    }


    const userId =
        userInfo.id;


    /*
     * Is user already actively
     * inside the room?
     */
    const participantExists =
        room.participants.some(
            (participant) =>
                participant.userId
                    .toString() ===
                userId.toString()
        );


    if (!participantExists) {

        const role =
            room.createdBy.toString() ===
            userId.toString()
                ? "interviewer"
                : "candidate";


        /*
         * Add to active participants.
         */
        room.participants.push({
            userId,
            role
        });


        /*
         * Check permanent history.
         */
        const historyExists =
            room.participantHistory.some(
                (participant) =>
                    participant.userId
                        .toString() ===
                    userId.toString()
            );


        /*
         * Add only once to permanent
         * participant history.
         */
        if (!historyExists) {

            room.participantHistory.push({
                userId,
                role
            });
        }


        /*
         * Candidate joining means
         * interview starts.
         */
        if (
            room.status === "waiting" &&
            role === "candidate"
        ) {

            room.status =
                "ongoing";
        }


        await room.save();
    }


    return room;
};


/*
 * LEAVE ROOM
 */
export const leaveRoomService = async (
    userInfo,
    body
) => {

    const userId =
        userInfo.id;

    const roomCode =
        body.roomCode;


    const room =
        await Room.findOne({
            roomCode
        });


    if (!room) {

        const err =
            new Error(
                "room not found"
            );

        err.statusCode =
            404;

        throw err;
    }


    /*
     * Find active participant.
     */
    const activeParticipant =
        room.participants.find(
            (participant) =>
                participant.userId
                    .toString() ===
                userId.toString()
        );


    /*
     * If user is not currently
     * inside, nothing to remove.
     */
    if (!activeParticipant) {

        return;
    }


    /*
     * Find history record.
     */
    const historyParticipant =
        room.participantHistory.find(
            (participant) =>
                participant.userId
                    .toString() ===
                userId.toString()
        );


    /*
     * Record when the user left.
     */
    if (historyParticipant) {

        historyParticipant.leftAt =
            new Date();
    }


    /*
     * Remove from active users.
     */
    room.participants =
        room.participants.filter(
            (participant) =>
                participant.userId
                    .toString() !==
                userId.toString()
        );


    /*
     * Nobody remains.
     */
    if (
        room.participants.length === 0
    ) {

        room.status =
            "ended";
    }


    await room.save();
};


/*
 * GET ROOM DETAILS
 */
export const roomDetailsService = async (
    roomCode
) => {

    const room =
        await Room.findOne({
            roomCode
        })
            .populate(
                "createdBy",
                "name email"
            )
            .populate(
                "participants.userId",
                "name email"
            )
            .populate(
                "participantHistory.userId",
                "name email"
            );


    if (!room) {

        const err =
            new Error(
                "room not found"
            );

        err.statusCode =
            404;

        throw err;
    }


    return room;
};


/*
 * GET MY ROOMS
 *
 * Includes:
 *
 * 1. Rooms created by me
 * 2. Rooms I participated in
 */
export const getMyRoomsService = async (
    userId
) => {

    const rooms =
        await Room.find({
            $or: [
                {
                    createdBy:
                        userId
                },
                {
                    "participantHistory.userId":
                        userId
                }
            ]
        })
            .populate(
                "createdBy",
                "name email"
            )
            .populate(
                "participantHistory.userId",
                "name email"
            )
            .sort({
                createdAt:
                    -1
            });


    return rooms;
};