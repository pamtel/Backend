import bcrypt from "bcryptjs";
import { generateToken, handleResponse } from '../helpers/util';
import Users from "../user/user_model";

class UserServices {

    static async loginUser(req, res) {
        const { email, password } = req.body;

        try {
            let user = await Users.findOne({ email });
            if (!user) {
                return handleResponse(res, 401, "Invalid Credentials");
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return handleResponse(res, 401, "Invalid Credentials");
            }
            const token = generateToken({
                _id: user._id,
                role: user._doc.role,
                email: user._doc.email,
                passwordResetRequired: user._doc.passwordResetRequired,
            });
            return handleResponse(res, 200, "Successfully login", {
                ...user._doc,
                _id: user._id,
                password: undefined,
                token,
            });
        } catch (error) {
            return handleResponse(res, 500, "Some error occured");
        }
    }

    static async registerUser(req, res) {
        try {
            const {
                full_name,
                title,
                description,
                email,
                staffId,
                role,
                profile_picture,
                phone_number,
                account_no,
                password,
                passwordResetToken,
                passwordResetExpires,
            } = req.body;

            const user = new Users({
                full_name,
                title,
                description,
                email,
                staffId,
                role,
                profile_picture,
                phone_number,
                account_no,
                password,
                passwordResetToken,
                passwordResetExpires,
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);
            await user.save();
            let token = generateToken({ ...user.doc });
            res.status(200).json({
                user: { ...user.doc, token },
            });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async forgotPassword(req, res) {
        const { email } = req.body;

        try {
            let user = await Users.findOne({ email });
            if (!user) {
                return handleResponse(res, 401, "User with email address not found");
            }
            const token = generateToken({
                role: user._doc.role,
                email: user._doc.email,
                passwordResetRequired: user._doc.passwordResetRequired,
                tokenType: "reset",
            });

            await Users.findOneAndUpdate(
                { email },
                {
                    $set: {
                        passwordResetToken: token,
                        passwordResetRequired: true,
                    },
                    new: true,
                    upsert: true,
                }
            );
            //Front end URL
            const resetURL = `${req.protocol}: //${req.get(
                "host"
            )}/verifyResetToken?token=${token}&userID=${user._id}`;

            //send password reset to user email
            return handleResponse(res, 200, "Password reset link sent to your mail", {
                resetURL,
                password: undefined,
                token,
            });
        }catch (error) {
            return handleResponse(res, 500, "Some error occured");
        }
    }

    static async resetPassword(req, res) {
        const { token, userId } = req.query;
        const { password } = req.body;
        try {
            let user = await Users.findOne({
                passwordResetToken: token,
                _id: userId,
            });
            if (!user) {
                return handleResponse(res, 401, "Password reset link may have expired");
            }
            const salt = await bcrypt.genSalt(10);

            const newPassword = await bcrypt.hash(password, salt);

            await Users.findOneAndUpdate(
                { _id: userId },
                {
                    $set: {
                        password: newPassword,
                        passwordResetRequired: false,
                        passwordResetToken: null,
                    },
                    new: true,
                    upsert: true,
                }
            );

            const newToken = generateToken({
                email: user._doc.email,
                role: user._doc.role,
                passwordResetRequired: user._doc.passwordResetRequired,
                password: null,
            });

            return handleResponse(res, 200, "Password reset successful", {
                user: {
                    ...user._doc,
                    passwordResetRequired: false,
                    password: null,
                },
                token: newToken,
            });
        } catch (error) {
            return handleResponse(res, 500, "Some error occured");
        }
    }

    static async changePassword(req, res) {
        const { oldPassword, password } = req.body;

        try {
            let user = await Users.findOne({ email: req.user.email });
            if (!user) {
                return handleResponse(res, 401, "Invalid Credentials");
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return handleResponse(res, 401, "Invalid Credentials");
            }
            const salt = await bcrypt.genSalt(10);

            let newPassword = await bcrypt.hash(password, salt);

            await Users.findOneAndUpdate(
                { email: req.user.email },
                { $set: { password: newPassword }, new: true, upsert: true }
            );

            return handleResponse(res, 200, "Changed your password successfully", {
                ...user._doc,
                password: undefined,
            });
        } catch (error) {
            return handleResponse(res, 500, "Some error occured");
        }
    }
}

export default UserServices;