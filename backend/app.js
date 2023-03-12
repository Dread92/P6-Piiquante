const express = require('express'); // on importe la dépendance express
const mongoose = require('mongoose'); // on importe mongoose
require('dotenv').config() // on appelle notre fichier dotenv pour activer les variables d'envrionnement du fichier .env
// on appelle la méthode express pour notre application
const app = express();
const sauceRoutes = require('./routes/sauce.js')
const userRoutes = require('./routes/user');// on importe user.js depuis le dossier routes

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


/*  {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      }*/ 

app.use('/api/sauce', sauceRoutes);// on importe toutes nos routes via ce app.use qui vont être demandée via l'url /api/sauce
app.use('/api/auth', userRoutes); // on importe notre userroutes avec l'URL qui sera la racine des routes liées à l'authentification

// on exporte cette const pour qu'elle soit accessible depuis les autres fichiers
module.exports = app;