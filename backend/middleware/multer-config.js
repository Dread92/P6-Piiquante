const multer = require('multer'); // on importe notre dépendance multer. multer est un package de gestion de fichiers.

const MIME_TYPES = {// on créé un dictionnaire avec les différents types d'images qu'on peut avoir (jpg=jpeg/png)
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ // on appelle la fonction storage de multer
  destination: (req, file, callback) => { // destination indique où est ce que les images vont être enregistrées
    callback(null, 'images'); // le callback null sert à dire qu'il n'y a pas eu d'erreur,le deuxieme est le dossier image
  },
  filename: (req, file, callback) => { // on epxlique à multer quel nom de fichier utiliser pour éviter les doublons
    const name = file.originalname.split(' ').join('_');// on créé son nom en utilisant le nom d'origine, en remplaçant les potentiels espaces avec la méthode split , puis join pour remplacer les espaces par des underscores
    const extension = MIME_TYPES[file.mimetype];// l'extension sera ce qui correspond à notre dictionnaire.
    callback(null, name + Date.now() + '.' + extension); // le call back est constitué de null pour dire il n'y a pas d'erreur, puis le nom de fichier entier ( nom + timestamp + "." + extension du fichier)
  } // de cette façon notre nom de fichier est unique
});

// on exporte notre middleware multer configuré - avec la méthode multer- à laquelle on passe l'objet storage, puis .single car c'est un fichier unique, puis image car il s'agit de fichier image uniquement.
module.exports = multer({storage: storage}).single('image');