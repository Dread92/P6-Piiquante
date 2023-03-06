const {user} = require("./mongo") // on requiert l'objet user dans le fichier mongoose.js
const hashlibrary = require ("bcrypt") // on appelle notre plugin bcrypt pour le chiffrage des mots de passe


async function createUser(req, res){
    const {email, password} = req.body
    const hashedpassword =  await hashpassword(password)// on appelle la fonction hashpassword pour le chiffrage des mdp
  

    console.log('password:', password)
    console.log('hashedpassword', hashedpassword)
    


    const newUser = new user ({ email, password: hashedpassword })

newUser
.save() // on sauvegarde notre profil d'utilisateur
.then(() => res.send({message:" Sucessfully registered!"}))// si on a une réponse, on enregistre l'utilisateur// si réponse on notifie dans l'enregistrement
.catch((err) => console.log("can't register user, something went wrong",err))// sinon erreur et utilisateur non  enregistré
}


// on créé la fonction qui va nous servir à hasher les mots de passe grâce à bcrypt
function hashpassword(password){
    const saltRounds = 10 // on chiffre 10x le mot de passe
    return hashlibrary.hash(password, saltRounds)// on prend notre constante établie pour activer bcrypt et on met le ".hash" sur password. On appelle également saltRounds pour définie précédemment pour indiquer le nombre de chiffrage
   
}


// on met en export la fonction createUser
module.exports = {createUser}