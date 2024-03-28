const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../middlewares/authMiddleware.js');

// Route pour la création d'un utilisateur
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Nom d\'utilisateur déjà utilisé' });
    }
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    // Créer un nouvel utilisateur
    user = new User({ username, password: hashedPassword });
    await user.save();
    console.log('\x1b[32m', 'Utilisateur créé avec succès', '\x1b[0m');
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour l'authentification
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
    // Générer le token JWT
    const token = generateToken({ userId: user._id });
    console.log('\x1b[36m', 'Utilisateur connecté avec succès', '\x1b[0m');
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
