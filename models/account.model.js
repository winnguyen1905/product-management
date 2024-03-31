const mongoose = require('mongoose');
const generate = require("../helpers/generate");
const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate(20), // jwt
        unique: true
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false 
    },
    changeDeleteStatus: Date,
}, {
    timestamps: true
});

const Account = mongoose.model("Account", accountSchema, "account");

module.exports = Account;