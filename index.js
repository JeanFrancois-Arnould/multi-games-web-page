const express = require('express');
const bodyParser = require('body-parser');
const ettehcruof = require('./my_modules/ettehcruof');
const port = 5050;

// Je crée mon app express
const app = express();

app.set('view engine', 'ejs');

// Cette ligne permet d'ajouter un middleware, qui examinera
// toutes les reqûetes. Et si une requête a la méthode "post"
// ce middelware ira chercher le contenu de ce qu a été posté
// et le rendra disponible dans req.body (qui n'existait pas avant)
app.use(bodyParser.urlencoded({ extended: true }));


// Celui ci pour toutes les requêtes reçues va d'abord vérifier
// s'il existe dans le dossier "public" ce qui a été demandé
// dans l'url. Si oui, il l'envoie. Si non, il laisse la main
// aux autres routes.
app.use(express.static('./public'));


app.use((req, res, next) => {
  console.log(`L'utilisateur cherche a accéder à ${req.path}`);
  console.log(`L'utilisateur cherche a accéder à ${req.url}`);
  next();
});

const gameList = require('./games.json');
const users = require('./users.json');
console.log(gameList);

// Si j'ai besoin de mettre dans l'objet locals
// des choses qui doivent être accessibles
// dans toutes les vues pour toutes les requêtes
// je peux le faire dans "app.locals"
app.locals.gameList = gameList;

app.use((req, res, next) => {
  console.log(`[${Date()} ${req.ip}] ${req.path}`); // version très simple sans module
  next();
});

// Ici je gère la route pour envoyer
// la page de connexion
app.get('/login', (req, res) => {
  res.render('login');
});

// Je gère la route pour recevoir
// les données de connexion
app.post('/login', (req, res) => {
  
  const { body } = req;
  // Récupérer dans le body les infos envoyées
  // et trouver dans le users.json l'utilisateur qui correspond
  
  const foundUser = users.find(
    (userObject) =>
      body.username === userObject.userName &&
      body.password === userObject.password
  );
  if (!foundUser) {
    res.render('login', { error: true });
  } else {
    // Je stocke dans app.locals un nouvel objet
    // dans lequel je copie tout ce qui était déjà contenu
    // et je rajoute une propriété user contenant l'utilisateur connecté
    app.locals.user = foundUser;
    console.log(app.locals);
    res.redirect('/');
  }
});

app.get('/', (req, res, next) => {
  res.render('index');
  next();
});

app.get('/', (req, res) => {
  console.log('Je suis bien appelé après le middleware précédent');
});

app.get('/game/ettehcruof', (req, res, next) => {

  const { answer } = req.query;
  
  let message;
  let won;
  // J'examine la réponse pour savoir quoi renvoyer
  switch (answer) {
    case 'plus':
      ettehcruof.more();
      message = `Est ce que c'est ${ettehcruof.getProposition()} ?`;
      break;
    case 'moins':
      ettehcruof.less();
      message = `Est ce que c'est ${ettehcruof.getProposition()} ?`;
      break;
    case 'win':
      ettehcruof.win();
      message = `Bravo, je suis trop fort`;
      won = true;
      break;
    default:
      message = `Est ce que c'est ${ettehcruof.getProposition()} ?`;
  }

 
  res.locals = {
    message,
    won,
  };
  
  next();
});

app.get('/game/:nomDuJeuDemande', (req, res, next) => {
  const jeuDemande = req.params.nomDuJeuDemande;

  const gameObjet = gameList.find((objetDansLeTableau) => {
    // Si je return true, je prends l'objet du tableau
    // Sinon j'inspecte l'élément suivant
    return objetDansLeTableau.name === jeuDemande;
  });

  console.log(gameObjet);

  if (!gameObjet) {
    next();
    return;
  }
  
  res.render(jeuDemande, gameObjet);
});

// Pour toutes les autres routes

app.use((req, res) => {
  res.status(404).render('not-found');
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
