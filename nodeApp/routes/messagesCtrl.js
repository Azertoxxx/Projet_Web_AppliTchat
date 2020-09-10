var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');

module.exports = {
    createMessage: function (req,res) {
        // Recupération de auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        var content = req.body.content;

        if(content == null){
            return res.status(400).json({'error' : 'no content'});

        }

        //Utilisation d'un waterfall pour simplifier le code, on aurait pu le faire pour userCtrl également
        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    where: { id: userId }
                })
                    .then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function(userFound, done) {
                if(userFound) {
                    models.Message.create({
                        content: content,
                        UserId : userFound.id
                    })
                        .then(function(newMessage) {
                            done(newMessage);
                        });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], function(newMessage) {
            if (newMessage) {
                return res.status(201).json(newMessage);
            } else {
                return res.status(500).json({ 'error': 'cannot post message' });
            }
        });
    },
    listMessage: function (req,res) {
        //sélectionner les colonnes à afficher
        var fields  = req.query.fields;
        //Récupérer les messages petit à petit
        var limit   = parseInt(req.query.limit);
        var offset  = parseInt(req.query.offset);
        //Messages par ordre particulier
        var order   = req.query.order;

        if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT;
        }

        //trouve tout les messages
        models.Message.findAll({
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: [ 'username' ]
            }]
        }).then(function(messages) {
            if (messages) {
                res.status(200).json(messages);
            } else {
                res.status(404).json({ "error": "no messages found" });
            }
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({ "error": "invalid fields" });
        });
    }
}