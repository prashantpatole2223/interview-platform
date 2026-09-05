import mongoose from "mongoose";


/*
 * ACTIVE PARTICIPANT
 *
 * These are users currently inside
 * the room.
 */
const participantSchema =
    new mongoose.Schema(
        {
            userId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },

            role: {
                type: String,
                enum: [
                    "interviewer",
                    "candidate"
                ],
                required: true
            },

            joinedAt: {
                type: Date,
                default: Date.now
            }
        },
        {
            _id: false
        }
    );


/*
 * PERMANENT PARTICIPANT HISTORY
 *
 * This remains even after the user
 * leaves the room.
 */
const participantHistorySchema =
    new mongoose.Schema(
        {
            userId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },

            role: {
                type: String,
                enum: [
                    "interviewer",
                    "candidate"
                ],
                required: true
            },

            joinedAt: {
                type: Date,
                default: Date.now
            },

            leftAt: {
                type: Date,
                default: null
            }
        },
        {
            _id: false
        }
    );


const roomSchema =
    new mongoose.Schema(
        {
            roomCode: {
                type: String,
                required: true,
                unique: true
            },


            createdBy: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },


            /*
             * Current active users.
             */
            participants: [
                participantSchema
            ],


            /*
             * Permanent history.
             */
            participantHistory: [
                participantHistorySchema
            ],


            status: {
                type: String,
                enum: [
                    "waiting",
                    "ongoing",
                    "ended"
                ],
                default: "waiting"
            }
        },
        {
            timestamps: true
        }
    );


export default mongoose.model(
    "Room",
    roomSchema
);