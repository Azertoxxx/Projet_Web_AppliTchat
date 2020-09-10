var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

module.exports = {
    register: function(req, res){
        var phoneNumber = req.body.phoneNumber;
        var username = req.body.username;
        var password = req.body.password;
        var bio = req.body.bio;

        //On vérifie si tout les champs sont bien remplits
        if(phoneNumber == null || username == null || password == null){
            return res.status(400).json({'error': 'missing parameters'});
        }

        //vérifier la longueur du pseudo, la forme du mdp, la forme du numéro de téléphone
        // if(username.length >= 13 || username.length <= 3){
        //     return res.status(400).json({'error': 'username format not correct (must have a lenght between 4 and 12)'});
        // }
        //
        // if(phoneNumber.length != 10){
        //     return res.status(400).json({'error': 'phoneNumber format not correct'});
        // }


        //On vérifie si l'utilisateur n'est pas déja inscrit
        models.User.findOne({
            attributes: ['phoneNumber'],
            where: { phoneNumber: phoneNumber}
        })
            .then(function(userFound){
                if(!userFound){
                    // On crypte le mdp
                    bcrypt.hash(password,5,function(err, bcryptedPassword){
                        var newUser = models.User.create({
                            phoneNumber: phoneNumber,
                            username: username,
                            password: bcryptedPassword,
                            bio: bio
                        })
                            .then(function(newUser){
                                return res.status(201).json({
                                    'userId': newUser.id
                                })
                            })
                            .catch(function(err){
                                return res.status(500).json({'error': 'cannot add user'})
                            })
                    })
                }
                else{
                    return res.status(409).json({'error': 'user already exists'})
                }
            })
            .catch(function(err){
                return res.status(500).json({'error': 'unable to verify user'});
            })
    },
    login: function(req, res){

        var phoneNumber = req.body.phoneNumber;
        var password = req.body.password;

        if(phoneNumber == null || password == null){
            return res.status(400).json({'error': 'missing parameters'});
        }

        //TODO vérifier si tout est ok

        models.User.findOne({
           // attributes: ['phoneNumber','password'],
            where: {phoneNumber: phoneNumber}
        })
            .then(function(userFound){
                if(userFound){
                    //On compare le mdp donné au mdp enregistré (crypté)
                    bcrypt.compare(password, userFound.password, function(errBcrypt, resBcrypt){
                        if(resBcrypt){
                            return res.status(200).json({
                                'userId': userFound.id,
                                'token': jwtUtils.generateTokenForUser(userFound)
                            });
                        }
                        else{
                            return res.status(403).json({'error': 'invalid password'});
                        }
                    })
                }
                else{
                    return res.status(404).json({'error' : 'user does not exist'})
                }
            })
            .catch(function(err){
                return res.status(500).json({'error' : 'unable to verify user'})
            })
    },
    getUserProfile: function(req,res){
        // Recupération de auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if(userId < 0){
            return res.status(400).json({'error' : 'wrong token'});
        }

        models.User.findOne({
            attributes: ['id', 'phoneNumber', 'username', 'bio'],
            where: {id: userId}
        }).then(function(user){
            if(user){
                res.status(201).json(user);
            }
            else{
                res.status(404).json({'error': 'user not found'});
            }
        }).catch(function(err){
            res.status(500).json({'error': 'cannot fetch user'});
        });
    }
}