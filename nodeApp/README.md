# Projet App Mobile : Backend

Pour tester l'API avec BDD active :

- installer sequelize `npm install sequelize`
- lancer le serveur node js `node main.js`
- installer mysql et MANP ( ou logiciel d'hébérgement de bdd)
- lancer le serveur MANP (ou autre)
- exécuter la commande `sequelize db:create` puis `sequelize db:migrate` (permet d'importer les colonnes)
- lancer mysql `mysql -u root -u
- écrire les commandes suivantes :
`create table projet_web;` 
`create table projet_web_test;` 
`create table projet_web_production;`
`use projet_web;`

- télécharger postman (ou autre) pour tester les requêtes

## Description des requêtes :

Les contenus échangés sont en JSON
En cas d'erreur, un attribut "error" est transmis.

- /api/users/register : POST => créer un compte (numéro de tel, username, password et bio(optionnel))

Envoi:
{
"phoneNumber" : ...,
"username" : ...,
"password" : ...,
"bio" : ...,
}

Reception:
{
"error" : ...
}

- /api/users/login : POST => s'identifier (avec son numéro de tel et son mdp)

Envoi:
{
"phoneNumber" : ...,
"password" : ...,
}

Reception:
{
"token" : ...,
"error" : ...
}

- /api/users/me : GET => permet d'obtenir les infos de l'utilisateur grâce au token(dans headers, rajouter une clé Authorization avec la valeur : Bearer <token>)

## Non fonctionnelle

- /api/messages/new : POST => écrire un message (nécessite le token comme précdemment)
- /api/messages : GET => récupérer les messages
