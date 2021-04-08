import { Schema, model } from "mongoose";

const userSchema = new Schema({
    full_name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    staffid: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    profile_picture: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    account_no: {
        type: String,
    },
    password: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },
    passwordResetRequired: {
        type: Boolean,
        required: true,
        default: true,
    },
});

const UserModel = model("Users", userSchema);

export default UserModel