import crypto from "crypto";
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

export const handleResponse = (res, statusCode, message, data, token) => 
    res.status(ststusCode).json({
        message,
        data,
        token,
    });

export const generateToken = (payload) => 
    jwt.sign(payload, process.env.TOKEN_PASSWORD);

export const decodeToken = (token) => 
    jwt.decode(token, process.env.TOKEN_PASSWORD);

export const generateStaffPassword = () =>
    crypto.randomBytes(10).toString("hex");

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

export const generateResetToken = () => crypto.randomBytes(32).toString("hex");

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next;
    }
    const extractedErrors = [];
}