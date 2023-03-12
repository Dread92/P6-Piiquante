const express = require('express');// on requiert express pour notre router
const multer = require('../middleware/multer-config'); // on importe notre middleware multer 
const router = express.Router();// on utilise la méthode router avant d'importer nos routes "app.x " depuis le fichier app.js
const auth= require('../middleware/auth'); // on requiert notre auth qui vérifie l'authenticité de nos tokens, puis nous l'appliquons à chaque gestionnaire de route du fichier.
// on appelle auth en premier sur nos gestionnaires car la vérification doit passer AVANT que la route ne soit empruntée


// on importe notre controller depuis sauce.js dans le dossier controllers
const sauceController = require('../controllers/sauce.js');

router.get('/',auth, sauceController.getAllSauce);

 // on ajoute une méthode post pour envoyer la réponse
 router.post('/', auth, multer,sauceController.createSauces );

// on utilise la méthode get pour retrieve les requêtes get
router.get('/', auth,sauceController.getAllSauce);


  // on utilise get pour n'avoir que l'ID de l'objet
  router.get('/:id',auth,sauceController.getOneSauce );  

// on rajoute une route "put" vers api/sauces avec l'id en paramètre.
router.put('/:id',auth,multer,sauceController.modifySauce);
 
// on rajoute une route "delete" pour la suppression d'une sauce.. 
router.delete('/:id',auth,sauceController.deleteSauce );

module.exports = router;// on réexporte le routeur de ce fichier pour l'utiliser dans app.js