import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchemaName = 'users';

const userSchema = new Schema({
    id: String,
    username: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const User = mongoose.model(userSchemaName, userSchema);

export default User;