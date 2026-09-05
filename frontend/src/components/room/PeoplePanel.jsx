import React from "react";

const PeoplePanel = ({
    user,
    room,
    participantConnected,
}) => {

    const participants =
        room?.participants || [];

    const currentUserId =
        String(
            user?._id ||
            user?.id ||
            ""
        );

    const currentUserEmail =
        user?.email ||
        "";


    /*
     * Room creator is always the interviewer.
     */
    const interviewerId =
        String(
            room?.createdBy?._id ||
            room?.createdBy?.id ||
            room?.createdBy ||
            ""
        );


    /*
     * Find the interviewer.
     */
    const interviewer =
        participants.find(
            (participant) =>
                String(
                    participant?.userId?._id ||
                    participant?.userId?.id ||
                    participant?.userId ||
                    ""
                ) === interviewerId
        );


    /*
     * Find the candidate.
     */
    const candidate =
        participants.find(
            (participant) =>
                participant !== interviewer
        );


    /*
     * Check whether a participant
     * is the currently logged-in user.
     */
    const isCurrentUser = (
        participant
    ) => {

        const participantId =
            String(
                participant?.userId?._id ||
                participant?.userId?.id ||
                participant?.userId ||
                ""
            );

        const participantEmail =
            participant?.userId?.email ||
            "";

        return (
            participantId === currentUserId ||
            (
                currentUserEmail &&
                participantEmail ===
                currentUserEmail
            )
        );
    };


    const interviewerIsYou =
        interviewer
            ? isCurrentUser(interviewer)
            : false;


    const candidateIsYou =
        candidate
            ? isCurrentUser(candidate)
            : false;


    const interviewerName =
        interviewer?.userId?.name ||
        room?.createdBy?.name ||
        "Interviewer";


    const candidateName =
        candidate?.userId?.name ||
        "Waiting for participant";


    const interviewerInitial =
        interviewerName
            .charAt(0)
            .toUpperCase();


    const candidateInitial =
        candidateName ===
        "Waiting for participant"
            ? "?"
            : candidateName
                .charAt(0)
                .toUpperCase();


    return (
        <div className="flex flex-col gap-3 p-4">

            {/* INTERVIEWER */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                        {interviewerInitial}
                    </div>

                    <div>

                        <p className="font-medium text-white">
                            {interviewerName}
                        </p>

                        <p className="text-sm text-gray-400">
                            {interviewerIsYou
                                ? "You • Interviewer"
                                : "Interviewer"}
                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-2">

                    <span
                        className={`h-2.5 w-2.5 rounded-full ${
                            interviewerIsYou ||
                            participantConnected
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}
                    />

                    <span className="text-xs text-gray-400">

                        {interviewerIsYou
                            ? "You"
                            : participantConnected
                                ? "Connected"
                                : "Waiting"}

                    </span>

                </div>

            </div>


            {/* CANDIDATE */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white font-semibold">
                        {candidateInitial}
                    </div>

                    <div>

                        <p className="font-medium text-white">
                            {candidateName}
                        </p>

                        <p className="text-sm text-gray-400">

                            {candidate
                                ? candidateIsYou
                                    ? "You • Candidate"
                                    : "Candidate"
                                : "Waiting for participant"}

                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-2">

                    <span
                        className={`h-2.5 w-2.5 rounded-full ${
                            candidateIsYou ||
                            (
                                candidate &&
                                participantConnected
                            )
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}
                    />

                    <span className="text-xs text-gray-400">

                        {candidateIsYou
                            ? "You"
                            : candidate
                                ? participantConnected
                                    ? "Connected"
                                    : "Waiting"
                                : "Waiting"}

                    </span>

                </div>

            </div>

        </div>
    );
};

export default PeoplePanel;