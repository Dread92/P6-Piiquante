const express = require('express'); // on importe la dépendance express
const mongoose = require('mongoose'); // on importe mongoose
const Sauces = require('./models/sauces');
require('dotenv').config() // on appelle notre fichier dotenv pour activer les variables d'envrionnement du fichier .env
// on appelle la méthode express pour notre application
const app = express();


const password= process.env.DB_PASSWORD // on passe le password présent dans env pour éviter qu'il soit visible
const username = process.env.DB_USERNAME // on passe également le user name depuis le fichier .env
const databasename= process.env.DB_DATABASENAME


const uri = `mongodb+srv://${username}:${password}@${databasename}/?retryWrites=true&w=majority` // on met nos deux constantes password & username appelées dans le fichier env pour ne pas rendre visible les identifiants de notre DB
// on se connecte à la base de données mongoose grâce à notre URL 
mongoose.connect(uri)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());// on intercepte toutes les requêtes JSON avec .use pour que le contenu JSON soit mis dans les req.body

// on ajoute un middleware "général"(sans routes, appliqué à toutes les requêtes) à notre serveur pour autoriser l'acces aux utilisateurs.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // * tout le monde y a accès
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');// on donne le droit d'utiliser certains headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');// ... et certains types de requêtes.
    next();// on oublie pas next pour passer l'execution au prochain middleware.
  });

  // on ajoute une méthode post pour envoyer la réponse
  app.post('/api/sauce', (req, res, next) => {// les requêtes qui arrive à ce .post ont dans son "body" toutes les informations de la sauce
    delete req.body._id // on retire le champs ID du corps de la requête avant de copier l'objet
   const sauce= new Sauces ({ // on créé une nouvelle instance de "sauces"
    ...req.body // on utilise le spread "..." pour récupérer tous les champs qui sont dans le corps de la requête
   });
    sauce.save() // on enregistre l'objet sauce dans la base de données grâce à la méthode save 
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'})) // si tout est ok, réponse 201 contenu créé / ressource créée avec code 201
      .catch(error => res.status(400).json({ error })); // on renvoit dans le catch code 400 erreur
  });

// on utilise la méthode get pour retrieve les requêtes get
app.get('http://localhost:3000/api/sauces', (req, res, next) => {
  Sauces.find() // on utilise la méthode find sans paramètres car on veut la liste complète
  .then(sauce => res.status(200).json(things)) // on veut toutes les sauces retournées par la DB, code 200 OK si succès
  .catch(error => res.status(400).json({ error })); // ... sinon 400 erreur
  });


  // on utilise get pour n'avoir que l'ID de l'objet
  app.get('/api/sauces/:id', (req, res, next) => { // les deux points avant id servent à dire à express que le paramètre est dynamique
    Sauces.findOne({ _id: req.params.id }) // on utilise findOne pour ne trouve qu'un seul des éléments
      .then(sauce => res.status(200).json(sauce)) // si trouvé code 200 OK + sauce
      .catch(error => res.status(404).json({ error }));// si erreur 404 not found
  });  

// on rajoute une route "put" vers api/sauces avec l'id en paramètre.
  app.put('/api/sauces/:id', (req, res, next) => {
    Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // on utilise la méthode updateOne pour mettre à jour la base de données. on remplace l'id par la nouvelle sauce par son id. 
      .then(() => res.status(200).json({ message: 'Sauce modifiée!'})) // on retourne la promise 200 OK 
      .catch(error => res.status(400).json({ error }));// on catch avec erreur 400 error
  });

// on rajoute une route "delete" pour la suppression d'une sauce.. 
  app.delete('/api/sauces/:id', (req, res, next) => {// encore une fois on passe par l'id.. 
    Sauces.deleteOne({ _id: req.params.id }) // on utilise delteOne, avec comme argument l'id de la sauce
      .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))// on retourne la promise 200 OK 
      .catch(error => res.status(400).json({ error }));// on catch avec erreur 400 error
  });

/*  {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      }*/ 

// on exporte cette const pour qu'elle soit accessible depuis les autres fichiers
module.exports = app;