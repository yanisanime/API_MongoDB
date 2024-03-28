const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');

// Middleware pour le parsing des requêtes JSON
app.use(express.json());

dotenv.config();

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/BaseAPIDefis')
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

// Utilisation des routes
app.use('/', routes);
app.use('/auth', authRoutes); // Routes d'authentification

// Port d'écoute du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
