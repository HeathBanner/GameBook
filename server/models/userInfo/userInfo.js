const mongoose = require('mongoose');

const { Schema } = mongoose;

const infoSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    gallery: {
        type: Array,
    },
    education: {
        type: Object,
    },
    contact: {
        type: Object,
    },
    friendList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],
    avatar: {
        type: String,
        trim: true,
    },
    skyline: {
        type: String,
        trim: true,
    },
    authored_stories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stories',
    }],
    authored_comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stories',
    }],
    liked_stories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stories',
    }],
    liked_comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stories',
    }],
});

class newUser {
    constructor({
        id,
        username,
        email,
        password,
    }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    comparePassword(challenge) {
        return this.password === challenge;
    }
}

infoSchema.loadClass(newUser);

const Info = mongoose.model('Info', infoSchema, 'info');

module.exports = Info;
