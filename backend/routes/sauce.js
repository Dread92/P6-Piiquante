const express = require('express');// on requiert express pour notre router

const router = express.Router();// on utilise la méthode router avant d'importer nos routes "app.x " depuis le fichier app.js


// on importe notre controller depuis sauce.js dans le dossier controllers
const sauceController = require('../controllers/sauce.js');

router.get('/', sauceController.getAllStuff);

 // on ajoute une méthode post pour envoyer la réponse
 router.post('/', );

// on utilise la méthode get pour retrieve les requêtes get
router.get('/', sauceController.getAllSauce);


  // on utilise get pour n'avoir que l'ID de l'objet
  router.get('/:id',sauceController.getOneSauce );  

// on rajoute une route "put" vers api/sauces avec l'id en paramètre.
router.put('/:id',sauceController.modifySauce);
 
// on rajoute une route "delete" pour la suppression d'une sauce.. 
router.delete('/:id',sauceController.deleteSauce );

module.exports = router;// on réexporte le routeur de ce fichier pour l'utiliser dans app.js