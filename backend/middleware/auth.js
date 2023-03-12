const jwt = require('jsonwebtoken');// on importe json web token
 
module.exports = (req, res, next) => {// on exporte notre middleware
   try { // pour prévenir les différentes possibles, on créé un try et un catch.
       const token = req.headers.authorization.split(' ')[1];// on récupère notre token dans notre header, le diviser en un tableau (' '). le [1] signifie que c'est le deuxième que l'on veut récupérer, vu qu'on part de 0.
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // on décode le token grâce à la fonction verify de JWT. On lui passe le token récupéré+ la clé secrète.
       const userId = decodedToken.userId;// on récupère le userid 
       req.auth = {// on créé req.auth avec userid
           userId: userId 
       };
	next();
   } catch(error) {// si erreur, code 401 unauthorized
       res.status(401).json({ error });
   }
};