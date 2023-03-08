//database
const  mongoose = require("mongoose")// on utilise mongoose    
const  uniqueValidator = require("mongoose-unique-validator")// on installe mongoose-unique-validator car la version de base de ne nous permet pas de voir les erreurs de double email
const password= process.env.DB_PASSWORD // on passe le password présent dans env pour éviter qu'il soit visible
const username = process.env.DB_USERNAME // on passe également le user name depuis le fichier .env
const databasename= process.env.DB_NAME
// on connecte notre serv à la database créée sur mongodb
const uri = `mongodb+srv://${username}:${password}@${databasename}/?retryWrites=true&w=majority` // on met nos deux constantes password & username appelées dans le fichier env pour ne pas rendre visible les identifiants de notre DB



mongoose
.connect(uri)// on se connecte à la database grâce à connect
.then(()=> console.log("connected to Mongoose!"))// notification de connexion
.catch (err => console.error("Error connecting to Mongo:", err))


// on créé un schéma pour nos utilisateurs
const userSchema = new mongoose.Schema ({
    email: {type: String, required:true, unique: true}, // grâce à unique true on ne permet pas l'utilisation de plusieurs fois le même email 
    password:{type: String, required:true} // grâce à required true on ne peut pas faire un attempt sans mdp ou sans email

})
userSchema.plugin(uniqueValidator)// on appelle mongoose-unique-validator dans notre schéma pour vérifier le unique:true de notre email. sans ça, aucune erreur n'est renvoyée en cas de saisie d'email non unique. l'erreur sera renvoyée dans la console.

// on créé un modèle d'utilisateur en appelant notre userSchema précédemment créé
const User = mongoose.model("User", userSchema)

// on exporte avec node mongoose et user, pour qu'ils soient reconnus dans ce fichier
module.exports = {mongoose, User}
