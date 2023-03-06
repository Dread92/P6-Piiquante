//database
const  mongoose = require("mongoose");// on utilise mongoose 
const password= "fLydAbrSLs3LUasw"
const uri = `mongodb+srv://guillaumeblanc92:${password}@cluster0.wuy64ly.mongodb.net/?retryWrites=true&w=majority` // on connecte notre serv à la database créée sur mongodb


mongoose
.connect(uri)
.then(()=> console.log("connected to Mongoose!"))
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