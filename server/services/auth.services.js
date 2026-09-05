import User from "../models/users.js";
import Session from "../models/session.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupUser = async (body) => {
    const {name, email, password} = body;

    const normalizedEmail = email.toLowerCase();

    const exists = await User.findOne({email: normalizedEmail});
    if(exists){
        const err = new Error("User already exists");
        err.statusCode = 409;
        throw err;
    }

    const hashed = await hashPassword(password);
    return User.create({
        name,
        email: normalizedEmail,
        password: hashed
    });

}

export const loginUser = async (body, meta) => {
    const {email, password} = body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({email: normalizedEmail});
    if(!user){
        const err = new Error("Invalid email or password");
        err.statusCode = 401;
        throw err;
    }

    const match = await comparePassword(password, user.password);
    if(!match){
        const err = new Error("Invalid email or password");
        err.statusCode = 401;
        throw err;
    }

    const jti = crypto.randomUUID();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await Session.create({
        userId: user._id,
        jti,
        token: hashedRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        device: meta.device,
        ip: meta.ip,
        userAgent: meta.userAgent
    })

    return { accessToken, refreshToken};
}

export const refreshSession = async (refreshToken, meta) => {
    if(!refreshToken){
        const err = new Error("Unauthorized");
        err.statusCode = 401;
        throw err;
    }

    let decoded;
    try {
        decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        )
    } catch (error) {
        const err = new Error("Invalid session");
        err.statusCode = 401;
        throw err;
    }

    const session = await Session.findOne({jti: decoded.jti});

    if(!session){
        const err = new Error("Invalid session");
        err.statusCode = 401;
        throw err;
    }

    const isValid = await bcrypt.compare(refreshToken, session.token);
    if(!isValid){
        const err = new Error("Invalid refresh token");
        err.statusCode = 401;
        throw err;
    }

    await Session.deleteOne({_id: session._id});

    const user = await User.findById(decoded.userId).select("_id");
    const newJti = crypto.randomUUID();
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user, newJti);

    const hashedNewRefresh = await bcrypt.hash(newRefreshToken, 10);

    await Session.create({
        userId: user._id,
        jti: newJti,
        token: hashedNewRefresh,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        device: meta.device,
        ip: meta.ip,
        userAgent: meta.userAgent
    })

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    }
}

export const logoutSession = async (refreshToken) => {
    // If there is no refresh token,
    // user is already effectively logged out.
    if (!refreshToken) {
        return;
    }

    let decoded;

    try {
        decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );
    } catch (error) {
        // Token is invalid/expired.
        // We still allow logout to complete.
        return;
    }

    await Session.deleteOne({
        jti: decoded.jti
    });
};


export const logoutAllSessions = async (userId) => {
    await Session.deleteMany({
        userId
    });
};