const Sauces= require('../models/sauces.js');

exports.createSauces= (req, res, next) => {
  const sauceObject = JSON.parse(req.body.thing);// on commense par parser l'objet sauceObject
  delete sauceObject._id; // on supprime l'id vu qu'il sera généré par notre DB
  delete sauceObject._userId;// on supprime l'userid pour utiliser celui qui vient du token du client. De cette façon un client ne peut pas se faire passer pour qqn d'autre
  const sauce = new Sauces({// on créé une nouvelle instance de "sauces"
      ...sauceObject, // avec ce qui nous a été passé dans sauceObject
      userId: req.auth.userId, // on extrait le userId grâce à notre middle ware
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// puis on génère l'url de l'image grâce au "protocol", le nom d'hôte et le nom de fichier unique créé avec multer.
  });

  sauce.save()// on enregistre l'objet dans la DB 
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})// si succès code 201 ressource créée
  .catch(error => { res.status(400).json( { error })})// sinon erreur 400
};

  exports.modifySauce =  (req, res, next) => { // on exporte la fonction pour modifier la sauce
    const sauceObject = req.file ? { // on demande si il y a un champs file
      ...JSON.parse(req.body.sauce),// si c'est le cas on parse la chaîne de caractère du body de la requête
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// et on recrée l'url de l'image
  } : { ...req.body }; // sinon on récupère la sauce directement dans le corps de la requête

  delete sauceObject._userId; // on supprime le userId pour éviter que quelqu'un utilise l'userid
  Sauces.findOne({_id: req.params.id})// on cherche la sauce dans notre DB pour vérifier si c'est bien l'utilisateur qui cherche à le modifier et pas qqn d'autre..
      .then((sauce) => { 
          if (sauce.userId != req.auth.userId) {// en cas de différence entre userId et userid de l'auth, c'est que c'est un utilisateur non authorisé qui essaie de modifier donc..
              res.status(401).json({ message : 'Not authorized'});// ...on renvoi erreur code 401 unauthorized
          } else {
              Sauces.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})// sinon, on met à jour notre mise à jour, grâce au filtre "_id: req.params.id", et quelle sauce grâce à ce qu'on récupère dans le sauceObject
              .then(() => res.status(200).json({message : 'Objet modifié!'}))// en cas de succès code 200 OK 
              .catch(error => res.status(401).json({ error }));// sinon code 401 unauthorized.
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
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