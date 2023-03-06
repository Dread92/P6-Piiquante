const {user} = require("./mongo") // on requiert l'objet user dans le fichier mongoose.js

function createUser(req, res){
    const {email, password} = req.body
    console.log({email, password})
    const newUser = new user ({ email, password})

newUser
.save() // on sauvegarde notre profil d'utilisateur
.then(() => res.send({message:" Sucessfully registered!"}))// si on a une réponse, on enregistre l'utilisateur// si réponse on notifie dans l'enregistrement
.catch((err) => console.log("can't register user, something went wrong",err))// sinon erreur et utilisateur non  enregistré
}

// on met en export la fonction createUser
module.exports = {createUser}