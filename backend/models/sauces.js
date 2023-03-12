const mongoose = require('mongoose'); // on importe mongoose pour créer notre schéma
const Sauces = require('../models/sauces');
// on créé un schéma de données pour les sauces avec ".Schema"
const saucesSchema = mongoose.Schema({
  title: { type: String, required: true },// en respectant notre const sauce= du fichier app.js, on ajoute les différentes clés requises( format type:string , required true)
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true }, // seul exception pour le prix qui sera type:number
});

// on exporte mongoose.model avec en argument "Sauces" et saucesSchema de notre fichier sauces.js
module.exports = mongoose.model('Sauces', saucesSchema);


//La méthode  Schema  de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.
//La méthode  model  transforme ce modèle en un modèle utilisable.