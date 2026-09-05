export const initializeSocket = (io) => {
    io.on("connection", (socket) => {

        console.log("User connected:", socket.id);

        /*
         * JOIN ROOM
         */
        socket.on("join-room", (roomCode) => {

            if (!roomCode) {
                return;
            }

            socket.join(roomCode);

            socket.data.roomCode = roomCode;

            console.log(
                `Socket ${socket.id} joined room ${roomCode}`
            );

            /*
             * Get current users.
             */
            const room =
                io.sockets.adapter.rooms.get(roomCode);

            const participantCount =
                room ? room.size : 0;

            /*
             * Tell the newly joined user
             * how many users are currently
             * inside the realtime room.
             */
            socket.emit("room-users", {
                participantCount
            });

            /*
             * Tell existing users that
             * somebody joined.
             *
             * IMPORTANT:
             * Only existing users receive this.
             *
             * Therefore:
             * A is already inside.
             * B joins.
             * A receives user-joined.
             * B does NOT.
             *
             * A creates the WebRTC offer.
             */
            socket.to(roomCode).emit(
                "user-joined",
                {
                    socketId: socket.id
                }
            );
        });


        /*
         * WEBRTC OFFER
         */
        socket.on("offer", (data) => {

            if (
                !data?.targetSocketId ||
                !data?.offer
            ) {
                return;
            }

            io.to(data.targetSocketId).emit(
                "offer",
                {
                    offer: data.offer,
                    senderSocketId: socket.id
                }
            );
        });


        /*
         * WEBRTC ANSWER
         */
        socket.on("answer", (data) => {

            if (
                !data?.targetSocketId ||
                !data?.answer
            ) {
                return;
            }

            io.to(data.targetSocketId).emit(
                "answer",
                {
                    answer: data.answer,
                    senderSocketId: socket.id
                }
            );
        });


        /*
         * WEBRTC ICE CANDIDATE
         */
        socket.on("ice-candidate", (data) => {

            if (
                !data?.targetSocketId ||
                !data?.candidate
            ) {
                return;
            }

            io.to(data.targetSocketId).emit(
                "ice-candidate",
                {
                    candidate: data.candidate,
                    senderSocketId: socket.id
                }
            );
        });


        /*
         * SEND MESSAGE
         */
        socket.on("send-message", (data) => {

            const {
                roomCode,
                message
            } = data || {};

            if (
                !roomCode ||
                !message ||
                !message.trim()
            ) {
                return;
            }

            io.to(roomCode).emit(
                "receive-message",
                {
                    socketId: socket.id,
                    message: message.trim(),
                    createdAt: new Date()
                }
            );
        });


        /*
         * EXPLICIT LEAVE ROOM
         */
        socket.on("leave-room", (roomCode) => {

            if (!roomCode) {
                return;
            }

            socket.to(roomCode).emit(
                "user-left",
                {
                    socketId: socket.id
                }
            );

            socket.leave(roomCode);

            socket.data.roomCode = null;

            console.log(
                `Socket ${socket.id} left room ${roomCode}`
            );
        });


        /*
         * DISCONNECT
         */
        socket.on("disconnecting", () => {

            const roomCode =
                socket.data.roomCode;

            if (!roomCode) {
                return;
            }

            /*
             * Notify the other participant.
             *
             * disconnecting is used instead of
             * disconnect because Socket.IO has
             * not removed the socket from rooms yet.
             */
            socket.to(roomCode).emit(
                "user-left",
                {
                    socketId: socket.id
                }
            );
        });


        socket.on("disconnect", () => {

            console.log(
                "User disconnected:",
                socket.id
            );
        });

    });
};