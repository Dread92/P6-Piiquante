const http = require('http'); // on appelle la commande http qui va nous permettre de recevoir les requêtes HTTP
const app = require('./app'); // on importe notre const app précédemment exportée dans le fichier app.js

//la fonction normalize va nous permettre d'avoir un port valide, sous forme de number ou string
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
 const port = normalizePort(process.env.PORT || '3000');// on écoute le port 3000 par défaut. process.env.PORT nous permet d'utiliser un autre port  que 3000 si pas dispo.
app.set('port', port);


// la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée.
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};


// on utilise la méthode createServer pour recevoir requête et réponse(ici app, via express)
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
