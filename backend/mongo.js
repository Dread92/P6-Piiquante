//database
const  mongoose = require("mongoose");// on utilise mongoose 
const password= process.env.DB_PASSWORD // on passe le password présent dans env pour éviter qu'il soit visible
const username = process.env.DB_USERNAME // on passe également le user name depuis le fichier .env
const uri = `mongodb+srv://${username}:${password}@cluster0.wuy64ly.mongodb.net/?retryWrites=true&w=majority"`; // on connecte notre serv à la database créée sur mongodb



mongoose
.connect(uri)// on se connecte à la database grâce à connect
.then(()=> console.log("connected to Mongoose!"))// notification de connexion
.catch (err => console.error("Error connecting to Mongo:", err))


// on créé un schéma pour nos utilisateurs
const userSchema = new mongoose.Schema ({
    email: String,
    password: String

})

// on créé un modèle d'utilisateur en appelant notre userSchema précédemment créé
const user = mongoose.model("user", userSchema)

// on exporte avec node mongoose et user, pour qu'ils soient reconnus dans ce fichier
module.exports = {mongoose, user}