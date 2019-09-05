const usersController = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const { JWTVerifier } = require('../../../config/config');
const jwt = require('jsonwebtoken');

const Users = require('../../../models/userInfo/users');
const { ObjectID } = require('mongodb');

// usersController.get('/verify', JWTVerifier, (req, res) => {
//     let user = req.user;
//     res.status(200).json(user);
// });

const errMsg = {
    error: true,
    message: 'Something went wrong!',
};

usersController.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) { return res.status(500).json(errMsg); }
        req.logIn(user, (error) => {
            if (error) {
                return res.status(500).json({
                    error: true,
                    message: 'Password is incorrect!',
                });
            }
            if (!user) {
                return res.status(401).json({
                    error: true,
                    message: 'Username is incorrect!',
                });
            }
            res.status(200).json({
                user,
                token: jwt.sign({ sub: user.id }, process.env.JWT_SECRET),
            });
        });
    })(req, res, next);



    // db.findOne({ _id: ObjectID('5d12638abb93d2a54d7c37a0') })
    //     .populate({
    //         path: 'info',
    //         populate: {
    //             path: 'authored_stories',
    //             populate: [{
    //                 path: 'authored_by',
    //             },
    //             {
    //                 path: 'comments.authored_by',
    //                 model: 'Users',
    //             }],
    //         },
    //     })
    //     .populate({
    //         path: 'info',
    //         populate:
    //             {
    //                 path: 'friendList',
    //             },
    //     })
    //     .exec((err, user) => {
    //         if (err) throw err;
    //         res.json(user);
    //     });
});

usersController.post('/register', (req, res) => {
    const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    Users.findOne({
        $or: [
            { username: newUser.username },
            { email: newUser.email },
        ] 
    }, (err, user) => {
            switch (true) {
                case err:
                    console.log(err);
                    return res.status(500).json(errMsg);
                case !user:
                    bcrypt.genSalt(10, (saltError, salt) => {
                        if (saltError) {
                            return res.status(500).json(errMsg);
                        }
                        bcrypt.hash(newUser.password, salt, (hashError, hash) => {
                            if (hashError) {
                                return res.status(500).json(errMsg);
                            }
                            newUser.password = hash;
                            newUser.save()
                                .then(() => {
                                    res.status(201).json({
                                        error: false,
                                        message: 'Account successfully created!',
                                    });
                                })
                                .catch(() => {
                                    res.status(500).json(errMsg);
                                });
                        })
                    })
                    break;
                default:
                    if (user.username === newUser.username) {
                        return res.status(401).json({
                            error: true,
                            message: 'Username already exists!',
                        });
                    } else {
                        return res.status(401).json({
                            error: true,
                            message: 'Email already exists!',
                        });
                    }
            }
        });
});

usersController.post('/passwordCheck', (req, res) => {
    const { email, password } = req.body;
    Users.findOne({ email })
        .then((user) => {
            if (user.password === password) {
                return res.json('Match');
            }
            return res.json('Not Authorized');
        });
});

usersController.post('/emailChange', (req, res) => {
    const { username, email } = req.body;
    Users.findOneAndUpdate({ username },
        { $set: { email } },
        { useFindAndModify: false, new: true }, (err, user) => {
            res.json(user);
        });
});

usersController.post('/passwordChange', (req, res) => {
    const { username, password } = req.body;
    Users.findOneAndUpdate({ username },
        { $set: { password } },
        { useFindAndModify: false, new: true }, (err, user) => {
            res.json(user);
        });
});

module.exports = usersController;
