require('dotenv').config() // on appelle notre fichier dotenv pour activer les variables d'envrionnement du fichier .env
const express = require("express")
const server  = express() // on assigne le server à express
const corsMiddleWare = require("cors") // on créé la variable pour utiliser cors
const port = 3000
require("./mongo") // on requiert le fichier mongoose.js pour établir le lien entre l'index et mongoose, pour la connexion à la database.
const {createUser} = require("./Usermanaging") // on requiert la fonction createUser exportée dans UserManaging.js





// Middleware
server.use(corsMiddleWare()) // on utilise un .use pour enable cors
server.use(express.json())

// routes
// quand on reçoit une nouvelle requête signup on fabrique un nouvel utilisateur, on le met en base de donnée 
server.post ("/api/auth/signup",createUser)
server.get('/', (req,res ) => res.send('hello'))
server.listen(port, () => console.log("listening on port"+ port)) // notre serveur écoute sur le port 3000
