import User from "../models/users.js";

export const user = async (req, res) => {
    try {
        const id = req.user.id;
        const data = await User.findById(id).select("email name");
        return res.status(200).json({
            success: true,
            data,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || ("server failed")
        })
    }
}

export const userProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const data = await User.findById(id).select("email name");
        return res.status(200).json({
            success: true,
            data,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || ("server failed")
        })
    }
}