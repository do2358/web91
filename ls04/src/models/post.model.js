import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchemaName = 'posts';

const postSchema = new Schema({
    id: String,
    title: String,
    content: String,
    authorId: String,
    description: String,
}, {
    timestamps: true
});

const Post = mongoose.model(postSchemaName, postSchema);

export default Post;