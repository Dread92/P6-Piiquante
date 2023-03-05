const express = require("express")
const server  = express() // on assigne le server à express
const corsMiddleWare = require("cors") // on créé la variable pour utiliser cors
const port = 3000


//database
const  mongoose = require("mongoose");// on utilise mongoose 
const password= "fLydAbrSLs3LUasw"
const uri = `mongodb+srv://guillaumeblanc92:${password}@cluster0.wuy64ly.mongodb.net/?retryWrites=true&w=majority` // on connecte notre serv à la database créée sur mongodb
mongoose
.connect(uri)
.then(()=> console.log("connected to mongoose"))
.catch (err => console.error("Error connecting to Mongo:", err))


// on créé un schéma pour nos utilisateurs
const userSchema = new mongoose.Schema ({
    email: String,
    password: String

})

// on créé un modèle d'utilisateur en appelant notre userSchema précédemment créé
const user = mongoose.model("user", userSchema)




server.use(corsMiddleWare()) // on utilise un .use pour enable cors
server.use(express.json())

// routes

server.post ("/api/auth/signup", (req,res)=>{
    console.log("signup request", req.body)
    const email= req.body.email
    const password = req.body.password
    console.log({email, password})
    const newUser = new user ({ email : email, password: password})

newUser
.save() // on sauvegarde notre profil d'utilisateur
.then(res=> console.log("user registered", res))// si réponse on notifie dans l'enregistrement
.catch(err => console.log("can't register user, something went wrong",err))// sinon erreur

    res.send({message:" Sucessfully registered!"})
} )
server.get('/', (req,res ) => res.send('hello'))
server.listen(port, () => console.log("listening on port"+ port)) // notre serveur écoute sur le port 3000