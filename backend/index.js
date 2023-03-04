const express = require("express")
const server  = express() // on assigne le server à express
const corsMiddleWare = require("cors") // on créé la variable pour utiliser cors
const port = 3000


server.use(corsMiddleWare()) // on utilise un .use pour enable cors

// routes


server.get('/', (req,res ) => res.send('hello'))

server.listen(port, () => console.log("listening on port"+ port)) // notre serveur écoute sur le port 3000