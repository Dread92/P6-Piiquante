const express = require("express")
const server  = express() // on assigne le server à express
const corsMiddleWare = require("cors") // on créé la variable pour utiliser cors
const port = 3000


//database
const  mongoose = require("mongoose");
const password= "fLydAbrSLs3LUasw"
const uri = `mongodb+srv://guillaumeblanc92:${password}@cluster0.wuy64ly.mongodb.net/?retryWrites=true&w=majority` 
mongoose
.connect(uri)
.then(()=> console.log("connected to mongoose"))
.catch (err => console.error("Error connecting to Mongo:", err))

server.use(corsMiddleWare()) // on utilise un .use pour enable cors
server.use(express.json())
// routes

server.post ("/api/auth/login", (req,res)=>{
    console.log("login request", req.body)
    res.send({message:" Utilisateur enregistré !"})
} )
server.get('/', (req,res ) => res.send('hello'))
server.listen(port, () => console.log("listening on port"+ port)) // notre serveur écoute sur le port 3000