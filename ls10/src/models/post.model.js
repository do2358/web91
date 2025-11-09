import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    thumbnail: {
        url: {
            type: String
        },
        publicId: {
            type: String
        }
    },
    coverImage: {
        url: {
            type: String
        },
        publicId: {
            type: String
        }
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

export default Post;

