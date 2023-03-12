const express = require('express'); // on requiert express pour créer notre router
const router = express.Router(); // on appelle la fonction router d'express

const userController= require('../controllers/user');// on créé notre const controller pour associer les fonctions aux différentes routes

router.post('/signup', userController.signup); // les deux routes signup/login sont des routes POST , c'est un envoi de données (email/mdp)
router.post('/login', userController.login);

module.exports = router;