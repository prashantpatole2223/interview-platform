import {
    signupUser, loginUser, refreshSession, logoutSession,
    logoutAllSessions
} from "../services/auth.services.js"

export const signup = async (req, res) => {
    try {
        await signupUser(req.body);
        return res.status(201).json({
            success: true,
            message: "You are registered successfully"
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "server error"
        })
    }
}

export const login = async (req, res) => {
    try {
        const data = await loginUser(req.body, {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            device: req.headers["sec-ch-ua-platform"]
        });

        res.cookie("accessToken", data.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "User loggedIn successfully"
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "server error"
        })
    }
}

export const refresh = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = await refreshSession(req.cookies.refreshToken, {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            device: req.headers["sec-ch-ua-platform"]
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(error.statusCode || 401).json({
            success: false,
            message: error.message || "Unauthorized"
        });
    }
}

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        await logoutSession(refreshToken);

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
};

export const logoutAll = async (req, res) => {
    try {
        await logoutAllSessions(req.user.id);

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out from all devices successfully"
        });

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
};