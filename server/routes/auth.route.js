import express from "express";

import {
    loginSchema,
    signupSchema
} from "../validators/auth.validator.js";

import {
    loginValidate,
    signupValidate
} from "../middleware/validateMiddleware.js";

import {
    authMiddleware
} from "../middleware/auth.middleware.js";

import {
    login,
    refresh,
    signup,
    logout,
    logoutAll
} from "../controllers/auth.controller.js";

const authRouter = express.Router();


authRouter.post(
    "/signup",
    signupValidate(signupSchema),
    signup
);

authRouter.post(
    "/login",
    loginValidate(loginSchema),
    login
);

authRouter.post(
    "/refresh",
    refresh
);

authRouter.post(
    "/logout",
    logout
);

authRouter.post(
    "/logout-all",
    authMiddleware,
    logoutAll
);

authRouter.get(
    "/me",
    authMiddleware,
    (req, res) => {
        return res.status(200).json({
            success: true,
            message: "User is authenticated"
        });
    }
);

export default authRouter;