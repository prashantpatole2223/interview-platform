import {
    Routes,
    Route,
    useLocation
} from "react-router-dom";

console.log(" APP LOADED");
    console.log("Current URL:", window.location.href);
    console.log("Current pathname:", window.location.pathname);
    console.log("Current location:", location);

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

import Profile from "./pages/Profile";

import Room from "./pages/Room";

import JoinRoom from "./pages/JoinRoom";

import YourRooms from "./pages/YourRooms";

import History from "./pages/History";


import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import RoomDetails from "./pages/RoomDetails";


export default function App() {

    const location = useLocation();

    const isRoomPage =
        location.pathname.startsWith("/room/");


    return (
        <>
            {!isRoomPage && <Navbar />}

            <Routes>

                {/* PUBLIC */}

                <Route
                    element={<PublicRoute />}
                >

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/signup"
                        element={<Signup />}
                    />

                </Route>


                {/* PROTECTED */}

                <Route
                    element={<ProtectedRoute />}
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/your-rooms"
                        element={<YourRooms />}
                    />

                    <Route
                        path="/history"
                        element={<History />}
                    />

                    <Route
                        path="/history/:roomId"
                        element={<RoomDetails />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/join-room"
                        element={<JoinRoom />}
                    />

                    <Route
                        path="/room/:roomCode"
                        element={<Room />}
                    />

                </Route>

            </Routes>
        </>
    );
}