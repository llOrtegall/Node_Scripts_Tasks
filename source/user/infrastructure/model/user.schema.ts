import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    uuid: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    }
}, { timestamps: true, versionKey: false });

export const UserModel = model("Users", userSchema);