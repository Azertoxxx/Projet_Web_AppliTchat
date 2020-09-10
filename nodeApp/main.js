var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;

var server = express();

server.use(bodyParser.urlencoded({extented: true}));
server.use(bodyParser.json());

server.get('/',function(req,res) {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Bienvenue sur le serveur</h1>')
});

server.use('/api/', apiRouter);

server.listen(8080, function(){
    console.log('Serveur démarré');
});



















//var sequelize = require('./models');
// const eraseDatabaseOnSync = false;
// sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
//     if (eraseDatabaseOnSync) {
//         createUsersWithMessages();
//     }
//     server.listen(process.env.PORT, () => {
//         console.log(`Server listening on port ${process.env.PORT}!`)
//     });
// });

// const createUsersWithMessages = async () => {
//     await models.User.create(
//         {
//             phoneNumber: '0601020304',
//             username: 'valentin',
//             password: 'valentin',
//             bio: 'first user',
//             messages: [
//                 {
//                     text: 'Published the Road to learn React',
//                 },
//             ],
//         },
//         {
//             include: [models.Message],
//         }
//         }
//     )
// };





