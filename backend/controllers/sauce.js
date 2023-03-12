const Sauces= require('../models/sauces.js');

exports.createSauces= (req, res, next) => {// les requêtes qui arrive à ce .post ont dans son "body" toutes les informations de la sauce
    delete req.body._id // on retire le champs ID du corps de la requête avant de copier l'objet
   const sauce= new Sauces ({ // on créé une nouvelle instance de "sauces"
    ...req.body // on utilise le spread "..." pour récupérer tous les champs qui sont dans le corps de la requête
   });
    sauce.save() // on enregistre l'objet sauce dans la base de données grâce à la méthode save 
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'})) // si tout est ok, réponse 201 contenu créé / ressource créée avec code 201
      .catch(error => res.status(400).json({ error })); // on renvoit dans le catch code 400 erreur
  }

  exports.modifySauce =  (req, res, next) => {
    Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // on utilise la méthode updateOne pour mettre à jour la base de données. on remplace l'id par la nouvelle sauce par son id. 
      .then(() => res.status(200).json({ message: 'Sauce modifiée!'})) // on retourne la promise 200 OK 
      .catch(error => res.status(400).json({ error }));// on catch avec erreur 400 error
  }

  exports.deleteSauce = (req, res, next) => {// encore une fois on passe par l'id.. 
    Sauces.deleteOne({ _id: req.params.id }) // on utilise delteOne, avec comme argument l'id de la sauce
      .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))// on retourne la promise 200 OK 
      .catch(error => res.status(400).json({ error }));// on catch avec erreur 400 error
  }

  exports.getOneSauce = (req, res, next) => { // les deux points avant id servent à dire à express que le paramètre est dynamique
    Sauces.findOne({ _id: req.params.id }) // on utilise findOne pour ne trouve qu'un seul des éléments
      .then(sauce => res.status(200).json(sauce)) // si trouvé code 200 OK + sauce
      .catch(error => res.status(404).json({ error }));// si erreur 404 not found
  }

  exports.getAllSauce = (req, res, next) => {
    Sauces.find() // on utilise la méthode find sans paramètres car on veut la liste complète
    .then(sauce => res.status(200).json(things)) // on veut toutes les sauces retournées par la DB, code 200 OK si succès
    .catch(error => res.status(400).json({ error })); // ... sinon 400 erreur
    }