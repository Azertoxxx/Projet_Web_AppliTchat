var jwt = require('jsonwebtoken');

const JWT_SIGN = '4mmawmnValentinMJeremyNWilliamG2020' /* choisi arbitrairement, ne doit pas être divulgué */

module.exports = {
    generateTokenForUser: function(userData){
        // On signe le token
        return jwt.sign({     /* On signe le token */
            userId: userData.id
        },
        JWT_SIGN,
            {
                expiresIn: '1h' /* un token dure 1h */
            })
    },
    parseAuthorization: function(authorization){
        return (authorization != null) ? authorization.replace('Bearer ','') : null;
    },
    getUserId: function(authorization){
        var userId = -1; /* pour être sur de ne pas avoir un id existant */
        var token = module.exports.parseAuthorization(authorization);
        if(token != null){
            try{
                var jwtToken = jwt.verify(token,JWT_SIGN); /* on vérifie so le token est valide */
                if(jwtToken != null){
                    userId = jwtToken.userId;
                }
            }
            catch(err){}
        }
        return userId;
    }
}