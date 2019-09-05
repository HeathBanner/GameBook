const path = require('path');

if (process.env.NODE_ENV !== 'production') {
    console.log(path.resolve(__dirname, '.env'));
    require('dotenv').config({
        path: path.resolve(__dirname, '.env'),
    });
}

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
    app.use(express.static(clientBuildPath));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require('express-session');

console.log(process.env.JWT_SECRET);
// Passport Config
const { passport } = require('./config/config');
require('./config/passport')(passport);

const mongoose = require('mongoose');

const MONGOD_URI = process.env.MONGOD_URI;
mongoose.connect(MONGOD_URI, { useNewUrlParser: true });

// Passport Middleware
app.use(session({
    secret: 'keyboard_cat',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./controllers'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {});
