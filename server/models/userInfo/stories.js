const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    authored_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    likes: Array,
    text: String,
    time: String,
});

const StorySchema = new Schema({
    type: {
        type: String,
    },
    authored_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    comments: [commentSchema],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    time: {
        type: String,
    },
    text: {
        type: String,
        trim: true,
    },
}, { collection: 'Stories' });

const Stories = mongoose.model('Stories', StorySchema, 'Stories');

module.exports = Stories;
