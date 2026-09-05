import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { user, userProfile } from "../controllers/user.controller.js";


const userRouter = express.Router();

userRouter.use(authMiddleware);

userRouter.get("", user);
userRouter.get("/profile", userProfile);

export default userRouter;