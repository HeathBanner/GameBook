const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
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

UserSchema.loadClass(newUser);
const Users = mongoose.model('Users', UserSchema, 'users');

module.exports = Users;
