var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var messagesCtrl = require('./routes/messagesCtrl');

//Router
exports.router = (function() {
    var apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register').post(usersCtrl.register);
    apiRouter.route('/users/login').post(usersCtrl.login);
    apiRouter.route('/users/me').get(usersCtrl.getUserProfile);

    //Messages routes
    apiRouter.route('/messages/new').post(messagesCtrl.createMessage);
    apiRouter.route('/messages').get(messagesCtrl.listMessage);

    return apiRouter;
})();