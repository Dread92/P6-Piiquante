const mongoose = require('mongoose');// on utilise mongoose   
const uniqueValidator = require('mongoose-unique-validator');// on installe mongoose-unique-validator car la version de base de ne nous permet pas de voir les erreurs de double email

const userSchema = mongoose.Schema({// on créé un schéma pour nos utilisateurs
  email: { type: String, required: true, unique: true },// grâce à unique true on ne permet pas l'utilisation de plusieurs fois le même email 
  password: { type: String, required: true } // grâce à required true on ne peut pas faire un attempt sans mdp ou sans email
});

userSchema.plugin(uniqueValidator);// on appelle mongoose-unique-validator dans notre schéma pour vérifier le unique:true de notre email. sans ça, aucune erreur n'est renvoyée en cas de saisie d'email non unique. l'erreur sera renvoyée dans la console.

module.exports = mongoose.model('user', userSchema);