import { Schema, model } from 'mongoose'
// const moongoose = require("mongoose");

const Schema = moongose.Schema;

const loanSchema = new Schema(
    {
        user_id: {
            type: String,
            required: true,
            ref: "Users"
        },

        amount: {
            type: Number,
            required: true,
            default: 1
        },

        period: {
            type: Number,
            required: true,
        },

        repaidAmount: {
            type: Number,
            default: 0
        },

        monthlyRepaymentAmount: {
            type: Number,
            required: true,
        },

        interest: {
            type: Number,
            required: true,
        },

        request_date: {
            type: Date,
            required: true,
            default: Date.now,
        }, 

        status: {
            type: String,
            enum: ["requested", "approved", "cancelled", "paid"],
            default: "requested",
        },
    }
);

const LoanModel = model("Loan", loanSchema);

export default LoanModel;