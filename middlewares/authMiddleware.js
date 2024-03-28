const jwt = require('jsonwebtoken');

// Middleware pour vérifier l'authentification
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];


  if (!token) {
    return res.status(401).json({ message: 'Token non fourni' });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Erreur lors de la vérification du token' });
    }
    req.user = decoded.user;
    next();
  });
};

// Middleware pour générer un token JWT
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
};

module.exports = {
  verifyToken,
  generateToken
};
