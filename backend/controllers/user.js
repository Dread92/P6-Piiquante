const user= require('../models/user.js') // on importe notre modèle user
const bcrypt = require ('bcrypt');// on requiert l'extension bcrypt qui va servir à hasher les mots de passe

exports.signup = (req, res, next) => { // on créé une fonction signup pour l'enregistrement de nouveaux utilisateurs
    bcrypt.hash(req.body.password, 10) // on appelle .hash pour crypter le mdp, on lui passe le mdp du corps de la requête, on salt 10 fois(cryptagex10) du mdp
    .then(hash => {// vu que méthode async - qui peu prendre du temps - on a un .then et un .catch
      const user = new User({// on créé un nouvel utilisateur qui va être enregistré dans la DB 
        email: req.body.email,// adresse fournie dnas le corps de la requête
        password: hash// on enregistre le mdp crypté dans le password
      });
      user.save()// on enregistre grâce à .save dans la DB
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) // si ok status 201 ressource créée
        .catch(error => res.status(400).json({ error })); // si erreur , code 400 
    })
    .catch(error => res.status(500).json({ error })); // erreur 500 serveur si catch
};

exports.login = (req, res, next) => {// et la fonction login pour la connexion des utilisateurs existants

};