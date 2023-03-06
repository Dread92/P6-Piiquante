const {User} = require("./mongo") // on requiert l'objet user dans le fichier mongoose.js
const hashlibrary = require ("bcrypt") // on appelle notre plugin bcrypt pour le chiffrage des mots de passe


async function createUser(req, res){
    const {email, password} = req.body
    const hashedpassword =  await hashpassword(password)// on appelle la fonction hashpassword pour le chiffrage des mdp
  

    console.log('password:', password)
    console.log('hashedpassword:', hashedpassword)
    


    const user = new User ({ email, password: hashedpassword })

    user
 .save() // on sauvegarde notre profil d'utilisateur
 .then(() => res.status(201).send({message:" Sucessfully registered!"}))// si on a une réponse, on enregistre l'utilisateur// si réponse on notifie dans l'enregistrement // on utilise code 201 pour dire ok une ressource a été créée
 .catch((err) => res.status(409).send({message:"can't register user, something went wrong" + err}))// sinon erreur et utilisateur non  enregistré // on utilise 409 pour indiquer un conflit
}


// on créé la fonction qui va nous servir à hasher les mots de passe grâce à bcrypt
function hashpassword(password){
    const saltRounds = 10 // on chiffre 10x le mot de passe
    return hashlibrary.hash(password, saltRounds)// on prend notre constante établie pour activer bcrypt et on met le ".hash" sur password. On appelle également saltRounds pour définie précédemment pour indiquer le nombre de chiffrage
   // bcrypt.compare("password","encryption key").then(console.log) to check if password matches, then true or false in console
}
// on créé la fonction qui va nous servir à loger l'utilisateur
function userSignin(req,res)// on lui passe req res vu que c'est express qui va l'invoquer dans notre fichier index.js
{
const userEmail = req.body.email // on créé une constante en fonction du playload du navigateur pour le mail (email)
const userPassword = req.body.password// on créé une constante en fonction du playload du navigateur pour le mot de passe(password)
}


// on met en export la fonction createUser & userSignin
module.exports = {createUser, userSignin}
