import express from "express";
import AuthCheck from "../helpers/middleware";
import { validate } from "../helpers/util"
import UserServices from "./service";
import validateBody from "./validator"

const router = express.Router();

router.post("/login", UserServices.loginUser);
router.post("/register", UserServices.registerUser);
router.post("/forgot-password", UserServices.forgotPassword);
router.post("/reset-password", UserServices.resetPassword);

router.post(
    "/change-Password",
    AuthCheck.checkAuthstatus,
    UserServices.changePassword
);

export default router;