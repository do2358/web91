import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchemaName = 'comments';

const commentSchema = new Schema({
    postId: String,
    content: String,
    authorId: String,
}, {
    timestamps: true
});

const Comment = mongoose.model(commentSchemaName, commentSchema);

export default Comment;