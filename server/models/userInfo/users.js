const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
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
    type: {
        type: String,
    },
    info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Info',
    },
}, { collection: 'users' });

const Users = mongoose.model('Users', UserSchema, 'users');

module.exports = Users;
