const apiControllers = require('express').Router();

apiControllers.use('/users', require('./users/usersController'));
apiControllers.use('/stories', require('./stories/storyController'));

module.exports = apiControllers;
