import { Schema } from "mongoose";

const userSchema = Schema(
    {
        fullname: {
            type: String,
            lowercase: true,
            required: true,
            minlength: [3, 'fullname must be 3 letters long'],
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: String,
        episode: {
            type: Number,
            default: 1
        }
    },
    {
        timestamps: {
            createdAt: 'joinedAt'
        }
    }
)

export default userSchema;
