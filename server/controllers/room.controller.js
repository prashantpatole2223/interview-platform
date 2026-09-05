import {
    createRoomService,
    joinRoomService,
    leaveRoomService,
    roomDetailsService,
    getMyRoomsService
} from "../services/room.service.js";


/*
 * CREATE ROOM
 */
export const createRoom = async (
    req,
    res
) => {

    try {

        const roomCode =
            await createRoomService(
                req.user
            );


        return res.status(201).json({

            success: true,

            roomCode

        });

    } catch (error) {

        console.error(
            "createRoom error:",
            error
        );


        return res.status(
            error.statusCode || 500
        ).json({

            success: false,

            message:
                error.message ||
                "server error"

        });
    }
};


/*
 * JOIN ROOM
 */
export const joinRoom = async (
    req,
    res
) => {

    try {

        const {
            roomCode
        } = req.body;


        if (!roomCode) {

            return res.status(400).json({

                success: false,

                message:
                    "roomCode is required"

            });
        }


        const data =
            await joinRoomService(
                req.user,
                roomCode
                    .trim()
                    .toUpperCase()
            );


        return res.status(200).json({

            success: true,

            data

        });

    } catch (error) {

        return res.status(
            error.statusCode || 500
        ).json({

            success: false,

            message:
                error.message ||
                "server error"

        });
    }
};


/*
 * LEAVE ROOM
 */
export const leaveRoom = async (
    req,
    res
) => {

    try {

        await leaveRoomService(
            req.user,
            req.body
        );


        return res.status(200).json({

            success: true,

            message:
                "Left room successfully"

        });

    } catch (error) {

        return res.status(
            error.statusCode || 500
        ).json({

            success: false,

            message:
                error.message ||
                "server error"

        });
    }
};


/*
 * ROOM DETAILS
 */
export const roomDetails = async (
    req,
    res
) => {

    try {

        const {
            roomCode
        } = req.params;


        const room =
            await roomDetailsService(
                roomCode
                    .trim()
                    .toUpperCase()
            );


        return res.status(200).json({

            success: true,

            data: room

        });

    } catch (error) {

        return res.status(
            error.statusCode || 500
        ).json({

            success: false,

            message:
                error.message ||
                "server error"

        });
    }
};


/*
 * GET MY ROOMS
 */
export const getMyRooms = async (
    req,
    res
) => {

    try {

        const rooms =
            await getMyRoomsService(
                req.user.id
            );


        return res.status(200).json({

            success: true,

            data: rooms

        });

    } catch (error) {

        console.error(
            "getMyRooms error:",
            error
        );


        return res.status(
            error.statusCode || 500
        ).json({

            success: false,

            message:
                error.message ||
                "server error"

        });
    }
};