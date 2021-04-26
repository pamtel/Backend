import crypto from "crypto";
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

export const handleResponse = (res, statusCode, message, data, token) => 
    res.status(statusCode).json({
        message,
        data,
        token,
    });

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.TOKEN_PASSWORD);
}

export const decodeToken = (token) => 
    jwt.decode(token, process.env.TOKEN_PASSWORD);

export const generateStaffPassword = () =>
    crypto.randomBytes(10).toString("hex");

// Generate number for configuration (OTP)
export const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Reset Password
export const generateResetToken = () => crypto.randomBytes(32).toString("hex");

// validation on all requests
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next;
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

export const rolesAcceptable = (url, roles) => {
    switch (url) {
        case (url = "/staff"):
            return roles.includes("staff");
        case (url = "/admin"):
            return roles.includes("admin");
    }
};

export const calculateRepaymentAmount = (principal, rate, tenure) => {
    return principal * Math.pow(1 + rate, tenure);
};

export const loanSummary = (loan, interestRate) => {
    const repaymentAmount = calculateRepaymentAmount(
        loan.amount,
        interestRate,
        loan.tenure
    );
    const date = new Date();
    let nextPaymentDate = new Date(date.setMonth(date.getMonth() + 1));
    return {
        totalRepayment: Number(repaymentAmount.toFixed(0)),
        monthlyPayments: Number((repaymentAmount / loan.tenure).toFixed(0)),
        nextPaymentDate: nextPaymentDate.toLocaleDateString(),
    }
}